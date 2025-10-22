/* eslint-disable no-case-declarations */
// PropertyField.tsx
import React, { useState, useRef } from "react";

interface PropertyFieldProps {
  name: string;
  value: any;
  onChange: (value: any) => void;
  onFileUpload?: (file: File) => Promise<string>;
}

export const PropertyField = ({
  name,
  value,
  onChange,
  onFileUpload,
}: PropertyFieldProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [urlInput, setUrlInput] = useState(value || "");

  // Helper function to detect if a string is a valid date
  const isValidDate = (dateString: any): boolean => {
    if (typeof dateString !== "string") return false;
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };

  // Helper function to check if string is a valid HTTP URL
  const isValidHttpUrl = (string: string): boolean => {
    try {
      const url = new URL(string);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch (_) {
      return false;
    }
  };

  // Helper function to detect field type
  const detectFieldType = (): string => {
    const lowerName = name.toLowerCase();

    // Check for special field names
    if (
      [
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
      ].includes(lowerName)
    ) {
      return "file";
    }

    // Check for date/time fields
    const dateLikeNames = [
      "date",
      "time",
      "datetime",
      "created",
      "updated",
      "start",
      "end",
      "timestamp",
      "published",
      "due",
      "at",
    ];
    const isDateLikeName = dateLikeNames.some((dateName) =>
      lowerName.includes(dateName)
    );

    if (isDateLikeName && isValidDate(value)) {
      if (
        lowerName.includes("time") ||
        lowerName.includes("datetime") ||
        lowerName === "timestamp"
      ) {
        return "datetime";
      }
      return "date";
    }

    // Check value type
    if (typeof value === "number") return "number";
    if (typeof value === "boolean") return "boolean";
    if (Array.isArray(value)) return "array";
    if (typeof value === "object" && value !== null) return "json";

    if (typeof value === "string") {
      // Check for select pattern
      const selectPattern = /^\[([^\]]+)\]$/;
      const match = value.match(selectPattern);
      if (match) {
        const optionsString = match[1];
        if (optionsString.includes(",") || optionsString.includes("|")) {
          return "select";
        }
      }

      // Check for long text or multi-line
      if (value.length > 40 || value.includes("\n")) return "textarea";

      // Check if it's a color value
      if (
        lowerName.includes("color") ||
        value.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
      ) {
        return "color";
      }

      return "text";
    }

    return "text";
  };

  // Helper function to parse select options
  const parseSelectOptions = (selectString: string): string[] => {
    const match = selectString.match(/^\[([^\]]+)\]$/);
    if (!match) return [];

    const optionsString = match[1];

    if (optionsString.includes(",")) {
      return optionsString.split(",").map((opt) => opt.trim());
    } else if (optionsString.includes("|")) {
      return optionsString.split("|").map((opt) => opt.trim());
    }

    return [optionsString.trim()];
  };

  // Format date for input (ISO format)
  const formatDateForInput = (
    dateValue: any,
    type: "date" | "datetime"
  ): string => {
    if (!dateValue) return "";

    try {
      const date = new Date(dateValue);
      if (isNaN(date.getTime())) return "";

      if (type === "date") {
        return date.toISOString().split("T")[0]; // YYYY-MM-DD
      } else {
        return date.toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm
      }
    } catch {
      return "";
    }
  };

  // Parse date from input (ISO format)
  const parseDateFromInput = (
    inputValue: string,
    type: "date" | "datetime"
  ): string => {
    if (!inputValue) return "";

    try {
      if (type === "date") {
        const date = new Date(inputValue + "T00:00:00");
        return date.toISOString().split("T")[0];
      } else {
        const date = new Date(inputValue);
        return date.toISOString();
      }
    } catch {
      return inputValue;
    }
  };

  // Format date for display as yyyy/MM/dd
  const formatDateForDisplay = (
    dateValue: any,
    type: "date" | "datetime"
  ): string => {
    if (!dateValue) return "";

    try {
      const date = new Date(dateValue);
      if (isNaN(date.getTime())) return "";

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      if (type === "date") {
        return `${year}/${month}/${day}`;
      } else {
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${year}/${month}/${day} ${hours}:${minutes}`;
      }
    } catch {
      return "";
    }
  };

  // Get file type based on extension or value
  const getFileType = (
    fileValue: string
  ): "image" | "video" | "audio" | "document" | "other" => {
    if (!fileValue) return "other";

    // Check for data URLs
    if (fileValue.startsWith("data:")) {
      if (fileValue.startsWith("data:image")) return "image";
      if (fileValue.startsWith("data:video")) return "video";
      if (fileValue.startsWith("data:audio")) return "audio";
      return "other";
    }

    // Check file extension
    const extension = fileValue.split(".").pop()?.toLowerCase() || "";

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

    return "other";
  };

  // Get accept attribute for file input based on field name
  const getFileAccept = (): string => {
    const lowerName = name.toLowerCase();
    const fileType = getFileType(value);

    if (
      lowerName.includes("image") ||
      lowerName.includes("avatar") ||
      lowerName.includes("logo") ||
      lowerName.includes("icon")
    ) {
      return "image/*";
    }
    if (lowerName.includes("video")) {
      return "video/*";
    }
    if (lowerName.includes("audio") || lowerName.includes("sound")) {
      return "audio/*";
    }
    if (
      lowerName.includes("document") ||
      lowerName.includes("pdf") ||
      lowerName.includes("doc")
    ) {
      return ".pdf,.doc,.docx,.txt,.rtf,.odt,.xls,.xlsx,.ppt,.pptx";
    }
    // Priority 2: by current file value
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

  const fieldType = detectFieldType();

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
  React.useEffect(() => {
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
              accept={getFileAccept()}
              onChange={handleFileUpload}
              disabled={isUploading}
              className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {isUploading && (
              <div className="text-sm text-blue-600">Uploading...</div>
            )}
            <div className="text-xs text-gray-500">
              Allowed:{" "}
              {getFileAccept() === "*/*" ? "All files" : getFileAccept()}
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
      const options = parseSelectOptions(value);
      const currentValue = options.length > 0 ? value : "";

      return (
        <div className="space-y-2">
          <select
            value={currentValue}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select an option</option>
            {options.map((option) => (
              <option key={option} value={`[${option}]`}>
                {option}
              </option>
            ))}
          </select>
          <div className="text-xs text-gray-500">
            {options.length} options available
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
