import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import {
  buildGoogleMapsMapUrl,
  buildGoogleMapsStreetViewUrl,
  buildRealEstateInquiryPayload,
  buildPropertyDetailPath,
  buildRealEstateDetailTransitionPath,
  buildRealEstatePropertySelectionEvent,
  componentPropsProvider,
  getRealEstateAreaProfile,
  getRealEstateDetailGuidance,
  resolveRealEstateDetailItem,
} from "../src/demo/components/MyComponents";

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
    await waitForServer(`${baseUrl}/realEstateCatalogs/realestate-showcase-demo`);

    const catalogResponse = await fetch(`${baseUrl}/realEstateCatalogs/realestate-showcase-demo`);
    assert.equal(catalogResponse.ok, true);
    const catalog = await catalogResponse.json();
    assert.equal(catalog.id, "realestate-showcase-demo");
    assert.equal(catalog.title, "Japan property sale and rent showcase");
    assert.equal(catalog.properties.length, 4);
    assert.equal(catalog.sliderItems.length, 4);
    assert.equal(catalog.location.streetview.locationLabel, "Shibuya, Tokyo");

    const showcasePageResponse = await fetch(`${baseUrl}/pages/page-realestate-showcase-demo`);
    assert.equal(showcasePageResponse.ok, true);
    const showcasePage = await showcasePageResponse.json();
    assert.equal(showcasePage.id, "page-realestate-showcase-demo");
    assert.equal(showcasePage.source.dataSources[0].id, "realestate-showcase-catalog");
    assert.equal(
      showcasePage.source.dataSources[0].endpoint,
      "http://localhost:3500/realEstateCatalogs/realestate-showcase-demo"
    );
    assert.equal(
      showcasePage.layout.children.some((widget: any) => widget.content.includes("RealEstateInquiryCard")),
      true
    );
    assert.equal(
      showcasePage.layout.children.some((widget: any) => widget.content.includes("RealEstateFilterBar")),
      true
    );
    assert.equal(
      showcasePage.layout.children.some((widget: any) => widget.content.includes("RealEstateNeighborhoodCard")),
      true
    );
    assert.equal(
      showcasePage.layout.children.some((widget: any) => widget.content.includes("RealEstateAccessCard")),
      true
    );
    assert.equal(
      showcasePage.layout.children.some((widget: any) => widget.content.includes("RealEstatePropertyGrid")),
      true
    );
    assert.equal(
      showcasePage.layout.children.some((widget: any) => widget.content.includes("RealEstatePropertySlider")),
      true
    );
    assert.equal(
      showcasePage.layout.children.some((widget: any) => widget.content.includes("RealEstateStreetViewCard")),
      true
    );
    assert.equal(
      showcasePage.layout.children.some((widget: any) => widget.content.includes("RealEstateMapCard")),
      true
    );
    assert.equal(showcasePage.pageState.selectedPropertyId, "property-rent-1");
    assert.equal(showcasePage.pageState["realestate.filter.intent"], "all");
    assert.equal(showcasePage.pageState["realestate.filter.keyword"], "");

    const detailPageResponse = await fetch(`${baseUrl}/pages/page-realestate-detail-demo`);
    assert.equal(detailPageResponse.ok, true);
    const detailPage = await detailPageResponse.json();
    assert.equal(detailPage.id, "page-realestate-detail-demo");
    assert.equal(detailPage.source.dataSources[0].id, "realestate-detail-catalog");
    assert.equal(
      detailPage.source.dataSources[0].endpoint,
      "http://localhost:3500/realEstateCatalogs/realestate-showcase-demo"
    );
    assert.equal(
      detailPage.layout.children.some((widget: any) => widget.content.includes("RealEstateDetailPanel")),
      true
    );
    assert.equal(
      detailPage.layout.children.some((widget: any) => widget.content.includes("RealEstateInquiryCard")),
      true
    );
    assert.equal(detailPage.pageState.selectedPropertyId, "property-rent-1");

    const salePageResponse = await fetch(`${baseUrl}/pages/page-realestate-sale-demo`);
    assert.equal(salePageResponse.ok, true);
    const salePage = await salePageResponse.json();
    assert.equal(salePage.id, "page-realestate-sale-demo");
    assert.equal(salePage.pageState["realestate.filter.intent"], "sale");
    assert.equal(
      salePage.layout.children.some((widget: any) => widget.content.includes("RealEstateFilterBar")),
      true
    );
    assert.equal(
      salePage.layout.children.some((widget: any) => widget.content.includes("RealEstateNeighborhoodCard")),
      true
    );
    assert.equal(
      salePage.layout.children.some((widget: any) => widget.content.includes("RealEstateAccessCard")),
      true
    );

    const rentPageResponse = await fetch(`${baseUrl}/pages/page-realestate-rent-demo`);
    assert.equal(rentPageResponse.ok, true);
    const rentPage = await rentPageResponse.json();
    assert.equal(rentPage.id, "page-realestate-rent-demo");
    assert.equal(rentPage.pageState["realestate.filter.intent"], "rent");
    assert.equal(
      rentPage.layout.children.some((widget: any) => widget.content.includes("RealEstateFilterBar")),
      true
    );
    assert.equal(
      rentPage.layout.children.some((widget: any) => widget.content.includes("RealEstateNeighborhoodCard")),
      true
    );
    assert.equal(
      rentPage.layout.children.some((widget: any) => widget.content.includes("RealEstateAccessCard")),
      true
    );

    assert.equal(
      buildPropertyDetailPath("page-realestate-detail-demo", "property-sale-1"),
      "/view/page-realestate-detail-demo?item=property-sale-1"
    );
    assert.equal(
      buildRealEstateDetailTransitionPath("page-realestate-detail-demo", "property-sale-1"),
      "/view/page-realestate-detail-demo?item=property-sale-1&source=listing-grid"
    );
    assert.deepEqual(
      buildRealEstatePropertySelectionEvent(
        { id: "property-sale-1", kind: "sale", title: "Shibuya Family Home", locationLabel: "Shibuya, Tokyo" },
        "slider-card"
      ),
      {
        id: "property-sale-1",
        kind: "sale",
        title: "Shibuya Family Home",
        locationLabel: "Shibuya, Tokyo",
        source: "slider-card",
      }
    );
    assert.deepEqual(
      buildRealEstateInquiryPayload(
        {
          name: "Aida Dabo",
          email: "hello@example.com",
          intent: "Buy",
          budget: "¥100,000,000",
          area: "Tokyo 23 wards",
          message: "Please share properties that match this request.",
          submittedAt: "2026-05-08T00:00:00.000Z",
        },
        { id: "property-rent-1", kind: "rent", title: "Nakameguro Riverside", locationLabel: "Nakameguro, Tokyo" },
        "selectedPropertyId"
      ),
      {
        name: "Aida Dabo",
        email: "hello@example.com",
        intent: "Buy",
        budget: "¥100,000,000",
        area: "Tokyo 23 wards",
        message: "Please share properties that match this request.",
        submittedAt: "2026-05-08T00:00:00.000Z",
        selectedPropertyIdKey: "selectedPropertyId",
        propertyId: "property-rent-1",
        propertyKind: "rent",
        propertyTitle: "Nakameguro Riverside",
        propertyLocationLabel: "Nakameguro, Tokyo",
      }
    );
    assert.deepEqual(
      resolveRealEstateDetailItem(
        [
          { id: "property-sale-1", title: "Shibuya Residence" },
          { id: "property-rent-2", title: "Yokohama Family House" },
        ],
        "property-rent-2",
        "property-sale-1"
      ),
      { id: "property-rent-2", title: "Yokohama Family House" }
    );
    assert.deepEqual(
      resolveRealEstateDetailItem([], "property-rent-2", "property-sale-1"),
      null
    );
    assert.equal(
      buildGoogleMapsStreetViewUrl({ viewpoint: "35.6595,139.7005" }).includes("map_action=pano"),
      true
    );
    assert.equal(
      buildGoogleMapsMapUrl({ center: "35.6595,139.7005" }).includes("map_action=map"),
      true
    );

    const defaultProps = componentPropsProvider();
    assert.equal(defaultProps.RealEstateInquiryCard.title, "Property inquiry");
    assert.equal(defaultProps.RealEstateInquiryCard.selectedPropertyIdKey, "selectedPropertyId");
    assert.equal(defaultProps.RealEstateInquiryCard.items.length, 4);
    assert.equal(defaultProps.RealEstateFilterBar.intentKey, "realestate.filter.intent");
    assert.equal(defaultProps.RealEstateNeighborhoodCard.selectedPropertyIdKey, "selectedPropertyId");
    assert.equal(defaultProps.RealEstateAccessCard.detailPageId, "page-realestate-detail-demo");
    assert.equal(defaultProps.RealEstatePropertyGrid.detailPageId, "page-realestate-detail-demo");
    assert.equal(defaultProps.RealEstatePropertyGrid.selectedPropertyIdKey, "selectedPropertyId");
    assert.equal(defaultProps.RealEstatePropertySlider.detailPageId, "page-realestate-detail-demo");
    assert.equal(defaultProps.RealEstatePropertySlider.selectedPropertyIdKey, "selectedPropertyId");
    assert.equal(defaultProps.RealEstateStreetViewCard.locationLabel, "Shibuya, Tokyo");
    assert.equal(defaultProps.RealEstateMapCard.locationLabel, "Shibuya, Tokyo");
    assert.equal(defaultProps.RealEstateDetailPanel.detailPageId, "page-realestate-detail-demo");

    const shibuyaProfile = getRealEstateAreaProfile({ locationLabel: "Shibuya, Tokyo" });
    assert.equal(shibuyaProfile.commute, "JR / Metro access");
    assert.equal(shibuyaProfile.walk, "5 min walk to station");
    assert.deepEqual(shibuyaProfile.nearby, ["Transit hub", "Dining", "Shopping"]);
    assert.equal(shibuyaProfile.vibe, "Urban and premium");

    const yokohamaProfile = getRealEstateAreaProfile({ locationLabel: "Yokohama, Kanagawa" });
    assert.equal(yokohamaProfile.walk, "12 min walk to station");
    assert.deepEqual(yokohamaProfile.nearby, ["Park", "Schools", "Supermarket"]);

    const saleGuidance = getRealEstateDetailGuidance({ kind: "sale", locationLabel: "Shibuya, Tokyo" });
    assert.equal(saleGuidance.label, "Purchase focus");
    assert.equal(saleGuidance.title, "For buyers");
    assert.equal(saleGuidance.checklist.length, 3);
    assert.equal(saleGuidance.priorities[0], "Loan readiness");
    assert.equal(saleGuidance.actionHint, "Buyers usually want a calm compare-and-decide flow.");

    const rentGuidance = getRealEstateDetailGuidance({ kind: "rent", locationLabel: "Yokohama, Kanagawa" });
    assert.equal(rentGuidance.label, "Rental focus");
    assert.equal(rentGuidance.title, "For renters");
    assert.equal(rentGuidance.checklist[0], "Confirm monthly budget, deposit, and available move-in date.");
    assert.equal(rentGuidance.priorities[1], "Move-in timing");
    assert.equal(rentGuidance.actionHint, "Renters usually want a quick compare-and-shortlist flow.");

    console.log("realestate-demo.runtime.test.ts: OK");
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
