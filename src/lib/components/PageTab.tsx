import { useStackPage } from "./StackPageContext";
import { useState, useRef } from "react";

interface PageTabProps {
  onFileUpload?: (file: File) => Promise<string>;
}

// Page Tab Component
export const PageTab = ({ onFileUpload }: PageTabProps) => {
  const { attributes, setPageAttributes } = useStackPage();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePageAttributeChange = (attribute: string, value: string) => {
    const newAttributes = {
      ...attributes,
      [attribute]: value,
    };
    setPageAttributes(newAttributes);
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create temporary preview
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setIsUploading(true);

      try {
        let finalImageUrl = previewUrl;

        // Only call onFileUpload if it exists
        if (onFileUpload) {
          finalImageUrl = await onFileUpload(file);
          // Clean up the temporary preview URL
          URL.revokeObjectURL(previewUrl);
          setImagePreview(null);
        }

        // Update the attributes with the final image URL
        handlePageAttributeChange("image", finalImageUrl);
      } catch (error) {
        console.error("Failed to upload image:", error);
        // If upload fails, keep the preview but show error
        alert("Failed to upload image. Please try again.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleImageRemove = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    handlePageAttributeChange("image", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const statusOptions = ["draft", "published"];

  return (
    <div className="h-full p-4 space-y-6 max-h-[calc(100vh-48*0.25rem)] overflow-y-auto">
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
          <div className="flex flex-col items-start space-y-3">
            {attributes.image || imagePreview ? (
              <div className="relative">
                <img
                  src={attributes.image || imagePreview || ""}
                  alt="Page preview"
                  className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                />
                <button
                  type="button"
                  onClick={handleImageRemove}
                  disabled={isUploading}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 disabled:bg-gray-400"
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400">
                {isUploading ? "Uploading..." : "No image"}
              </div>
            )}
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
              className={`px-4 py-2 rounded-lg transition-colors cursor-pointer text-sm ${
                isUploading
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isUploading ? "Uploading..." : "Upload Image"}
            </label>
            <p className="text-xs text-gray-500">
              {onFileUpload
                ? "Image will be uploaded to your server"
                : "Image will be stored locally (for demo)"}
            </p>
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
            className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
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
            className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
          <div className="flex gap-3 items-center">
            <input
              type="color"
              value={attributes.background}
              onChange={(e) =>
                handlePageAttributeChange("background", e.target.value)
              }
              className="w-12 h-12 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={attributes.background}
              onChange={(e) =>
                handlePageAttributeChange("background", e.target.value)
              }
              className="flex-1 p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="#ffffff, rgb(255,255,255), etc."
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Background color for the main content area
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">
          Current Page Settings
        </h4>
        <div className="text-sm text-blue-700 grid grid-cols-2 gap-2">
          <div>
            Menu Bar:{" "}
            <code>{attributes.showMenubar ? "Visible" : "Hidden"}</code>
          </div>
          <div>
            Status: <code>{attributes.status || "draft"}</code>
          </div>
          <div>
            Margin: <code>{attributes.margin}</code>
          </div>
          <div>
            Padding: <code>{attributes.padding}</code>
          </div>
          <div>
            Background: <code>{attributes.background}</code>
          </div>
          <div className="col-span-2">
            Image:{" "}
            <code>
              {attributes.image
                ? onFileUpload
                  ? "Remote"
                  : "Local"
                : "Not set"}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};
