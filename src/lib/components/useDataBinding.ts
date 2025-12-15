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
        const { sourceId, path, transformer } = binding;

        // Find data source
        const dataSource = source.dataSources.find((ds) => ds.id === sourceId);
        if (!dataSource) return;

        // Get value from data source
        // If data source has 'data' property populated
        if (dataSource.data !== undefined) {
          let rawValue = get(dataSource.data, path);

          // Apply transformer
          if (transformer) {
            // Use TransformerRegistry.apply which now exists
            rawValue = TransformerRegistry.apply(transformer, rawValue);
          }

          // Inject value
          if (rawValue !== undefined) {
            newProps[propKey] = rawValue;
          }
        }
      }
    );

    return newProps;
  }, [props, source.dataSources]); // Re-run when props or dataSources change

  return boundProps;
};
