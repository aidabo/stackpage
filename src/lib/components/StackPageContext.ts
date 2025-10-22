import { createContext, useContext } from "react";

// Types for components in the layout
export interface ComponentInstance {
  id: string;
  type: string;
  props: Record<string, any>;
}

// Context interface
export interface StackPageContextType {
  selectedComponent: string | null;
  setSelectedComponent: (component: string | null) => void;
  selectedInstance: ComponentInstance | null;
  setSelectedInstance: (instance: ComponentInstance | null) => void;
  pageAttributes: {
    margin: string;
    padding: string;
    background: string;
    showMenubar: boolean;
    image?: string; // Add this
    tag?: string; // Add this
    status?: string; // Add this
  };
  setPageAttributes: (attributes: any) => void;
  activeTab: "components" | "properties" | "page";
  setActiveTab: (tab: "components" | "properties" | "page") => void;
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
