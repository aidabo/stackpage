// DataTab.tsx
import React, { useMemo, useEffect, useRef } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
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
import {
  generateSchemaFromCurrentProps,
  generateUiSchema,
  getFileType,
  getFileAccept,
} from "./PropertyTypeUtils";
import {
  ApiCallFn,
  CustomActionFn,
  FileUploadFn,
  GetSelectOptionsFn,
} from "..";

interface DataTabProps {
  selectedInstance: any;
  componentType: string;
  componentProps: any;
  currentProps: any;
  onPropertyChange: (data: any) => void;
  onFileUpload?: FileUploadFn;
  onApiCall?: ApiCallFn;
  onCustomAction?: CustomActionFn;
  onGetSelectOptions?: GetSelectOptionsFn;
  setSelectedInstance: (instance: any) => void;
  setSelectedComponent: (component: string | null) => void;
  componentSchema: any; // The schema defined in SchemaTab
}

export const DataTab: React.FC<DataTabProps> = ({
  selectedInstance,
  componentType,
  componentProps,
  currentProps,
  onPropertyChange,
  onFileUpload,
  onApiCall,
  onCustomAction,
  onGetSelectOptions,
  setSelectedInstance,
  setSelectedComponent,
  componentSchema,
}) => {
  const formRef = useRef<any>(null);
  const previousSchemaRef = useRef<any>(null);

  // Use the provided componentSchema for form structure, but ensure it can handle arrays
  const { schema, uiSchema } = useMemo(() => {
    try {
      // Use the schema from SchemaTab if it exists and is valid
      let finalSchema = componentSchema;

      // If the provided schema is empty or invalid, generate one from props
      if (
        !finalSchema ||
        Object.keys(finalSchema).length === 0 ||
        !finalSchema.properties
      ) {
        finalSchema = generateSchemaFromCurrentProps(componentProps);
      }

      // Ensure the schema can handle the current props (especially arrays)
      const generatedUiSchema = generateUiSchema(finalSchema);

      return { schema: finalSchema, uiSchema: generatedUiSchema };
    } catch (error) {
      console.error("Error generating schema:", error);
      // Fallback to generated schema
      const fallbackSchema = generateSchemaFromCurrentProps(componentProps);
      const fallbackUiSchema = generateUiSchema(fallbackSchema);
      return { schema: fallbackSchema, uiSchema: fallbackUiSchema };
    }
  }, [componentSchema, componentProps, onFileUpload]);

  // Clear form errors when schema changes
  useEffect(() => {
    const currentSchema = JSON.stringify(schema);
    const previousSchema = JSON.stringify(previousSchemaRef.current);

    if (previousSchemaRef.current && currentSchema !== previousSchema) {
      // Schema has changed - clear form errors and reset incompatible data
      if (formRef.current) {
        // Clear RJSF form errors
        const formElement = formRef.current.formElement;
        if (formElement) {
          // Clear validation errors
          const errorElements = formElement.querySelectorAll(
            '.errors, .error-detail, [role="alert"]'
          );
          errorElements.forEach((element: Element) => {
            if (element.parentNode) {
              element.parentNode.removeChild(element);
            }
          });
        }

        // Reset form data for incompatible types
        const cleanedProps = cleanFormDataForSchema(componentProps, schema);
        if (JSON.stringify(cleanedProps) !== JSON.stringify(componentProps)) {
          onPropertyChange({ formData: cleanedProps });
        }
      }
    }

    // Update previous schema reference
    previousSchemaRef.current = schema;
  }, [schema, componentProps, onPropertyChange]);

  // Helper function to clean form data when schema changes
  const cleanFormDataForSchema = (formData: any, currentSchema: any): any => {
    if (!formData || !currentSchema || !currentSchema.properties) {
      return formData;
    }

    const cleanedData = { ...formData };
    const schemaProperties = currentSchema.properties;

    Object.keys(schemaProperties).forEach((key) => {
      const fieldSchema = schemaProperties[key];
      const currentValue = cleanedData[key];

      // Reset values that are incompatible with the new schema type
      if (
        fieldSchema.type === "number" &&
        typeof currentValue !== "number" &&
        currentValue !== ""
      ) {
        // If schema expects number but we have non-numeric string, reset to 0
        if (
          typeof currentValue === "string" &&
          currentValue.trim() !== "" &&
          isNaN(Number(currentValue))
        ) {
          cleanedData[key] = 0;
        }
      } else if (
        fieldSchema.type === "string" &&
        typeof currentValue === "number"
      ) {
        // If schema expects string but we have number, convert to string
        cleanedData[key] = String(currentValue);
      } else if (
        fieldSchema.type === "boolean" &&
        typeof currentValue !== "boolean"
      ) {
        // If schema expects boolean but we have other type, set to false
        cleanedData[key] = false;
      } else if (fieldSchema.type === "array" && !Array.isArray(currentValue)) {
        // If schema expects array but we have other type, set to empty array
        cleanedData[key] = [];
      }
    });

    return cleanedData;
  };

  // Updated widgets with consistent FileUploadFn signature
  const widgets = {
    FileWidget: (props: any) => (
      <FileWidget
        {...props}
        onFileUpload={
          onFileUpload
            ? (file: File) => {
                const fileType = getFileType(props.name, props.value);
                const acceptTypes = getFileAccept(props.name, props.value);
                return onFileUpload(file, {
                  onProgress: (progress) => {
                    console.log(`Upload progress: ${progress}%`);
                  },
                  onError: (error) => {
                    console.error("Upload error:", error);
                    alert(`Upload failed: ${error.message}`);
                  },
                  options: {
                    fileType: fileType,
                    fieldName: props.name,
                    acceptTypes: acceptTypes,
                    componentType: componentType,
                  },
                });
              }
            : undefined
        }
      />
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
      <ArrayOfObjectsWidget
        {...props}
        onFileUpload={
          onFileUpload
            ? (file: File, fieldName?: string, fieldType?: string) => {
                return onFileUpload(file, {
                  onProgress: (progress) => {
                    console.log(`Upload progress: ${progress}%`);
                  },
                  onError: (error) => {
                    console.error("Upload error:", error);
                    alert(`Upload failed: ${error.message}`);
                  },
                  options: {
                    fieldName: fieldName || props.name,
                    fieldType: fieldType || "file",
                    componentType: componentType,
                    isArrayItem: true,
                  },
                });
              }
            : undefined
        }
      />
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

  // Helper functions
  const isApiField = (value: any): boolean => {
    if (typeof value !== "string") return false;
    return value.startsWith("/api/");
  };

  const isCustomActionField = (value: any): boolean => {
    if (typeof value !== "string") return false;
    return value.toLowerCase().startsWith("/customaction/");
  };

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

  const handleReset = () => {
    const resetProps = Object.keys(componentProps).reduce((acc, key) => {
      const value = componentProps[key];
      if (typeof value === "number") acc[key] = 0;
      else if (typeof value === "boolean") acc[key] = false;
      else if (Array.isArray(value)) acc[key] = [];
      else if (typeof value === "object") acc[key] = {};
      else acc[key] = "";
      return acc;
    }, {} as Record<string, any>);

    onPropertyChange({ formData: resetProps });
  };

  if (Object.keys(schema).length === 0) {
    return (
      <div className="p-6 text-center text-red-500">
        <div className="mb-3 text-2xl">❌</div>
        <p className="text-base">Error generating properties form</p>
        <p className="text-sm mt-2">Please check the console for details</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Form Content */}
      <div className="flex-1 overflow-auto p-6">
        {/* RJSF Form */}
        <div className="properties-form">
          <Form
            ref={formRef}
            key={selectedInstance?.id}
            schema={schema}
            uiSchema={uiSchema}
            formData={componentProps}
            onChange={onPropertyChange}
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
                Object.entries(componentProps).some(([_, value]) =>
                  isApiField(value)
                ) && (
                  <button
                    onClick={async () => {
                      try {
                        const apiEndpoints = Object.entries(
                          componentProps
                        ).filter(([_, value]) => isApiField(value));

                        for (const [key, endpoint] of apiEndpoints) {
                          await handleApiCall(key, endpoint as any, onApiCall);
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
                Object.entries(componentProps).some(([_, value]) =>
                  isCustomActionField(value)
                ) && (
                  <button
                    onClick={async () => {
                      try {
                        const customActions = Object.entries(
                          componentProps
                        ).filter(([_, value]) => isCustomActionField(value));

                        for (const [key, actionValue] of customActions) {
                          const actionName = (actionValue as any).replace(
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
        {Object.keys(componentProps).length === 0 && (
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

      {/* Footer Actions */}
      <div className="border-t border-gray-200 bg-white p-4 sticky bottom-0">
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
            onClick={handleReset}
            className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
