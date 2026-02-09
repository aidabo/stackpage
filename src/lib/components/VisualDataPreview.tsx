import React, { useMemo, useState, useEffect } from "react";
import {
  CalendarIcon,
  TagIcon,
  UserIcon,
  DocumentTextIcon,
  EyeIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import { get } from "../utils/get";

interface VisualDataPreviewProps {
  data: any;
  category?: string;
  onBind: (path: string, isArray: boolean) => void;
  onSelectRecord?: (record: any, index: number) => void;
  onToggleSelection?: (index: number) => void; // New prop
  viewMode?: "grid" | "list";
  searchTerm?: string;
  selectedIndices?: number[];
  filters?: { id: number; key: string; value: string }[];
}

interface PrimitiveField {
  key: string;
  value: string | number | boolean;
}

export const VisualDataPreview: React.FC<VisualDataPreviewProps> = ({
  data,
  category,
  onBind,
  onSelectRecord,
  onToggleSelection,
  viewMode = "grid",
  searchTerm = "",
  selectedIndices = [],
  filters = [],
}) => {
  // Use selectedIndices directly from props (controlled component)
  const [selectedItems, setSelectedItems] = useState<number[]>(selectedIndices);

  // Update local state when prop changes
  useEffect(() => {
    setSelectedItems(selectedIndices);
  }, [selectedIndices]);

  // Handle item selection
  const handleSelectItem = (index: number) => {
    if (onToggleSelection) {
      // Call parent handler if provided
      onToggleSelection(index);
    } else {
      // Fallback to local state management
      const newSelected = [...selectedItems];
      const itemIndex = newSelected.indexOf(index);

      if (itemIndex > -1) {
        newSelected.splice(itemIndex, 1); // Remove if already selected
      } else {
        newSelected.push(index); // Add if not selected
      }

      setSelectedItems(newSelected);

      // Notify parent if callback provided
      if (onSelectRecord) {
        const item = filteredData[index];
        onSelectRecord(item, index);
      }
    }
  };

  // Handle select all in current view
  const handleSelectAll = () => {
    if (onToggleSelection) {
      // If parent controls selection, we need a different approach
      // For now, just select all locally
      const allIndices = Array.from(
        { length: filteredData.length },
        (_, i) => i
      );
      setSelectedItems(allIndices);
    } else {
      const allIndices = Array.from(
        { length: filteredData.length },
        (_, i) => i
      );
      setSelectedItems(allIndices);
    }
  };

  // Handle clear all selections
  const handleClearAll = () => {
    if (onToggleSelection) {
      // If parent controls selection, we need a different approach
      // For now, just clear locally
      setSelectedItems([]);
    } else {
      setSelectedItems([]);
    }
  };

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!Array.isArray(data)) return [];

    if (!searchTerm.trim() && filters.length === 0) return data;

    const searchLower = searchTerm.toLowerCase();
    return data.filter((item) => {
      // Apply text search
      if (searchTerm.trim()) {
        const searchInObject = (obj: any): boolean => {
          if (typeof obj === "string") {
            return obj.toLowerCase().includes(searchLower);
          }
          if (typeof obj === "object" && obj !== null) {
            return Object.values(obj).some((value) => searchInObject(value));
          }
          return false;
        };

        if (!searchInObject(item)) return false;
      }

      // Apply field filters
      if (filters.length > 0) {
        return filters.every((filter) => {
          if (!filter.key || !filter.value) return true;

          // Get value from path
          const getValue = (obj: any, path: string) => {
            return path.split(".").reduce((o, k) => o?.[k], obj);
          };

          const value = getValue(item, filter.key);
          return String(value || "")
            .toLowerCase()
            .includes(filter.value.toLowerCase());
        });
      }

      return true;
    });
  }, [data, searchTerm, filters]);

  // Helper to find nested fields
  const findField = (
    item: any,
    keys: string[]
  ): { value: any; key: string } | null => {
    for (const key of keys) {
      if (item[key] !== undefined && item[key] !== null) {
        return { value: item[key], key };
      }
    }

    // Try nested paths including array element paths
    for (const key of keys) {
      const parts = key.split(".");
      let current = item;
      let pathUsed = "";

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        pathUsed = pathUsed ? `${pathUsed}.${part}` : part;

        if (current && typeof current === "object") {
          // Handle array element notation like users[].name
          if (part.includes("[]")) {
            const match = part.match(/(\w+)\[\]/);
            if (match) {
              const [, arrayName] = match;
              current = current[arrayName];

              // Check if it's an array and we have an element field
              if (
                Array.isArray(current) &&
                current.length > 0 &&
                i < parts.length - 1
              ) {
                const elementField = parts.slice(i + 1).join(".");
                const values = current.map((item) => get(item, elementField));
                return { value: values, key };
              }
              continue;
            }
          }
          // Handle specific array index
          else if (part.includes("[") && part.includes("]")) {
            const match = part.match(/(\w+)\[(\d+)\]/);
            if (match) {
              const [, arrayName, index] = match;
              current = current[arrayName]?.[parseInt(index)];
            }
          } else {
            current = current[part];
          }
        } else {
          current = undefined;
          break;
        }
      }

      if (current !== undefined && current !== null) {
        return { value: current, key };
      }
    }

    return null;
  };

  const collectPrimitiveFields = (
    obj: any,
    basePath = "",
    depth = 0,
    maxDepth = 2
  ): PrimitiveField[] => {
    if (!obj || typeof obj !== "object" || depth > maxDepth) return [];

    const result: PrimitiveField[] = [];

    Object.entries(obj).forEach(([key, value]) => {
      const path = basePath ? `${basePath}.${key}` : key;

      if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
      ) {
        result.push({ key: path, value });
        return;
      }

      if (Array.isArray(value)) {
        if (
          value.length > 0 &&
          (typeof value[0] === "string" ||
            typeof value[0] === "number" ||
            typeof value[0] === "boolean")
        ) {
          result.push({
            key: path,
            value: value.slice(0, 3).join(", "),
          });
        } else if (value.length > 0 && typeof value[0] === "object") {
          result.push(
            ...collectPrimitiveFields(value[0], `${path}[0]`, depth + 1, maxDepth)
          );
        }
        return;
      }

      if (value && typeof value === "object") {
        result.push(...collectPrimitiveFields(value, path, depth + 1, maxDepth));
      }
    });

    return result;
  };

  const getFallbackTitle = (item: any): string => {
    const primary = findField(item, [
      "title",
      "name",
      "label",
      "slug",
      "subject",
      "headline",
      "id",
    ]);
    if (primary?.value !== undefined && primary?.value !== null) {
      return String(primary.value);
    }

    const primitive = collectPrimitiveFields(item, "", 0, 1).find(
      (field) =>
        typeof field.value === "string" &&
        field.value.trim().length > 0 &&
        !field.key.toLowerCase().includes("url")
    );
    return primitive ? String(primitive.value) : "Untitled";
  };

  const getQuickSummaryFields = (
    item: any,
    usedKeys: string[] = [],
    limit = 3
  ): PrimitiveField[] => {
    const usedSet = new Set(usedKeys.filter(Boolean).map((k) => k.toLowerCase()));
    const noisyKeys = new Set([
      "id",
      "uuid",
      "html",
      "markdown",
      "content",
      "body",
      "feature_image",
      "profile_image",
      "image",
      "cover_image",
      "url",
      "link",
    ]);

    return collectPrimitiveFields(item, "", 0, 2)
      .filter((field) => {
        const keyName = field.key.split(".").pop()?.replace("[0]", "") || "";
        const normalized = keyName.toLowerCase();
        if (usedSet.has(field.key.toLowerCase())) return false;
        if (noisyKeys.has(normalized)) return false;
        if (typeof field.value === "string" && field.value.length > 120) {
          return false;
        }
        return true;
      })
      .slice(0, limit);
  };

  // If not an array, show single item
  if (!Array.isArray(data)) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="text-center text-gray-500">
          <DocumentTextIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Data is not an array. Use the Mapping tab instead.</p>
        </div>
      </div>
    );
  }

  if (filteredData.length === 0) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <EyeIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No data found
          </h3>
          <p className="text-gray-500 max-w-md">
            {searchTerm || filters.length > 0
              ? "No items match your search. Try a different search term."
              : "The data source returned an empty array."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="p-3 bg-gradient-to-r from-blue-50 to-white border-b border-blue-100 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-sm font-medium text-gray-700">
              Showing {filteredData.length} of {data.length} records
            </span>
            <div className="text-xs text-gray-500 mt-1">
              {selectedItems.length > 0 && (
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  {selectedItems.length} selected
                </span>
              )}
            </div>
          </div>
          {category && (
            <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">
              {category}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {!onToggleSelection && selectedItems.length > 0 && (
            <>
              <button
                onClick={handleClearAll}
                className="px-3 py-1.5 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-300"
              >
                Clear Selection
              </button>
              <button
                onClick={handleSelectAll}
                className="px-3 py-1.5 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200"
              >
                Select All
              </button>
            </>
          )}
          <button
            onClick={() => onBind("$[]", true)}
            className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm rounded-lg shadow-sm hover:shadow-md flex items-center gap-2"
          >
            <LinkIcon className="w-4 h-4" />
            Bind Entire List
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredData.slice(0, 100).map((item, index) => {
              // Extract common fields from your API structure
              const titleData = findField(item, [
                "title",
                "name",
                "slug",
                "subject",
              ]);
              const imageData = findField(item, [
                "feature_image",
                "profile_image",
                "image",
                "url",
                "cover_image",
                "primary_author.profile_image",
                "authors[0].profile_image",
              ]);
              const tagData = findField(item, [
                "primary_tag.name",
                "tags[0].name",
                "tag.name",
                "category",
              ]);
              const authorData = findField(item, [
                "primary_author.name",
                "authors[0].name",
                "author.name",
                "byline",
              ]);
              const dateData = findField(item, [
                "published_at",
                "created_at",
                "updated_at",
                "date",
              ]);
              const statusData = findField(item, ["status", "visibility"]);
              const excerptData = findField(item, [
                "excerpt",
                "custom_excerpt",
                "meta_description",
              ]);
              const hasImage =
                !!imageData?.value &&
                typeof imageData.value === "string" &&
                imageData.value.trim().length > 0;
              const quickSummaryFields = getQuickSummaryFields(item, [
                titleData?.key || "",
                imageData?.key || "",
                tagData?.key || "",
                authorData?.key || "",
                dateData?.key || "",
                statusData?.key || "",
                excerptData?.key || "",
              ]);

              const isSelected = selectedItems.includes(index);

              return (
                <div
                  key={index}
                  className={`bg-white rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group cursor-pointer ${
                    isSelected
                      ? "border-blue-500 ring-2 ring-blue-200"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                  onClick={() => handleSelectItem(index)}
                >
                  {/* Selection Checkbox */}
                  <div className="relative top-3 left-3 z-10">
                    <div
                      className={`w-5 h-5 rounded border flex items-center justify-center ${
                        isSelected
                          ? "bg-blue-600 border-blue-600"
                          : "bg-white border-gray-300"
                      }`}
                    >
                      {isSelected && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Image/Header */}
                  {hasImage && (
                    <div
                      className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (imageData) {
                          const isArrayElement = imageData.key.includes("[]");
                          onBind(imageData.key, isArrayElement);
                        }
                      }}
                    >
                      <img
                        src={String(imageData?.value)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      <div className="absolute bottom-2 left-2 right-2 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Click to bind image
                      </div>

                      {statusData && (
                        <div className="absolute top-2 right-2">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              statusData.value === "published" ||
                              statusData.value === "public"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {String(statusData.value)}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-4">
                    {!hasImage && statusData && (
                      <div className="mb-2">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            statusData.value === "published" ||
                            statusData.value === "public"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {String(statusData.value)}
                        </span>
                      </div>
                    )}
                    {/* Tag & Date */}
                    <div className="flex justify-between items-center mb-3">
                      <div
                        className="flex items-center gap-1 text-xs text-gray-600 hover:text-blue-600 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (tagData) {
                            // Check if the key is an array element path
                            const isArrayElement = tagData.key.includes("[]");
                            onBind(tagData.key, isArrayElement);
                          }
                        }}
                      >
                        <TagIcon className="w-3 h-3" />
                        <span className="truncate max-w-[100px]">
                          {String(tagData?.value || "No Tag")}
                        </span>
                      </div>
                      <div
                        className="flex items-center gap-1 text-xs text-gray-600 hover:text-blue-600 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (dateData) {
                            // Check if the key is an array element path
                            const isArrayElement = dateData.key.includes("[]");
                            onBind(dateData.key, isArrayElement);
                          }
                        }}
                      >
                        <CalendarIcon className="w-3 h-3" />
                        <span>
                          {dateData?.value
                            ? new Date(dateData.value).toLocaleDateString()
                            : "-"}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h4
                      className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2 hover:text-blue-600 cursor-pointer p-1 -m-1 rounded hover:bg-blue-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (titleData) {
                          // Check if the key is an array element path
                          const isArrayElement = titleData.key.includes("[]");
                          onBind(titleData.key, isArrayElement);
                        }
                      }}
                      title={titleData ? `Bind: ${titleData.key}` : ""}
                    >
                      {String(titleData?.value || getFallbackTitle(item))}
                    </h4>

                    {/* Excerpt */}
                    {excerptData?.value && (
                      <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                        {String(excerptData.value)}
                      </p>
                    )}
                    {quickSummaryFields.length > 0 && (
                      <div className="mb-3 space-y-1">
                        {quickSummaryFields.map((field) => (
                          <div
                            key={field.key}
                            className="text-[11px] text-gray-600 truncate cursor-pointer hover:text-blue-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              onBind(field.key, field.key.includes("[]"));
                            }}
                            title={`Bind: ${field.key}`}
                          >
                            <span className="text-gray-400">{field.key}:</span>{" "}
                            {String(field.value)}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Author */}
                    <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                      <div
                        className="flex items-center gap-2 text-xs text-gray-600 hover:text-blue-600 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (authorData) {
                            // Check if the key is an array element path
                            const isArrayElement =
                              authorData.key.includes("[]");
                            onBind(authorData.key, isArrayElement);
                          }
                        }}
                      >
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                          <UserIcon className="w-3 h-3" />
                        </div>
                        <span className="truncate max-w-[120px]">
                          {String(authorData?.value || "Unknown")}
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectItem(index);
                          if (onSelectRecord) {
                            onSelectRecord(item, index);
                          }
                        }}
                        className={`text-xs px-2 py-1 rounded transition-colors ${
                          isSelected
                            ? "bg-blue-100 text-blue-700 border border-blue-300"
                            : "text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100"
                        }`}
                      >
                        {isSelected ? "✓ Selected" : "Select"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredData.length > 100 && (
              <div className="col-span-full text-center py-6 text-gray-500">
                <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
                  <EyeIcon className="w-4 h-4" />
                  <span>
                    Showing first 100 items. Use search to find specific items.
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : (
          // List View
          <div className="space-y-2">
            {filteredData.slice(0, 50).map((item, index) => {
              const titleData = findField(item, ["title", "name"]);
              const dateData = findField(item, ["published_at", "created_at"]);
              const statusData = findField(item, ["status"]);
              const quickSummaryFields = getQuickSummaryFields(
                item,
                [titleData?.key || "", dateData?.key || "", statusData?.key || ""],
                2
              );
              const isSelected = selectedItems.includes(index);

              return (
                <div
                  key={index}
                  className={`bg-white border rounded-lg p-3 hover:shadow-sm transition-all group cursor-pointer ${
                    isSelected
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                  onClick={() => handleSelectItem(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {/* Selection Checkbox */}
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                          isSelected
                            ? "bg-blue-600 border-blue-600"
                            : "bg-white border-gray-300"
                        }`}
                      >
                        {isSelected && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h4
                            className="text-sm font-medium text-gray-800 truncate hover:text-blue-600 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (titleData) {
                                // Check if the key is an array element path
                                const isArrayElement =
                                  titleData.key.includes("[]");
                                onBind(titleData.key, isArrayElement);
                              }
                            }}
                          >
                            {String(titleData?.value || getFallbackTitle(item))}
                          </h4>
                          {statusData && (
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                statusData.value === "published"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {String(statusData.value)}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          {dateData && (
                            <span
                              className="flex items-center gap-1 hover:text-blue-600 cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                onBind(dateData.key, dateData.key.includes("[]"));
                              }}
                            >
                              <CalendarIcon className="w-3 h-3" />
                              {new Date(dateData.value).toLocaleDateString()}
                            </span>
                          )}
                          {quickSummaryFields.map((field) => (
                            <span
                              key={field.key}
                              className="truncate max-w-[200px] hover:text-blue-600 cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                onBind(field.key, field.key.includes("[]"));
                              }}
                              title={`Bind: ${field.key}`}
                            >
                              {field.key.split(".").pop()}: {String(field.value)}
                            </span>
                          ))}

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectItem(index);
                              if (onSelectRecord) {
                                onSelectRecord(item, index);
                              }
                            }}
                            className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                          >
                            {isSelected ? "✓ Selected" : "Select this item"}
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectItem(index);
                        if (onSelectRecord) {
                          onSelectRecord(item, index);
                        }
                      }}
                      className={`px-3 py-1.5 text-xs rounded transition-all flex-shrink-0 ${
                        isSelected
                          ? "bg-blue-100 text-blue-700 border border-blue-300"
                          : "bg-blue-50 text-blue-600 hover:bg-blue-100 opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      {isSelected ? "Selected" : "Select"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
