import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";

import { resolveParams } from "../src/lib/utils/paramResolver";
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

async function main() {
  const port = 3577;
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

    // A datasource whose param binds to the URL query via a {{token}}.
    const dataSource: any = {
      id: "estate-props",
      name: "Estate Properties",
      type: "api",
      endpoint: `${baseUrl}/estateProperties`,
      method: "GET",
      headers: {},
      parameters: { id: "{{query.item}}" },
    };

    // --- deep-link case: ?item=p-2 drives the fetch ---
    const ctx = { query: { item: "p-2" }, state: {}, params: { pageid: "pg" } };
    const resolved = resolveParams(dataSource.parameters, ctx);
    assert.deepEqual(resolved, { id: "p-2" }, "token resolves from query");

    // Fetch with a clone whose parameters are the resolved concrete values
    // (mirrors the stackpage pre-fetch wiring so raw tokens never hit the wire).
    const result = await DataSourceService.fetchDataSourceData(
      { ...dataSource, parameters: resolved },
      {}
    );
    assert.equal(result.success, true, "fetch succeeds");
    assert.equal(Array.isArray(result.data), true);
    assert.equal(result.data.length, 1, "json-server filtered by id");
    assert.equal(result.data[0].id, "p-2");
    assert.equal(result.data[0].title, "Garden House");

    // --- different query value selects a different record ---
    const ctx3 = { query: { item: "p-3" }, state: {}, params: {} };
    const resolved3 = resolveParams(dataSource.parameters, ctx3);
    const result3 = await DataSourceService.fetchDataSourceData(
      { ...dataSource, parameters: resolved3 },
      {}
    );
    assert.equal(result3.data[0].id, "p-3");
    assert.equal(result3.data[0].city, "Osaka");

    // --- no query param: token drops, endpoint returns all records ---
    const ctxNone = { query: {}, state: {}, params: {} };
    const resolvedNone = resolveParams(dataSource.parameters, ctxNone);
    assert.deepEqual(resolvedNone, {}, "unresolved token dropped, no literal leak");
    const resultAll = await DataSourceService.fetchDataSourceData(
      { ...dataSource, parameters: resolvedNone },
      {}
    );
    assert.equal(resultAll.data.length, 3, "no id filter -> all records");

    // --- guard: raw token must NOT leak as a literal query value ---
    // (proves the clone-and-replace wiring; passing the raw ds would send ?id={{query.item}})
    const leaked = await DataSourceService.fetchDataSourceData(
      { ...dataSource, parameters: { id: "{{query.item}}" } },
      {}
    );
    assert.equal(
      leaked.data.length,
      0,
      "literal {{token}} matches nothing (confirms why resolution must happen before fetch)"
    );

    console.log("dynamic-params.runtime.test.ts: OK");
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
