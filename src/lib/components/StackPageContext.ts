import { createContext, useContext } from "react";

// Types for components in the layout
export interface ComponentInstance {
  id: string;
  type: string;
  props: Record<string, any>;
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

// Context interface
export interface StackPageContextType {
  selectedComponent: string | null;
  setSelectedComponent: (component: string | null) => void;
  selectedInstance: ComponentInstance | null;
  setSelectedInstance: (instance: ComponentInstance | null) => void;
  attributes: {
    type: string;
    title: string;
    excerpt?: string;
    image?: string;
    status?: "draft" | "published";
    published_at?: Date | null;
    margin: string;
    padding: string;
    background: string;
    showMenubar: boolean;
    lists?: ListDefinition[];
    dataSources?: DataSource[];
  };
  setPageAttributes: (attributes: any) => void;
  activeTab: "components" | "properties" | "page" | "list" | "datasource";
  setActiveTab: (
    tab: "components" | "properties" | "page" | "list" | "datasource"
  ) => void;
  widgetProps: Map<string, object>;
  updateWidgetProps: (widgetId: string, props: object) => void;
}

// Create context
export const StackPageContext = createContext<StackPageContextType | undefined>(
  undefined
);

// Hook for using the context
export const useStackPage = () => {
  const context = useContext(StackPageContext);
  if (!context) {
    throw new Error("useStackPage must be used within a StackPageProvider");
  }
  return context;
};

// Hook specifically for widget props
export const useStackPageWidgetProps = () => {
  const context = useContext(StackPageContext);
  if (!context) {
    throw new Error(
      "useStackPageWidgetProps must be used within a StackPageProvider"
    );
  }
  return {
    widgetProps: context.widgetProps,
    updateWidgetProps: context.updateWidgetProps,
  };
};
