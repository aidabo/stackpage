// TransformerRegistry.ts - A class-based transformer registry
import {
  transformers,
  applyTransformer,
  getTransformerDescription,
} from "./transformers";

export class TransformerRegistry {
  // Get a transformer function by ID
  static get(transformerId: string): ((value: any) => any) | undefined {
    return transformers[transformerId];
  }

  // Apply a transformer to a value
  static apply(transformerId: string, value: any): any {
    return applyTransformer(value, transformerId);
  }

  // Check if a transformer exists
  static has(transformerId: string): boolean {
    return !!transformers[transformerId];
  }

  // Get all available transformer IDs
  static getAllIds(): string[] {
    return Object.keys(transformers);
  }

  // Get transformer description
  static getDescription(transformerId: string): string {
    return getTransformerDescription(transformerId);
  }

  // Register a custom transformer
  static register(
    transformerId: string,
    transformerFn: (value: any) => any
  ): void {
    if (transformers[transformerId]) {
      console.warn(
        `Transformer "${transformerId}" already exists. Overwriting.`
      );
    }
    transformers[transformerId] = transformerFn;
  }

  // Unregister a transformer
  static unregister(transformerId: string): boolean {
    if (transformers[transformerId]) {
      delete transformers[transformerId];
      return true;
    }
    return false;
  }

  // Apply multiple transformers to multiple properties
  static applyMultiple(
    transformerMap: Record<string, string>,
    data: Record<string, any>
  ): Record<string, any> {
    const result = { ...data };

    Object.entries(transformerMap).forEach(([key, transformerId]) => {
      if (result.hasOwnProperty(key) && transformers[transformerId]) {
        result[key] = transformers[transformerId](result[key]);
      }
    });

    return result;
  }
}

// Export the transformers object as default for backward compatibility
export default TransformerRegistry;
