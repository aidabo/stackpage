import assert from "node:assert/strict";
import {
  applySelector,
  createBindingSelector,
  resolveArrayWithElementBindings,
  resolveBoundValue,
} from "../src/lib/utils/bindingEngine";
import { resolveDataBinding } from "../src/lib/components/useDataBinding";
import { normalizeSchemaStringNulls } from "../src/lib/utils/schemaValueNormalization";

function main() {
  assert.deepEqual(
    normalizeSchemaStringNulls(
      {
        preview_url: null,
        resolution: null,
        items: [{ title: null, page_count: null }],
      },
      {
        type: "object",
        properties: {
          preview_url: { type: "string" },
          resolution: { type: "object" },
          items: {
            type: "array",
            items: {
              type: "object",
              properties: {
                title: { type: "string" },
                page_count: { type: "number" },
              },
            },
          },
        },
      },
    ),
    {
      preview_url: "",
      resolution: null,
      items: [{ title: "", page_count: null }],
    },
  );

  const nullableBindingResolution = resolveDataBinding(
    {
      editions: [],
      __schema: {
        type: "object",
        properties: {
          editions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                preview_url: { type: "string" },
                page_count: { type: "number" },
              },
            },
          },
        },
      },
      __bindings: {
        editions: {
          sourceId: "gallery",
          path: "items",
          targetType: "array",
          selector: { type: "all" },
        },
      },
    },
    [
      {
        id: "gallery",
        data: {
          items: [{ preview_url: null, page_count: null }],
        },
      },
    ],
  );
  assert.deepEqual(nullableBindingResolution.resolvedProps.editions, [
    { preview_url: "", page_count: null },
  ]);

  const sourceData = {
    user: { id: "u1", name: "Ada" },
    users: [
      { id: "u1", name: "Ada", role: "admin" },
      { id: "u2", name: "Lin", role: "editor" },
    ],
  };

  assert.equal(
    resolveBoundValue(sourceData, {
      sourceId: "profile",
      path: "$.user.name",
    }),
    "Ada",
  );

  assert.deepEqual(
    applySelector(sourceData.users, { type: "id", value: "u2" }),
    [{ id: "u2", name: "Lin", role: "editor" }],
  );

  assert.deepEqual(
    createBindingSelector({
      selectedRecord: sourceData.users[0],
      selectedRecordIndex: 0,
      selectedItems: [0, 1],
      targetSchemaType: "array",
      records: sourceData.users,
    }),
    { type: "ids", value: ["u1", "u2"] },
  );

  assert.deepEqual(
    resolveArrayWithElementBindings({
      arrayProp: "users",
      arrayBinding: {
        sourceId: "profile",
        path: "$.users",
        targetType: "array",
        selector: { type: "all" },
      },
      elementBindings: {
        "users[].name": {
          sourceId: "profile",
          path: "name",
        },
      },
      ignoredFields: [],
      sourceData,
    }),
    [{ name: "Ada" }, { name: "Lin" }],
  );

  assert.deepEqual(
    resolveArrayWithElementBindings({
      arrayProp: "users",
      arrayBinding: {
        sourceId: "authors-source",
        path: "items",
        targetType: "array",
        selector: { type: "all" },
      },
      elementBindings: {
        "users[].name": {
          sourceId: "authors-source",
          path: "items[].name",
        },
        "users[].image": {
          sourceId: "authors-source",
          path: "items[].profile_image",
        },
      },
      ignoredFields: [],
      sourceData: {
        items: [
          { id: "a1", name: "Ada", profile_image: "https://example.com/ada.jpg" },
          { id: "a2", name: "Lin", profile_image: "https://example.com/lin.jpg" },
        ],
      },
    }),
    [
      { name: "Ada", image: "https://example.com/ada.jpg" },
      { name: "Lin", image: "https://example.com/lin.jpg" },
    ],
  );

  assert.deepEqual(
    resolveDataBinding(
      {
        tagList: [],
        __bindings: {
          tagList: {
            sourceId: "host-tags-list",
            path: "items",
            targetType: "array",
            selector: { type: "all" },
          },
          "tagList[].label": {
            sourceId: "host-tags-list",
            path: "items[].name",
          },
          "tagList[].slug": {
            sourceId: "host-tags-list",
            path: "items[].slug",
          },
        },
      },
      [
        {
          id: "saved-tags-source",
          hostFunctionId: "host-tags-list",
          data: {
            source_id: "host-tags-list",
            items: [
              { name: "#estate-property", slug: "hash-estate-property" },
            ],
          },
        },
      ],
    ).resolvedProps.tagList,
    [
      {
        label: "#estate-property",
        slug: "hash-estate-property",
      },
    ],
  );

  assert.deepEqual(
    resolveArrayWithElementBindings({
      arrayProp: "tagList",
      arrayBinding: {
        sourceId: "tags-source",
        path: "items",
        targetType: "array",
        selector: { type: "all" },
      },
      elementBindings: {},
      ignoredFields: ["tagList[].label", "tagList[].link"],
      existingArray: [
        {
          id: "t1",
          label: "Manual label",
          link: "/custom/tag/",
        },
      ],
      sourceData: {
        items: [
          { id: "t1", name: "Source name", slug: "source-slug" },
        ],
      },
    }),
    [
      {
        id: "t1",
        name: "Source name",
        slug: "source-slug",
        label: "Manual label",
        link: "/custom/tag/",
      },
    ],
  );

  const pageLoadResolution = resolveDataBinding(
    {
      tagList: [
        { id: "t1", label: "Manual label", link: "/custom/tag/" },
      ],
      __bindings: {
        tagList: {
          sourceId: "tags-source",
          path: "items",
          targetType: "array",
          selector: { type: "all" },
        },
      },
      __ignoredMappings: ["tagList[].label", "tagList[].link"],
      __schema: {
        properties: {
          tagList: {
            items: {
              properties: {
                label: { "x-binding-default-from": "name" },
                link: {
                  "x-binding-default-from": "slug",
                  "x-binding-default-template": "/tag/{value}/",
                },
              },
            },
          },
        },
      },
    },
    [
      {
        id: "tags-source",
        data: {
          items: [{ id: "t1", name: "Source name", slug: "source-slug" }],
        },
      },
    ],
  );

  assert.deepEqual(pageLoadResolution.resolvedProps.tagList, [
    {
      id: "t1",
      name: "Source name",
      slug: "source-slug",
      label: "Manual label",
      link: "/custom/tag/",
    },
  ]);

  const defaultResolution = resolveDataBinding(
    {
      tagList: [{}],
      __bindings: {
        tagList: {
          sourceId: "tags-source",
          path: "items",
          targetType: "array",
          selector: { type: "all" },
        },
      },
      __ignoredMappings: ["tagList[].label", "tagList[].link"],
      __schema: {
        properties: {
          tagList: {
            items: {
              properties: {
                label: { "x-binding-default-from": "name" },
                link: {
                  "x-binding-default-from": "slug",
                  "x-binding-default-template": "/tag/{value}/",
                },
              },
            },
          },
        },
      },
    },
    [
      {
        id: "tags-source",
        data: {
          items: [{ id: "t1", name: "#estate-property", slug: "hash-estate-property" }],
        },
      },
    ],
  );

  assert.deepEqual(defaultResolution.resolvedProps.tagList, [
    {
      id: "t1",
      name: "#estate-property",
      slug: "hash-estate-property",
      label: "#estate-property",
      link: "/tag/hash-estate-property/",
    },
  ]);

  console.log("binding-engine.runtime.test.ts: OK");
}

main();
