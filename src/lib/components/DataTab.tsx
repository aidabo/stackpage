// DataTab.tsx - 完整修复版本
import React, {
  useMemo,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
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
import { SchemaEditorDialog } from "./SchemaEditorDialog";
import { DataExplorerDialog } from "./DataExplorerDialog";
import { useStackPage } from "./StackPageContext";
import { ErrorBoundary } from "./ErrorBoundary";
import { get } from "../utils/get";
import { LinkIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { applyTransformer } from "../utils/transformers"; // Import the transformer function
import { validateBindingAgainstSchema } from "../utils/bindingValidation";

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
  componentSchema: any;
  onSchemaChange?: (schema: any) => void;
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
  onSchemaChange,
}) => {
  const { source } = useStackPage();
  const formRef = useRef<any>(null);
  const previousSchemaRef = useRef<any>(null);
  const [showSchemaEditor, setShowSchemaEditor] = useState(false);
  const [showDataExplorer, setShowDataExplorer] = useState(false);
  const [localComponentSchema, setLocalComponentSchema] =
    useState(componentSchema);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    setLocalComponentSchema(componentSchema);
  }, [componentSchema]);

  const { schema, uiSchema } = useMemo(() => {
    try {
      let finalSchema = localComponentSchema;

      if (
        !finalSchema ||
        typeof finalSchema !== "object" ||
        Object.keys(finalSchema).length === 0 ||
        !finalSchema.properties
      ) {
        finalSchema = generateSchemaFromCurrentProps(componentProps);
      }

      if (!finalSchema.type) finalSchema.type = "object";
      if (!finalSchema.properties) finalSchema.properties = {};
      if (!finalSchema.required) finalSchema.required = [];

      const generatedUiSchema = generateUiSchema(finalSchema);

      return { schema: finalSchema, uiSchema: generatedUiSchema };
    } catch (error) {
      console.error("Error generating schema:", error);
      const fallbackSchema = generateSchemaFromCurrentProps(componentProps);
      const fallbackUiSchema = generateUiSchema(fallbackSchema);
      return { schema: fallbackSchema, uiSchema: fallbackUiSchema };
    }
  }, [localComponentSchema, componentProps]);

  useEffect(() => {
    console.log("Current schema:", schema);
    console.log("Current uiSchema:", uiSchema);
    console.log("Current props:", componentProps);
  }, [schema, uiSchema, componentProps]);

  useEffect(() => {
    const currentSchema = JSON.stringify(schema);
    const previousSchema = JSON.stringify(previousSchemaRef.current);

    if (previousSchemaRef.current && currentSchema !== previousSchema) {
      setFormError(null);
      const cleanedProps = cleanFormDataForSchema(componentProps, schema);
      if (JSON.stringify(cleanedProps) !== JSON.stringify(componentProps)) {
        console.warn("Form data mismatch with schema:", {
          cleanedProps,
          componentProps,
        });
      }
    }

    previousSchemaRef.current = schema;
  }, [schema, componentProps, onPropertyChange]);

  const cleanFormDataForSchema = (formData: any, currentSchema: any): any => {
    if (!formData || !currentSchema || !currentSchema.properties) {
      return formData;
    }

    const cleanedData = { ...formData };
    const schemaProperties = currentSchema.properties;

    Object.keys(schemaProperties).forEach((key) => {
      const fieldSchema = schemaProperties[key];
      const currentValue = cleanedData[key];

      if (
        fieldSchema.type === "number" &&
        typeof currentValue !== "number" &&
        currentValue !== ""
      ) {
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
        cleanedData[key] = String(currentValue);
      } else if (
        fieldSchema.type === "boolean" &&
        typeof currentValue !== "boolean"
      ) {
        cleanedData[key] = false;
      } else if (fieldSchema.type === "array" && !Array.isArray(currentValue)) {
        cleanedData[key] = [];
      }
    });

    return cleanedData;
  };

  const handleSchemaSave = (newSchema: any) => {
    console.log("Saving new schema:", newSchema);
    try {
      if (!newSchema || typeof newSchema !== "object") {
        throw new Error("Invalid schema format");
      }

      if (!newSchema.type) newSchema.type = "object";
      if (!newSchema.properties) newSchema.properties = {};
      if (!newSchema.required) newSchema.required = [];

      setLocalComponentSchema(newSchema);
      if (onSchemaChange) {
        onSchemaChange(newSchema);
      }
      setShowSchemaEditor(false);
      setFormError(null);
    } catch (error) {
      console.error("Error saving schema:", error);
      setFormError(`Error saving schema: ${error}`);
    }
  };

  const handleGenerateSchema = () => {
    try {
      const generatedSchema = generateSchemaFromCurrentProps(componentProps);
      console.log("Generated schema:", generatedSchema);
      setLocalComponentSchema(generatedSchema);
      if (onSchemaChange) {
        onSchemaChange(generatedSchema);
      }
      setFormError(null);
    } catch (error) {
      console.error("Error generating schema:", error);
      setFormError(`Error generating schema: ${error}`);
    }
  };

  // Add a state for validation warnings:
  const [validationWarnings, setValidationWarnings] = useState<
    Array<{
      property: string;
      message: string;
      severity: "warning" | "error";
    }>
  >([]);

  const validateCurrentBindings = useCallback(() => {
    if (!componentProps.__bindings || !localComponentSchema) {
      setValidationWarnings([]);
      return;
    }

    const warnings: Array<{
      property: string;
      message: string;
      severity: "warning" | "error";
    }> = [];

    Object.entries(componentProps.__bindings).forEach(
      ([prop, binding]: [string, any]) => {
        const propSchema = localComponentSchema?.properties?.[prop];
        if (!propSchema) {
          warnings.push({
            property: prop,
            message: `Property "${prop}" not found in schema`,
            severity: "warning",
          });
          return;
        }

        // Find the data source
        const dataSource = source.dataSources.find(
          (ds) => ds.id === binding.sourceId
        );
        if (!dataSource || !dataSource.data) {
          warnings.push({
            property: prop,
            message: `Data source "${binding.sourceId}" not found or has no data`,
            severity: "warning",
          });
          return;
        }

        // Get the value from the data source
        const value = get(dataSource.data, binding.path);

        // Validate the binding
        const validationWarnings = validateBindingAgainstSchema(
          binding,
          propSchema,
          value
        );

        validationWarnings.forEach((message) => {
          warnings.push({
            property: prop,
            message,
            severity: validationWarnings.length > 1 ? "error" : "warning",
          });
        });
      }
    );

    setValidationWarnings(warnings);
  }, [componentProps.__bindings, localComponentSchema, source.dataSources]);

  // Call validation when bindings or schema changes
  useEffect(() => {
    validateCurrentBindings();
  }, [validateCurrentBindings]);

  // Update handleApplyMappings to include validation:
  const handleApplyMappings = (
    mappings: Record<string, string>,
    dataSourceId: string,
    _data?: any,
    transformers?: Record<string, string>
  ) => {
    console.log("Applying mappings:", { mappings, dataSourceId, transformers });

    // Construct bindings object
    const newBindings: Record<string, any> = {};
    const validationErrors: string[] = [];

    Object.entries(mappings).forEach(([prop, path]) => {
      if (path) {
        const binding = {
          sourceId: dataSourceId,
          path: path,
          transformer: transformers?.[prop] || undefined,
        };
        newBindings[prop] = binding;

        // Validate against schema if we have data
        if (_data && schema?.properties?.[prop]) {
          const value = get(_data, path);
          const warnings = validateBindingAgainstSchema(
            binding,
            schema.properties[prop],
            value
          );
          if (warnings.length > 0) {
            validationErrors.push(`${prop}: ${warnings.join(", ")}`);
          }
        }
      }
    });

    // Show warnings if any
    if (validationErrors.length > 0) {
      const message = `Type compatibility warnings:\n${validationErrors.join(
        "\n"
      )}\n\nDo you want to continue?`;
      if (!window.confirm(message)) {
        return; // User cancelled
      }
    }

    // Update props with __bindings
    const updatedProps = {
      ...componentProps,
      __bindings: {
        ...(componentProps.__bindings || {}),
        ...newBindings,
      },
    };

    // Apply immediate binding for preview if data is provided
    if (_data) {
      Object.entries(mappings).forEach(([prop, path]) => {
        if (path) {
          const value = get(_data, path);
          if (value !== undefined) {
            let transformedValue = value;
            // Apply transformer if specified
            if (transformers?.[prop]) {
              transformedValue = applyTransformer(value, transformers[prop]);
            }
            updatedProps[prop] = transformedValue;
          }
        }
      });
    }

    onPropertyChange({ formData: updatedProps });
  };

  const handleBindRecord = (
    record: any,
    mappings: Record<string, string>,
    _dataSourceId: string
  ) => {
    const newProps = { ...componentProps };

    Object.entries(mappings).forEach(([prop, path]) => {
      if (path) {
        const value = get(record, path);
        if (value !== undefined) {
          newProps[prop] = value;
        }
      }
    });

    onPropertyChange({ formData: newProps });
  };

  const widgets = {
    TextWidget: CustomTextWidget,
    TextareaWidget: CustomTextareaWidget,
    CheckboxWidget: CustomCheckboxWidget,
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
        schema={{ ...props.schema, ...uiSchema[props.name] }}
        lists={source.lists}
        name={props.name}
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

  if (formError) {
    return (
      <div className="p-6 text-center text-red-500">
        <div className="mb-3 text-2xl">❌</div>
        <p className="text-base">{formError}</p>
        <button
          onClick={() => setFormError(null)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <>
      <ErrorBoundary
        key={selectedInstance?.id || componentType}
        fallback={
          <div className="p-6 text-center text-red-500">
            <div className="mb-3 text-2xl">❌</div>
            <p className="text-base">
              Form rendering error. Please check the schema.
            </p>
            <button
              onClick={handleGenerateSchema}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Regenerate Schema
            </button>
          </div>
        }
      >
        <div className="h-full flex flex-col">
          {/* Header with Schema Actions */}
          <div className="border-b border-gray-200 bg-white p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Properties
                </h3>
                <p className="text-sm text-gray-500">
                  Edit component properties and schema
                </p>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setShowDataExplorer(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700 transition-colors flex items-center gap-2"
                  title="Data Binding"
                >
                  <LinkIcon className="w-4 h-4" />
                  Data Binding
                </button>

                <button
                  onClick={() => setShowSchemaEditor(true)}
                  className="px-4 py-2 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 transition-colors flex items-center gap-2"
                  title="Edit Schema"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit Schema
                </button>

                <button
                  onClick={handleGenerateSchema}
                  className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                  title="Generate Schema from Current Props"
                >
                  Generate Schema
                </button>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-auto p-6">
            {/* RJSF Form */}
            <div className="properties-form">
              <Form
                ref={formRef}
                key={selectedInstance?.id || componentType}
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

            {/* Validation Warnings */}
            {validationWarnings.length > 0 && (
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="text-sm font-medium text-yellow-800 mb-2 flex items-center gap-2">
                  <ExclamationTriangleIcon className="w-4 h-4" />
                  Data Binding Warnings
                </h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  {validationWarnings.map((warning, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span
                        className={`mt-0.5 ${
                          warning.severity === "error"
                            ? "text-red-500"
                            : "text-yellow-500"
                        }`}
                      >
                        {warning.severity === "error" ? "❌" : "⚠️"}
                      </span>
                      <span>
                        <strong>{warning.property}:</strong> {warning.message}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 text-xs text-yellow-600">
                  These warnings indicate potential type mismatches between your
                  data and the component schema.
                </div>
              </div>
            )}

            {/* Bindings Summary */}
            {componentProps.__bindings &&
              Object.keys(componentProps.__bindings).length > 0 && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">
                    Active Data Bindings
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {Object.entries(componentProps.__bindings).map(
                      ([prop, binding]: [string, any]) => (
                        <div key={prop} className="flex justify-between">
                          <span className="font-medium text-blue-700">
                            {prop}:
                          </span>
                          <span className="text-blue-600 font-mono text-xs">
                            {binding.path}
                            {binding.transformer && ` → ${binding.transformer}`}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                  <div className="mt-2 text-xs text-blue-600">
                    {Object.keys(componentProps.__bindings).length} property(s)
                    bound to data source
                  </div>
                </div>
              )}

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
                              await handleApiCall(
                                key,
                                endpoint as any,
                                onApiCall
                              );
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
                            ).filter(([_, value]) =>
                              isCustomActionField(value)
                            );

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
                  Properties will appear here when the component has
                  configurable options
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
      </ErrorBoundary>

      {/* Schema Editor Dialog */}
      <SchemaEditorDialog
        isOpen={showSchemaEditor}
        onClose={() => setShowSchemaEditor(false)}
        onSave={handleSchemaSave}
        defaultProps={componentProps}
        currentSchema={localComponentSchema}
        lists={source.lists || []}
        dataSources={source.dataSources || []}
      />

      {/* Data Explorer Dialog */}
      <DataExplorerDialog
        isOpen={showDataExplorer}
        onClose={() => setShowDataExplorer(false)}
        dataSources={source.dataSources || []}
        onApplyMappings={handleApplyMappings}
        onBindRecord={handleBindRecord}
        mappableProps={Object.keys(componentProps).filter(
          (k) => k !== "__schema" && k !== "__bindings"
        )}
        currentMappings={
          componentProps.__bindings
            ? Object.entries(componentProps.__bindings).reduce(
                (acc: any, [key, binding]: any) => {
                  acc[key] = binding.path;
                  return acc;
                },
                {}
              )
            : {}
        }
        currentTransformers={
          componentProps.__bindings
            ? Object.entries(componentProps.__bindings).reduce(
                (acc: any, [key, binding]: any) => {
                  if (binding.transformer) acc[key] = binding.transformer;
                  return acc;
                },
                {}
              )
            : {}
        }
        schema={schema} // Pass the schema for type checking
      />
    </>
  );
};
