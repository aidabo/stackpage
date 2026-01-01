// dataSourceService.ts - 完全重写为统一的服务
import { DataSource, DataSourceResult, HostFunctionDataSource } from "./types";

export class DataSourceService {
  // 获取数据源的数据（统一入口）
  static async fetchDataSourceData<T = any>(
    dataSource: DataSource,
    params?: Record<string, any>
  ): Promise<DataSourceResult<T>> {
    const timestamp = new Date().toISOString();

    try {
      let data: any;

      switch (dataSource.type) {
        case "host-function":
          // 调用宿主提供的函数获取数据
          const hostSource = dataSource as HostFunctionDataSource;
          data = await hostSource.fetchData(params || {});
          break;

        case "api":
          data = await this.fetchApiData(dataSource, params);
          break;

        case "static":
          data = dataSource.data;
          break;

        case "function":
          data = await this.executeFunctionData(dataSource, params);
          break;

        default:
          throw new Error(
            `Unsupported data source type: ${(dataSource as any).type}`
          );
      }

      return {
        success: true,
        data,
        timestamp,
        sourceId: dataSource.id,
      };
    } catch (error: any) {
      console.error(
        `Failed to fetch data from data source ${dataSource.name}:`,
        error
      );

      return {
        success: false,
        data: null as T,
        error: error.message || "Unknown error",
        timestamp,
        sourceId: dataSource.id,
      };
    }
  }

  // 获取API数据
  private static async fetchApiData(
    dataSource: DataSource & { type: "api" },
    params?: Record<string, any>
  ): Promise<any> {
    if (!dataSource.endpoint) {
      throw new Error("Endpoint is required for API data sources");
    }

    // 合并参数：数据源默认参数 + 调用时传入的参数
    const allParams = {
      ...(dataSource.parameters || {}),
      ...(params || {}),
    };

    const url = new URL(dataSource.endpoint);

    // 添加参数到URL
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

  // 执行函数数据源
  private static async executeFunctionData(
    dataSource: DataSource & { type: "function" },
    params?: Record<string, any>
  ): Promise<any> {
    if (!dataSource.functionCode) {
      throw new Error("Function code is required for function data sources");
    }

    try {
      // 注意：在生产环境中应该使用安全的沙箱执行
      const func = new Function(
        "params",
        `return (${dataSource.functionCode})(params)`
      );
      return func(params || {});
    } catch (error: any) {
      throw new Error(`Function execution failed: ${error.message}`);
    }
  }

  // 批量获取多个数据源的数据
  static async fetchMultipleDataSources(
    dataSources: DataSource[],
    paramsMap?: Map<string, Record<string, any>>
  ): Promise<Map<string, DataSourceResult>> {
    const results = new Map<string, DataSourceResult>();

    const promises = dataSources.map(async (ds) => {
      const params = paramsMap?.get(ds.id);
      const result = await this.fetchDataSourceData(ds, params);
      results.set(ds.id, result);
    });

    await Promise.all(promises);
    return results;
  }

  // 验证数据源配置
  static validateDataSource(dataSource: DataSource): string[] {
    const errors: string[] = [];

    if (!dataSource.name?.trim()) {
      errors.push("Name is required");
    }

    if (dataSource.type === "api" && !dataSource.endpoint?.trim()) {
      errors.push("Endpoint is required for API data sources");
    }

    if (dataSource.type === "function" && !dataSource.functionCode?.trim()) {
      errors.push("Function code is required for function data sources");
    }

    return errors;
  }
}
