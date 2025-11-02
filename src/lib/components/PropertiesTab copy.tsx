// PropertiesTab.tsx
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { useStackPage } from "./StackPageContext";
import { useWidgetProps } from "./StackPageWidgetProps";
import { 
  generateSchemaFromCurrentProps, 
  generateUiSchema 
} from "./PropertyTypeUtils";
import {
  CustomFieldTemplate,
  FileWidget,
  CustomSelectWidget,
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
} from "./PropertyWidgets";

interface PropertiesTabProps {
  onFileUpload?: (file: File) => Promise<string>;
  onApiCall?: (endpoint: string, data?: any) => Promise<any>;
  onCustomAction?: (action: string, data: any) => Promise<any>;
  onGetSelectOptions?: (
    propertyName: string,
    componentType: string
  ) => Promise<string[]>;
}

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

  // Add error handling for schema generation
  let schema, uiSchema;
  try {
    schema = generateSchemaFromCurrentProps(currentProps);
    uiSchema = generateUiSchema(currentProps, schema, onFileUpload);
  } catch (error) {
    console.error("Error generating schema:", error);
    return (
      <div className="p-6 text-center text-red-500">
        <div className="mb-3 text-2xl">❌</div>
        <p className="text-base">Error generating properties form</p>
        <p className="text-sm mt-2">Please check the console for details</p>
      </div>
    );
  }

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
    ArrayOfObjectsWidget: (props: any) => (
      <ArrayOfObjectsWidget {...props} onFileUpload={onFileUpload} />
    ),
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

  return (
    <div className="max-h-[calc(100vh-48*0.25rem)] h-full bg-white overflow-y-auto">
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
                          await handleApiCall(key, endpoint, onApiCall);
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
                            currentProps,
                            onCustomAction
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

// Helper functions for API calls and custom actions
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