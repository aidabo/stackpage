import assert from "node:assert/strict";
import { collectPageInteractions } from "../src/lib/utils/pageInteractions";

function widget(id: string, name: string, interactions?: any[]) {
  return {
    id,
    content: JSON.stringify({
      name,
      props: interactions ? { __interactions: interactions } : {},
    }),
  };
}

function main() {
  const layout = {
    children: [
      widget("w-search", "SearchBar", [
        { id: "s1", event: "search", action: "set-shared-state", targetPath: "estate.keyword", valueFrom: "$.keyword" },
        { id: "s2", event: "search", action: "emit-event", targetPath: "estate:search:changed", valueFrom: "$" },
      ]),
      widget("w-grid", "PropertyGrid", [
        { id: "g1", event: "select", action: "set-prop", targetWidgetId: "w-detail", targetPath: "selectedPropertyId", valueFrom: "$.id" },
      ]),
      // a subgrid nesting an inquiry component
      {
        id: "w-sub",
        subGridOpts: {
          children: [
            widget("w-inquiry", "InquiryForm", [
              { id: "i1", event: "estate:inquiry:submitted", action: "emit-request", targetPath: "estate:inquiry:send" },
            ]),
          ],
        },
      },
      widget("w-plain", "Text"), // no interactions -> excluded
    ],
  };

  const summary = collectPageInteractions(layout as any);

  // 3 components have rules (search, grid, inquiry); plain Text excluded.
  assert.equal(summary.widgets.length, 3);
  assert.deepEqual(
    summary.widgets.map((w) => w.componentName).sort(),
    ["InquiryForm", "PropertyGrid", "SearchBar"]
  );

  // total rules = 2 + 1 + 1
  assert.equal(summary.totalRules, 4);

  // reacted events (rule.event), distinct + sorted
  assert.deepEqual(summary.reactedEvents, [
    "estate:inquiry:submitted",
    "search",
    "select",
  ]);

  // emitted events (emit-event / emit-request targetPath)
  assert.deepEqual(summary.emittedEvents, [
    "estate:inquiry:send",
    "estate:search:changed",
  ]);

  // state writes (set-shared-state targetPath)
  assert.deepEqual(summary.stateWrites, ["estate.keyword"]);

  // subgrid nesting was traversed
  assert.equal(
    summary.widgets.some((w) => w.widgetId === "w-inquiry"),
    true
  );

  // empty / malformed layouts
  assert.deepEqual(collectPageInteractions(undefined).widgets, []);
  assert.equal(collectPageInteractions({ children: [] } as any).totalRules, 0);

  console.log("page-interactions.runtime.test.ts: OK");
}

main();
