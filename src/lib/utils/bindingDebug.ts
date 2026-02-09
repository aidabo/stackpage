type BindingDebugPayload = {
  widgetId: string;
  componentName: string;
  bindings: Record<string, any>;
  rawProps: Record<string, any>;
  resolvedProps: Record<string, any>;
};

const lastSnapshots = new Map<string, string>();

export function isBindingDebugEnabled(): boolean {
  if (typeof window === "undefined") return false;
  const localFlag = window.localStorage?.getItem("stackpage:debug:binding");
  const globalFlag = (window as any).__STACKPAGE_DEBUG_BINDING__;
  return localFlag === "1" || globalFlag === true;
}

function safeStringify(value: unknown): string {
  try {
    return JSON.stringify(value);
  } catch {
    return "";
  }
}

export function logBindingResolution(payload: BindingDebugPayload): void {
  if (!isBindingDebugEnabled()) return;

  const { widgetId, componentName, bindings, rawProps, resolvedProps } = payload;
  const boundKeys = Object.keys(bindings || {});
  if (boundKeys.length === 0) return;

  const rawBoundValues = boundKeys.reduce((acc, key) => {
    acc[key] = rawProps?.[key];
    return acc;
  }, {} as Record<string, any>);

  const resolvedBoundValues = boundKeys.reduce((acc, key) => {
    acc[key] = resolvedProps?.[key];
    return acc;
  }, {} as Record<string, any>);

  const snapshot = safeStringify({
    bindings,
    rawBoundValues,
    resolvedBoundValues,
  });
  const snapshotKey = `${widgetId}:${componentName}`;

  if (lastSnapshots.get(snapshotKey) === snapshot) return;
  lastSnapshots.set(snapshotKey, snapshot);

  // eslint-disable-next-line no-console
  console.groupCollapsed(
    `[StackPage Binding Debug] ${componentName} (${widgetId})`
  );
  // eslint-disable-next-line no-console
  console.log("bindings", bindings);
  // eslint-disable-next-line no-console
  console.log("rawBoundValues", rawBoundValues);
  // eslint-disable-next-line no-console
  console.log("resolvedBoundValues", resolvedBoundValues);
  // eslint-disable-next-line no-console
  console.groupEnd();
}

