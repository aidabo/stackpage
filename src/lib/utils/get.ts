/**
 * Utility function to safely get nested property values from objects using dot notation
 * Uses lodash.get for robust path handling
 */

import _get from "lodash/get";

/**
 * Get a value from an object using a path string
 * @param obj - The object to get the value from
 * @param path - The path to the property (e.g., 'user.profile.name' or 'items[0].title')
 * @param defaultValue - Default value to return if the path doesn't exist
 * @returns The value at the specified path or defaultValue
 */
export function get<T = any>(
  obj: any,
  path: string | string[],
  defaultValue?: T
): T | undefined {
  return _get(obj, path, defaultValue);
}

/**
 * Check if a path exists in an object
 * @param obj - The object to check
 * @param path - The path to check
 * @returns True if the path exists
 */
export function has(obj: any, path: string | string[]): boolean {
  return get(obj, path, undefined) !== undefined;
}

/**
 * Set a value at a path in an object (mutates the object)
 * @param obj - The object to modify
 * @param path - The path to set
 * @param value - The value to set
 * @returns The modified object
 */
export function set(obj: any, path: string | string[], value: any): any {
  // Convert string path to array
  const pathArray = Array.isArray(path) ? path : pathToArray(path);

  if (!obj || pathArray.length === 0) return obj;

  let current = obj;
  const lastIndex = pathArray.length - 1;

  // Traverse to the second-to-last key
  for (let i = 0; i < lastIndex; i++) {
    const key = pathArray[i];

    // Create nested objects if they don't exist
    if (!(key in current)) {
      // Check if next key is a number (array index)
      const nextKey = pathArray[i + 1];
      current[key] = isArrayIndex(nextKey) ? [] : {};
    }

    current = current[key];
    if (current == null) {
      // Can't set on null/undefined
      return obj;
    }
  }

  // Set the final value
  const lastKey = pathArray[lastIndex];
  current[lastKey] = value;

  return obj;
}

/**
 * Delete a property at a path in an object (mutates the object)
 * @param obj - The object to modify
 * @param path - The path to delete
 * @returns True if the property was deleted
 */
export function unset(obj: any, path: string | string[]): boolean {
  const pathArray = Array.isArray(path) ? path : pathToArray(path);

  if (!obj || pathArray.length === 0) return false;

  let current = obj;
  const lastIndex = pathArray.length - 1;

  // Traverse to the parent of the target property
  for (let i = 0; i < lastIndex; i++) {
    const key = pathArray[i];

    if (!(key in current)) {
      return false;
    }

    current = current[key];
    if (current == null) {
      return false;
    }
  }

  // Delete the final property
  const lastKey = pathArray[lastIndex];
  return delete current[lastKey];
}

/**
 * Convert a dot-notation path string to an array of keys
 * Handles array notation like users[].name
 */
function pathToArray(path: string): string[] {
  if (!path || path.trim() === "") return [];

  // Handle array element notation [] specially
  const parts = [];
  let currentPart = "";
  let inBrackets = false;

  for (let i = 0; i < path.length; i++) {
    const char = path[i];

    if (char === "[") {
      if (currentPart) {
        parts.push(currentPart);
        currentPart = "";
      }
      inBrackets = true;
    } else if (char === "]") {
      if (inBrackets && currentPart) {
        parts.push(currentPart);
        currentPart = "";
      }
      inBrackets = false;
    } else if (char === "." && !inBrackets) {
      if (currentPart) {
        parts.push(currentPart);
        currentPart = "";
      }
    } else {
      currentPart += char;
    }
  }

  if (currentPart) {
    parts.push(currentPart);
  }

  return parts;
}

/**
 * Check if a string represents an array index
 */
function isArrayIndex(key: string): boolean {
  return /^\d+$/.test(key) && parseInt(key, 10) >= 0;
}

/**
 * Extract the base array path from an array element path
 * Example: "posts[].title" -> "posts"
 */
export function getBaseArrayPath(path: string): string {
  if (!path.includes("[]")) return path;

  const match = path.match(/(.*)\[\]/);
  return match ? match[1] : path;
}

/**
 * Check if a path is an array element path
 */
export function isArrayElementPath(path: string): boolean {
  return path.includes("[]");
}

export default get;
