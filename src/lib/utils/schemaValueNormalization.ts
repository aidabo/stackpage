/**
 * Normalize values that are known to be nullable in remote datasource
 * responses before they are passed to schema-driven editors/components.
 *
 * This intentionally changes only null values for schema-declared strings.
 * Other nullable fields retain their original value because null can carry
 * meaning for numbers, booleans, objects, and arrays.
 */
export function normalizeSchemaStringNulls(value: any, schema: any): any {
  if (value === null) {
    return schemaAllowsString(schema) ? "" : value;
  }

  if (Array.isArray(value)) {
    const itemSchema = schema?.items;
    return value.map((item) => normalizeSchemaStringNulls(item, itemSchema));
  }

  if (!value || typeof value !== "object" || !schema) {
    return value;
  }

  const properties = schema.properties;
  if (!properties || typeof properties !== "object") {
    return value;
  }

  const normalized = { ...value };
  Object.entries(properties).forEach(([key, propertySchema]) => {
    if (Object.prototype.hasOwnProperty.call(normalized, key)) {
      normalized[key] = normalizeSchemaStringNulls(
        normalized[key],
        propertySchema,
      );
    }
  });
  return normalized;
}

function schemaAllowsString(schema: any): boolean {
  if (!schema || typeof schema !== "object") return false;
  if (schema.type === "string") return true;
  if (Array.isArray(schema.type) && schema.type.includes("string")) {
    return true;
  }
  return [schema.anyOf, schema.oneOf]
    .filter(Array.isArray)
    .some((schemas) => schemas.some(schemaAllowsString));
}
