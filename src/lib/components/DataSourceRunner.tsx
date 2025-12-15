import { useEffect, useRef } from "react";
import { useStackPage } from "./StackPageContext";
import { DataSource } from "./types";

export const DataSourceRunner = () => {
  const { source, setSource } = useStackPage();
  const dataSources = source.dataSources || [];
  
  // Track running intervals
  const intervalsRef = useRef<Record<string, NodeJS.Timeout>>({});

  // Helper to fetch single source
  const fetchDataSource = async (ds: DataSource) => {
      if (ds.type !== 'api' || !ds.endpoint) return;
      
      try {
          // console.log(`[DataSourceRunner] Fetching ${ds.name}...`);
          const res = await fetch(ds.endpoint, {
              method: ds.method,
              headers: ds.headers
              // body...
          });
          
          if (res.ok) {
              const json = await res.json();
              
              setSource(prev => {
                  const currentList = prev.dataSources || [];
                  const index = currentList.findIndex(d => d.id === ds.id);
                  if (index === -1) return prev;

                  const currentDs = currentList[index];
                  
                  // Simple check to avoid unnecessary updates
                  // Note: JSON.stringify is expensive for large data, but safest for generic objects
                  if (JSON.stringify(currentDs.data) === JSON.stringify(json)) {
                      return prev;
                  }

                  const newList = [...currentList];
                  newList[index] = {
                      ...currentDs,
                      data: json,
                      lastFetched: new Date().toISOString()
                  };

                  return { ...prev, dataSources: newList };
              });
          } else {
              console.warn(`[DataSourceRunner] Failed to fetch ${ds.name}: ${res.status}`);
          }
      } catch (e) {
          console.error(`[DataSourceRunner] Error fetching ${ds.name}`, e);
      }
  };

  // Effect to manage intervals and initial fetch
  useEffect(() => {
      const currentIds = new Set<string>();

      dataSources.forEach(ds => {
          currentIds.add(ds.id);
          
          // 1. Initial Fetch if no data
          // We use a ref to track if we already started a fetch for this ID to avoid double-fetching in StrictMode or re-renders
          // But here checking !ds.data is a good heuristic for "fresh" source
          if (!ds.data && ds.type === 'api') {
              fetchDataSource(ds);
          }

          // 2. Setup Interval
          if (ds.refreshInterval > 0) {
              if (!intervalsRef.current[ds.id]) {
                  // console.log(`[DataSourceRunner] Starting interval for ${ds.name}`);
                  const ms = ds.refreshInterval * 60 * 1000;
                  intervalsRef.current[ds.id] = setInterval(() => fetchDataSource(ds), ms);
              }
          } else {
              // Ensure no interval if it was removed/disabled
              if (intervalsRef.current[ds.id]) {
                  clearInterval(intervalsRef.current[ds.id]);
                  delete intervalsRef.current[ds.id];
              }
          }
      });

      // Cleanup stale intervals
      Object.keys(intervalsRef.current).forEach(id => {
          if (!currentIds.has(id)) {
              clearInterval(intervalsRef.current[id]);
              delete intervalsRef.current[id];
          }
      });

  // Dependency: config properties only.
  // We use a custom string to detect config changes without reacting to 'data' changes component-side.
  }, [
      JSON.stringify(dataSources.map(d => ({
          id: d.id, 
          endpoint: d.endpoint, 
          interval: d.refreshInterval,
          method: d.method
      })))
  ]);

  // Cleanup all on unmount
  useEffect(() => {
      return () => {
          Object.values(intervalsRef.current).forEach(clearInterval);
      };
  }, []);

  return null;
};
