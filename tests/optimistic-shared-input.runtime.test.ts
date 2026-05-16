import assert from "node:assert/strict";
import { reconcileOptimisticSharedStringInputState } from "../src/demo/components/MyComponents";

const same = reconcileOptimisticSharedStringInputState({
  value: "alpha",
  pendingValue: null,
  lastExternalValue: "alpha",
  externalValue: "alpha",
});
assert.deepStrictEqual(same, {
  value: "alpha",
  pendingValue: null,
  lastExternalValue: "alpha",
  shouldSetValue: false,
});

const localTyping = reconcileOptimisticSharedStringInputState({
  value: "a",
  pendingValue: "a",
  lastExternalValue: "",
  externalValue: "",
});
assert.deepStrictEqual(localTyping, {
  value: "a",
  pendingValue: "a",
  lastExternalValue: "",
  shouldSetValue: false,
});

const externalCatchUp = reconcileOptimisticSharedStringInputState({
  value: "a",
  pendingValue: "a",
  lastExternalValue: "",
  externalValue: "a",
});
assert.deepStrictEqual(externalCatchUp, {
  value: "a",
  pendingValue: null,
  lastExternalValue: "a",
  shouldSetValue: true,
});

const externalOverride = reconcileOptimisticSharedStringInputState({
  value: "a",
  pendingValue: null,
  lastExternalValue: "a",
  externalValue: "beta",
});
assert.deepStrictEqual(externalOverride, {
  value: "beta",
  pendingValue: null,
  lastExternalValue: "beta",
  shouldSetValue: true,
});

console.log("optimistic-shared-input.runtime.test.ts: OK");
