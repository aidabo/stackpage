import { format, parse, isValid, parseISO } from "date-fns";

/* eslint-disable no-case-declarations */
// PropertyWidgets.tsx
import React from "react";
import {
  getFileType,
  getFileAccept,
  inferPropertySchema,
} from "./PropertyTypeUtils";

// Custom field template for better layout
export const CustomFieldTemplate = (props: any) => {
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

// Enhanced file upload widget that works for all file types
export const FileWidget = (props: any) => {
  const [uploading, setUploading] = React.useState(false);
  const [currentValue, setCurrentValue] = React.useState(props.value || "");
  const [selectedFileName, setSelectedFileName] = React.useState("");
  const [blobUrls, setBlobUrls] = React.useState<Set<string>>(new Set());
  const [uploadProgress, setUploadProgress] = React.useState(0);

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
      setUploadProgress(0);

      try {
        let fileUrl: string;

        if (props.onFileUpload) {
          // Use the provided upload handler with progress tracking
          fileUrl = await props.onFileUpload(file, {
            onProgress: (progress: number) => {
              setUploadProgress(progress);
            },
            onError: (error: Error) => {
              alert(`Upload failed: ${error.message}`);
              setUploading(false);
              setUploadProgress(0);
            },
          });
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
        props.onChange(fileUrl); // Fallback to RJSF's onChange
        setUploading(false);
        setUploadProgress(100);
      } catch (error) {
        console.error("File processing failed:", error);
        alert("File processing failed");
        setSelectedFileName("");
        setUploading(false);
        setUploadProgress(0);
      } finally {
        // Clear the file input
        event.target.value = "";
      }
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setCurrentValue(newValue);
    props.onChange(newValue); // Fallback to RJSF's onChange
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
    setUploadProgress(0);
    props.onChange(""); // Fallback to RJSF's onChange
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
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
              />
            </div>
            {uploading && (
              <div className="flex-shrink-0 px-4 py-3 bg-blue-100 text-blue-700 rounded-lg text-sm flex items-center whitespace-nowrap">
                <span>Uploading... {uploadProgress}%</span>
              </div>
            )}
          </div>

          {/* Progress bar */}
          {uploading && (
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}

          {/* Display selected file name on a new line below */}
          {false && displayFileName && (
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

        {false && (
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
        )}
      </div>

      {/* Preview - Only show media preview, no URLs */}
      {currentValue && (
        <div className="space-y-2 w-full">
          <label className="block text-sm font-medium text-gray-700">
            Preview
          </label>
          <div className="border border-gray-200 rounded-lg p-4 w-full overflow-hidden">
            {/* Preview content remains the same */}
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

            {(fileType === "document" || fileType === "file") && (
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

// In CustomSelectWidget (simplified example)
export const CustomSelectWidget = (props: any) => {
  const { schema, /*options,*/ value, onChange, onGetSelectOptions } = props;

  // Use enum from schema if available (for static options)
  const staticOptions = schema.enum || [];

  // For dynamic options (API, lists), use the existing logic
  const [dynamicOptions, setDynamicOptions] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (
      onGetSelectOptions &&
      (schema["x-dynamic-select"] || schema["x-list-reference"])
    ) {
      // Fetch dynamic options based on schema configuration
      const fetchOptions = async () => {
        try {
          const result = await onGetSelectOptions(schema);
          setDynamicOptions(result || []);
        } catch (error) {
          console.error("Failed to fetch select options:", error);
        }
      };
      fetchOptions();
    }
  }, [schema, onGetSelectOptions]);

  const allOptions = [...staticOptions, ...dynamicOptions];

  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">Select an option</option>
      {allOptions.map((option, index) => (
        <option key={index} value={option.value || option}>
          {option.label || option}
        </option>
      ))}
    </select>
  );
};

// Custom JSON widget with improved layout
export const JsonWidget = (props: any) => {
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
export const ArrayOfObjectsWidget = (props: any) => {
  const [items, setItems] = React.useState<any[]>(props.value || []);
  const [detectedKeys, setDetectedKeys] = React.useState<string[]>([]);
  const [fieldSchemas, setFieldSchemas] = React.useState<Record<string, any>>(
    {}
  );
  const [selectedItems, setSelectedItems] = React.useState<Set<number>>(
    new Set()
  );
  const [selectAll, setSelectAll] = React.useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);
  const [localChanges, setLocalChanges] = React.useState<any[]>(
    props.value || []
  );

  React.useEffect(() => {
    const initialItems = props.value || [];
    setItems(initialItems);
    setLocalChanges(initialItems);
    // Detect keys and their schemas
    const { keys, schemas } = detectObjectKeysAndSchemas(
      props.schema,
      initialItems
    );
    setDetectedKeys(keys);
    setFieldSchemas(schemas);
    setHasUnsavedChanges(false);
  }, [props.schema, props.value?.length]);

  // Item change handler - ONLY updates local state, doesn't call props.onChange
  const handleItemChange = (index: number, key: string, value: any) => {
    const newItems = [...localChanges];
    newItems[index] = { ...newItems[index], [key]: value };
    setLocalChanges(newItems);
    setHasUnsavedChanges(true);

    // Also update the display items for immediate UI feedback
    const displayItems = [...items];
    displayItems[index] = { ...displayItems[index], [key]: value };
    setItems(displayItems);
  };

  // Apply all changes at once
  const handleApplyChanges = () => {
    props.onChange(localChanges);
    setItems(localChanges);
    setHasUnsavedChanges(false);
  };

  // Reset to original props value
  const handleResetChanges = () => {
    const originalItems = props.value || [];
    setLocalChanges(originalItems);
    setItems(originalItems);
    setHasUnsavedChanges(false);
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

  // Get appropriate widget based on schema - UPDATED TO BETTER DETECT FILE FIELDS
  const getFieldWidget = (key: string, schema: any, value: any) => {
    const format = schema.format || "";
    const type = schema.type || "string";

    // Enhanced file detection
    const isFileField =
      format === "file" ||
      format === "uri" ||
      key.toLowerCase().includes("url") ||
      key.toLowerCase().includes("image") ||
      key.toLowerCase().includes("video") ||
      key.toLowerCase().includes("audio") ||
      key.toLowerCase().includes("file") ||
      key.toLowerCase().includes("src") ||
      key.toLowerCase().includes("icon") ||
      key.toLowerCase().includes("avatar") ||
      key.toLowerCase().includes("logo") ||
      key.toLowerCase().includes("thumbnail") ||
      key.toLowerCase().includes("media") ||
      (typeof value === "string" &&
        (value.startsWith("http") ||
          value.startsWith("data:") ||
          value.startsWith("blob:") ||
          value.includes("/uploads/") ||
          value.includes("/images/") ||
          value.includes("/media/") ||
          /\.(jpg|jpeg|png|gif|webp|svg|mp4|webm|ogg|mp3|wav|pdf|doc|docx)$/i.test(
            value
          )));

    if (isFileField) {
      return "file";
    } else if (format === "color") {
      return "color";
    } else if (format === "email") {
      return "email";
    } else if (format === "uri" || format === "url") {
      return "url";
    } else if (format === "date") {
      return "date";
    } else if (format === "datetime") {
      return "datetime-local";
    } else if (type === "number") {
      return "number";
    } else if (format === "select" || format === "dynamic-select") {
      return "select";
    }

    return "text";
  };

  // Updated SimpleFileWidget for ArrayOfObjectsWidget - FIXED FUNCTION SIGNATURE
  const SimpleFileWidget = (fileProps: any) => {
    const [currentValue, setCurrentValue] = React.useState(
      fileProps.value || ""
    );
    const [selectedFileName, setSelectedFileName] = React.useState("");
    const [blobUrls, setBlobUrls] = React.useState<Set<string>>(new Set());
    const [uploading, setUploading] = React.useState(false);
    const [uploadProgress, setUploadProgress] = React.useState(0);

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
        setUploading(true);
        setUploadProgress(0);

        try {
          let fileUrl: string;
          if (fileProps.onFileUpload) {
            // Use the provided upload handler with progress tracking
            fileUrl = await fileProps.onFileUpload(file, {
              onProgress: (progress: number) => {
                setUploadProgress(progress);
              },
              onError: (error: Error) => {
                console.error("Upload error:", error);
                alert(`Upload failed: ${error.message}`);
                setUploading(false);
                setUploadProgress(0);
              },
            });
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
          fileProps.onChange(fileUrl); // This now only updates local state
          setUploading(false);
          setUploadProgress(100);
        } catch (error) {
          console.error("File processing failed:", error);
          setSelectedFileName("");
          setUploading(false);
          setUploadProgress(0);
        } finally {
          event.target.value = "";
        }
      }
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setCurrentValue(newValue);
      fileProps.onChange(newValue); // This now only updates local state
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
      setUploadProgress(0);
      fileProps.onChange(""); // This now only updates local state
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
            <div className="flex-1 min-w-0">
              <input
                type="file"
                onChange={handleFileChange}
                disabled={uploading}
                accept={acceptTypes}
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
              />
            </div>
            {uploading && (
              <div className="flex-shrink-0 px-4 py-3 bg-blue-100 text-blue-700 rounded-lg text-sm flex items-center whitespace-nowrap">
                <span>Uploading... {uploadProgress}%</span>
              </div>
            )}
            {/* 
            <input
              type="file"
              onChange={handleFileChange}
              disabled={uploading}
              accept={acceptTypes}
              className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
            />

            {uploading && (
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ><span className="text-sm">Uploading...{uploadProgress}%</span></div>
              </div>
            )} */}

            {/* Display file name on new line */}
            {false && displayFileName && (
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

          {false && (
            <div className="text-xs text-gray-500 flex justify-between">
              <span>
                Accepted: {acceptTypes === "*/*" ? "All files" : acceptTypes}
              </span>
              {!fileProps.onFileUpload && (
                <span className="text-orange-600">Local preview only</span>
              )}
            </div>
          )}
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
        {currentValue && (fileType === "document" || fileType === "file") && (
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

    const newItems = localChanges.filter(
      (_, index) => !selectedItems.has(index)
    );
    setLocalChanges(newItems);
    setItems(newItems);
    setSelectedItems(new Set());
    setSelectAll(false);
    setHasUnsavedChanges(true);
  };

  const handleAddItem = () => {
    const newItem = detectedKeys.reduce((acc, key) => {
      const defaultValue = fieldSchemas[key]?.default || "";
      acc[key] = defaultValue;
      return acc;
    }, {} as any);

    const newItems = [...localChanges, newItem];
    setLocalChanges(newItems);
    setItems(newItems);
    setHasUnsavedChanges(true);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = localChanges.filter((_, i) => i !== index);
    setLocalChanges(newItems);
    setItems(newItems);

    const newSelected = new Set(selectedItems);
    newSelected.delete(index);
    setSelectedItems(newSelected);

    setHasUnsavedChanges(true);
  };

  const handleClearAll = () => {
    setLocalChanges([]);
    setItems([]);
    setSelectedItems(new Set());
    setSelectAll(false);
    setHasUnsavedChanges(true);
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
      {/* Header with Apply button */}
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

        {/* Right side: Add/Clear/Apply buttons */}
        <div className="flex space-x-2">
          {/* Apply Changes Button - Only show when there are unsaved changes */}
          {hasUnsavedChanges && (
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={handleApplyChanges}
                className="px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors flex items-center"
              >
                <span>Apply Changes</span>
                {hasUnsavedChanges && (
                  <span className="ml-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    ●
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={handleResetChanges}
                className="px-4 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
              >
                Reset
              </button>
            </div>
          )}

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

      {/* Unsaved Changes Indicator */}
      {hasUnsavedChanges && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-yellow-700 text-sm">
                ⚠️ You have unsaved changes. Click "Apply Changes" to save.
              </span>
            </div>
          </div>
        </div>
      )}

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
              className={`border rounded-lg p-4 bg-slate-50 shadow-sm w-full transition-all ${
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

      {/* Footer with stats and Apply button */}
      <div className="flex justify-between items-center text-sm text-gray-500 pt-2 border-t border-gray-200">
        <div className="flex space-x-4">
          <span>{items.length} item(s) total</span>
          {selectedItems.size > 0 && (
            <span className="text-blue-600 font-medium">
              {selectedItems.size} selected
            </span>
          )}
          {hasUnsavedChanges && (
            <span className="text-yellow-600 font-medium">Unsaved changes</span>
          )}
        </div>
        {detectedKeys.length > 0 && (
          <span>{detectedKeys.length} fields detected</span>
        )}
      </div>

      {/* Sticky Apply Button for large forms */}
      {hasUnsavedChanges && items.length > 2 && (
        <div className="sticky bottom-4 mt-6 p-4 bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700">
              You have unsaved changes in {items.length} items
            </span>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={handleResetChanges}
                className="px-4 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
              >
                Discard Changes
              </button>
              <button
                type="button"
                onClick={handleApplyChanges}
                className="px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors font-medium"
              >
                Apply All Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Basic form widgets
export const CustomTextWidget = (props: any) => {
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

export const CustomTextareaWidget = (props: any) => {
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

export const CustomNumberWidget = (props: any) => {
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

export const CustomDateWidget = (props: any) => {
  // Common date formats to try parsing
  const dateFormats = [
    "yyyy-MM-dd", // ISO format
    "yyyy/MM/dd", // YYYY/MM/DD
    "MM/dd/yyyy", // MM/DD/YYYY
    "dd/MM/yyyy", // DD/MM/YYYY
    "yyyy年MM月dd日", // YYYY年MM月DD日
    "MMM dd, yyyy", // Jan 01, 2024
    "MMMM dd, yyyy", // January 01, 2024
  ];

  const formatDateForInput = (dateValue: any): string => {
    if (!dateValue) return "";

    let date: Date;

    // If it's already a Date object
    if (dateValue instanceof Date && isValid(dateValue)) {
      date = dateValue;
    }
    // If it's a string, try to parse it
    else if (typeof dateValue === "string") {
      // Try ISO format first
      date = parseISO(dateValue);

      // If ISO parsing failed, try other formats
      if (!isValid(date)) {
        for (const formatStr of dateFormats) {
          date = parse(dateValue, formatStr, new Date());
          if (isValid(date)) break;
        }
      }

      // If all parsing failed, try native Date constructor
      if (!isValid(date)) {
        date = new Date(dateValue);
      }
    }
    // If it's a timestamp
    else if (typeof dateValue === "number") {
      date = new Date(dateValue);
    } else {
      return String(dateValue);
    }

    // Format for HTML date input (YYYY-MM-DD)
    return isValid(date) ? format(date, "yyyy-MM-dd") : "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    props.onChange(newValue);
  };

  const currentValue = formatDateForInput(props.value);

  return (
    <div className="space-y-2">
      <input
        type="date"
        value={currentValue}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />

      {/* Show current formatted value for debugging */}
      {props.value && currentValue && (
        <div className="text-xs text-gray-500">
          Displaying: {currentValue} | Original: {String(props.value)}
        </div>
      )}
    </div>
  );
};

// PropertyWidgets.tsx - Enhanced CustomDateTimeWidget with date-fns
export const CustomDateTimeWidget = (props: any) => {
  const formatDateTimeForInput = (dateValue: any): string => {
    if (!dateValue) return "";

    let date: Date;

    if (dateValue instanceof Date && isValid(dateValue)) {
      date = dateValue;
    } else if (typeof dateValue === "string") {
      date = parseISO(dateValue);

      if (!isValid(date)) {
        date = new Date(dateValue);
      }
    } else if (typeof dateValue === "number") {
      date = new Date(dateValue);
    } else {
      return String(dateValue);
    }

    // Format for HTML datetime-local input
    return isValid(date) ? format(date, "yyyy-MM-dd'T'HH:mm") : "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.value);
  };

  const currentValue = formatDateTimeForInput(props.value);

  return (
    <div className="space-y-2">
      <input
        type="datetime-local"
        value={currentValue}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />

      {props.value && currentValue && (
        <div className="text-xs text-gray-500">
          Displaying: {currentValue} | Original: {String(props.value)}
        </div>
      )}
    </div>
  );
};

export const CustomEmailWidget = (props: any) => {
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

export const CustomURLWidget = (props: any) => {
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

export const CustomColorWidget = (props: any) => {
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

export const CustomCheckboxWidget = (props: any) => {
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
