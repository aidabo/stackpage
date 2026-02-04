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
  // 通用参数字段 - 所有数据源类型都可以有
  parameters?: Record<string, any>;
  // NEW: Wrapper key for array results
  wrapperKey?: string;
  data?: any;
}

// 外部API数据源（用户创建）
export interface ApiDataSource extends BaseDataSource {
  type: "api";
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers: Record<string, string>;
  refreshInterval: number;
  lastFetched?: string;
}

// 静态数据源（用户创建）
export interface StaticDataSource extends BaseDataSource {
  type: "static";
  data: any;
}

// 宿主函数数据源（宿主提供，包含获取数据的函数）
export interface HostFunctionDataSource extends BaseDataSource {
  type: "host-function";
  // 获取数据的函数 - 宿主提供
  fetchData: (params?: Record<string, any>) => Promise<any>;
  // 宿主函数标识符（用于匹配宿主提供的函数）
  hostFunctionId?: string;
  // 宿主函数显示的名称
  hostFunctionName?: string;
  // 注意：不定义特殊parameters，使用BaseDataSource中的通用parameters字段
}

// 联合类型
export type DataSource =
  | ApiDataSource
  | StaticDataSource
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

// stackpage/i18n/types.ts
export interface StackI18n {
  t: (key: string, options?: any) => string;
  locale: string;
}