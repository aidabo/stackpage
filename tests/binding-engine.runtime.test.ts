import assert from "node:assert/strict";
import {
  applySelector,
  createBindingSelector,
  resolveArrayWithElementBindings,
  resolveBoundValue,
} from "../src/lib/utils/bindingEngine";

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

  console.log("binding-engine.runtime.test.ts: OK");
}

main();
