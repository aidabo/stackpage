/**
 * Utility function to safely get nested property values from objects using dot notation
 * Similar to lodash.get but with TypeScript support
 */

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
  if (!obj || path === null || path === undefined) return defaultValue;

  // Convert string path to array if needed
  const pathArray = Array.isArray(path) ? path : pathToArray(path);

  let current = obj;
  for (let i = 0; i < pathArray.length; i++) {
    const key = pathArray[i];

    // If current is null or undefined, return default
    if (current == null) {
      return defaultValue;
    }

    // Handle array indices: convert "0" to 0, etc.
    const arrayKey = isArrayIndex(key) ? parseInt(key, 10) : key;

    // If the key doesn't exist in current object, return default
    if (!(arrayKey in current)) {
      return defaultValue;
    }

    current = current[arrayKey];
  }

  // If the final value is undefined, return default
  return current !== undefined ? current : defaultValue;
}

/**
 * Convert a dot-notation path string to an array of keys
 * @param path - Path string like 'items[0].name' or 'user.profile.email'
 * @returns Array of keys like ['items', '0', 'name']
 */
function pathToArray(path: string): string[] {
  if (!path || path.trim() === "") return [];

  // Match keys with optional array indices
  const pattern =
    /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
  const result: string[] = [];

  let match: RegExpExecArray | null;
  while ((match = pattern.exec(path)) !== null) {
    // Push the matched key (either property name or array index)
    result.push(
      match[1] // Array index
        ? match[1]
        : match[3] // Quoted string
        ? match[3].replace(/\\(.)/g, "$1")
        : match[0] // Regular property
    );
  }

  return result;
}

/**
 * Check if a string represents an array index
 * @param key - The key to check
 * @returns True if the key is an array index
 */
function isArrayIndex(key: string): boolean {
  // Check if the key is a non-negative integer
  return /^\d+$/.test(key) && parseInt(key, 10) >= 0;
}

/**
 * Alternative implementation using string splitting (simpler but less robust)
 * Use this if the regex version has issues
 */
export function getSimple<T = any>(
  obj: any,
  path: string,
  defaultValue?: T
): T | undefined {
  if (!obj || !path) return defaultValue;

  // Split path by dots, handling array indices
  const keys = path
    .replace(/\[/g, ".")
    .replace(/\]/g, "")
    .split(".")
    .filter((key) => key !== "");

  let current = obj;
  for (const key of keys) {
    if (current == null || typeof current !== "object") {
      return defaultValue;
    }

    // Handle array indices
    const arrayKey = isArrayIndex(key) ? parseInt(key, 10) : key;

    if (!(arrayKey in current)) {
      return defaultValue;
    }

    current = current[arrayKey];
  }

  return current !== undefined ? current : defaultValue;
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
  if (!obj || path === null || path === undefined) return obj;

  const pathArray = Array.isArray(path) ? path : pathToArray(path);

  // If the path is empty, return the original object
  if (pathArray.length === 0) return obj;

  let current = obj;
  const lastIndex = pathArray.length - 1;

  // Traverse to the second-to-last key
  for (let i = 0; i < lastIndex; i++) {
    const key = pathArray[i];
    const arrayKey = isArrayIndex(key) ? parseInt(key, 10) : key;

    // Create nested objects/arrays if they don't exist
    if (!(arrayKey in current)) {
      // Determine if the next key is an array index
      const nextKey = pathArray[i + 1];
      current[arrayKey] = isArrayIndex(nextKey) ? [] : {};
    }

    current = current[arrayKey];
    if (current == null) {
      // Can't set on null/undefined
      return obj;
    }
  }

  // Set the final value
  const lastKey = pathArray[lastIndex];
  const lastArrayKey = isArrayIndex(lastKey) ? parseInt(lastKey, 10) : lastKey;
  current[lastArrayKey] = value;

  return obj;
}

/**
 * Delete a property at a path in an object (mutates the object)
 * @param obj - The object to modify
 * @param path - The path to delete
 * @returns True if the property was deleted
 */
export function unset(obj: any, path: string | string[]): boolean {
  if (!obj || path === null || path === undefined) return false;

  const pathArray = Array.isArray(path) ? path : pathToArray(path);

  // If the path is empty, nothing to delete
  if (pathArray.length === 0) return false;

  let current = obj;
  const lastIndex = pathArray.length - 1;

  // Traverse to the parent of the target property
  for (let i = 0; i < lastIndex; i++) {
    const key = pathArray[i];
    const arrayKey = isArrayIndex(key) ? parseInt(key, 10) : key;

    if (!(arrayKey in current)) {
      // Property doesn't exist
      return false;
    }

    current = current[arrayKey];
    if (current == null) {
      // Can't traverse through null/undefined
      return false;
    }
  }

  // Delete the final property
  const lastKey = pathArray[lastIndex];
  const lastArrayKey = isArrayIndex(lastKey) ? parseInt(lastKey, 10) : lastKey;

  if (!(lastArrayKey in current)) {
    return false;
  }

  return delete current[lastArrayKey];
}

export default get;
