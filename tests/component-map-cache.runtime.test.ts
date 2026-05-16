import assert from "node:assert/strict";
import { componentMapProvider } from "../src/demo/components/MyComponents";
import { getComponentMap } from "../src/lib/components/stackoptions";

const first = getComponentMap(componentMapProvider);
const second = getComponentMap(componentMapProvider);

assert.strictEqual(first, second);
assert.strictEqual(first.DemoSearchBar, second.DemoSearchBar);
assert.strictEqual(first.GoogleMapCard, second.GoogleMapCard);

console.log("component-map-cache.runtime.test.ts: OK");
