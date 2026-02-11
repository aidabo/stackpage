import { useMemo } from "react";
import { useStackPage } from "./StackPageContext";
import {
  BindingInfo,
  resolveBoundValue,
  resolveArrayWithElementBindings,
} from "../utils/bindingEngine";
import { debugLog, debugWarn } from "../utils/debug";

export const useDataBinding = (props: any) => {
  const { source } = useStackPage();

  const boundProps = useMemo(() => {
    debugLog("[useDataBinding] Resolving props with bindings:", {
      hasBindings: !!(
        props?.__bindings && Object.keys(props.__bindings).length > 0
      ),
      bindings: props?.__bindings,
      sourceDataSourcesCount: source.dataSources?.length ?? 0,
      ignoredFields: props?.__ignoredMappings,
    });

    // 1. If no bindings, return original props
    if (!props?.__bindings || Object.keys(props.__bindings).length === 0) {
      return props || {};
    }

    // 2. Clone props to avoid mutation
    const newProps = { ...props };

    // 3. Group bindings by type
    const { arrayBindings, elementBindings, regularBindings } = groupBindings(
      props.__bindings
    );

    debugLog("[useDataBinding] Grouped bindings:", {
      arrayBindings: Object.keys(arrayBindings),
      elementBindings: Object.keys(elementBindings),
      regularBindings: Object.keys(regularBindings),
      ignoredFields: props.__ignoredMappings,
    });

    // 4. Process regular bindings first
    Object.entries(regularBindings).forEach(([propKey, binding]: [string, any]) => {
      resolveRegularBinding(propKey, binding, source.dataSources || [], newProps);
    });

    // 5. Process array bindings with their element bindings
    Object.entries(arrayBindings).forEach(
      ([arrayProp, arrayBinding]: [string, any]) => {
        resolveArrayBinding(
          arrayProp,
          arrayBinding,
          elementBindings,
          props.__ignoredMappings || [],
          source.dataSources || [],
          newProps
        );
      }
    );

    return newProps;
  }, [props, source.dataSources]);

  return boundProps;
};

/**
 * Group bindings into array bindings, element bindings, and regular bindings
 */
function groupBindings(bindings: Record<string, any>): {
  arrayBindings: Record<string, any>;
  elementBindings: Record<string, any>;
  regularBindings: Record<string, any>;
} {
  const arrayBindings: Record<string, any> = {};
  const elementBindings: Record<string, any> = {};
  const regularBindings: Record<string, any> = {};

  Object.entries(bindings).forEach(([key, binding]: [string, any]) => {
    // Check if it's an array binding (has targetType: "array")
    if (binding.targetType === "array") {
      arrayBindings[key] = binding;
    }
    // Check if it's an array element binding (contains "[]" in key)
    else if (key.includes("[]")) {
      elementBindings[key] = binding;
    } else {
      regularBindings[key] = binding;
    }
  });

  return { arrayBindings, elementBindings, regularBindings };
}

/**
 * Helper function to resolve a regular (non-array) binding
 */
function resolveRegularBinding(
  propKey: string,
  binding: BindingInfo,
  dataSources: any[],
  resultProps: any
): void {
  const { sourceId, path } = binding;

  if (!sourceId || !path) {
    debugWarn(
      `[useDataBinding] Missing sourceId or path for ${propKey}:`,
      binding
    );
    return;
  }

  // Find data source
  const dataSource = dataSources.find((ds) => ds.id === sourceId);
  if (!dataSource) {
    debugWarn(
      `[useDataBinding] Data source ${sourceId} not found for ${propKey}`
    );
    return;
  }

  const sourceData = (dataSource as any).data;
  if (sourceData === undefined) {
    debugWarn(
      `[useDataBinding] No data available from source ${sourceId} for ${propKey}`
    );
    return;
  }

  let value: any;
  try {
    value = resolveBoundValue(sourceData, binding);
  } catch (error) {
    console.error(`[useDataBinding] Resolve binding error for ${propKey}:`, error);
    return;
  }

  // Set the value
  if (value !== undefined) {
    resultProps[propKey] = value;
    debugLog(`[useDataBinding] Set ${propKey} =`, value);
  }
}

/**
 * Helper function to resolve an array binding with its element bindings
 */
function resolveArrayBinding(
  arrayProp: string,
  arrayBinding: BindingInfo,
  elementBindings: Record<string, BindingInfo>,
  ignoredFields: string[],
  dataSources: any[],
  resultProps: any
): void {
  const { sourceId, path } = arrayBinding;

  if (!sourceId || !path) {
    debugWarn(
      `[useDataBinding] Missing sourceId or path for array ${arrayProp}:`,
      arrayBinding
    );
    return;
  }

  // Find data source
  const dataSource = dataSources.find((ds) => ds.id === sourceId);
  if (!dataSource) {
    debugWarn(
      `[useDataBinding] Data source ${sourceId} not found for array ${arrayProp}`
    );
    return;
  }

  const sourceData = (dataSource as any).data;
  if (sourceData === undefined) {
    debugWarn(
      `[useDataBinding] No data available from source ${sourceId} for array ${arrayProp}`
    );
    return;
  }

  let resolvedArray: any[] = [];
  try {
    resolvedArray = resolveArrayWithElementBindings({
      arrayProp,
      arrayBinding,
      elementBindings,
      ignoredFields,
      sourceData,
    });
  } catch (error) {
    console.error(`[useDataBinding] Resolve array binding error for ${arrayProp}:`, error);
    resolvedArray = [];
  }

  resultProps[arrayProp] = resolvedArray;
  debugLog(
    `[useDataBinding] Resolved array ${arrayProp} with ${resolvedArray.length} items:`,
    resolvedArray
  );
}
