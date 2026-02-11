// StackPageContext.ts
import { createContext, useContext } from "react";
import { DataSource, ListDefinition } from "./types";
import {
  EmitComponentEventPayload,
} from "../utils/componentCommunication";

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
  activeTab:
  | "components"
  | "properties"
  | "page"
  | "list"
  | "datasource"
  | "search";
  setActiveTab: (
    tab: "components" | "properties" | "page" | "list" | "datasource" | "search"
  ) => void;
  widgetProps: Map<string, object>;
  updateWidgetProps: (widgetId: string, props: object) => void;
  registerWidgetSnapshot: (widgetId: string, props: Record<string, any>) => void;
  getWidgetSnapshot: (widgetId: string) => Record<string, any> | undefined;
  sharedState: Record<string, any>;
  setSharedState: (path: string, value: any) => void;
  getSharedState: <T = any>(path: string, defaultValue?: T) => T | undefined;
  emitComponentEvent: (payload: EmitComponentEventPayload) => void;
  subscribeComponentEvent: (
    eventName: string,
    handler: (payload: any, meta: { sourceWidgetId: string; eventName: string }) => void
  ) => () => void;
  unsubscribeComponentEvent: (eventName: string, subscriptionId: string) => void;
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
