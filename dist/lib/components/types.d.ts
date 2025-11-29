export type FieldType = "text" | "textarea" | "richtext" | "select" | "checkbox" | "image" | "video" | "audio" | "color" | "file" | "tel" | "email" | "password" | "date" | "array";
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
export interface DataSource {
    id: string;
    name: string;
    description: string;
    type: "api" | "static" | "function";
    endpoint: string;
    method: string;
    headers: Record<string, string>;
    parameters: Record<string, any>;
    mapping: Record<string, any>;
    refreshInterval: number;
    data?: any;
    lastFetched?: string;
}
export interface FieldSchema {
    key: string;
    label: string;
    type: FieldType;
    options?: string[];
    listRef?: string;
    dataSourceRef?: string;
    dataSourceLabelKey?: string;
    dataSourceValueKey?: string;
    itemSchema?: FieldSchema[];
    placeholder?: string;
    description?: string;
}
