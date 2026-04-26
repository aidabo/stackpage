// PropertiesTab.tsx - 移除SchemaTab引用
import {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
  lazy,
  Suspense,
} from "react";
import { LinkIcon } from "@heroicons/react/24/outline";
import { useStackPage } from "./StackPageContext";
import { useWidgetProps } from "./StackPageWidgetProps";
import { DataTab } from "./DataTab";
import { JsonTab } from "./JsonTab";
import { generateSchemaFromCurrentProps } from "./PropertyTypeUtils";
import { CustomActionFn, FileUploadFn } from "..";
import { ArrayBindingUtils } from "../utils/ArrayBindingUtils";
import { get } from "../utils/get";
import { InteractionRule } from "../utils/componentCommunication";

const SchemaEditorDialogLazy = lazy(() =>
  import("./SchemaEditorDialog").then((module) => ({
    default: module.SchemaEditorDialog,
  }))
);

const DataExplorerDialogLazy = lazy(() =>
  import("./DataExplorerDialog").then((module) => ({
    default: module.DataExplorerDialog,
  }))
);

const InteractionEditorDialogLazy = lazy(() =>
  import("./InteractionEditorDialog").then((module) => ({
    default: module.InteractionEditorDialog,
  }))
);

const DialogLoadingFallback = () => (
  <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-black bg-opacity-30">
    <div className="bg-white rounded-lg shadow px-4 py-3 text-sm text-gray-700">
      Loading dialog...
    </div>
  </div>
);

interface PropertiesTabProps {
  onFileUpload?: FileUploadFn;
  onCustomAction?: CustomActionFn;
}

type PropertiesSubTab = "form" | "event" | "json";

export const PropertiesTab = ({ onFileUpload }: PropertiesTabProps) => {
  const {
    selectedInstance,
    selectedComponent,
    setSelectedInstance,
    setSelectedComponent,
    source,
  } = useStackPage();

  const { updateProps, getProps } = useWidgetProps(selectedInstance?.id);
  const [activeSubTab, setActiveSubTab] = useState<PropertiesSubTab>("form");
  const initializedSchemas = useRef(new Set<string>());
  const [showSchemaEditor, setShowSchemaEditor] = useState(false);
  const [showDataExplorer, setShowDataExplorer] = useState(false);
  const [showInteractionEditor, setShowInteractionEditor] = useState(false);
  const [isGeneratingSchema, setIsGeneratingSchema] = useState(false);
  const [schemaActionMessage, setSchemaActionMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const selectionRef = useRef<{
    instanceId: string | null;
    component: string | null;
  }>({
    instanceId: selectedInstance?.id || null,
    component: selectedComponent,
  });

  useEffect(() => {
    selectionRef.current = {
      instanceId: selectedInstance?.id || null,
      component: selectedComponent,
    };
    setActiveSubTab("form");
  }, [selectedInstance, selectedComponent]);

  const componentType = selectedInstance?.type || selectedComponent;
  const currentInstanceProps = selectedInstance?.props || {};
  const updatedPropsFromContext = getProps() || {};
  const currentProps = { ...currentInstanceProps, ...updatedPropsFromContext };

  const {
    __schema,
    __bindings,
    __schemaOptions,
    __ignoredMappings,
    __interactions,
    ...componentPropsWithoutSchema
  } = currentProps;

  const interactionRules = (__interactions || []) as InteractionRule[];
  const componentPropsWithSchemaOptions = useMemo(
    () => ({
      ...componentPropsWithoutSchema,
      __schemaOptions: __schemaOptions || {},
    }),
    [componentPropsWithoutSchema, __schemaOptions]
  );

  const getCleanProps = (props: any) => {
    const cleanProps = { ...props };
    delete cleanProps.__bindings;
    delete cleanProps.__schema;
    delete cleanProps.__ignoredMappings;
    delete cleanProps.__interactions;
    delete cleanProps.__schemaOptions;
    return cleanProps;
  };

  useEffect(() => {
    if (
      selectedInstance &&
      !initializedSchemas.current.has(selectedInstance.id)
    ) {
      if (!__schema) {
        const generatedSchema = generateSchemaFromCurrentProps(
          componentPropsWithSchemaOptions
        );

        const updatedProps = {
          ...componentPropsWithoutSchema,
          __schema: generatedSchema,
          __bindings: __bindings || {},
          __schemaOptions: __schemaOptions || {},
          __ignoredMappings: __ignoredMappings || [],
          __interactions: __interactions || [],
        };

        const updatedInstance = {
          ...selectedInstance,
          props: updatedProps,
        };

        setSelectedInstance(updatedInstance);
        updateProps(updatedProps);
      }

      initializedSchemas.current.add(selectedInstance.id);
    }
  }, [
    selectedInstance,
    __schema,
    __schemaOptions,
    __interactions,
    componentPropsWithoutSchema,
    componentPropsWithSchemaOptions,
    setSelectedInstance,
    updateProps,
  ]);

  const componentSchema = useMemo(() => {
    if (__schema) {
      return __schema;
    }
    return generateSchemaFromCurrentProps(componentPropsWithSchemaOptions);
  }, [__schema, componentPropsWithSchemaOptions]);

  const handlePropertyChange = useCallback(
    (data: any) => {
      if (data.formData && selectedInstance) {
        const updatedProps = {
          ...data.formData,
          __schema: componentSchema,
          __bindings: data.formData.__bindings || __bindings,
          __schemaOptions:
            data.formData.__schemaOptions || __schemaOptions || {},
          __ignoredMappings:
            data.formData.__ignoredMappings || __ignoredMappings,
          __interactions:
            data.formData.__interactions || __interactions || [],
        };
        const updatedInstance = {
          ...selectedInstance,
          props: updatedProps,
        };
        setSelectedInstance(updatedInstance);
        updateProps(updatedProps);
      }
    },
    [
      selectedInstance,
      componentSchema,
      __bindings,
      __schemaOptions,
      __ignoredMappings,
      __interactions,
      setSelectedInstance,
      updateProps,
    ]
  );

  const handleSchemaChange = useCallback(
    (newSchema: any) => {
      if (selectedInstance) {
        const updatedProps = {
          ...componentPropsWithoutSchema,
          __schema: newSchema,
          __bindings: __bindings,
          __schemaOptions: __schemaOptions || {},
          __ignoredMappings: __ignoredMappings,
          __interactions: __interactions || [],
        };
        const updatedInstance = {
          ...selectedInstance,
          props: updatedProps,
        };
        setSelectedInstance(updatedInstance);
        updateProps(updatedProps);
      }
    },
    [
      selectedInstance,
      componentPropsWithoutSchema,
      __bindings,
      __schemaOptions,
      __ignoredMappings,
      __interactions,
      setSelectedInstance,
      updateProps,
    ]
  );

  const handleJsonChange = useCallback(
    (newProps: any) => {
      if (selectedInstance) {
        const updatedInstance = {
          ...selectedInstance,
          props: newProps,
        };
        setSelectedInstance(updatedInstance);
        updateProps(newProps);

        if (
          newProps.__schema &&
          !initializedSchemas.current.has(selectedInstance.id)
        ) {
          initializedSchemas.current.add(selectedInstance.id);
        }
      }
    },
    [selectedInstance, setSelectedInstance, updateProps]
  );

  const handleSchemaSave = useCallback(
    (newSchema: any) => {
      try {
        if (!newSchema || typeof newSchema !== "object") {
          throw new Error("Invalid schema format");
        }

        if (!newSchema.type) newSchema.type = "object";
        if (!newSchema.properties) newSchema.properties = {};
        if (!newSchema.required) newSchema.required = [];

        handleSchemaChange(newSchema);
        setShowSchemaEditor(false);
        setSchemaActionMessage({
          type: "success",
          text: "Schema saved successfully.",
        });
      } catch (error) {
        console.error("Error saving schema:", error);
        setSchemaActionMessage({
          type: "error",
          text: "Failed to save schema.",
        });
      }
    },
    [handleSchemaChange]
  );

  const handleGenerateSchema = useCallback(() => {
    setIsGeneratingSchema(true);
    setSchemaActionMessage(null);
    try {
      const cleanProps = getCleanProps(componentPropsWithoutSchema);
      const generatedSchema = generateSchemaFromCurrentProps(cleanProps);
      handleSchemaChange(generatedSchema);
      setSchemaActionMessage({
        type: "success",
        text: `Schema generated (${Object.keys(generatedSchema?.properties || {}).length} properties).`,
      });
    } catch (error) {
      console.error("Error generating schema:", error);
      setSchemaActionMessage({
        type: "error",
        text: "Failed to generate schema.",
      });
    } finally {
      setIsGeneratingSchema(false);
    }
  }, [componentPropsWithoutSchema, handleSchemaChange]);

  const handleReleaseBindings = useCallback(() => {
    if (
      !confirm(
        "Are you sure you want to release all data bindings for this component? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const cleanProps = getCleanProps(currentProps);
      const propsWithClearedBindings = {
        ...cleanProps,
        __bindings: {},
        __ignoredMappings: [],
        __interactions: interactionRules,
        __schema: componentSchema,
      };
      if (selectedInstance) {
        setSelectedInstance({
          ...selectedInstance,
          props: propsWithClearedBindings,
        });
      }
      updateProps(propsWithClearedBindings);
    } catch (error) {
      console.error("Error releasing bindings:", error);
    }
  }, [
    currentProps,
    interactionRules,
    componentSchema,
    selectedInstance,
    setSelectedInstance,
    updateProps,
  ]);

  const handleApplyMappings = useCallback(
    (
      mappings: Record<string, string>,
      dataSourceId: string,
      _data?: any,
      transformers?: Record<string, string>,
      bindingsFromDialog?: Record<string, any>,
      ignoredFields?: string[]
    ) => {
      const newBindings: Record<string, any> = {};

      if (bindingsFromDialog) {
        Object.assign(newBindings, bindingsFromDialog);
      } else {
        Object.entries(mappings).forEach(([prop, path]) => {
          if (path) {
            newBindings[prop] = {
              sourceId: dataSourceId,
              path,
              transformer: transformers?.[prop] || undefined,
              selector: { type: "index", value: 0 },
              targetType: componentSchema?.properties?.[prop]?.type,
            };
          }
        });
      }

      const updatedProps = {
        ...currentProps,
        __bindings: {
          ...(__bindings || {}),
          ...newBindings,
        },
        __ignoredMappings: ignoredFields || [],
        __interactions: interactionRules,
        __schema: componentSchema,
      };

      if (ignoredFields && ignoredFields.length > 0) {
        ignoredFields.forEach((prop) => {
          if (updatedProps.__bindings && updatedProps.__bindings[prop]) {
            delete updatedProps.__bindings[prop];
          }
        });
      }

      if (selectedInstance) {
        setSelectedInstance({
          ...selectedInstance,
          props: updatedProps,
        });
      }
      updateProps(updatedProps);
    },
    [
      __bindings,
      componentSchema,
      currentProps,
      interactionRules,
      selectedInstance,
      setSelectedInstance,
      updateProps,
    ]
  );

  const handleBindRecord = useCallback(
    (record: any, mappings: Record<string, string>, _dataSourceId: string) => {
      const newProps: Record<string, any> = {
        ...currentProps,
        __interactions: interactionRules,
        __schema: componentSchema,
      };

      Object.entries(mappings).forEach(([prop, path]) => {
        if (path) {
          const value = get(record, path);
          if (value !== undefined) {
            newProps[prop] = value;
          }
        }
      });

      if (selectedInstance) {
        setSelectedInstance({
          ...selectedInstance,
          props: newProps,
        });
      }
      updateProps(newProps);
    },
    [
      componentSchema,
      currentProps,
      interactionRules,
      selectedInstance,
      setSelectedInstance,
      updateProps,
    ]
  );

  const handleSaveInteractions = useCallback(
    (rules: InteractionRule[]) => {
      const updatedProps = {
        ...currentProps,
        __bindings: __bindings || {},
        __ignoredMappings: __ignoredMappings || [],
        __interactions: rules,
        __schema: componentSchema,
      };
      if (selectedInstance) {
        setSelectedInstance({
          ...selectedInstance,
          props: updatedProps,
        });
      }
      updateProps(updatedProps);
    },
    [
      __bindings,
      __ignoredMappings,
      componentSchema,
      currentProps,
      selectedInstance,
      setSelectedInstance,
      updateProps,
    ]
  );

  if (!selectedInstance && !selectedComponent) {
    return (
      <div className="h-full flex items-center justify-center bg-zinc-200">
        <div className="text-center text-gray-500">
          <div className="mb-3 text-2xl">👈</div>
          <p className="text-base">
            Select a component from the Components tab or click a placed
            component to edit its page-ready settings
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full min-h-0 flex flex-col bg-zinc-200 overflow-y-auto">
      <div className="border-b border-gray-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            {componentType}
            <br />
            {selectedInstance && (
              <span className="text-sm text-gray-500 ml-2 font-normal">
                (ID: {selectedInstance.id})
              </span>
            )}
          </h3>
        </div>
      </div>

      <div className="flex border-b border-gray-300 bg-white">
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeSubTab === "form"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveSubTab("form")}
        >
          Form
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeSubTab === "event"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveSubTab("event")}
        >
          Event
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeSubTab === "json"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveSubTab("json")}
        >
          JSON
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        {activeSubTab === "form" && (
          <DataTab
            key={selectedInstance?.id || selectedComponent}
            selectedInstance={selectedInstance}
            componentType={componentType as any}
            componentProps={componentPropsWithSchemaOptions}
            currentProps={componentPropsWithSchemaOptions}
            onPropertyChange={handlePropertyChange}
            onFileUpload={onFileUpload}
            setSelectedInstance={setSelectedInstance}
            setSelectedComponent={setSelectedComponent}
            componentSchema={componentSchema as any}
            onSchemaChange={handleSchemaChange}
            bindings={__bindings}
            ignoredFields={__ignoredMappings}
            interactions={__interactions || []}
          />
        )}

        {activeSubTab === "event" && (
          <div className="p-4 space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setShowDataExplorer(true)}
                  className={`flex-1 min-w-0 px-3 py-2 text-white rounded text-sm transition-colors flex items-center justify-center gap-2 text-center ${
                    __bindings && Object.keys(__bindings).length > 0
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                  title="Data Binding"
                >
                  <LinkIcon className="w-4 h-4" />
                  {__bindings && Object.keys(__bindings).length > 0 ? (
                    <span>Data Binding ({Object.keys(__bindings).length})</span>
                  ) : (
                    <span>Data Binding</span>
                  )}
                </button>

                <button
                  type="button"
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
                  type="button"
                  onClick={handleGenerateSchema}
                  disabled={isGeneratingSchema}
                  className="flex-1 min-w-0 px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors text-center disabled:opacity-60 disabled:cursor-not-allowed"
                  title="Generate Schema from Current Props"
                >
                  {isGeneratingSchema ? "Generating..." : "Generate Schema"}
                </button>
              </div>

              {schemaActionMessage && (
                <div
                  className={`mt-2 text-xs rounded px-2 py-1 ${
                    schemaActionMessage.type === "success"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {schemaActionMessage.text}
                </div>
              )}
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-medium text-gray-800">
                    Events attached
                  </div>
                  <div className="text-xs text-gray-600">
                    Event rules are saved with the component and run at page
                    runtime.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowInteractionEditor(true)}
                  className="px-3 py-2 rounded bg-emerald-600 text-white text-sm hover:bg-emerald-700"
                  title="Open the event editor"
                >
                  Edit Events ({interactionRules.length})
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {interactionRules.length === 0 ? (
                  <span className="text-xs text-gray-500">
                    No events defined yet. Use the editor to add click, search,
                    submit, or request actions.
                  </span>
                ) : (
                  interactionRules.map((rule) => (
                    <span
                      key={rule.id || `${rule.event}-${rule.action}`}
                      className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs text-emerald-800"
                    >
                      <span className="font-medium">{rule.event}</span>
                      <span className="text-emerald-600">→</span>
                      <span>{rule.action}</span>
                      {rule.targetPath && (
                        <span className="text-emerald-700">
                          ({rule.targetPath})
                        </span>
                      )}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {activeSubTab === "json" && (
          <JsonTab componentProps={currentProps} onChange={handleJsonChange} />
        )}
      </div>

      {showSchemaEditor && (
        <Suspense fallback={<DialogLoadingFallback />}>
          <SchemaEditorDialogLazy
            isOpen={showSchemaEditor}
            onClose={() => setShowSchemaEditor(false)}
            onSave={handleSchemaSave}
            defaultProps={componentPropsWithoutSchema}
            currentSchema={componentSchema}
            lists={source.lists || []}
            dataSources={source.dataSources || []}
          />
        </Suspense>
      )}

      {showDataExplorer && (
        <Suspense fallback={<DialogLoadingFallback />}>
          <DataExplorerDialogLazy
            isOpen={showDataExplorer}
            onClose={() => setShowDataExplorer(false)}
            dataSources={source.dataSources || []}
            onApplyMappings={handleApplyMappings}
            onBindRecord={handleBindRecord}
            onReleaseBindings={handleReleaseBindings}
            mappableProps={ArrayBindingUtils.extractMappableArrayFields(
              componentSchema
            ).filter(
              (k) =>
                k !== "__schema" &&
                k !== "__bindings" &&
                k !== "__ignoredMappings" &&
                k !== "__interactions"
            )}
            currentMappings={
              __bindings
                ? Object.entries(__bindings).reduce(
                    (acc: any, [key, binding]: any) => {
                      acc[key] = binding.path;
                      return acc;
                    },
                    {}
                  )
                : {}
            }
            currentBindings={__bindings}
            schema={componentSchema}
            currentIgnoredFields={__ignoredMappings}
          />
        </Suspense>
      )}

      {showInteractionEditor && (
        <Suspense fallback={<DialogLoadingFallback />}>
          <InteractionEditorDialogLazy
            isOpen={showInteractionEditor}
            onClose={() => setShowInteractionEditor(false)}
            onSave={handleSaveInteractions}
            currentRules={interactionRules}
          />
        </Suspense>
      )}
    </div>
  );
};

export default PropertiesTab;
