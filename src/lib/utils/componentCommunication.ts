import { get, set } from "./get";

export type InteractionActionType =
  | "set-prop"
  | "set-shared-state"
  | "emit-event"
  | "emit-request";

export interface InteractionRule {
  id?: string;
  description?: string;
  event: string;
  action: InteractionActionType;
  targetWidgetId?: string;
  targetPath?: string;
  responseEvent?: string;
  timeoutMs?: number;
  onSuccessEvent?: string;
  onErrorEvent?: string;
  value?: any;
  valueFrom?: string;
  enabled?: boolean;
  once?: boolean;
}

export interface RuleValidationIssue {
  severity: "error" | "warning";
  ruleIndex: number;
  ruleId?: string;
  message: string;
}

export interface ValidateInteractionRulesOptions {
  widgetIds?: string[];
}

export interface EmitComponentEventPayload {
  sourceWidgetId: string;
  eventName: string;
  payload?: any;
  rules?: InteractionRule[];
  depth?: number;
  runtimeScopeId?: string;
}

export interface InteractionRuntime {
  getWidgetProps: (widgetId: string) => Record<string, any> | undefined;
  updateWidgetProps: (widgetId: string, props: Record<string, any>) => void;
  setSharedState: (path: string, value: any) => void;
  emitEvent: (payload: EmitComponentEventPayload) => void;
  emitRequest?: (options: {
    sourceWidgetId: string;
    eventName: string;
    payload?: any;
    responseEvent?: string;
    timeoutMs?: number;
    rules?: InteractionRule[];
    depth?: number;
    runtimeScopeId?: string;
  }) => Promise<any>;
}

export const MAX_INTERACTION_DEPTH = 6;

export interface ComponentEventMeta {
  sourceWidgetId: string;
  eventName: string;
}

export type ComponentEventHandler = (payload: any, meta: ComponentEventMeta) => void;

export interface ComponentEventBus {
  emit: (eventName: string, payload: any, meta: ComponentEventMeta) => void;
  subscribe: (eventName: string, handler: ComponentEventHandler) => () => void;
  unsubscribe: (eventName: string, subscriptionId: string) => void;
}

export interface StackPageRuntimeApi {
  widgetId: string;
  emit: (eventName: string, payload?: any) => void;
  emitWithAck: (
    eventName: string,
    payload?: any,
    options?: { responseEvent?: string; timeoutMs?: number }
  ) => Promise<any>;
  subscribe: (
    eventName: string,
    handler: (payload: any, meta: ComponentEventMeta) => void
  ) => () => void;
  unsubscribe: (unsubscribeFn?: (() => void) | null) => void;
  setState: (path: string, value: any) => void;
  getState: <T = any>(path: string, defaultValue?: T) => T | undefined;
  setPageState?: (path: string, value: any) => void;
  getPageState?: <T = any>(path: string, defaultValue?: T) => T | undefined;
}

export type StackPageEventMode = "emit" | "request";
export type StackPageSubscriptionReplyMode = "none" | "ack";

export interface StackPageEventAction {
  id: string;
  label: string;
  description?: string;
  mode: StackPageEventMode;
  event: string;
  responseEvent?: string;
  payloadPath?: string;
  enabled?: boolean;
}

export interface StackPageEventSubscription {
  id: string;
  event: string;
  description?: string;
  enabled?: boolean;
  replyMode?: StackPageSubscriptionReplyMode;
  responseEvent?: string;
  resultTemplate?: string;
}

export type StackPageComponentProps<T extends object = {}> = T & {
  __stackpage?: StackPageRuntimeApi;
};

export type StackPageLifecycleEventName =
  | "page:init"
  | "page:load"
  | "page:ready"
  | "widget:init"
  | "widget:load"
  | "widget:unmount";

export interface StackPageLifecycleEventPayload {
  widgetId: string;
  componentName: string;
  lifecycle: StackPageLifecycleEventName;
  mode?: "edit" | "preview" | "view";
  sentAt: string;
  pageId?: string;
  pageTitle?: string;
  resolvedBindingCount?: number;
  totalBindingCount?: number;
}

export interface StackPageWidgetLifecycleBinding {
  sourceWidgetId: string;
  componentName: string;
  mode?: "edit" | "preview" | "view";
  rules?: InteractionRule[];
}

export interface StackPageWidgetLifecycleRuntime {
  emitComponentEvent: (payload: EmitComponentEventPayload) => void;
  disposeTrackedSubscriptions: () => void;
  clearRuntimeScope?: () => void;
}

export interface StackPageWidgetLoadTracker {
  hasLoaded: () => boolean;
  maybeEmitLoad: (params: {
    hasResolvedBindings: boolean;
    resolvedBindingCount?: number;
    totalBindingCount?: number;
  }) => boolean;
}

export interface StackPagePageLifecycleTracker {
  beginPage: (pageId: string) => boolean;
  beginLoadCycle: (pageId: string) => number;
  markPageLoaded: (pageId: string, loadCycle: number) => boolean;
  markGridReady: (pageId: string, loadCycle: number) => void;
  canEmitReady: (pageId: string, loadCycle: number) => boolean;
  markPageReady: (pageId: string, loadCycle: number) => boolean;
  getActiveLoadCycle: (pageId: string) => number;
}

export function createStackPageLifecyclePayload({
  widgetId,
  componentName,
  lifecycle,
  mode,
  sentAt = new Date().toISOString(),
  pageId,
  pageTitle,
  resolvedBindingCount,
  totalBindingCount,
}: {
  widgetId: string;
  componentName: string;
  lifecycle: StackPageLifecycleEventName;
  mode?: "edit" | "preview" | "view";
  sentAt?: string;
  pageId?: string;
  pageTitle?: string;
  resolvedBindingCount?: number;
  totalBindingCount?: number;
}): StackPageLifecycleEventPayload {
  return {
    widgetId,
    componentName,
    lifecycle,
    mode,
    sentAt,
    pageId,
    pageTitle,
    resolvedBindingCount,
    totalBindingCount,
  };
}

export function bindStackPageWidgetLifecycle(
  runtime: StackPageWidgetLifecycleRuntime,
  binding: StackPageWidgetLifecycleBinding
): () => void {
  const emitLifecycleEvent = (lifecycle: StackPageLifecycleEventName) => {
    runtime.emitComponentEvent({
      sourceWidgetId: binding.sourceWidgetId,
      eventName: lifecycle,
      payload: createStackPageLifecyclePayload({
        widgetId: binding.sourceWidgetId,
        componentName: binding.componentName,
        lifecycle,
        mode: binding.mode,
      }),
      rules: binding.rules,
    });
  };

  emitLifecycleEvent("widget:init");

  return () => {
    emitLifecycleEvent("widget:unmount");
    runtime.disposeTrackedSubscriptions();
    runtime.clearRuntimeScope?.();
  };
}

export function createStackPageWidgetLoadTracker(): StackPageWidgetLoadTracker {
  let hasLoaded = false;

  return {
    hasLoaded: () => hasLoaded,
    maybeEmitLoad: ({
      hasResolvedBindings,
    }: {
      hasResolvedBindings: boolean;
      resolvedBindingCount?: number;
      totalBindingCount?: number;
    }) => {
      if (hasLoaded || !hasResolvedBindings) return false;
      hasLoaded = true;
      return true;
    },
  };
}

export function createStackPagePageLifecycleTracker(): StackPagePageLifecycleTracker {
  let activePageId: string | null = null;
  let activeLoadCycle = 0;
  const loadedCycles = new Set<number>();
  const gridReadyCycles = new Set<number>();
  const readyCycles = new Set<number>();

  return {
    beginPage: (pageId: string) => {
      if (!pageId) return false;
      if (activePageId === pageId) return false;
      activePageId = pageId;
      activeLoadCycle = 0;
      loadedCycles.clear();
      gridReadyCycles.clear();
      readyCycles.clear();
      return true;
    },
    beginLoadCycle: (pageId: string) => {
      if (!pageId) return 0;
      if (activePageId !== pageId) {
        activePageId = pageId;
        activeLoadCycle = 0;
        loadedCycles.clear();
        gridReadyCycles.clear();
        readyCycles.clear();
      }
      activeLoadCycle += 1;
      return activeLoadCycle;
    },
    markPageLoaded: (pageId: string, loadCycle: number) => {
      if (activePageId !== pageId || loadCycle <= 0) return false;
      if (loadedCycles.has(loadCycle)) return false;
      loadedCycles.add(loadCycle);
      return true;
    },
    markGridReady: (pageId: string, loadCycle: number) => {
      if (activePageId !== pageId || loadCycle <= 0) return;
      gridReadyCycles.add(loadCycle);
    },
    canEmitReady: (pageId: string, loadCycle: number) => {
      return (
        activePageId === pageId &&
        loadCycle > 0 &&
        loadedCycles.has(loadCycle) &&
        gridReadyCycles.has(loadCycle) &&
        !readyCycles.has(loadCycle)
      );
    },
    markPageReady: (pageId: string, loadCycle: number) => {
      if (
        activePageId !== pageId ||
        loadCycle <= 0 ||
        !loadedCycles.has(loadCycle) ||
        !gridReadyCycles.has(loadCycle) ||
        readyCycles.has(loadCycle)
      ) {
        return false;
      }
      readyCycles.add(loadCycle);
      return true;
    },
    getActiveLoadCycle: (pageId: string) => {
      return activePageId === pageId ? activeLoadCycle : 0;
    },
  };
}

export interface CreateStackPageRuntimeApiOptions {
  widgetId: string;
  runtimeScopeId?: string;
  emitComponentEvent: (payload: EmitComponentEventPayload) => void;
  subscribeComponentEvent: (
    eventName: string,
    handler: (payload: any, meta: ComponentEventMeta) => void
  ) => () => void;
  setSharedState: (path: string, value: any) => void;
  getSharedState: <T = any>(path: string, defaultValue?: T) => T | undefined;
  rules?: InteractionRule[];
}

export function createStackPageRuntimeApi({
  widgetId,
  runtimeScopeId,
  emitComponentEvent,
  subscribeComponentEvent,
  setSharedState,
  getSharedState,
  rules,
}: CreateStackPageRuntimeApiOptions): {
  api: StackPageRuntimeApi;
  disposeTrackedSubscriptions: () => void;
  clearRuntimeScope: () => void;
} {
  const trackedDisposers = new Set<() => void>();
  const runtimeScope = runtimeScopeId || `widget:${widgetId}`;
  const clearRuntimeScope = () => clearRuleExecutionScope(runtimeScope);

  const trackDisposer = (dispose: () => void) => {
    trackedDisposers.add(dispose);
    return () => {
      try {
        dispose();
      } finally {
        trackedDisposers.delete(dispose);
      }
    };
  };

  const api: StackPageRuntimeApi = {
    widgetId,
    emit: (eventName: string, payload?: any) =>
      emitComponentEvent({
        sourceWidgetId: widgetId,
        eventName,
        payload,
        rules,
        runtimeScopeId: runtimeScope,
      }),
    emitWithAck: (
      eventName: string,
      payload?: any,
      options?: { responseEvent?: string; timeoutMs?: number }
    ) => {
      const responseEvent = options?.responseEvent || `${eventName}:completed`;
      const timeoutMs = options?.timeoutMs ?? 5000;
      const requestId = `${widgetId}:${Date.now()}:${Math.random()
        .toString(36)
        .slice(2)}`;

      return new Promise((resolve, reject) => {
        let settled = false;
        let timer: ReturnType<typeof globalThis.setTimeout>;
        const unsubscribe = trackDisposer(
          subscribeComponentEvent(responseEvent, (responsePayload: any) => {
            if (settled) return;
            if (
              responsePayload?.__requestId &&
              responsePayload.__requestId !== requestId
            ) {
              return;
            }
            settled = true;
            globalThis.clearTimeout(timer);
            unsubscribe();
            const responseWithHandledAt =
              responsePayload &&
              typeof responsePayload === "object" &&
              !Array.isArray(responsePayload)
                ? {
                    ...responsePayload,
                    handledAt:
                      responsePayload.handledAt || new Date().toISOString(),
                  }
                : {
                    result: responsePayload,
                    handledAt: new Date().toISOString(),
                  };
            resolve(responseWithHandledAt?.result ?? responseWithHandledAt);
          })
        );

        timer = globalThis.setTimeout(() => {
          if (settled) return;
          settled = true;
          unsubscribe();
          reject(
            new Error(
              `Timeout waiting for ${responseEvent} after ${timeoutMs}ms`
            )
          );
        }, timeoutMs);

        const wrappedPayload =
          payload && typeof payload === "object" && !Array.isArray(payload)
            ? {
                ...payload,
                __requestId: requestId,
                sentAt: payload.sentAt || new Date().toISOString(),
              }
            : {
                value: payload,
                __requestId: requestId,
                sentAt: new Date().toISOString(),
              };

        emitComponentEvent({
          sourceWidgetId: widgetId,
          eventName,
          payload: wrappedPayload,
          rules,
          runtimeScopeId: runtimeScope,
        });
      });
    },
    subscribe: (
      eventName: string,
      handler: (payload: any, meta: ComponentEventMeta) => void
    ) => {
      const unsubscribe = trackDisposer(
        subscribeComponentEvent(eventName, handler)
      );
      return unsubscribe;
    },
    unsubscribe: (unsubscribeFn?: (() => void) | null) => {
      if (typeof unsubscribeFn === "function") {
        unsubscribeFn();
        trackedDisposers.delete(unsubscribeFn);
      }
    },
    setState: (path: string, value: any) => setSharedState(path, value),
    getState: <T = any>(path: string, defaultValue?: T) =>
      getSharedState(path, defaultValue),
    setPageState: (path: string, value: any) => setSharedState(path, value),
    getPageState: <T = any>(path: string, defaultValue?: T) =>
      getSharedState(path, defaultValue),
  };

  return {
    api,
    disposeTrackedSubscriptions: () => {
      trackedDisposers.forEach((dispose) => {
        try {
          dispose();
        } catch {
          // no-op
        }
      });
      trackedDisposers.clear();
    },
    clearRuntimeScope,
  };
}

const executedOnceRulesByScope = new Map<string, Set<string>>();

function getRuleExecutionKey(rule: InteractionRule, index: number): string {
  return [
    rule.id || `rule-${index}`,
    rule.event,
    rule.action,
    rule.targetWidgetId || "",
    rule.targetPath || "",
    rule.responseEvent || "",
    rule.timeoutMs || "",
  ].join("|");
}

function getOnceScopeId(eventPayload: EmitComponentEventPayload): string {
  return eventPayload.runtimeScopeId || eventPayload.sourceWidgetId || "global";
}

function hasExecutedOnce(scopeId: string, ruleKey: string): boolean {
  return executedOnceRulesByScope.get(scopeId)?.has(ruleKey) ?? false;
}

function markExecutedOnce(scopeId: string, ruleKey: string): void {
  const scope = executedOnceRulesByScope.get(scopeId) || new Set<string>();
  scope.add(ruleKey);
  executedOnceRulesByScope.set(scopeId, scope);
}

export function clearRuleExecutionScope(scopeId: string): void {
  if (!scopeId) return;
  executedOnceRulesByScope.delete(scopeId);
}

export function createComponentEventBus(): ComponentEventBus {
  const subscribers = new Map<string, Map<string, ComponentEventHandler>>();

  const unsubscribe = (eventName: string, subscriptionId: string) => {
    const listeners = subscribers.get(eventName);
    if (!listeners) return;
    listeners.delete(subscriptionId);
    if (listeners.size === 0) {
      subscribers.delete(eventName);
    }
  };

  return {
    emit: (eventName: string, payload: any, meta: ComponentEventMeta) => {
      const listeners = subscribers.get(eventName);
      if (!listeners) return;
      listeners.forEach((handler) => {
        try {
          handler(payload, meta);
        } catch (error) {
          console.error("[StackPage EventBus] handler error:", error);
        }
      });
    },
    subscribe: (eventName: string, handler: ComponentEventHandler) => {
      if (!eventName || typeof handler !== "function") return () => {};
      const id = `sub:${Math.random().toString(36).slice(2)}`;
      const listeners = subscribers.get(eventName) || new Map();
      listeners.set(id, handler);
      subscribers.set(eventName, listeners);
      return () => unsubscribe(eventName, id);
    },
    unsubscribe,
  };
}

export function normalizeInteractionRules(input: any): InteractionRule[] {
  if (!Array.isArray(input)) return [];

  return input
    .filter((rule) => rule && typeof rule === "object")
    .map((rule) => ({
      id: rule.id,
      description: rule.description,
      event: String(rule.event || ""),
      action: rule.action,
      targetWidgetId: rule.targetWidgetId,
      targetPath: rule.targetPath,
      responseEvent: rule.responseEvent,
      timeoutMs: rule.timeoutMs,
      onSuccessEvent: rule.onSuccessEvent,
      onErrorEvent: rule.onErrorEvent,
      value: rule.value,
      valueFrom: rule.valueFrom,
      enabled: rule.enabled !== false,
      once: rule.once === true,
    }))
    .filter((rule) => rule.event && rule.action);
}

export function validateInteractionRules(
  rules: InteractionRule[],
  options: ValidateInteractionRulesOptions = {}
): RuleValidationIssue[] {
  const issues: RuleValidationIssue[] = [];
  const idMap = new Map<string, number>();
  const widgetIds = new Set(options.widgetIds || []);

  rules.forEach((rule, index) => {
    const ruleId = rule.id;
    const push = (
      severity: "error" | "warning",
      message: string
    ): void => {
      issues.push({ severity, ruleIndex: index, ruleId, message });
    };

    if (!rule.event) push("error", "event is required");
    if (!rule.action) push("error", "action is required");

    if (rule.id) {
      if (idMap.has(rule.id)) {
        push("warning", `duplicate rule id "${rule.id}"`);
      } else {
        idMap.set(rule.id, index);
      }
    } else {
      push("warning", "rule id is empty");
    }

    if (rule.action === "set-prop") {
      if (!rule.targetWidgetId) {
        push("error", "set-prop requires targetWidgetId");
      } else if (
        rule.targetWidgetId !== "$self" &&
        widgetIds.size > 0 &&
        !widgetIds.has(rule.targetWidgetId)
      ) {
        push("warning", `targetWidgetId "${rule.targetWidgetId}" not found in current page`);
      }
      if (!rule.targetPath) push("error", "set-prop requires targetPath");
    }

    if (rule.action === "set-shared-state") {
      if (!rule.targetPath) {
        push("error", "set-shared-state requires targetPath");
      }
    }

    if (rule.action === "emit-event") {
      if (!rule.targetPath) {
        push("error", "emit-event requires targetPath as next event name");
      } else if (rule.targetPath === rule.event) {
        push("warning", "emit-event targetPath equals source event (possible loop)");
      }
    }

    if (rule.action === "emit-request") {
      if (!rule.targetPath) {
        push("error", "emit-request requires targetPath as request event name");
      }
      if (!rule.responseEvent) {
        push("error", "emit-request requires responseEvent");
      }
      if (rule.timeoutMs !== undefined) {
        if (!Number.isFinite(rule.timeoutMs) || rule.timeoutMs <= 0) {
          push("error", "emit-request timeoutMs must be a positive number");
        }
      }
      if (rule.responseEvent && rule.targetPath && rule.responseEvent === rule.targetPath) {
        push("warning", "responseEvent equals request event (possible loop)");
      }
    }

    if (rule.enabled === false) {
      push("warning", "rule is disabled");
    }
  });

  return issues;
}

export function resolveInteractionValue(
  payload: any,
  rule: InteractionRule
): any {
  if (rule.valueFrom) {
    if (rule.valueFrom === "$") return payload;
    if (rule.valueFrom.startsWith("$.")) return get(payload, rule.valueFrom.slice(2));
    return get(payload, rule.valueFrom);
  }
  return rule.value;
}

export function executeInteractionRules(
  eventPayload: EmitComponentEventPayload,
  runtime: InteractionRuntime
): number {
  const {
    sourceWidgetId,
    eventName,
    payload,
    rules = [],
    depth = 0,
  } = eventPayload;

  if (!sourceWidgetId || !eventName || depth >= MAX_INTERACTION_DEPTH) {
    return 0;
  }

  let executed = 0;

  const schedule = (task: () => void) => {
    if (typeof queueMicrotask === "function") {
      queueMicrotask(task);
      return;
    }
    Promise.resolve().then(task);
  };

  for (let index = 0; index < rules.length; index += 1) {
    const rule = rules[index];
    if (rule.enabled === false) continue;
    if (rule.event !== eventName) continue;
    const ruleKey = getRuleExecutionKey(rule, index);
    const onceScopeId = getOnceScopeId(eventPayload);
    if (rule.once && hasExecutedOnce(onceScopeId, ruleKey)) {
      continue;
    }
    if (rule.once) {
      markExecutedOnce(onceScopeId, ruleKey);
    }

    const value = resolveInteractionValue(payload, rule);

    if (rule.action === "set-prop") {
      if (!rule.targetWidgetId || !rule.targetPath) continue;
      const targetWidgetId =
        rule.targetWidgetId === "$self" ? sourceWidgetId : rule.targetWidgetId;
      const targetPath = rule.targetPath;
      schedule(() => {
        const targetProps = cloneObject(
          runtime.getWidgetProps(targetWidgetId) || {}
        );
        set(targetProps, targetPath, value);
        runtime.updateWidgetProps(targetWidgetId, targetProps);
      });
      executed += 1;
      continue;
    }

    if (rule.action === "set-shared-state") {
      if (!rule.targetPath) continue;
      const targetPath = rule.targetPath;
      schedule(() => {
        runtime.setSharedState(targetPath, value);
      });
      executed += 1;
      continue;
    }

    if (rule.action === "emit-event") {
      if (!rule.targetPath) continue;
      runtime.emitEvent({
        sourceWidgetId,
        eventName: rule.targetPath,
        payload: value === undefined ? payload : value,
        rules,
        depth: depth + 1,
        runtimeScopeId: eventPayload.runtimeScopeId,
      });
      executed += 1;
      continue;
    }

    if (rule.action === "emit-request") {
      if (!rule.targetPath || !runtime.emitRequest) continue;
      const requestEvent = rule.targetPath;
      const onSuccessEvent =
        rule.onSuccessEvent || `${requestEvent}:success`;
      const onErrorEvent = rule.onErrorEvent || `${requestEvent}:error`;

      runtime
        .emitRequest({
          sourceWidgetId,
          eventName: requestEvent,
          payload: value,
          responseEvent: rule.responseEvent,
          timeoutMs: rule.timeoutMs,
          rules,
          depth: depth + 1,
        })
        .then((result) => {
        runtime.emitEvent({
          sourceWidgetId,
          eventName: onSuccessEvent,
          payload:
            result && typeof result === "object"
              ? result
              : { result, handledAt: new Date().toISOString() },
          rules,
          depth: depth + 1,
          runtimeScopeId: eventPayload.runtimeScopeId,
        });
      })
      .catch((error: any) => {
        runtime.emitEvent({
          sourceWidgetId,
            eventName: onErrorEvent,
          payload: {
            error: error?.message || String(error),
            handledAt: new Date().toISOString(),
          },
          rules,
          depth: depth + 1,
          runtimeScopeId: eventPayload.runtimeScopeId,
        });
      });
      executed += 1;
    }
  }

  return executed;
}

function cloneObject<T>(value: T): T {
  if (value === null || typeof value !== "object") return value;
  return JSON.parse(JSON.stringify(value));
}
