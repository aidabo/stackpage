import { useMemo } from "react";
import { useStackPage } from "./StackPageContext";
import { get, set } from "../utils/get";
import { ArrayBindingUtils } from "../utils/ArrayBindingUtils";
import { transformers as transformerRegistry } from "../utils/transformers";

export const useDataBinding = (props: any) => {
  const { source } = useStackPage();

  const boundProps = useMemo(() => {
    console.log("[useDataBinding] Resolving props with bindings:", {
      hasBindings: !!(
        props?.__bindings && Object.keys(props.__bindings).length > 0
      ),
      bindings: props?.__bindings,
      sourceDataSourcesCount: source.dataSources.length,
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

    console.log("[useDataBinding] Grouped bindings:", {
      arrayBindings: Object.keys(arrayBindings),
      elementBindings: Object.keys(elementBindings),
      regularBindings: Object.keys(regularBindings),
      ignoredFields: props.__ignoredMappings,
    });

    // 4. Process regular bindings first
    Object.entries(regularBindings).forEach(
      ([propKey, binding]: [string, any]) => {
        resolveRegularBinding(propKey, binding, source.dataSources, newProps);
      }
    );

    // 5. Process array bindings with their element bindings
    Object.entries(arrayBindings).forEach(
      ([arrayProp, arrayBinding]: [string, any]) => {
        resolveArrayBinding(
          arrayProp,
          arrayBinding,
          elementBindings,
          props.__ignoredMappings || [],
          source.dataSources,
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
  binding: any,
  dataSources: any[],
  resultProps: any
): void {
  const { sourceId, path, transformer } = binding;

  if (!sourceId || !path) {
    console.warn(
      `[useDataBinding] Missing sourceId or path for ${propKey}:`,
      binding
    );
    return;
  }

  // Find data source
  const dataSource = dataSources.find((ds) => ds.id === sourceId);
  if (!dataSource) {
    console.warn(
      `[useDataBinding] Data source ${sourceId} not found for ${propKey}`
    );
    return;
  }

  const sourceData = (dataSource as any).data;
  if (sourceData === undefined) {
    console.warn(
      `[useDataBinding] No data available from source ${sourceId} for ${propKey}`
    );
    return;
  }

  // Get value from source data
  let value = get(sourceData, path);

  // Apply transformer if specified
  if (transformer && value !== undefined && transformerRegistry[transformer]) {
    try {
      if (Array.isArray(value)) {
        value = value.map((item: any) =>
          transformerRegistry[transformer](item)
        );
      } else {
        value = transformerRegistry[transformer](value);
      }
    } catch (error) {
      console.error(
        `[useDataBinding] Transformer error for ${propKey}:`,
        error
      );
    }
  }

  // Set the value
  if (value !== undefined) {
    resultProps[propKey] = value;
    console.log(`[useDataBinding] Set ${propKey} =`, value);
  }
}

/**
 * Helper function to resolve an array binding with its element bindings
 */
function resolveArrayBinding(
  arrayProp: string,
  arrayBinding: any,
  elementBindings: Record<string, any>,
  ignoredFields: string[],
  dataSources: any[],
  resultProps: any
): void {
  const { sourceId, path } = arrayBinding;

  if (!sourceId || !path) {
    console.warn(
      `[useDataBinding] Missing sourceId or path for array ${arrayProp}:`,
      arrayBinding
    );
    return;
  }

  // Find data source
  const dataSource = dataSources.find((ds) => ds.id === sourceId);
  if (!dataSource) {
    console.warn(
      `[useDataBinding] Data source ${sourceId} not found for array ${arrayProp}`
    );
    return;
  }

  const sourceData = (dataSource as any).data;
  if (sourceData === undefined) {
    console.warn(
      `[useDataBinding] No data available from source ${sourceId} for array ${arrayProp}`
    );
    return;
  }

  // Get all records from source array (ignore selector)
  const sourceArray = get(sourceData, path);
  if (!Array.isArray(sourceArray)) {
    console.warn(
      `[useDataBinding] Expected array for ${arrayProp} but got:`,
      sourceArray
    );
    resultProps[arrayProp] = [];
    return;
  }

  // Filter element bindings for this specific array
  const arrayElementBindings = Object.entries(elementBindings)
    .filter(([key]) => key.startsWith(`${arrayProp}[]`))
    .reduce((acc, [key, binding]) => {
      acc[key] = binding;
      return acc;
    }, {} as Record<string, any>);

  console.log(`[useDataBinding] Processing array ${arrayProp}:`, {
    sourceRecords: sourceArray.length,
    elementBindingsCount: Object.keys(arrayElementBindings).length,
    ignoredFields: ignoredFields.filter((f) => f.startsWith(`${arrayProp}[]`)),
  });

  // If no element bindings, return the source array as is
  if (Object.keys(arrayElementBindings).length === 0) {
    resultProps[arrayProp] = sourceArray;
    return;
  }

  // Process each record in the source array
  const resolvedArray = sourceArray.map((sourceItem, index) => {
    const resultItem: any = {};

    // Apply each element binding
    Object.entries(arrayElementBindings).forEach(
      ([bindingKey, binding]: [string, any]) => {
        // Extract field name from binding key like "items[].title" -> "title"
        const fieldMatch = bindingKey.match(/\[\]\.(.+)/);
        if (!fieldMatch || !fieldMatch[1]) {
          return;
        }

        const fieldName = fieldMatch[1];

        // Skip if this field is in ignored mappings
        const fullIgnoredPath = `${arrayProp}[].${fieldName}`;
        if (ignoredFields.includes(fullIgnoredPath)) {
          console.log(
            `[useDataBinding] Skipping ignored field: ${fullIgnoredPath}`
          );
          return;
        }

        const { sourceId: elemSourceId, path: elemPath, transformer } = binding;

        // Verify the element binding uses the same data source
        if (elemSourceId !== sourceId) {
          console.warn(
            `[useDataBinding] Element binding ${bindingKey} uses different data source`
          );
          return;
        }

        if (elemPath && elemPath.includes("[]")) {
          // This is an array element path like "posts[].title"
          const { arrayPath: elemArrayPath, elementField } =
            ArrayBindingUtils.parseArrayElementPath(elemPath);

          // Get the source array for this element binding
          const elemSourceArray = get(sourceData, elemArrayPath);
          if (Array.isArray(elemSourceArray) && elemSourceArray[index]) {
            let value = get(elemSourceArray[index], elementField);

            // Apply transformer if specified
            if (transformer && transformerRegistry[transformer]) {
              try {
                value = transformerRegistry[transformer](value);
              } catch (error) {
                console.error(
                  `[useDataBinding] Transformer error for ${fieldName}:`,
                  error
                );
              }
            }

            set(resultItem, fieldName, value);
          }
        } else if (elemPath) {
          // Regular path - get from source item
          let value = get(sourceItem, elemPath);

          // Apply transformer if specified
          if (transformer && transformerRegistry[transformer]) {
            try {
              value = transformerRegistry[transformer](value);
            } catch (error) {
              console.error(
                `[useDataBinding] Transformer error for ${fieldName}:`,
                error
              );
            }
          }

          // Use set to handle nested properties like "user.name"
          set(resultItem, fieldName, value);
        }
      }
    );

    return resultItem;
  });

  resultProps[arrayProp] = resolvedArray;
  console.log(
    `[useDataBinding] Resolved array ${arrayProp} with ${resolvedArray.length} items:`,
    resolvedArray
  );
}
