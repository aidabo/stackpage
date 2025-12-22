// StackPageProvider.tsx
import React, { useState, ReactNode } from "react";
import { StackPageContext, SourceData } from "./StackPageContext";
import { DataSourceService } from "./dataSourceService";

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
    "components" | "properties" | "page" | "list" | "datasource"
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

  // Fetch data for API sources
  React.useEffect(() => {
    const fetchMissingData = async () => {
      let hasUpdates = false;
      const updates = new Map<string, any>();

      const promises = source.dataSources.map(async (ds) => {
        // Only fetch if it's an API source and data is missing
        if (ds.type === "api" && ds.data === undefined) {
          try {
            console.log(
              `[StackPageProvider] Fetching data for source: ${ds.name}`
            );
            const data = await DataSourceService.fetchDataSourceData(ds);
            updates.set(ds.id, data);
            hasUpdates = true;
          } catch (e) {
            console.error(
              `[StackPageProvider] Failed to fetch data for ${ds.name}:`,
              e
            );
          }
        }
      });

      await Promise.all(promises);

      if (hasUpdates) {
        setSource((prev) => ({
          ...prev,
          dataSources: prev.dataSources.map((ds) => {
            if (updates.has(ds.id)) {
              return { ...ds, data: updates.get(ds.id) };
            }
            return ds;
          }),
        }));
      }
    };

    fetchMissingData();
  }, [source.dataSources]);

  const updateWidgetProps = (widgetId: string, props: object) => {
    console.log("Updating widget props for:", widgetId, props);
    setWidgetProps((prev) => new Map(prev).set(widgetId, props));
  };

  const value = {
    selectedComponent,
    setSelectedComponent,
    selectedInstance,
    setSelectedInstance,
    attributes,
    setPageAttributes,
    source, // Top level source
    setSource, // Setter for source
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
