/* eslint-disable no-case-declarations */
// PropertiesTab.tsx
import React from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { useStackPage } from "./StackPageContext";
import { useWidgetProps } from "./StackPageWidgetProps";

interface PropertiesTabProps {
  onFileUpload?: (file: File) => Promise<string>;
  onApiCall?: (endpoint: string, data?: any) => Promise<any>;
  onCustomAction?: (action: string, data: any) => Promise<any>;
  onGetSelectOptions?: (
    propertyName: string,
    componentType: string
  ) => Promise<string[]>;
}

// Custom field template for better layout
const CustomFieldTemplate = (props: any) => {
  const {
    id,
    classNames,
    label,
    help,
    required,
    description,
    errors,
    children,
  } = props;

  return (
    <div className={`mb-6 ${classNames}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="w-full">{children}</div>

      {description && (
        <div className="text-xs text-gray-500 mt-1">{description}</div>
      )}

      {errors && <div className="text-xs text-red-600 mt-1">{errors}</div>}

      {help && <div className="text-xs text-blue-600 mt-1">{help}</div>}
    </div>
  );
};

// Helper functions for file type detection
const getFileType = (
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

  return "other";
};

const getFileAccept = (name: string, value: any): string => {
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
const isFileTypeField = (key: string, value: any): boolean => {
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
    "background",
    "poster",
    "thumbnail",
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

// Enhanced file upload widget that works for all file types
const FileWidget = (props: any) => {
  const [uploading, setUploading] = React.useState(false);
  const [currentValue, setCurrentValue] = React.useState(props.value || "");
  const [selectedFileName, setSelectedFileName] = React.useState("");
  const [blobUrls, setBlobUrls] = React.useState<Set<string>>(new Set());

  React.useEffect(() => {
    setCurrentValue(props.value || "");
    // Reset selected file name when value changes externally
    if (!props.value) {
      setSelectedFileName("");
    }
  }, [props.value]);

  // Clean up blob URLs on unmount
  React.useEffect(() => {
    return () => {
      blobUrls.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [blobUrls]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
      setUploading(true);
      try {
        let fileUrl: string;

        if (props.onFileUpload) {
          // Use the provided upload handler
          fileUrl = await props.onFileUpload(file);
        } else {
          // Generate blob URL or data URL for immediate preview
          if (file.type.startsWith("image/") && file.size < 5 * 1024 * 1024) {
            // For small images, use data URL
            fileUrl = await new Promise((resolve) => {
              const reader = new FileReader();
              reader.onload = (e) => resolve(e.target?.result as string);
              reader.readAsDataURL(file);
            });
          } else {
            // For larger files or non-images, use blob URL
            fileUrl = URL.createObjectURL(file);
            setBlobUrls((prev) => new Set([...prev, fileUrl]));
          }
        }

        setCurrentValue(fileUrl);
        props.onChange(fileUrl);
      } catch (error) {
        console.error("File processing failed:", error);
        alert("File processing failed");
        setSelectedFileName("");
      } finally {
        setUploading(false);
        // Clear the file input
        event.target.value = "";
      }
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setCurrentValue(newValue);
    props.onChange(newValue);
    // Clear selected file name when URL is manually changed
    setSelectedFileName("");
  };

  const handleClear = () => {
    // Clean up blob URL if it's a blob URL we created
    if (currentValue.startsWith("blob:") && blobUrls.has(currentValue)) {
      URL.revokeObjectURL(currentValue);
      setBlobUrls((prev) => {
        const newSet = new Set(prev);
        newSet.delete(currentValue);
        return newSet;
      });
    }

    setCurrentValue("");
    setSelectedFileName("");
    props.onChange("");
  };

  // Get file type for preview and accept attribute
  const fileType = getFileType(props.name, currentValue);
  const acceptTypes = getFileAccept(props.name, currentValue);

  // Extract file name from URL for display
  const getDisplayFileName = () => {
    if (selectedFileName) return selectedFileName;
    if (!currentValue) return "";

    // Try to extract filename from URL
    try {
      if (currentValue.startsWith("data:")) {
        return "Image file";
      }
      if (currentValue.startsWith("blob:")) {
        return "Selected file";
      }
      const url = new URL(currentValue);
      const pathname = url.pathname;
      const filename = pathname.split("/").pop();
      return filename || "File";
    } catch {
      // If URL parsing fails, try to extract from the string
      const parts = currentValue.split("/");
      const lastPart = parts[parts.length - 1];
      const filename = lastPart.split("?")[0]; // Remove query params
      return filename || "File";
    }
  };

  const displayFileName = getDisplayFileName();

  return (
    <div className="space-y-4 w-full">
      {/* URL Input */}
      <div className="space-y-2 w-full">
        <label className="block text-sm font-medium text-gray-700">
          File URL
        </label>
        <div className="flex space-x-2 w-full">
          <input
            type="url"
            value={currentValue}
            onChange={handleUrlChange}
            className="flex-1 min-w-0 p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://example.com/file.jpg"
          />
          {currentValue && (
            <button
              type="button"
              onClick={handleClear}
              className="flex-shrink-0 px-4 py-3 bg-gray-500 text-white rounded-lg text-sm hover:bg-gray-600 transition-colors whitespace-nowrap"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* File Upload */}
      <div className="space-y-2 w-full">
        <div className="flex flex-col gap-2 w-full">
          {/* File input and uploading indicator in one line */}
          <div className="flex gap-2 w-full">
            <div className="flex-1 min-w-0">
              <input
                type="file"
                onChange={handleFileChange}
                disabled={uploading}
                accept={acceptTypes}
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
            {uploading && (
              <div className="flex-shrink-0 px-4 py-3 bg-blue-100 text-blue-700 rounded-lg text-sm flex items-center whitespace-nowrap">
                {props.onFileUpload ? "Uploading..." : "Processing..."}
              </div>
            )}
          </div>

          {/* Display selected file name on a new line below */}
          {displayFileName && (
            <div className="w-full">
              <div
                className="text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded border truncate w-full"
                title={displayFileName}
              >
                📄 {displayFileName}
              </div>
            </div>
          )}
        </div>

        <div className="text-xs text-gray-500 flex flex-col sm:flex-row sm:justify-between gap-1">
          <span className="truncate">
            Accepted: {acceptTypes === "*/*" ? "All files" : acceptTypes}
          </span>
          {!props.onFileUpload && (
            <span className="text-orange-600 font-medium whitespace-nowrap">
              Local preview only
            </span>
          )}
        </div>
      </div>

      {/* Preview - Only show media preview, no URLs */}
      {currentValue && (
        <div className="space-y-2 w-full">
          <label className="block text-sm font-medium text-gray-700">
            Preview
          </label>
          <div className="border border-gray-200 rounded-lg p-4 w-full overflow-hidden">
            {fileType === "image" && (
              <div className="flex flex-col items-center space-y-3 w-full">
                <div className="w-full flex justify-center">
                  <img
                    src={currentValue}
                    alt="Preview"
                    className="max-w-full max-h-48 object-contain rounded"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                      // Show fallback
                      const parent = (e.target as HTMLImageElement)
                        .parentElement;
                      if (parent) {
                        const fallback = document.createElement("div");
                        fallback.className = "text-center py-4";
                        fallback.innerHTML = `
                          <div class="text-3xl mb-2">🖼️</div>
                          <div class="text-sm text-gray-600">Image preview not available</div>
                        `;
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                </div>
                {displayFileName && (
                  <div className="text-sm text-gray-600 text-center truncate w-full max-w-full px-2">
                    {displayFileName}
                  </div>
                )}
              </div>
            )}

            {fileType === "video" && (
              <div className="flex flex-col items-center space-y-3 w-full">
                <div className="w-full flex justify-center">
                  <video
                    src={currentValue}
                    controls
                    className="max-w-full max-h-48 rounded"
                  />
                </div>
                {displayFileName && (
                  <div className="text-sm text-gray-600 text-center truncate w-full max-w-full px-2">
                    {displayFileName}
                  </div>
                )}
              </div>
            )}

            {fileType === "audio" && (
              <div className="flex flex-col items-center space-y-3 w-full">
                <div className="w-full">
                  <audio src={currentValue} controls className="w-full" />
                </div>
                {displayFileName && (
                  <div className="text-sm text-gray-600 text-center truncate w-full max-w-full px-2">
                    {displayFileName}
                  </div>
                )}
              </div>
            )}

            {(fileType === "document" || fileType === "other") && (
              <div className="text-center py-4 w-full">
                <div className="text-3xl mb-2">
                  {fileType === "document" ? "📄" : "📎"}
                </div>
                {displayFileName && (
                  <div className="text-sm text-gray-600 truncate w-full max-w-full px-2">
                    {displayFileName}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Enhanced custom select widget with improved schema handling
const CustomSelectWidget = (props: any) => {
  const [options, setOptions] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [isDynamic, setIsDynamic] = React.useState(false);
  const [error, setError] = React.useState<string>("");

  React.useEffect(() => {
    const checkDynamic = async () => {
      const dynamic =
        props.schema.description === "API Endpoint" ||
        (props.value &&
          typeof props.value === "string" &&
          props.value.startsWith("/api/")) ||
        props.schema.format === "dynamic-select";

      setIsDynamic(dynamic);

      if (dynamic && props.onGetSelectOptions) {
        await loadDynamicOptions();
      } else {
        // Handle static options from schema or value
        const staticOptions = parseStaticOptions(props.schema, props.value);
        setOptions(staticOptions);
      }
    };

    checkDynamic();
  }, [props.value, props.schema, props.onGetSelectOptions]);

  const loadDynamicOptions = async () => {
    if (!props.onGetSelectOptions) {
      setError("Dynamic options handler not available");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const fetchedOptions = await props.onGetSelectOptions(
        props.name,
        props.componentType
      );
      setOptions(fetchedOptions || []);
    } catch (error) {
      console.error("Failed to load options:", error);
      setError("Failed to load options");
      setOptions([]);
    } finally {
      setLoading(false);
    }
  };

  const parseStaticOptions = (schema: any, value: any): string[] => {
    // Check for enum in schema (highest priority)
    if (schema.enum && Array.isArray(schema.enum)) {
      return schema.enum.map((item: any) => String(item));
    }

    // Check for items enum for array types
    if (schema.items && schema.items.enum && Array.isArray(schema.items.enum)) {
      return schema.items.enum.map((item: any) => String(item));
    }

    // Check for oneOf in schema
    if (schema.oneOf && Array.isArray(schema.oneOf)) {
      return schema.oneOf
        .filter((item: any) => item.const !== undefined)
        .map((item: any) => String(item.const));
    }

    // Check for anyOf in schema
    if (schema.anyOf && Array.isArray(schema.anyOf)) {
      return schema.anyOf
        .filter((item: any) => item.const !== undefined)
        .map((item: any) => String(item.const));
    }

    // Parse from string value like "[option1, option2]"
    if (typeof value === "string") {
      const match = value.match(/^\[(.*)\]$/);
      if (match) {
        return match[1]
          .split(",")
          .map((opt) => opt.trim())
          .filter((opt) => opt.length > 0);
      }
    }

    // Check for options in schema extensions
    if (schema.options && Array.isArray(schema.options)) {
      return schema.options.map((item: any) => String(item));
    }

    return [];
  };

  const refreshOptions = () => {
    if (isDynamic) {
      loadDynamicOptions();
    }
  };

  const currentValue = isDynamic
    ? props.value
    : options.includes(props.value)
    ? props.value
    : "";

  // Determine if we should show the select based on available options
  const shouldShowSelect = options.length > 0 || isDynamic;

  return (
    <div className="space-y-3">
      {shouldShowSelect ? (
        <>
          <div className="flex space-x-3">
            <select
              value={currentValue || ""}
              onChange={(e) => props.onChange(e.target.value)}
              disabled={loading}
              className="flex-1 p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select an option</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            {isDynamic && (
              <button
                type="button"
                onClick={refreshOptions}
                disabled={loading}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:bg-gray-400 transition-colors whitespace-nowrap"
              >
                {loading ? "..." : "Refresh"}
              </button>
            )}
          </div>

          <div className="text-xs text-gray-500 flex justify-between items-center">
            <span>
              {loading
                ? "Loading options..."
                : `${options.length} options available`}
            </span>
            {isDynamic && (
              <span className="text-blue-600 font-medium">Dynamic Select</span>
            )}
            {!isDynamic && options.length > 0 && (
              <span className="text-green-600 font-medium">Static Select</span>
            )}
          </div>
        </>
      ) : (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            No options available.{" "}
            {isDynamic
              ? "Try refreshing or check the API endpoint."
              : "Add options to the schema."}
          </p>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Schema debug info - only in development */}
      {process.env.NODE_ENV === "development" && (
        <details className="text-xs text-gray-500 border border-gray-200 rounded p-2">
          <summary className="cursor-pointer">Schema Info</summary>
          <pre className="mt-2 whitespace-pre-wrap">
            {JSON.stringify(
              {
                name: props.name,
                value: props.value,
                schema: props.schema,
                isDynamic,
                optionsCount: options.length,
              },
              null,
              2
            )}
          </pre>
        </details>
      )}
    </div>
  );
};

// Custom JSON widget with improved layout
const JsonWidget = (props: any) => {
  const [value, setValue] = React.useState(
    typeof props.value === "string"
      ? props.value
      : JSON.stringify(props.value, null, 2)
  );

  React.useEffect(() => {
    setValue(
      typeof props.value === "string"
        ? props.value
        : JSON.stringify(props.value, null, 2)
    );
  }, [props.value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    try {
      if (newValue.trim() === "") {
        props.onChange(undefined);
      } else if (
        newValue.trim().startsWith("{") ||
        newValue.trim().startsWith("[")
      ) {
        const parsed = JSON.parse(newValue);
        props.onChange(parsed);
      } else {
        props.onChange(newValue);
      }
    } catch {
      props.onChange(newValue);
    }
  };

  const formatJson = () => {
    try {
      const formatted = JSON.stringify(JSON.parse(value), null, 2);
      setValue(formatted);
      props.onChange(JSON.parse(formatted));
    } catch {
      // Ignore if not valid JSON
    }
  };

  return (
    <div className="space-y-3">
      <textarea
        value={value}
        onChange={handleChange}
        rows={8}
        className="w-full p-3 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Enter JSON data..."
      />
      <div className="flex justify-end">
        <button
          type="button"
          onClick={formatJson}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
        >
          Format JSON
        </button>
      </div>
    </div>
  );
};

// Array of Objects Widget with key detection using inferPropertySchema
const ArrayOfObjectsWidget = (props: any) => {
  const [items, setItems] = React.useState<any[]>(props.value || []);
  const [detectedKeys, setDetectedKeys] = React.useState<string[]>([]);
  const [fieldSchemas, setFieldSchemas] = React.useState<Record<string, any>>(
    {}
  );
  const [selectedItems, setSelectedItems] = React.useState<Set<number>>(
    new Set()
  );
  const [selectAll, setSelectAll] = React.useState(false);

  React.useEffect(() => {
    setItems(props.value || []);
    // Detect keys and their schemas
    const { keys, schemas } = detectObjectKeysAndSchemas(
      props.schema,
      props.value
    );
    setDetectedKeys(keys);
    setFieldSchemas(schemas);
  }, [props.value, props.schema]);

  // Item change handler - defined at the top level
  const handleItemChange = (index: number, key: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [key]: value };
    setItems(newItems);
    props.onChange(newItems);
  };

  // Detect object keys and their schemas using inferPropertySchema
  const detectObjectKeysAndSchemas = (schema: any, value: any[]) => {
    const keys: string[] = [];
    const schemas: Record<string, any> = {};

    // Try to get keys from schema first
    if (schema.items && schema.items.properties) {
      Object.entries(schema.items.properties).forEach(
        ([key, propSchema]: [string, any]) => {
          keys.push(key);
          schemas[key] = propSchema;
        }
      );
    } else if (value && value.length > 0 && typeof value[0] === "object") {
      // Fallback: get keys from first item and infer schemas
      const firstItem = value[0];
      Object.keys(firstItem).forEach((key) => {
        keys.push(key);
        schemas[key] = inferPropertySchema(key, firstItem[key]);
      });
    } else {
      // Default keys for common cases
      const defaultKeys = ["name", "value", "label", "key"];
      defaultKeys.forEach((key) => {
        keys.push(key);
        schemas[key] = { type: "string", title: key };
      });
    }

    return { keys, schemas };
  };

  // Get appropriate widget based on schema
  const getFieldWidget = (key: string, schema: any, _value: any) => {
    const format = schema.format || "";
    const type = schema.type || "string";

    if (format === "color") {
      return "color";
    } else if (format === "email") {
      return "email";
    } else if (
      format === "uri" ||
      key.toLowerCase().includes("url") ||
      key.toLowerCase().includes("link")
    ) {
      return "url";
    } else if (format === "date") {
      return "date";
    } else if (format === "datetime") {
      return "datetime-local";
    } else if (type === "number") {
      return "number";
    } else if (format === "select" || format === "dynamic-select") {
      return "select";
    } else if (format === "file") {
      return "file";
    }

    return "text";
  };

  // Updated SimpleFileWidget with preview in ArrayOfObjectsWidget
  const SimpleFileWidget = (fileProps: any) => {
    const [currentValue, setCurrentValue] = React.useState(
      fileProps.value || ""
    );
    const [selectedFileName, setSelectedFileName] = React.useState("");
    const [blobUrls, setBlobUrls] = React.useState<Set<string>>(new Set());

    React.useEffect(() => {
      setCurrentValue(fileProps.value || "");
      if (!fileProps.value) {
        setSelectedFileName("");
      }
    }, [fileProps.value]);

    // Clean up blob URLs on unmount
    React.useEffect(() => {
      return () => {
        blobUrls.forEach((url) => {
          if (url.startsWith("blob:")) {
            URL.revokeObjectURL(url);
          }
        });
      };
    }, [blobUrls]);

    const handleFileChange = async (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file = event.target.files?.[0];
      if (file) {
        setSelectedFileName(file.name);
        try {
          let fileUrl: string;
          if (fileProps.onFileUpload) {
            fileUrl = await fileProps.onFileUpload(file);
          } else {
            // Generate blob URL or data URL for immediate preview
            if (file.type.startsWith("image/") && file.size < 5 * 1024 * 1024) {
              fileUrl = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target?.result as string);
                reader.readAsDataURL(file);
              });
            } else {
              fileUrl = URL.createObjectURL(file);
              setBlobUrls((prev) => new Set([...prev, fileUrl]));
            }
          }
          setCurrentValue(fileUrl);
          fileProps.onChange(fileUrl);
        } catch (error) {
          console.error("File processing failed:", error);
          setSelectedFileName("");
        } finally {
          event.target.value = "";
        }
      }
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setCurrentValue(newValue);
      fileProps.onChange(newValue);
      setSelectedFileName("");
    };

    const handleClear = () => {
      // Clean up blob URL if it's a blob URL we created
      if (currentValue.startsWith("blob:") && blobUrls.has(currentValue)) {
        URL.revokeObjectURL(currentValue);
        setBlobUrls((prev) => {
          const newSet = new Set(prev);
          newSet.delete(currentValue);
          return newSet;
        });
      }

      setCurrentValue("");
      setSelectedFileName("");
      fileProps.onChange("");
    };

    const getDisplayFileName = () => {
      if (selectedFileName) return selectedFileName;
      if (!currentValue) return "";

      try {
        if (currentValue.startsWith("data:")) return "Image file";
        if (currentValue.startsWith("blob:")) return "Selected file";
        const url = new URL(currentValue);
        const filename = url.pathname.split("/").pop();
        return filename || "File";
      } catch {
        const parts = currentValue.split("/");
        const lastPart = parts[parts.length - 1];
        return lastPart.split("?")[0] || "File";
      }
    };

    const displayFileName = getDisplayFileName();
    const fileType = getFileType(fileProps.name, currentValue);
    const acceptTypes = getFileAccept(fileProps.name, currentValue);

    return (
      <div className="space-y-3 w-full">
        {/* URL Input */}
        <div className="space-y-2 w-full">
          <div className="flex space-x-2 w-full">
            <input
              type="url"
              value={currentValue}
              onChange={handleUrlChange}
              className="flex-1 min-w-0 p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com/file.jpg"
            />
            {currentValue && (
              <button
                type="button"
                onClick={handleClear}
                className="flex-shrink-0 px-3 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors whitespace-nowrap"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* File Upload */}
        <div className="space-y-2 w-full">
          <div className="flex flex-col gap-2 w-full">
            <input
              type="file"
              onChange={handleFileChange}
              accept={acceptTypes}
              className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />

            {/* Display file name on new line */}
            {displayFileName && (
              <div className="w-full">
                <div
                  className="text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded border truncate"
                  title={displayFileName}
                >
                  📄 {displayFileName}
                </div>
              </div>
            )}
          </div>

          <div className="text-xs text-gray-500 flex justify-between">
            <span>
              Accepted: {acceptTypes === "*/*" ? "All files" : acceptTypes}
            </span>
            {!fileProps.onFileUpload && (
              <span className="text-orange-600">Local preview only</span>
            )}
          </div>
        </div>

        {/* Compact Preview - Only show for media files */}
        {currentValue &&
          (fileType === "image" ||
            fileType === "video" ||
            fileType === "audio") && (
            <div className="space-y-2 w-full">
              <label className="block text-xs font-medium text-gray-700">
                Preview
              </label>
              <div className="border border-gray-200 rounded p-2 w-full bg-gray-50">
                {fileType === "image" && (
                  <div className="flex flex-col items-center space-y-2">
                    <img
                      src={currentValue}
                      alt="Preview"
                      className="max-w-full max-h-32 object-contain rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                        const parent = (e.target as HTMLImageElement)
                          .parentElement;
                        if (parent) {
                          const fallback = document.createElement("div");
                          fallback.className = "text-center py-2";
                          fallback.innerHTML = `
                        <div class="text-xl mb-1">🖼️</div>
                        <div class="text-xs text-gray-600">Preview not available</div>
                      `;
                          parent.appendChild(fallback);
                        }
                      }}
                    />
                  </div>
                )}

                {fileType === "video" && (
                  <div className="flex flex-col items-center space-y-2">
                    <video
                      src={currentValue}
                      controls
                      className="max-w-full max-h-32 rounded"
                    />
                  </div>
                )}

                {fileType === "audio" && (
                  <div className="w-full">
                    <audio src={currentValue} controls className="w-full" />
                  </div>
                )}
              </div>
            </div>
          )}

        {/* Simple preview for documents and other files */}
        {currentValue && (fileType === "document" || fileType === "other") && (
          <div className="space-y-2 w-full">
            <label className="block text-xs font-medium text-gray-700">
              Preview
            </label>
            <div className="border border-gray-200 rounded p-3 bg-gray-50 text-center">
              <div className="text-2xl mb-1">
                {fileType === "document" ? "📄" : "📎"}
              </div>
              {displayFileName && (
                <div className="text-xs text-gray-600 truncate">
                  {displayFileName}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render field input based on schema type
  const renderFieldInput = (
    key: string,
    schema: any,
    value: any,
    onChange: (value: any) => void
  ) => {
    const widgetType = getFieldWidget(key, schema, value);
    const placeholder = `Enter ${key}`;

    switch (widgetType) {
      case "color":
        return (
          <div className="flex space-x-2 items-center">
            <input
              type="color"
              value={value || "#000000"}
              onChange={(e) => onChange(e.target.value)}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder={placeholder}
            />
          </div>
        );

      case "select":
        const options = schema.enum || [];
        return (
          <select
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select {key}</option>
            {options.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case "file":
        return (
          <SimpleFileWidget
            value={value}
            onChange={onChange}
            onFileUpload={props.onFileUpload}
            schema={schema}
            name={key}
          />
        );

      case "date":
        return (
          <input
            type="date"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        );

      case "datetime-local":
        return (
          <input
            type="datetime-local"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        );

      default:
        return (
          <input
            type={widgetType}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder={placeholder}
            step={widgetType === "number" ? "any" : undefined}
          />
        );
    }
  };

  // Selection handlers
  const handleSelectItem = (index: number) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedItems(newSelected);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems(new Set());
    } else {
      const allIndices = new Set(items.map((_, index) => index));
      setSelectedItems(allIndices);
    }
    setSelectAll(!selectAll);
  };

  const handleDeleteSelected = () => {
    if (selectedItems.size === 0) return;

    const newItems = items.filter((_, index) => !selectedItems.has(index));
    setItems(newItems);
    setSelectedItems(new Set());
    setSelectAll(false);
    props.onChange(newItems);
  };

  const handleAddItem = () => {
    const newItem = detectedKeys.reduce((acc, key) => {
      const defaultValue = fieldSchemas[key]?.default || "";
      acc[key] = defaultValue;
      return acc;
    }, {} as any);

    const newItems = [...items, newItem];
    setItems(newItems);
    props.onChange(newItems);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);

    const newSelected = new Set(selectedItems);
    newSelected.delete(index);
    setSelectedItems(newSelected);

    props.onChange(newItems);
  };

  const handleClearAll = () => {
    setItems([]);
    setSelectedItems(new Set());
    setSelectAll(false);
    props.onChange([]);
  };

  // Get field description from schema
  const getFieldDescription = (_key: string, schema: any) => {
    if (schema.description) return schema.description;
    if (schema.format === "select") return "Select field";
    if (schema.format === "dynamic-select") return "Dynamic select field";
    if (schema.format === "file") return "File field";
    return "";
  };

  return (
    <div className="space-y-4 w-full">
      {/* Simplified header with only actions */}
      <div className="flex justify-between items-center">
        {/* Left side: Selection controls */}
        <div className="flex items-center space-x-4">
          {items.length > 0 && (
            <>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Select All</span>
              </div>

              {selectedItems.size > 0 && (
                <button
                  type="button"
                  onClick={handleDeleteSelected}
                  className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
                >
                  Delete Selected ({selectedItems.size})
                </button>
              )}
            </>
          )}
        </div>

        {/* Right side: Add/Clear buttons */}
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={handleAddItem}
            className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
          >
            Add Item
          </button>
          {items.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="px-4 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg w-full">
          <div className="text-5xl mb-3">📝</div>
          <p className="text-base mb-1">No items added yet</p>
          <p className="text-sm">Click "Add Item" to get started</p>
        </div>
      ) : (
        <div className="space-y-4 w-full">
          {items.map((item, index) => (
            <div
              key={index}
              className={`border rounded-lg p-4 bg-white shadow-sm w-full transition-all ${
                selectedItems.has(index)
                  ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {/* Item header with selection checkbox and action buttons */}
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedItems.has(index)}
                    onChange={() => handleSelectItem(index)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                  />
                  <h4 className="font-medium text-gray-700 text-sm">
                    Item {index + 1}
                  </h4>
                </div>

                {/* Item action buttons - Reorganized layout */}
                <div className="flex items-center space-x-2">
                  {/* Quick action buttons */}
                  <div className="flex space-x-1">
                    {detectedKeys.includes("name") &&
                      detectedKeys.includes("value") && (
                        <button
                          type="button"
                          onClick={() => {
                            const name = item.name || `Item ${index + 1}`;
                            const value = item.value || `value${index + 1}`;
                            handleItemChange(index, "name", name);
                            handleItemChange(index, "value", value);
                          }}
                          className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 transition-colors"
                          title="Auto-fill name and value"
                        >
                          Auto-fill
                        </button>
                      )}

                    {detectedKeys.includes("label") &&
                      !item.label &&
                      item.name && (
                        <button
                          type="button"
                          onClick={() => {
                            handleItemChange(index, "label", item.name);
                          }}
                          className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors"
                          title="Use name as label"
                        >
                          Use as Label
                        </button>
                      )}
                  </div>

                  {/* Delete button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Fields in vertical layout */}
              <div className="space-y-4 w-full">
                {detectedKeys.map((key) => {
                  const schema = fieldSchemas[key] || {};
                  const value = item[key] || "";
                  const description = getFieldDescription(key, schema);

                  return (
                    <div key={key} className="space-y-2 w-full">
                      <label className="block text-sm font-medium text-gray-700 capitalize">
                        {schema.title ||
                          key.replace(/([A-Z])/g, " $1").toLowerCase()}
                        {schema.format === "file" && " 📁"}
                        {schema.format === "select" && " 📋"}
                        {schema.format === "dynamic-select" && " 🔄"}
                      </label>

                      <div className="w-full">
                        {renderFieldInput(key, schema, value, (newValue) =>
                          handleItemChange(index, key, newValue)
                        )}
                      </div>

                      {description && (
                        <p className="text-xs text-gray-500">{description}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer with stats */}
      <div className="flex justify-between items-center text-sm text-gray-500 pt-2 border-t border-gray-200">
        <div className="flex space-x-4">
          <span>{items.length} item(s) total</span>
          {selectedItems.size > 0 && (
            <span className="text-blue-600 font-medium">
              {selectedItems.size} selected
            </span>
          )}
        </div>
        {detectedKeys.length > 0 && (
          <span>{detectedKeys.length} fields detected</span>
        )}
      </div>
    </div>
  );
};

// Custom text widget with full width and light grey border
const CustomTextWidget = (props: any) => {
  return (
    <input
      type="text"
      value={props.value || ""}
      onChange={(e) => props.onChange(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      placeholder={props.placeholder}
    />
  );
};

// Custom textarea widget with full width and light grey border
const CustomTextareaWidget = (props: any) => {
  return (
    <textarea
      value={props.value || ""}
      onChange={(e) => props.onChange(e.target.value)}
      rows={props.options?.rows || 4}
      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
      placeholder={props.placeholder}
    />
  );
};

// Custom number widget with full width and light grey border
const CustomNumberWidget = (props: any) => {
  return (
    <input
      type="number"
      value={props.value || ""}
      onChange={(e) => props.onChange(Number(e.target.value))}
      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      step={props.step || "any"}
    />
  );
};

// Custom date widget with full width and light grey border
const CustomDateWidget = (props: any) => {
  const formatDateForInput = (date: any) => {
    if (!date) return "";
    if (typeof date === "string") {
      // Try to parse the date string
      const parsed = new Date(date);
      if (!isNaN(parsed.getTime())) {
        return parsed.toISOString().split("T")[0];
      }
      return date;
    }
    return date;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.value);
  };

  return (
    <input
      type="date"
      value={formatDateForInput(props.value)}
      onChange={handleChange}
      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  );
};

// Custom datetime widget with full width and light grey border
const CustomDateTimeWidget = (props: any) => {
  const formatDateTimeForInput = (date: any) => {
    if (!date) return "";
    if (typeof date === "string") {
      // Try to parse the date string
      const parsed = new Date(date);
      if (!isNaN(parsed.getTime())) {
        // Convert to local datetime string in the format YYYY-MM-DDTHH:mm
        const year = parsed.getFullYear();
        const month = String(parsed.getMonth() + 1).padStart(2, "0");
        const day = String(parsed.getDate()).padStart(2, "0");
        const hours = String(parsed.getHours()).padStart(2, "0");
        const minutes = String(parsed.getMinutes()).padStart(2, "0");
        return `${year}-${month}-${day}T${hours}:${minutes}`;
      }
      return date;
    }
    return date;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.value);
  };

  return (
    <input
      type="datetime-local"
      value={formatDateTimeForInput(props.value)}
      onChange={handleChange}
      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  );
};

// Custom email widget with full width and light grey border
const CustomEmailWidget = (props: any) => {
  return (
    <input
      type="email"
      value={props.value || ""}
      onChange={(e) => props.onChange(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      placeholder={props.placeholder}
    />
  );
};

// Custom URL widget with full width and light grey border
const CustomURLWidget = (props: any) => {
  return (
    <input
      type="url"
      value={props.value || ""}
      onChange={(e) => props.onChange(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      placeholder={props.placeholder}
    />
  );
};

// Custom color widget with full width and light grey border
const CustomColorWidget = (props: any) => {
  return (
    <div className="flex space-x-3 items-center">
      <input
        type="color"
        value={props.value || "#000000"}
        onChange={(e) => props.onChange(e.target.value)}
        className="w-16 h-16 border border-gray-300 rounded-lg cursor-pointer"
      />
      <input
        type="text"
        value={props.value || ""}
        onChange={(e) => props.onChange(e.target.value)}
        className="flex-1 p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="#000000"
      />
    </div>
  );
};

// Custom checkbox widget
const CustomCheckboxWidget = (props: any) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={!!props.value}
        onChange={(e) => props.onChange(e.target.checked)}
        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border border-gray-300"
      />
      <span className="ml-3 text-sm text-gray-700">
        {props.value ? "Enabled" : "Disabled"}
      </span>
    </div>
  );
};

// Generate JSON schema from currentProps with enhanced select item detection
const generateSchemaFromCurrentProps = (currentProps: Record<string, any>) => {
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

// Enhanced property schema inference with recursive inferPropertySchema for arrays
const inferPropertySchema = (key: string, value: any): any => {
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
    baseSchema.format = "file";
    return baseSchema;
  }

  if (type === "string") {
    baseSchema.type = "string";

    // Enhanced select field detection
    const isSelectField = detectSelectField(key, value);
    if (isSelectField) {
      baseSchema.format = "select";

      // Handle different types of select fields
      if (value && value.startsWith("/api/")) {
        baseSchema.description = "API Endpoint";
        baseSchema.format = "dynamic-select";
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
      const hasSimpleTypes = itemKeys.every((key) => {
        const val = firstItem[key];
        return (
          typeof val === "string" ||
          typeof val === "number" ||
          typeof val === "boolean"
        );
      });

      if (hasSimpleTypes && itemKeys.length > 0) {
        baseSchema.items = {
          type: "object",
          properties: itemKeys.reduce((acc, itemKey) => {
            // Recursively use inferPropertySchema for each field, but only for simple types
            acc[itemKey] = inferPropertySchema(itemKey, firstItem[itemKey]);
            return acc;
          }, {} as any),
        };
        baseSchema.format = "array-of-objects";
      } else {
        // Fallback to JSON for complex objects
        baseSchema.items = { type: "object" };
      }
    } else if (value.length > 0 && typeof value[0] === "string") {
      baseSchema.items = { type: "string" };
      // Check if array contains select options
      if (
        value.every((item) => typeof item === "string") &&
        value.length <= 10
      ) {
        baseSchema.format = "select";
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

// Enhanced select field detection
const detectSelectField = (key: string, value: any): boolean => {
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
    (value.startsWith("/api/") || // API endpoint
      isStaticOptionsArray(value) || // Static options array
      value.includes("|") || // Pipe-separated values
      (value.includes(",") && value.split(",").length <= 10)); // Comma-separated values

  return isSelectByName || isSelectByValue;
};

// Check if string represents static options array
const isStaticOptionsArray = (value: string): boolean => {
  return typeof value === "string" && /^\[.*\]$/.test(value);
};

// Parse static options from string
const parseStaticOptionsFromString = (value: string): string[] => {
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

// Generate UI schema with proper widget assignment
const generateUiSchema = (currentProps: Record<string, any>, schema: any) => {
  const uiSchema: any = {
    "ui:order": Object.keys(schema.properties || {}),
  };

  Object.keys(schema.properties || {}).forEach((key) => {
    const property = schema.properties[key];
    const value = currentProps[key];

    // Assign appropriate widgets based on schema
    if (property.format === "file" || isFileTypeField(key, value)) {
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
    } else if (
      property.format === "select" ||
      property.format === "dynamic-select"
    ) {
      uiSchema[key] = {
        "ui:widget": "CustomSelectWidget",
      };

      if (property.format === "dynamic-select") {
        uiSchema[key]["ui:options"] = {
          ...uiSchema[key]["ui:options"],
          isDynamic: true,
        };
      }
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
    } else if (property.format === "array-of-objects") {
      uiSchema[key] = {
        "ui:widget": "ArrayOfObjectsWidget",
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

export const PropertiesTab = ({
  onFileUpload,
  onApiCall,
  onCustomAction,
  onGetSelectOptions,
}: PropertiesTabProps) => {
  const {
    selectedInstance,
    selectedComponent,
    setSelectedInstance,
    setSelectedComponent,
  } = useStackPage();
  const { updateProps, getProps } = useWidgetProps(selectedInstance?.id);

  if (!selectedInstance && !selectedComponent) {
    return (
      <div className="p-6 text-center text-gray-500">
        <div className="mb-3 text-2xl">👈</div>
        <p className="text-base">
          Select a component from the Components tab or click on a placed
          component to edit its properties
        </p>
      </div>
    );
  }

  const componentType = selectedInstance?.type || selectedComponent;

  const currentInstanceProps = selectedInstance?.props || {};
  const updatedPropsFromContext = getProps() || {};
  const currentProps = { ...currentInstanceProps, ...updatedPropsFromContext };

  const schema = generateSchemaFromCurrentProps(currentProps);
  const uiSchema = generateUiSchema(currentProps, schema);

  const handlePropertyChange = (data: any) => {
    if (data.formData && selectedInstance) {
      const updatedProps = { ...currentProps, ...data.formData };
      const updatedInstance = {
        ...selectedInstance,
        props: updatedProps,
      };
      setSelectedInstance(updatedInstance);
      updateProps(updatedProps);
    }
  };

  const widgets = {
    FileWidget: (props: any) => (
      <FileWidget {...props} onFileUpload={onFileUpload} />
    ),
    CustomSelectWidget: (props: any) => (
      <CustomSelectWidget
        {...props}
        onGetSelectOptions={onGetSelectOptions}
        componentType={componentType}
        uiSchema={uiSchema[props.name]}
      />
    ),
    JsonWidget,
    ArrayOfObjectsWidget,
    CustomTextWidget,
    CustomTextareaWidget,
    CustomNumberWidget,
    CustomDateWidget,
    CustomDateTimeWidget,
    CustomEmailWidget,
    CustomURLWidget,
    CustomColorWidget,
    CustomCheckboxWidget,
  };

  const templates = {
    FieldTemplate: CustomFieldTemplate,
  };

  const isApiField = (value: any): boolean => {
    if (typeof value !== "string") return false;
    return value.startsWith("/api/");
  };

  const isCustomActionField = (value: any): boolean => {
    if (typeof value !== "string") return false;
    return value.toLowerCase().startsWith("/customaction/");
  };

  // const isSelectField = (value: any): boolean => {
  //   if (typeof value !== "string") return false;
  //   return value.startsWith("/api/") || /^\[.*\]$/.test(value);
  // };

  return (
    <div className="h-full overflow-auto bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white p-6 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">
            {componentType}
            {selectedInstance && (
              <span className="text-sm text-gray-500 ml-2 font-normal">
                (ID: {selectedInstance.id})
              </span>
            )}
          </h3>
        </div>
      </div>

      <div className="p-6">
        {/* RJSF Form */}
        <div className="properties-form">
          <Form
            schema={schema}
            uiSchema={uiSchema}
            formData={currentProps}
            onChange={handlePropertyChange}
            validator={validator}
            widgets={widgets}
            templates={templates}
            liveValidate
          >
            <div style={{ display: "none" }} />
          </Form>
        </div>

        {/* Quick Actions */}
        {(onApiCall || onCustomAction) && (
          <div className="mt-8 p-5 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-800 mb-4">
              Quick Actions
            </h4>
            <div className="flex flex-wrap gap-3">
              {onApiCall &&
                Object.entries(currentProps).some(([_, value]) =>
                  isApiField(value)
                ) && (
                  <button
                    onClick={async () => {
                      try {
                        const apiEndpoints = Object.entries(
                          currentProps
                        ).filter(([_, value]) => isApiField(value));

                        for (const [key, endpoint] of apiEndpoints) {
                          await handleApiCall(key, endpoint);
                        }

                        if (apiEndpoints.length === 0) {
                          alert("No API endpoints found");
                        } else {
                          alert(
                            `Called ${apiEndpoints.length} API endpoint(s)`
                          );
                        }
                      } catch (error) {
                        console.error("Failed to call APIs:", error);
                        alert("Failed to call APIs");
                      }
                    }}
                    className="px-4 py-3 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors font-medium"
                  >
                    Call All API Endpoints
                  </button>
                )}

              {onCustomAction &&
                Object.entries(currentProps).some(([_, value]) =>
                  isCustomActionField(value)
                ) && (
                  <button
                    onClick={async () => {
                      try {
                        const customActions = Object.entries(
                          currentProps
                        ).filter(([_, value]) => isCustomActionField(value));

                        for (const [key, actionValue] of customActions) {
                          const actionName = actionValue.replace(
                            "/customaction/",
                            ""
                          );
                          await handleCustomAction(
                            key,
                            actionName,
                            currentProps
                          );
                        }

                        if (customActions.length === 0) {
                          alert("No custom actions found");
                        } else {
                          alert(
                            `Executed ${customActions.length} custom action(s)`
                          );
                        }
                      } catch (error) {
                        console.error(
                          "Failed to execute custom actions:",
                          error
                        );
                        alert("Failed to execute actions");
                      }
                    }}
                    className="px-4 py-3 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors font-medium"
                  >
                    Execute All Custom Actions
                  </button>
                )}
            </div>
          </div>
        )}

        {/* No properties message */}
        {Object.keys(currentProps).length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-5xl mb-4">📝</div>
            <p className="text-base mb-2">
              No properties available for this component
            </p>
            <p className="text-sm">
              Properties will appear here when the component has configurable
              options
            </p>
          </div>
        )}
      </div>

      {/* Clear selection button */}
      {(selectedInstance || selectedComponent) && (
        <div className="border-t border-gray-200 bg-white p-6 sticky bottom-0">
          <div className="flex space-x-3">
            <button
              onClick={() => {
                setSelectedInstance(null);
                setSelectedComponent(null);
              }}
              className="flex-1 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Clear Selection
            </button>
            <button
              onClick={() => {
                const resetProps = Object.keys(currentProps).reduce(
                  (acc, key) => {
                    const value = currentProps[key];
                    if (typeof value === "number") acc[key] = 0;
                    else if (typeof value === "boolean") acc[key] = false;
                    else if (Array.isArray(value)) acc[key] = [];
                    else if (typeof value === "object") acc[key] = {};
                    else acc[key] = "";
                    return acc;
                  },
                  {} as Record<string, any>
                );

                handlePropertyChange({ formData: resetProps });
              }}
              className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper functions for API calls and custom actions (used in the component)
const handleApiCall = async (
  _property: string,
  endpoint: string,
  onApiCall?: (endpoint: string, data?: any) => Promise<any>
) => {
  if (onApiCall) {
    try {
      const result = await onApiCall(endpoint);
      return result;
    } catch (error) {
      console.error("API call failed:", error);
      throw error;
    }
  }
};

const handleCustomAction = async (
  _property: string,
  action: string,
  data: any,
  onCustomAction?: (action: string, data: any) => Promise<any>
) => {
  if (onCustomAction) {
    try {
      const result = await onCustomAction(action, data);
      return result;
    } catch (error) {
      console.error("Custom action failed:", error);
      throw error;
    }
  }
};
