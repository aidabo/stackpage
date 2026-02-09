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
import { CustomActionFn, FileUploadFn } from "..";
import { SchemaEditorDialog } from "./SchemaEditorDialog";
import { DataExplorerDialog } from "./DataExplorerDialog";
import { useStackPage } from "./StackPageContext";
import { ErrorBoundary } from "./ErrorBoundary";
import { get } from "../utils/get";
import { LinkIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { validateBindingAgainstSchema } from "../utils/bindingValidation";
import { useDataBinding } from "./useDataBinding";
import { resolveBindingValue } from "../utils/bindingEngine";
import { ArrayBindingUtils } from "../utils/ArrayBindingUtils";

interface DataTabProps {
  selectedInstance: any;
  componentType: string;
  componentProps: any;
  currentProps: any;
  onPropertyChange: (data: any) => void;
  onFileUpload?: FileUploadFn;
  onCustomAction?: CustomActionFn;
  setSelectedInstance: (instance: any) => void;
  setSelectedComponent: (component: string | null) => void;
  componentSchema: any;
  onSchemaChange?: (schema: any) => void;
  bindings?: Record<string, any>;
  ignoredFields?: string[];
}

export const DataTab: React.FC<DataTabProps> = ({
  selectedInstance,
  componentType,
  componentProps,
  //currentProps,
  onPropertyChange,
  onFileUpload,
  // onCustomAction,
  setSelectedInstance,
  setSelectedComponent,
  componentSchema,
  onSchemaChange,
  bindings,
  ignoredFields,
}) => {
  const { source } = useStackPage();

  // Resolve bindings for display
  const fullProps = useMemo(
    () => ({
      ...componentProps,
      __bindings: bindings,
      __ignoredMappings: ignoredFields,
      __schema: componentSchema, // Pass schema to useDataBinding
    }),
    [componentProps, bindings, componentSchema, ignoredFields]
  );
  const resolvedProps = useDataBinding(fullProps);

  //DEBUG
  useEffect(() => {
    console.log("DataTab - Props updated:", {
      componentProps,
      resolvedProps,
    });
  }, [componentProps, resolvedProps]);

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

  // Helper to remove internal properties
  const getCleanProps = (props: any) => {
    const cleanProps = { ...props };
    delete cleanProps.__bindings;
    delete cleanProps.__schema;
    delete cleanProps.__ignoredMappings;
    return cleanProps;
  };

  const { schema, uiSchema } = useMemo(() => {
    try {
      let finalSchema = localComponentSchema;

      if (
        !finalSchema ||
        typeof finalSchema !== "object" ||
        Object.keys(finalSchema).length === 0 ||
        !finalSchema.properties
      ) {
        // Filter out internal properties before generating schema
        const cleanProps = getCleanProps(componentProps);

        finalSchema = generateSchemaFromCurrentProps(cleanProps);
      }

      if (!finalSchema.type) finalSchema.type = "object";
      if (!finalSchema.properties) finalSchema.properties = {};
      if (!finalSchema.required) finalSchema.required = [];

      const generatedUiSchema = generateUiSchema(finalSchema);

      // Enhanced UI Schema with visual markers for bindings and ignored fields
      const enhancedUiSchema = { ...generatedUiSchema };

      // Add visual style for bound fields
      if (bindings) {
        Object.keys(bindings).forEach((key) => {
          enhancedUiSchema[key] = {
            ...enhancedUiSchema[key],
            "ui:classNames":
              (enhancedUiSchema[key]?.["ui:classNames"] || "") +
              " bg-zinc-300 border-l-4 border-blue-300 pl-4 py-2 rounded-r",
            //"ui:readonly": true, // Make bound fields read-only in UI
          };
        });
      }

      // Add visual style for ignored fields
      if (componentProps.__ignoredMappings) {
        componentProps.__ignoredMappings.forEach((key: string) => {
          enhancedUiSchema[key] = {
            ...enhancedUiSchema[key],
            "ui:classNames":
              (enhancedUiSchema[key]?.["ui:classNames"] || "") +
              " bg-white-50 border-l-4 border-white-400 pl-4 py-2 rounded-r",
          };
        });
      }

      return { schema: finalSchema, uiSchema: enhancedUiSchema };
    } catch (error) {
      console.error("Error generating schema:", error);
      const cleanProps = getCleanProps(componentProps);

      const fallbackSchema = generateSchemaFromCurrentProps(cleanProps);
      const fallbackUiSchema = generateUiSchema(fallbackSchema);
      return { schema: fallbackSchema, uiSchema: fallbackUiSchema };
    }
  }, [localComponentSchema, componentProps, bindings]);

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
      const cleanProps = getCleanProps(componentProps);

      const generatedSchema = generateSchemaFromCurrentProps(cleanProps);
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
    if (!bindings || !localComponentSchema) {
      setValidationWarnings([]);
      return;
    }

    const warnings: Array<{
      property: string;
      message: string;
      severity: "warning" | "error";
    }> = [];

    Object.entries(bindings).forEach(([prop, binding]: [string, any]) => {
      // Handle array field bindings (e.g., "users[].name")
      // Extract the base property name from array notation
      let baseProp = prop;
      let arrayField = "";

      if (prop.includes("[].")) {
        // This is an array field binding
        const parts = prop.split("[].");
        baseProp = parts[0]; // "users"
        arrayField = parts[1]; // "name"
      } else if (prop.endsWith("[]")) {
        // Binding to entire array
        baseProp = prop.replace("[]", "");
      }

      // Get the schema for the base property
      const propSchema = localComponentSchema?.properties?.[baseProp];

      if (!propSchema) {
        warnings.push({
          property: prop,
          message: `Property "${baseProp}" not found in schema`,
          severity: "warning",
        });
        return;
      }

      // For array fields, check if the nested field exists in array items schema
      if (
        arrayField &&
        propSchema.type === "array" &&
        propSchema.items?.properties
      ) {
        const itemSchema = propSchema.items.properties[arrayField];
        if (!itemSchema) {
          warnings.push({
            property: prop,
            message: `Field "${arrayField}" not found in array "${baseProp}" items schema`,
            severity: "warning",
          });
        }
      }

      // Find the data source
      const dataSource = (source.dataSources || []).find(
        (ds) => ds.id === binding.sourceId
      );
      if (!dataSource || !(dataSource as any).data) {
        warnings.push({
          property: prop,
          message: `Data source "${binding.sourceId}" not found or has no data`,
          severity: "warning",
        });
        return;
      }

      // Get the value from the data source
      const value = get((dataSource as any).data, binding.path);

      // For array field validation, use the item schema if available
      let validationSchema = propSchema;
      if (
        arrayField &&
        propSchema.type === "array" &&
        propSchema.items?.properties
      ) {
        validationSchema = propSchema.items.properties[arrayField];
      }

      // Validate the binding
      if (validationSchema) {
        const validationWarnings = validateBindingAgainstSchema(
          binding,
          validationSchema,
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
    });

    setValidationWarnings(warnings);
  }, [bindings, localComponentSchema, source.dataSources]);

  // Call validation when bindings or schema changes
  useEffect(() => {
    validateCurrentBindings();
  }, [validateCurrentBindings]);

  const handleReleaseBindings = () => {
    if (
      !confirm(
        "Are you sure you want to release all data bindings for this component? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const cleanProps = getCleanProps(componentProps);
      // Explicitly set empty bindings to ensure they are cleared in PropertiesTab
      const propsWithClearedBindings = {
        ...cleanProps,
        __bindings: {},
        __ignoredMappings: [],
      };
      onPropertyChange({ formData: propsWithClearedBindings });
      setValidationWarnings([]);
    } catch (error) {
      console.error("Error releasing bindings:", error);
      setFormError(`Error releasing bindings: ${error}`);
    }
  };

  // Update handleApplyMappings to include validation:
  const handleApplyMappings = (
    mappings: Record<string, string>,
    dataSourceId: string,
    _data?: any,
    transformers?: Record<string, string>,
    bindingsFromDialog?: Record<string, any>, // Renamed from bindings to avoid confusion
    ignoredFields?: string[]
  ) => {
    console.log("Applying mappings:", {
      mappings,
      dataSourceId,
      transformers,
      bindingsFromDialog,
      ignoredFields,
    });

    // Use bindings from dialog if provided, otherwise create from mappings
    const newBindings: Record<string, any> = {};

    if (bindingsFromDialog) {
      // Use the bindings object from DataExplorerDialog directly
      Object.assign(newBindings, bindingsFromDialog);
    } else {
      // Create bindings from mappings (backward compatibility)
      Object.entries(mappings).forEach(([prop, path]) => {
        if (path) {
          const binding = {
            sourceId: dataSourceId,
            path: path,
            transformer: transformers?.[prop] || undefined,
            selector: { type: "index", value: 0 }, // Default selector
            targetType: localComponentSchema?.properties?.[prop]?.type,
          };
          newBindings[prop] = binding;
        }
      });
    }

    // Validate bindings
    const validationErrors: string[] = [];
    if (_data) {
      Object.entries(newBindings).forEach(([prop, binding]: [string, any]) => {
        if (schema?.properties?.[prop]) {
          const resolvedValue = resolveBindingValue(_data, binding);
          const warnings = validateBindingAgainstSchema(
            binding,
            schema.properties[prop],
            resolvedValue
          );
          if (warnings.length > 0) {
            validationErrors.push(`${prop}: ${warnings.join(", ")}`);
          }
        }
      });
    }

    // Show warnings if any
    if (validationErrors.length > 0) {
      const message = `Type compatibility warnings:\n${validationErrors.join(
        "\n"
      )}\n\nDo you want to continue?`;
      if (!window.confirm(message)) {
        return;
      }
    }

    // Update props with __bindings - CORRECTED: Merge with existing bindings
    const updatedProps = {
      ...componentProps,
      __bindings: {
        ...(bindings || {}), // Keep existing bindings
        ...newBindings, // Add/overwrite with new bindings
      },
      __ignoredMappings: ignoredFields || [],
    };

    // Clean up bindings for ignored fields
    if (ignoredFields && ignoredFields.length > 0) {
      ignoredFields.forEach((prop) => {
        if (updatedProps.__bindings && updatedProps.__bindings[prop]) {
          delete updatedProps.__bindings[prop];
        }
      });
    }

    console.log("Final bindings to save:", updatedProps.__bindings);
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
          <div className="border-b border-gray-50 bg-white p-4">
            <div className="flex flex-col gap-3">
              <div className="min-w-0">
                <h3 className="text-lg font-medium text-gray-900">
                  Properties
                </h3>
                <p className="text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
                  Edit component properties and schema
                </p>
              </div>

              <div>
                <div className="flex flex-nowrap gap-2">
                <button
                  onClick={() => setShowDataExplorer(true)}
                  className={`flex-1 min-w-0 px-3 py-2 text-white rounded text-sm transition-colors flex items-center justify-center gap-2 text-center ${bindings && Object.keys(bindings).length > 0
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                  title="Data Binding"
                >
                  <LinkIcon className="w-4 h-4" />
                  {bindings && Object.keys(bindings).length > 0 ? (
                    <span>Data Binding ({Object.keys(bindings).length})</span>
                  ) : (
                    <span>Data Binding</span>
                  )}
                </button>

                <button
                  onClick={() => setShowSchemaEditor(true)}
                  className="flex-1 min-w-0 px-3 py-2 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 text-center"
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
                  className="flex-1 min-w-0 px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors text-center"
                  title="Generate Schema from Current Props"
                >
                  Generate Schema
                </button>
                </div>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-auto p-2 bg-zinc-100">
            {/* RJSF Form */}
            <div className="properties-form">
              <Form
                ref={formRef}
                key={selectedInstance?.id || componentType}
                schema={schema}
                uiSchema={uiSchema}
                formData={resolvedProps}
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
                        className={`mt-0.5 ${warning.severity === "error"
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
            {bindings && Object.keys(bindings).length > 0 && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="text-sm font-medium text-blue-800 mb-2">
                  Active Data Bindings
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <tbody>
                      {Object.entries(bindings).map(
                        ([prop, binding]: [string, any]) => {
                          // Display array fields with proper notation
                          const displayProp = prop.includes("[].")
                            ? prop.replace("[]", "") // Show as "users.name" instead of "users[].name"
                            : prop;

                          return (
                            <tr
                              key={prop}
                              className="border-b border-blue-100 last:border-0"
                            >
                              <td className="py-1.5 pr-4 font-medium text-blue-700 align-top whitespace-nowrap">
                                {displayProp}
                              </td>
                              <td className="py-1.5 text-blue-600 font-mono text-xs align-top break-all">
                                {binding.path}
                                {binding.transformer && (
                                  <span className="block text-amber-700 text-[10px]">
                                    → {binding.transformer}
                                  </span>
                                )}
                                {binding.selector && (
                                  <span className="block text-gray-500 text-[10px]">
                                    [{binding.selector.type}
                                    {binding.selector.value !== undefined
                                      ? `:${binding.selector.value}`
                                      : ""}
                                    ]
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="mt-2 text-xs text-blue-600">
                  {Object.keys(bindings).length} property(s) bound to data
                  source
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
        mappableProps={ArrayBindingUtils.extractMappableArrayFields(
          schema
        ).filter(
          (k) =>
            k !== "__schema" && k !== "__bindings" && k !== "__ignoredMappings"
        )}
        currentMappings={
          bindings
            ? Object.entries(bindings).reduce(
              (acc: any, [key, binding]: any) => {
                acc[key] = binding.path;
                return acc;
              },
              {}
            )
            : {}
        }
        currentTransformers={
          bindings
            ? Object.entries(bindings).reduce(
              (acc: any, [key, binding]: any) => {
                if (binding.transformer) acc[key] = binding.transformer;
                return acc;
              },
              {}
            )
            : {}
        }
        currentBindings={bindings}
        schema={schema}
        currentIgnoredFields={ignoredFields || []}
        onReleaseBindings={handleReleaseBindings}
        initialDataSourceId={
          bindings && Object.keys(bindings).length > 0
            ? bindings[Object.keys(bindings)[0]]?.sourceId
            : undefined
        }
      />
    </>
  );
};
