import { customizeValidator } from "@rjsf/validator-ajv8";

const colorSchema = { type: "string", format: "color" } as const;
const standardValidator = customizeValidator();

/**
 * RJSF's color format rejects an empty string. StackPage color fields may be
 * optional, where an empty value means the component should use its own
 * contextual default, so preserve RJSF validation for non-empty colors only.
 */
export function isOptionalSchemaColor(value: unknown): boolean {
  if (typeof value !== "string") return false;
  if (value.trim() === "") return true;
  return standardValidator.isValid(colorSchema, value, colorSchema);
}
