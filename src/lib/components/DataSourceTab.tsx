import { useState, useEffect, useCallback, useRef } from "react";
import { useStackPage } from "./StackPageContext";
import { DataSource } from "./types";
import {
  TrashIcon,
  PlayIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

/* ------------------------------------------------------------------
   deepEqual utility used for preventing unnecessary re-sync loops
------------------------------------------------------------------- */
const deepEqual = (a: any, b: any): boolean => {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (a == null || b == null) return a === b;

  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) if (!deepEqual(a[i], b[i])) return false;
    return true;
  }

  if (typeof a === "object") {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    for (const k of aKeys) {
      if (!deepEqual(a[k], b[k])) return false;
    }
    return true;
  }

  return a === b;
};

/* ------------------------------------------------------------------
   Main Component
------------------------------------------------------------------- */

export const DataSourceTab = () => {
  const { source, setSource } = useStackPage();

  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const dataSourcesRef = useRef(dataSources);
  dataSourcesRef.current = dataSources;

  const [expandedDataSource, setExpandedDataSource] = useState<string | null>(
    null
  );

  const [newDataSource, setNewDataSource] = useState<Partial<DataSource>>({
    type: "api",
    method: "GET",
    headers: {},
    parameters: {},
    mapping: {},
    refreshInterval: 0,
  });

  const [isTesting, setIsTesting] = useState(false);

  /* ------------------------------------------------------------------
     Safe load from source -> local state (prevents flashing)
  ------------------------------------------------------------------- */
  useEffect(() => {
    const incoming = source.dataSources || [];
    if (!deepEqual(incoming, dataSourcesRef.current)) {
      setDataSources(Array.isArray(incoming) ? incoming : []);
    }
  }, [source.dataSources]);

  /* ------------------------------------------------------------------
     Create Data Source
  ------------------------------------------------------------------- */
  const handleCreateDataSource = useCallback(() => {
    if (!newDataSource.name?.trim()) return;

    const ds: DataSource = {
      id: `ds_${Date.now()}`,
      name: newDataSource.name,
      description: newDataSource.description || "",
      type: newDataSource.type || "api",
      endpoint: newDataSource.endpoint || "",
      method: newDataSource.method || "GET",
      headers: newDataSource.headers || {},
      parameters: newDataSource.parameters || {},
      mapping: newDataSource.mapping || {},
      refreshInterval: newDataSource.refreshInterval || 0,
    };

    // Update both local state and context in one go
    const newDataSources = [...dataSources, ds];
    setDataSources(newDataSources);
    setSource((prev) => ({
      ...prev,
      dataSources: newDataSources,
    }));

    setExpandedDataSource(ds.id);

    // Reset new data source form
    setNewDataSource({
      type: "api",
      method: "GET",
      headers: {},
      parameters: {},
      mapping: {},
      refreshInterval: 0,
    });
  }, [newDataSource, dataSources, setSource]);

  /* ------------------------------------------------------------------
     Delete Data Source
  ------------------------------------------------------------------- */
  const handleDeleteDataSource = useCallback(
    (id: string) => {
      const newDataSources = dataSources.filter((ds) => ds.id !== id);
      setDataSources(newDataSources);
      setSource((prev) => ({
        ...prev,
        dataSources: newDataSources,
      }));
      if (expandedDataSource === id) setExpandedDataSource(null);
    },
    [dataSources, expandedDataSource, setSource]
  );

  /* ------------------------------------------------------------------
     Update Data Source (partial)
  ------------------------------------------------------------------- */
  const handleUpdateDataSource = useCallback(
    (id: string, updates: Partial<DataSource>) => {
      const newDataSources = dataSources.map((ds) =>
        ds.id === id ? { ...ds, ...updates } : ds
      );
      setDataSources(newDataSources);
      setSource((prev) => ({
        ...prev,
        dataSources: newDataSources,
      }));
    },
    [dataSources, setSource]
  );

  /* ------------------------------------------------------------------
     Test Data Source (mock async)
  ------------------------------------------------------------------- */
  const handleTestDataSource = useCallback(
    async (dataSource: DataSource) => {
      setIsTesting(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const mockData = {
          items: [
            { id: 1, name: "Test Item 1" },
            { id: 2, name: "Test Item 2" },
          ],
          total: 2,
        };

        handleUpdateDataSource(dataSource.id, {
          data: mockData,
          lastFetched: new Date().toISOString(),
        });

        alert("Data source test successful!");
      } catch (err: any) {
        alert("Data source test failed: " + err.message);
      } finally {
        setIsTesting(false);
      }
    },
    [handleUpdateDataSource]
  );

  /* ------------------------------------------------------------------
     Rendering
  ------------------------------------------------------------------- */

  return (
    <div className="h-full p-4 space-y-4 bg-zinc-200 overflow-y-auto scrollbar-thin">
      <h3 className="text-lg font-medium mb-3">Data Source Manager</h3>

      {/* CREATE NEW DATA SOURCE */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h4 className="font-medium text-gray-800 mb-3">Create Data Source</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              value={newDataSource.name || ""}
              onChange={(e) =>
                setNewDataSource((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              placeholder="Enter data source name"
              className="w-full p-2 border border-gray-300 rounded text-sm"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              value={newDataSource.type || "api"}
              onChange={(e) =>
                setNewDataSource((prev) => ({
                  ...prev,
                  type: e.target.value as "api" | "static" | "function",
                }))
              }
              className="w-full p-2 border border-gray-300 rounded text-sm"
            >
              <option value="api">API</option>
              <option value="static">Static Data</option>
              <option value="function">Function</option>
            </select>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              value={newDataSource.description || ""}
              onChange={(e) =>
                setNewDataSource((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Enter description"
              className="w-full p-2 border border-gray-300 rounded text-sm"
            />
          </div>
        </div>

        <button
          onClick={handleCreateDataSource}
          disabled={!newDataSource.name?.trim()}
          className="mt-3 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 text-sm font-medium"
        >
          Create Data Source
        </button>
      </div>

      {/* EXISTING DATA SOURCES */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-800">
          Your Data Sources ({dataSources.length})
        </h4>

        {dataSources.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-white rounded-lg border border-gray-200">
            <div className="text-3xl mb-2">📊</div>
            <p className="text-sm">No data sources configured</p>
            <p className="text-xs mt-1">Create your first data source above</p>
          </div>
        ) : (
          dataSources.map((ds) => {
            const expanded = expandedDataSource === ds.id;

            return (
              <div
                key={ds.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                {/* HEADER */}
                <div
                  className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 group"
                  onClick={() =>
                    setExpandedDataSource((prev) =>
                      prev === ds.id ? null : ds.id
                    )
                  }
                >
                  <div className="flex items-center space-x-3">
                    {expanded ? (
                      <ChevronUpIcon className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                    )}

                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="font-medium text-gray-900 text-sm">
                          {ds.name}
                        </h5>
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            ds.type === "api"
                              ? "bg-green-100 text-green-800"
                              : ds.type === "static"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {ds.type}
                        </span>
                      </div>

                      <p className="text-xs text-gray-500">
                        {ds.description || "No description"}
                        {ds.lastFetched &&
                          ` • Last fetched: ${new Date(
                            ds.lastFetched
                          ).toLocaleDateString()}`}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteDataSource(ds.id);
                    }}
                    className="p-1 text-red-600 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>

                {/* EXPANDED CONTENT */}
                {expanded && (
                  <div className="border-t border-gray-200 p-4 space-y-4">
                    {/* Endpoint */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Endpoint URL
                        </label>
                        <input
                          type="text"
                          value={ds.endpoint}
                          onChange={(e) =>
                            handleUpdateDataSource(ds.id, {
                              endpoint: e.target.value,
                            })
                          }
                          placeholder="https://api.example.com/data"
                          className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                      </div>

                      {/* Method + Refresh */}
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            HTTP Method
                          </label>
                          <select
                            value={ds.method}
                            onChange={(e) =>
                              handleUpdateDataSource(ds.id, {
                                method: e.target.value as any,
                              })
                            }
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                          >
                            <option value="GET">GET</option>
                            <option value="POST">POST</option>
                            <option value="PUT">PUT</option>
                            <option value="DELETE">DELETE</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Refresh (min)
                          </label>
                          <input
                            type="number"
                            min={0}
                            value={ds.refreshInterval}
                            onChange={(e) =>
                              handleUpdateDataSource(ds.id, {
                                refreshInterval: parseInt(e.target.value) || 0,
                              })
                            }
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Mapping */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Response Mapping
                      </label>
                      <textarea
                        value={JSON.stringify(ds.mapping, null, 2)}
                        onChange={(e) => {
                          try {
                            const parsed = JSON.parse(e.target.value);
                            handleUpdateDataSource(ds.id, { mapping: parsed });
                          } catch {}
                        }}
                        rows={3}
                        className="w-full p-2 border border-gray-300 rounded text-xs font-mono"
                      />

                      <p className="text-xs text-gray-500 mt-1">
                        Map API response fields to component properties
                      </p>
                    </div>

                    {/* Test Result */}
                    {ds.data && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Test Response Data
                        </label>
                        <pre className="max-h-32 overflow-auto p-3 bg-gray-100 border border-gray-300 rounded text-xs font-mono">
                          {JSON.stringify(ds.data, null, 2)}
                        </pre>
                      </div>
                    )}

                    <div className="flex justify-end">
                      <button
                        onClick={() => handleTestDataSource(ds)}
                        disabled={isTesting}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400 text-sm"
                      >
                        <PlayIcon className="w-4 h-4" />
                        {isTesting ? "Testing..." : "Test Data Source"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* FOOTER HELP */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="text-sm font-medium text-blue-800 mb-2">
          How to Use Data Sources
        </h4>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• Configure APIs to fetch dynamic data for your components</li>
          <li>• Use response mapping to transform API data</li>
          <li>• Reference data using: {"{{dataSource.your_source.field}}"}</li>
          <li>• Data sources can auto-refresh at specified intervals</li>
        </ul>
      </div>
    </div>
  );
};
