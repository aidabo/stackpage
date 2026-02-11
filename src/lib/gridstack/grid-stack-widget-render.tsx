import { useMemo, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { GridStackWidget } from "gridstack";
import { ComponentType } from "react";
import { GridStackWidgetContext } from "./grid-stack-widget-context";
import { GridStackItemMenu } from "./grid-stack-Item-menu";
import { GridStackAutoResizer } from "./grid-stack-autoresizer";
import { useDataBinding } from "../components/useDataBinding";
import { useWidgetProps } from "../components/StackPageWidgetProps";
import { logBindingResolution } from "../utils/bindingDebug";
import { useStackPage } from "../components/StackPageContext";
import { debugLog } from "../utils/debug";
import {
  normalizeInteractionRules,
  type StackPageRuntimeApi,
} from "../utils/componentCommunication";

// Parse widget metadata into usable component info
function parseWidgetMeta(meta: GridStackWidget): {
  name: string;
  props: object;
  error: unknown;
} {
  let error = null;
  let name = "";
  let props = {};

  try {
    if (meta.content) {
      const result = JSON.parse(meta.content) as {
        name: string;
        props: object;
      };
      name = result.name;
      props = result.props;
    }
  } catch (e) {
    error = e;
  }

  return { name, props, error };
}

interface GridStackWidgetRendererProps {
  id: string;
  meta: GridStackWidget;
  WidgetComponent: ComponentType<any>;
  widgetContainer: HTMLElement;
  showMenubar?: boolean;
  isSelected?: boolean;
  onWidgetSelect?: (widgetData: {
    id: string;
    name: string;
    props: object;
  }) => void;
  componentProps?: any;
  currentMode?: "edit" | "view" | "preview";
}

export function GridStackWidgetRenderer({
  id,
  meta,
  WidgetComponent,
  widgetContainer,
  showMenubar,
  isSelected = false,
  onWidgetSelect,
  componentProps,
  currentMode,
}: GridStackWidgetRendererProps) {
  const componentData = useMemo(() => parseWidgetMeta(meta), [meta]);

  // Use the passed componentProps if available, otherwise use parsed props
  const rawProps = useMemo(() => {
    return componentProps || componentData.props;
  }, [componentProps, componentData.props]);
  const {
    registerWidgetSnapshot,
    emitComponentEvent,
    setSharedState,
    getSharedState,
    subscribeComponentEvent,
  } = useStackPage();
  const subscriptionDisposersRef = useRef<Set<() => void>>(new Set());

  const interactionRules = useMemo(
    () => normalizeInteractionRules((rawProps as any)?.__interactions),
    [rawProps]
  );

  const withSentAt = (payload: any) => {
    const sentAt = new Date().toISOString();
    if (payload && typeof payload === "object" && !Array.isArray(payload)) {
      return payload.sentAt ? payload : { ...payload, sentAt };
    }
    return { value: payload, sentAt };
  };

  useEffect(() => {
    registerWidgetSnapshot(id, (rawProps as any) || {});
  }, [id, rawProps, registerWidgetSnapshot]);

  useEffect(() => {
    return () => {
      subscriptionDisposersRef.current.forEach((dispose) => {
        try {
          dispose();
        } catch {
          // no-op
        }
      });
      subscriptionDisposersRef.current.clear();
    };
  }, []);

  // Resolve bindings
  const props = useDataBinding(rawProps);
  //const props = rawProps;

  logBindingResolution({
    widgetId: id,
    componentName: componentData.name,
    bindings: (rawProps as any)?.__bindings || {},
    rawProps: (rawProps as any) || {},
    resolvedProps: (props as any) || {},
  });

  debugLog(
    `[GridStackWidgetRenderer] Rendering widget ${id} of type ${componentData.name}`,
    {
      props,
      hasBindings: props?.__bindings ? Object.keys(props.__bindings).length : 0,
    }
  );

  const title = (props as any)?.title || `Widget ${id.slice(0, 4)}`;

  const handleWidgetClick = (_e: React.MouseEvent) => {
    if (onWidgetSelect) {
      onWidgetSelect({
        id,
        name: componentData.name,
        props: props,
      });
    }
  };

  // Get access to widget props updater
  const { updateProps } = useWidgetProps(id);

  // Generic handler for widget changes
  // This allows widgets (like RichText) to update their own props directly
  const handleWidgetChange = (value: any) => {
    let updates: Record<string, any> = {};

    // String payload convention: update only content.
    if (typeof value === "string") {
      updates = { content: value };
    }
    // Object payload convention:
    // 1) { field: "propName", value: any } -> update only one field.
    // 2) { ...partialProps } -> merge partial updates.
    else if (typeof value === "object" && value !== null) {
      if (
        typeof (value as any).field === "string" &&
        Object.prototype.hasOwnProperty.call(value, "value")
      ) {
        updates = { [(value as any).field]: (value as any).value };
      } else {
        updates = value;
      }
    }

    // Merge updates into the latest known props shape and preserve metadata
    // (e.g. __bindings, __schema, __interactions).
    updateProps({ ...rawProps, ...props, ...updates });

    emitComponentEvent({
      sourceWidgetId: id,
      eventName: "change",
      payload: withSentAt(value),
      rules: interactionRules,
    });
  };

  const content = (
    <GridStackAutoResizer widgetId={id}>
      <div
        className="relative h-full w-full"
        onClick={currentMode === "edit" ? handleWidgetClick : undefined}
      >
        {isSelected && currentMode === "edit" && (
          <div className="pointer-events-none absolute inset-0 ring-2 ring-blue-400" />
        )}
        {showMenubar && (
          <div className="widget-header flex items-center justify-between bg-gray-100 border-b px-2 min-h-[36px]">
            <div className="font-medium truncate text-sm px-1">{title}</div>
            <GridStackItemMenu widgetId={id} />
          </div>
        )}
        <div className="widget-body flex-1 min-h-[40px] cursor-pointer">
          <WidgetComponent 
            {...props} 
            __stackpage={{
              widgetId: id,
              emit: (eventName: string, payload?: any) =>
                emitComponentEvent({
                  sourceWidgetId: id,
                  eventName,
                  payload: withSentAt(payload),
                  rules: interactionRules,
                }),
              emitWithAck: (
                eventName: string,
                payload?: any,
                options?: { responseEvent?: string; timeoutMs?: number }
              ) => {
                const responseEvent =
                  options?.responseEvent || `${eventName}:completed`;
                const timeoutMs = options?.timeoutMs ?? 5000;
                const requestId = `${id}:${Date.now()}:${Math.random().toString(36).slice(2)}`;

                return new Promise((resolve, reject) => {
                  let settled = false;
                  const unsubscribe = subscribeComponentEvent(
                    responseEvent,
                    (responsePayload: any) => {
                      if (settled) return;
                      if (
                        responsePayload?.__requestId &&
                        responsePayload.__requestId !== requestId
                      ) {
                        return;
                      }
                      settled = true;
                      window.clearTimeout(timer);
                      unsubscribe();
                      subscriptionDisposersRef.current.delete(unsubscribe);
                      const responseWithHandledAt =
                        responsePayload &&
                        typeof responsePayload === "object" &&
                        !Array.isArray(responsePayload)
                          ? {
                              ...responsePayload,
                              handledAt:
                                responsePayload.handledAt ||
                                new Date().toISOString(),
                            }
                          : {
                              result: responsePayload,
                              handledAt: new Date().toISOString(),
                            };
                      resolve(
                        responseWithHandledAt?.result ?? responseWithHandledAt
                      );
                    }
                  );
                  subscriptionDisposersRef.current.add(unsubscribe);

                  const timer = window.setTimeout(() => {
                    if (settled) return;
                    settled = true;
                    unsubscribe();
                    subscriptionDisposersRef.current.delete(unsubscribe);
                    reject(
                      new Error(
                        `Timeout waiting for ${responseEvent} after ${timeoutMs}ms`
                      )
                    );
                  }, timeoutMs);

                  const wrappedPayload =
                    payload && typeof payload === "object"
                      ? {
                          ...payload,
                          __requestId: requestId,
                          sentAt: (payload as any).sentAt || new Date().toISOString(),
                        }
                      : {
                          value: payload,
                          __requestId: requestId,
                          sentAt: new Date().toISOString(),
                        };

                  emitComponentEvent({
                    sourceWidgetId: id,
                    eventName,
                    payload: wrappedPayload,
                    rules: interactionRules,
                  });
                });
              },
              subscribe: (
                eventName: string,
                handler: (payload: any, meta: { sourceWidgetId: string; eventName: string }) => void
              ) => {
                const unsubscribe = subscribeComponentEvent(eventName, handler);
                subscriptionDisposersRef.current.add(unsubscribe);
                return unsubscribe;
              },
              unsubscribe: (unsubscribeFn?: (() => void) | null) => {
                if (typeof unsubscribeFn === "function") {
                  unsubscribeFn();
                  subscriptionDisposersRef.current.delete(unsubscribeFn);
                }
              },
              setState: (path: string, value: any) => setSharedState(path, value),
              getState: (path: string, defaultValue?: any) =>
                getSharedState(path, defaultValue),
            } as StackPageRuntimeApi}
            // In edit mode, allow the widget to update its own props
            isEditing={currentMode === "edit"}
            onChange={currentMode === "edit" ? handleWidgetChange : undefined}
          />
        </div>
      </div>
    </GridStackAutoResizer>
  );

  return (
    <GridStackWidgetContext.Provider value={{ widget: { id } }}>
      {createPortal(content, widgetContainer)}
    </GridStackWidgetContext.Provider>
  );
}
