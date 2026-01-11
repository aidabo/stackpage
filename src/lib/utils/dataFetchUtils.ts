import { DataSource } from "../components/types";
import { get } from "../utils/get";
import { DataSourceService } from "../components/DataSourceService";
import { ArrayBindingUtils } from "./ArrayBindingUtils";

export class DataFetchUtils {
  static async fetchDataSourceData(
    dataSource: DataSource,
    params?: Record<string, any>
  ): Promise<any> {
    console.log(
      `[DataFetchUtils] Fetching data via DataSourceService for ${dataSource.name}`
    );

    const result = await DataSourceService.fetchDataSourceData(
      dataSource,
      params
    );

    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.error || "Failed to fetch data");
    }
  }

  /**
   * SIMPLIFIED: For array binding, always returns all records
   * For non-array binding, can still use selector if needed
   */
  static getValueFromDataSource(
    data: any,
    path: string,
    targetType?: string
  ): any {
    if (!data) return undefined;

    // For array bindings (targetType === "array"), always get all records
    if (targetType === "array" || path.includes("[]")) {
      // Use ArrayBindingUtils which always returns all records
      return ArrayBindingUtils.getArrayElementData(data, path);
    }

    // For non-array paths, use regular get
    return get(data, path);
  }

  static createBindingSelector(
    selectedRecord: any,
    selectedRecordIndex: number | null,
    selectedItems: number[],
    targetSchemaType?: string,
    data?: any[]
  ): {
    type: "id" | "ids" | "index" | "all";
    value?: string | number | string[];
  } {
    // Helper to check if record has ID
    const hasId = (record: any) =>
      record && record.id !== undefined && record.id !== null;

    // Helper to get ID from record
    const getId = (record: any) => String(record.id);

    // Rule 1: id for schema type object component or single record
    if (
      targetSchemaType === "object" ||
      !targetSchemaType ||
      selectedItems.length <= 1
    ) {
      if (selectedRecord && hasId(selectedRecord)) {
        return { type: "id", value: getId(selectedRecord) };
      }
      return {
        type: "index",
        value: selectedRecordIndex !== null ? selectedRecordIndex : 0,
      };
    }

    // Rule 2: ids for multiple selected records (schema type array)
    if (targetSchemaType === "array" && selectedItems.length > 1 && data) {
      // Get selected records
      const selectedRecords = selectedItems
        .map((index) => data[index])
        .filter(Boolean);

      // Check if all selected records have IDs
      const allHaveIds = selectedRecords.every(hasId);

      if (allHaveIds) {
        return {
          type: "ids",
          value: selectedRecords.map((record) => getId(record)),
        };
      } else {
        // Fallback to index for records without IDs
        return {
          type: "index",
          value: selectedRecordIndex !== null ? selectedRecordIndex : 0,
        };
      }
    }

    // Default fallback
    return {
      type: "index",
      value: selectedRecordIndex !== null ? selectedRecordIndex : 0,
    };
  }

  /**
   * Get value for a specific binding (simplified version)
   */
  static getBindingValue(data: any, binding: any): any {
    if (!data || !binding) return undefined;

    const { path, targetType } = binding;

    if (!path) return undefined;

    // For array bindings, always get all records
    if (targetType === "array" || path.includes("[]")) {
      return ArrayBindingUtils.getArrayElementData(data, path);
    }

    // For regular bindings, use get
    return get(data, path);
  }
}
