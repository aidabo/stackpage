// utils/ArrayBindingUtils.ts - Remove applySimpleTransformer
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
   * SIMPLIFIED: Always returns all records, ignores selector
   */
  static getArrayElementData(sourceData: any, path: string): any[] {
    if (!path.includes("[]")) {
      // Regular path, not an array element
      const value = get(sourceData, path);
      return Array.isArray(value) ? value : [];
    }

    const { arrayPath, elementField } = this.parseArrayElementPath(path);

    if (!arrayPath) return [];

    const arrayData = get(sourceData, arrayPath);
    if (!Array.isArray(arrayData)) return [];

    // ALWAYS RETURN ALL RECORDS - ignore selector
    if (!elementField) {
      // Return the entire array objects
      return arrayData;
    }

    // Extract specific field from each element
    return arrayData.map((item) => get(item, elementField));
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
