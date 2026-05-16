import assert from "node:assert/strict";
import {
  componentPropsProvider,
  getFoldReceiverMetrics,
} from "../src/demo/components/MyComponents";
import { executeInteractionRules } from "../src/lib/utils/componentCommunication";

const flushMicrotasks = () =>
  new Promise<void>((resolve) => {
    if (typeof queueMicrotask === "function") {
      queueMicrotask(resolve);
      return;
    }
    setTimeout(resolve, 0);
  });

async function main() {
  const componentProps = componentPropsProvider();
  const summaryConfig = componentProps.DemoPostFoldSummary;
  const tipsConfig = componentProps.DemoPostFoldTips;
  const navigatorConfig = componentProps.DemoPostFoldNavigator;
  const receiverConfig = componentProps.DemoPostFoldReceiver;

  assert.equal(summaryConfig.selectedIdKey, "content.review.selectedId");
  assert.equal(summaryConfig.selectedTitleKey, "content.review.selectedTitle");
  assert.equal(tipsConfig.title, "Review tips");
  assert.match(tipsConfig.description, /helper card/i);
  assert.equal(Array.isArray(navigatorConfig.__interactions), true);
  assert.equal(navigatorConfig.__interactions.length, 3);
  assert.equal(receiverConfig.selectedIdKey, "content.review.selectedId");
  assert.match(receiverConfig.description, /content-style receiver card/i);
  assert.equal(receiverConfig.title, "Content snapshot");

  const previewMetrics = getFoldReceiverMetrics({
    selectedId: "post-1",
    selectedItem: {
      id: "post-1",
      title: "Building a calm page builder",
      category: "Architecture",
    },
    selectedIdKey: "content.review.selectedId",
    historyLength: 2,
  });
  assert.equal(previewMetrics.syncCount, 2);
  assert.equal(previewMetrics.routeLabel, "fold-select → shared state → receiver");
  assert.equal(
    previewMetrics.transitionLabel,
    "fold-select → set-shared-state → emit-event"
  );
  assert.match(previewMetrics.lastActionLabel, /Building a calm page builder/);

  const sharedState: Record<string, any> = {};
  const emitted: Array<{ eventName: string; payload: any }> = [];

  const executed = executeInteractionRules(
    {
      sourceWidgetId: "widget-fold-navigator",
      eventName: "fold-select",
      payload: {
        id: "post-3",
        title: "Form submission with confirmation",
        category: "Form",
        excerpt: "Ask first, send second, then show the receiver response.",
      },
      rules: navigatorConfig.__interactions,
    },
    {
      setSharedState: (path, value) => {
        sharedState[path] = value;
      },
      emitEvent: ({ eventName, payload }) => {
        emitted.push({ eventName, payload });
      },
      getWidgetProps: () => undefined,
      updateWidgetProps: () => undefined,
    }
  );

  assert.equal(executed, 3);
  await flushMicrotasks();
  assert.equal(sharedState["content.review.selectedId"], "post-3");
  assert.equal(sharedState["content.review.selectedTitle"], "Form submission with confirmation");
  assert.equal(emitted.length, 1);
  assert.equal(emitted[0].eventName, "demo:fold:post:selected");
  assert.equal(emitted[0].payload.id, "post-3");

  console.log("fold-post-demo.runtime.test.ts: OK");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
