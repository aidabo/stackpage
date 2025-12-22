import { DataSource } from "./types";

export class DataSourceService {
  // 获取数据源的数据（静态或API）
  static async fetchDataSourceData(dataSource: DataSource): Promise<any> {
    if (dataSource.type === "static") {
      return dataSource.data || null;
    } else if (dataSource.type === "api") {
      try {
        const url = new URL(dataSource.endpoint);

        // 添加参数到URL
        if (dataSource.parameters) {
          Object.entries(dataSource.parameters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
              url.searchParams.append(key, String(value));
            }
          });
        }

        const response = await fetch(url.toString(), {
          method: dataSource.method || "GET",
          headers: dataSource.headers || {},
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return await response.json();
      } catch (error) {
        console.error(
          `Failed to fetch data from data source ${dataSource.name}:`,
          error
        );
        throw error;
      }
    }
    return null;
  }

  // 批量获取多个数据源的数据
  static async fetchMultipleDataSources(
    dataSources: DataSource[]
  ): Promise<Map<string, any>> {
    const results = new Map<string, any>();

    const promises = dataSources.map(async (ds) => {
      try {
        const data = await this.fetchDataSourceData(ds);
        results.set(ds.id, data);
      } catch (error) {
        console.error(`Failed to fetch data for data source ${ds.id}:`, error);
        results.set(ds.id, null);
      }
    });

    await Promise.all(promises);
    return results;
  }
}
