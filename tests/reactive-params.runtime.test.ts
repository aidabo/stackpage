import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";

import { resolveParams } from "../src/lib/utils/paramResolver";
import { referencesState } from "../src/lib/components/useReactiveDataSources";
import { DataSourceService } from "../src/lib/components/DataSourceService";

const require = createRequire(import.meta.url);
const packageJsonPath = require.resolve("json-server/package.json");
const packageRoot = path.dirname(packageJsonPath);
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const jsonServerBin = path.resolve(packageRoot, packageJson.bin["json-server"]);
const dbPath = path.resolve(process.cwd(), "data/db.json");

async function waitForServer(url: string, timeoutMs = 15000): Promise<void> {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url, { method: "GET" });
      if (response.ok) return;
    } catch {
      // retry
    }
    await delay(250);
  }
  throw new Error(`Timed out waiting for json-server at ${url}`);
}

/** Mirrors the hook's decision: resolve params for a page-state snapshot and
 * return the signature the hook compares to detect a change. */
function paramSignature(ds: any, state: Record<string, any>): string {
  return JSON.stringify(resolveParams(ds.parameters, { state }));
}

async function main() {
  const port = 3578;
  const baseUrl = `http://127.0.0.1:${port}`;
  const child = spawn(
    process.execPath,
    [jsonServerBin, "--watch", dbPath, "--port", String(port)],
    { stdio: ["ignore", "pipe", "pipe"], env: { ...process.env, NODE_ENV: "test" } }
  );

  let stderr = "";
  child.stderr.on("data", (chunk) => {
    stderr += String(chunk);
  });

  try {
    await waitForServer(`${baseUrl}/estateProperties`);

    // A datasource whose filter binds to page state via a {{state.*}} token.
    const dataSource: any = {
      id: "estate-props-reactive",
      name: "Estate Properties (reactive)",
      type: "api",
      endpoint: `${baseUrl}/estateProperties`,
      method: "GET",
      headers: {},
      parameters: { city: "{{state.estate.city}}" },
    };

    // The hook only watches sources that reference {{state.*}}.
    assert.equal(referencesState(dataSource.parameters), true);
    assert.equal(referencesState({ id: "{{query.item}}" }), false, "query-only is not reactive");
    assert.equal(referencesState({ limit: "20" }), false, "static is not reactive");

    // ---- initial state: no city → token drops → all records ----
    const state0: Record<string, any> = {};
    const sig0 = paramSignature(dataSource, state0);
    const resolved0 = resolveParams(dataSource.parameters, { state: state0 });
    assert.deepEqual(resolved0, {}, "empty state drops the token");
    const res0 = await DataSourceService.fetchDataSourceData(
      { ...dataSource, parameters: resolved0 },
      {}
    );
    assert.equal(res0.data.length, 3, "no filter → all records");

    // ---- state change: estate.city = "Osaka" (nested path) ----
    const state1 = { estate: { city: "Osaka" } };
    const sig1 = paramSignature(dataSource, state1);
    assert.notEqual(sig1, sig0, "signature changed → hook would refetch");

    const resolved1 = resolveParams(dataSource.parameters, { state: state1 });
    assert.deepEqual(resolved1, { city: "Osaka" });
    const res1 = await DataSourceService.fetchDataSourceData(
      { ...dataSource, parameters: resolved1 },
      {}
    );
    assert.equal(res1.data.length, 1, "filtered to one city");
    assert.equal(res1.data[0].id, "p-3");
    assert.equal(res1.data[0].title, "Riverside Flat");

    // ---- no-op change: same city again → signature stable → no refetch ----
    const sig1again = paramSignature(dataSource, { estate: { city: "Osaka" } });
    assert.equal(sig1again, sig1, "unchanged state → stable signature → no refetch");

    console.log("reactive-params.runtime.test.ts: OK");
  } finally {
    child.kill("SIGTERM");
    await new Promise((resolve) => child.once("exit", resolve));
    if (stderr) {
      process.stderr.write(stderr);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
