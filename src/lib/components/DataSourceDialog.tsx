import React, { useState, useEffect } from "react";
import { DataSource } from "./types";
import {
  XMarkIcon,
  PlayIcon,
  PlusIcon,
  TrashIcon,
  CodeBracketIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import { VisualDataPreview } from "./VisualDataPreview";

interface DataSourceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (ds: DataSource) => void;
  initialData?: DataSource | null;
}

export const DataSourceDialog: React.FC<DataSourceDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [data, setData] = useState<Partial<DataSource>>({
    type: "api",
    method: "GET",
    headers: {},
    parameters: {},
    mapping: {},
    refreshInterval: 0,
    category: "",
  });

  const [testResult, setTestResult] = useState<any>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [activeTab, setActiveTab] = useState<"config" | "mapping" | "test">(
    "config"
  );
  const [viewMode, setViewMode] = useState<"json" | "visual">("json");

  // Reset/Load data when dialog opens
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setData({
          ...initialData,
          // Ensure all fields are present
          headers: initialData.headers || {},
          parameters: initialData.parameters || {},
          mapping: initialData.mapping || {},
          refreshInterval: initialData.refreshInterval || 0,
          category: initialData.category || "",
        });
        if (initialData.data) setTestResult(initialData.data);
      } else {
        // Reset for new
        setData({
          name: "",
          description: "",
          type: "api",
          endpoint: "",
          method: "GET",
          headers: {},
          parameters: {},
          mapping: {},
          refreshInterval: 0,
          category: "",
        });
        setTestResult(null);
      }
      setActiveTab("config");
      setViewMode("json");
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!data.name?.trim()) {
      alert("Name is required");
      return;
    }

    if (data.type === "api" && !data.endpoint?.trim()) {
      alert("Endpoint URL is required for API data sources");
      return;
    }

    // Ensure ID exists
    const dsToSave: DataSource = {
      id:
        data.id ||
        `ds_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: data.name!.trim(),
      description: data.description?.trim() || "",
      type: data.type as "api" | "static" | "function",
      endpoint: data.endpoint?.trim() || "",
      method: data.method as "GET" | "POST" | "PUT" | "DELETE",
      headers: data.headers || {},
      parameters: data.parameters || {},
      mapping: data.mapping || {},
      refreshInterval: data.refreshInterval || 0,
      category: data.category?.trim(),
      data: testResult || data.data,
      lastFetched: testResult ? new Date().toISOString() : data.lastFetched,
    };

    onSave(dsToSave);
    onClose();
  };

  const handleTest = async () => {
    if (!data.endpoint?.trim()) {
      alert("Please enter an endpoint URL to test");
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    try {
      console.log("Testing datasource", data);

      // Construct URL with Query Params
      let url: URL;
      try {
        url = new URL(data.endpoint);
      } catch (e) {
        throw new Error("Invalid URL format");
      }

      // Add parameters to URL if they exist
      if (data.parameters && Object.keys(data.parameters).length > 0) {
        Object.entries(data.parameters).forEach(([k, v]) => {
          if (v !== undefined && v !== null && v !== "") {
            url.searchParams.append(k, String(v));
          }
        });
      }

      const requestOptions: RequestInit = {
        method: data.method,
        headers: data.headers,
      };

      // Add body for POST, PUT requests if needed
      if (data.method === "POST" || data.method === "PUT") {
        // You might want to add body configuration later
        // For now, we'll leave it empty
      }

      const res = await fetch(url.toString(), requestOptions);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const result = await res.json();
      setTestResult(result);

      // Auto-switch to visual mode for array data with category
      if (Array.isArray(result) && data.category) {
        setViewMode("visual");
      }
    } catch (e: any) {
      alert(`Test failed: ${e.message}`);
      setTestResult({ error: e.message, timestamp: new Date().toISOString() });
    } finally {
      setIsTesting(false);
    }
  };

  const addHeader = () => {
    setData((prev) => ({
      ...prev,
      headers: { ...prev.headers, "": "" },
    }));
  };

  const updateHeader = (oldKey: string, newKey: string, val: string) => {
    setData((prev) => {
      const newHeaders = { ...prev.headers };
      if (oldKey !== newKey) {
        delete newHeaders[oldKey];
      }
      newHeaders[newKey] = val;
      return { ...prev, headers: newHeaders };
    });
  };

  const removeHeader = (key: string) => {
    setData((prev) => {
      const newHeaders = { ...prev.headers };
      delete newHeaders[key];
      return { ...prev, headers: newHeaders };
    });
  };

  const addCommonHeader = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const idx = parseInt(e.target.value);
    if (isNaN(idx)) return;

    const COMMON_HEADERS = [
      {
        label: "Content-Type: JSON",
        key: "Content-Type",
        value: "application/json",
      },
      { label: "Accept: JSON", key: "Accept", value: "application/json" },
      {
        label: "Authorization: Bearer Token",
        key: "Authorization",
        value: "Bearer ",
      },
      {
        label: "Cache-Control: No Cache",
        key: "Cache-Control",
        value: "no-cache",
      },
      { label: "User-Agent: Default", key: "User-Agent", value: "Mozilla/5.0" },
    ];

    const header = COMMON_HEADERS[idx];
    setData((prev) => ({
      ...prev,
      headers: { ...prev.headers, [header.key]: header.value },
    }));
    e.target.value = "";
  };

  // Parameters Helpers
  const updateParam = (key: string, val: any) => {
    setData((prev) => ({
      ...prev,
      parameters: { ...prev.parameters, [key]: val },
    }));
  };

  const removeParam = (key: string) => {
    setData((prev) => {
      const newParams = { ...prev.parameters };
      delete newParams[key];
      return { ...prev, parameters: newParams };
    });
  };

  const addCustomParam = () => {
    // Find a unique key
    let i = 1;
    while (data.parameters?.[`param${i}`]) i++;
    updateParam(`param${i}`, "");
  };

  const updateCustomParamKey = (oldKey: string, newKey: string, val: any) => {
    setData((prev) => {
      const newParams = { ...prev.parameters };
      if (oldKey !== newKey) {
        delete newParams[oldKey];
      }
      newParams[newKey] = val;
      return { ...prev, parameters: newParams };
    });
  };

  const generateCurl = () => {
    try {
      if (!data.endpoint) return "No endpoint configured";

      // Construct URL with Query Params
      const url = new URL(data.endpoint);
      Object.entries(data.parameters || {}).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== "") {
          url.searchParams.append(k, String(v));
        }
      });

      let curl = `curl -X ${data.method} "${url.toString()}"`;

      Object.entries(data.headers || {}).forEach(([k, v]) => {
        curl += ` \\\n  -H "${k}: ${v}"`;
      });

      return curl;
    } catch (e) {
      return "Invalid URL configuration";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[90vh] flex flex-col">
        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">
            {initialData ? "Edit Data Source" : "Create Data Source"}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <XMarkIcon className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* TABS */}
        <div className="flex border-b bg-gray-50">
          <button
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === "config"
                ? "bg-white border-t-2 border-blue-500 text-blue-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("config")}
          >
            Configuration
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === "test"
                ? "bg-white border-t-2 border-blue-500 text-blue-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("test")}
          >
            Test & Preview
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* CONFIG TAB */}
          {activeTab === "config" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    value={data.name || ""}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    placeholder="My Data Source"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    value={data.type || "api"}
                    onChange={(e) =>
                      setData({ ...data, type: e.target.value as any })
                    }
                  >
                    <option value="api">API (REST)</option>
                    <option value="static">Static JSON</option>
                    <option value="function">Function</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category (Optional)
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  value={data.category || ""}
                  onChange={(e) =>
                    setData({ ...data, category: e.target.value })
                  }
                  placeholder="e.g. articles, users, products"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Used to identify data type for visual previews and cards.
                </p>
              </div>

              {data.type === "api" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Endpoint URL *
                  </label>
                  <div className="flex gap-2">
                    <select
                      className="w-24 p-2 border rounded bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      value={data.method || "GET"}
                      onChange={(e) =>
                        setData({ ...data, method: e.target.value as any })
                      }
                    >
                      <option>GET</option>
                      <option>POST</option>
                      <option>PUT</option>
                      <option>DELETE</option>
                    </select>
                    <input
                      type="text"
                      className="flex-1 p-2 border rounded font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      value={data.endpoint || ""}
                      onChange={(e) =>
                        setData({ ...data, endpoint: e.target.value })
                      }
                      placeholder="https://api.example.com/v1/resource"
                    />
                  </div>
                </div>
              )}

              {data.type === "static" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Static JSON Data
                  </label>
                  <textarea
                    className="w-full p-2 border rounded font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    value={data.endpoint || ""}
                    onChange={(e) =>
                      setData({ ...data, endpoint: e.target.value })
                    }
                    placeholder='[{"id": 1, "name": "Example"}, {"id": 2, "name": "Another"}]'
                    rows={4}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter a valid JSON array or object.
                  </p>
                </div>
              )}

              {data.type === "function" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Function Code
                  </label>
                  <textarea
                    className="w-full p-2 border rounded font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    value={data.endpoint || ""}
                    onChange={(e) =>
                      setData({ ...data, endpoint: e.target.value })
                    }
                    placeholder="// JavaScript function that returns data"
                    rows={4}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter a JavaScript function that returns data.
                  </p>
                </div>
              )}

              {/* HEADERS - Only for API type */}
              {data.type === "api" && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Headers
                    </label>
                    <div className="flex gap-2 items-center">
                      <select
                        className="text-xs border rounded p-1 bg-white text-gray-600 outline-none focus:border-blue-500"
                        onChange={addCommonHeader}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          + Preset
                        </option>
                        <option value="0">Content-Type: JSON</option>
                        <option value="1">Accept: JSON</option>
                        <option value="2">Authorization: Bearer</option>
                        <option value="3">Cache-Control: No Cache</option>
                        <option value="4">User-Agent: Default</option>
                      </select>
                      <button
                        onClick={addHeader}
                        className="text-xs text-blue-600 flex items-center gap-1 hover:underline px-2 py-1 bg-blue-50 rounded"
                      >
                        <PlusIcon className="w-3 h-3" /> Custom
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2 bg-gray-50 p-3 rounded border">
                    {Object.entries(data.headers || {}).length === 0 && (
                      <p className="text-xs text-gray-400 italic">
                        No headers configured
                      </p>
                    )}
                    {Object.entries(data.headers || {}).map(
                      ([key, val], idx) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            type="text"
                            className="flex-1 p-1 text-sm border rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Key"
                            value={key}
                            onChange={(e) =>
                              updateHeader(key, e.target.value, val as string)
                            }
                          />
                          <input
                            type="text"
                            className="flex-1 p-1 text-sm border rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Value"
                            value={val as string}
                            onChange={(e) =>
                              updateHeader(key, key, e.target.value)
                            }
                          />
                          <button
                            onClick={() => removeHeader(key)}
                            className="text-red-500 hover:bg-red-100 p-1 rounded transition"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* PARAMETERS SECTION - Only for API type */}
              {data.type === "api" && (
                <div className="border-t pt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Query Parameters
                  </label>

                  {/* Common CMS Options */}
                  <div className="bg-gray-50 p-3 rounded border mb-3">
                    <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                      Common Options
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">
                          Fields (Select)
                        </label>
                        <input
                          type="text"
                          className="w-full p-1.5 text-sm border rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="e.g. title,slug,html"
                          value={data.parameters?.["fields"] || ""}
                          onChange={(e) =>
                            updateParam("fields", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">
                          Include (Input)
                        </label>
                        <input
                          type="text"
                          className="w-full p-1.5 text-sm border rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="e.g. tags,authors"
                          value={data.parameters?.["include"] || ""}
                          onChange={(e) =>
                            updateParam("include", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">
                          Order (Setting)
                        </label>
                        <input
                          type="text"
                          className="w-full p-1.5 text-sm border rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="e.g. published_at DESC"
                          value={data.parameters?.["order"] || ""}
                          onChange={(e) => updateParam("order", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">
                          Limit
                        </label>
                        <input
                          type="number"
                          className="w-full p-1.5 text-sm border rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="15"
                          value={data.parameters?.["limit"] || ""}
                          onChange={(e) => updateParam("limit", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Custom Parameters List */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                        Custom Params
                      </span>
                      <button
                        onClick={addCustomParam}
                        className="text-xs text-blue-600 flex items-center gap-1 hover:underline"
                      >
                        <PlusIcon className="w-3 h-3" /> Add Parameter
                      </button>
                    </div>

                    {Object.entries(data.parameters || {}).filter(
                      ([k]) =>
                        ![
                          "fields",
                          "include",
                          "order",
                          "limit",
                          "filter",
                        ].includes(k)
                    ).length === 0 && (
                      <p className="text-xs text-gray-400 italic mb-2">
                        No custom parameters
                      </p>
                    )}

                    {Object.entries(data.parameters || {}).map(
                      ([key, val], idx) => {
                        // Skip displaying the common ones in this list to avoid duplication
                        if (
                          ["fields", "include", "order", "limit"].includes(key)
                        )
                          return null;

                        return (
                          <div key={idx} className="flex gap-2">
                            <input
                              type="text"
                              className="flex-1 p-1 text-sm border rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                              placeholder="Key"
                              value={key}
                              onChange={(e) =>
                                updateCustomParamKey(key, e.target.value, val)
                              }
                            />
                            <input
                              type="text"
                              className="flex-1 p-1 text-sm border rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                              placeholder="Value"
                              value={val as string}
                              onChange={(e) => updateParam(key, e.target.value)}
                            />
                            <button
                              onClick={() => removeParam(key)}
                              className="text-red-500 hover:bg-red-100 p-1 rounded transition"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              )}

              {/* Refresh Interval */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Refresh Interval (seconds)
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  value={data.refreshInterval || 0}
                  onChange={(e) =>
                    setData({
                      ...data,
                      refreshInterval: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="0 for no auto-refresh"
                  min="0"
                  step="1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  How often to automatically refresh the data (0 = manual only)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  value={data.description || ""}
                  onChange={(e) =>
                    setData({ ...data, description: e.target.value })
                  }
                  placeholder="Describe what this data source fetches..."
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* TEST TAB */}
          {activeTab === "test" && (
            <div className="space-y-4 h-full flex flex-col">
              {/* cURL Display */}
              {data.type === "api" && data.endpoint && (
                <div className="bg-gray-800 rounded p-3 relative group">
                  <div className="text-xs text-gray-400 mb-1 border-b border-gray-700 pb-1 flex justify-between">
                    <span>cURL Command</span>
                    <span className="text-[10px] opacity-70">
                      Generated from config
                    </span>
                  </div>
                  <pre className="text-green-400 font-mono text-xs whitespace-pre-wrap break-all overflow-x-auto">
                    {generateCurl()}
                  </pre>
                </div>
              )}

              {/* Test Controls & Result */}
              <div className="flex justify-between items-center bg-gray-50 p-2 rounded border">
                <div className="text-sm truncate mr-2 flex-1">
                  {data.type === "api" ? (
                    <>
                      <span className="font-bold mr-2">{data.method}</span>
                      <span className="font-mono text-gray-600">
                        {data.endpoint || "No endpoint"}
                      </span>
                    </>
                  ) : (
                    <span className="font-mono text-gray-600">
                      {data.type === "static" ? "Static Data" : "Function"}
                    </span>
                  )}
                </div>
                {data.type === "api" ? (
                  <button
                    onClick={handleTest}
                    disabled={isTesting || !data.endpoint}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2 whitespace-nowrap transition"
                  >
                    {isTesting ? (
                      "Fetching..."
                    ) : (
                      <>
                        <PlayIcon className="w-4 h-4" /> Test Request
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      try {
                        if (data.type === "static" && data.endpoint) {
                          const parsed = JSON.parse(data.endpoint);
                          setTestResult(parsed);
                        } else if (data.type === "function" && data.endpoint) {
                          // Note: This is dangerous in production!
                          // In a real app, use a sandboxed environment
                          const func = new Function(
                            `return (${data.endpoint})()`
                          );
                          const result = func();
                          setTestResult(result);
                        }
                      } catch (e: any) {
                        alert(`Error: ${e.message}`);
                      }
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2 whitespace-nowrap transition"
                  >
                    <PlayIcon className="w-4 h-4" /> Preview Data
                  </button>
                )}
              </div>

              {/* View Mode Toggles - Only show if we have data */}
              {testResult && (
                <div className="flex justify-end">
                  <div className="flex bg-gray-100 rounded p-1 border">
                    <button
                      className={`px-3 py-1 text-xs font-medium rounded flex items-center gap-1 ${
                        viewMode === "json"
                          ? "bg-white text-blue-600 shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => setViewMode("json")}
                    >
                      <CodeBracketIcon className="w-3 h-3" /> JSON
                    </button>
                    <button
                      className={`px-3 py-1 text-xs font-medium rounded flex items-center gap-1 ${
                        viewMode === "visual"
                          ? "bg-white text-blue-600 shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => setViewMode("visual")}
                    >
                      <TableCellsIcon className="w-3 h-3" /> Visual
                    </button>
                  </div>
                </div>
              )}

              <div className="flex-1 border rounded bg-gray-50 overflow-hidden relative flex flex-col min-h-0">
                {!testResult ? (
                  <div className="flex items-center justify-center h-full text-gray-500 italic p-4">
                    {data.type === "api"
                      ? 'Click "Test Request" to see API response'
                      : 'Click "Preview Data" to see your data'}
                  </div>
                ) : viewMode === "visual" ? (
                  <VisualDataPreview
                    data={testResult}
                    category={data.category}
                    onBind={() => console.log("Bind preview")}
                  />
                ) : (
                  <div className="bg-gray-900 text-gray-100 p-4 font-mono text-xs overflow-auto h-full w-full">
                    <pre>{JSON.stringify(testResult, null, 2)}</pre>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t flex justify-end gap-3 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded text-sm font-medium transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={
              !data.name?.trim() ||
              (data.type === "api" && !data.endpoint?.trim())
            }
            className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded text-sm font-medium shadow-sm transition"
          >
            Save Data Source
          </button>
        </div>
      </div>
    </div>
  );
};
