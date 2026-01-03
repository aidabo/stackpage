import { useMemo, useEffect, useRef } from "react";
import { useStackPage } from "./StackPageContext";
import { get } from "../utils/get";
import { TransformerRegistry } from "../utils/TransformerRegistry";
import { DataFetchUtils } from "../utils/dataFetchUtils";

export const useDataBinding = (props: any) => {
  const { source, setSource } = useStackPage();
  const fetchedSourcesRef = useRef<Set<string>>(new Set());

  // Fetch missing data ONCE when component mounts or bindings change
  useEffect(() => {
    const fetchMissingData = async () => {
      if (!props?.__bindings) return;

      const updates: Array<{ sourceId: string; data: any }> = [];

      // Check each binding for missing data
      for (const [propKey, binding] of Object.entries(props.__bindings)) {
        if (typeof binding !== "object" || !binding) {
          console.warn(
            `[useDataBinding] Invalid binding for property ${propKey}:`,
            binding
          );
          continue;
        }

        const { sourceId } = binding as any;
        if (!sourceId) {
          console.warn(
            `[useDataBinding] No sourceId in binding for property ${propKey}`
          );
          continue;
        }

        // Skip if we already processed this source
        if (fetchedSourcesRef.current.has(sourceId)) continue;

        const dataSource = source.dataSources.find((ds) => ds.id === sourceId);
        if (!dataSource) {
          console.warn(
            `[useDataBinding] Data source ${sourceId} not found for property ${propKey}`
          );
          continue;
        }

        // Skip static data sources and sources that already have data
        if (
          dataSource.type === "static" ||
          (dataSource as any).data !== undefined
        ) {
          fetchedSourcesRef.current.add(sourceId);
          continue;
        }

        // Fetch missing data
        try {
          console.log(
            `[useDataBinding] Fetching missing data for ${dataSource.type} source: ${dataSource.name}`
          );
          const data = await DataFetchUtils.fetchDataSourceData(
            dataSource,
            dataSource.parameters || {}
          );

          updates.push({
            sourceId,
            data,
          });
          fetchedSourcesRef.current.add(sourceId);
        } catch (error) {
          console.error(
            `[useDataBinding] Failed to fetch data for ${dataSource.name}:`,
            error
          );
        }
      }

      // Update context if we fetched any data
      if (updates.length > 0) {
        setSource((prev) => {
          const updatedDataSources = prev.dataSources.map((ds) => {
            const update = updates.find((u) => u.sourceId === ds.id);
            return update ? { ...ds, data: update.data } : ds;
          });

          // Return new object to trigger re-render
          return {
            ...prev,
            dataSources: updatedDataSources,
          };
        });
      }
    };

    fetchMissingData();
  }, [props?.__bindings]); // Only depend on bindings

  const boundProps = useMemo(() => {
    console.log("[useDataBinding] Resolving props with bindings:", {
      hasBindings: !!(
        props?.__bindings && Object.keys(props.__bindings).length > 0
      ),
      bindings: props?.__bindings,
    });

    // 1. If no bindings, return original props (filtering out internal properties)
    if (!props?.__bindings || Object.keys(props.__bindings).length === 0) {
      // Return original props including internal properties
      return props || {};
    }

    // 2. Clone props to avoid mutation
    const newProps = { ...props };

    // 3. Process each binding
    Object.entries(props.__bindings).forEach(
      ([propKey, binding]: [string, any]) => {
        // Validate binding structure
        if (!binding || typeof binding !== "object") {
          console.warn(
            `[useDataBinding] Invalid binding structure for ${propKey}:`,
            binding
          );
          return;
        }

        const { sourceId, path, transformer, selector, targetType } = binding;

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

        if (!sourceData) {
          console.warn(
            `[useDataBinding] No data available from source ${sourceId} for prop ${propKey}`
          );
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

        // Inject value with null/undefined handling
        if (value !== undefined) {
          newProps[propKey] = value;
        } else if (value === null || value === undefined) {
          // Handle null/undefined based on target type
          if (targetType === "string") {
            newProps[propKey] = "";
          } else if (targetType === "number") {
            newProps[propKey] = 0;
          } else if (targetType === "boolean") {
            newProps[propKey] = false;
          } else if (targetType === "array") {
            newProps[propKey] = [];
          } else if (targetType === "object") {
            newProps[propKey] = {};
          }
        }
      }
    );

    // Do NOT remove internal properties before returning, as requested by user
    // const { __bindings, __schema, __ignoredMappings, ...cleanProps } = newProps;
    return newProps;
  }, [props, source.dataSources]);

  return boundProps;
};
