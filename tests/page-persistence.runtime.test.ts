import assert from "node:assert/strict";
import {
  applyPrefetchedDataToSource,
  collectBindingSourceIdsFromLayout,
  stripRuntimeDataFromSource,
  stripRuntimeBoundValuesFromLayout,
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

  const runtimeLayout = {
    children: [
      {
        id: "post-grid",
        content: JSON.stringify({
          name: "PostGridCard",
          props: {
            columns: 3,
            items: [{id: "post-1", lexical: "large runtime result"}],
            __bindings: {
              items: {sourceId: "posts", path: "items", selector: {type: "all"}},
            },
            __schema: {type: "object"},
            __interactions: [{id: "open-post", event: "select"}],
          },
        }),
        subGridOpts: {
          children: [
            {
              id: "tag-filter",
              content: JSON.stringify({
                name: "TagFilterBar",
                props: {
                  title: "Tags",
                  tagList: [{id: "tag-1", name: "News"}],
                  __bindings: {
                    tagList: {sourceId: "tags", path: "items"},
                  },
                },
              }),
            },
          ],
        },
      },
    ],
  };
  const persistedLayout = stripRuntimeBoundValuesFromLayout(runtimeLayout as any) as any;
  const postProps = JSON.parse(persistedLayout.children[0].content).props;
  const tagProps = JSON.parse(
    persistedLayout.children[0].subGridOpts.children[0].content,
  ).props;
  assert.equal("items" in postProps, false);
  assert.equal("tagList" in tagProps, false);
  assert.equal(postProps.columns, 3);
  assert.equal(postProps.__bindings.items.sourceId, "posts");
  assert.deepEqual(postProps.__schema, {type: "object"});
  assert.equal(postProps.__interactions[0].id, "open-post");
  assert.equal(tagProps.title, "Tags");
  assert.equal(tagProps.__bindings.tagList.sourceId, "tags");
  assert.equal(
    "items" in JSON.parse(runtimeLayout.children[0].content).props,
    true,
    "sanitizing must not mutate the live runtime layout",
  );

  const elementBindingLayout = [
    {
      id: "profile-card",
      content: JSON.stringify({
        name: "ProfileCard",
        props: {
          items: [{name: "Runtime user", role: "editor"}],
          profileTitle: "Editorial team",
          __bindings: {
            "items[].name": {sourceId: "users", path: "items[].name"},
          },
        },
      }),
    },
    {
      id: "static-card",
      content: JSON.stringify({
        name: "StaticCard",
        props: {items: [{title: "Intentionally saved"}], columns: 2},
      }),
    },
    {id: "malformed", content: "{not-json"},
  ];
  const persistedElementLayout = stripRuntimeBoundValuesFromLayout(
    elementBindingLayout as any,
  ) as any[];
  const profileProps = JSON.parse(persistedElementLayout[0].content).props;
  const staticProps = JSON.parse(persistedElementLayout[1].content).props;
  assert.equal("items" in profileProps, false);
  assert.equal(profileProps.profileTitle, "Editorial team");
  assert.deepEqual(staticProps.items, [{title: "Intentionally saved"}]);
  assert.equal(persistedElementLayout[2].content, "{not-json");

  console.log("page-persistence.runtime.test.ts: OK");
}

main();
