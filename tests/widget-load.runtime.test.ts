import assert from "node:assert/strict";
import {
  createStackPageWidgetLoadTracker,
} from "../src/lib/utils/componentCommunication";
import { resolveDataBinding } from "../src/lib/components/useDataBinding";

function main() {
  const tracker = createStackPageWidgetLoadTracker();

  const unresolved = resolveDataBinding(
    {
      title: "Widget",
      __bindings: {
        title: {
          sourceId: "profile",
          path: "$.post.title",
        },
      },
    },
    []
  );

  assert.equal(unresolved.hasResolvedBindings, false);
  assert.equal(unresolved.resolvedBindingCount, 0);
  assert.equal(tracker.hasLoaded(), false);
  assert.equal(tracker.maybeEmitLoad({ hasResolvedBindings: unresolved.hasResolvedBindings }), false);
  assert.equal(tracker.hasLoaded(), false);

  const readyOnce = resolveDataBinding(
    {
      title: "Widget",
      __bindings: {
        title: {
          sourceId: "profile",
          path: "$.post.title",
        },
      },
    },
    [
      {
        id: "profile",
        data: {
          post: {
            title: "Loaded title",
          },
        },
      },
    ]
  );

  assert.equal(readyOnce.hasResolvedBindings, true);
  assert.equal(readyOnce.resolvedBindingCount, 1);
  assert.equal(readyOnce.resolvedProps.title, "Loaded title");
  assert.equal(tracker.maybeEmitLoad({ hasResolvedBindings: readyOnce.hasResolvedBindings }), true);
  assert.equal(tracker.hasLoaded(), true);
  assert.equal(tracker.maybeEmitLoad({ hasResolvedBindings: true }), false);

  tracker.hasLoaded();

  const remountTracker = createStackPageWidgetLoadTracker();
  assert.equal(remountTracker.hasLoaded(), false);
  assert.equal(remountTracker.maybeEmitLoad({ hasResolvedBindings: true }), true);
  assert.equal(remountTracker.hasLoaded(), true);

  console.log("widget-load.runtime.test.ts: OK");
}

main();
