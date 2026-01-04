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

  // Unified binding logic based on schema type
  static createBindingSelector(
    selectedRecord: any,
    selectedRecordIndex: number | null,
    selectedItems: number[],
    targetSchemaType?: string // "object" or "array"
  ): { type: "id" | "index" | "all"; value?: string | number } {
    // Rule 3.1: If schema expects object type OR target is object, use single item
    if (targetSchemaType === "object" || !targetSchemaType) {
      // Always use first selected item for object binding
      if (selectedRecord) {
        if (selectedRecord.id !== undefined && selectedRecord.id !== null) {
          return { type: "id", value: selectedRecord.id };
        }
        return {
          type: "index",
          value: selectedRecordIndex !== null ? selectedRecordIndex : 0,
        };
      }
    }

    // Rule 3.2: If schema expects array type, use all selected items
    if (targetSchemaType === "array") {
      if (selectedItems.length > 1) {
        return { type: "all" };
      } else if (selectedRecord) {
        if (selectedRecord.id !== undefined && selectedRecord.id !== null) {
          return { type: "id", value: selectedRecord.id };
        }
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

  // Get value from data source with selector using the same get function as useDataBinding
  static getValueFromDataSource(
    data: any,
    path: string,
    selector?: { type: "id" | "index" | "all"; value?: string | number }
  ): any {
    if (!data) return undefined;

    let sourceData = data;

    // Apply selector if present
    if (selector) {
      if (Array.isArray(sourceData)) {
        if (selector.type === "id" && selector.value !== undefined) {
          sourceData = sourceData.find(
            (item: any) => String(item.id) === String(selector.value)
          );
        } else if (selector.type === "index" && selector.value !== undefined) {
          sourceData = sourceData[Number(selector.value)];
        }
        // For 'all' type, keep as array
      }
    }

    // Use the same get function as in useDataBinding
    if (!path) return sourceData;

    return get(sourceData, path);
  }
}
