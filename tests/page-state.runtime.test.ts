import assert from "node:assert/strict";
import {
  DEFAULT_PAGE_STATE,
  DEFAULT_PAGE_STATE_KEYS,
  createPageStatePath,
  isCanonicalPageStateKey,
  normalizePageState,
} from "../src/lib/utils/pageState";

function main() {
  assert.deepEqual(normalizePageState(), DEFAULT_PAGE_STATE);
  assert.deepEqual(
    normalizePageState({
      selectedId: "item-1",
      keyword: "search term",
      extra: { nested: true },
    }),
    {
      ...DEFAULT_PAGE_STATE,
      selectedId: "item-1",
      keyword: "search term",
      extra: { nested: true },
    },
  );

  assert.equal(createPageStatePath("page", "filters", 0, "id"), "page.filters.0.id");
  assert.equal(createPageStatePath("page", null, "dialogOpen"), "page.dialogOpen");

  for (const key of DEFAULT_PAGE_STATE_KEYS) {
    assert.equal(isCanonicalPageStateKey(key), true);
  }
  assert.equal(isCanonicalPageStateKey("custom"), false);

  console.log("page-state.runtime.test.ts: OK");
}

main();
