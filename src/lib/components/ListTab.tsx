import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useStackPage, ListDefinition, ListItem } from "./StackPageContext";
import {
  TrashIcon,
  PlusIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

/**
 * Utility: shallow/deep equal for typical JSON-able structures.
 * Optimized for small arrays/objects used in UI state (lists).
 */
const deepEqual = (a: any, b: any): boolean => {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (a == null || b == null) return a === b;

  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }

  if (typeof a === "object") {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    for (const k of aKeys) {
      if (!b.hasOwnProperty(k) || !deepEqual(a[k], b[k])) return false;
    }
    return true;
  }

  // primitives
  return a === b;
};

export const ListTab: React.FC = () => {
  const { attributes, setPageAttributes } = useStackPage();
  const [lists, setLists] = useState<ListDefinition[]>([]);
  const [expandedList, setExpandedList] = useState<string | null>(null);
  const [newListName, setNewListName] = useState("");
  const [newListDescription, setNewListDescription] = useState("");
  const [draggingItem, setDraggingItem] = useState<string | null>(null);

  const listsRef = useRef(lists);
  listsRef.current = lists;

  // Load lists from attributes on component mount / attribute change, but only if different
  useEffect(() => {
    const incoming = attributes?.lists || [];
    if (!deepEqual(incoming, listsRef.current)) {
      setLists(Array.isArray(incoming) ? incoming : []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attributes?.lists]);

  // Save lists to attributes whenever they truly change
  useEffect(() => {
    const currentAttrs = attributes?.lists || [];
    if (!deepEqual(currentAttrs, lists)) {
      setPageAttributes((prev: any) => ({
        ...prev,
        lists: lists,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lists]);

  // Helpers
  const createNewListObject = useCallback(
    (name: string, description: string): ListDefinition => ({
      id: `list_${Date.now()}`,
      name,
      description,
      items: [],
    }),
    []
  );

  // CRUD handlers (memoized)
  const handleCreateList = useCallback(() => {
    if (!newListName.trim()) return;
    const newList = createNewListObject(newListName.trim(), newListDescription);
    setLists((prev) => {
      const next = [...prev, newList];
      return next;
    });
    setNewListName("");
    setNewListDescription("");
    setExpandedList(newList.id);
  }, [newListName, newListDescription, createNewListObject]);

  const handleDeleteList = useCallback((listId: string) => {
    setLists((prev) => prev.filter((list) => list.id !== listId));
    setExpandedList((prev) => (prev === listId ? null : prev));
  }, []);

  const handleAddItem = useCallback((listId: string) => {
    const newItem: ListItem = {
      id: `item_${Date.now()}`,
      label: "New Item",
      value: "new_item",
    };
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId ? { ...list, items: [...list.items, newItem] } : list
      )
    );
    // Expand the list if not already
    setExpandedList(listId);
  }, []);

  const handleUpdateItem = useCallback(
    (listId: string, itemId: string, field: keyof ListItem, value: string) => {
      setLists((prev) =>
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

  const handleDeleteItem = useCallback((listId: string, itemId: string) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? { ...list, items: list.items.filter((i) => i.id !== itemId) }
          : list
      )
    );
  }, []);

  // Reordering helpers
  const reorderArray = useCallback(
    (array: any[], fromIndex: number, toIndex: number) => {
      if (fromIndex === toIndex) return array;
      const newArr = array.slice();
      const [removed] = newArr.splice(fromIndex, 1);
      newArr.splice(toIndex, 0, removed);
      return newArr;
    },
    []
  );

  const handleReorderItem = useCallback(
    (listId: string, fromIndex: number, toIndex: number) => {
      setLists((prev) =>
        prev.map((list) =>
          list.id === listId
            ? { ...list, items: reorderArray(list.items, fromIndex, toIndex) }
            : list
        )
      );
    },
    [reorderArray]
  );

  // Drag & Drop handlers
  const handleDragStart = useCallback((e: React.DragEvent, itemId: string) => {
    setDraggingItem(itemId);
    // Set data to allow drop in Firefox
    try {
      e.dataTransfer.setData("text/plain", itemId);
    } catch {}
    e.dataTransfer.effectAllowed = "move";
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, listId: string, targetIndex: number) => {
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

  // Memoized mapping of lists for stable renders
  const renderedLists = useMemo(() => lists, [lists]);

  return (
    <div className="h-full p-4 space-y-4 bg-zinc-200 overflow-y-auto scrollbar-thin">
      <h3 className="text-lg font-medium mb-3">List Manager</h3>

      {/* Create New List Section - Top */}
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

      {/* Existing Lists Section */}
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
                {/* List Header */}
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
                    className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors duration-200 opacity-0 group-hover:opacity-100"
                    aria-label={`Delete ${list.name}`}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>

                {/* Expanded Content - Simple show/hide without max-height transitions */}
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
                        className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-medium transition-colors duration-200"
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
                            className="flex items-center space-x-2 p-2 border border-gray-200 rounded bg-gray-50 group transition-colors duration-200"
                            draggable
                            onDragStart={(e) => handleDragStart(e, item.id)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, list.id, index)}
                          >
                            {/* Drag Handle */}
                            <Bars3Icon className="w-4 h-4 text-gray-400 cursor-move flex-shrink-0" />

                            {/* Item Inputs */}
                            <div className="grid grid-cols-2 gap-2 flex-1 min-w-0">
                              <div className="min-w-0">
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
                              </div>
                              <div className="min-w-0">
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
                            </div>

                            {/* Delete Item Button */}
                            <button
                              onClick={() => handleDeleteItem(list.id, item.id)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors duration-200 opacity-0 group-hover:opacity-100 flex-shrink-0"
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
