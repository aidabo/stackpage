import { applyTransformer } from "./transformers";
import { get, set } from "./get";
import { ArrayBindingUtils } from "./ArrayBindingUtils";

export type BindingSelector =
  | { type: "id"; value: string }
  | { type: "ids"; value: string[] }
  | { type: "all" }
  // Legacy compatibility for already-saved bindings
  | { type: "index"; value: number };

export interface BindingInfo {
  sourceId: string;
  path: string;
  transformer?: string;
  selector?: BindingSelector;
  targetType?: string;
  isArrayElement?: boolean;
}

function toArray<T>(value: T | T[] | undefined | null): T[] {
  if (Array.isArray(value)) return value;
  return value === undefined || value === null ? [] : [value];
}

function resolvePathValue(sourceData: any, path: string): any {
  if (path === "$" || path === "") return sourceData;
  if (path === "$[]") {
    return Array.isArray(sourceData) ? sourceData : toArray(sourceData);
  }
  if (path.startsWith("$.")) {
    return get(sourceData, path.slice(2));
  }
  return get(sourceData, path);
}

export function createBindingSelector(params: {
  selectedRecord: any;
  selectedRecordIndex: number | null;
  selectedItems: number[];
  targetSchemaType?: string;
  records?: any[];
  forceAllForArray?: boolean;
}): BindingSelector {
  const {
    selectedRecord,
    selectedRecordIndex,
    selectedItems,
    targetSchemaType,
    records,
    forceAllForArray = false,
  } = params;

  const isArrayTarget = targetSchemaType === "array";
  if (forceAllForArray && isArrayTarget) {
    return { type: "all" };
  }

  if (isArrayTarget) {
    if (selectedItems.length > 1 && records && records.length > 0) {
      const ids = selectedItems
        .map((idx) => records[idx])
        .filter((r) => r && r.id !== undefined && r.id !== null)
        .map((r) => String(r.id));
      if (ids.length > 0) {
        return { type: "ids", value: ids };
      }
    }
    if (selectedRecord && selectedRecord.id !== undefined && selectedRecord.id !== null) {
      return { type: "id", value: String(selectedRecord.id) };
    }
    return { type: "all" };
  }

  if (selectedRecord && selectedRecord.id !== undefined && selectedRecord.id !== null) {
    return { type: "id", value: String(selectedRecord.id) };
  }
  return { type: "index", value: selectedRecordIndex !== null ? selectedRecordIndex : 0 };
}

export function getSelectedIndicesFromSelector(
  records: any[],
  selector?: BindingSelector
): number[] {
  if (!Array.isArray(records) || records.length === 0) return [];
  if (!selector) return [0];

  switch (selector.type) {
    case "id": {
      const idx = records.findIndex(
        (item) => String(item?.id) === String(selector.value)
      );
      return idx >= 0 ? [idx] : [];
    }
    case "ids": {
      const idSet = new Set((selector.value || []).map((v) => String(v)));
      return records
        .map((item, idx) => ({ idx, id: String(item?.id) }))
        .filter((x) => idSet.has(x.id))
        .map((x) => x.idx);
    }
    case "all":
      return records.map((_, idx) => idx);
    case "index": {
      const idx = Number(selector.value);
      return Number.isInteger(idx) && idx >= 0 && idx < records.length
        ? [idx]
        : [];
    }
    default:
      return [0];
  }
}

export function applySelector(records: any[], selector?: BindingSelector): any[] {
  if (!Array.isArray(records) || records.length === 0) return [];
  const indices = getSelectedIndicesFromSelector(records, selector);
  if (indices.length === 0) return [];
  return indices.map((idx) => records[idx]).filter((v) => v !== undefined);
}

export function resolveBindingValue(sourceData: any, binding: BindingInfo): any {
  if (!sourceData || !binding?.path) return undefined;

  const { path, selector, targetType } = binding;
  const isArrayTarget = targetType === "array";

  if (ArrayBindingUtils.isArrayElementPath(path)) {
    const { arrayPath, elementField } = ArrayBindingUtils.parseArrayElementPath(path);
    const sourceArray = toArray(resolvePathValue(sourceData, arrayPath));
    const selected = applySelector(sourceArray, selector);
    if (!elementField) {
      return isArrayTarget ? selected : selected[0];
    }
    const values = selected.map((item) => get(item, elementField));
    return isArrayTarget ? values : values[0];
  }

  const raw = resolvePathValue(sourceData, path);
  if (Array.isArray(raw)) {
    const selected = applySelector(raw, selector);
    return isArrayTarget ? selected : selected[0];
  }
  return raw;
}

export function applyBindingTransformer(
  value: any,
  transformer?: string
): any {
  if (!transformer || value === undefined || value === null) {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((item) => applyTransformer(item, transformer));
  }
  return applyTransformer(value, transformer);
}

export function resolveBoundValue(sourceData: any, binding: BindingInfo): any {
  const value = resolveBindingValue(sourceData, binding);
  return applyBindingTransformer(value, binding.transformer);
}

/**
 * Resolve array field value using parent array binding + element bindings.
 */
export function resolveArrayWithElementBindings(params: {
  arrayProp: string;
  arrayBinding: BindingInfo;
  elementBindings: Record<string, BindingInfo>;
  ignoredFields: string[];
  sourceData: any;
}): any[] {
  const { arrayProp, arrayBinding, elementBindings, ignoredFields, sourceData } =
    params;
  const sourceArray = toArray(resolveBindingValue(sourceData, arrayBinding));

  const arrayElementBindings = Object.entries(elementBindings)
    .filter(([key]) => key.startsWith(`${arrayProp}[]`))
    .reduce((acc, [key, binding]) => {
      acc[key] = binding;
      return acc;
    }, {} as Record<string, BindingInfo>);

  if (Object.keys(arrayElementBindings).length === 0) {
    return sourceArray;
  }

  return sourceArray.map((sourceItem, index) => {
    const resultItem: any = {};

    Object.entries(arrayElementBindings).forEach(([bindingKey, binding]) => {
      const fieldMatch = bindingKey.match(/\[\]\.(.+)/);
      if (!fieldMatch || !fieldMatch[1]) return;

      const fieldName = fieldMatch[1];
      const ignoredPath = `${arrayProp}[].${fieldName}`;
      if (ignoredFields.includes(ignoredPath)) return;

      let value: any;
      if (binding.path.includes("[]")) {
        const { arrayPath, elementField } =
          ArrayBindingUtils.parseArrayElementPath(binding.path);
        const elemSourceArray = toArray(resolvePathValue(sourceData, arrayPath));
        if (elemSourceArray[index] !== undefined) {
          value = get(elemSourceArray[index], elementField);
        }
      } else {
        value = get(sourceItem, binding.path);
      }

      value = applyBindingTransformer(value, binding.transformer);
      set(resultItem, fieldName, value);
    });

    return resultItem;
  });
}
