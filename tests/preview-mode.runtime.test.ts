import assert from "node:assert/strict";
import { gridOptions } from "../src/lib/components/stackoptions";
import { ensureEditorDropZone, restorePersistedGridMinRows } from "../src/lib/components/stackpage";

function main() {
  const layout = [{ id: "widget-1", content: "{}" }];
  const previewOptions = ensureEditorDropZone({ minRow: 10, children: layout as any });

  assert.equal(previewOptions.children, layout);
  assert.equal(previewOptions.children?.length, 1);
  assert.equal(previewOptions.children?.[0].id, "widget-1");
  assert.equal(previewOptions.minRow, 10);

  const persistedOptions = ensureEditorDropZone({
    ...gridOptions,
    children: layout as any,
  });
  assert.equal(persistedOptions.children, layout);
  assert.equal(persistedOptions.minRow, 10);

  const fullOptions = ensureEditorDropZone({
    ...gridOptions,
    minRow: 3,
    children: [{ id: "bottom", y: 12, h: 2 } as any],
  });
  assert.equal(fullOptions.minRow, 18);

  const saved = restorePersistedGridMinRows(
    { minRow: 18, children: [{ id: "bottom", y: 12, h: 2 } as any] },
    { minRow: 10, children: [{ id: "bottom", y: 12, h: 2 } as any] },
  ) as any;
  assert.equal(saved.minRow, 10);

  const newSubGrid = restorePersistedGridMinRows(
    { minRow: 10, children: [{ id: "new-subgrid", subGridOpts: { minRow: 14, children: [] } } as any] },
    { minRow: 10, children: [] },
  ) as any;
  assert.equal(newSubGrid.children[0].subGridOpts.minRow, 6);

  console.log("preview-mode.runtime.test.ts: OK");
}

main();
