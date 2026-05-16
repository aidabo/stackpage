import assert from "node:assert/strict";
import { gridOptions } from "../src/lib/components/stackoptions";
import { normalizePreviewGridOptions } from "../src/lib/components/stackpage";

function main() {
  const layout = [{ id: "widget-1", content: "{}" }];
  const previewOptions = normalizePreviewGridOptions(layout as any);

  assert.equal(Array.isArray(previewOptions), false);
  assert.equal(previewOptions.children, layout);
  assert.equal(previewOptions.children?.length, 1);
  assert.equal(previewOptions.children?.[0].id, "widget-1");

  const persistedOptions = normalizePreviewGridOptions({
    ...gridOptions,
    children: layout as any,
  });
  assert.equal(persistedOptions.children, layout);

  console.log("preview-mode.runtime.test.ts: OK");
}

main();
