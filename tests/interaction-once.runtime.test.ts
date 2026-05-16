import assert from "node:assert/strict";
import {
  executeInteractionRules,
  type EmitComponentEventPayload,
  type InteractionRuntime,
  type InteractionRule,
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
  const sharedState: Record<string, any> = {};
  const emitted: EmitComponentEventPayload[] = [];

  const runtime: InteractionRuntime = {
    getWidgetProps: () => undefined,
    updateWidgetProps: () => undefined,
    setSharedState: (path: string, value: any) => {
      sharedState[path] = value;
    },
    emitEvent: (payload) => {
      emitted.push(payload);
    },
  };

  const rules: InteractionRule[] = [
    {
      id: "bootstrap-flag",
      event: "page:init",
      action: "set-shared-state",
      targetPath: "page.bootstrap",
      value: true,
      once: true,
      enabled: true,
    },
    {
      id: "chain-next",
      event: "page:init",
      action: "emit-event",
      targetPath: "page:next",
      once: true,
      enabled: true,
    },
  ];

  const firstRun = executeInteractionRules(
    {
      sourceWidgetId: "__page__",
      eventName: "page:init",
      payload: { sentAt: "2026-05-03T00:00:00.000Z" },
      rules,
      runtimeScopeId: "page:alpha",
    },
    runtime
  );

  const secondRun = executeInteractionRules(
    {
      sourceWidgetId: "__page__",
      eventName: "page:init",
      payload: { sentAt: "2026-05-03T00:00:01.000Z" },
      rules,
      runtimeScopeId: "page:alpha",
    },
    runtime
  );

  const thirdRun = executeInteractionRules(
    {
      sourceWidgetId: "__page__",
      eventName: "page:init",
      payload: { sentAt: "2026-05-03T00:00:02.000Z" },
      rules,
      runtimeScopeId: "page:beta",
    },
    runtime
  );

  assert.equal(firstRun, 2);
  assert.equal(secondRun, 0);
  assert.equal(thirdRun, 2);
  await flushMicrotasks();
  assert.equal(sharedState["page.bootstrap"], true);
  assert.equal(emitted.length, 2);
  assert.equal(emitted[0].runtimeScopeId, "page:alpha");
  assert.equal(emitted[1].runtimeScopeId, "page:beta");
  assert.equal(emitted[0].eventName, "page:next");

  console.log("interaction-once.runtime.test.ts: OK");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
