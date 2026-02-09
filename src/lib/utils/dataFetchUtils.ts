import { DataSource } from "../components/types";
import { DataSourceService } from "../components/DataSourceService";
import {
  BindingInfo,
  BindingSelector,
  createBindingSelector as createSelectorInEngine,
  resolveBindingValue,
} from "./bindingEngine";

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
    targetType?: string,
    selector?: BindingSelector
  ): any {
    if (!data || !path) return undefined;
    const binding: BindingInfo = {
      sourceId: "",
      path,
      targetType,
      selector,
    };
    return resolveBindingValue(data, binding);
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
    return createSelectorInEngine({
      selectedRecord,
      selectedRecordIndex,
      selectedItems,
      targetSchemaType,
      records: data,
    });
  }

  /**
   * Get value for a specific binding (simplified version)
   */
  static getBindingValue(data: any, binding: any): any {
    if (!data || !binding) return undefined;
    return resolveBindingValue(data, binding);
  }
}
