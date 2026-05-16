import assert from "node:assert/strict";
import {
  createStackPageLifecyclePayload,
  createStackPagePageLifecycleTracker,
} from "../src/lib/utils/componentCommunication";

function main() {
  const tracker = createStackPagePageLifecycleTracker();

  assert.equal(tracker.beginPage("page-1"), true);
  assert.equal(tracker.beginPage("page-1"), false);
  assert.equal(tracker.getActiveLoadCycle("page-1"), 0);

  const firstLoadCycle = tracker.beginLoadCycle("page-1");
  assert.equal(firstLoadCycle, 1);
  assert.equal(tracker.getActiveLoadCycle("page-1"), 1);
  assert.equal(tracker.markPageLoaded("page-1", firstLoadCycle), true);
  assert.equal(tracker.markPageLoaded("page-1", firstLoadCycle), false);
  assert.equal(tracker.canEmitReady("page-1", firstLoadCycle), false);

  tracker.markGridReady("page-1", firstLoadCycle);
  assert.equal(tracker.canEmitReady("page-1", firstLoadCycle), true);
  assert.equal(tracker.markPageReady("page-1", firstLoadCycle), true);
  assert.equal(tracker.canEmitReady("page-1", firstLoadCycle), false);
  assert.equal(tracker.markPageReady("page-1", firstLoadCycle), false);

  const secondLoadCycle = tracker.beginLoadCycle("page-1");
  assert.equal(secondLoadCycle, 2);
  tracker.markGridReady("page-1", secondLoadCycle);
  assert.equal(tracker.canEmitReady("page-1", secondLoadCycle), false);
  assert.equal(tracker.markPageLoaded("page-1", secondLoadCycle), true);
  assert.equal(tracker.canEmitReady("page-1", secondLoadCycle), true);
  assert.equal(tracker.markPageReady("page-1", secondLoadCycle), true);

  assert.equal(tracker.beginPage("page-2"), true);
  assert.equal(tracker.getActiveLoadCycle("page-1"), 0);
  assert.equal(tracker.getActiveLoadCycle("page-2"), 0);

  const payload = createStackPageLifecyclePayload({
    widgetId: "__page__",
    componentName: "StackPage",
    lifecycle: "page:ready",
    mode: "view",
    pageId: "page-2",
    pageTitle: "Demo page",
    resolvedBindingCount: 3,
    totalBindingCount: 5,
  });

  assert.deepEqual(payload, {
    widgetId: "__page__",
    componentName: "StackPage",
    lifecycle: "page:ready",
    mode: "view",
    sentAt: payload.sentAt,
    pageId: "page-2",
    pageTitle: "Demo page",
    resolvedBindingCount: 3,
    totalBindingCount: 5,
  });

  console.log("page-lifecycle.runtime.test.ts: OK");
}

main();
