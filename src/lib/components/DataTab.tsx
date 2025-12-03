// DataTab.tsx - 完整修复版本
import React, { useMemo, useEffect, useRef, useState } from "react";
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
import { useStackPage } from "./StackPageContext";
import { ErrorBoundary } from "./ErrorBoundary";

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
  onSchemaChange?: (schema: any) => void; // 新增：schema变更回调
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
  const [localComponentSchema, setLocalComponentSchema] =
    useState(componentSchema);
  const [formError, setFormError] = useState<string | null>(null);

  // 当componentSchema从外部更新时，同步到本地状态
  useEffect(() => {
    setLocalComponentSchema(componentSchema);
  }, [componentSchema]);

  // 使用提供的componentSchema或从props生成
  const { schema, uiSchema } = useMemo(() => {
    try {
      // 使用本地的schema
      let finalSchema = localComponentSchema;

      // 如果schema为空或无效，从props生成一个
      if (
        !finalSchema ||
        typeof finalSchema !== "object" ||
        Object.keys(finalSchema).length === 0 ||
        !finalSchema.properties
      ) {
        finalSchema = generateSchemaFromCurrentProps(componentProps);
      }

      // 确保schema有正确的结构
      if (!finalSchema.type) finalSchema.type = "object";
      if (!finalSchema.properties) finalSchema.properties = {};
      if (!finalSchema.required) finalSchema.required = [];

      // 确保schema可以处理当前props（尤其是数组）
      const generatedUiSchema = generateUiSchema(finalSchema);

      return { schema: finalSchema, uiSchema: generatedUiSchema };
    } catch (error) {
      console.error("Error generating schema:", error);
      setFormError(`Error generating schema: ${error}`);
      // 回退到生成的schema
      const fallbackSchema = generateSchemaFromCurrentProps(componentProps);
      const fallbackUiSchema = generateUiSchema(fallbackSchema);
      return { schema: fallbackSchema, uiSchema: fallbackUiSchema };
    }
  }, [localComponentSchema, componentProps]);

  // 调试日志
  useEffect(() => {
    console.log("Current schema:", schema);
    console.log("Current uiSchema:", uiSchema);
    console.log("Current props:", componentProps);
  }, [schema, uiSchema, componentProps]);

  // 当schema变更时清理表单错误
  useEffect(() => {
    const currentSchema = JSON.stringify(schema);
    const previousSchema = JSON.stringify(previousSchemaRef.current);

    if (previousSchemaRef.current && currentSchema !== previousSchema) {
      // Schema已变更 - 清理表单错误并重置不兼容的数据
      setFormError(null);
      if (formRef.current) {
        // 清理RJSF表单错误
        const formElement = formRef.current.formElement;
        if (formElement) {
          // 清理验证错误
          const errorElements = formElement.querySelectorAll(
            '.errors, .error-detail, [role="alert"]'
          );
          errorElements.forEach((element: Element) => {
            if (element.parentNode) {
              element.parentNode.removeChild(element);
            }
          });
        }

        // 为不兼容的类型重置表单数据
        const cleanedProps = cleanFormDataForSchema(componentProps, schema);
        if (JSON.stringify(cleanedProps) !== JSON.stringify(componentProps)) {
          onPropertyChange({ formData: cleanedProps });
        }
      }
    }

    // 更新之前的schema引用
    previousSchemaRef.current = schema;
  }, [schema, componentProps, onPropertyChange]);

  // 清理表单数据的辅助函数
  const cleanFormDataForSchema = (formData: any, currentSchema: any): any => {
    if (!formData || !currentSchema || !currentSchema.properties) {
      return formData;
    }

    const cleanedData = { ...formData };
    const schemaProperties = currentSchema.properties;

    Object.keys(schemaProperties).forEach((key) => {
      const fieldSchema = schemaProperties[key];
      const currentValue = cleanedData[key];

      // 重置与新schema类型不兼容的值
      if (
        fieldSchema.type === "number" &&
        typeof currentValue !== "number" &&
        currentValue !== ""
      ) {
        // 如果schema期望数字但我们有非数字字符串，重置为0
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
        // 如果schema期望字符串但我们有数字，转换为字符串
        cleanedData[key] = String(currentValue);
      } else if (
        fieldSchema.type === "boolean" &&
        typeof currentValue !== "boolean"
      ) {
        // 如果schema期望布尔值但我们有其他类型，设置为false
        cleanedData[key] = false;
      } else if (fieldSchema.type === "array" && !Array.isArray(currentValue)) {
        // 如果schema期望数组但我们有其他类型，设置为空数组
        cleanedData[key] = [];
      }
    });

    return cleanedData;
  };

  // 处理schema保存
  const handleSchemaSave = (newSchema: any) => {
    console.log("Saving new schema:", newSchema);
    try {
      // 验证schema格式
      if (!newSchema || typeof newSchema !== "object") {
        throw new Error("Invalid schema format");
      }

      // 确保有必需的字段
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

  // 处理schema生成
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

  // 移除的widgets代码保持不变...
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

  // 辅助函数
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
                  {componentType} Properties
                </h3>
                <p className="text-sm text-gray-500">
                  Edit component properties and schema
                </p>
              </div>

              <div className="flex space-x-2">
                {/* Schema Actions */}
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
    </>
  );
};
