import { DataSource, DataSourceResult, HostFunctionDataSource } from "./types";

export class DataSourceService {
  // Static registry for host data sources
  private static hostDataSourcesRegistry: HostFunctionDataSource[] = [];

  // Method to set host data sources from the host app
  static setHostDataSources(sources: HostFunctionDataSource[]) {
    console.log(
      "[DataSourceService] Setting host data sources:",
      sources.length
    );
    DataSourceService.hostDataSourcesRegistry = sources;
  }

  // Get all registered host data sources
  static getHostDataSources(): HostFunctionDataSource[] {
    return [...DataSourceService.hostDataSourcesRegistry];
  }

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
          data = await this.fetchHostFunctionData(
            dataSource as HostFunctionDataSource,
            params
          );
          break;

        case "api":
          data = await this.fetchApiData(dataSource, params);
          break;

        case "static":
          data = dataSource.data;
          break;

        default:
          throw new Error(
            `Unsupported data source type: ${(dataSource as any).type}`
          );
      }

      // Apply wrapper key if specified and data is an array
      if (dataSource.wrapperKey && Array.isArray(data)) {
        console.log(
          `[DataSourceService] Applying wrapper key "${dataSource.wrapperKey}" to array result`
        );
        data = { [dataSource.wrapperKey]: data };
      }

      return {
        success: true,
        data,
        timestamp,
        sourceId: dataSource.id,
      };
    } catch (error: any) {
      console.error(
        `[DataSourceService] Failed to fetch data from data source ${dataSource.name}:`,
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

  // Fetch data for host-function data source
  private static async fetchHostFunctionData(
    dataSource: HostFunctionDataSource,
    params?: Record<string, any>
  ): Promise<any> {
    console.log(
      `[DataSourceService] Fetching host-function data for ${dataSource.name}`
    );

    // If the data source already has a fetchData function (from dialog testing), use it
    if (dataSource.fetchData) {
      console.log(
        `[DataSourceService] Using direct fetchData for ${dataSource.name}`
      );
      return await dataSource.fetchData(params || {});
    }

    // Look up in the registry by hostFunctionId
    let hostFunc: HostFunctionDataSource | undefined;

    if (dataSource.hostFunctionId) {
      hostFunc = DataSourceService.hostDataSourcesRegistry.find(
        (h) => h.id === dataSource.hostFunctionId
      );

      if (hostFunc) {
        console.log(
          `[DataSourceService] Found host function by ID ${dataSource.hostFunctionId} for ${dataSource.name}`
        );
      }
    }

    // If not found by ID, try by name
    if (!hostFunc && dataSource.hostFunctionName) {
      hostFunc = DataSourceService.hostDataSourcesRegistry.find(
        (h) => h.name === dataSource.hostFunctionName
      );

      if (hostFunc) {
        console.log(
          `[DataSourceService] Found host function by name ${dataSource.hostFunctionName} for ${dataSource.name}`
        );
      }
    }

    // If still not found, try to find by any matching name
    if (!hostFunc && dataSource.name) {
      hostFunc = DataSourceService.hostDataSourcesRegistry.find(
        (h) =>
          h.name.toLowerCase().includes(dataSource.name.toLowerCase()) ||
          dataSource.name.toLowerCase().includes(h.name.toLowerCase())
      );

      if (hostFunc) {
        console.log(
          `[DataSourceService] Found host function by approximate name match for ${dataSource.name}`
        );
      }
    }

    if (!hostFunc || !hostFunc.fetchData) {
      const available = DataSourceService.hostDataSourcesRegistry
        .map((f) => f.name)
        .join(", ");
      throw new Error(
        `Host function for data source "${dataSource.name}" not found. ` +
          `Available functions: ${available || "none"}`
      );
    }

    // Merge parameters: data source parameters + passed params
    const allParams = {
      ...(dataSource.parameters || {}),
      ...(params || {}),
    };

    return await hostFunc.fetchData(allParams);
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

    return errors;
  }
}
