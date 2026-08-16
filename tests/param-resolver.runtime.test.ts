import assert from "node:assert/strict";
import {
  resolveParams,
  resolveParamValue,
  hasDynamicParams,
  isDynamicParamValue,
  buildTestParams,
  parseParamSource,
  buildParamValue,
} from "../src/lib/utils/paramResolver";
import { DataSourceService } from "../src/lib/components/DataSourceService";

async function main() {
  const ctx = {
    query: { item: "p-123", group_id: "g1", empty: "" },
    state: {
      // nested (as setPageState writes)
      estate: { selectedPropertyId: "p-999" },
      post: { search: { keyword: "news" } },
      // flat dot-key (as db.json fixtures store)
      "sales.pipeline.stage": "negotiation",
      count: 0,
      flag: false,
    },
    params: { pageid: "page-1" },
  };

  // 1. plain literal — untouched
  assert.equal(resolveParamValue("1", ctx), "1");
  assert.equal(resolveParamValue("hello", ctx), "hello");

  // 2. non-string passes through
  assert.equal(resolveParamValue(42, ctx), 42);

  // 3. pure query token
  assert.equal(resolveParamValue("{{query.item}}", ctx), "p-123");

  // 4. pure state token — nested path
  assert.equal(
    resolveParamValue("{{state.estate.selectedPropertyId}}", ctx),
    "p-999"
  );

  // 5. pure state token — flat dot-key stored literally
  assert.equal(
    resolveParamValue("{{state.sales.pipeline.stage}}", ctx),
    "negotiation"
  );

  // 6. pure token preserves non-string types (0 / false survive, not dropped as value)
  assert.equal(resolveParamValue("{{state.count}}", ctx), 0);
  assert.equal(resolveParamValue("{{state.flag}}", ctx), false);

  // 7. partial interpolation
  assert.equal(resolveParamValue("prop-{{query.item}}", ctx), "prop-p-123");

  // 8. route param
  assert.equal(resolveParamValue("{{params.pageid}}", ctx), "page-1");

  // 9. undefined token (pure) -> undefined
  assert.equal(resolveParamValue("{{query.missing}}", ctx), undefined);

  // 10. unknown namespace -> undefined (whitelist enforced)
  assert.equal(resolveParamValue("{{window.location}}", ctx), undefined);
  assert.equal(resolveParamValue("{{env.SECRET}}", ctx), undefined);

  // ---- resolveParams (drop rules) ----
  const resolved = resolveParams(
    {
      id: "{{query.item}}", // -> p-123
      groupId: "{{query.group_id}}", // -> g1
      stage: "{{state.sales.pipeline.stage}}", // -> negotiation (flat key)
      page: "1", // literal kept
      missing: "{{query.nope}}", // dropped (undefined)
      blank: "{{query.empty}}", // dropped ("")
      zero: "{{state.count}}", // kept (0 is a real value)
    },
    ctx
  );

  assert.deepEqual(resolved, {
    id: "p-123",
    groupId: "g1",
    stage: "negotiation",
    page: "1",
    zero: 0,
  });
  assert.equal("missing" in resolved, false);
  assert.equal("blank" in resolved, false);

  // ---- backward compatibility: no tokens => untouched ----
  const staticParams = { a: "1", b: "two", c: 3 };
  assert.deepEqual(resolveParams(staticParams, ctx), staticParams);

  // ---- empty / undefined raw ----
  assert.deepEqual(resolveParams(undefined, ctx), {});
  assert.deepEqual(resolveParams({}, ctx), {});

  // ---- hasDynamicParams ----
  assert.equal(hasDynamicParams({ a: "{{query.x}}" }), true);
  assert.equal(hasDynamicParams({ a: "1", b: "two" }), false);
  assert.equal(hasDynamicParams(undefined), false);

  // ---- isDynamicParamValue ----
  assert.equal(isDynamicParamValue("{{query.item}}"), true);
  assert.equal(isDynamicParamValue("prefix-{{state.x}}"), true);
  assert.equal(isDynamicParamValue("plain"), false);
  assert.equal(isDynamicParamValue(42), false);

  // ---- buildTestParams (dialog Test tab) ----
  const testParams = buildTestParams([
    { key: "id", value: "{{query.item}}", testValue: "p-2" }, // dynamic + test value -> used
    { key: "page", value: "1" }, // static literal kept
    { key: "stage", value: "{{state.x}}", testValue: "" }, // dynamic + blank -> dropped
    { key: "region", value: "{{state.y}}" }, // dynamic + no test value -> dropped
    { key: "", value: "orphan" }, // blank key -> skipped
    { key: "blankStatic", value: "" }, // blank static -> skipped
    { key: "trimmed", value: "{{query.z}}", testValue: "  spaced  " }, // trimmed
  ]);
  assert.deepEqual(testParams, {
    id: "p-2",
    page: "1",
    trimmed: "spaced",
  });
  assert.equal("stage" in testParams, false);
  assert.equal("region" in testParams, false);

  // ---- parseParamSource (dialog dropdown round-trip) ----
  assert.deepEqual(parseParamSource("{{query.item}}"), {
    source: "query",
    path: "item",
  });
  assert.deepEqual(parseParamSource("{{state.sales.pipeline.stage}}"), {
    source: "state",
    path: "sales.pipeline.stage",
  });
  assert.deepEqual(parseParamSource("{{params.pageid}}"), {
    source: "params",
    path: "pageid",
  });
  // literal -> static, raw value as path
  assert.deepEqual(parseParamSource("hello"), {
    source: "static",
    path: "hello",
  });
  // partial interpolation is NOT a pure token -> static
  assert.deepEqual(parseParamSource("prop-{{query.item}}"), {
    source: "static",
    path: "prop-{{query.item}}",
  });
  // unknown namespace -> static (whitelist)
  assert.deepEqual(parseParamSource("{{window.x}}"), {
    source: "static",
    path: "{{window.x}}",
  });
  assert.deepEqual(parseParamSource(undefined), { source: "static", path: "" });

  // ---- buildParamValue ----
  assert.equal(buildParamValue("query", "item"), "{{query.item}}");
  assert.equal(
    buildParamValue("state", "sales.pipeline.stage"),
    "{{state.sales.pipeline.stage}}"
  );
  assert.equal(buildParamValue("static", "literal"), "literal");
  assert.equal(buildParamValue("query", "  item  "), "{{query.item}}"); // trims path
  assert.equal(buildParamValue("query", ""), ""); // empty path -> nothing bound

  // round-trip: parse ∘ build is identity for a bound token
  const rt = parseParamSource(buildParamValue("state", "estate.selectedPropertyId"));
  assert.deepEqual(rt, { source: "state", path: "estate.selectedPropertyId" });

  // The editor keeps a direct fetchData reference on newly configured host
  // datasources. That path must receive resolved datasource parameters just like
  // the registry-backed path used after a saved page is reloaded.
  let receivedParams: Record<string, unknown> | undefined;
  const directParameters = resolveParams(
    {
      keyword: "{{state.post.search.keyword}}",
      page: 1,
    },
    ctx,
  );
  const directResult = await DataSourceService.fetchDataSourceData(
    {
      id: "direct-host-source",
      name: "Direct host source",
      type: "host-function",
      parameters: directParameters,
      fetchData: async (params) => {
        receivedParams = params;
        return [];
      },
    },
    {page: 2},
  );
  assert.equal(directResult.success, true);
  assert.deepEqual(receivedParams, {keyword: "news", page: 2});

  console.log("param-resolver.runtime.test.ts: OK");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
