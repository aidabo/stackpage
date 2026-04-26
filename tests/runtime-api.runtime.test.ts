import assert from "node:assert/strict";
import {
  createComponentEventBus,
  createStackPageRuntimeApi,
} from "../src/lib/utils/componentCommunication";

async function main() {
  const bus = createComponentEventBus();
  const sharedState: Record<string, any> = {};
  const events: Array<{ eventName: string; payload: any }> = [];

  const runtime = createStackPageRuntimeApi({
    widgetId: "widget-a",
    emitComponentEvent: ({ eventName, payload }) => {
      events.push({ eventName, payload });
      bus.emit(eventName, payload, {
        sourceWidgetId: "widget-a",
        eventName,
      });
    },
    subscribeComponentEvent: (eventName, handler) => bus.subscribe(eventName, handler),
    setSharedState: (path, value) => {
      sharedState[path] = value;
    },
    getSharedState: (path, defaultValue) =>
      sharedState[path] === undefined ? defaultValue : sharedState[path],
  });

  const subEvents: any[] = [];
  const unsubscribe = runtime.api.subscribe("custom-event", (payload) => {
    subEvents.push(payload);
  });

  bus.emit("custom-event", { hello: "world" }, {
    sourceWidgetId: "widget-a",
    eventName: "custom-event",
  });
  assert.deepEqual(subEvents, [{ hello: "world" }]);

  runtime.api.unsubscribe(unsubscribe);
  bus.emit("custom-event", { hello: "again" }, {
    sourceWidgetId: "widget-a",
    eventName: "custom-event",
  });
  assert.deepEqual(subEvents, [{ hello: "world" }]);

  runtime.api.setState("page.keyword", "stackpage");
  assert.equal(runtime.api.getState("page.keyword"), "stackpage");
  runtime.api.setPageState?.("page.selectedId", "item-1");
  assert.equal(runtime.api.getPageState?.("page.selectedId"), "item-1");

  bus.subscribe("ping", (payload) => {
    bus.emit(
      "ping:completed",
      {
        result: `pong:${payload.label}`,
        __requestId: payload.__requestId,
      },
      { sourceWidgetId: "widget-a", eventName: "ping:completed" }
    );
  });

  const result = await runtime.api.emitWithAck("ping", { label: "demo" });
  assert.equal(result, "pong:demo");
  assert.equal(events[0].eventName, "ping");
  assert.equal(typeof events[0].payload.__requestId, "string");

  runtime.disposeTrackedSubscriptions();
  console.log("runtime-api.runtime.test.ts: OK");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
