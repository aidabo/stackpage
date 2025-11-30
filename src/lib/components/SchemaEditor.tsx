// SchemaEditor.tsx - Fix the field type handling
import React, { useState } from "react";
import { FieldSchema, FieldType, NamedList, DataSource } from "./types";

interface SchemaEditorProps {
  schema: FieldSchema[];
  lists: NamedList[];
  dataSources?: DataSource[];
  onChange: (newSchema: FieldSchema[]) => void;
  isNested?: boolean;
}

const FIELD_TYPES: FieldType[] = [
  "text",
  "textarea",
  "richtext",
  "select",
  "checkbox",
  "number",
  "image",
  "video",
  "audio",
  "color",
  "file",
  "tel",
  "email",
  "password",
  "date",
  "array",
];

interface OptionsEditorProps {
  options?: string[];
  onChange: (newOptions: string[]) => void;
}

const OptionsEditor: React.FC<OptionsEditorProps> = ({
  options = [],
  onChange,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim()) {
      onChange([...options, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemove = (indexToRemove: number) => {
    onChange(options.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="col-span-2 mt-2 bg-gray-50 p-3 rounded border border-gray-300">
      <label className="text-xs text-gray-600 uppercase font-semibold mb-2 block">
        Select Options
      </label>

      {/* Options List */}
      <div className="flex flex-wrap gap-2 mb-3">
        {options.length > 0 ? (
          options.map((option, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1 bg-white border border-gray-300 rounded px-2 py-1 text-xs text-gray-700 group"
            >
              <span>{option}</span>
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="ml-1 text-gray-500 hover:text-red-500 focus:outline-none transition-colors"
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))
        ) : (
          <div className="text-xs text-gray-500 italic">
            No options defined.
          </div>
        )}
      </div>

      {/* Add Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="New option..."
          className="flex-1 bg-white border border-gray-300 rounded px-2 py-1 text-sm text-gray-700 focus:border-blue-500 outline-none"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded text-xs font-medium transition-colors border border-gray-300"
        >
          Add
        </button>
      </div>
    </div>
  );
};

// Array Item Schema Editor Component
interface ArrayItemSchemaEditorProps {
  itemSchema: FieldSchema[];
  onChange: (newItemSchema: FieldSchema[]) => void;
  lists: NamedList[];
  dataSources: DataSource[];
}

const ArrayItemSchemaEditor: React.FC<ArrayItemSchemaEditorProps> = ({
  itemSchema,
  onChange,
  lists,
  dataSources,
}) => {
  const [showEditor, setShowEditor] = useState(false);

  return (
    <div className="col-span-2 mt-2 bg-blue-50 p-3 rounded border border-blue-200">
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs text-blue-700 uppercase font-semibold">
          Array Item Structure
        </label>
        <button
          type="button"
          onClick={() => setShowEditor(!showEditor)}
          className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors"
        >
          {showEditor ? "Hide Editor" : "Edit Items"}
        </button>
      </div>

      {showEditor && (
        <div className="mt-2 p-3 bg-white rounded border border-blue-300">
          <p className="text-xs text-blue-600 mb-3">
            Define the structure of each item in this array:
          </p>
          <SchemaEditor
            schema={itemSchema}
            lists={lists}
            dataSources={dataSources}
            onChange={onChange}
            isNested={true}
          />
        </div>
      )}

      {itemSchema.length > 0 && !showEditor && (
        <div className="text-xs text-blue-600">
          {itemSchema.length} field(s) defined for array items
        </div>
      )}

      {itemSchema.length === 0 && !showEditor && (
        <div className="text-xs text-blue-500 italic">
          No item structure defined. Click "Edit Items" to define array item
          fields.
        </div>
      )}
    </div>
  );
};

export const SchemaEditor: React.FC<SchemaEditorProps> = ({
  schema,
  lists,
  dataSources = [],
  onChange,
  isNested = false,
}) => {
  const handleFieldChange = (
    index: number,
    key: keyof FieldSchema,
    value: any
  ) => {
    const newSchema = [...schema];
    newSchema[index] = { ...newSchema[index], [key]: value };

    // Logic to clear other mutually exclusive props when switching source types
    if (key === "listRef" && value) {
      delete newSchema[index].options;
      delete newSchema[index].dataSourceRef;
      delete newSchema[index].dataSourceLabelKey;
      delete newSchema[index].dataSourceValueKey;
    } else if (key === "dataSourceRef" && value) {
      delete newSchema[index].options;
      delete newSchema[index].listRef;
      // Initialize defaults for keys if missing
      if (!newSchema[index].dataSourceLabelKey)
        newSchema[index].dataSourceLabelKey = "name";
      if (!newSchema[index].dataSourceValueKey)
        newSchema[index].dataSourceValueKey = "id";
    } else if (key === "type") {
      // Handle type changes
      if (value !== "select") {
        // Clear select-specific properties when type changes from select
        delete newSchema[index].options;
        delete newSchema[index].listRef;
        delete newSchema[index].dataSourceRef;
        delete newSchema[index].dataSourceLabelKey;
        delete newSchema[index].dataSourceValueKey;
      }

      if (value !== "array") {
        // Clear array-specific properties when type changes from array
        delete newSchema[index].itemSchema;
      } else if (value === "array" && !newSchema[index].itemSchema) {
        // Initialize empty item schema for new array fields
        newSchema[index].itemSchema = [];
      }
    }

    onChange(newSchema);
  };

  const handleItemSchemaChange = (
    index: number,
    newItemSchema: FieldSchema[]
  ) => {
    const newSchema = [...schema];
    newSchema[index] = {
      ...newSchema[index],
      itemSchema: newItemSchema,
    };
    onChange(newSchema);
  };

  const handleRemoveField = (index: number) => {
    const newSchema = schema.filter((_, i) => i !== index);
    onChange(newSchema);
  };

  const handleAddField = () => {
    const newField: FieldSchema = {
      key: `field_${schema.length + 1}`,
      label: "New Field",
      type: "text",
    };
    onChange([...schema, newField]);
  };

  return (
    <div className={`flex flex-col gap-4 ${isNested ? "pb-4" : "pb-10"}`}>
      {schema.map((field, index) => (
        <div
          key={index}
          className="bg-white border border-gray-300 p-4 rounded flex flex-col gap-3 relative group"
        >
          <div className="flex justify-between items-start gap-2">
            {/* Field Configuration Grid */}
            <div className="grid grid-cols-2 gap-3 flex-1">
              {/* Label */}
              <div className="col-span-1">
                <label className="text-xs text-gray-600 uppercase font-semibold mb-1 block">
                  Label
                </label>
                <input
                  type="text"
                  value={field.label}
                  onChange={(e) =>
                    handleFieldChange(index, "label", e.target.value)
                  }
                  className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Key */}
              <div className="col-span-1">
                <label className="text-xs text-gray-600 uppercase font-semibold mb-1 block">
                  JSON Key
                </label>
                <input
                  type="text"
                  value={field.key}
                  onChange={(e) =>
                    handleFieldChange(index, "key", e.target.value)
                  }
                  className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-yellow-600 font-mono focus:border-blue-500 outline-none"
                />
              </div>

              {/* Type */}
              <div className="col-span-1">
                <label className="text-xs text-gray-600 uppercase font-semibold mb-1 block">
                  Type
                </label>
                <select
                  value={field.type}
                  onChange={(e) =>
                    handleFieldChange(
                      index,
                      "type",
                      e.target.value as FieldType
                    )
                  }
                  className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:border-blue-500 outline-none"
                >
                  {FIELD_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Type-specific configuration */}

              {/* SELECT FIELD CONFIGURATION */}
              {field.type === "select" && (
                <div className="col-span-2 mt-3 bg-gray-50 border border-gray-200 p-3 rounded">
                  <div className="flex items-center gap-4 mb-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`source_${index}`}
                        checked={!field.listRef && !field.dataSourceRef}
                        onChange={() => {
                          const newField = {
                            ...field,
                            listRef: undefined,
                            dataSourceRef: undefined,
                            options: field.options || [],
                          };
                          const newSchema = [...schema];
                          newSchema[index] = newField;
                          onChange(newSchema);
                        }}
                        className="text-blue-500 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">
                        Custom Options
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`source_${index}`}
                        checked={!!field.listRef}
                        onChange={() => {
                          const firstList = lists.length > 0 ? lists[0].id : "";
                          const newField = {
                            ...field,
                            listRef: firstList,
                            dataSourceRef: undefined,
                            options: undefined,
                          };
                          const newSchema = [...schema];
                          newSchema[index] = newField;
                          onChange(newSchema);
                        }}
                        className="text-blue-500 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">List</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`source_${index}`}
                        checked={!!field.dataSourceRef}
                        onChange={() => {
                          const firstDS =
                            dataSources.length > 0 ? dataSources[0].id : "";
                          const newField = {
                            ...field,
                            dataSourceRef: firstDS,
                            listRef: undefined,
                            options: undefined,
                            dataSourceLabelKey: "name",
                            dataSourceValueKey: "id",
                          };
                          const newSchema = [...schema];
                          newSchema[index] = newField;
                          onChange(newSchema);
                        }}
                        className="text-purple-500 focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700">API</span>
                    </label>
                  </div>

                  {/* Render based on selection */}
                  {field.listRef ? (
                    <div>
                      <label className="text-xs text-gray-600 uppercase font-semibold mb-2 block">
                        Select List Source
                      </label>
                      {lists.length > 0 ? (
                        <select
                          value={field.listRef}
                          onChange={(e) =>
                            handleFieldChange(index, "listRef", e.target.value)
                          }
                          className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:border-blue-500 outline-none"
                        >
                          {lists.map((l) => (
                            <option key={l.id} value={l.id}>
                              {l.name} ({l.items.length} items)
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div className="text-sm text-red-600 p-2 border border-red-200 bg-red-50 rounded">
                          No lists found. Create lists in the Lists tab first.
                        </div>
                      )}
                    </div>
                  ) : field.dataSourceRef ? (
                    <div className="flex flex-col gap-3">
                      <div>
                        <label className="text-xs text-gray-600 uppercase font-semibold mb-2 block">
                          Data Source
                        </label>
                        {dataSources.length > 0 ? (
                          <select
                            value={field.dataSourceRef}
                            onChange={(e) =>
                              handleFieldChange(
                                index,
                                "dataSourceRef",
                                e.target.value
                              )
                            }
                            className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:border-purple-500 outline-none"
                          >
                            {dataSources.map((d) => (
                              <option key={d.id} value={d.id}>
                                {d.name} ({d.type})
                              </option>
                            ))}
                          </select>
                        ) : (
                          <div className="text-sm text-red-600 p-2 border border-red-200 bg-red-50 rounded">
                            No data sources found. Create data sources in the
                            Data Sources tab first.
                          </div>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-gray-600 uppercase font-semibold mb-1 block">
                            Label Key
                          </label>
                          <input
                            type="text"
                            value={field.dataSourceLabelKey || ""}
                            onChange={(e) =>
                              handleFieldChange(
                                index,
                                "dataSourceLabelKey",
                                e.target.value
                              )
                            }
                            placeholder="e.g. name"
                            className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-700"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-600 uppercase font-semibold mb-1 block">
                            Value Key
                          </label>
                          <input
                            type="text"
                            value={field.dataSourceValueKey || ""}
                            onChange={(e) =>
                              handleFieldChange(
                                index,
                                "dataSourceValueKey",
                                e.target.value
                              )
                            }
                            placeholder="e.g. id"
                            className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-700"
                          />
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 italic">
                        Keys must match properties in the API JSON response
                        array.
                      </div>
                    </div>
                  ) : (
                    <OptionsEditor
                      options={field.options}
                      onChange={(newOptions) =>
                        handleFieldChange(index, "options", newOptions)
                      }
                    />
                  )}
                </div>
              )}

              {/* ARRAY FIELD CONFIGURATION */}
              {field.type === "array" && (
                <ArrayItemSchemaEditor
                  itemSchema={field.itemSchema || []}
                  onChange={(newItemSchema) =>
                    handleItemSchemaChange(index, newItemSchema)
                  }
                  lists={lists}
                  dataSources={dataSources}
                />
              )}

              {/* Other field type descriptions */}
              {field.type === "file" && (
                <div className="col-span-2 mt-2">
                  <div className="text-xs text-gray-500 italic">
                    File fields support uploads for any file type. Use image,
                    video, or audio types for specific media.
                  </div>
                </div>
              )}

              {field.type === "date" && (
                <div className="col-span-2 mt-2">
                  <div className="text-xs text-gray-500 italic">
                    Date fields will show a date picker in the form.
                  </div>
                </div>
              )}
            </div>

            {/* Remove Button */}
            <button
              onClick={() => handleRemoveField(index)}
              className="text-gray-400 hover:text-red-500 p-1 rounded transition-colors"
              title="Remove Field"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={handleAddField}
        className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50 rounded text-gray-500 hover:text-gray-700 transition-all font-medium text-sm"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        Add New Field
      </button>
    </div>
  );
};
