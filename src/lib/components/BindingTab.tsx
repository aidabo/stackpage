// BindingTab.tsx
import React, { useState } from "react";
import { isDataBindingField } from "./PropertyTypeUtils";

interface BindingTabProps {
  componentProps: any;
  onPropertyChange: (data: any) => void;
}

export const BindingTab: React.FC<BindingTabProps> = ({
  componentProps,
  onPropertyChange,
}) => {
  const [editedBindings, setEditedBindings] = useState<Record<string, string>>(
    {}
  );

  const bindingFields = Object.entries(componentProps)
    .filter(([key, value]) => isDataBindingField(key, value))
    .map(([key, value]) => ({ key, value }));

  const handleBindingChange = (key: string, value: string) => {
    const newBindings = { ...editedBindings, [key]: value };
    setEditedBindings(newBindings);

    // Update the actual props using the original property change handler
    const newProps = { ...componentProps, [key]: value };
    onPropertyChange({ formData: newProps });
  };

  const handleApplyAll = () => {
    const newProps = { ...componentProps, ...editedBindings };
    onPropertyChange({ formData: newProps });
    setEditedBindings({});
  };

  if (bindingFields.length === 0) {
    return (
      <div className="p-6 h-full flex items-center justify-center">
        <div className="text-center py-8 text-gray-500 bg-white rounded-lg border border-gray-200 max-w-md w-full">
          <div className="text-3xl mb-2">🔗</div>
          <p className="text-sm">No data binding fields found</p>
          <p className="text-xs mt-1">
            Fields with API endpoints, URLs, or template literals will appear
            here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4 h-full overflow-auto">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Data Bindings</h3>
          {Object.keys(editedBindings).length > 0 && (
            <button
              onClick={handleApplyAll}
              className="px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
            >
              Apply All Changes
            </button>
          )}
        </div>

        <div className="space-y-4">
          {bindingFields.map(({ key, value }) => (
            <div key={key} className="border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {key}
              </label>
              <textarea
                value={editedBindings[key] ?? value}
                onChange={(e) => handleBindingChange(key, e.target.value)}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
                placeholder="Enter binding expression..."
              />
              <div className="mt-2 text-xs text-gray-500">
                Current value:{" "}
                <code className="bg-gray-100 px-1 rounded">
                  {String(value)}
                </code>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="text-sm font-medium text-blue-800 mb-2">
          Binding Examples
        </h4>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>
            • API Endpoints:{" "}
            <code className="bg-blue-100 px-1 rounded">/api/users</code>
          </li>
          <li>
            • Template Literals:{" "}
            <code className="bg-blue-100 px-1 rounded">{`{{user.name}}`}</code>
          </li>
          <li>
            • Data Source References:{" "}
            <code className="bg-blue-100 px-1 rounded">{`{{dataSource.users.name}}`}</code>
          </li>
          <li>
            • List References:{" "}
            <code className="bg-blue-100 px-1 rounded">{`{{list.categories}}`}</code>
          </li>
        </ul>
      </div>
    </div>
  );
};
