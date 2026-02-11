import React, { useState, ReactNode, useCallback, useRef, useEffect } from "react";
import { StackPageContext, SourceData } from "./StackPageContext";
import { get, set } from "../utils/get";
import {
  createComponentEventBus,
  EmitComponentEventPayload,
  executeInteractionRules,
  normalizeInteractionRules,
} from "../utils/componentCommunication";
import { debugLog } from "../utils/debug";

interface StackPageProviderProps {
  children: ReactNode;
}

export const StackPageProvider: React.FC<StackPageProviderProps> = ({
  children,
}) => {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  );
  const [selectedInstance, setSelectedInstance] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<
    "components" | "properties" | "page" | "list" | "datasource" | "search"
  >("components");
  const [widgetProps, setWidgetProps] = useState<Map<string, object>>(
    new Map()
  );
  const widgetPropsRef = useRef<Map<string, object>>(new Map());
  const widgetSnapshotsRef = useRef<Map<string, Record<string, any>>>(new Map());

  const [attributes, setPageAttributes] = useState({
    type: "page",
    title: "untitled page",
    excerpt: "",
    image: "",
    status: "draft" as "draft" | "published",
    published_at: null as Date | null,
    margin: "0px",
    padding: "0px",
    background: "#ffffff",
    showMenubar: true,
  });

  const [source, setSource] = useState<SourceData>({
    lists: [],
    dataSources: [],
  });
  const [sharedState, setSharedStateStore] = useState<Record<string, any>>({});
  const sharedStateRef = useRef<Record<string, any>>({});
  const eventBusRef = useRef(createComponentEventBus());

  useEffect(() => {
    widgetPropsRef.current = widgetProps;
  }, [widgetProps]);

  useEffect(() => {
    sharedStateRef.current = sharedState;
  }, [sharedState]);

  const updateWidgetProps = useCallback((widgetId: string, props: object) => {
    debugLog("[StackPageProvider] Updating widget props for:", widgetId, props);
    setWidgetProps((prev) => {
      const next = new Map(prev).set(widgetId, props);
      widgetPropsRef.current = next;
      return next;
    });
  }, []);

  const registerWidgetSnapshot = useCallback(
    (widgetId: string, props: Record<string, any>) => {
      widgetSnapshotsRef.current.set(widgetId, props || {});
    },
    []
  );

  const getWidgetSnapshot = useCallback((widgetId: string) => {
    return widgetSnapshotsRef.current.get(widgetId);
  }, []);

  const setSharedState = useCallback((path: string, value: any) => {
    if (!path) return;
    setSharedStateStore((prev) => {
      const next = { ...prev };
      set(next, path, value);
      sharedStateRef.current = next;
      return next;
    });
  }, []);

  const getSharedState = useCallback((path: string, defaultValue?: any) => {
    if (!path) return defaultValue;
    return get(sharedStateRef.current, path, defaultValue);
  }, []);

  const emitComponentEvent = useCallback(
    (payload: EmitComponentEventPayload) => {
      eventBusRef.current.emit(payload.eventName, payload.payload, {
        sourceWidgetId: payload.sourceWidgetId,
        eventName: payload.eventName,
      });

      const sourceSnapshot = widgetSnapshotsRef.current.get(payload.sourceWidgetId);
      const rules = normalizeInteractionRules(
        payload.rules ?? sourceSnapshot?.__interactions
      );
      if (!rules.length) return;

      executeInteractionRules(
        { ...payload, rules },
        {
          getWidgetProps: (widgetId: string) =>
            widgetSnapshotsRef.current.get(widgetId) ||
            (widgetPropsRef.current.get(widgetId) as Record<string, any> | undefined),
          updateWidgetProps: (widgetId: string, props: Record<string, any>) => {
            widgetSnapshotsRef.current.set(widgetId, props);
            updateWidgetProps(widgetId, props);
          },
          setSharedState,
          emitEvent: (nextPayload) => {
            emitComponentEvent(nextPayload);
          },
          emitRequest: ({
            sourceWidgetId,
            eventName,
            payload: requestPayload,
            responseEvent,
            timeoutMs,
            rules: requestRules,
            depth: requestDepth = 0,
          }) =>
            new Promise((resolve, reject) => {
              const requestId = `${sourceWidgetId}:${Date.now()}:${Math.random()
                .toString(36)
                .slice(2)}`;
              const effectiveResponseEvent =
                responseEvent || `${eventName}:completed`;
              const effectiveTimeout = timeoutMs ?? 5000;
              let settled = false;

              const unsubscribe = eventBusRef.current.subscribe(
                effectiveResponseEvent,
                (responsePayload) => {
                  if (settled) return;
                  if (
                    responsePayload?.__requestId &&
                    responsePayload.__requestId !== requestId
                  ) {
                    return;
                  }
                  settled = true;
                  clearTimeout(timer);
                  unsubscribe();
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

              const timer = setTimeout(() => {
                if (settled) return;
                settled = true;
                unsubscribe();
                reject(
                  new Error(
                    `Timeout waiting for ${effectiveResponseEvent} after ${effectiveTimeout}ms`
                  )
                );
              }, effectiveTimeout);

              const wrappedPayload =
                requestPayload &&
                typeof requestPayload === "object" &&
                !Array.isArray(requestPayload)
                  ? {
                      ...requestPayload,
                      __requestId: requestId,
                      sentAt:
                        requestPayload.sentAt || new Date().toISOString(),
                    }
                  : {
                      value: requestPayload,
                      __requestId: requestId,
                      sentAt: new Date().toISOString(),
                    };

              emitComponentEvent({
                sourceWidgetId,
                eventName,
                payload: wrappedPayload,
                rules: requestRules,
                depth: requestDepth,
              });
            }),
        }
      );
    },
    [setSharedState, updateWidgetProps]
  );

  const unsubscribeComponentEvent = useCallback(
    (eventName: string, subscriptionId: string) => {
      eventBusRef.current.unsubscribe(eventName, subscriptionId);
    },
    []
  );

  const subscribeComponentEvent = useCallback(
    (
      eventName: string,
      handler: (payload: any, meta: { sourceWidgetId: string; eventName: string }) => void
    ) => {
      return eventBusRef.current.subscribe(eventName, handler);
    },
    []
  );

  const value = {
    selectedComponent,
    setSelectedComponent,
    selectedInstance,
    setSelectedInstance,
    attributes,
    setPageAttributes,
    source,
    setSource,
    activeTab,
    setActiveTab,
    widgetProps,
    updateWidgetProps,
    registerWidgetSnapshot,
    getWidgetSnapshot,
    sharedState,
    setSharedState,
    getSharedState,
    emitComponentEvent,
    subscribeComponentEvent,
    unsubscribeComponentEvent,
  };

  return (
    <StackPageContext.Provider value={value}>
      {children}
    </StackPageContext.Provider>
  );
};
