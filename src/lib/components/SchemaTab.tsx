// SchemaTab.tsx
import React, { useMemo } from "react";
import { SchemaEditor } from "./SchemaEditor";
import { useStackPage } from "./StackPageContext";
import { FieldType, FieldSchema, NamedList, DataSource } from "./types";
import {
  generateSchemaFromCurrentProps,
  isFileTypeField,
  getFileType,
  isDateField,
} from "./PropertyTypeUtils";

interface SchemaTabProps {
  schema: any;
  componentProps: any;
  onChange: (schema: any) => void;
}

// Convert JSON Schema to FieldSchema array format
const jsonSchemaToFieldSchema = (
  jsonSchema: any,
  componentProps: any
): FieldSchema[] => {
  if (!jsonSchema || !jsonSchema.properties) return [];

  return Object.entries(jsonSchema.properties).map(
    ([key, schemaDef]: [string, any]) => {
      const baseField: FieldSchema = {
        key,
        label: schemaDef.title || key,
        type: "text", // default
      };

      // Get the actual value from componentProps to help with detection
      const actualValue = componentProps[key];

      // Use PropertyTypeUtils to detect file types and date types
      const isFileField = isFileTypeField(key, actualValue);
      let fileType: string | null = null;
      if (isFileField) {
        fileType = getFileType(key, actualValue);
      }

      const isDateFieldValue = isDateField(key, actualValue);

      // Map JSON Schema types to FieldSchema types
      if (schemaDef.type === "boolean") {
        baseField.type = "checkbox";
      } else if (schemaDef.type === "array") {
        // ... existing array handling
      } else if (schemaDef.enum) {
        baseField.type = "select";
        baseField.options = schemaDef.enum;
      } else if (schemaDef.format === "textarea") {
        baseField.type = "textarea";
      } else if (schemaDef.format === "color") {
        baseField.type = "color";
      } else if (schemaDef["x-dynamic-select"]) {
        baseField.type = "select";
        baseField.dataSourceRef =
          schemaDef.description?.replace("API Endpoint: ", "") || "";
      } else if (schemaDef["x-list-reference"]) {
        baseField.type = "select";
        baseField.listRef = schemaDef["x-list-reference"];
      } else if (schemaDef.format === "uri" || isFileField) {
        // Enhanced media type detection
        if (fileType === "image") {
          baseField.type = "image";
        } else if (fileType === "video") {
          baseField.type = "video";
        } else if (fileType === "audio") {
          baseField.type = "audio";
        } else {
          baseField.type = "file";
        }
      } else if (schemaDef.format === "email") {
        baseField.type = "email";
      } else if (schemaDef.format === "date" || isDateFieldValue) {
        baseField.type = "date";
      } else if (
        key.toLowerCase().includes("phone") ||
        key.toLowerCase().includes("tel")
      ) {
        baseField.type = "tel";
      } else if (key.toLowerCase().includes("password")) {
        baseField.type = "password";
      }
      // Enhanced textarea detection - check if string value is long
      else if (
        schemaDef.type === "string" &&
        actualValue &&
        typeof actualValue === "string" &&
        actualValue.length > 80
      ) {
        baseField.type = "textarea";
      }

      return baseField;
    }
  );
};

// Convert FieldSchema array back to JSON Schema
const fieldSchemaToJsonSchema = (fieldSchemas: FieldSchema[]): any => {
  const properties: any = {};
  const required: string[] = [];

  fieldSchemas.forEach((field) => {
    const property: any = {
      title: field.label,
      default: getDefaultValue(field.type),
    };

    switch (field.type) {
      case "text":
        property.type = "string";
        break;
      case "textarea":
        property.type = "string";
        property.format = "textarea";
        break;
      case "richtext":
        property.type = "string";
        property.format = "richtext";
        break;
      case "select":
        // For select fields, we need to handle the different option sources
        property.type = "string";
        if (field.listRef) {
          property["x-list-reference"] = field.listRef;
          property.description = `List: ${field.listRef}`;
        } else if (field.dataSourceRef) {
          property["x-dynamic-select"] = true;
          property.description = `API Endpoint: ${field.dataSourceRef}`;
        } else if (field.options && field.options.length > 0) {
          // For custom options, store them as enum
          property.enum = field.options;
        }
        break;
      case "checkbox":
        property.type = "boolean";
        property.default = false;
        break;
      case "array":
        property.type = "array";
        if (field.itemSchema && field.itemSchema.length > 0) {
          // Convert item schema back to JSON schema
          property.items = fieldSchemaToJsonSchema(field.itemSchema);
        } else {
          // Default to object items if no schema defined
          property.items = { type: "object" };
        }
        break;
      case "image":
        property.type = "string";
        property.format = "uri";
        property["x-media-type"] = "image";
        break;
      case "video":
        property.type = "string";
        property.format = "uri";
        property["x-media-type"] = "video";
        break;
      case "audio":
        property.type = "string";
        property.format = "uri";
        property["x-media-type"] = "audio";
        break;
      case "file":
        property.type = "string";
        property.format = "uri";
        property["x-media-type"] = "file";
        break;
      case "color":
        property.type = "string";
        property.format = "color";
        break;
      case "email":
        property.type = "string";
        property.format = "email";
        break;
      case "tel":
        property.type = "string";
        property.format = "tel";
        break;
      case "password":
        property.type = "string";
        property.format = "password";
        break;
      case "date":
        property.type = "string";
        property.format = "date";
        break;
      default:
        property.type = "string";
    }

    properties[field.key] = property;
  });

  return {
    type: "object",
    properties,
    required,
  };
};

// Helper to get default value based on field type
const getDefaultValue = (type: FieldType): any => {
  switch (type) {
    case "checkbox":
      return false;
    case "select":
      return "";
    case "color":
      return "#000000";
    case "date":
      return new Date().toISOString().split("T")[0];
    case "array":
      return [];
    default:
      return "";
  }
};

export const SchemaTab: React.FC<SchemaTabProps> = ({
  schema,
  componentProps,
  onChange,
}) => {
  const { attributes } = useStackPage();

  // Update the useMemo to pass componentProps
  const fieldSchemas = useMemo(() => {
    return jsonSchemaToFieldSchema(schema, componentProps);
  }, [schema, componentProps]);

  // Get lists and data sources from context
  const lists: NamedList[] = useMemo(
    () => attributes.lists || [],
    [attributes.lists]
  );
  const dataSources: DataSource[] = useMemo(
    () => attributes.dataSources || [],
    [attributes.dataSources]
  );

  const handleSchemaChange = (newFieldSchemas: FieldSchema[]) => {
    // Convert back to JSON schema format
    const newJsonSchema = fieldSchemaToJsonSchema(newFieldSchemas);
    onChange(newJsonSchema);
  };

  const handleGenerateFromProps = () => {
    // Generate schema from current component props
    const newSchema = generateSchemaFromCurrentProps(componentProps);
    onChange(newSchema);
  };

  return (
    <div className="p-4 space-y-4 h-full overflow-auto bg-zinc-200">
      {/* Header with Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Schema Editor</h3>
          <div className="flex space-x-2">
            <button
              onClick={handleGenerateFromProps}
              className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
            >
              Generate from Props
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Define the structure and types of your component properties. The
          schema controls how properties appear in the Data tab.
        </p>
      </div>

      {/* Schema Editor */}
      {fieldSchemas.length > 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <SchemaEditor
            schema={fieldSchemas}
            lists={lists}
            dataSources={dataSources}
            onChange={handleSchemaChange}
          />
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <div className="text-3xl mb-3">📝</div>
          <p className="text-gray-600 mb-2">No schema defined yet</p>
          <p className="text-sm text-gray-500 mb-4">
            Generate a schema from current properties or start adding fields
            manually
          </p>
          <button
            onClick={handleGenerateFromProps}
            className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
          >
            Generate Schema from Props
          </button>
        </div>
      )}

      {/* Help Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-800 mb-2">Schema Tips</h4>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>
            • <strong>Label</strong>: Display name shown in the form
          </li>
          <li>
            • <strong>JSON Key</strong>: Property name used in the data
          </li>
          <li>
            • <strong>Text Types</strong>: text, textarea, richtext, email, tel,
            password
          </li>
          <li>
            • <strong>Media Types</strong>: image, video, audio, file
          </li>
          <li>
            • <strong>Special Types</strong>: color, date, checkbox
          </li>
          <li>
            • <strong>Select Fields</strong>: Can use custom options, lists, or
            API data sources
          </li>
          <li>
            • <strong>Generate from Props</strong>: Auto-create schema from
            current component properties
          </li>
          <li>• Changes here affect the form structure in the Data tab</li>
        </ul>
      </div>

      {/* Preview Section */}
      {fieldSchemas.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-800 mb-2">
            Schema Preview ({fieldSchemas.length} fields)
          </h4>
          <div className="text-xs text-gray-600 font-mono bg-white p-3 rounded border max-h-32 overflow-auto">
            <pre>
              {JSON.stringify(fieldSchemaToJsonSchema(fieldSchemas), null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
