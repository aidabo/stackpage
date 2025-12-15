/**
 * A simple implementation of lodash.get
 */
export function get(object: any, path: string | string[], defaultValue?: any): any {
  if (object == null) {
    return defaultValue;
  }

  const pathArray = Array.isArray(path)
    ? path
    : path.replace(/\[(\d+)\]/g, '.$1').split('.').filter(Boolean);

  let result = object;
  for (const key of pathArray) {
    if (result == null) {
      return defaultValue;
    }
    result = result[key];
  }

  return result === undefined ? defaultValue : result;
}
