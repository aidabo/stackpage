// DataSourceDialog.tsx - 完整修改 (添加更好的自动补全)
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { DataSource, HostFunctionDataSource, DataSourceConfig } from "./types";
import {
  XMarkIcon,
  PlayIcon,
  PlusIcon,
  TrashIcon,
  CodeBracketIcon,
  TableCellsIcon,
  ArrowPathIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";
import { VisualDataPreview } from "./VisualDataPreview";
import { DataSourceService } from "./dataSourceService";

interface DataSourceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (ds: DataSource) => void;
  initialData?: DataSource | null;
  // 宿主提供的数据源函数
  getHostDataSources?: () => Promise<HostFunctionDataSource[]>;
}

// 常用Headers预定义 (更全面的列表)
const COMMON_HEADERS = [
  {
    name: "Content-Type",
    commonValues: [
      "application/json",
      "application/x-www-form-urlencoded",
      "multipart/form-data",
      "text/plain",
      "application/xml",
      "text/html",
      "application/javascript",
      "text/css",
    ],
  },
  {
    name: "Accept",
    commonValues: [
      "application/json",
      "application/xml",
      "text/html",
      "*/*",
      "application/pdf",
      "image/*",
      "video/*",
    ],
  },
  {
    name: "Authorization",
    commonValues: ["Bearer ", "Basic ", "Token ", "JWT ", "OAuth "],
  },
  {
    name: "User-Agent",
    commonValues: [
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      "PostmanRuntime/7.32.3",
      "curl/7.88.1",
    ],
  },
  {
    name: "X-API-Key",
    commonValues: [],
  },
  {
    name: "X-Requested-With",
    commonValues: ["XMLHttpRequest"],
  },
  {
    name: "Accept-Language",
    commonValues: [
      "en-US",
      "zh-CN",
      "ja-JP",
      "ko-KR",
      "es-ES",
      "fr-FR",
      "de-DE",
    ],
  },
  {
    name: "Cache-Control",
    commonValues: [
      "no-cache",
      "no-store",
      "max-age=3600",
      "max-age=86400",
      "must-revalidate",
    ],
  },
  {
    name: "Origin",
    commonValues: [],
  },
  {
    name: "Referer",
    commonValues: [],
  },
  {
    name: "Accept-Encoding",
    commonValues: ["gzip", "deflate", "br"],
  },
  {
    name: "Content-Length",
    commonValues: [],
  },
  {
    name: "Connection",
    commonValues: ["keep-alive", "close"],
  },
  {
    name: "Host",
    commonValues: [],
  },
  {
    name: "Cookie",
    commonValues: [],
  },
  {
    name: "X-CSRF-Token",
    commonValues: [],
  },
  {
    name: "X-Auth-Token",
    commonValues: [],
  },
];

// 常用参数预定义
const COMMON_PARAMS = [
  "page",
  "limit",
  "offset",
  "sort",
  "order",
  "q",
  "search",
  "filter",
  "fields",
  "expand",
  "include",
  "exclude",
  "api_key",
  "token",
  "id",
  "per_page",
  "cursor",
  "since",
  "until",
];

interface HeaderItem {
  id: string;
  key: string;
  value: string;
}

interface ParamItem {
  id: string;
  key: string;
  value: string;
}

interface SuggestionItem {
  name: string;
  value?: string;
  type: "header" | "param" | "value";
}

// 自动完成组件
const AutoCompleteInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
  suggestions: SuggestionItem[];
  placeholder: string;
  type?: "key" | "value";
  onSelect?: (item: SuggestionItem) => void;
}> = ({
  value,
  onChange,
  suggestions,
  placeholder,
  type = "key",
  onSelect,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    SuggestionItem[]
  >([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (value.trim() && suggestions.length > 0) {
      const filtered = suggestions
        .filter(
          (item) =>
            item.name.toLowerCase().includes(value.toLowerCase()) ||
            (item.value &&
              item.value.toLowerCase().includes(value.toLowerCase()))
        )
        .slice(0, 10); // 限制显示数量
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions(suggestions.slice(0, 10));
      setShowSuggestions(true);
    }
  }, [value, suggestions]);

  const handleInputFocus = () => {
    setFilteredSuggestions(suggestions.slice(0, 10));
    setShowSuggestions(true);
  };

  const handleSelect = (item: SuggestionItem) => {
    if (type === "key") {
      onChange(item.name);
    } else if (item.value) {
      onChange(item.value);
    }
    if (onSelect) {
      onSelect(item);
    }
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const getSuggestionDisplay = (item: SuggestionItem) => {
    if (type === "key") {
      return (
        <div className="flex items-center justify-between">
          <span className="font-medium text-blue-600">{item.name}</span>
          {item.type === "header" && (
            <span className="text-xs text-gray-500 bg-blue-50 px-2 py-1 rounded">
              Header
            </span>
          )}
          {item.type === "param" && (
            <span className="text-xs text-gray-500 bg-green-50 px-2 py-1 rounded">
              Param
            </span>
          )}
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-between">
          <span className="font-mono">{item.value}</span>
          {item.name && (
            <span className="text-xs text-gray-500">{item.name}</span>
          )}
        </div>
      );
    }
  };

  return (
    <div className="relative flex-1">
      <input
        ref={inputRef}
        type="text"
        className="w-full p-2 border rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleInputFocus}
        placeholder={placeholder}
        list={type === "key" ? "autocomplete-list" : undefined}
      />

      {showSuggestions && filteredSuggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {filteredSuggestions.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="px-3 py-2 hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
              onClick={() => handleSelect(item)}
            >
              {getSuggestionDisplay(item)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const DataSourceDialog: React.FC<DataSourceDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  getHostDataSources,
}) => {
  const [config, setConfig] = useState<DataSourceConfig>({
    name: "",
    description: "",
    category: "",
    endpoint: "",
    method: "GET",
    headers: {},
    parameters: {},
    refreshInterval: 0,
  });

  const [headers, setHeaders] = useState<HeaderItem[]>([]);
  const [parameters, setParameters] = useState<ParamItem[]>([]);

  const [testResult, setTestResult] = useState<any>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [activeTab, setActiveTab] = useState<"config" | "test">("config");
  const [viewMode, setViewMode] = useState<"json" | "visual">("json");

  // 宿主数据源状态
  const [hostDataSources, setHostDataSources] = useState<
    HostFunctionDataSource[]
  >([]);
  const [isLoadingHostSources, setIsLoadingHostSources] = useState(false);
  const [selectedHostSourceId, setSelectedHostSourceId] = useState<string>("");

  // 数据源类型
  const [sourceType, setSourceType] = useState<DataSource["type"]>("api");

  // 是否为编辑模式
  const isEditMode = !!initialData;

  // 重置/Load数据
  useEffect(() => {
    if (isOpen) {
      loadHostDataSources();

      if (initialData) {
        setSourceType(initialData.type);

        if (initialData.type === "host-function") {
          const hostSource = initialData as HostFunctionDataSource;
          setConfig({
            name: hostSource.name,
            description: hostSource.description || "",
            category: hostSource.category || "",
            endpoint: "",
            method: "GET",
            headers: {},
            parameters: hostSource.parameters || {},
            refreshInterval: 0,
          });
          if (hostSource.parameters) {
            setParameters(
              Object.entries(hostSource.parameters).map(
                ([key, value], index) => ({
                  id: `param-${index}`,
                  key,
                  value: String(value),
                })
              )
            );
          }
          setSelectedHostSourceId(hostSource.id);
        } else if (initialData.type === "api") {
          const apiSource = initialData;
          setConfig({
            name: apiSource.name,
            description: apiSource.description || "",
            category: apiSource.category || "",
            endpoint: apiSource.endpoint,
            method: apiSource.method,
            headers: apiSource.headers,
            parameters: apiSource.parameters,
            refreshInterval: apiSource.refreshInterval,
          });
          if (apiSource.headers) {
            setHeaders(
              Object.entries(apiSource.headers).map(([key, value], index) => ({
                id: `header-${index}`,
                key,
                value: String(value),
              }))
            );
          }
          if (apiSource.parameters) {
            setParameters(
              Object.entries(apiSource.parameters).map(
                ([key, value], index) => ({
                  id: `param-${index}`,
                  key,
                  value: String(value),
                })
              )
            );
          }
        } else if (initialData.type === "static") {
          const staticSource = initialData;
          setConfig({
            name: staticSource.name,
            description: staticSource.description || "",
            category: staticSource.category || "",
            data: staticSource.data,
          });
        } else if (initialData.type === "function") {
          const funcSource = initialData;
          setConfig({
            name: funcSource.name,
            description: funcSource.description || "",
            category: funcSource.category || "",
            functionCode: funcSource.functionCode,
          });
        }

        if ((initialData as any).data) {
          setTestResult((initialData as any).data);
        }
      } else {
        resetForm();
      }
      setActiveTab("config");
      setViewMode("json");
    }
  }, [isOpen, initialData]);

  // 同步配置
  useEffect(() => {
    const newHeaders: Record<string, string> = {};
    headers.forEach((item) => {
      if (item.key.trim()) {
        newHeaders[item.key] = item.value;
      }
    });

    const newParams: Record<string, string> = {};
    parameters.forEach((item) => {
      if (item.key.trim()) {
        newParams[item.key] = item.value;
      }
    });

    setConfig((prev) => ({
      ...prev,
      headers: newHeaders,
      parameters: newParams,
    }));
  }, [headers, parameters]);

  // 加载宿主数据源
  const loadHostDataSources = async () => {
    if (!getHostDataSources) return;

    setIsLoadingHostSources(true);
    try {
      const sources = await getHostDataSources();
      setHostDataSources(sources);
    } catch (error) {
      console.error("Failed to load host data sources:", error);
    } finally {
      setIsLoadingHostSources(false);
    }
  };

  // 重置表单
  const resetForm = () => {
    setConfig({
      name: "",
      description: "",
      category: "",
      endpoint: "",
      method: "GET",
      headers: {},
      parameters: {},
      refreshInterval: 0,
    });
    setHeaders([]);
    setParameters([]);
    setTestResult(null);
    setSelectedHostSourceId("");
    setSourceType("api");
  };

  // 选择宿主数据源
  const handleSelectHostSource = (sourceId: string) => {
    const source = hostDataSources.find((s) => s.id === sourceId);
    if (!source) return;

    setSelectedHostSourceId(sourceId);
    setSourceType("host-function");
    setConfig({
      name: source.name,
      description: source.description || "",
      category: source.category || "",
      endpoint: "",
      method: "GET",
      headers: {},
      parameters: source.parameters || {},
      refreshInterval: 0,
    });
    if (source.parameters) {
      setParameters(
        Object.entries(source.parameters).map(([key, value], index) => ({
          id: `param-${index}`,
          key,
          value: String(value),
        }))
      );
    }
  };

  // Header操作
  const handleAddHeader = () => {
    setHeaders([
      ...headers,
      { id: `header-${Date.now()}`, key: "", value: "" },
    ]);
  };

  const handleUpdateHeader = (
    id: string,
    field: "key" | "value",
    value: string
  ) => {
    setHeaders(
      headers.map((header) =>
        header.id === id ? { ...header, [field]: value } : header
      )
    );
  };

  const handleRemoveHeader = (id: string) => {
    setHeaders(headers.filter((header) => header.id !== id));
  };

  // Parameter操作
  const handleAddParameter = () => {
    setParameters([
      ...parameters,
      { id: `param-${Date.now()}`, key: "", value: "" },
    ]);
  };

  const handleUpdateParameter = (
    id: string,
    field: "key" | "value",
    value: string
  ) => {
    setParameters(
      parameters.map((param) =>
        param.id === id ? { ...param, [field]: value } : param
      )
    );
  };

  const handleRemoveParameter = (id: string) => {
    setParameters(parameters.filter((param) => param.id !== id));
  };

  // 获取Header名称的建议
  const headerNameSuggestions = useMemo(
    () =>
      COMMON_HEADERS.map((header) => ({
        name: header.name,
        type: "header" as const,
      })),
    []
  );

  // 获取参数名称的建议
  const paramNameSuggestions = useMemo(
    () =>
      COMMON_PARAMS.map((param) => ({
        name: param,
        type: "param" as const,
      })),
    []
  );

  // 缓存Header值建议
  const headerValueSuggestionsCache = useRef<Record<string, SuggestionItem[]>>(
    {}
  );

  // 获取Header值的建议
  const getHeaderValueSuggestions = useCallback((headerName: string) => {
    if (headerValueSuggestionsCache.current[headerName]) {
      return headerValueSuggestionsCache.current[headerName];
    }

    const header = COMMON_HEADERS.find((h) => h.name === headerName);
    let result: SuggestionItem[] = [];
    if (header?.commonValues) {
      result = header.commonValues.map((value) => ({
        name: headerName,
        value,
        type: "value" as const,
      }));
    }

    headerValueSuggestionsCache.current[headerName] = result;
    return result;
  }, []);

  if (!isOpen) return null;

  // 处理保存
  const handleSave = () => {
    if (!config.name?.trim()) {
      alert("Name is required");
      return;
    }

    let newDataSource: DataSource;
    const baseData = {
      id:
        initialData?.id ||
        `ds_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: config.name.trim(),
      description: config.description?.trim() || "",
      category: config.category?.trim(),
      tags: initialData?.tags || [],
    };

    switch (sourceType) {
      case "host-function":
        const hostSource = hostDataSources.find(
          (s) => s.id === selectedHostSourceId
        );
        if (!hostSource) {
          alert("Host data source not found");
          return;
        }
        newDataSource = {
          ...baseData,
          ...hostSource,
          type: "host-function",
          parameters: config.parameters || {},
        } as HostFunctionDataSource;
        break;

      case "api":
        if (!config.endpoint?.trim()) {
          alert("Endpoint URL is required for API data sources");
          return;
        }
        newDataSource = {
          ...baseData,
          type: "api",
          endpoint: config.endpoint.trim(),
          method: config.method || "GET",
          headers: config.headers || {},
          parameters: config.parameters || {},
          refreshInterval: config.refreshInterval || 0,
          data: testResult,
          lastFetched: testResult ? new Date().toISOString() : undefined,
        };
        break;

      case "static":
        if (!config.data) {
          alert("Data is required for static data sources");
          return;
        }
        newDataSource = {
          ...baseData,
          type: "static",
          data: config.data,
        };
        break;

      case "function":
        if (!config.functionCode?.trim()) {
          alert("Function code is required for function data sources");
          return;
        }
        newDataSource = {
          ...baseData,
          type: "function",
          functionCode: config.functionCode.trim(),
        };
        break;

      default:
        alert(`Unsupported data source type: ${sourceType}`);
        return;
    }

    onSave(newDataSource);
    onClose();
    resetForm();
  };

  // 测试数据源
  const handleTest = async () => {
    if (sourceType === "host-function") {
      const source = hostDataSources.find((s) => s.id === selectedHostSourceId);
      if (!source) {
        alert("Please select a host data source first");
        return;
      }

      setIsTesting(true);
      try {
        const result = await source.fetchData(config.parameters || {});
        setTestResult(result);
      } catch (error: any) {
        alert(`Test failed: ${error.message}`);
        setTestResult({
          error: error.message,
          timestamp: new Date().toISOString(),
        });
      } finally {
        setIsTesting(false);
      }
      return;
    }

    if (sourceType === "api" && !config.endpoint?.trim()) {
      alert("Please enter an endpoint URL to test");
      return;
    }

    if (sourceType === "static" && !config.data) {
      alert("Please enter static data to test");
      return;
    }

    if (sourceType === "function" && !config.functionCode?.trim()) {
      alert("Please enter function code to test");
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    try {
      let testDataSource: DataSource;

      switch (sourceType) {
        case "api":
          testDataSource = {
            id: "test",
            name: "Test",
            type: "api",
            endpoint: config.endpoint!,
            method: config.method!,
            headers: config.headers!,
            parameters: config.parameters!,
            refreshInterval: 0,
          };
          break;

        case "static":
          testDataSource = {
            id: "test",
            name: "Test",
            type: "static",
            data: config.data,
          };
          break;

        case "function":
          testDataSource = {
            id: "test",
            name: "Test",
            type: "function",
            functionCode: config.functionCode!,
          };
          break;

        default:
          throw new Error(`Unsupported type for test: ${sourceType}`);
      }

      const result = await DataSourceService.fetchDataSourceData(
        testDataSource,
        config.parameters
      );

      if (result.success) {
        setTestResult(result.data);
        if (Array.isArray(result.data) && config.category) {
          setViewMode("visual");
        }
      } else {
        throw new Error(result.error);
      }
    } catch (e: any) {
      alert(`Test failed: ${e.message}`);
      setTestResult({ error: e.message, timestamp: new Date().toISOString() });
    } finally {
      setIsTesting(false);
    }
  };

  const isHostFunction = sourceType === "host-function";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[90vh] flex flex-col">
        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">
            {initialData ? `Edit ${initialData.name}` : "Create Data Source"}
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
              {/* 数据源类型选择 */}
              {!initialData && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data Source Type
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <button
                      type="button"
                      className={`p-3 border rounded-lg flex flex-col items-center justify-center transition-colors ${
                        sourceType === "api"
                          ? "border-blue-500 bg-blue-50 text-blue-600"
                          : "border-gray-300 hover:border-blue-300"
                      }`}
                      onClick={() => setSourceType("api")}
                    >
                      <span className="text-lg">🌐</span>
                      <span className="text-sm font-medium mt-1">API</span>
                    </button>

                    <button
                      type="button"
                      className={`p-3 border rounded-lg flex flex-col items-center justify-center transition-colors ${
                        sourceType === "host-function"
                          ? "border-green-500 bg-green-50 text-green-600"
                          : "border-gray-300 hover:border-green-300"
                      }`}
                      onClick={() => setSourceType("host-function")}
                    >
                      <CpuChipIcon className="w-5 h-5" />
                      <span className="text-sm font-medium mt-1">
                        Host Function
                      </span>
                    </button>

                    <button
                      type="button"
                      className={`p-3 border rounded-lg flex flex-col items-center justify-center transition-colors ${
                        sourceType === "static"
                          ? "border-purple-500 bg-purple-50 text-purple-600"
                          : "border-gray-300 hover:border-purple-300"
                      }`}
                      onClick={() => setSourceType("static")}
                    >
                      <span className="text-lg">📁</span>
                      <span className="text-sm font-medium mt-1">Static</span>
                    </button>

                    <button
                      type="button"
                      className={`p-3 border rounded-lg flex flex-col items-center justify-center transition-colors ${
                        sourceType === "function"
                          ? "border-yellow-500 bg-yellow-50 text-yellow-600"
                          : "border-gray-300 hover:border-yellow-300"
                      }`}
                      onClick={() => setSourceType("function")}
                    >
                      <CodeBracketIcon className="w-5 h-5" />
                      <span className="text-sm font-medium mt-1">Function</span>
                    </button>
                  </div>
                </div>
              )}

              {/* 宿主数据源选择 */}
              {!initialData &&
                sourceType === "host-function" &&
                getHostDataSources && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-green-800 mb-3 flex items-center gap-2">
                      <CpuChipIcon className="w-4 h-4" />
                      Select Host Data Source
                    </h3>
                    <div className="flex gap-2">
                      <select
                        className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                        value={selectedHostSourceId}
                        onChange={(e) => handleSelectHostSource(e.target.value)}
                        disabled={isLoadingHostSources}
                      >
                        <option value="">Select a host data source...</option>
                        {hostDataSources.map((source) => (
                          <option key={source.id} value={source.id}>
                            {source.name}{" "}
                            {source.category ? `(${source.category})` : ""}
                          </option>
                        ))}
                      </select>
                      {isLoadingHostSources && (
                        <ArrowPathIcon className="w-5 h-5 animate-spin text-gray-400" />
                      )}
                    </div>
                    {selectedHostSourceId && (
                      <div className="mt-3 p-3 bg-white rounded border">
                        <p className="text-sm text-gray-600">
                          Host function data source selected. You can test it in
                          the "Test & Preview" tab.
                        </p>
                      </div>
                    )}
                  </div>
                )}

              {/* 基本信息 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    value={config.name}
                    onChange={(e) =>
                      setConfig({ ...config, name: e.target.value })
                    }
                    placeholder="My Data Source"
                    disabled={isHostFunction && isEditMode}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category (Optional)
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    value={config.category || ""}
                    onChange={(e) =>
                      setConfig({ ...config, category: e.target.value })
                    }
                    placeholder="e.g. articles, users, products"
                    disabled={isHostFunction && isEditMode}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  value={config.description || ""}
                  onChange={(e) =>
                    setConfig({ ...config, description: e.target.value })
                  }
                  placeholder="Describe what this data source provides..."
                  rows={2}
                  disabled={isHostFunction && isEditMode}
                />
              </div>

              {/* API配置 */}
              {sourceType === "api" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Endpoint URL *
                    </label>
                    <div className="flex gap-2">
                      <select
                        className="w-24 p-2 border rounded bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        value={config.method || "GET"}
                        onChange={(e) =>
                          setConfig({
                            ...config,
                            method: e.target.value as any,
                          })
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
                        value={config.endpoint || ""}
                        onChange={(e) =>
                          setConfig({ ...config, endpoint: e.target.value })
                        }
                        placeholder="https://api.example.com/v1/resource"
                      />
                    </div>
                  </div>

                  {/* Headers配置 */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Headers
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">
                          {headers.filter((h) => h.key.trim()).length}{" "}
                          configured
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {headers.map((header) => (
                        <div
                          key={header.id}
                          className="flex gap-2 items-center"
                        >
                          <AutoCompleteInput
                            value={header.key}
                            onChange={(value) =>
                              handleUpdateHeader(header.id, "key", value)
                            }
                            suggestions={headerNameSuggestions}
                            placeholder="Header name"
                            type="key"
                          />
                          <AutoCompleteInput
                            value={header.value}
                            onChange={(value) =>
                              handleUpdateHeader(header.id, "value", value)
                            }
                            suggestions={getHeaderValueSuggestions(header.key)}
                            placeholder="Value"
                            type="value"
                          />
                          <button
                            onClick={() => handleRemoveHeader(header.id)}
                            className="text-red-500 hover:bg-red-100 p-2 rounded transition flex-shrink-0"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      ))}

                      <button
                        onClick={handleAddHeader}
                        className="w-full py-2 text-sm text-blue-600 hover:text-blue-800 flex items-center justify-center gap-2 border border-blue-300 rounded hover:bg-blue-50 transition-colors"
                      >
                        <PlusIcon className="w-4 h-4" /> Add Header
                      </button>
                    </div>
                  </div>

                  {/* Parameters配置 */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Parameters
                      </label>
                      <div className="text-xs text-gray-500">
                        {parameters.filter((p) => p.key.trim()).length}{" "}
                        configured
                      </div>
                    </div>
                    <div className="space-y-3">
                      {parameters.map((param) => (
                        <div key={param.id} className="flex gap-2 items-center">
                          <AutoCompleteInput
                            value={param.key}
                            onChange={(value) =>
                              handleUpdateParameter(param.id, "key", value)
                            }
                            suggestions={paramNameSuggestions}
                            placeholder="Parameter name"
                            type="key"
                          />
                          <input
                            type="text"
                            className="flex-1 p-2 border rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Value"
                            value={param.value}
                            onChange={(e) =>
                              handleUpdateParameter(
                                param.id,
                                "value",
                                e.target.value
                              )
                            }
                          />
                          <button
                            onClick={() => handleRemoveParameter(param.id)}
                            className="text-red-500 hover:bg-red-100 p-2 rounded transition flex-shrink-0"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={handleAddParameter}
                        className="w-full py-2 text-sm text-blue-600 hover:text-blue-800 flex items-center justify-center gap-2 border border-blue-300 rounded hover:bg-blue-50 transition-colors"
                      >
                        <PlusIcon className="w-4 h-4" /> Add Parameter
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Static配置 */}
              {sourceType === "static" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Static JSON Data *
                  </label>
                  <textarea
                    className="w-full p-2 border rounded font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    value={
                      config.data ? JSON.stringify(config.data, null, 2) : ""
                    }
                    onChange={(e) => {
                      try {
                        const parsed = JSON.parse(e.target.value);
                        setConfig({ ...config, data: parsed });
                      } catch {
                        setConfig({ ...config, data: e.target.value });
                      }
                    }}
                    placeholder='[{"id": 1, "name": "Example"}, {"id": 2, "name": "Another"}]'
                    rows={6}
                  />
                </div>
              )}

              {/* Function配置 */}
              {sourceType === "function" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Function Code *
                  </label>
                  <textarea
                    className="w-full p-2 border rounded font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    value={config.functionCode || ""}
                    onChange={(e) =>
                      setConfig({ ...config, functionCode: e.target.value })
                    }
                    placeholder="// JavaScript function that returns data\n(params) => {\n  return { data: 'example' };\n}"
                    rows={6}
                  />
                </div>
              )}

              {/* Host Function配置 */}
              {sourceType === "host-function" && selectedHostSourceId && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    Parameters
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    This host function can accept parameters when fetching data.
                  </p>
                  <div className="space-y-3">
                    {parameters.map((param) => (
                      <div key={param.id} className="flex gap-2 items-center">
                        <AutoCompleteInput
                          value={param.key}
                          onChange={(value) =>
                            handleUpdateParameter(param.id, "key", value)
                          }
                          suggestions={paramNameSuggestions}
                          placeholder="Parameter name"
                          type="key"
                        />
                        <input
                          type="text"
                          className="flex-1 p-2 border rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="Value"
                          value={param.value}
                          onChange={(e) =>
                            handleUpdateParameter(
                              param.id,
                              "value",
                              e.target.value
                            )
                          }
                        />
                        <button
                          onClick={() => handleRemoveParameter(param.id)}
                          className="text-red-500 hover:bg-red-100 p-2 rounded transition flex-shrink-0"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={handleAddParameter}
                      className="w-full py-2 text-sm text-blue-600 hover:text-blue-800 flex items-center justify-center gap-2 border border-blue-300 rounded hover:bg-blue-50 transition-colors"
                    >
                      <PlusIcon className="w-4 h-4" /> Add Parameter
                    </button>
                  </div>
                </div>
              )}

              {/* Refresh Interval */}
              {sourceType === "api" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Refresh Interval (seconds)
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    value={config.refreshInterval || 0}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        refreshInterval: parseInt(e.target.value) || 0,
                      })
                    }
                    placeholder="0 for no auto-refresh"
                    min="0"
                    step="1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    How often to automatically refresh the data (0 = manual
                    only)
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TEST TAB */}
          {activeTab === "test" && (
            <div className="space-y-4 h-full flex flex-col">
              {/* Test Controls */}
              <div className="flex justify-between items-center bg-gray-50 p-2 rounded border">
                <div className="text-sm truncate mr-2 flex-1">
                  <span className="font-bold mr-2">
                    {sourceType === "api" && config.method}
                    {sourceType === "host-function" && "Host Function"}
                    {sourceType === "static" && "Static Data"}
                    {sourceType === "function" && "Function"}
                  </span>
                  <span className="font-mono text-gray-600">
                    {sourceType === "api" && config.endpoint}
                    {sourceType === "host-function" && config.name}
                    {sourceType === "static" && "Static JSON"}
                    {sourceType === "function" && "Custom Function"}
                  </span>
                </div>
                <button
                  onClick={handleTest}
                  disabled={
                    isTesting ||
                    (sourceType === "api" && !config.endpoint) ||
                    (sourceType === "host-function" && !selectedHostSourceId) ||
                    (sourceType === "static" && !config.data) ||
                    (sourceType === "function" && !config.functionCode)
                  }
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2 whitespace-nowrap transition"
                >
                  {isTesting ? (
                    <>
                      <ArrowPathIcon className="w-4 h-4 animate-spin" />{" "}
                      Testing...
                    </>
                  ) : (
                    <>
                      <PlayIcon className="w-4 h-4" /> Test Data Source
                    </>
                  )}
                </button>
              </div>

              {/* View Mode Toggles */}
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

              {/* Test Results */}
              <div className="flex-1 border rounded bg-gray-50 overflow-hidden relative flex flex-col min-h-0">
                {!testResult ? (
                  <div className="flex items-center justify-center h-full text-gray-500 italic p-4">
                    Click "Test Data Source" to see the results
                  </div>
                ) : viewMode === "visual" ? (
                  <VisualDataPreview
                    data={testResult}
                    category={config.category}
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
              !config.name?.trim() ||
              (sourceType === "api" && !config.endpoint?.trim()) ||
              (sourceType === "host-function" && !selectedHostSourceId) ||
              (sourceType === "static" && !config.data) ||
              (sourceType === "function" && !config.functionCode)
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
