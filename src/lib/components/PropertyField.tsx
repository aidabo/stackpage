/* eslint-disable no-case-declarations */
// PropertyField.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  isValidHttpUrl,
  detectFieldType,
  parseSelectOptions,
  getFileType,
  getFileAccept,
  formatDateForInput,
  parseDateFromInput,
  formatDateForDisplay,
  getDynamicSelectOptions,
} from "./PropertyTypeUtils";

interface PropertyFieldProps {
  name: string;
  value: any;
  onChange: (value: any) => void;
  onFileUpload?: (file: File) => Promise<string>;
  onGetSelectOptions?: (propertyName: string, componentType: string) => Promise<string[]>;
  componentType?: string;
}

export const PropertyField = ({
  name,
  value,
  onChange,
  onFileUpload,
  onGetSelectOptions,
  componentType = "Unknown",
}: PropertyFieldProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [urlInput, setUrlInput] = useState(value || "");
  const [dynamicOptions, setDynamicOptions] = useState<string[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(false);

  const fieldType = detectFieldType(name, value, onGetSelectOptions);

  // Load dynamic select options
  useEffect(() => {
    if (fieldType === "dynamic-select" && onGetSelectOptions) {
      const loadOptions = async () => {
        setLoadingOptions(true);
        try {
          const options = await getDynamicSelectOptions(
            name,
            componentType,
            onGetSelectOptions
          );
          setDynamicOptions(options);
        } catch (error) {
          console.error("Failed to load dynamic options:", error);
          setDynamicOptions([]);
        } finally {
          setLoadingOptions(false);
        }
      };
      
      loadOptions();
    }
  }, [fieldType, name, componentType, onGetSelectOptions]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        if (onFileUpload) {
          const fileUrl = await onFileUpload(file);
          onChange(fileUrl);
          setUrlInput(fileUrl);
        } else {
          // Fallback to data URL for local preview
          const reader = new FileReader();
          reader.onload = (e) => {
            const dataUrl = e.target?.result as string;
            onChange(dataUrl);
            setUrlInput(dataUrl);
          };
          reader.readAsDataURL(file);
        }
      } catch (error) {
        console.error("File upload failed:", error);
        alert("Failed to upload file");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleUrlInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrlInput(newUrl);
  };

  const handleUrlSubmit = () => {
    if (urlInput && !isValidHttpUrl(urlInput)) {
      alert("Please enter a valid HTTP or HTTPS URL");
      return;
    }
    onChange(urlInput);
  };

  const handleFileRemove = () => {
    if (typeof value === "string" && value.startsWith("data:")) {
      URL.revokeObjectURL(value);
    }
    onChange("");
    setUrlInput("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Render file preview based on file type
  const renderFilePreview = () => {
    const fileType = getFileType(value);

    switch (fileType) {
      case "image":
        return (
          <div className="flex items-center space-x-2">
            <img
              src={value}
              alt="Preview"
              className="w-16 h-16 object-cover rounded border"
            />
            <div className="text-sm text-gray-600">
              <div>Image File</div>
              <div className="text-xs text-gray-400 truncate max-w-32">
                {value.split("/").pop() || "Image"}
              </div>
            </div>
          </div>
        );
      case "video":
        return (
          <div className="flex items-center space-x-2">
            <div className="w-16 h-16 bg-gray-200 rounded border flex items-center justify-center">
              <span className="text-2xl">🎬</span>
            </div>
            <div className="text-sm text-gray-600">
              <div>Video File</div>
              <div className="text-xs text-gray-400 truncate max-w-32">
                {value.split("/").pop() || "Video"}
              </div>
            </div>
          </div>
        );
      case "audio":
        return (
          <div className="flex items-center space-x-2">
            <div className="w-16 h-16 bg-gray-200 rounded border flex items-center justify-center">
              <span className="text-2xl">🎵</span>
            </div>
            <div className="text-sm text-gray-600">
              <div>Audio File</div>
              <div className="text-xs text-gray-400 truncate max-w-32">
                {value.split("/").pop() || "Audio"}
              </div>
            </div>
          </div>
        );
      case "document":
        return (
          <div className="flex items-center space-x-2">
            <div className="w-16 h-16 bg-gray-200 rounded border flex items-center justify-center">
              <span className="text-2xl">📄</span>
            </div>
            <div className="text-sm text-gray-600">
              <div>Document</div>
              <div className="text-xs text-gray-400 truncate max-w-32">
                {value.split("/").pop() || "Document"}
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center space-x-2">
            <div className="text-sm text-gray-500 truncate max-w-32">
              {value.split("/").pop() || "File"}
            </div>
          </div>
        );
    }
  };

  // Update urlInput when value changes
  useEffect(() => {
    setUrlInput(value || "");
  }, [value]);

  // Render different field types
  switch (fieldType) {
    case "number":
      return (
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          step={name.toLowerCase().includes("integer") ? "1" : "any"}
        />
      );

    case "boolean":
      return (
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-600">
            {value ? "Enabled" : "Disabled"}
          </span>
        </div>
      );

    case "textarea":
      return (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={Math.min(10, Math.max(3, value.split("\n").length + 1))}
          className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
          placeholder={`Enter ${name}...`}
        />
      );

    case "color":
      return (
        <div className="flex items-center space-x-2">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-12 h-12 border border-gray-300 rounded cursor-pointer"
          />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="#000000"
          />
        </div>
      );

    case "date":
      return (
        <div className="space-y-2">
          {value && (
            <div className="text-sms text-gray-700">
              {formatDateForDisplay(value, "date")}
            </div>
          )}
          <input
            type="date"
            value={formatDateForInput(value, "date")}
            onChange={(e) =>
              onChange(parseDateFromInput(e.target.value, "date"))
            }
            className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      );

    case "datetime":
      return (
        <div className="space-y-2">
          <input
            type="datetime-local"
            value={formatDateForInput(value, "datetime")}
            onChange={(e) =>
              onChange(parseDateFromInput(e.target.value, "datetime"))
            }
            className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {value && (
            <div className="text-xs text-gray-500">
              Display: {formatDateForDisplay(value, "datetime")}
            </div>
          )}
        </div>
      );

    case "email":
      return (
        <input
          type="email"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder={`Enter ${name}...`}
        />
      );

    case "url":
      return (
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder={`Enter ${name}...`}
        />
      );

    case "file":
      return (
        <div className="space-y-3">
          {/* File Preview and Remove Button */}
          {value && (
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded border">
              {renderFilePreview()}
              <button
                type="button"
                onClick={handleFileRemove}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Remove
              </button>
            </div>
          )}

          {/* File Upload Input */}
          <div className="space-y-2">
            <input
              ref={fileInputRef}
              type="file"
              accept={getFileAccept(name, value)}
              onChange={handleFileUpload}
              disabled={isUploading}
              className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {isUploading && (
              <div className="text-sm text-blue-600">Uploading...</div>
            )}
            <div className="text-xs text-gray-500">
              Allowed:{" "}
              {getFileAccept(name, value) === "*/*" ? "All files" : getFileAccept(name, value)}
            </div>
          </div>

          {/* URL Input */}
          <div className="space-y-2">
            <div className="text-sm text-gray-600 text-center">OR</div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={urlInput}
                onChange={handleUrlInputChange}
                className="flex-1 p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/file.jpg"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleUrlSubmit();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleUrlSubmit}
                disabled={!urlInput}
                className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 disabled:bg-gray-400"
              >
                Apply URL
              </button>
            </div>
            <div className="text-xs text-gray-500">
              Enter a direct URL to an existing file (http or https)
            </div>
          </div>
        </div>
      );

    case "select":
      const staticOptions = parseSelectOptions(value);
      const currentValue = staticOptions.length > 0 ? value : "";

      return (
        <div className="space-y-2">
          <select
            value={currentValue}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select an option</option>
            {staticOptions.map((option) => (
              <option key={option} value={`[${option}]`}>
                {option}
              </option>
            ))}
          </select>
          <div className="text-xs text-gray-500">
            {staticOptions.length} static options available
          </div>
        </div>
      );

    case "dynamic-select":
      return (
        <div className="space-y-2">
          <select
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            disabled={loadingOptions}
            className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select an option</option>
            {dynamicOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="text-xs text-gray-500 flex justify-between">
            <span>
              {loadingOptions 
                ? "Loading options..." 
                : `${dynamicOptions.length} dynamic options available`
              }
            </span>
            {onGetSelectOptions && (
              <button
                type="button"
                onClick={() => {
                  // Re-fetch options
                  const loadOptions = async () => {
                    setLoadingOptions(true);
                    try {
                      const options = await getDynamicSelectOptions(
                        name,
                        componentType,
                        onGetSelectOptions
                      );
                      setDynamicOptions(options);
                    } catch (error) {
                      console.error("Failed to reload options:", error);
                    } finally {
                      setLoadingOptions(false);
                    }
                  };
                  loadOptions();
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                Refresh
              </button>
            )}
          </div>
        </div>
      );

    case "json":
      return (
        <div className="space-y-2">
          <textarea
            value={
              typeof value === "string" ? value : JSON.stringify(value, null, 2)
            }
            onChange={(e) => {
              try {
                if (
                  e.target.value.trim().startsWith("{") ||
                  e.target.value.trim().startsWith("[")
                ) {
                  const parsedValue = JSON.parse(e.target.value);
                  onChange(parsedValue);
                } else {
                  onChange(e.target.value);
                }
              } catch (error) {
                onChange(e.target.value);
              }
            }}
            rows={8}
            className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-xs"
            placeholder="Enter JSON data..."
          />
          <div className="text-xs text-gray-500 flex justify-between">
            <span>
              {typeof value === "object" ? "JSON Object" : "Text/JSON"}
            </span>
            <button
              type="button"
              onClick={() => {
                try {
                  const formatted = JSON.stringify(JSON.parse(value), null, 2);
                  onChange(formatted);
                } catch {
                  // Ignore if not valid JSON
                }
              }}
              className="text-blue-600 hover:text-blue-800"
            >
              Format
            </button>
          </div>
        </div>
      );

    default:
      return (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder={`Enter ${name}...`}
        />
      );
  }
};