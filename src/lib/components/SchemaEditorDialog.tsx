// SchemaEditorDialog.tsx - 完整版本，包含数组类型编辑
import React, { useState, useEffect } from "react";
import {
  isFileTypeField,
  getFileType,
  isDateField,
  isNumberField,
} from "./PropertyTypeUtils";
import { FieldSchema, FieldType, NamedList, DataSource } from "./types";

interface SchemaEditorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (schema: any) => void;
  defaultProps: any; // 组件的默认props数据
  currentSchema: any; // 当前的schema
  lists: NamedList[]; // 来自ListTab
  dataSources: DataSource[]; // 来自DataSourceTab
}

// 可用字段类型
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

// 辅助函数：将FieldType映射到JSON Schema类型
const fieldTypeToJsonSchemaType = (fieldType: FieldType): string => {
  switch (fieldType) {
    case "checkbox":
      return "boolean";
    case "number":
      return "number";
    case "array":
      return "array";
    default:
      return "string";
  }
};

// 辅助函数：将FieldType映射到JSON Schema格式
const fieldTypeToJsonSchemaFormat = (
  fieldType: FieldType
): string | undefined => {
  switch (fieldType) {
    case "textarea":
      return "textarea";
    case "richtext":
      return "richtext";
    case "email":
      return "email";
    case "date":
      return "date";
    case "color":
      return "color";
    case "password":
      return "password";
    case "tel":
      return "tel";
    case "image":
    case "video":
    case "audio":
    case "file":
      return "uri";
    default:
      return undefined;
  }
};

// 辅助函数：获取媒体类型
const getMediaType = (fieldType: FieldType): string | undefined => {
  switch (fieldType) {
    case "image":
      return "image";
    case "video":
      return "video";
    case "audio":
      return "audio";
    case "file":
      return "file";
    default:
      return undefined;
  }
};

// 辅助函数：获取媒体类型的显示标签
const getMediaTypeLabel = (fieldType: FieldType, fieldKey: string): string => {
  const keyLower = fieldKey.toLowerCase();

  if (fieldType === "image") {
    if (keyLower.includes("avatar")) return "Avatar";
    if (keyLower.includes("logo")) return "Logo";
    if (keyLower.includes("icon")) return "Icon";
    if (keyLower.includes("thumbnail")) return "Thumbnail";
    if (keyLower.includes("poster")) return "Poster";
    return "Image";
  } else if (fieldType === "video") {
    return "Video";
  } else if (fieldType === "audio") {
    return "Audio";
  } else if (fieldType === "file") {
    if (keyLower.includes("document")) return "Document";
    if (keyLower.includes("pdf")) return "PDF";
    if (keyLower.includes("attachment")) return "Attachment";
    return "File";
  }
  return fieldKey.charAt(0).toUpperCase() + fieldKey.slice(1);
};

// 自定义选项编辑器组件
const OptionsEditor: React.FC<{
  options?: string[];
  onChange: (newOptions: string[]) => void;
}> = ({ options = [], onChange }) => {
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
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 mb-2">
        {options.length > 0 ? (
          options.map((option, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1 bg-white border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 group"
            >
              <span>{option}</span>
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="ml-1 text-gray-500 hover:text-red-500 focus:outline-none transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5"
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
          <div className="text-sm text-gray-500 italic">
            No options defined.
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="New option..."
          className="flex-1 bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:border-blue-500 outline-none"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  );
};

// 数组项字段编辑器组件
interface ArrayItemEditorProps {
  itemSchema?: FieldSchema[];
  onChange: (newItemSchema: FieldSchema[]) => void;
}

const ArrayItemEditor: React.FC<ArrayItemEditorProps> = ({
  itemSchema = [],
  onChange,
}) => {
  const [items, setItems] = useState<FieldSchema[]>(itemSchema);
  const [newFieldKey, setNewFieldKey] = useState("");
  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [newFieldDescription, setNewFieldDescription] = useState("");
  const [newFieldType, setNewFieldType] = useState<FieldType>("text");

  // 当外部itemSchema变化时更新本地状态
  useEffect(() => {
    setItems(itemSchema);
  }, [itemSchema]);

  const handleAddField = () => {
    if (!newFieldKey.trim()) return;

    const fieldType = newFieldType;
    let fieldLabel = newFieldLabel.trim() || newFieldKey.trim();

    // 如果是媒体类型，自动设置合适的标签
    if (["image", "video", "audio", "file"].includes(fieldType)) {
      fieldLabel = getMediaTypeLabel(fieldType, newFieldKey.trim());
    }

    const newField: FieldSchema = {
      key: newFieldKey.trim(),
      label: fieldLabel,
      type: fieldType,
      description: newFieldDescription.trim() || undefined,
    };

    const updatedItems = [...items, newField];
    setItems(updatedItems);
    onChange(updatedItems);

    // 重置表单
    setNewFieldKey("");
    setNewFieldLabel("");
    setNewFieldDescription("");
    setNewFieldType("text");
  };

  const handleRemoveField = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    onChange(updatedItems);
  };

  const handleFieldChange = (
    index: number,
    field: keyof FieldSchema,
    value: any
  ) => {
    const updatedItems = [...items];

    if (field === "type") {
      // 保存旧值以便比较
      const oldType = updatedItems[index].type;
      const fieldKey = updatedItems[index].key;
      const currentLabel = updatedItems[index].label;

      updatedItems[index] = { ...updatedItems[index], [field]: value };

      // 如果是媒体类型，确保有正确的标签
      if (["image", "video", "audio", "file"].includes(value)) {
        // 如果标签是默认的或者与旧类型相关，则更新标签
        if (
          oldType !== value || // 类型改变了
          currentLabel === fieldKey || // 标签与键名相同
          currentLabel ===
            fieldKey.charAt(0).toUpperCase() + fieldKey.slice(1) || // 标签是默认的大写形式
          (oldType === "text" &&
            ["image", "video", "audio", "file"].includes(value)) // 从文本类型变为媒体类型
        ) {
          updatedItems[index].label = getMediaTypeLabel(value, fieldKey);
        }
      }

      // 如果不是媒体类型，但之前是媒体类型，重置标签为默认格式
      if (
        !["image", "video", "audio", "file"].includes(value) &&
        ["image", "video", "audio", "file"].includes(oldType)
      ) {
        updatedItems[index].label =
          fieldKey.charAt(0).toUpperCase() + fieldKey.slice(1);
      }
    } else if (field === "key") {
      // 如果键名改变，检查是否需要更新标签
      const currentType = updatedItems[index].type;
      const currentLabel = updatedItems[index].label;
      const oldKey = items[index].key;

      updatedItems[index] = { ...updatedItems[index], [field]: value };

      // 如果是媒体类型，且标签是基于旧键名生成的，则更新标签
      if (["image", "video", "audio", "file"].includes(currentType)) {
        const oldKeyBasedLabel = getMediaTypeLabel(currentType, oldKey);
        if (currentLabel === oldKeyBasedLabel) {
          updatedItems[index].label = getMediaTypeLabel(currentType, value);
        }
      } else if (
        currentLabel ===
        oldKey.charAt(0).toUpperCase() + oldKey.slice(1)
      ) {
        // 如果是默认标签格式，更新
        updatedItems[index].label =
          value.charAt(0).toUpperCase() + value.slice(1);
      }
    } else {
      updatedItems[index] = { ...updatedItems[index], [field]: value };
    }

    setItems(updatedItems);
    onChange(updatedItems);
  };

  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h4 className="font-medium text-gray-900">Array Item Structure</h4>
      <p className="text-sm text-gray-600">
        Define the structure of each item in this array
      </p>

      {/* 添加新字段的表单 */}
      <div className="bg-white p-4 rounded-lg border border-gray-300 space-y-3">
        <h5 className="text-sm font-medium text-gray-700">Add New Field</h5>
        <div className="grid grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Field Key *
            </label>
            <input
              type="text"
              value={newFieldKey}
              onChange={(e) => setNewFieldKey(e.target.value)}
              placeholder="e.g., name"
              className="w-full p-2 border border-gray-300 rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Field Label
            </label>
            <input
              type="text"
              value={newFieldLabel}
              onChange={(e) => setNewFieldLabel(e.target.value)}
              placeholder="e.g., Name"
              className="w-full p-2 border border-gray-300 rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              value={newFieldType}
              onChange={(e) => setNewFieldType(e.target.value as FieldType)}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            >
              {FIELD_TYPES.filter((t) => t !== "array").map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              value={newFieldDescription}
              onChange={(e) => setNewFieldDescription(e.target.value)}
              placeholder="Helper text in DataTab"
              className="w-full p-2 border border-gray-300 rounded text-sm"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handleAddField}
          disabled={!newFieldKey.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Add Field
        </button>
      </div>

      {/* 字段列表 */}
      <div className="space-y-2">
        <h5 className="text-sm font-medium text-gray-700">
          Fields ({items.length})
        </h5>
        {items.length === 0 ? (
          <div className="text-center py-4 text-gray-500 text-sm bg-white rounded border">
            No fields defined. Add fields to define the array item structure.
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((field, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-white rounded border border-gray-300"
              >
                <div className="flex-1 grid grid-cols-4 gap-3">
                  <div>
                    <input
                      type="text"
                      value={field.key}
                      onChange={(e) =>
                        handleFieldChange(index, "key", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={field.label}
                      onChange={(e) =>
                        handleFieldChange(index, "label", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <div>
                    <select
                      value={field.type}
                      onChange={(e) =>
                        handleFieldChange(
                          index,
                          "type",
                          e.target.value as FieldType
                        )
                      }
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                    >
                      {FIELD_TYPES.filter((t) => t !== "array").map((type) => (
                        <option key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={field.description || ""}
                      onChange={(e) =>
                        handleFieldChange(index, "description", e.target.value)
                      }
                      placeholder="Helper text in DataTab"
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveField(index)}
                  className="text-red-600 hover:text-red-800 p-1"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// 本地使用的字段类型
interface SchemaEditorField {
  name: string;
  type: FieldType;
  label: string;
  description?: string;
  // select类型的所有配置都保留，不会互相清除
  options?: string[];
  listRef?: string;
  dataSourceRef?: string;
  dataSourceLabelKey?: string;
  dataSourceValueKey?: string;
  // 当前激活的select配置类型
  activeSelectSource?: "options" | "list" | "api";
  // array类型的项结构
  itemSchema?: FieldSchema[];
}

export const SchemaEditorDialog: React.FC<SchemaEditorDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  defaultProps,
  currentSchema,
  lists,
  dataSources,
}) => {
  const [fields, setFields] = useState<SchemaEditorField[]>([]);
  const [selectedFieldIndex, setSelectedFieldIndex] = useState<number | null>(
    null
  );
  const [showSelectConfig, setShowSelectConfig] = useState(false);
  const [showArrayConfig, setShowArrayConfig] = useState(false);

  // 辅助函数：推断数组项字段类型
  const inferArrayItemType = (key: string, value: any): FieldType => {
    // 使用相同的推断逻辑，但专门用于数组项
    if (typeof value === "boolean") return "checkbox";
    if (typeof value === "number") return "number";

    if (typeof value === "string") {
      // 检查是否是文件类型
      if (isFileTypeField(key, value)) {
        const fileType = getFileType(key, value);
        switch (fileType) {
          case "image":
            return "image";
          case "video":
            return "video";
          case "audio":
            return "audio";
          default:
            return "file";
        }
      }

      // 检查特殊格式
      const keyLower = key.toLowerCase();
      if (keyLower.includes("email")) return "email";
      if (keyLower.includes("password")) return "password";
      if (keyLower.includes("tel") || keyLower.includes("phone")) return "tel";
      if (keyLower.includes("color")) return "color";
      if (keyLower.includes("date")) return "date";
      if (value.length > 100) return "textarea";

      // 检查是否是选项数组字符串（如 "[option1, option2]"）
      if (value.startsWith("[") && value.endsWith("]")) {
        return "select";
      }
    }

    return "text";
  };

  // 初始化：如果有当前schema，使用它；否则从props推断
  useEffect(() => {
    if (currentSchema && currentSchema.properties) {
      // 从现有schema转换
      const fieldArray = Object.entries(currentSchema.properties).map(
        ([key, schemaDef]: [string, any]) => {
          const field: SchemaEditorField = {
            name: key,
            label: schemaDef.title || key,
            type: "text", // 默认
            description: schemaDef.description || "",
          };

          // 转换类型
          if (schemaDef.type === "boolean") {
            field.type = "checkbox";
          } else if (schemaDef.type === "number") {
            field.type = "number";
          } else if (schemaDef.type === "array") {
            field.type = "array";
            // 如果有items结构，尝试转换
            if (schemaDef.items && schemaDef.items.properties) {
              const itemProps = schemaDef.items.properties;
              field.itemSchema = Object.entries(itemProps).map(
                ([itemKey, itemSchemaDef]: [string, any]) => {
                  const itemField: FieldSchema = {
                    key: itemKey,
                    label: itemSchemaDef.title || itemKey,
                    type: "text",
                    description: itemSchemaDef.description || "",
                  };

                  // 转换项字段类型
                  if (itemSchemaDef.type === "boolean") {
                    itemField.type = "checkbox";
                  } else if (itemSchemaDef.type === "number") {
                    itemField.type = "number";
                  } else if (itemSchemaDef.enum) {
                    itemField.type = "select";
                    itemField.options = itemSchemaDef.enum;
                  } else if (itemSchemaDef.format === "textarea") {
                    itemField.type = "textarea";
                  } else if (itemSchemaDef.format === "email") {
                    itemField.type = "email";
                  } else if (itemSchemaDef.format === "date") {
                    itemField.type = "date";
                  } else if (itemSchemaDef.format === "color") {
                    itemField.type = "color";
                  } else if (itemSchemaDef["x-media-type"]) {
                    itemField.type = itemSchemaDef["x-media-type"];
                  } else if (itemSchemaDef.format === "uri") {
                    // 尝试从名称推断媒体类型
                    const fileType = getFileType(itemKey, "");
                    itemField.type =
                      fileType === "document" ? "file" : fileType;
                  }

                  return itemField;
                }
              );
            }
          } else if (schemaDef.enum) {
            field.type = "select";
            field.options = schemaDef.enum;
            field.activeSelectSource = "options";
          } else if (schemaDef.format === "textarea") {
            field.type = "textarea";
          } else if (schemaDef.format === "richtext") {
            field.type = "richtext";
          } else if (schemaDef.format === "color") {
            field.type = "color";
          } else if (schemaDef.format === "email") {
            field.type = "email";
          } else if (schemaDef.format === "date") {
            field.type = "date";
          } else if (schemaDef["x-media-type"]) {
            field.type = schemaDef["x-media-type"];
          } else if (schemaDef.format === "uri") {
            // Try to detect from name if format is uri but no x-media-type
            const fileType = getFileType(key, "");
            field.type = fileType === "document" ? "file" : fileType;
          } else if (schemaDef["x-list-reference"]) {
            field.type = "select";
            field.listRef = schemaDef["x-list-reference"];
            field.activeSelectSource = "list";
          } else if (schemaDef["x-dynamic-select"]) {
            field.type = "select";
            field.dataSourceRef =
              schemaDef.description?.replace("API Endpoint: ", "") || "";
            field.activeSelectSource = "api";
          }

          // 如果没有设置activeSelectSource，根据现有数据推断
          if (field.type === "select" && !field.activeSelectSource) {
            if (field.listRef) field.activeSelectSource = "list";
            else if (field.dataSourceRef) field.activeSelectSource = "api";
            else field.activeSelectSource = "options";
          }

          return field;
        }
      );
      setFields(fieldArray);
    } else if (defaultProps) {
      // 从props自动生成初始字段
      const initialFields = Object.keys(defaultProps).map((key) => {
        const field: SchemaEditorField = {
          name: key,
          type: inferTypeFromValue(defaultProps[key], key),
          label: key.charAt(0).toUpperCase() + key.slice(1),
        };

        // 特殊处理：如果值是数组，进一步检测数组项的类型
        if (
          field.type === "array" &&
          Array.isArray(defaultProps[key]) &&
          defaultProps[key].length > 0
        ) {
          const firstItem = defaultProps[key][0];
          if (typeof firstItem === "object" && firstItem !== null) {
            // 从第一个对象项推断字段结构
            field.itemSchema = Object.keys(firstItem).map((itemKey) => {
              const itemValue = firstItem[itemKey];
              const itemType = inferArrayItemType(itemKey, itemValue);

              return {
                key: itemKey,
                label: getMediaTypeLabel(itemType, itemKey),
                type: itemType,
              };
            });
          }
        }

        // 如果是select类型，初始化activeSelectSource
        if (field.type === "select") {
          field.activeSelectSource = "options";
        }

        return field;
      });
      setFields(initialFields);
    }
  }, [currentSchema, defaultProps]);

  // 从值推断类型
  const inferTypeFromValue = (value: any, key: string): FieldType => {
    // 首先检查是否是数字字段
    if (isNumberField(key, value)) {
      return "number";
    }

    // 然后检查是否是日期字段
    if (isDateField(key, value)) {
      return "date";
    }

    // 检查是否是文件类型字段
    if (isFileTypeField(key, value)) {
      const fileType = getFileType(key, value);
      switch (fileType) {
        case "image":
          return "image";
        case "video":
          return "video";
        case "audio":
          return "audio";
        case "document":
          return "file"; // 将 document 映射为 file 类型
        case "file":
          return "file";
        default:
          return "file";
      }
    }

    // 基本类型检查
    if (typeof value === "boolean") return "checkbox";
    if (typeof value === "number") return "number";

    if (Array.isArray(value)) {
      // 检查数组元素类型
      if (value.length === 0) return "array";

      const firstElement = value[0];
      if (typeof firstElement === "object" && firstElement !== null) {
        return "array";
      }
      if (typeof firstElement === "string") {
        // 如果数组元素都是字符串，可能是 select 选项
        if (value.every((item) => typeof item === "string")) {
          return "select";
        }
        return "array";
      }
      return "array";
    }

    if (typeof value === "string") {
      const keyLower = key.toLowerCase();

      // 特殊字符串格式检查
      if (keyLower.includes("email")) return "email";
      if (keyLower.includes("password")) return "password";
      if (keyLower.includes("tel") || keyLower.includes("phone")) return "tel";
      if (keyLower.includes("color")) return "color";
      if (keyLower.includes("url") || keyLower.includes("link")) {
        // 如果是 URL，进一步检查是否为文件类型
        if (isFileTypeField(key, value)) {
          const fileType = getFileType(key, value);
          switch (fileType) {
            case "image":
              return "image";
            case "video":
              return "video";
            case "audio":
              return "audio";
            default:
              return "file";
          }
        }
        return "text";
      }

      // 长文本检查
      if (value.length > 100) return "textarea";

      // 检查是否是选项数组字符串（如 "[option1, option2]"）
      if (value.startsWith("[") && value.endsWith("]")) {
        return "select";
      }

      // 检查是否是 API 端点
      if (value.startsWith("/api/") || value.startsWith("http")) {
        return "select"; // API 端点通常用于动态选择
      }
    }

    // 默认为文本
    return "text";
  };

  // 处理字段变更
  const handleFieldChange = (index: number, field: string, value: any) => {
    const newFields = [...fields];
    newFields[index] = { ...newFields[index], [field]: value };

    // 如果类型改变，重置相关配置
    if (field === "type") {
      if (value !== "select") {
        // 不是select类型，清除所有select相关配置
        delete newFields[index].options;
        delete newFields[index].listRef;
        delete newFields[index].dataSourceRef;
        delete newFields[index].dataSourceLabelKey;
        delete newFields[index].dataSourceValueKey;
        delete newFields[index].activeSelectSource;
      }
      if (value !== "array") {
        // 不是array类型，清除itemSchema
        delete newFields[index].itemSchema;
      }

      // 如果是新设置为select类型，初始化activeSelectSource
      if (value === "select" && !newFields[index].activeSelectSource) {
        newFields[index].activeSelectSource = "options";
      }

      // 如果是新设置为array类型，初始化空itemSchema
      if (value === "array" && !newFields[index].itemSchema) {
        newFields[index].itemSchema = [];
      }

      // 对于媒体类型，确保有正确的格式
      if (["image", "video", "audio", "file"].includes(value)) {
        // 媒体类型不需要额外配置
      }
    }

    // 如果字段名称改变，且是媒体类型，可以自动更新标签
    if (
      field === "name" &&
      ["image", "video", "audio", "file"].includes(newFields[index].type)
    ) {
      const keyLower = value.toLowerCase();
      let label = newFields[index].label;

      // 如果当前标签是默认的（如 "Field X"）或者与旧名称相关，则更新标签
      if (
        label ===
          newFields[index].name.charAt(0).toUpperCase() +
            newFields[index].name.slice(1) ||
        label === `Field ${index + 1}`
      ) {
        if (keyLower.includes("image")) label = "Image";
        else if (keyLower.includes("video")) label = "Video";
        else if (keyLower.includes("audio")) label = "Audio";
        else if (keyLower.includes("file")) label = "File";
        else if (keyLower.includes("icon")) label = "Icon";
        else if (keyLower.includes("avatar")) label = "Avatar";
        else if (keyLower.includes("logo")) label = "Logo";
        else label = value.charAt(0).toUpperCase() + value.slice(1);

        newFields[index].label = label;
      }
    }

    setFields(newFields);
  };

  // 处理select来源变更
  const handleSelectSourceChange = (
    index: number,
    source: "options" | "list" | "api"
  ) => {
    const newFields = [...fields];
    newFields[index] = {
      ...newFields[index],
      activeSelectSource: source,
      // 初始化对应源的默认值（如果不存在）
      options:
        source === "options" && !newFields[index].options
          ? []
          : newFields[index].options,
      listRef:
        source === "list" && !newFields[index].listRef && lists.length > 0
          ? lists[0].id
          : newFields[index].listRef,
      dataSourceRef:
        source === "api" &&
        !newFields[index].dataSourceRef &&
        dataSources.length > 0
          ? dataSources[0].id
          : newFields[index].dataSourceRef,
      dataSourceLabelKey:
        source === "api" && !newFields[index].dataSourceLabelKey
          ? "name"
          : newFields[index].dataSourceLabelKey,
      dataSourceValueKey:
        source === "api" && !newFields[index].dataSourceValueKey
          ? "id"
          : newFields[index].dataSourceValueKey,
    };
    setFields(newFields);
  };

  // 处理array itemSchema变更
  const handleArrayItemSchemaChange = (
    index: number,
    newItemSchema: FieldSchema[]
  ) => {
    const newFields = [...fields];
    newFields[index] = {
      ...newFields[index],
      itemSchema: newItemSchema,
    };
    setFields(newFields);
  };

  // 添加新字段
  const handleAddField = () => {
    const newField: SchemaEditorField = {
      name: `field_${fields.length + 1}`,
      type: "text",
      label: `Field ${fields.length + 1}`,
    };
    setFields([...fields, newField]);
  };

  // 删除字段
  const handleRemoveField = (index: number) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
    if (selectedFieldIndex === index) {
      setSelectedFieldIndex(null);
      setShowSelectConfig(false);
      setShowArrayConfig(false);
    }
  };

  // 保存schema
  const handleSave = () => {
    const jsonSchema = {
      type: "object",
      properties: fields.reduce((acc, field) => {
        const property: any = {
          title: field.label,
          type: fieldTypeToJsonSchemaType(field.type),
        };

        if (field.description && field.description.trim()) {
          property.description = field.description.trim();
        }

        // 添加格式信息
        const format = fieldTypeToJsonSchemaFormat(field.type);
        if (format) {
          property.format = format;
        }

        // 添加媒体类型信息
        const mediaType = getMediaType(field.type);
        if (mediaType) {
          property["x-media-type"] = mediaType;
        }

        // select类型特殊处理
        if (field.type === "select") {
          // 保存activeSelectSource作为扩展属性
          if (field.activeSelectSource) {
            property["x-active-select-source"] = field.activeSelectSource;
          }

          // 根据激活的源保存对应配置
          if (field.activeSelectSource === "list" && field.listRef) {
            property["x-list-reference"] = field.listRef;
            property.description = `List: ${field.listRef}`;
          } else if (
            field.activeSelectSource === "api" &&
            field.dataSourceRef
          ) {
            property["x-dynamic-select"] = true;
            property.description = `API Endpoint: ${field.dataSourceRef}`;
          } else if (field.activeSelectSource === "options" && field.options) {
            property.enum = field.options;
          }
        }

        // array类型处理
        if (field.type === "array") {
          property.type = "array";
          if (field.itemSchema && field.itemSchema.length > 0) {
            // 转换itemSchema为JSON schema格式
            property.items = {
              type: "object",
              properties: field.itemSchema.reduce((itemAcc, itemField) => {
                const itemProp: any = {
                  title: itemField.label,
                  type: fieldTypeToJsonSchemaType(itemField.type),
                };

                if (itemField.description && itemField.description.trim()) {
                  itemProp.description = itemField.description.trim();
                }

                const itemFormat = fieldTypeToJsonSchemaFormat(itemField.type);
                if (itemFormat) {
                  itemProp.format = itemFormat;
                }

                // 添加媒体类型信息
                const mediaType = getMediaType(itemField.type);
                if (mediaType) {
                  itemProp["x-media-type"] = mediaType;
                }

                if (itemField.type === "select" && itemField.options) {
                  itemProp.enum = itemField.options;
                }

                itemAcc[itemField.key] = itemProp;
                return itemAcc;
              }, {} as any),
            };
          } else {
            property.items = { type: "object" };
          }
        }

        // checkbox类型设置默认值
        if (field.type === "checkbox") {
          property.default = false;
        }

        // number类型设置默认值
        if (field.type === "number") {
          property.default = 0;
        }

        acc[field.name] = property;
        return acc;
      }, {} as any),
      required: [],
    };

    onSave(jsonSchema);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Schema Editor</h2>
          <p className="text-sm text-gray-600 mt-1">
            Define the structure of your component properties
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Fields Table */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Fields</h3>
              <button
                onClick={handleAddField}
                className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
              >
                + Add Field
              </button>
            </div>

            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Field Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Label
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {fields.map((field, index) => (
                    <React.Fragment key={index}>
                      <tr className="hover:bg-gray-50">
                        {/* Field Name */}
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={field.name}
                            onChange={(e) =>
                              handleFieldChange(index, "name", e.target.value)
                            }
                            className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-blue-500 focus:border-blue-500"
                          />
                        </td>

                        {/* Label */}
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={field.label}
                            onChange={(e) =>
                              handleFieldChange(index, "label", e.target.value)
                            }
                            className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-blue-500 focus:border-blue-500"
                          />
                        </td>

                        {/* Type */}
                        <td className="px-4 py-3">
                          <select
                            value={field.type}
                            onChange={(e) => {
                              const newType = e.target.value as FieldType;
                              handleFieldChange(index, "type", newType);
                              if (newType === "select") {
                                setSelectedFieldIndex(index);
                                setShowSelectConfig(true);
                                setShowArrayConfig(false);
                              } else if (newType === "array") {
                                setSelectedFieldIndex(index);
                                setShowSelectConfig(false);
                                setShowArrayConfig(true);
                              } else {
                                setSelectedFieldIndex(null);
                                setShowSelectConfig(false);
                                setShowArrayConfig(false);
                              }
                            }}
                            className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-blue-500 focus:border-blue-500"
                          >
                            {FIELD_TYPES.map((type) => (
                              <option key={type} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </option>
                            ))}
                          </select>

                          {/* Quick actions for select type */}
                          {field.type === "select" && (
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedFieldIndex(index);
                                setShowSelectConfig(true);
                                setShowArrayConfig(false);
                              }}
                              className="mt-2 text-xs text-blue-600 hover:text-blue-800"
                            >
                              Configure select options →
                            </button>
                          )}

                          {/* Quick actions for array type */}
                          {field.type === "array" && (
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedFieldIndex(index);
                                setShowSelectConfig(false);
                                setShowArrayConfig(true);
                              }}
                              className="mt-2 text-xs text-purple-600 hover:text-purple-800"
                            >
                              Configure array structure →
                            </button>
                          )}
                        </td>

                        {/* Description */}
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={field.description || ""}
                            onChange={(e) =>
                              handleFieldChange(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                            className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Helper text shown in DataTab"
                          />
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleRemoveField(index)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>

                      {/* Select Configuration Row */}
                      {field.type === "select" &&
                        selectedFieldIndex === index &&
                        showSelectConfig && (
                          <tr className="bg-blue-50">
                            <td colSpan={5} className="px-4 py-4">
                              <div className="bg-white p-4 rounded-lg border border-blue-200">
                                <div className="flex justify-between items-center mb-4">
                                  <h4 className="font-medium text-gray-900">
                                    Select Field Configuration
                                  </h4>
                                  <button
                                    onClick={() => {
                                      setShowSelectConfig(false);
                                      setSelectedFieldIndex(null);
                                    }}
                                    className="text-gray-500 hover:text-gray-700"
                                  >
                                    ×
                                  </button>
                                </div>

                                <div className="space-y-6">
                                  {/* Option Source Selection - 使用单选按钮组 */}
                                  <div className="flex space-x-6">
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                      <input
                                        type="radio"
                                        name={`source_${index}`}
                                        checked={
                                          field.activeSelectSource === "options"
                                        }
                                        onChange={() =>
                                          handleSelectSourceChange(
                                            index,
                                            "options"
                                          )
                                        }
                                        className="text-blue-600 focus:ring-blue-500"
                                      />
                                      <span className="text-sm text-gray-700">
                                        Custom Options
                                      </span>
                                    </label>

                                    <label className="flex items-center space-x-2 cursor-pointer">
                                      <input
                                        type="radio"
                                        name={`source_${index}`}
                                        checked={
                                          field.activeSelectSource === "list"
                                        }
                                        onChange={() =>
                                          handleSelectSourceChange(
                                            index,
                                            "list"
                                          )
                                        }
                                        className="text-blue-600 focus:ring-blue-500"
                                      />
                                      <span className="text-sm text-gray-700">
                                        List
                                      </span>
                                    </label>

                                    <label className="flex items-center space-x-2 cursor-pointer">
                                      <input
                                        type="radio"
                                        name={`source_${index}`}
                                        checked={
                                          field.activeSelectSource === "api"
                                        }
                                        onChange={() =>
                                          handleSelectSourceChange(index, "api")
                                        }
                                        className="text-blue-600 focus:ring-blue-500"
                                      />
                                      <span className="text-sm text-gray-700">
                                        API
                                      </span>
                                    </label>
                                  </div>

                                  {/* 根据当前激活的源显示对应配置 */}
                                  <div className="space-y-4">
                                    {/* Custom Options */}
                                    {field.activeSelectSource === "options" && (
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                          Options
                                        </label>
                                        <OptionsEditor
                                          options={field.options || []}
                                          onChange={(newOptions) =>
                                            handleFieldChange(
                                              index,
                                              "options",
                                              newOptions
                                            )
                                          }
                                        />
                                        <p className="text-xs text-gray-500 mt-2">
                                          Add custom options for this select
                                          field
                                        </p>
                                      </div>
                                    )}

                                    {/* List Selection */}
                                    {field.activeSelectSource === "list" && (
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                          Select List
                                        </label>
                                        <select
                                          value={field.listRef || ""}
                                          onChange={(e) =>
                                            handleFieldChange(
                                              index,
                                              "listRef",
                                              e.target.value
                                            )
                                          }
                                          className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-blue-500 focus:border-blue-500"
                                        >
                                          <option value="">
                                            Select a list
                                          </option>
                                          {lists.map((list) => (
                                            <option
                                              key={list.id}
                                              value={list.id}
                                            >
                                              {list.name} ({list.items.length}{" "}
                                              items)
                                            </option>
                                          ))}
                                        </select>
                                        <p className="text-xs text-gray-500 mt-2">
                                          Choose a list from your List Manager
                                        </p>
                                      </div>
                                    )}

                                    {/* API Selection */}
                                    {field.activeSelectSource === "api" && (
                                      <div className="space-y-4">
                                        <div>
                                          <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Select Data Source
                                          </label>
                                          <select
                                            value={field.dataSourceRef || ""}
                                            onChange={(e) =>
                                              handleFieldChange(
                                                index,
                                                "dataSourceRef",
                                                e.target.value
                                              )
                                            }
                                            className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-blue-500 focus:border-blue-500"
                                          >
                                            <option value="">
                                              Select a data source
                                            </option>
                                            {dataSources.map((ds) => (
                                              <option key={ds.id} value={ds.id}>
                                                {ds.name} ({ds.type})
                                              </option>
                                            ))}
                                          </select>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                          <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                              Label Key
                                            </label>
                                            <input
                                              type="text"
                                              value={
                                                field.dataSourceLabelKey || ""
                                              }
                                              onChange={(e) =>
                                                handleFieldChange(
                                                  index,
                                                  "dataSourceLabelKey",
                                                  e.target.value
                                                )
                                              }
                                              className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-blue-500 focus:border-blue-500"
                                              placeholder="e.g., name"
                                            />
                                          </div>

                                          <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                              Value Key
                                            </label>
                                            <input
                                              type="text"
                                              value={
                                                field.dataSourceValueKey || ""
                                              }
                                              onChange={(e) =>
                                                handleFieldChange(
                                                  index,
                                                  "dataSourceValueKey",
                                                  e.target.value
                                                )
                                              }
                                              className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-blue-500 focus:border-blue-500"
                                              placeholder="e.g., id"
                                            />
                                          </div>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                          Keys must match properties in the API
                                          JSON response array.
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}

                      {/* Array Configuration Row */}
                      {field.type === "array" &&
                        selectedFieldIndex === index &&
                        showArrayConfig && (
                          <tr className="bg-purple-50">
                            <td colSpan={5} className="px-4 py-4">
                              <div className="bg-white p-4 rounded-lg border border-purple-200">
                                <div className="flex justify-between items-center mb-4">
                                  <h4 className="font-medium text-gray-900">
                                    Array Field Configuration
                                  </h4>
                                  <button
                                    onClick={() => {
                                      setShowArrayConfig(false);
                                      setSelectedFieldIndex(null);
                                    }}
                                    className="text-gray-500 hover:text-gray-700"
                                  >
                                    ×
                                  </button>
                                </div>

                                <div className="space-y-6">
                                  <ArrayItemEditor
                                    itemSchema={field.itemSchema}
                                    onChange={(newItemSchema) =>
                                      handleArrayItemSchemaChange(
                                        index,
                                        newItemSchema
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Schema Preview */}
          {fields.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-2">Schema Preview</h3>
              <pre className="text-xs bg-white p-3 rounded border max-h-40 overflow-auto">
                {JSON.stringify(
                  {
                    type: "object",
                    properties: fields.reduce((acc, field) => {
                      const prop: any = {
                        title: field.label,
                        type: fieldTypeToJsonSchemaType(field.type),
                      };

                      if (field.description && field.description.trim()) {
                        prop.description = field.description.trim();
                      }

                      // 添加格式信息
                      const format = fieldTypeToJsonSchemaFormat(field.type);
                      if (format) {
                        prop.format = format;
                      }

                      // 添加媒体类型信息
                      const mediaType = getMediaType(field.type);
                      if (mediaType) {
                        prop["x-media-type"] = mediaType;
                      }

                      // 添加select类型信息
                      if (field.type === "select") {
                        if (field.activeSelectSource) {
                          prop["x-active-select-source"] =
                            field.activeSelectSource;
                        }

                        if (field.listRef) {
                          prop["x-list-reference"] = field.listRef;
                          prop.description = `List: ${field.listRef}`;
                        } else if (field.dataSourceRef) {
                          prop["x-dynamic-select"] = true;
                          prop.description = `API Endpoint: ${field.dataSourceRef}`;
                        } else if (field.options) {
                          prop.enum = field.options;
                        }
                      }

                      // 添加array类型信息
                      if (field.type === "array") {
                        prop.type = "array";
                        if (field.itemSchema && field.itemSchema.length > 0) {
                          prop.items = {
                            type: "object",
                            properties: field.itemSchema.reduce(
                              (itemAcc, itemField) => {
                                const itemProp: any = {
                                  title: itemField.label,
                                  type: fieldTypeToJsonSchemaType(
                                    itemField.type
                                  ),
                                };

                                if (
                                  itemField.description &&
                                  itemField.description.trim()
                                ) {
                                  itemProp.description =
                                    itemField.description.trim();
                                }

                                const itemFormat = fieldTypeToJsonSchemaFormat(
                                  itemField.type
                                );
                                if (itemFormat) {
                                  itemProp.format = itemFormat;
                                }

                                const mediaType = getMediaType(itemField.type);
                                if (mediaType) {
                                  itemProp["x-media-type"] = mediaType;
                                }

                                itemAcc[itemField.key] = itemProp;
                                return itemAcc;
                              },
                              {} as any
                            ),
                          };
                        } else {
                          prop.items = { type: "object" };
                        }
                      }

                      return { ...acc, [field.name]: prop };
                    }, {}),
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Save Schema
          </button>
        </div>
      </div>
    </div>
  );
};
