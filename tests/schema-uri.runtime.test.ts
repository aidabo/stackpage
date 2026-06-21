import assert from "node:assert/strict";
import {
  generateSchemaFromCurrentProps,
  generateUiSchema,
  normalizeStackPageSchema,
} from "../src/lib/components/PropertyTypeUtils";

async function main() {
  const schema = generateSchemaFromCurrentProps({
    google_map_url: "https://maps.google.com/?q=tokyo",
    hero_image: "https://example.com/hero.jpg",
    source: "self_owned",
  });

  assert.deepEqual(schema.properties.google_map_url, {
    title: "Google_map_url",
    type: "string",
    format: "uri",
  });
  assert.equal(schema.properties.google_map_url["x-media-type"], undefined);

  assert.equal(schema.properties.hero_image.format, "uri");
  assert.equal(schema.properties.hero_image["x-media-type"], "image");

  assert.equal(schema.properties.source.type, "string");
  assert.equal(schema.properties.source.format, undefined);
  assert.equal(schema.properties.source["x-media-type"], undefined);

  const inferredListSchema = generateSchemaFromCurrentProps({
    features: ["南向き", "宅配ボックス"],
  });
  assert.equal(inferredListSchema.properties.features.type, "string");
  assert.equal(inferredListSchema.properties.features.format, undefined);
  assert.equal(inferredListSchema.properties.features["x-widget"], "textarea");
  assert.equal(inferredListSchema.properties.features.enum, undefined);

  const legacyTextareaSchema = normalizeStackPageSchema({
    type: "object",
    properties: {
      description: { type: "string", format: "textarea" },
    },
  });
  assert.equal(legacyTextareaSchema.properties.description.format, undefined);
  assert.equal(legacyTextareaSchema.properties.description["x-widget"], "textarea");

  const uiSchema = generateUiSchema(schema);
  assert.equal(uiSchema.google_map_url["ui:widget"], "CustomURLWidget");
  assert.equal(uiSchema.hero_image["ui:widget"], "FileWidget");
  assert.equal(uiSchema.source["ui:widget"], undefined);
  assert.equal(
    generateUiSchema(inferredListSchema).features["ui:widget"],
    "CustomTextareaWidget"
  );

  console.log("schema-uri.runtime.test.ts: OK");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
