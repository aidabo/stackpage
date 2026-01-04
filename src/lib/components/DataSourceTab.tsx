// DataSourceTab.tsx - 完整修复版本
import React, { useState, useEffect, useCallback } from "react";
import {
  TrashIcon,
  PlusIcon,
  LinkIcon,
  PencilIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  CodeBracketIcon,
  CpuChipIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { useStackPage } from "./StackPageContext";
import { DataSource, HostFunctionDataSource } from "./types";
import { DataSourceDialog } from "./DataSourceDialog";

export const DataSourceTab: React.FC = (): JSX.Element => {
  const { source, setSource } = useStackPage();

  const [dataSources, setDataSources] = useState<DataSource[]>(
    source.dataSources || []
  );
  const [expandedDataSourceId, setExpandedDataSourceId] = useState<
    string | null
  >(null);

  // 对话框状态
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDataSource, setEditingDataSource] = useState<DataSource | null>(
    null
  );

  // 同步到上下文
  useEffect(() => {
    setDataSources(source.dataSources || []);
  }, [source.dataSources]);

  const handleSaveToContext = useCallback(() => {
    setSource((prev: any) => ({
      ...prev,
      dataSources,
    }));
  }, [dataSources, setSource]);

  // 自动保存更改
  useEffect(() => {
    handleSaveToContext();
  }, [dataSources, handleSaveToContext]);

  const handleCreateDataSource = () => {
    setEditingDataSource(null);
    setIsDialogOpen(true);
  };

  const handleDeleteDataSource = (id: string) => {
    const ds = dataSources.find((d) => d.id === id);
    if (!ds) return;

    if (window.confirm(`Are you sure you want to delete "${ds.name}"?`)) {
      setDataSources(dataSources.filter((ds) => ds.id !== id));
    }
  };

  const handleEditDataSource = (dataSource: DataSource) => {
    setEditingDataSource(dataSource);
    setIsDialogOpen(true);
  };

  const handleSaveDataSource = (dataSource: DataSource) => {
    if (editingDataSource) {
      // 更新现有数据源
      setDataSources(
        dataSources.map((ds) =>
          ds.id === editingDataSource.id ? dataSource : ds
        )
      );
    } else {
      // 创建新数据源
      setDataSources([...dataSources, dataSource]);
    }
    setIsDialogOpen(false);
    setEditingDataSource(null);
  };

  // 切换数据源详情展开/收起
  const toggleDataSourceDetails = (id: string) => {
    if (expandedDataSourceId === id) {
      setExpandedDataSourceId(null);
    } else {
      setExpandedDataSourceId(id);
    }
  };

  // 获取数据源标签颜色
  const getDataSourceBadgeColor = (type: DataSource["type"]) => {
    switch (type) {
      case "host-function":
        return "bg-green-100 text-green-800";
      case "api":
        return "bg-blue-100 text-blue-800";
      case "static":
        return "bg-purple-100 text-purple-800";
      case "function":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // 获取数据源图标
  const getDataSourceIcon = (type: DataSource["type"]) => {
    switch (type) {
      case "host-function":
        return <CpuChipIcon className="w-5 h-5 text-green-600" />;
      case "api":
        return <GlobeAltIcon className="w-5 h-5 text-blue-600" />;
      case "static":
        return <DocumentTextIcon className="w-5 h-5 text-purple-600" />;
      case "function":
        return <CodeBracketIcon className="w-5 h-5 text-yellow-600" />;
      default:
        return <GlobeAltIcon className="w-5 h-5 text-gray-600" />;
    }
  };

  // 获取Host Function数据源的宿主函数信息
  const getHostFunctionInfo = (ds: DataSource) => {
    if (ds.type !== "host-function") return null;

    const hostSource = ds as HostFunctionDataSource;
    return {
      hostFunctionId: hostSource.hostFunctionId || "Unknown",
      hostFunctionName: (hostSource as any).hostFunctionName || hostSource.name,
    };
  };

  // 统计不同类型的数据源
  const stats = {
    total: dataSources.length,
    hostFunctions: dataSources.filter((ds) => ds.type === "host-function")
      .length,
    apiSources: dataSources.filter((ds) => ds.type === "api").length,
    staticSources: dataSources.filter((ds) => ds.type === "static").length,
    functionSources: dataSources.filter((ds) => ds.type === "function").length,
  };

  return (
    <div className="h-full p-4 space-y-6 bg-zinc-200 overflow-y-auto">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Data Source Manager</h3>
          <p className="text-sm text-gray-600 mt-1">
            Create and manage data sources for components
          </p>
        </div>
        <button
          onClick={handleCreateDataSource}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium"
        >
          <PlusIcon className="w-4 h-4" />
          Create New
        </button>
      </div>

      {/* 数据源统计 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-lg border p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-xl font-semibold">{stats.total}</p>
            </div>
            <div className="text-gray-400">
              <LinkIcon className="w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Host Functions</p>
              <p className="text-xl font-semibold">{stats.hostFunctions}</p>
            </div>
            <CpuChipIcon className="w-6 h-6 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">External APIs</p>
              <p className="text-xl font-semibold">{stats.apiSources}</p>
            </div>
            <GlobeAltIcon className="w-6 h-6 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Others</p>
              <p className="text-xl font-semibold">
                {stats.staticSources + stats.functionSources}
              </p>
            </div>
            <DocumentTextIcon className="w-6 h-6 text-purple-500" />
          </div>
        </div>
      </div>

      {/* 数据源列表 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-gray-600" />
            <h4 className="font-medium text-gray-800">
              All Data Sources ({dataSources.length})
            </h4>
          </div>
          <div className="text-sm text-gray-500">
            {stats.hostFunctions > 0 && (
              <span className="inline-flex items-center gap-1 mr-3">
                <CpuChipIcon className="w-4 h-4 text-green-500" />
                {stats.hostFunctions} Host Functions
              </span>
            )}
            {stats.apiSources > 0 && (
              <span className="inline-flex items-center gap-1">
                <GlobeAltIcon className="w-4 h-4 text-blue-500" />
                {stats.apiSources} External APIs
              </span>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {dataSources.length === 0 ? (
            <div className="text-center py-12 text-gray-500 bg-white rounded-lg border">
              <div className="text-5xl mb-4">🔗</div>
              <p className="text-base mb-2">No data sources created yet</p>
              <p className="text-sm mb-4">
                Data sources provide data for your components
              </p>
              <button
                onClick={handleCreateDataSource}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
                Create your first data source
              </button>
            </div>
          ) : (
            dataSources.map((ds) => {
              const isExpanded = expandedDataSourceId === ds.id;
              const isHostFunction = ds.type === "host-function";
              const hostFunctionInfo = isHostFunction
                ? getHostFunctionInfo(ds)
                : null;

              return (
                <div
                  key={ds.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-sm transition-shadow"
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {getDataSourceIcon(ds.type)}
                          <h5 className="font-medium text-gray-900 truncate">
                            {ds.name}
                          </h5>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getDataSourceBadgeColor(
                              ds.type
                            )}`}
                          >
                            {ds.type === "host-function"
                              ? "Host Function"
                              : ds.type === "api"
                              ? "External API"
                              : ds.type === "static"
                              ? "Static"
                              : "Function"}
                          </span>
                          {ds.category && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              {ds.category}
                            </span>
                          )}
                        </div>

                        {/* Host Function特定信息 */}
                        {isHostFunction && hostFunctionInfo && (
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-gray-500">
                              Based on:
                            </span>
                            <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded">
                              {hostFunctionInfo.hostFunctionName}
                            </span>
                          </div>
                        )}

                        {ds.description && (
                          <p className="text-sm text-gray-600 truncate">
                            {ds.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          onClick={() => toggleDataSourceDetails(ds.id)}
                          className="p-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
                          title={isExpanded ? "Hide details" : "Show details"}
                        >
                          {isExpanded ? (
                            <ChevronDownIcon className="w-4 h-4" />
                          ) : (
                            <ChevronRightIcon className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => handleEditDataSource(ds)}
                          className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
                          title="Edit"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteDataSource(ds.id)}
                          className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                          title="Delete"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* 基本信息行 */}
                    <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-gray-500">
                      {ds.type === "api" && (
                        <>
                          <span className="font-mono truncate max-w-xs bg-gray-50 px-2 py-1 rounded">
                            {ds.method} {ds.endpoint}
                          </span>
                          {ds.refreshInterval > 0 && (
                            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">
                              Auto-refresh: {ds.refreshInterval}s
                            </span>
                          )}
                        </>
                      )}

                      {ds.type === "host-function" && hostFunctionInfo && (
                        <span className="bg-green-50 text-green-700 px-2 py-1 rounded">
                          Host Function ID: {hostFunctionInfo.hostFunctionId}
                        </span>
                      )}

                      {ds.parameters &&
                        Object.keys(ds.parameters).length > 0 && (
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {Object.keys(ds.parameters).length} parameter(s)
                          </span>
                        )}

                      {(ds as any).data !== undefined && (
                        <span className="bg-green-50 text-green-700 px-2 py-1 rounded">
                          Data:{" "}
                          {Array.isArray((ds as any).data)
                            ? `${(ds as any).data.length} items`
                            : "Loaded"}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 展开的详细信息 */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 p-4 bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* 参数详情 */}
                        {ds.parameters &&
                          Object.keys(ds.parameters).length > 0 && (
                            <div>
                              <h6 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                                <InformationCircleIcon className="w-3 h-3" />
                                Query Parameters
                              </h6>
                              <div className="bg-white rounded border p-3">
                                <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                                  {Object.entries(ds.parameters).map(
                                    ([key, value]) => (
                                      <div
                                        key={key}
                                        className="flex text-xs items-start"
                                      >
                                        <div className="w-1/3 font-medium text-gray-700 truncate pt-1">
                                          {key}
                                        </div>
                                        <div className="w-2/3">
                                          <div className="text-gray-600 truncate font-mono bg-gray-50 p-1 rounded">
                                            {typeof value === "object"
                                              ? JSON.stringify(value)
                                              : String(value)}
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          )}

                        {/* 数据源详细信息 */}
                        <div>
                          <h6 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                            <InformationCircleIcon className="w-3 h-3" />
                            Data Source Details
                          </h6>
                          <div className="bg-white rounded border p-3 space-y-2">
                            <div className="flex text-xs">
                              <div className="w-1/2 text-gray-500">Type:</div>
                              <div className="w-1/2 font-medium">
                                {ds.type === "host-function"
                                  ? "Host Function"
                                  : ds.type === "api"
                                  ? "External API"
                                  : ds.type === "static"
                                  ? "Static Data"
                                  : "Custom Function"}
                              </div>
                            </div>

                            {ds.type === "api" && ds.endpoint && (
                              <div className="flex text-xs">
                                <div className="w-1/2 text-gray-500">
                                  Endpoint:
                                </div>
                                <div className="w-1/2 font-mono truncate text-blue-600">
                                  {ds.endpoint}
                                </div>
                              </div>
                            )}

                            {ds.type === "host-function" &&
                              hostFunctionInfo && (
                                <>
                                  <div className="flex text-xs">
                                    <div className="w-1/2 text-gray-500">
                                      Host Function:
                                    </div>
                                    <div className="w-1/2 font-medium text-green-700">
                                      {hostFunctionInfo.hostFunctionName}
                                    </div>
                                  </div>
                                  <div className="flex text-xs">
                                    <div className="w-1/2 text-gray-500">
                                      Function ID:
                                    </div>
                                    <div className="w-1/2 font-mono text-xs">
                                      {hostFunctionInfo.hostFunctionId}
                                    </div>
                                  </div>
                                </>
                              )}

                            {ds.type === "api" && ds.method && (
                              <div className="flex text-xs">
                                <div className="w-1/2 text-gray-500">
                                  Method:
                                </div>
                                <div className="w-1/2 font-medium">
                                  {ds.method}
                                </div>
                              </div>
                            )}

                            {ds.type === "api" && ds.lastFetched && (
                              <div className="flex text-xs">
                                <div className="w-1/2 text-gray-500">
                                  Last Fetched:
                                </div>
                                <div className="w-1/2">
                                  {new Date(ds.lastFetched).toLocaleString()}
                                </div>
                              </div>
                            )}

                            <div className="flex text-xs">
                              <div className="w-1/2 text-gray-500">
                                Created:
                              </div>
                              <div className="w-1/2">
                                {ds.id.includes("ds_")
                                  ? // 从ID中提取时间戳（如果格式正确）
                                    (() => {
                                      const match = ds.id.match(/ds_(\d+)_/);
                                      if (match && match[1]) {
                                        const timestamp = parseInt(match[1]);
                                        return new Date(
                                          timestamp
                                        ).toLocaleDateString();
                                      }
                                      return "Unknown";
                                    })()
                                  : "Unknown"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 使用说明 */}
                      <div className="mt-4 pt-3 border-t border-gray-200">
                        <div className="text-xs text-gray-600">
                          <strong>Usage:</strong> This data source can be bound
                          to component properties in the Properties tab.
                          {ds.type === "host-function" &&
                            " The host function will be called with the specified parameters."}
                          {ds.type === "api" &&
                            " The external API will be fetched with the specified headers and parameters."}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 数据源对话框 */}
      <DataSourceDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingDataSource(null);
        }}
        onSave={handleSaveDataSource}
        initialData={editingDataSource}
      />
    </div>
  );
};
