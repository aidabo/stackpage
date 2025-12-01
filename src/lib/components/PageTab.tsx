import { FileUploadFn } from "..";
import { useStackPage } from "./StackPageContext";
import { useState, useRef } from "react";

interface PageTabProps {
  onFileUpload?: FileUploadFn;
}

// Page Tab Component
export const PageTab = ({ onFileUpload }: PageTabProps) => {
  const { attributes, setPageAttributes, source } = useStackPage();
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePageAttributeChange = (attribute: string, value: string) => {
    const newAttributes = {
      ...attributes,
      [attribute]: value,
    };
    setPageAttributes(newAttributes);
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    handlePageAttributeChange("image", url);
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setProgress(0);
      try {
        let finalImageUrl = URL.createObjectURL(file); // Temporary local URL
        // Upload to server if callback provided
        if (onFileUpload) {
          finalImageUrl = await onFileUpload(file, {
            onProgress: (p) => setProgress(p),
            onError: (error) => alert(error.message),
            options: {},
          });
        }
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        handlePageAttributeChange("image", finalImageUrl);
        // Update the attributes with the final image URL
      } catch (error) {
        console.error("Failed to upload image:", error);
        alert("Failed to upload image. Please try again.");
      } finally {
        setIsUploading(false);
        setProgress(0);
      }
    }
  };

  const handleImageRemove = () => {
    handlePageAttributeChange("image", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const statusOptions = ["draft", "published"];

  // Calculate total items across all lists
  const totalListItems =
    source.lists?.reduce(
      (total: number, list: any) => total + (list.items?.length || 0),
      0
    ) || 0;

  return (
    <div className="h-full p-4 space-y-4 max-h-[calc(100vh-48*0.25rem)] bg-zinc-200 overflow-y-auto">
      <h3 className="text-lg font-medium mb-3">Page Settings</h3>
      <p className="text-sm text-gray-600 mb-4">
        Configure the overall page layout and appearance
      </p>

      <div className="space-y-6">
        {/* Image Upload Section */}
        <div className="border-b border-gray-100 pb-4">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Page Image
          </label>

          {/* URL Input Box */}
          <div className="mb-6 space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="url"
              value={attributes.image || ""}
              onChange={handleImageUrlChange}
              placeholder="https://example.com/image.jpg"
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500">
              Enter image URL or upload a file below
            </p>
          </div>

          {/* File Upload and Preview - Centered Layout */}
          <div className="flex flex-col items-center space-y-4">
            {/* Large Preview Image */}
            <div className="relative bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-200 w-full max-w-md">
              {attributes.image ? (
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <img
                      src={attributes.image}
                      alt="Page preview"
                      className="w-64 h-64 object-contain rounded-lg shadow-lg"
                      onError={(e) => {
                        // If image fails to load, show error placeholder
                        e.currentTarget.src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256' viewBox='0 0 256 256'%3E%3Crect width='256' height='256' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='16' fill='%239ca3af'%3EImage Error%3C/text%3E%3C/svg%3E";
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleImageRemove}
                      disabled={isUploading}
                      className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-red-600 disabled:bg-gray-400 transition-colors shadow-lg"
                    >
                      ×
                    </button>
                  </div>

                  {/* Image Info */}
                  <div className="text-center space-y-1">
                    <p className="text-sm text-gray-600 truncate max-w-xs">
                      {attributes.image.startsWith("blob:")
                        ? "Temporary Preview"
                        : "Saved Image"}
                    </p>
                    {attributes.image.length > 60 && (
                      <p className="text-xs text-gray-500 break-all">
                        {attributes.image.substring(0, 80)}...
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 mb-4">
                    {isUploading ? (
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                        <span className="text-sm">Uploading...{progress}%</span>
                      </div>
                    ) : (
                      <span className="text-4xl">🖼️</span>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm text-center">
                    {isUploading
                      ? "Processing your image..."
                      : "No image selected"}
                  </p>
                </div>
              )}
            </div>

            {/* Upload Button */}
            <div className="flex flex-col items-center space-y-3 w-full max-w-md">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploading}
                className="hidden"
                id="page-image-upload"
              />
              <label
                htmlFor="page-image-upload"
                className={`px-8 py-3 rounded-lg transition-colors cursor-pointer text-sm font-medium w-full text-center ${
                  isUploading
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                }`}
              >
                {isUploading ? "Uploading..." : "Choose Image File"}
              </label>

              {/* Upload Status */}
              <div className="text-center space-y-1">
                {isUploading && (
                  <div className="text-sm text-blue-600 font-medium">
                    ⏳ Uploading image to server...
                  </div>
                )}
                {attributes.image && !isUploading && (
                  <div className="text-sm text-green-600 font-medium">
                    ✅ Image saved successfully
                  </div>
                )}
                <p className="text-xs text-gray-500">
                  {onFileUpload
                    ? "Images will be uploaded to your server"
                    : "Images will be stored locally (demo mode)"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Status Selection */}
        <div className="border-b border-gray-100 pb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={attributes.status || "draft"}
            onChange={(e) =>
              handlePageAttributeChange("status", e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Set the publication status of this page
          </p>
        </div>

        {/* Show Menu Checkbox */}
        <div className="border-b border-gray-100 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Show Component Menu
              </label>
              <p className="text-xs text-gray-500">
                Display the menu bar with delete button on each component
              </p>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={attributes.showMenubar}
                onChange={(e) =>
                  handlePageAttributeChange(
                    "showMenubar",
                    e.target.checked as any
                  )
                }
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
              />
            </div>
          </div>
        </div>

        {/* Layout Settings */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Margin
          </label>
          <input
            type="text"
            value={attributes.margin}
            onChange={(e) =>
              handlePageAttributeChange("margin", e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., 0, 10px, 1rem"
          />
          <p className="text-xs text-gray-500 mt-1">
            Space around the entire page content
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Padding
          </label>
          <input
            type="text"
            value={attributes.padding}
            onChange={(e) =>
              handlePageAttributeChange("padding", e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., 20px, 2rem"
          />
          <p className="text-xs text-gray-500 mt-1">
            Space inside the page container
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Background Color
          </label>
          <div className="flex gap-4 items-center">
            <input
              type="color"
              value={attributes.background}
              onChange={(e) =>
                handlePageAttributeChange("background", e.target.value)
              }
              className="w-16 h-16 border border-gray-300 rounded-lg cursor-pointer shadow-sm"
            />
            <input
              type="text"
              value={attributes.background}
              onChange={(e) =>
                handlePageAttributeChange("background", e.target.value)
              }
              className="flex-1 p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="#ffffff, rgb(255,255,255), etc."
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Background color for the main content area
          </p>
        </div>
      </div>

      {/* Current Page Configuration */}
      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
        <h4 className="font-medium text-blue-800 mb-3 text-lg">
          Current Page Configuration
        </h4>
        <div className="text-sm text-blue-700 grid grid-cols-2 gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-medium">Menu Bar:</span>
            <code
              className={`px-2 py-1 rounded ${
                attributes.showMenubar
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {attributes.showMenubar ? "Visible" : "Hidden"}
            </code>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-medium">Status:</span>
            <code className="px-2 py-1 rounded bg-gray-100">
              {attributes.status || "draft"}
            </code>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-medium">Margin:</span>
            <code className="px-2 py-1 rounded bg-gray-100">
              {attributes.margin || "Not set"}
            </code>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-medium">Padding:</span>
            <code className="px-2 py-1 rounded bg-gray-100">
              {attributes.padding || "Not set"}
            </code>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-medium">Background:</span>
            <code className="px-2 py-1 rounded bg-gray-100 truncate max-w-[120px]">
              {attributes.background || "Not set"}
            </code>
          </div>

          {/* New: Lists Summary */}
          <div className="flex items-center space-x-2">
            <span className="font-medium">Lists:</span>
            <code className="px-2 py-1 rounded bg-gray-100">
              {source.lists?.length || 0} lists, {totalListItems} items
            </code>
          </div>

          {/* New: Data Sources Summary */}
          <div className="flex items-center space-x-2">
            <span className="font-medium">Data Sources:</span>
            <code className="px-2 py-1 rounded bg-gray-100">
              {source.dataSources?.length || 0} configured
            </code>
          </div>

          <div className="col-span-2 flex items-start space-x-2">
            <span className="font-medium whitespace-nowrap">Image:</span>
            <code className="px-2 py-1 rounded bg-gray-100 break-all flex-1">
              {attributes.image
                ? attributes.image.length > 80
                  ? attributes.image.substring(0, 80) + "..."
                  : attributes.image
                : "Not set"}
            </code>
          </div>
        </div>

        {/* Quick Statistics */}
        {(source.lists?.length > 0 || source.dataSources?.length > 0) && (
          <div className="mt-4 pt-4 border-t border-blue-200">
            <h5 className="font-medium text-blue-800 mb-2 text-sm">
              Quick Statistics
            </h5>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {source.lists?.length > 0 && (
                <div className="flex justify-between">
                  <span className="text-blue-700">Total Lists:</span>
                  <span className="font-medium">{source.lists.length}</span>
                </div>
              )}
              {totalListItems > 0 && (
                <div className="flex justify-between">
                  <span className="text-blue-700">Total List Items:</span>
                  <span className="font-medium">{totalListItems}</span>
                </div>
              )}
              {source.dataSources?.length > 0 && (
                <div className="flex justify-between">
                  <span className="text-blue-700">API Data Sources:</span>
                  <span className="font-medium">
                    {
                      source.dataSources.filter((ds: any) => ds.type === "api")
                        .length
                    }
                  </span>
                </div>
              )}
              {source.dataSources?.length > 0 && (
                <div className="flex justify-between">
                  <span className="text-blue-700">Static Data Sources:</span>
                  <span className="font-medium">
                    {
                      source.dataSources.filter(
                        (ds: any) => ds.type === "static"
                      ).length
                    }
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Usage Tips */}
      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <h4 className="font-medium text-green-800 mb-2 text-sm">
          💡 Usage Tips
        </h4>
        <ul className="text-xs text-green-700 space-y-1">
          <li>
            • Use the <strong>List tab</strong> to create dropdown options,
            radio choices, etc.
          </li>
          <li>
            • Use the <strong>Data Source tab</strong> to configure APIs for
            dynamic content
          </li>
          <li>
            • Reference lists in components with:{" "}
            <code>{"{{list.your_list_name}}"}</code>
          </li>
          <li>
            • Reference data sources with:{" "}
            <code>{"{{dataSource.source_name.field}}"}</code>
          </li>
          <li>• All configurations are automatically saved with your page</li>
        </ul>
      </div>
    </div>
  );
};
