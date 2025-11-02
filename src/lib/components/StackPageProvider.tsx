import { useState, useCallback, ReactNode } from "react";
import {
  StackPageContext,
  StackPageContextType,
  ComponentInstance,
} from "./StackPageContext";

// Props for the provider
interface StackPageProviderProps {
  children: ReactNode;
}

// Provider component
export function StackPageProvider({ children }: StackPageProviderProps) {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  );
  const [selectedInstance, setSelectedInstance] =
    useState<ComponentInstance | null>(null);
  const [attributes, setPageAttributes] = useState<any>({
    type: "page",
    title: "Untitled Page",
    status: "draft", // Add this
    margin: "5",
    padding: "10px",
    background: "#ffffff",
    showMenubar: true,
    image: "", // Add this    
  });
  const [activeTab, setActiveTab] = useState<
    "components" | "properties" | "page"
  >("components");
  const [widgetProps, setWidgetProps] = useState<Map<string, object>>(
    new Map()
  );

  const updateWidgetProps = useCallback((widgetId: string, props: object) => {
    setWidgetProps((prev) => {
      const newMap = new Map(prev);
      newMap.set(widgetId, props);
      return newMap;
    });
  }, []);

  const contextValue: StackPageContextType = {
    selectedComponent,
    setSelectedComponent,
    selectedInstance,
    setSelectedInstance,
    attributes,
    setPageAttributes,
    activeTab,
    setActiveTab,
    widgetProps,
    updateWidgetProps,
  };

  return (
    <StackPageContext.Provider value={contextValue}>
      {children}
    </StackPageContext.Provider>
  );
}
