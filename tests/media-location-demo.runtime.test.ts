import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import {
  buildGoogleMapsMapUrl,
  buildGoogleMapsStreetViewUrl,
  buildMediaDetailPath,
  componentMapProvider,
  componentPropsProvider,
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
    await waitForServer(`${baseUrl}/mediaCatalogs/media-showcase-demo`);

    const catalogResponse = await fetch(`${baseUrl}/mediaCatalogs/media-showcase-demo`);
    assert.equal(catalogResponse.ok, true);
    const catalog = await catalogResponse.json();
    assert.equal(catalog.id, "media-showcase-demo");
    assert.equal(catalog.title, "Media + location showcase");
    assert.equal(catalog.items.length, 4);
    assert.equal(catalog.sliderItems.length, 3);
    assert.equal(catalog.location.streetview.locationLabel, "Shibuya Crossing, Tokyo");

    const showcasePageResponse = await fetch(`${baseUrl}/pages/page-media-showcase-demo`);
    assert.equal(showcasePageResponse.ok, true);
    const showcasePage = await showcasePageResponse.json();
    assert.equal(showcasePage.id, "page-media-showcase-demo");
    assert.equal(showcasePage.source.dataSources[0].id, "media-showcase-catalog");
    assert.equal(
      showcasePage.source.dataSources[0].endpoint,
      "http://localhost:3500/mediaCatalogs/media-showcase-demo"
    );
    assert.equal(
      showcasePage.layout.children.some((widget: any) => widget.content.includes("MediaInquiryCard")),
      true
    );
    assert.equal(
      showcasePage.layout.children.some((widget: any) => widget.content.includes("MediaShowcaseGrid")),
      true
    );
    assert.equal(
      showcasePage.layout.children.some((widget: any) => widget.content.includes("MediaSliderCard")),
      true
    );
    assert.equal(
      showcasePage.layout.children.some((widget: any) => widget.content.includes("GoogleStreetViewCard")),
      true
    );
    assert.equal(
      showcasePage.layout.children.some((widget: any) => widget.content.includes("GoogleMapCard")),
      true
    );
    assert.equal(showcasePage.pageState.selectedMediaId, "media-image-1");

    const detailPageResponse = await fetch(`${baseUrl}/pages/page-media-detail-demo`);
    assert.equal(detailPageResponse.ok, true);
    const detailPage = await detailPageResponse.json();
    assert.equal(detailPage.id, "page-media-detail-demo");
    assert.equal(detailPage.source.dataSources[0].id, "media-detail-catalog");
    assert.equal(
      detailPage.source.dataSources[0].endpoint,
      "http://localhost:3500/mediaCatalogs/media-showcase-demo"
    );
    assert.equal(
      detailPage.layout.children.some((widget: any) => widget.content.includes("MediaDetailPanel")),
      true
    );
    assert.equal(detailPage.pageState.selectedMediaId, "media-image-1");

    assert.equal(
      buildMediaDetailPath("page-media-detail-demo", "media-image-1"),
      "/view/page-media-detail-demo?item=media-image-1"
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
    assert.equal(defaultProps.MediaInquiryCard.title, "Inquiry form");
    assert.equal(defaultProps.MediaShowcaseGrid.detailPageId, "page-media-detail-demo");
    assert.equal(defaultProps.MediaSliderCard.detailPageId, "page-media-detail-demo");
    assert.equal(defaultProps.GoogleStreetViewCard.locationLabel, "Shibuya Crossing, Tokyo");
    assert.equal(defaultProps.GoogleMapCard.locationLabel, "Shibuya, Tokyo");

    const components = componentMapProvider();
    assert.doesNotThrow(() => {
      renderToStaticMarkup(React.createElement(components.GoogleStreetViewCard, {}));
    });
    assert.doesNotThrow(() => {
      renderToStaticMarkup(React.createElement(components.GoogleMapCard, {}));
    });
    assert.doesNotThrow(() => {
      renderToStaticMarkup(
        React.createElement(
          MemoryRouter,
          { initialEntries: ["/view/page-media-detail-demo?item=media-image-1"] },
          React.createElement(components.MediaDetailPanel, {})
        )
      );
    });

    console.log("media-location-demo.runtime.test.ts: OK");
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
