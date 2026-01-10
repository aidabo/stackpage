// utils/ArrayBindingUtils.ts - Complete updated file
import { get } from "./get";

export class ArrayBindingUtils {
  /**
   * Extract array element fields from schema for mapping
   */
  static extractMappableArrayFields(
    schema: any,
    basePath: string = ""
  ): string[] {
    if (!schema?.properties) return [];

    const fields: string[] = [];

    Object.entries(schema.properties).forEach(
      ([key, propSchema]: [string, any]) => {
        const currentPath = basePath ? `${basePath}.${key}` : key;

        if (
          propSchema.type === "array" &&
          propSchema.items?.type === "object"
        ) {
          // Add the array itself
          fields.push(currentPath);

          // Add array element fields (one level deep)
          if (propSchema.items.properties) {
            Object.keys(propSchema.items.properties).forEach((itemKey) => {
              const itemSchema = propSchema.items.properties[itemKey];
              if (itemSchema.type === "object" && itemSchema.properties) {
                // For nested objects in array elements, add the path but don't drill deeper
                fields.push(`${currentPath}[].${itemKey}`);
              } else {
                // Simple type
                fields.push(`${currentPath}[].${itemKey}`);
              }
            });
          }
        } else if (propSchema.type === "object" && propSchema.properties) {
          // For nested objects, recursively extract fields
          fields.push(currentPath);
          fields.push(
            ...this.extractMappableArrayFields(propSchema, currentPath)
          );
        } else {
          // For primitive types
          fields.push(currentPath);
        }
      }
    );

    return fields;
  }

  /**
   * Check if a path is an array element binding
   */
  static isArrayElementPath(path: string): boolean {
    return path.includes("[]");
  }

  /**
   * Parse array element path into array path and element field
   */
  static parseArrayElementPath(path: string): {
    arrayPath: string;
    elementField: string;
  } {
    // Handle users[].name -> users, name
    const match = path.match(/(.*)\[\]\.?(.*)/);
    if (match) {
      let [, arrayPath, elementField] = match;
      // Clean up trailing dot if present
      arrayPath = arrayPath.endsWith(".") ? arrayPath.slice(0, -1) : arrayPath;
      return { arrayPath, elementField };
    }
    return { arrayPath: path, elementField: "" };
  }

  /**
   * Get array data from source data for array element binding
   */
  static getArrayElementData(
    sourceData: any,
    path: string,
    selector?: any
  ): any[] {
    if (!path.includes("[]")) {
      // Regular path, not an array element
      const value = get(sourceData, path);
      return Array.isArray(value) ? value : [];
    }

    const { arrayPath, elementField } = this.parseArrayElementPath(path);

    if (!arrayPath) return [];

    const arrayData = get(sourceData, arrayPath);
    if (!Array.isArray(arrayData)) return [];

    // Apply selector if provided
    const selectedArray = this.applyArraySelector(arrayData, selector);

    if (!elementField) {
      // Return the entire array objects
      return selectedArray;
    }

    // Extract specific field from each element
    return selectedArray.map((item) => get(item, elementField));
  }

  private static applyArraySelector(arrayData: any[], selector?: any): any[] {
    if (!selector) return arrayData;

    switch (selector.type) {
      case "id":
        if (selector.value !== undefined) {
          const item = arrayData.find(
            (item: any) => String(item.id) === String(selector.value)
          );
          return item ? [item] : [];
        }
        break;

      case "ids":
        if (selector.value && Array.isArray(selector.value)) {
          return arrayData.filter((item: any) =>
            selector.value.includes(String(item.id))
          );
        }
        break;

      case "index":
        if (selector.value !== undefined) {
          const item = arrayData[Number(selector.value)];
          return item ? [item] : [];
        }
        break;

      case "all":
        return arrayData;

      default:
        return arrayData;
    }

    return arrayData;
  }

  /**
   * Create a selector for array binding
   */
  static createArraySelector(
    selectedItems: number[],
    previewData: any[],
    bindToAll: boolean = false
  ): any {
    if (bindToAll) {
      return { type: "all" as const };
    }

    if (selectedItems.length === 0) {
      return { type: "index" as const, value: 0 };
    }

    if (selectedItems.length === 1) {
      // Try to use ID if available
      const selectedItem = previewData[selectedItems[0]];
      if (selectedItem && selectedItem.id !== undefined) {
        return { type: "id" as const, value: String(selectedItem.id) };
      }
      return { type: "index" as const, value: selectedItems[0] };
    }

    // Multiple items selected
    const selectedRecords = selectedItems.map((idx) => previewData[idx]);
    const allHaveIds = selectedRecords.every(
      (item) => item && item.id !== undefined
    );

    if (allHaveIds) {
      return {
        type: "ids" as const,
        value: selectedRecords.map((item) => String(item.id)),
      };
    }

    return { type: "index" as const, value: selectedItems[0] };
  }

  /**
   * Check if a property schema type is an array
   */
  static isArrayProperty(schema: any, prop: string): boolean {
    return schema?.properties?.[prop]?.type === "array";
  }

  /**
   * Get array element schema for a property
   */
  static getArrayElementSchema(schema: any, prop: string): any {
    return schema?.properties?.[prop]?.items;
  }
}

export default ArrayBindingUtils;
