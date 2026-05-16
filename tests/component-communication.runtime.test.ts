import assert from "node:assert/strict";
import {
  createComponentEventBus,
  executeInteractionRules,
} from "../src/lib/utils/componentCommunication";

const flushMicrotasks = () =>
  new Promise<void>((resolve) => {
    if (typeof queueMicrotask === "function") {
      queueMicrotask(resolve);
      return;
    }
    setTimeout(resolve, 0);
  });

async function main() {
  const bus = createComponentEventBus();
  const events: Array<{ event: string; payload: any }> = [];
  const sharedState: Record<string, any> = {};
  const widgetProps = new Map<string, Record<string, any>>([
    ["widget-a", { title: "Before" }],
  ]);

  bus.subscribe("widget-updated", (payload, meta) => {
    events.push({ event: meta.eventName, payload });
  });

  const executed = executeInteractionRules(
    {
      sourceWidgetId: "widget-a",
      eventName: "change",
      payload: { title: "After", selectedId: "u1" },
      rules: [
        {
          id: "rule-1",
          event: "change",
          action: "set-prop",
          targetWidgetId: "$self",
          targetPath: "title",
          valueFrom: "$.title",
        },
        {
          id: "rule-2",
          event: "change",
          action: "set-shared-state",
          targetPath: "selectedId",
          valueFrom: "$.selectedId",
        },
        {
          id: "rule-3",
          event: "change",
          action: "emit-event",
          targetPath: "widget-updated",
          valueFrom: "$",
        },
      ],
    },
    {
      getWidgetProps: (widgetId) => widgetProps.get(widgetId),
      updateWidgetProps: (widgetId, props) => {
        widgetProps.set(widgetId, props);
      },
      setSharedState: (path, value) => {
        sharedState[path] = value;
      },
      emitEvent: (payload) => {
        bus.emit(payload.eventName, payload.payload, {
          sourceWidgetId: payload.sourceWidgetId,
          eventName: payload.eventName,
        });
      },
    },
  );

  assert.equal(executed, 3);
  await flushMicrotasks();
  assert.deepEqual(widgetProps.get("widget-a"), { title: "After" });
  assert.equal(sharedState.selectedId, "u1");
  assert.equal(events.length, 1);
  assert.equal(events[0].event, "widget-updated");
  assert.deepEqual(events[0].payload, { title: "After", selectedId: "u1" });

  console.log("component-communication.runtime.test.ts: OK");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
