import assert from "node:assert/strict";
import { customizeValidator } from "@rjsf/validator-ajv8";
import { isOptionalSchemaColor } from "../src/lib/utils/schemaFormats";

const validator = customizeValidator({
  customFormats: { color: isOptionalSchemaColor },
});

const optionalColorsSchema = {
  type: "object",
  properties: {
    textColor: { type: "string", format: "color" },
    iconColor: { type: "string", format: "color" },
    countBgColor: { type: "string", format: "color" },
  },
};

assert.equal(
  validator.isValid(
    optionalColorsSchema,
    { textColor: "", iconColor: "", countBgColor: "" },
    optionalColorsSchema,
  ),
  true,
  "optional PostGridCard/PostListCard colors should accept empty defaults",
);

assert.equal(isOptionalSchemaColor("#ffffff"), true);
assert.equal(isOptionalSchemaColor("rgb(0, 0, 0)"), true);
assert.equal(isOptionalSchemaColor("not-a-color"), false);

console.log("schema color format runtime tests passed");
