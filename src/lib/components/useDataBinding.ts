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

        const { sourceId, path, transformer, selector } = binding;

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

        let value: any;

        // Handle different selector types
        if (selector) {
          switch (selector.type) {
            case "id":
              // Find single record by ID
              if (Array.isArray(sourceData)) {
                const selectedItem = sourceData.find(
                  (item: any) => String(item.id) === String(selector.value)
                );
                if (selectedItem) {
                  value = get(selectedItem, path);
                }
              } else {
                value = get(sourceData, path);
              }
              break;

            case "ids":
              // Find multiple records by IDs
              if (Array.isArray(sourceData) && Array.isArray(selector.value)) {
                const selectedItems = sourceData.filter((item: any) =>
                  selector.value.includes(String(item.id))
                );
                if (selectedItems.length > 0) {
                  value = selectedItems.map((item: any) => get(item, path));
                }
              }
              break;

            case "index":
              // Find single record by index
              if (Array.isArray(sourceData)) {
                const selectedItem = sourceData[Number(selector.value)];
                if (selectedItem) {
                  value = get(selectedItem, path);
                }
              } else {
                value = get(sourceData, path);
              }
              break;

            case "all":
              // Use all records
              if (Array.isArray(sourceData)) {
                value = sourceData.map((item: any) => get(item, path));
              } else {
                value = get(sourceData, path);
              }
              break;

            default:
              // Fallback to direct path
              value = get(sourceData, path);
              break;
          }
        } else {
          // No selector, use direct path
          value = get(sourceData, path);
        }

        // Apply transformer if specified
        if (transformer && value !== undefined) {
          try {
            if (Array.isArray(value)) {
              value = value.map((item: any) =>
                TransformerRegistry.apply(transformer, item)
              );
            } else {
              value = TransformerRegistry.apply(transformer, value);
            }
            console.log(
              `[useDataBinding] Applied transformer ${transformer} to ${propKey}`
            );
          } catch (error) {
            console.error(
              `[useDataBinding] Transformer error for ${propKey}:`,
              error
            );
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
