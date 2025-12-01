// StackPageContext.ts
import { createContext, useContext } from "react";
import { DataSource, ListDefinition } from "./types";

// Types for components in the layout
export interface ComponentInstance {
  id: string;
  type: string;
  props: Record<string, any>;
}

// Source structure
export interface SourceData {
  lists: ListDefinition[];
  dataSources: DataSource[];
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
    // Removed lists and dataSources from here
  };
  source: SourceData; // Moved to top level
  setPageAttributes: (attributes: any) => void;
  //setSource: (source: SourceData) => void; // New setter for source
  // FIXED TYPE HERE
  setSource: React.Dispatch<React.SetStateAction<SourceData>>;
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
