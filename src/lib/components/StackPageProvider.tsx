import React, { useState, ReactNode } from "react";
import { StackPageContext, SourceData } from "./StackPageContext";

interface StackPageProviderProps {
  children: ReactNode;
}

export const StackPageProvider: React.FC<StackPageProviderProps> = ({
  children,
}) => {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  );
  const [selectedInstance, setSelectedInstance] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<
    "components" | "properties" | "page" | "list" | "datasource" | "search"
  >("components");
  const [widgetProps, setWidgetProps] = useState<Map<string, object>>(
    new Map()
  );

  const [attributes, setPageAttributes] = useState({
    type: "page",
    title: "untitled page",
    excerpt: "",
    image: "",
    status: "draft" as "draft" | "published",
    published_at: null as Date | null,
    margin: "0px",
    padding: "0px",
    background: "#ffffff",
    showMenubar: true,
  });

  const [source, setSource] = useState<SourceData>({
    lists: [],
    dataSources: [],
  });

  const updateWidgetProps = (widgetId: string, props: object) => {
    console.log(
      "[StackPageProvider] Updating widget props for:",
      widgetId,
      props
    );
    setWidgetProps((prev) => new Map(prev).set(widgetId, props));
  };

  const value = {
    selectedComponent,
    setSelectedComponent,
    selectedInstance,
    setSelectedInstance,
    attributes,
    setPageAttributes,
    source,
    setSource,
    activeTab,
    setActiveTab,
    widgetProps,
    updateWidgetProps,
  };

  return (
    <StackPageContext.Provider value={value}>
      {children}
    </StackPageContext.Provider>
  );
};
