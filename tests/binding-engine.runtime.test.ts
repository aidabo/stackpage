import assert from "node:assert/strict";
import {
  applySelector,
  createBindingSelector,
  resolveArrayWithElementBindings,
  resolveBoundValue,
} from "../src/lib/utils/bindingEngine";
import { resolveDataBinding } from "../src/lib/components/useDataBinding";

function main() {
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

  console.log("binding-engine.runtime.test.ts: OK");
}

main();
