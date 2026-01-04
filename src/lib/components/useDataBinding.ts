import { useMemo } from "react";
import { useStackPage } from "./StackPageContext";
import { get } from "../utils/get";
import { TransformerRegistry } from "../utils/TransformerRegistry";

export const useDataBinding = (props: any) => {
  const { source } = useStackPage();

  const boundProps = useMemo(() => {
    console.log("[useDataBinding] Resolving props with bindings:", {
      hasBindings: !!(
        props?.__bindings && Object.keys(props.__bindings).length > 0
      ),
      bindings: props?.__bindings,
      sourceDataSourcesCount: source.dataSources.length,
    });

    // 1. If no bindings, return original props
    if (!props?.__bindings || Object.keys(props.__bindings).length === 0) {
      return props || {};
    }

    // 2. Clone props to avoid mutation
    const newProps = { ...props };

    // 3. Process each binding
    Object.entries(props.__bindings).forEach(
      ([propKey, binding]: [string, any]) => {
        if (!binding || typeof binding !== "object") {
          console.warn(
            `[useDataBinding] Invalid binding structure for ${propKey}:`,
            binding
          );
          return;
        }

        const { sourceId, path, transformer, selector /*targetType*/ } =
          binding;

        if (!sourceId || !path) {
          console.warn(
            `[useDataBinding] Missing sourceId or path in binding for ${propKey}:`,
            binding
          );
          return;
        }

        // Find data source
        const dataSource = source.dataSources.find((ds) => ds.id === sourceId);
        if (!dataSource) {
          console.warn(
            `[useDataBinding] Data source ${sourceId} not found for prop ${propKey}`
          );
          return;
        }

        const sourceData = (dataSource as any).data;

        if (sourceData === undefined) {
          console.warn(
            `[useDataBinding] No data available from source ${sourceId} for prop ${propKey}`
          );
          // Don't set the property if data is not available
          return;
        }

        // Apply selector logic
        let value: any;

        if (selector?.type === "all" && Array.isArray(sourceData) && path) {
          // Map over array for array-type bindings
          value = sourceData.map((item: any) => {
            let val = get(item, path);
            if (transformer) {
              val = TransformerRegistry.apply(transformer, val);
            }
            return val;
          });
          console.log(
            `[useDataBinding] Bound prop ${propKey} to array (${value.length} items)`
          );
        } else {
          // Get single value
          let selectedData = sourceData;

          // Apply selector if present
          if (selector && Array.isArray(selectedData)) {
            if (selector.type === "id" && selector.value !== undefined) {
              selectedData = selectedData.find(
                (item: any) => String(item.id) === String(selector.value)
              );
            } else if (
              selector.type === "index" &&
              selector.value !== undefined
            ) {
              selectedData = selectedData[Number(selector.value)];
            }
          }

          value = get(selectedData, path);

          // Apply transformer
          if (transformer && value !== undefined) {
            value = TransformerRegistry.apply(transformer, value);
          }
        }

        // Only set the value if we got something
        if (value !== undefined) {
          newProps[propKey] = value;
          console.log(`[useDataBinding] Set ${propKey} =`, value);
        } else {
          console.log(
            `[useDataBinding] No value found for ${propKey}, keeping original`
          );
        }
      }
    );

    return newProps;
  }, [props, source.dataSources]);

  return boundProps;
};
