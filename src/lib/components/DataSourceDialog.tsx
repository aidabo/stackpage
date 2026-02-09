import React, { useState, useEffect, useRef, useMemo } from "react";
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
  ChevronDownIcon,
  ChevronUpIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { VisualDataPreview } from "./VisualDataPreview";
import { DataSourceService } from "./DataSourceService";

interface DataSourceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (ds: DataSource) => void;
  initialData?: DataSource | null;
}

// 常用Headers预定义
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
    name: "Accept-Version",
    commonValues: ["v5.0", "v4.0"],
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
  "category",
  "status",
  "featured",
  "published",
  "author",
  "tag",
  "key",
];

const QUICK_HEADER_PRESETS: Array<{ key: string; value: string }> = [
  { key: "Accept", value: "application/json" },
  { key: "Content-Type", value: "application/json" },
  { key: "Cache-Control", value: "no-cache" },
];

const GHOST_PARAM_PRESETS: Array<{ key: string; value: string }> = [
  { key: "key", value: "" },
  { key: "limit", value: "15" },
  { key: "include", value: "tags,authors" },
  { key: "fields", value: "id,title,slug,excerpt,published_at" },
  { key: "order", value: "published_at desc" },
  { key: "filter", value: "status:published" },
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
  isAdvanced?: boolean;
}

interface SuggestionItem {
  name: string;
  value?: string;
  type: "header" | "param" | "value";
}

const getHeaderValueOptions = (headerKey: string): string[] => {
  const normalized = headerKey.trim().toLowerCase();
  if (!normalized) return [];
  const found = COMMON_HEADERS.find(
    (header) => header.name.toLowerCase() === normalized
  );
  return found?.commonValues || [];
};

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
        .slice(0, 10);
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
  const [showAdvancedParams, setShowAdvancedParams] = useState(false);

  const [testResult, setTestResult] = useState<any>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [activeTab, setActiveTab] = useState<"config" | "test">("config");
  const [viewMode, setViewMode] = useState<"json" | "visual">("json");

  // 宿主数据源状态
  const [hostDataSources, setHostDataSources] = useState<
    HostFunctionDataSource[]
  >([]);
  const [isLoadingHostSources, setIsLoadingHostSources] = useState(false);

  // 关键：为Host Function数据源存储两个不同的标识
  const [selectedHostSourceId, setSelectedHostSourceId] = useState<string>(""); // 宿主函数ID
  const [selectedHostSource, setSelectedHostSource] =
    useState<HostFunctionDataSource | null>(null); // 宿主函数对象

  // 数据源类型
  const [sourceType, setSourceType] = useState<DataSource["type"]>("api");

  // Wrapper key for array results
  const [wrapperKey, setWrapperKey] = useState<string>("");

  // Static JSON string input
  const [staticJsonString, setStaticJsonString] = useState<string>("");
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [jsonSize, setJsonSize] = useState<number>(0);
  const MAX_JSON_SIZE = 80 * 1024; // 80KB limit

  // 是否为编辑模式
  const isEditMode = !!initialData;

  // Main Initialization Effect
  useEffect(() => {
    if (isOpen) {
      loadHostDataSources();

      if (initialData) {
        setSourceType(initialData.type);
        setWrapperKey(initialData.wrapperKey || ""); // Initialize wrapperKey

        if (initialData.type === "host-function") {
          const hostSource = initialData as HostFunctionDataSource;
          // Set ID immediately so UI can show it (even if options aren't loaded yet)
          setSelectedHostSourceId(hostSource.hostFunctionId || "");

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
                  isAdvanced: isAdvancedParam(key),
                })
              )
            );
          }
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
                  isAdvanced: isAdvancedParam(key),
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
          // Initialize static JSON string
          if (staticSource.data) {
            const jsonStr = JSON.stringify(staticSource.data, null, 2);
            setStaticJsonString(jsonStr);
            setJsonSize(new Blob([jsonStr]).size);
          }
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

  // Sync Effect: Match ID to Object when sources load or ID changes
  useEffect(() => {
    // Only run if we are looking for a host function
    if (
      (sourceType === "host-function" ||
        initialData?.type === "host-function") &&
      hostDataSources.length > 0
    ) {
      if (selectedHostSourceId) {
        // Loose match to avoid string/number issues
        const match = hostDataSources.find(
          (s) => String(s.id) === String(selectedHostSourceId)
        );
        if (match) {
          setSelectedHostSource(match);
        } else {
          console.warn(`Host source for ID ${selectedHostSourceId} not found.`);
          // Fallback logic could go here if needed, e.g. matching by name
          if (initialData?.type === "host-function") {
            const nameMatch = hostDataSources.find(
              (s) => s.name === (initialData as any).hostFunctionName
            );
            if (nameMatch) {
              setSelectedHostSource(nameMatch);
              setSelectedHostSourceId(nameMatch.id);
            }
          }
        }
      }
    }
  }, [hostDataSources, selectedHostSourceId, initialData, sourceType]);

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
    setIsLoadingHostSources(true);
    try {
      // 从单例服务中获取已注册的宿主数据源
      const sources = DataSourceService.getHostDataSources();
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
    setSelectedHostSource(null);
    setSourceType("api");
    setWrapperKey(""); // Reset wrapper key
  };

  // 判断是否为高级参数
  const isAdvancedParam = (key: string): boolean => {
    const advancedKeywords = [
      "sort",
      "order",
      "fields",
      "expand",
      "include",
      "exclude",
      "cursor",
      "since",
      "until",
    ];
    return advancedKeywords.some((kw) => key.toLowerCase().includes(kw));
  };

  // 选择宿主数据源
  const handleSelectHostSource = (sourceId: string) => {
    const source = hostDataSources.find((s) => s.id === sourceId);
    if (!source) return;

    setSelectedHostSourceId(sourceId);
    setSelectedHostSource(source);
    setSourceType("host-function");

    // 如果是新建模式，使用宿主数据源的基本信息作为起点
    if (!isEditMode) {
      setConfig({
        name: `${source.name} - Custom`,
        description: source.description || "",
        category: source.category || "",
        endpoint: "",
        method: "GET",
        headers: {},
        parameters: {}, // 新建时清空参数，让用户配置
        refreshInterval: 0,
      });
      setParameters([]);
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

  const addOrUpdateHeader = (key: string, value: string) => {
    setHeaders((prev) => {
      const found = prev.find(
        (item) => item.key.trim().toLowerCase() === key.trim().toLowerCase()
      );
      if (found) {
        return prev.map((item) =>
          item.id === found.id ? { ...item, value } : item
        );
      }
      return [...prev, { id: `header-${Date.now()}-${key}`, key, value }];
    });
  };

  // Parameter操作
  const handleAddParameter = () => {
    setParameters([
      ...parameters,
      { id: `param-${Date.now()}`, key: "", value: "" },
    ]);
  };

  const handleAddAdvancedParameter = () => {
    setParameters([
      ...parameters,
      { id: `param-${Date.now()}`, key: "", value: "", isAdvanced: true },
    ]);
  };

  const handleUpdateParameter = (
    id: string,
    field: "key" | "value",
    value: string
  ) => {
    setParameters(
      parameters.map((param) =>
        param.id === id
          ? {
              ...param,
              [field]: value,
              isAdvanced:
                field === "key" ? isAdvancedParam(value) : param.isAdvanced,
            }
          : param
      )
    );
  };

  const handleRemoveParameter = (id: string) => {
    setParameters(parameters.filter((param) => param.id !== id));
  };

  const addOrUpdateParameter = (
    key: string,
    value: string,
    isAdvanced?: boolean
  ) => {
    setParameters((prev) => {
      const found = prev.find(
        (item) => item.key.trim().toLowerCase() === key.trim().toLowerCase()
      );
      if (found) {
        return prev.map((item) =>
          item.id === found.id
            ? { ...item, value, isAdvanced: isAdvanced ?? item.isAdvanced }
            : item
        );
      }
      return [
        ...prev,
        {
          id: `param-${Date.now()}-${key}`,
          key,
          value,
          isAdvanced: isAdvanced ?? isAdvancedParam(key),
        },
      ];
    });
  };

  const applyGhostPreset = () => {
    addOrUpdateHeader("Accept", "application/json");
    addOrUpdateHeader("Content-Type", "application/json");
    addOrUpdateHeader("Accept-Version", "v5.0");
    GHOST_PARAM_PRESETS.forEach((item) =>
      addOrUpdateParameter(item.key, item.value, false)
    );
    if (!config.category) {
      setConfig((prev) => ({ ...prev, category: "ghost" }));
    }
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

  if (!isOpen) return null;

  // 处理保存 - 关键修复：分离宿主函数ID和用户数据源名称
  const handleSave = () => {
    if (!config.name?.trim()) {
      alert("Data Source Name is required");
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
      wrapperKey: wrapperKey.trim() || undefined, // Include wrapper key
    };

    switch (sourceType) {
      case "host-function":
        // 尝试即时解析宿主数据源（如果selectedHostSource为空但有ID）
        let targetHostSource = selectedHostSource;
        if (!targetHostSource && selectedHostSourceId) {
          targetHostSource =
            hostDataSources.find(
              (s) => String(s.id) === String(selectedHostSourceId)
            ) || null;
        }

        // 确保有选中的宿主数据源
        if (!targetHostSource) {
          alert("Please select a host function first");
          return;
        }

        // 关键：创建新的数据源实例，保存宿主函数ID和fetchData函数引用
        newDataSource = {
          ...baseData,
          type: "host-function",
          // 保存宿主函数的fetchData引用
          fetchData: targetHostSource.fetchData,
          // 保存宿主函数的ID，用于标识使用的是哪个宿主函数
          hostFunctionId: targetHostSource.id,
          // 保存宿主函数的原始名称，用于显示
          hostFunctionName: targetHostSource.name,
          // 用户配置的参数
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
    // Validate required fields
    if (sourceType === "host-function" && !selectedHostSourceId) {
      alert("Please select a host function first");
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

    setIsTesting(true);
    setTestResult(null);

    try {
      // Construct a temporary data source for testing
      const testDataSource: DataSource = {
        id: "test-temp-id",
        name: config.name || "Test Source",
        type: sourceType,
        description: config.description,
        category: config.category,
        wrapperKey: wrapperKey.trim() || undefined, // Include wrapper key in test

        // API specific
        endpoint: config.endpoint,
        method: config.method,
        headers: config.headers,

        // Host function specific
        hostFunctionId: selectedHostSourceId,
        hostFunctionName: selectedHostSource?.name,

        // Static specific
        data: config.data,
      } as DataSource;

      // Use DataSourceService to fetch/execute
      console.log(
        "[DataSourceDialog] Testing data source with Service:",
        testDataSource
      );
      const result = await DataSourceService.fetchDataSourceData(
        testDataSource,
        config.parameters
      );

      if (result.success) {
        setTestResult(result.data);
        if (Array.isArray(result.data)) {
          setViewMode("visual");
        }
      } else {
        throw new Error(result.error);
      }
    } catch (e: any) {
      console.error("Test failed:", e);
      alert(`Test failed: ${e.message}`);
      setTestResult({ error: e.message, timestamp: new Date().toISOString() });
    } finally {
      setIsTesting(false);
    }
  };

  // 获取基础参数和高级参数
  const basicParameters = parameters.filter((p) => !p.isAdvanced);
  const advancedParameters = parameters.filter((p) => p.isAdvanced);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[90vh] flex flex-col">
        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">
            {initialData
              ? `Edit Data Source: ${initialData.name}`
              : "Create Data Source"}
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
                      <span className="text-sm font-medium mt-1">
                        External API
                      </span>
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
                  </div>
                </div>
              )}

              {/* Host Function配置区域 */}
              {sourceType === "host-function" && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-green-800 mb-3 flex items-center gap-2">
                    <CpuChipIcon className="w-4 h-4" />
                    Host Function Configuration
                  </h3>

                  {/* 宿主函数选择/显示 */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Host Function *
                    </label>
                    <div className="flex gap-2">
                      <select
                        className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                        value={selectedHostSourceId}
                        onChange={(e) => handleSelectHostSource(e.target.value)}
                        disabled={isLoadingHostSources}
                      >
                        <option value="">Select a host function...</option>
                        {hostDataSources.map((source) => (
                          <option key={source.id} value={source.id}>
                            {source.name}
                            {source.category ? ` (${source.category})` : ""}
                          </option>
                        ))}
                      </select>
                      {isLoadingHostSources && (
                        <ArrowPathIcon className="w-5 h-5 animate-spin text-gray-400" />
                      )}
                    </div>

                    {selectedHostSource && (
                      <div className="mt-3 p-3 bg-white rounded border">
                        <div className="flex items-start gap-3">
                          <CpuChipIcon className="w-5 h-5 text-green-600 mt-0.5" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-gray-900">
                                {selectedHostSource.name}
                              </h4>
                              {selectedHostSource.category && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                  {selectedHostSource.category}
                                </span>
                              )}
                            </div>
                            {selectedHostSource.description && (
                              <p className="text-sm text-gray-600 mb-2">
                                {selectedHostSource.description}
                              </p>
                            )}
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <InformationCircleIcon className="w-4 h-4" />
                              <span>
                                This host function can be used to create
                                multiple data sources with different parameters.
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 说明 */}
                  <div className="bg-blue-50 border border-blue-200 rounded p-3">
                    <div className="flex items-start gap-2">
                      <InformationCircleIcon className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-blue-800 font-medium mb-1">
                          How Host Functions Work
                        </p>
                        <p className="text-xs text-blue-700">
                          • <strong>Host Function</strong> is like an API
                          endpoint provided by the host application (e.g.,
                          Next.js API route)
                        </p>
                        <p className="text-xs text-blue-700 mt-1">
                          • <strong>Data Source Name</strong> is your custom
                          name for this specific configuration
                        </p>
                        <p className="text-xs text-blue-700 mt-1">
                          • You can create multiple data sources using the same
                          host function with different parameters
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 数据源基本信息 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data Source Name *
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    value={config.name}
                    onChange={(e) =>
                      setConfig({ ...config, name: e.target.value })
                    }
                    placeholder="e.g., Featured Products, Electronics List"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Your custom name for this data source instance
                  </p>
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
                    placeholder="e.g., products, users, articles"
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
                  placeholder="Describe what data this instance provides..."
                  rows={2}
                />
                <p className="text-xs text-gray-500 mt-1">
                  How you'll use this specific data source configuration
                </p>
              </div>

              {/* External API配置 */}
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
                    <div className="mt-2 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={applyGhostPreset}
                        className="text-xs px-2 py-1 rounded border border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                      >
                        Apply Ghost CMS preset
                      </button>
                      <span className="text-xs text-gray-500 self-center">
                        Adds normal headers + common Ghost query params, with
                        <code>filter</code> as basic parameter.
                      </span>
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
                      <div className="flex flex-wrap gap-2">
                        {QUICK_HEADER_PRESETS.map((preset) => (
                          <button
                            key={`${preset.key}:${preset.value}`}
                            type="button"
                            onClick={() =>
                              addOrUpdateHeader(preset.key, preset.value)
                            }
                            className="text-xs px-2 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
                          >
                            {preset.key}
                          </button>
                        ))}
                      </div>
                      {headers.map((header) => {
                        const valueOptions = getHeaderValueOptions(header.key);
                        return (
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
                            <div className="flex-1 flex gap-2">
                              {valueOptions.length > 0 && (
                                <select
                                  className="w-44 p-2 border rounded text-sm bg-gray-50 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                  value={
                                    valueOptions.includes(header.value)
                                      ? header.value
                                      : ""
                                  }
                                  onChange={(e) => {
                                    if (e.target.value) {
                                      handleUpdateHeader(
                                        header.id,
                                        "value",
                                        e.target.value
                                      );
                                    }
                                  }}
                                >
                                  <option value="">Quick select...</option>
                                  {valueOptions.map((option) => (
                                    <option key={option} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </select>
                              )}
                              <input
                                type="text"
                                className="flex-1 p-2 border rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                placeholder="Value"
                                value={header.value}
                                onChange={(e) =>
                                  handleUpdateHeader(
                                    header.id,
                                    "value",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <button
                              onClick={() => handleRemoveHeader(header.id)}
                              className="text-red-500 hover:bg-red-100 p-2 rounded transition flex-shrink-0"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })}

                      <button
                        onClick={handleAddHeader}
                        className="w-full py-2 text-sm text-blue-600 hover:text-blue-800 flex items-center justify-center gap-2 border border-blue-300 rounded hover:bg-blue-50 transition-colors"
                      >
                        <PlusIcon className="w-4 h-4" /> Add Header
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* 参数配置 - 所有数据源类型通用 */}
              <div className="border-t pt-6">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Query Parameters
                    </label>
                    <span className="text-xs text-gray-500">
                      ({parameters.filter((p) => p.key.trim()).length}{" "}
                      configured)
                    </span>
                  </div>
                </div>

                {/* 参数说明 */}
                <div className="mb-4 p-3 bg-gray-50 rounded border">
                  <p className="text-xs text-gray-600">
                    <strong>Parameters define how data is fetched:</strong>
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    For Ghost CMS, use <code>filter</code> in Basic Parameters
                    (example: <code>tag:hash-news+featured:true</code>).
                  </p>
                  <ul className="text-xs text-gray-600 mt-1 space-y-1">
                    <li>
                      •{" "}
                      <code className="bg-gray-200 px-1 rounded">
                        category=electronics
                      </code>{" "}
                      - Filter by category
                    </li>
                    <li>
                      •{" "}
                      <code className="bg-gray-200 px-1 rounded">
                        sort=price&order=desc
                      </code>{" "}
                      - Sort by price descending
                    </li>
                    <li>
                      •{" "}
                      <code className="bg-gray-200 px-1 rounded">
                        fields=id,name,price
                      </code>{" "}
                      - Select specific fields
                    </li>
                    <li>
                      •{" "}
                      <code className="bg-gray-200 px-1 rounded">
                        page=2&limit=20
                      </code>{" "}
                      - Pagination
                    </li>
                    <li>
                      •{" "}
                      <code className="bg-gray-200 px-1 rounded">
                        featured=true
                      </code>{" "}
                      - Get featured items only
                    </li>
                  </ul>
                </div>

                {/* 基础参数 */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Basic Parameters
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {[
                      "page",
                      "limit",
                      "search",
                      "filter",
                      "order",
                      "fields",
                    ].map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => addOrUpdateParameter(key, "", false)}
                        className="text-xs px-2 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        + {key}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {basicParameters.map((param) => (
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
                      <PlusIcon className="w-4 h-4" /> Add Basic Parameter
                    </button>
                  </div>
                </div>

                {/* 高级参数 */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium text-gray-700">
                        Advanced Parameters
                      </h4>
                      <button
                        onClick={() =>
                          setShowAdvancedParams(!showAdvancedParams)
                        }
                        className="text-gray-500 hover:text-gray-700"
                      >
                        {showAdvancedParams ? (
                          <ChevronUpIcon className="w-4 h-4" />
                        ) : (
                          <ChevronDownIcon className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {showAdvancedParams && (
                      <button
                        onClick={handleAddAdvancedParameter}
                        className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <PlusIcon className="w-3 h-3" /> Add Advanced
                      </button>
                    )}
                  </div>

                  {showAdvancedParams && (
                    <div className="space-y-3">
                      {advancedParameters.map((param) => (
                        <div key={param.id} className="flex gap-2 items-center">
                          <AutoCompleteInput
                            value={param.key}
                            onChange={(value) =>
                              handleUpdateParameter(param.id, "key", value)
                            }
                            suggestions={paramNameSuggestions}
                            placeholder="e.g. filter, sort, fields"
                            type="key"
                          />
                          <input
                            type="text"
                            className="flex-1 p-2 border rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Value (e.g. name,asc or id,name,price)"
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
                      {advancedParameters.length === 0 && (
                        <p className="text-sm text-gray-500 italic">
                          No advanced parameters added. Use for filters,
                          sorting, field selection, etc.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

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

              {/* Static Data Editor */}
              {sourceType === "static" && (
                <div className="border-t pt-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3 flex justify-between items-center">
                    <span>Static JSON Data *</span>
                    <span
                      className={`text-xs ${
                        jsonSize > MAX_JSON_SIZE
                          ? "text-red-600 font-bold"
                          : "text-gray-500"
                      }`}
                    >
                      Size: {(jsonSize / 1024).toFixed(2)} KB / 80 KB
                    </span>
                  </h4>

                  <div className="relative">
                    <textarea
                      className={`w-full h-64 p-3 border rounded font-mono text-sm leading-relaxed outline-none transition ${
                        jsonError || jsonSize > MAX_JSON_SIZE
                          ? "border-red-300 focus:ring-2 focus:ring-red-200"
                          : "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                      value={staticJsonString}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setStaticJsonString(newValue);
                        const size = new Blob([newValue]).size;
                        setJsonSize(size);

                        // Size validation
                        if (size > MAX_JSON_SIZE) {
                          setJsonError(
                            `Data size exceeds limit (${(size / 1024).toFixed(
                              2
                            )} KB > 80 KB)`
                          );
                          setConfig({ ...config, data: null }); // Invalidate data if too large
                          return;
                        }

                        // JSON Syntax validation
                        try {
                          const parsed = JSON.parse(newValue);
                          setJsonError(null);
                          setConfig({ ...config, data: parsed });
                        } catch (err: any) {
                          setJsonError("Invalid JSON syntax");
                          // Don't update config.data if invalid JSON, or clear it
                          setConfig({ ...config, data: null });
                        }
                      }}
                      placeholder='e.g., [{"id": 1, "name": "Item 1"}]'
                    />
                    {jsonError && (
                      <div className="absolute bottom-3 right-3 text-xs text-red-600 bg-red-50 px-2 py-1 rounded border border-red-200">
                        {jsonError}
                      </div>
                    )}
                  </div>

                  <div className="mt-2 text-xs text-gray-500 flex gap-2 items-start">
                    <InformationCircleIcon className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <p>
                      Enter valid JSON array or object. Data will be saved
                      directly in the application configuration. Large datasets
                      should use an external API instead.
                    </p>
                  </div>
                </div>
              )}

              {/* Array Wrapping Section */}
              <div className="border-t pt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Array Wrapping (Optional)
                </h3>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-2">
                    <InformationCircleIcon className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800 mb-1">
                        When to use Array Wrapping
                      </p>
                      <p className="text-xs text-yellow-700 mb-2">
                        If your data source returns an array and your component
                        expects an object with a specific property containing
                        that array (e.g., {"{items: [...]}"}), set a wrapper key
                        here.
                      </p>
                      <div className="text-xs text-yellow-700 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono bg-yellow-100 px-1 rounded">
                            Without wrapper:
                          </span>
                          <code className="text-xs">[item1, item2, item3]</code>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono bg-yellow-100 px-1 rounded">
                            With wrapper key "items":
                          </span>
                          <code className="text-xs">
                            {"{items: [item1, item2, item3]}"}
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Wrapper Key
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      value={wrapperKey}
                      onChange={(e) => setWrapperKey(e.target.value)}
                      placeholder="e.g., items, products, users"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Leave empty to keep the original array format
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Example Usage
                    </label>
                    <div className="p-2 bg-gray-50 rounded border text-xs font-mono">
                      {wrapperKey ? (
                        <div>
                          <span className="text-gray-700">
                            Component property:
                          </span>
                          <span className="text-blue-600"> {wrapperKey}</span>
                          <div className="mt-1 text-gray-500">
                            ↳ will bind to:{" "}
                            <span className="text-green-600">
                              {wrapperKey}[]
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <span className="text-gray-700">
                            Component property:
                          </span>
                          <span className="text-blue-600"> arrayField</span>
                          <div className="mt-1 text-gray-500">
                            ↳ will bind to:{" "}
                            <span className="text-green-600">[]</span> (direct
                            array)
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TEST TAB */}
          {activeTab === "test" && (
            <div className="space-y-4 h-full flex flex-col">
              {/* Test Controls */}
              <div className="flex justify-between items-center bg-gray-50 p-2 rounded border">
                <div className="text-sm truncate mr-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">
                      {sourceType === "api" && config.method}
                      {sourceType === "host-function" && "Host Function"}
                      {sourceType === "static" && "Static Data"}
                    </span>
                    {sourceType === "host-function" && selectedHostSource && (
                      <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded">
                        {selectedHostSource.name}
                      </span>
                    )}
                  </div>
                  <div className="text-gray-600 font-mono text-xs mt-1 truncate">
                    {sourceType === "api" && config.endpoint}
                    {sourceType === "host-function" && config.name}
                    {sourceType === "static" && "Static JSON"}
                  </div>
                </div>
                <button
                  onClick={handleTest}
                  disabled={
                    isTesting ||
                    (sourceType === "api" && !config.endpoint) ||
                    (sourceType === "host-function" && !selectedHostSource) ||
                    (sourceType === "static" && !config.data)
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

              {/* Array Info Banner */}
              {Array.isArray(testResult) && (
                <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded">
                  <div className="flex items-start gap-2">
                    <InformationCircleIcon className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-700">
                      <p className="font-medium">Array Result Detected</p>
                      <p className="mt-1">
                        This data source returns an array with{" "}
                        <strong>{testResult.length}</strong> items.
                        {wrapperKey ? (
                          <span>
                            {" "}
                            It will be wrapped as:{" "}
                            <code className="font-mono">
                              {"{"}
                              {wrapperKey}: [...]{"}"}
                            </code>
                          </span>
                        ) : (
                          " It will be used as a direct array."
                        )}
                      </p>
                      {wrapperKey && (
                        <p className="mt-1 text-xs">
                          <strong>Binding Tip:</strong> Use path{" "}
                          <code className="bg-blue-100 px-1 rounded">
                            {wrapperKey}[]
                          </code>{" "}
                          to access array items
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

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
                    data={
                      wrapperKey && Array.isArray(testResult)
                        ? { [wrapperKey]: testResult }
                        : testResult
                    }
                    category={config.category}
                    onBind={() => console.log("Bind preview")}
                  />
                ) : (
                  <div className="bg-gray-900 text-gray-100 p-4 font-mono text-xs overflow-auto h-full w-full">
                    <pre>
                      {JSON.stringify(
                        wrapperKey && Array.isArray(testResult)
                          ? { [wrapperKey]: testResult }
                          : testResult,
                        null,
                        2
                      )}
                    </pre>
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
              (sourceType === "host-function" && !selectedHostSource) ||
              (sourceType === "static" && !config.data)
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
