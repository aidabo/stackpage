// PropertiesTab.tsx
import { useStackPage } from "./StackPageContext";
import { useWidgetProps } from "./StackPageWidgetProps";
import { PropertyField } from "./PropertyField";

interface PropertiesTabProps {
  onFileUpload?: (file: File) => Promise<string>;
  onApiCall?: (endpoint: string, data?: any) => Promise<any>;
  onCustomAction?: (action: string, data: any) => Promise<any>;
  onGetSelectOptions?: (propertyName: string, componentType: string) => Promise<string[]>;
}

export const PropertiesTab = ({ 
  onFileUpload, 
  onApiCall, 
  onCustomAction,
  onGetSelectOptions
}: PropertiesTabProps) => {
  const { selectedInstance, selectedComponent, setSelectedInstance, setSelectedComponent } = useStackPage();
  const { updateProps, getProps } = useWidgetProps(selectedInstance?.id);

  if (!selectedInstance && !selectedComponent) {
    return (
      <div className="p-4 text-center text-gray-500">
        <div className="mb-2">👈</div>
        <p>
          Select a component from the Components tab or click on a placed
          component to edit its properties
        </p>
      </div>
    );
  }

  const componentType = selectedInstance?.type || selectedComponent;
  
  // Get current props - merge updated props from context with instance props
  const currentInstanceProps = selectedInstance?.props || {};
  const updatedPropsFromContext = getProps() || {};
  const currentProps = { ...currentInstanceProps, ...updatedPropsFromContext };

  const handlePropertyChange = (property: string, value: any) => {
    if (selectedInstance) {
      // Create updated props by merging the change with existing props
      const updatedProps = { ...currentProps, [property]: value };
      
      // Update the selected instance in context
      const updatedInstance = { 
        ...selectedInstance, 
        props: updatedProps 
      };
      setSelectedInstance(updatedInstance);

      // Update the widget props in StackPageContext
      updateProps(updatedProps);
    }
  };

  // Handle dynamic select options
  const handleGetSelectOptions = async (property: string) => {
    if (onGetSelectOptions) {
      try {
        const options = await onGetSelectOptions(property, componentType || '');
        // Format options as select string: [option1, option2, option3]
        const selectString = `[${options.join(', ')}]`;
        handlePropertyChange(property, selectString);
      } catch (error) {
        console.error('Failed to get select options:', error);
        alert('Failed to load options');
      }
    }
  };

  // Handle API calls for dynamic data
  const handleApiCall = async (property: string, endpoint: string) => {
    if (onApiCall) {
      try {
        const result = await onApiCall(endpoint);
        handlePropertyChange(property, result);
      } catch (error) {
        console.error('API call failed:', error);
        alert('Failed to fetch data from API');
      }
    }
  };

  // Handle custom actions
  const handleCustomAction = async (property: string, action: string, data: any) => {
    if (onCustomAction) {
      try {
        const result = await onCustomAction(action, data);
        handlePropertyChange(property, result);
      } catch (error) {
        console.error('Custom action failed:', error);
        alert('Failed to execute action');
      }
    }
  };

  // Check if a property is a select field
  const isSelectField = (value: any): boolean => {
    if (typeof value !== 'string') return false;
    const selectPattern = /^\[([^\]]+)\]$/;
    const match = value.match(selectPattern);
    return !!(match && (match[1].includes(',') || match[1].includes('|')));
  };

  // Check if a property is a date/datetime field
  const isDateField = (name: string, value: any): boolean => {
    const lowerName = name.toLowerCase();
    const isDateType = ['date', 'time', 'datetime', 'created', 'updated', 'start', 'end', 'timestamp'].includes(lowerName);
    
    if (isDateType) return true;
    
    // Also check if the value is a valid date string
    if (typeof value === 'string') {
      const date = new Date(value);
      return !isNaN(date.getTime());
    }
    
    return false;
  };

  // Get field type for display
  const getFieldTypeDisplay = (name: string, value: any): string => {
    if (typeof value === 'number') return 'number';
    if (typeof value === 'boolean') return 'boolean';
    if (Array.isArray(value)) return 'array';
    if (typeof value === 'object' && value !== null) return 'object';
    if (isSelectField(value)) return 'select';
    if (isDateField(name, value)) return 'date/datetime';
    if (typeof value === 'string' && (value.length > 40 || value.includes('\n'))) return 'long text';
    return 'text';
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">
          Properties - {componentType}
          {selectedInstance && (
            <span className="text-sm text-gray-500 ml-2">
              (ID: {selectedInstance.id})
            </span>
          )}
        </h3>
      </div>

      {/* Properties list */}
      <div className="space-y-4">
        {Object.entries(currentProps).map(([key, value]) => {
          const isSelect = isSelectField(value);
          const isDate = isDateField(key, value);
          const fieldType = getFieldTypeDisplay(key, value);
          
          return (
            <div
              key={key}
              className="border-b border-gray-100 pb-3 last:border-b-0"
            >
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </label>
                
                {/* Action buttons for specific field types */}
                <div className="flex space-x-1">
                  {isSelect && onGetSelectOptions && (
                    <button
                      onClick={() => handleGetSelectOptions(key)}
                      className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                      title="Refresh options"
                    >
                      Refresh
                    </button>
                  )}
                  {key.toLowerCase().includes('api') && onApiCall && (
                    <button
                      onClick={() => handleApiCall(key, '/api/data')}
                      className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                    >
                      Fetch
                    </button>
                  )}
                  {key.toLowerCase().includes('action') && onCustomAction && (
                    <button
                      onClick={() => handleCustomAction(key, 'customAction', currentProps)}
                      className="text-xs bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700"
                    >
                      Run
                    </button>
                  )}
                </div>
              </div>
              
              {/* Property field */}
              <PropertyField
                name={key}
                value={value}
                onChange={(newValue) => handlePropertyChange(key, newValue)}
                onFileUpload={onFileUpload}
              />
              
              {/* Field type indicator */}
              <div className="text-xs text-gray-400 mt-1 flex justify-between">
                <span>Type: {fieldType}</span>
                {isSelect && <span className="text-blue-500">Select Field</span>}
                {isDate && <span className="text-green-500">Date Field</span>}
              </div>
            </div>
          );
        })}
      </div>

      {/* No properties message */}
      {Object.keys(currentProps).length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">📝</div>
          <p>No properties available for this component</p>
          <p className="text-sm mt-1">Properties will appear here when the component has configurable options</p>
        </div>
      )}

      {/* Clear selection button */}
      {selectedInstance && (
        <div className="mt-6 pt-4 border-t">
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setSelectedInstance(null);
                setSelectedComponent(null);
              }}
              className="flex-1 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors font-medium"
            >
              Clear Selection
            </button>
            <button
              onClick={() => {
                // Reset all properties to their default values
                const defaultProps = selectedInstance?.props || {};
                const resetProps = Object.keys(defaultProps).reduce((acc, key) => {
                  const value = defaultProps[key];
                  // Reset to initial value based on type
                  if (typeof value === 'number') acc[key] = 0;
                  else if (typeof value === 'boolean') acc[key] = false;
                  else if (Array.isArray(value)) acc[key] = [];
                  else if (typeof value === 'object') acc[key] = {};
                  else acc[key] = '';
                  return acc;
                }, {} as Record<string, any>);
                
                handlePropertyChange('*RESET*', resetProps);
              }}
              className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors font-medium text-sm"
              title="Reset all properties to default values"
            >
              Reset
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            This is a GridStack widget. Property changes will update the
            widget in real-time.
          </p>
        </div>
      )}
    </div>
  );
};