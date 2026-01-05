import { DataSource } from "../components/types";
import { get } from "../utils/get";
import { DataSourceService } from "../components/DataSourceService";

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

  static createBindingSelector(
    selectedRecord: any,
    selectedRecordIndex: number | null,
    selectedItems: number[],
    targetSchemaType?: string,
    data?: any[] // Add data parameter to check for IDs
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

    // Rule 3: all for all data source records (explicit choice)
    // Note: This should be triggered by a UI control, not automatically

    // Default fallback
    return {
      type: "index",
      value: selectedRecordIndex !== null ? selectedRecordIndex : 0,
    };
  }

  static getValueFromDataSource(
    data: any,
    path: string,
    selector?: {
      type: "id" | "ids" | "index" | "all";
      value?: string | number | string[];
    }
  ): any {
    if (!data) return undefined;

    let sourceData = data;

    // Apply selector if present
    if (selector && Array.isArray(sourceData)) {
      switch (selector.type) {
        case "id":
          if (selector.value !== undefined) {
            sourceData = sourceData.find(
              (item: any) => String(item.id) === String(selector.value)
            );
          }
          break;

        case "ids":
          if (selector.value && Array.isArray(selector.value)) {
            sourceData = sourceData.filter((item: any) =>
              (selector.value! as any).includes(String(item.id))
            );
          }
          break;

        case "index":
          if (selector.value !== undefined) {
            sourceData = sourceData[Number(selector.value)];
          }
          break;

        case "all":
          // Keep all data
          break;
      }
    }

    if (!path) return sourceData;

    // If sourceData is array after selector, map over each item
    if (Array.isArray(sourceData) && path) {
      return sourceData.map((item: any) => get(item, path));
    }

    return get(sourceData, path);
  }
}
