// PropertiesTab.tsx - 移除SchemaTab引用
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useStackPage } from "./StackPageContext";
import { useWidgetProps } from "./StackPageWidgetProps";
import { DataTab } from "./DataTab";

import { JsonTab } from "./JsonTab";
import { generateSchemaFromCurrentProps } from "./PropertyTypeUtils";
import {
  ApiCallFn,
  CustomActionFn,
  FileUploadFn,
  GetSelectOptionsFn,
} from "..";

interface PropertiesTabProps {
  onFileUpload?: FileUploadFn;
  onApiCall?: ApiCallFn;
  onCustomAction?: CustomActionFn;
  onGetSelectOptions?: GetSelectOptionsFn;
}

type PropertiesSubTab = "data" | "json";

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
  const [activeSubTab, setActiveSubTab] = useState<PropertiesSubTab>("data");
  const initializedSchemas = useRef(new Set<string>()); // Track which instances have been initialized

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
    setActiveSubTab("data"); // Reset to Data tab on selection change
  }, [selectedInstance, selectedComponent]);

  const componentType = selectedInstance?.type || selectedComponent;
  const currentInstanceProps = selectedInstance?.props || {};
  const updatedPropsFromContext = getProps() || {};
  const currentProps = { ...currentInstanceProps, ...updatedPropsFromContext };

  // Extract schema and bindings, filter them out from the props that go to DataTab
  const {
    __schema,
    __bindings,
    __ignoredMappings,
    ...componentPropsWithoutSchema
  } = currentProps;

  // Initialize schema for new components
  // In the useEffect for initializing schema:
  useEffect(() => {
    if (
      selectedInstance &&
      !initializedSchemas.current.has(selectedInstance.id)
    ) {
      // If no schema exists, generate one and save it
      if (!__schema) {
        const generatedSchema = generateSchemaFromCurrentProps(
          componentPropsWithoutSchema
        );

        // Preserve existing bindings when creating schema
        const updatedProps = {
          ...componentPropsWithoutSchema,
          __schema: generatedSchema,
          __bindings: __bindings || {}, // Preserve bindings
          __ignoredMappings: __ignoredMappings || [], // Preserve ignored mappings
        };

        const updatedInstance = {
          ...selectedInstance,
          props: updatedProps,
        };

        setSelectedInstance(updatedInstance);
        updateProps(updatedProps);
      }

      // Mark this instance as initialized
      initializedSchemas.current.add(selectedInstance.id);
    }
  }, [
    selectedInstance,
    __schema,
    componentPropsWithoutSchema,
    setSelectedInstance,
    updateProps,
  ]);

  // Get the schema - use existing or generate from current props
  const componentSchema = useMemo(() => {
    if (__schema) {
      return __schema;
    }
    // Generate default schema if none exists (fallback)
    return generateSchemaFromCurrentProps(componentPropsWithoutSchema);
  }, [__schema, componentPropsWithoutSchema]);

  // Handle prop changes for Data tab
  const handlePropertyChange = useCallback(
    (data: any) => {
      if (data.formData && selectedInstance) {
        // Merge the new formData with the existing schema and bindings
        const updatedProps = {
          ...data.formData,
          __schema: componentSchema, // Preserve the schema
          __bindings: data.formData.__bindings || __bindings, // Prioritize updated bindings
          __ignoredMappings:
            data.formData.__ignoredMappings || __ignoredMappings,
        };
        const updatedInstance = {
          ...selectedInstance,
          props: updatedProps,
        };
        setSelectedInstance(updatedInstance);
        console.log(
          "[PropertiesTab] Updating props with keys:",
          Object.keys(updatedProps)
        );
        if (updatedProps.__bindings) {
          console.log(
            "[PropertiesTab] Preserving bindings:",
            updatedProps.__bindings
          );
        } else {
          console.warn("[PropertiesTab] Bindings missing in updatedProps!");
        }
        updateProps(updatedProps);
      }
    },
    [selectedInstance, componentSchema, setSelectedInstance, updateProps]
  );

  // Handle schema changes from DataTab
  const handleSchemaChange = useCallback(
    (newSchema: any) => {
      if (selectedInstance) {
        // Update only the schema, preserve other props (including bindings)
        const updatedProps = {
          ...componentPropsWithoutSchema,
          __schema: newSchema,
          __bindings: __bindings,
          __ignoredMappings: __ignoredMappings,
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
      setSelectedInstance,
      updateProps,
    ]
  );

  // Handle JSON changes for JSON tab
  const handleJsonChange = useCallback(
    (newProps: any) => {
      if (selectedInstance) {
        const updatedInstance = {
          ...selectedInstance,
          props: newProps,
        };
        setSelectedInstance(updatedInstance);
        updateProps(newProps);

        // If the JSON includes a schema, mark as initialized
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

  if (!selectedInstance && !selectedComponent) {
    return (
      <div className="h-full flex items-center justify-center bg-zinc-200">
        <div className="text-center text-gray-500">
          <div className="mb-3 text-2xl">👈</div>
          <p className="text-base">
            Select a component from the Components tab or click on a placed
            component to edit its properties
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-zinc-200 max-h-[calc(100vh-48*0.25rem)] overflow-y-auto">
      {/* Header */}
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

      {/* Subtabs Navigation - 移除了Schema标签 */}
      <div className="flex border-b border-gray-300 bg-white">
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeSubTab === "data"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveSubTab("data")}
        >
          Data
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

      {/* Tab Content */}
      <div className="flex-1 overflow-auto">
        {activeSubTab === "data" && (
          <DataTab
            key={selectedInstance?.id || selectedComponent}
            selectedInstance={selectedInstance}
            componentType={componentType as any}
            componentProps={componentPropsWithoutSchema}
            currentProps={componentPropsWithoutSchema}
            onPropertyChange={handlePropertyChange}
            onFileUpload={onFileUpload}
            onApiCall={onApiCall}
            onCustomAction={onCustomAction}
            onGetSelectOptions={onGetSelectOptions}
            setSelectedInstance={setSelectedInstance}
            setSelectedComponent={setSelectedComponent}
            componentSchema={componentSchema as any}
            onSchemaChange={handleSchemaChange} // 新增：传递schema变更处理函数
            bindings={__bindings}
          />
        )}

        {activeSubTab === "json" && (
          <JsonTab componentProps={currentProps} onChange={handleJsonChange} />
        )}
      </div>
    </div>
  );
};

export default PropertiesTab;
