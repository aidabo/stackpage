import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  TrashIcon,
  PlusIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { useStackPage } from "./StackPageContext";
import { ListDefinition, ListItem } from "./types";

/** Utility deep equality for small JSON-like objects */
const deepEqual = (a: unknown, b: unknown): boolean => {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (a == null || b == null) return a === b;

  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== (b as unknown[]).length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], (b as unknown[])[i])) return false;
    }
    return true;
  }

  if (typeof a === "object") {
    const aObj = a as Record<string, unknown>;
    const bObj = b as Record<string, unknown>;
    const aKeys = Object.keys(aObj);
    const bKeys = Object.keys(bObj);
    if (aKeys.length !== bKeys.length) return false;
    for (const k of aKeys) {
      if (
        !Object.prototype.hasOwnProperty.call(bObj, k) ||
        !deepEqual(aObj[k], bObj[k])
      )
        return false;
    }
    return true;
  }

  return a === b;
};

export const ListTab: React.FC = (): JSX.Element => {
  const { source, setSource } = useStackPage();

  const [lists, setLists] = useState<ListDefinition[]>([]);
  const [expandedList, setExpandedList] = useState<string | null>(null);
  const [newListName, setNewListName] = useState<string>("");
  const [newListDescription, setNewListDescription] = useState<string>("");
  const [draggingItem, setDraggingItem] = useState<string | null>(null);

  const listsRef = useRef<ListDefinition[]>(lists);
  listsRef.current = lists;

  /** A stable hash of source.lists, so we only load when backend changes */
  const [loadedHash, setLoadedHash] = useState<string>("");

  /** Safely generate an id (prefer crypto.randomUUID if available) */
  const genId = useCallback((): string => {
    try {
      return typeof crypto !== "undefined" &&
        typeof (crypto as any).randomUUID === "function"
        ? (crypto as any).randomUUID()
        : `id_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    } catch {
      return `id_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    }
  }, []);

  /** Load lists from source when source.lists changes (backend / parent update) */
  useEffect(() => {
    const incoming = (source?.lists as ListDefinition[]) || [];
    const newHash = JSON.stringify(incoming);

    // Load only if backend changed lists
    if (newHash !== loadedHash) {
      setLists(Array.isArray(incoming) ? incoming : []);
      setLoadedHash(newHash);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source?.lists, loadedHash]);

  /** Save lists to source ONLY when lists truly differ */
  useEffect(() => {
    const current = (source?.lists as ListDefinition[]) || [];
    if (!deepEqual(current, lists)) {
      setSource((prev: any) => ({
        ...prev,
        lists,
      }));
      setLoadedHash(JSON.stringify(lists)); // Sync hash to prevent reloading loop
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lists]);

  /** Helpers */
  const createNewListObject = useCallback(
    (name: string, description: string): ListDefinition => ({
      id: genId(),
      name,
      description,
      items: [],
    }),
    [genId]
  );

  /** CRUD handlers */
  const handleCreateList = useCallback((): void => {
    if (!newListName.trim()) return;
    const newList: ListDefinition = createNewListObject(
      newListName.trim(),
      newListDescription
    );

    setLists((prev: ListDefinition[]) => [...prev, newList]);
    setNewListName("");
    setNewListDescription("");
    setExpandedList(newList.id);
  }, [newListName, newListDescription, createNewListObject]);

  const handleDeleteList = useCallback((listId: string): void => {
    setLists((prev: ListDefinition[]) => prev.filter((l) => l.id !== listId));
    setExpandedList((prev) => (prev === listId ? null : prev));
  }, []);

  const handleAddItem = useCallback(
    (listId: string): void => {
      const newItem: ListItem = {
        id: genId(),
        label: "New Item",
        value: "new_item",
      };
      setLists((prev: ListDefinition[]) =>
        prev.map((list) =>
          list.id === listId
            ? { ...list, items: [...list.items, newItem] }
            : list
        )
      );
      setExpandedList(listId);
    },
    [genId]
  );

  const handleUpdateItem = useCallback(
    (
      listId: string,
      itemId: string,
      field: keyof ListItem,
      value: string
    ): void => {
      setLists((prev: ListDefinition[]) =>
        prev.map((list) =>
          list.id === listId
            ? {
                ...list,
                items: list.items.map((item) =>
                  item.id === itemId ? { ...item, [field]: value } : item
                ),
              }
            : list
        )
      );
    },
    []
  );

  const handleDeleteItem = useCallback(
    (listId: string, itemId: string): void => {
      setLists((prev: ListDefinition[]) =>
        prev.map((list) =>
          list.id === listId
            ? { ...list, items: list.items.filter((i) => i.id !== itemId) }
            : list
        )
      );
    },
    []
  );

  /** Reorder Utils */
  const reorderArray = useCallback(
    <T,>(array: T[], fromIndex: number, toIndex: number): T[] => {
      if (fromIndex === toIndex) return array;
      const newArr = array.slice();
      const [removed] = newArr.splice(fromIndex, 1);
      newArr.splice(toIndex, 0, removed);
      return newArr;
    },
    []
  );

  const handleReorderItem = useCallback(
    (listId: string, fromIndex: number, toIndex: number): void => {
      setLists((prev: ListDefinition[]) =>
        prev.map((list) =>
          list.id === listId
            ? {
                ...list,
                items: reorderArray<ListItem>(list.items, fromIndex, toIndex),
              }
            : list
        )
      );
    },
    [reorderArray]
  );

  /** Drag & Drop */
  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLDivElement>, itemId: string): void => {
      setDraggingItem(itemId);
      try {
        e.dataTransfer.setData("text/plain", itemId);
      } catch {
        // ignore
      }
      e.dataTransfer.effectAllowed = "move";
    },
    []
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>): void => {
      e.preventDefault();
      try {
        e.dataTransfer.dropEffect = "move";
      } catch {
        // ignore
      }
    },
    []
  );

  const handleDrop = useCallback(
    (
      e: React.DragEvent<HTMLDivElement>,
      listId: string,
      targetIndex: number
    ): void => {
      e.preventDefault();
      const draggingId =
        draggingItem ||
        (() => {
          try {
            return e.dataTransfer.getData("text/plain");
          } catch {
            return null;
          }
        })();

      if (!draggingId) return;

      const list = listsRef.current.find((l) => l.id === listId);
      if (!list) return;
      const fromIndex = list.items.findIndex((item) => item.id === draggingId);
      if (fromIndex === -1) return;
      handleReorderItem(listId, fromIndex, targetIndex);
      setDraggingItem(null);
    },
    [draggingItem, handleReorderItem]
  );

  const renderedLists = useMemo(() => lists, [lists]);

  return (
    <div className="h-full p-4 space-y-4 bg-zinc-200 overflow-y-auto scrollbar-thin">
      <h3 className="text-lg font-medium mb-3">List Manager</h3>

      {/* Create New List */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h4 className="font-medium text-gray-800 mb-3">Create New List</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              List Name *
            </label>
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="Enter list name"
              className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              value={newListDescription}
              onChange={(e) => setNewListDescription(e.target.value)}
              placeholder="Enter list description"
              className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <button
          onClick={handleCreateList}
          disabled={!newListName.trim()}
          className="mt-3 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm font-medium transition-colors duration-200"
        >
          Create List
        </button>
      </div>

      {/* Existing Lists */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-800">
          Your Lists ({lists.length})
        </h4>

        {renderedLists.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-white rounded-lg border border-gray-200">
            <div className="text-3xl mb-2">📝</div>
            <p className="text-sm">No lists created yet</p>
            <p className="text-xs mt-1">Create your first list above</p>
          </div>
        ) : (
          renderedLists.map((list) => {
            const isExpanded = expandedList === list.id;

            return (
              <div
                key={list.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <div
                  className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 transition-colors duration-200 group"
                  onClick={() =>
                    setExpandedList((prev) =>
                      prev === list.id ? null : list.id
                    )
                  }
                >
                  <div className="flex items-center space-x-3">
                    {isExpanded ? (
                      <ChevronUpIcon className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                    )}

                    <div>
                      <h5 className="font-medium text-gray-900 text-sm">
                        {list.name}
                      </h5>
                      <p className="text-xs text-gray-500">
                        {list.description || "No description"} •{" "}
                        {list.items.length} items
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteList(list.id);
                    }}
                    className="p-1 text-red-600 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition"
                    aria-label={`Delete ${list.name}`}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>

                {isExpanded && (
                  <div
                    className="border-t border-gray-200 p-3"
                    role="region"
                    aria-labelledby={`list-${list.id}`}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium text-gray-700">
                        List Items
                      </span>

                      <button
                        onClick={() => handleAddItem(list.id)}
                        className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-medium"
                      >
                        <PlusIcon className="w-4 h-4" />
                        Add Item
                      </button>
                    </div>

                    <div className="space-y-2">
                      {list.items.length === 0 ? (
                        <div className="text-center py-4 text-gray-500 text-sm">
                          No items in this list
                        </div>
                      ) : (
                        list.items.map((item, index) => (
                          <div
                            key={item.id}
                            className="flex items-center space-x-2 p-2 border border-gray-200 rounded bg-gray-50 group"
                            draggable
                            onDragStart={(e) => handleDragStart(e, item.id)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, list.id, index)}
                          >
                            <Bars3Icon className="w-4 h-4 text-gray-400 flex-shrink-0 cursor-move" />

                            <div className="grid grid-cols-2 gap-2 flex-1 min-w-0">
                              <input
                                type="text"
                                value={item.label}
                                onChange={(e) =>
                                  handleUpdateItem(
                                    list.id,
                                    item.id,
                                    "label",
                                    e.target.value
                                  )
                                }
                                placeholder="Label"
                                className="w-full p-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                              <input
                                type="text"
                                value={item.value}
                                onChange={(e) =>
                                  handleUpdateItem(
                                    list.id,
                                    item.id,
                                    "value",
                                    e.target.value
                                  )
                                }
                                placeholder="Value"
                                className="w-full p-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>

                            <button
                              onClick={() => handleDeleteItem(list.id, item.id)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition"
                              aria-label={`Delete item ${item.label}`}
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Drag & Drop Hint */}
                    {list.items.length > 1 && (
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        💡 Drag items to reorder them
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Usage Instructions */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2 text-sm">
          How to Use Lists
        </h4>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• Create lists for dropdowns, radio groups, or checkboxes</li>
          <li>
            • Reference lists in components using: {"{{list.your_list_name}}"}
          </li>
          <li>• Drag items to reorder them within a list</li>
          <li>
            • Lists are saved with the page and available across components
          </li>
        </ul>
      </div>
    </div>
  );
};
