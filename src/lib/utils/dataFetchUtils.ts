import { DataSource, HostFunctionDataSource } from "../components/types";
import { get } from "../utils/get";

export class DataFetchUtils {
  // Unified data fetching for all data source types
  static async fetchDataSourceData(
    dataSource: DataSource,
    params?: Record<string, any>
  ): Promise<any> {
    switch (dataSource.type) {
      case "host-function":
        const hostSource = dataSource as HostFunctionDataSource;
        return await hostSource.fetchData(params || {});

      case "api":
        return await this.fetchApiData(dataSource, params);

      case "static":
        return dataSource.data;

      case "function":
        return await this.executeFunctionData(dataSource, params);

      default:
        throw new Error(
          `Unsupported data source type: ${(dataSource as any).type}`
        );
    }
  }

  private static async fetchApiData(
    dataSource: DataSource & { type: "api" },
    params?: Record<string, any>
  ): Promise<any> {
    if (!dataSource.endpoint) {
      throw new Error("Endpoint is required for API data sources");
    }

    const allParams = {
      ...(dataSource.parameters || {}),
      ...(params || {}),
    };

    const url = new URL(dataSource.endpoint);
    Object.entries(allParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.append(key, String(value));
      }
    });

    const response = await fetch(url.toString(), {
      method: dataSource.method || "GET",
      headers: dataSource.headers || {},
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  }

  private static async executeFunctionData(
    dataSource: DataSource & { type: "function" },
    params?: Record<string, any>
  ): Promise<any> {
    if (!dataSource.functionCode) {
      throw new Error("Function code is required for function data sources");
    }

    try {
      const func = new Function(
        "params",
        `return (${dataSource.functionCode})(params)`
      );
      return func(params || {});
    } catch (error: any) {
      throw new Error(`Function execution failed: ${error.message}`);
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
