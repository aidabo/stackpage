// bindingValidation.ts - Shared validation utilities for data binding
import { applyTransformer } from "./transformers";
import type { BindingInfo } from "./bindingEngine";

export interface ValidationWarning {
  property: string;
  message: string;
  severity: "warning" | "error";
}

/**
 * Validates if a value is compatible with a property schema
 * This is shared between DataExplorerDialog and DataTab
 */
export const validateBindingAgainstSchema = (
  binding: BindingInfo | undefined,
  propSchema: any,
  dataValue: any
): string[] => {
  const warnings: string[] = [];

  if (!propSchema) return warnings;

  const propType = propSchema.type;
  const propFormat = propSchema.format;

  // Skip validation if value is undefined/null and prop is optional
  if ((dataValue === undefined || dataValue === null) && !propSchema.required) {
    return warnings;
  }

  // Apply transformer if specified
  let transformedValue = dataValue;
  if (binding?.transformer) {
    try {
      transformedValue = applyTransformer(dataValue, binding.transformer);
    } catch (error: any) {
      warnings.push(`Transformer error: ${error.message}`);
    }
  }

  // Handle array of objects schema
  if (propType === "array" && propSchema.items?.type === "object") {
    if (!Array.isArray(transformedValue)) {
      warnings.push(
        `Property expects array of objects but got ${typeof transformedValue}`
      );
    } else if (transformedValue.length > 0) {
      // Check first item as sample
      const firstItem = transformedValue[0];
      if (typeof firstItem !== "object" || firstItem === null) {
        warnings.push(`Array items should be objects`);
      }
    }
  }
  // Check type compatibility for basic types
  else if (propType === "number") {
    const numValue = Number(transformedValue);
    if (isNaN(numValue)) {
      warnings.push(`Property expects number but got "${transformedValue}"`);
    }
  } else if (propType === "boolean") {
    if (typeof transformedValue !== "boolean") {
      warnings.push(
        `Property expects boolean but got ${typeof transformedValue}`
      );
    }
  } else if (propType === "string") {
    if (typeof transformedValue !== "string") {
      warnings.push(
        `Property expects string but got ${typeof transformedValue}`
      );
    } else {
      // Check format for strings
      if (
        propFormat === "email" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(transformedValue)
      ) {
        warnings.push(`Property expects email format`);
      }
      if (propFormat === "uri" && !/^https?:\/\/.+/.test(transformedValue)) {
        warnings.push(`Property expects URL format (http:// or https://)`);
      }
      if (propFormat === "date-time" && isNaN(Date.parse(transformedValue))) {
        warnings.push(`Property expects valid date-time format`);
      }
    }
  } else if (propType === "array" && !Array.isArray(transformedValue)) {
    warnings.push(`Property expects array but got ${typeof transformedValue}`);
  } else if (propType === "object") {
    if (
      transformedValue === null ||
      typeof transformedValue !== "object" ||
      Array.isArray(transformedValue)
    ) {
      warnings.push(
        `Property expects object but got ${typeof transformedValue}`
      );
    }
  }

  return warnings;
};

/**
 * Validates all bindings against schema with sample data
 */
export const validateAllBindings = (
  bindings: Record<string, BindingInfo>,
  schema: any,
  data: any,
  getValueFn: (data: any, path: string) => any
): ValidationWarning[] => {
  const warnings: ValidationWarning[] = [];

  if (!bindings || !schema?.properties) return warnings;

  Object.entries(bindings).forEach(([prop, binding]) => {
    const propSchema = schema.properties[prop];
    if (!propSchema) {
      warnings.push({
        property: prop,
        message: `Property "${prop}" not found in schema`,
        severity: "warning",
      });
      return;
    }

    const value = binding.path ? getValueFn(data, binding.path) : undefined;

    if (value === undefined) {
      warnings.push({
        property: prop,
        message: `Data not found at path: ${binding.path}`,
        severity: "warning",
      });
      return;
    }

    const validationWarnings = validateBindingAgainstSchema(
      binding,
      propSchema,
      value
    );

    validationWarnings.forEach((message) => {
      warnings.push({
        property: prop,
        message,
        severity: validationWarnings.length > 1 ? "error" : "warning",
      });
    });
  });

  return warnings;
};

/**
 * Helper to create a user-friendly type compatibility display
 */
export const getTypeCompatibilityDisplay = (
  warnings: string[]
): { text: string; className: string; tooltip?: string } => {
  if (warnings.length === 0) {
    return { text: "✓ Compatible", className: "text-green-600 text-xs" };
  } else if (warnings.length === 1) {
    return {
      text: "⚠️ Warning",
      className: "text-yellow-600 text-xs cursor-help",
      tooltip: warnings[0],
    };
  } else {
    return {
      text: `❌ ${warnings.length} issues`,
      className: "text-red-600 text-xs cursor-help",
      tooltip: warnings.join("\n"),
    };
  }
};
