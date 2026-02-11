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

  for (const rule of rules) {
    if (rule.enabled === false) continue;
    if (rule.event !== eventName) continue;

    const value = resolveInteractionValue(payload, rule);

    if (rule.action === "set-prop") {
      if (!rule.targetWidgetId || !rule.targetPath) continue;
      const targetWidgetId =
        rule.targetWidgetId === "$self" ? sourceWidgetId : rule.targetWidgetId;

      const targetProps = cloneObject(runtime.getWidgetProps(targetWidgetId) || {});
      set(targetProps, rule.targetPath, value);
      runtime.updateWidgetProps(targetWidgetId, targetProps);
      executed += 1;
      continue;
    }

    if (rule.action === "set-shared-state") {
      if (!rule.targetPath) continue;
      runtime.setSharedState(rule.targetPath, value);
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
