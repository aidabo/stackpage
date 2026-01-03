import React, { useState, ReactNode, useEffect, useRef } from "react";
import { StackPageContext, SourceData } from "./StackPageContext";
import { DataFetchUtils } from "../utils/dataFetchUtils";

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

  const hasFetchedInitialData = useRef(false);

  // Fetch data for dynamic data sources ONCE on page build/reload
  useEffect(() => {
    // Prevent fetching if already done or if no data sources
    if (hasFetchedInitialData.current || source.dataSources.length === 0) {
      return;
    }

    const fetchPageData = async () => {
      const dynamicSources = source.dataSources.filter(
        (ds) => ds.type !== "static" && (ds as any).data === undefined
      );

      if (dynamicSources.length === 0) {
        hasFetchedInitialData.current = true;
        return;
      }

      console.log(
        "[StackPageProvider] Fetching page data for dynamic sources..."
      );

      try {
        const fetchPromises = dynamicSources.map(async (ds) => {
          try {
            console.log(
              `[StackPageProvider] Fetching ${ds.type} source: ${ds.name}`
            );
            const data = await DataFetchUtils.fetchDataSourceData(
              ds,
              ds.parameters || {}
            );

            return {
              id: ds.id,
              data,
              success: true,
            };
          } catch (error: any) {
            console.error(
              `[StackPageProvider] Failed to fetch ${ds.type} source ${ds.name}:`,
              error
            );
            return {
              id: ds.id,
              data: null,
              success: false,
              error: error.message,
            };
          }
        });

        const results = await Promise.all(fetchPromises);

        // Update data sources with fetched data
        setSource((prev) => {
          const updatedDataSources = prev.dataSources.map((ds) => {
            const result = results.find((r) => r.id === ds.id);
            if (result && result.success) {
              return {
                ...ds,
                data: result.data,
              };
            }
            return ds;
          });

          return {
            ...prev,
            dataSources: updatedDataSources,
          };
        });

        console.log("[StackPageProvider] Page data fetch completed");
        hasFetchedInitialData.current = true;
      } catch (error) {
        console.error("[StackPageProvider] Failed to fetch page data:", error);
        hasFetchedInitialData.current = true; // Still mark as fetched to prevent retries
      }
    };

    fetchPageData();
  }, [source.dataSources]); // Only runs when data sources are initially set

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
