// PropertyTypeUtils.ts - 增强版本，包含更好的数组项媒体类型检测
// Helper functions for file type detection
export const getFileType = (
  name: string,
  value: string
): "image" | "video" | "audio" | "document" | "file" => {
  if (!value) {
    // If no value, try to detect from name
    const nameLower = name.toLowerCase();
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
    return "file";
  }

  const nameLower = name.toLowerCase();

  // Check for data URLs
  if (value.startsWith("data:")) {
    if (value.startsWith("data:image")) return "image";
    if (value.startsWith("data:video")) return "video";
    if (value.startsWith("data:audio")) return "audio";
    return "file";
  }

  // Check file extension
  const extension = value.split(".").pop()?.toLowerCase() || "";

  const imageExtensions = [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "webp",
    "bmp",
    "svg",
    "ico",
    "tiff",
  ];
  const videoExtensions = [
    "mp4",
    "mov",
    "avi",
    "webm",
    "mkv",
    "flv",
    "wmv",
    "m4v",
    "3gp",
  ];
  const audioExtensions = ["mp3", "wav", "ogg", "aac", "flac", "m4a", "wma"];
  const documentExtensions = [
    "pdf",
    "doc",
    "docx",
    "txt",
    "rtf",
    "odt",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
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

  return "file";
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
    "src",
    "source",
    "file",
    "image",
    "url",
    "avatar",
    "logo",
    "icon",
    "video",
    "audio",
    "media",
    "backgroundImage",
    "background-image",
    "background-image-url",
    "poster",
    "thumbnail",
    "photo",
    "picture",
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

  return isFileByName || (isFileByValue as boolean);
};

// Number field detection function
export const isNumberField = (key: string, value: any): boolean => {
  const keyLower = key.toLowerCase();

  // Field name indicators for number fields
  const numberFieldNames = [
    "number",
    "count",
    "quantity",
    "amount",
    "price",
    "cost",
    "total",
    "percentage",
    "percent",
    "rate",
    "score",
    "age",
    "year",
    "month",
    "day",
    "hour",
    "minute",
    "second",
    "duration",
    "delay",
    "interval",
    "index",
    "order",
    "priority",
    "level",
    "step",
    "limit",
    "average",
    "sum",
  ];

  const isNumberByName = numberFieldNames.some((name) => keyLower == name);

  // If it's a string (and not empty), it's likely not a number field (e.g. "100%")
  // unless we want to convert it, but schema generation usually strictly follows types.
  if (typeof value === "string" && value.trim() !== "") {
    return false;
  }

  // Value pattern indicators
  const isNumberByValue = typeof value === "number";

  return isNumberByName || isNumberByValue;
};

export const isDateField = (key: string, value: any): boolean => {
  const keyLower = key.toLowerCase();

  // Field name indicators for date fields
  const dateFieldNames = [
    "date",
    "time",
    "created",
    "updated",
    "published",
    "birth",
    "start",
    "end",
    "deadline",
    "expiry",
    "due",
  ];

  const isDateByName = dateFieldNames.some((name) => keyLower.includes(name));

  // Value pattern indicators for common date formats
  const isDateByValue =
    typeof value === "string" &&
    // YYYY-MM-DD
    (/^\d{4}-\d{2}-\d{2}$/.test(value) ||
      // YYYY/MM/DD
      /^\d{4}\/\d{2}\/\d{2}$/.test(value) ||
      // MM/DD/YYYY
      /^\d{2}\/\d{2}\/\d{4}$/.test(value) ||
      // DD/MM/YYYY
      /^\d{2}\/\d{2}\/\d{4}$/.test(value) ||
      // YYYY年MM月DD日
      /^\d{4}年\d{1,2}月\d{1,2}日$/.test(value) ||
      // ISO date format
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value) ||
      // Timestamp (numeric string)
      (/^\d+$/.test(value) && value.length >= 8 && value.length <= 13));

  return isDateByName || isDateByValue;
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
    "select",
    "option",
    "choice",
    "dropdown",
    "picker",
    "type",
    "category",
    "status",
    "state",
    "mode",
  ];

  const isSelectByName = selectFieldNames.some((name) =>
    keyLower.includes(name)
  );

  // Value pattern indicators
  const isSelectByValue =
    typeof value === "string" &&
    !value.startsWith("data:") && // Exclude data URIs
    !value.startsWith("blob:") && // Exclude blob URIs
    (value.startsWith("/api/") || // API endpoint
      isStaticOptionsArray(value) || // Static options array
      value.includes("|") || // Pipe-separated values
      (value.includes(",") && value.split(",").length <= 10)); // Comma-separated values

  return isSelectByName || isSelectByValue;
};

export const inferPropertySchema = (key: string, value: any): any => {
  const type = typeof value;
  const keyLower = key.toLowerCase();

  const baseSchema: any = {
    title: key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase()),
    default: value,
  };

  // Check for number fields first (before date and file)
  if (isNumberField(key, value)) {
    baseSchema.type = "number";
    return baseSchema;
  }

  // Check for date fields
  if (isDateField(key, value)) {
    baseSchema.type = "string";
    baseSchema.format = "date";
    return baseSchema;
  }

  // Check for file fields
  const isFileField = isFileTypeField(key, value);
  if (isFileField) {
    baseSchema.type = "string";
    baseSchema.format = "uri";

    // 添加媒体类型信息
    const fileType = getFileType(key, value);
    if (fileType === "image") {
      baseSchema["x-media-type"] = "image";
    } else if (fileType === "video") {
      baseSchema["x-media-type"] = "video";
    } else if (fileType === "audio") {
      baseSchema["x-media-type"] = "audio";
    } else {
      baseSchema["x-media-type"] = "file";
    }

    return baseSchema;
  }

  if (type === "string") {
    baseSchema.type = "string";
    // Enhanced textarea detection - if value length > 80, set as textarea
    if (value && value && value.length > 80) {
      baseSchema.format = "textarea";
    }

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
                // 添加媒体类型信息
                const fileType = getFileType(itemKey, itemValue);
                if (fileType === "image") {
                  itemSchema["x-media-type"] = "image";
                } else if (fileType === "video") {
                  itemSchema["x-media-type"] = "video";
                } else if (fileType === "audio") {
                  itemSchema["x-media-type"] = "audio";
                } else {
                  itemSchema["x-media-type"] = "file";
                }
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

// PropertyTypeUtils.ts - Enhanced generateSchemaFromCurrentProps
export const generateSchemaFromCurrentProps = (props: any): any => {
  const properties: any = {};
  const required: string[] = [];
  const schemaOptions = props?.__schemaOptions || {};

  const applySchemaOverrides = (property: any, override: any) => {
    if (!override || typeof override !== "object") return property;

    // Select by static options
    if (Array.isArray(override.options) && override.options.length > 0) {
      property.type = "string";
      property.enum = override.options;
    }

    // Select by page-scope list reference (ListTab list id or name)
    if (override.listRef) {
      property.type = "string";
      property["x-list-reference"] = override.listRef;
    }

    // Dynamic select source (API or datasource)
    if (override.dynamicSelect) {
      property.type = "string";
      property["x-dynamic-select"] = true;
    }

    // Common override passthrough
    const passthroughKeys = [
      "type",
      "format",
      "title",
      "description",
      "default",
      "minimum",
      "maximum",
      "multipleOf",
      "x-list-reference",
      "x-dynamic-select",
      "x-active-select-source",
      "x-media-type",
      "x-array-binding",
    ];
    passthroughKeys.forEach((k) => {
      if (override[k] !== undefined) {
        property[k] = override[k];
      }
    });

    return property;
  };

  Object.entries(props).forEach(([key, value]) => {
    // Skip internal properties
    if (key.startsWith("__")) return;

    const property: any = {
      title: key.charAt(0).toUpperCase() + key.slice(1),
    };

    // Check for number fields first
    if (isNumberField(key, value)) {
      property.type = "number";
      property.default = value || 0;
    }
    // Then check arrays - IMPORTANT: This handles arrays of objects
    else if (Array.isArray(value)) {
      if (value.length === 0) {
        // Empty array - default to string array
        property.type = "array";
        property.items = { type: "string" };
      } else {
        // Check the type of the first element
        const firstElement = value[0];

        // Check if it's an object (but not null or array)
        if (
          typeof firstElement === "object" &&
          firstElement !== null &&
          !Array.isArray(firstElement)
        ) {
          // Array of objects - treat as true array
          property.type = "array";

          // Generate detailed schema for array items
          property.items = {
            type: "object",
            properties: Object.keys(firstElement).reduce((acc, itemKey) => {
              const itemValue = firstElement[itemKey];
              const itemProp: any = {
                title: itemKey.charAt(0).toUpperCase() + itemKey.slice(1),
              };

              // Check for media types in array items
              if (isFileTypeField(itemKey, itemValue)) {
                itemProp.type = "string";
                itemProp.format = "uri";

                const fileType = getFileType(itemKey, itemValue);
                if (fileType === "image") {
                  itemProp["x-media-type"] = "image";
                } else if (fileType === "video") {
                  itemProp["x-media-type"] = "video";
                } else if (fileType === "audio") {
                  itemProp["x-media-type"] = "audio";
                } else {
                  itemProp["x-media-type"] = "file";
                }
              }
              // Check for number types in array items
              else if (isNumberField(itemKey, itemValue)) {
                itemProp.type = "number";
              }
              // Check for date types in array items
              else if (isDateField(itemKey, itemValue)) {
                itemProp.type = "string";
                itemProp.format = "date";
              }
              // Handle other types
              else if (typeof itemValue === "string") {
                itemProp.type = "string";
                // Long text detection
                if (itemValue.length > 80) {
                  itemProp.format = "textarea";
                }
              } else if (typeof itemValue === "number") {
                itemProp.type = "number";
              } else if (typeof itemValue === "boolean") {
                itemProp.type = "boolean";
              } else {
                itemProp.type = "string";
              }

              acc[itemKey] = itemProp;
              return acc;
            }, {} as any),
          };

          // Add a marker for array binding support
          property["x-array-binding"] = true;
        } else {
          // Array of simple types (string, number, boolean) - treat as select field
          property.type = "string";
          property.items = { type: typeof firstElement };

          // If it's strings and looks like options, set as enum
          if (typeof firstElement === "string" && value.length <= 10) {
            property.enum = value;
          }
        }
      }
    }
    // Then check file types
    else if (isFileTypeField(key, value)) {
      property.type = "string";
      property.format = "uri";

      // Set specific media type hints based on detection
      const fileType = getFileType(key, value as any);
      if (fileType === "image") {
        property["x-media-type"] = "image";
      } else if (fileType === "video") {
        property["x-media-type"] = "video";
      } else if (fileType === "audio") {
        property["x-media-type"] = "audio";
      } else {
        property["x-media-type"] = "file";
      }
    }
    // Then check date types
    else if (isDateField(key, value)) {
      property.type = "string";
      property.format = "date";
    }
    // Then handle other types
    else if (typeof value === "string") {
      property.type = "string";
      const keyLower = key.toLowerCase();
      
      // Standard format detection based on key name
      if (keyLower.includes("color")) {
        property.format = "color";
      } else if (keyLower.includes("email")) {
        property.format = "email";
      } else if (keyLower.includes("date") && !keyLower.includes("datetime")) {
        property.format = "date";
      } else if (keyLower.includes("datetime")) {
        property.format = "datetime";
      } else if (keyLower.includes("url") || keyLower.includes("link")) {
        property.format = "uri";
      }

      // Check for specific string formats (value-based checks)
      if (
        value.startsWith("http") ||
        value.startsWith("/") ||
        value.includes(".")
      ) {
        if (
          keyLower.includes("image") ||
          keyLower.includes("avatar") ||
          keyLower.includes("photo")
        ) {
          property.format = "uri";
          property["x-media-type"] = "image";
        } else if (keyLower.includes("video")) {
          property.format = "uri";
          property["x-media-type"] = "video";
        } else if (keyLower.includes("audio")) {
          property.format = "uri";
          property["x-media-type"] = "audio";
        } else if (keyLower.includes("file")) {
          property.format = "uri";
          property["x-media-type"] = "file";
        }
      }
      
      // Enhanced textarea detection - if value length > 80, set as textarea
      if (value && value.length > 80) {
        property.format = "textarea";
      }
    } else if (typeof value === "number") {
      property.type = "number";
      property.default = value || 0;
    } else if (typeof value === "boolean") {
      property.type = "boolean";
    } else if (typeof value === "object" && value !== null) {
      property.type = "object";
      property.properties = generateSchemaFromCurrentProps(value).properties;
    } else {
      property.type = "string";
    }

    const override = schemaOptions[key];
    properties[key] = applySchemaOverrides(property, override);
  });

  return {
    type: "object",
    properties,
    required,
  };
};

// PropertyTypeUtils.ts - 修复generateUiSchema函数
export const generateUiSchema = (schema: any): any => {
  const uiSchema: any = {};

  if (!schema || !schema.properties) {
    return uiSchema;
  }

  Object.entries(schema.properties || {}).forEach(
    ([key, property]: [string, any]) => {
      uiSchema[key] = {};

      // Pass through extension properties
      if (property["x-active-select-source"]) {
        uiSchema[key]["x-active-select-source"] =
          property["x-active-select-source"];
      }
      if (property["x-list-reference"]) {
        uiSchema[key]["x-list-reference"] = property["x-list-reference"];
      }
      if (property["x-dynamic-select"]) {
        uiSchema[key]["x-dynamic-select"] = property["x-dynamic-select"];
      }
      if (property["x-media-type"]) {
        uiSchema[key]["x-media-type"] = property["x-media-type"];
      }
      if (property["x-array-binding"]) {
        uiSchema[key]["x-array-binding"] = property["x-array-binding"];
      }

      // Handle array types
      if (property.type === "array") {
        if (property.items && property.items.type === "object") {
          // Array of objects - use ArrayOfObjectsWidget
          uiSchema[key]["ui:widget"] = "ArrayOfObjectsWidget";
        } else {
          // Simple array - let RJSF handle it with default ArrayField
          // Do NOT set ui:widget to "array" as it doesn't exist
          // uiSchema[key]["ui:widget"] = "array";
        }
      }
      // Handle number type
      else if (property.type === "number") {
        uiSchema[key]["ui:widget"] = "CustomNumberWidget";
      }
      // Handle other widget assignments
      else if (property.format === "uri") {
        const keyLower = key.toLowerCase();
        if (
          keyLower.includes("image") ||
          keyLower.includes("avatar") ||
          keyLower.includes("photo")
        ) {
          uiSchema[key]["ui:widget"] = "FileWidget";
        } else if (keyLower.includes("video")) {
          uiSchema[key]["ui:widget"] = "FileWidget";
        } else if (keyLower.includes("audio")) {
          uiSchema[key]["ui:widget"] = "FileWidget";
        } else {
          uiSchema[key]["ui:widget"] = "FileWidget";
        }
      } else if (property.format === "color") {
        uiSchema[key]["ui:widget"] = "CustomColorWidget";
      } else if (
        property.enum ||
        property["x-list-reference"] ||
        property["x-dynamic-select"]
      ) {
        uiSchema[key]["ui:widget"] = "CustomSelectWidget";
      } else if (property.type === "boolean") {
        uiSchema[key]["ui:widget"] = "CustomCheckboxWidget";
      } else if (property.format === "textarea") {
        uiSchema[key]["ui:widget"] = "CustomTextareaWidget";
      } else if (property.format === "email") {
        uiSchema[key]["ui:widget"] = "CustomEmailWidget";
      } else if (property.format === "date") {
        uiSchema[key]["ui:widget"] = "CustomDateWidget";
      }
    }
  );

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

  const isBindingByName = bindingFieldNames.some((name) =>
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
