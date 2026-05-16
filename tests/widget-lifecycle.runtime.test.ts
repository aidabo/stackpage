import assert from "node:assert/strict";
import {
  bindStackPageWidgetLifecycle,
  createComponentEventBus,
} from "../src/lib/utils/componentCommunication";

async function main() {
  const bus = createComponentEventBus();
  const events: Array<{ eventName: string; payload: any; rules: any[] | undefined }> = [];
  const observed: Array<{ event: string; payload: any; sourceWidgetId: string }> =
    [];
  const calls: string[] = [];

  bus.subscribe("widget:init", (payload, meta) => {
    observed.push({
      event: meta.eventName,
      payload,
      sourceWidgetId: meta.sourceWidgetId,
    });
  });
  bus.subscribe("widget:unmount", (payload, meta) => {
    observed.push({
      event: meta.eventName,
      payload,
      sourceWidgetId: meta.sourceWidgetId,
    });
  });

  const cleanup = bindStackPageWidgetLifecycle(
    {
      emitComponentEvent: ({ eventName, payload, rules }) => {
        events.push({ eventName, payload, rules });
        bus.emit(eventName, payload, {
          sourceWidgetId: "widget-a",
          eventName,
        });
      },
      disposeTrackedSubscriptions: () => {
        calls.push("dispose");
      },
    },
    {
      sourceWidgetId: "widget-a",
      componentName: "Lifecycle Probe",
      mode: "edit",
      rules: [
        {
          id: "rule-1",
          event: "widget:init",
          action: "set-shared-state",
          targetPath: "demo.lifecycle.initCount",
          value: 1,
          enabled: true,
        },
      ],
    }
  );

  assert.equal(events.length, 1);
  assert.equal(events[0].eventName, "widget:init");
  assert.equal(events[0].payload.lifecycle, "widget:init");
  assert.equal(events[0].payload.widgetId, "widget-a");
  assert.equal(events[0].payload.componentName, "Lifecycle Probe");
  assert.equal(events[0].payload.mode, "edit");
  assert.equal(typeof events[0].payload.sentAt, "string");
  assert.equal(events[0].payload.sentAt.length > 0, true);
  assert.equal(Array.isArray(events[0].rules), true);
  assert.equal(events[0].rules?.length, 1);

  assert.equal(observed.length, 1);
  assert.equal(observed[0].event, "widget:init");
  assert.equal(observed[0].sourceWidgetId, "widget-a");
  assert.equal(observed[0].payload.lifecycle, "widget:init");

  cleanup();

  assert.equal(events.length, 2);
  assert.equal(events[1].eventName, "widget:unmount");
  assert.equal(events[1].payload.lifecycle, "widget:unmount");
  assert.equal(observed.length, 2);
  assert.equal(observed[1].event, "widget:unmount");
  assert.equal(calls.length, 1);
  assert.equal(calls[0], "dispose");

  console.log("widget-lifecycle.runtime.test.ts: OK");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
