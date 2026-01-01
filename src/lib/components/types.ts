// types.ts - 完整修改
export type FieldType =
  | "text"
  | "textarea"
  | "richtext"
  | "select"
  | "checkbox"
  | "number"
  | "image"
  | "video"
  | "audio"
  | "color"
  | "file"
  | "tel"
  | "email"
  | "password"
  | "date"
  | "array";

export interface NamedList {
  id: string;
  name: string;
  description: string;
  items: Array<{
    id: string;
    label: string;
    value: string;
  }>;
}

export interface ListItem {
  id: string;
  label: string;
  value: string;
}

export interface ListDefinition {
  id: string;
  name: string;
  description: string;
  items: ListItem[];
}

// 基本数据源类型
export interface BaseDataSource {
  id: string;
  name: string;
  description?: string;
  category?: string;
  tags?: string[];
  icon?: string;
}

// 外部API数据源（用户创建）
export interface ApiDataSource extends BaseDataSource {
  type: "api";
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers: Record<string, string>;
  parameters: Record<string, any>;
  refreshInterval: number;
  lastFetched?: string;
  data?: any;
}

// 静态数据源（用户创建）
export interface StaticDataSource extends BaseDataSource {
  type: "static";
  data: any;
}

// 函数数据源（用户创建）
export interface FunctionDataSource extends BaseDataSource {
  type: "function";
  functionCode: string;
}

// 宿主函数数据源（宿主提供，包含获取数据的函数）
export interface HostFunctionDataSource extends BaseDataSource {
  type: "host-function";
  // 获取数据的函数
  fetchData: (params?: Record<string, any>) => Promise<any>;
  // 参数定义
  parameters?: Array<{
    name: string;
    type: "string" | "number" | "boolean" | "array" | "object";
    required?: boolean;
    defaultValue?: any;
    description?: string;
  }>;
}

// 联合类型
export type DataSource =
  | ApiDataSource
  | StaticDataSource
  | FunctionDataSource
  | HostFunctionDataSource;

// 数据源配置对话框需要的类型
export interface DataSourceConfig {
  name: string;
  description?: string;
  category?: string;
  endpoint?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  parameters?: Record<string, any>;
  data?: any;
  functionCode?: string;
  refreshInterval?: number;
}

// 数据源获取结果
export interface DataSourceResult<T = any> {
  success: boolean;
  data: T;
  error?: string;
  timestamp: string;
  sourceId: string;
}

// 宿主数据源提供者回调
export type GetHostDataSourcesFn = () => Promise<HostFunctionDataSource[]>;

export interface FieldSchema {
  key: string;
  label: string;
  type: FieldType;
  options?: string[];
  listRef?: string;
  dataSourceRef?: string;
  dataSourceLabelKey?: string;
  dataSourceValueKey?: string;
  activeSelectSource?: "options" | "list" | "api";
  itemSchema?: FieldSchema[];
  placeholder?: string;
  description?: string;
}
