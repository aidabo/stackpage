// types.ts
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
  | "array"; // Add array type

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

// List and DataSource types
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

export interface DataSource {
  id: string;
  name: string;
  description: string;
  type: "api" | "static" | "function";
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers: Record<string, string>;
  parameters: Record<string, any>;
  mapping: Record<string, string>;
  refreshInterval: number;
  lastFetched?: string;
  data?: any;
}

export interface FieldSchema {
  key: string;
  label: string;
  type: FieldType;

  // Options Source Configuration
  options?: string[]; // Manual options
  listRef?: string; // Reference to NamedList

  // Data Source Configuration
  dataSourceRef?: string; // Reference to DataSource
  dataSourceLabelKey?: string; // Property to use as label (e.g., 'name')
  dataSourceValueKey?: string; // Property to use as value (e.g., 'id')

  // Select Field Active Source
  activeSelectSource?: "options" | "list" | "api"; // 新增：当前激活的select配置源

  // Array Configuration
  itemSchema?: FieldSchema[]; // For 'array' type: define the shape of list items

  placeholder?: string;
  description?: string;
}
