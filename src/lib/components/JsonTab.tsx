// JsonTab.tsx
import React, { useState } from "react";

interface JsonTabProps {
  componentProps: any;
  onChange: (props: any) => void;
}

export const JsonTab: React.FC<JsonTabProps> = ({
  componentProps,
  onChange,
}) => {
  const [editedJson, setEditedJson] = useState(
    JSON.stringify(componentProps, null, 2)
  );
  const [isValid, setIsValid] = useState(true);

  const handleJsonChange = (value: string) => {
    setEditedJson(value);
    try {
      const parsed = JSON.parse(value);
      setIsValid(true);
      onChange(parsed);
    } catch (error) {
      setIsValid(false);
    }
  };

  const formatJson = () => {
    try {
      const parsed = JSON.parse(editedJson);
      const formatted = JSON.stringify(parsed, null, 2);
      setEditedJson(formatted);
      setIsValid(true);
    } catch (error) {
      setIsValid(false);
    }
  };

  return (
    <div className="p-6 space-y-4 h-full overflow-auto">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-lg font-medium mb-4">Raw JSON Editor</h3>

        <div className="space-y-3">
          <textarea
            value={editedJson}
            onChange={(e) => handleJsonChange(e.target.value)}
            rows={15}
            className={`w-full p-3 border rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              isValid ? "border-gray-300" : "border-red-500"
            }`}
            placeholder="Enter component properties as JSON..."
          />

          <div className="flex justify-between">
            <button
              onClick={formatJson}
              className="px-4 py-2 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors"
            >
              Format JSON
            </button>

            {!isValid && (
              <div className="text-red-600 text-sm flex items-center">
                Invalid JSON format
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h4 className="text-sm font-medium text-yellow-800 mb-2">
          ⚠️ Advanced Editor
        </h4>
        <ul className="text-xs text-yellow-700 space-y-1">
          <li>• Edit the complete component properties including schema</li>
          <li>• Changes are applied immediately when valid JSON is detected</li>
          <li>• Invalid JSON will be highlighted</li>
          <li>• Use with caution as invalid data may break the component</li>
        </ul>
      </div>
    </div>
  );
};
