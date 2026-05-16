import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";

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
  const port = 3500;
  const baseUrl = `http://127.0.0.1:${port}`;
  const child = spawn(process.execPath, [jsonServerBin, "--watch", dbPath, "--port", String(port)], {
    stdio: ["ignore", "pipe", "pipe"],
    env: {
      ...process.env,
      NODE_ENV: "test",
    },
  });

  let stderr = "";
  child.stderr.on("data", (chunk) => {
    stderr += String(chunk);
  });

  try {
    await waitForServer(`${baseUrl}/demoCatalogs/stackpage-demo`);

    const catalogResponse = await fetch(`${baseUrl}/demoCatalogs/stackpage-demo`);
    assert.equal(catalogResponse.ok, true);
    const catalog = await catalogResponse.json();

    assert.equal(catalog.id, "stackpage-demo");
    assert.equal(catalog.title, "StackPage JSON Server datasource");
    assert.equal(Array.isArray(catalog.items), true);
    assert.equal(catalog.items.length, 3);

    const pageResponse = await fetch(`${baseUrl}/pages/page-jsonserver-demo`);
    assert.equal(pageResponse.ok, true);
    const page = await pageResponse.json();

    assert.equal(page.id, "page-jsonserver-demo");
    assert.equal(page.source.dataSources[0].id, "json-demo-catalog");
    assert.equal(
      page.source.dataSources[0].endpoint,
      "http://localhost:3500/demoCatalogs/stackpage-demo"
    );

    const businessCatalogResponse = await fetch(
      `${baseUrl}/businessCatalogs/crm-demo`
    );
    assert.equal(businessCatalogResponse.ok, true);
    const businessCatalog = await businessCatalogResponse.json();
    assert.equal(businessCatalog.id, "crm-demo");
    assert.equal(businessCatalog.deals.length, 3);
    assert.equal(businessCatalog.kpis.openDeals, "12");

    const businessPageResponse = await fetch(
      `${baseUrl}/pages/page-business-ops-demo`
    );
    assert.equal(businessPageResponse.ok, true);
    const businessPage = await businessPageResponse.json();

    assert.equal(businessPage.id, "page-business-ops-demo");
    assert.equal(businessPage.source.dataSources[0].id, "crm-business-demo");
    assert.equal(
      businessPage.source.dataSources[0].endpoint,
      "http://localhost:3500/businessCatalogs/crm-demo"
    );
    assert.equal(
      businessPage.layout.children.some(
        (widget: any) => widget.content.includes("BusinessDealList")
      ),
      true
    );
    assert.equal(
      businessPage.layout.children.some(
        (widget: any) => widget.content.includes("BusinessDealFilter")
      ),
      true
    );
    assert.equal(
      businessPage.layout.children.some(
        (widget: any) => widget.content.includes("BusinessDealStageAction")
      ),
      true
    );
    assert.equal(
      businessPage.layout.children.some(
        (widget: any) => widget.content.includes("BusinessDealReviewAction")
      ),
      true
    );
    assert.equal(
      businessPage.layout.children.some(
        (widget: any) => widget.content.includes("BusinessDealOutcomeAction")
      ),
      true
    );
    assert.equal(businessPage.pageState["sales.pipeline.stage"], "all");
    assert.equal(businessPage.pageState["sales.pipeline.keyword"], "enterprise");
    assert.equal(
      businessPage.pageState["sales.pipeline.selectedStage"],
      "negotiation"
    );
    assert.equal(
      businessPage.pageState["sales.pipeline.reviewStatus"],
      "needs review"
    );
    assert.equal(
      businessPage.pageState["sales.pipeline.outcomeStatus"],
      "pending"
    );

    const lifecyclePageResponse = await fetch(
      `${baseUrl}/pages/page-lifecycle-demo`
    );
    assert.equal(lifecyclePageResponse.ok, true);
    const lifecyclePage = await lifecyclePageResponse.json();
    assert.equal(lifecyclePage.id, "page-lifecycle-demo");
    assert.equal(
      lifecyclePage.layout.children.some((widget: any) =>
        widget.content.includes("LifecycleEventDashboard")
      ),
      true
    );
    assert.equal(
      lifecyclePage.layout.children.some((widget: any) =>
        widget.content.includes("DemoFlowSection")
      ),
      true
    );
    assert.equal(
      lifecyclePage.pageState["lifecycle.watchWidgetId"],
      "widget-lifecycle-dashboard"
    );

    const foldPageResponse = await fetch(
      `${baseUrl}/pages/page-fold-post-demo`
    );
    assert.equal(foldPageResponse.ok, true);
    const foldPage = await foldPageResponse.json();
    assert.equal(foldPage.id, "page-fold-post-demo");
    assert.equal(
      foldPage.layout.children.some((widget: any) =>
        widget.content.includes("DemoPostFoldSummary")
      ),
      true
    );
    assert.equal(
      foldPage.layout.children.some((widget: any) =>
        widget.content.includes("DemoPostFoldTips")
      ),
      true
    );
    assert.equal(
      foldPage.layout.children.some((widget: any) =>
        widget.content.includes("DemoPostFoldNavigator")
      ),
      true
    );
    assert.equal(
      foldPage.layout.children.some((widget: any) =>
        widget.content.includes("DemoPostFoldReceiver")
      ),
      true
    );
    assert.equal(
      foldPage.layout.children.some((widget: any) =>
        widget.content.includes("DemoFlowSection")
      ),
      true
    );
    assert.equal(
      foldPage.layout.children.some((widget: any) =>
        widget.content.includes("content.review.selectedId")
      ),
      true
    );
    assert.equal(foldPage.pageState["content.review.selectedId"], "post-2");
    assert.equal(
      foldPage.pageState["content.review.selectedTitle"],
      "Designing searchable content"
    );

    const chainPageResponse = await fetch(
      `${baseUrl}/pages/page-business-chain-demo`
    );
    assert.equal(chainPageResponse.ok, true);
    const chainPage = await chainPageResponse.json();
    assert.equal(chainPage.id, "page-business-chain-demo");
    assert.equal(
      chainPage.layout.children.some((widget: any) =>
        widget.content.includes("BusinessDealOutcomeReceiver")
      ),
      true
    );
    assert.equal(
      chainPage.layout.children.some((widget: any) =>
        widget.content.includes("BusinessChainGuide")
      ),
      true
    );
    assert.equal(
      chainPage.layout.children.some((widget: any) =>
        widget.content.includes("BusinessChainNavigator")
      ),
      true
    );
    assert.equal(
      chainPage.layout.children.some((widget: any) =>
        widget.content.includes("BusinessChainStatusSummary")
      ),
      true
    );
    assert.equal(
      chainPage.layout.children.some((widget: any) =>
        widget.content.includes("BusinessChainProgressBar")
      ),
      true
    );
    assert.equal(
      chainPage.layout.children.some((widget: any) =>
        widget.content.includes("BusinessChainNextAction")
      ),
      true
    );
    assert.equal(
      chainPage.layout.children.some((widget: any) =>
        widget.content.includes("BusinessChainLegend")
      ),
      true
    );
    assert.equal(
      chainPage.layout.children.some((widget: any) =>
        widget.content.includes("BusinessDealOutcomeAction")
      ),
      true
    );
    assert.equal(chainPage.pageState["sales.pipeline.selectedId"], "deal-002");
    assert.equal(chainPage.pageState["sales.pipeline.selectedStage"], "proposal");
    assert.equal(chainPage.pageState["sales.pipeline.reviewStatus"], "needs review");
    assert.equal(chainPage.pageState["sales.pipeline.outcomeStatus"], "pending");

    console.log("jsonserver-demo.runtime.test.ts: OK");
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
