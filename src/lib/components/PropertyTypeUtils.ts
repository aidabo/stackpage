// PropertyTypeUtils.ts
// Utility functions for property type detection and schema generation

// Helper functions for file type detection
export const getFileType = (
  name: string,
  value: string
): "image" | "video" | "audio" | "document" | "other" => {
  if (!value) return "other";

  const nameLower = name.toLowerCase();

  // Check for data URLs
  if (value.startsWith("data:")) {
    if (value.startsWith("data:image")) return "image";
    if (value.startsWith("data:video")) return "video";
    if (value.startsWith("data:audio")) return "audio";
    return "other";
  }

  // Check file extension
  const extension = value.split(".").pop()?.toLowerCase() || "";

  const imageExtensions = [
    "jpg", "jpeg", "png", "gif", "webp", "bmp", "svg", "ico", "tiff",
  ];
  const videoExtensions = [
    "mp4", "mov", "avi", "webm", "mkv", "flv", "wmv", "m4v", "3gp",
  ];
  const audioExtensions = ["mp3", "wav", "ogg", "aac", "flac", "m4a", "wma"];
  const documentExtensions = [
    "pdf", "doc", "docx", "txt", "rtf", "odt", "xls", "xlsx", "ppt", "pptx",
  ];

  if (imageExtensions.includes(extension)) return "image";
  if (videoExtensions.includes(extension)) return "video";
  if (audioExtensions.includes(extension)) return "audio";
  if (documentExtensions.includes(extension)) return "document";

  // Fallback to name-based detection
  if (
    nameLower.includes("image") ||
    nameLower.includes("avatar") ||
    nameLower.includes("logo") ||
    nameLower.includes("icon")
  ) {
    return "image";
  }
  if (nameLower.includes("video")) return "video";
  if (nameLower.includes("audio") || nameLower.includes("sound"))
    return "audio";
  if (
    nameLower.includes("document") ||
    nameLower.includes("pdf") ||
    nameLower.includes("doc")
  ) {
    return "document";
  }

  return "other";
};

export const getFileAccept = (name: string, value: any): string => {
  const nameLower = name.toLowerCase();
  const fileType = getFileType(name, value);

  // Priority 1: by field name
  if (
    nameLower.includes("image") ||
    nameLower.includes("avatar") ||
    nameLower.includes("logo") ||
    nameLower.includes("icon")
  ) {
    return "image/*";
  }
  if (nameLower.includes("video")) {
    return "video/*";
  }
  if (nameLower.includes("audio") || nameLower.includes("sound")) {
    return "audio/*";
  }
  if (
    nameLower.includes("document") ||
    nameLower.includes("pdf") ||
    nameLower.includes("doc")
  ) {
    return ".pdf,.doc,.docx,.txt,.rtf,.odt,.xls,.xlsx,.ppt,.pptx";
  }

  // Priority 2: by current file type
  switch (fileType) {
    case "image":
      return "image/*";
    case "video":
      return "video/*";
    case "audio":
      return "audio/*";
    case "document":
      return ".pdf,.doc,.docx,.txt,.rtf,.odt,.xls,.xlsx,.ppt,.pptx";
    default:
      return "*/*";
  }
};

// File type detection function
export const isFileTypeField = (key: string, value: any): boolean => {
  const keyLower = key.toLowerCase();

  // Check for special field names that should be file fields
  const fileFieldNames = [
    "src", "source", "file", "image", "url", "avatar", "logo", "icon",
    "video", "audio", "media", "background", "poster", "thumbnail",
  ];

  const isFileByName = fileFieldNames.some((fileName) =>
    keyLower.includes(fileName)
  );

  // Also check if the value looks like a file reference
  const isFileByValue =
    typeof value === "string" &&
    (value.startsWith("data:") || // Data URLs
      value.startsWith("blob:") || // Blob URLs
      value.match(
        /\.(jpg|jpeg|png|gif|webp|bmp|svg|mp4|mov|avi|webm|mkv|mp3|wav|ogg|pdf|doc|docx|txt|rtf)$/i
      ) || // File extensions
      value.match(
        /\/[^/]+\.(jpg|jpeg|png|gif|webp|bmp|svg|mp4|mov|avi|webm|mkv|mp3|wav|ogg|pdf|doc|docx|txt|rtf)(\?.*)?$/i
      )); // URL with file extension

  return isFileByName || (isFileByValue as any);
};

// Check if string represents static options array
export const isStaticOptionsArray = (value: string): boolean => {
  return typeof value === "string" && /^\[.*\]$/.test(value);
};

// Parse static options from string
export const parseStaticOptionsFromString = (value: string): string[] => {
  if (!isStaticOptionsArray(value)) return [];

  const match = value.match(/^\[(.*)\]$/);
  if (match) {
    return match[1]
      .split(",")
      .map((opt) => opt.trim())
      .filter((opt) => opt.length > 0);
  }

  return [];
};

// Enhanced select field detection
export const detectSelectField = (key: string, value: any): boolean => {
  const keyLower = key.toLowerCase();

  // Field name indicators for select fields
  const selectFieldNames = [
    "select", "option", "choice", "dropdown", "picker", "type", 
    "category", "status", "state", "mode",
  ];

  const isSelectByName = selectFieldNames.some((name) =>
    keyLower.includes(name)
  );

  // Value pattern indicators
  const isSelectByValue =
    typeof value === "string" &&
    (value.startsWith("/api/") || // API endpoint
      isStaticOptionsArray(value) || // Static options array
      value.includes("|") || // Pipe-separated values
      (value.includes(",") && value.split(",").length <= 10)); // Comma-separated values

  return isSelectByName || isSelectByValue;
};

// Enhanced property schema inference with better array-of-objects handling
export const inferPropertySchema = (key: string, value: any): any => {
  const type = typeof value;
  const keyLower = key.toLowerCase();

  const baseSchema: any = {
    title: key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase()),
    default: value,
  };

  // Check for file fields first (highest priority)
  const isFileField = isFileTypeField(key, value);
  if (isFileField) {
    baseSchema.type = "string";
    // Use "uri" format instead of custom "file" format for RJSF compatibility
    baseSchema.format = "uri";
    return baseSchema;
  }
  
  if (type === "string") {
    baseSchema.type = "string";

    // Enhanced select field detection
    const isSelectField = detectSelectField(key, value);
    if (isSelectField) {
      // Don't use custom format for select fields, use enum instead
      if (value && value.startsWith("/api/")) {
        baseSchema.description = "API Endpoint";
        // Use a custom property instead of format for dynamic selects
        baseSchema["x-dynamic-select"] = true;
      } else if (isStaticOptionsArray(value)) {
        // Parse static options from string like "[option1, option2]"
        const options = parseStaticOptionsFromString(value);
        if (options.length > 0) {
          baseSchema.enum = options;
        }
      }
    }

    // Standard format detection
    if (keyLower.includes("email")) {
      baseSchema.format = "email";
    } else if (keyLower.includes("color")) {
      baseSchema.format = "color";
    } else if (keyLower.includes("date") && !keyLower.includes("datetime")) {
      baseSchema.format = "date";
    } else if (keyLower.includes("datetime")) {
      baseSchema.format = "datetime";
    } else if (keyLower.includes("url") || keyLower.includes("link")) {
      baseSchema.format = "uri";
    }

    // Textarea detection
    if (
      value &&
      (value.length > 50 ||
        keyLower.includes("content") ||
        keyLower.includes("description"))
    ) {
      baseSchema.format = "textarea";
    }
  } else if (type === "number") {
    baseSchema.type = "number";
  } else if (type === "boolean") {
    baseSchema.type = "boolean";
  } else if (Array.isArray(value)) {
    baseSchema.type = "array";

    // Enhanced array of objects detection
    if (value.length > 0 && typeof value[0] === "object" && value[0] !== null) {
      const firstItem = value[0];
      const itemKeys = Object.keys(firstItem);

      // Only handle simple object arrays (no nested objects/arrays)
      const hasSimpleTypes = itemKeys.every((itemKey) => {
        const val = firstItem[itemKey];
        return (
          typeof val === "string" ||
          typeof val === "number" ||
          typeof val === "boolean" ||
          val === null
        );
      });

      if (hasSimpleTypes && itemKeys.length > 0) {
        baseSchema.items = {
          type: "object",
          properties: itemKeys.reduce((acc, itemKey) => {
            // Use a simplified schema inference for array items
            const itemValue = firstItem[itemKey];
            const itemType = typeof itemValue;
            
            const itemSchema: any = {
              title: itemKey
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase()),
            };

            if (itemType === "string") {
              itemSchema.type = "string";
              // Check if it's a file field within the array object
              if (isFileTypeField(itemKey, itemValue)) {
                itemSchema.format = "uri"; // Use uri format instead of file
              }
            } else if (itemType === "number") {
              itemSchema.type = "number";
            } else if (itemType === "boolean") {
              itemSchema.type = "boolean";
            } else {
              itemSchema.type = "string";
            }

            acc[itemKey] = itemSchema;
            return acc;
          }, {} as any),
        };
        // Use a custom property instead of format for array-of-objects
        baseSchema["x-array-of-objects"] = true;
      } else {
        // Fallback to JSON for complex objects
        baseSchema.items = { type: "object" };
        baseSchema.format = "json";
      }
    } else if (value.length > 0 && typeof value[0] === "string") {
      baseSchema.items = { type: "string" };
      // Check if array contains select options
      if (
        value.every((item) => typeof item === "string") &&
        value.length <= 10
      ) {
        baseSchema.enum = value;
      }
    } else {
      baseSchema.items = { type: "string" };
    }
  } else if (type === "object" && value !== null) {
    baseSchema.type = "object";
    baseSchema.format = "json";
  } else {
    baseSchema.type = "string";
  }

  return baseSchema;
};

// Generate JSON schema from currentProps with enhanced select item detection
export const generateSchemaFromCurrentProps = (currentProps: Record<string, any>) => {
  const schema: any = {
    type: "object",
    properties: {},
    required: [],
  };

  Object.entries(currentProps).forEach(([key, value]) => {
    schema.properties[key] = inferPropertySchema(key, value);
  });

  return schema;
};

// Generate UI schema with proper widget assignment
export const generateUiSchema = (
  currentProps: Record<string, any>, 
  schema: any,
  onFileUpload?: (file: File) => Promise<string>
) => {
  const uiSchema: any = {
    "ui:order": Object.keys(schema.properties || {}),
  };

  Object.keys(schema.properties || {}).forEach((key) => {
    const property = schema.properties[key];
    const value = currentProps[key];

    // Assign appropriate widgets based on schema and custom properties
    if (isFileTypeField(key, value)) {
      // Use custom widget for file fields regardless of format
      uiSchema[key] = {
        "ui:widget": "FileWidget",
      };
    } else if (property.type === "object" || property.format === "json") {
      uiSchema[key] = {
        "ui:widget": "JsonWidget",
      };
    } else if (property.format === "textarea") {
      uiSchema[key] = {
        "ui:widget": "CustomTextareaWidget",
        "ui:options": {
          rows: 5,
        },
      };
    } else if (property["x-dynamic-select"] || (property.enum && property.description === "API Endpoint")) {
      // Handle dynamic select using custom property
      uiSchema[key] = {
        "ui:widget": "CustomSelectWidget",
        "ui:options": {
          isDynamic: true,
        },
      };
    } else if (property.enum) {
      // Handle static select with enum
      uiSchema[key] = {
        "ui:widget": "CustomSelectWidget",
      };
    } else if (property.format === "date") {
      uiSchema[key] = {
        "ui:widget": "CustomDateWidget",
      };
    } else if (property.format === "datetime") {
      uiSchema[key] = {
        "ui:widget": "CustomDateTimeWidget",
      };
    } else if (property.format === "email") {
      uiSchema[key] = {
        "ui:widget": "CustomEmailWidget",
      };
    } else if (property.format === "color") {
      uiSchema[key] = {
        "ui:widget": "CustomColorWidget",
      };
    } else if (property.type === "boolean") {
      uiSchema[key] = {
        "ui:widget": "CustomCheckboxWidget",
      };
    } else if (property.type === "number") {
      uiSchema[key] = {
        "ui:widget": "CustomNumberWidget",
      };
    } else if (property["x-array-of-objects"] || (property.format === "array" && property.items?.type === "object")) {
      // Handle array-of-objects using custom property
      uiSchema[key] = {
        "ui:widget": "ArrayOfObjectsWidget",
        "ui:options": {
          onFileUpload: onFileUpload,
        },
      };
    } else {
      // Default to text widget for other string fields
      uiSchema[key] = {
        "ui:widget": "CustomTextWidget",
      };
    }

    // Add descriptions for special fields
    if (value && typeof value === "string" && value.startsWith("/api/")) {
      uiSchema[key] = {
        ...uiSchema[key],
        "ui:description": `API Endpoint: ${value}`,
      };
    }

    if (
      value &&
      typeof value === "string" &&
      value.toLowerCase().startsWith("/customaction/")
    ) {
      uiSchema[key] = {
        ...uiSchema[key],
        "ui:description": `Custom Action: ${value}`,
      };
    }
  });

  return uiSchema;
};

// DataBinding Field detection
export const isDataBindingField = (key: string, value: any): boolean => {
  const keyLower = key.toLowerCase();
  
  const bindingFieldNames = [
    "binding",
    "datasource",
    "dataSource", 
    "api",
    "endpoint",
    "url",
    "source",
  ];

  const isBindingByName = bindingFieldNames.some(name =>
    keyLower.includes(name)
  );

  const isBindingByValue =
    typeof value === "string" &&
    (value.startsWith("/api/") ||
     value.startsWith("http://") ||
     value.startsWith("https://") ||
     value.startsWith("data://") ||
     value.includes("${") || // Template literal
     value.startsWith("{")); // JSON-like

  return isBindingByName || isBindingByValue;
};