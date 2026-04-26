import assert from "node:assert/strict";
import {
  applyPrefetchedDataToSource,
  collectBindingSourceIdsFromLayout,
  stripRuntimeDataFromSource,
} from "../src/lib/utils/pagePersistence";

function main() {
  const originalSource = {
    lists: [{ id: "list-1", name: "Main", description: "Main list", items: [] }],
    dataSources: [
      {
        id: "posts",
        name: "Posts",
        type: "api",
        endpoint: "/api/posts",
        method: "GET",
        headers: {},
        refreshInterval: 0,
        data: { items: [{ id: "p1", title: "Hello" }] },
      },
    ],
  };

  const persistedSource = stripRuntimeDataFromSource(originalSource);
  assert.deepEqual(persistedSource, {
    lists: originalSource.lists,
    dataSources: [
      {
        id: "posts",
        name: "Posts",
        type: "api",
        endpoint: "/api/posts",
        method: "GET",
        headers: {},
        refreshInterval: 0,
      },
    ],
  });
  assert.equal("data" in originalSource.dataSources[0], true);
  assert.equal("data" in persistedSource!.dataSources[0], false);

  const runtimeSource = applyPrefetchedDataToSource(persistedSource, [
    {
      id: "posts",
      result: {
        success: true,
        data: { items: [{ id: "p2", title: "World" }] },
      },
    },
  ]);

  assert.deepEqual(runtimeSource, {
    lists: originalSource.lists,
    dataSources: [
      {
        id: "posts",
        name: "Posts",
        type: "api",
        endpoint: "/api/posts",
        method: "GET",
        headers: {},
        refreshInterval: 0,
        data: { items: [{ id: "p2", title: "World" }] },
      },
    ],
  });
  assert.equal("data" in persistedSource!.dataSources[0], false);

  const layout = [
    {
      id: "widget-1",
      content: JSON.stringify({
        name: "Text",
        props: {
          __bindings: {
            title: { sourceId: "posts", path: "$.title" },
          },
        },
      }),
      subGridOpts: {
        children: [
          {
            id: "widget-2",
            content: JSON.stringify({
              name: "Card",
              props: {
                __bindings: {
                  items: { sourceId: "users", path: "$.items" },
                },
              },
            }),
          },
        ],
      },
    },
  ];

  assert.deepEqual(
    Array.from(collectBindingSourceIdsFromLayout(layout as any)).sort(),
    ["posts", "users"],
  );

  console.log("page-persistence.runtime.test.ts: OK");
}

main();
