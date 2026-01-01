import { useMemo } from "react";
import { useStackPage } from "./StackPageContext";
import { get } from "../utils/get";
import { TransformerRegistry } from "../utils/TransformerRegistry"; // Import the class

export const useDataBinding = (props: any) => {
  const { source } = useStackPage();

  const boundProps = useMemo(() => {
    // 1. If no bindings, return original props
    if (!props?.__bindings || Object.keys(props.__bindings).length === 0) {
      return props;
    }

    // 2. Clone props to avoid mutation
    const newProps = { ...props };

    // 3. Apply bindings
    Object.entries(props.__bindings).forEach(
      ([propKey, binding]: [string, any]) => {
        const { sourceId, path, transformer, selector } = binding;

        // Find data source
        const dataSource = source.dataSources.find((ds) => ds.id === sourceId);
        if (!dataSource) return;

        // Get value from data source
        if ((dataSource as any).data !== undefined) {
          let sourceData = (dataSource as any).data;

          // Resolve based on selector if present
          if (selector) {
            if (Array.isArray(sourceData)) {
              if (selector.type === "id" && selector.value !== undefined) {
                sourceData = sourceData.find(
                  (item: any) => String(item.id) === String(selector.value)
                );
              } else if (
                selector.type === "index" &&
                selector.value !== undefined
              ) {
                sourceData = sourceData[Number(selector.value)];
              } else if (selector.type === "all") {
                // If binding to all, we might be binding an array to a list
                // If path is provided, we map over the array to get that path from each item
                if (path) {
                  const mappedData = sourceData.map((item: any) => {
                    let val = get(item, path);
                    if (transformer) {
                      val = TransformerRegistry.apply(transformer, val);
                    }
                    return val;
                  });
                  newProps[propKey] = mappedData;
                  return; // Done for this binding
                }
              }
            }
          }

          let rawValue = get(sourceData, path);

          // Apply transformer (for single item)
          if (transformer) {
            rawValue = TransformerRegistry.apply(transformer, rawValue);
          }

          // Inject value
          if (rawValue !== undefined) {
            newProps[propKey] = rawValue;
          } else if (
            (rawValue === undefined || rawValue === null) &&
            binding.targetType === "string"
          ) {
            // Null/Undefined transform for strings
            newProps[propKey] = "";
          }
        }
      }
    );

    return newProps;
  }, [props, source.dataSources]); // Re-run when props or dataSources change

  return boundProps;
};
