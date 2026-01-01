// DataSourceTab.tsx - 完整修改
import React, { useState, useEffect, useCallback } from "react";
import {
  TrashIcon,
  PlusIcon,
  LinkIcon,
  PencilIcon,
  // ServerIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  CodeBracketIcon, // 用CodeBracketIcon代替FunctionIcon
  CpuChipIcon, // 用于表示主机功能
} from "@heroicons/react/24/outline";
import { useStackPage } from "./StackPageContext";
import { DataSource, HostFunctionDataSource } from "./types";
import { DataSourceDialog } from "./DataSourceDialog";

interface DataSourceTabProps {
  // 新增：获取宿主数据源的函数
  getHostDataSources?: () => Promise<HostFunctionDataSource[]>;
}

export const DataSourceTab: React.FC<DataSourceTabProps> = ({
  getHostDataSources,
}): JSX.Element => {
  const { source, setSource } = useStackPage();

  const [dataSources, setDataSources] = useState<DataSource[]>(
    source.dataSources || []
  );

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

    // 检查是否为宿主函数数据源
    if (ds.type === "host-function") {
      alert("Cannot delete host-provided function data sources");
      return;
    }

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

  // 分组数据源
  const hostFunctionSources = dataSources.filter(
    (ds) => ds.type === "host-function"
  );
  const apiSources = dataSources.filter((ds) => ds.type === "api");
  const staticSources = dataSources.filter((ds) => ds.type === "static");
  const functionSources = dataSources.filter((ds) => ds.type === "function");

  // getDataSourceIcon was unused. Removed.

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

  return (
    <div className="h-full p-4 space-y-6 bg-zinc-200 overflow-y-auto">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Data Source Manager</h3>
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
              <p className="text-sm text-gray-500">Host Functions</p>
              <p className="text-xl font-semibold">
                {hostFunctionSources.length}
              </p>
            </div>
            <CpuChipIcon className="w-6 h-6 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">API Sources</p>
              <p className="text-xl font-semibold">{apiSources.length}</p>
            </div>
            <GlobeAltIcon className="w-6 h-6 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Static Data</p>
              <p className="text-xl font-semibold">{staticSources.length}</p>
            </div>
            <DocumentTextIcon className="w-6 h-6 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg border p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Functions</p>
              <p className="text-xl font-semibold">{functionSources.length}</p>
            </div>
            <CodeBracketIcon className="w-6 h-6 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* 宿主函数数据源 */}
      {hostFunctionSources.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <CpuChipIcon className="w-5 h-5 text-green-600" />
            <h4 className="font-medium text-gray-800">
              Host Function Data Sources ({hostFunctionSources.length})
            </h4>
          </div>

          <div className="space-y-3">
            {hostFunctionSources.map((ds) => (
              <div
                key={ds.id}
                className="bg-green-50 border border-green-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium text-gray-900">{ds.name}</h5>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getDataSourceBadgeColor(
                          ds.type
                        )}`}
                      >
                        Host Function
                      </span>
                      {ds.category && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          {ds.category}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <CpuChipIcon className="w-3 h-3" />
                      {ds.description || "No description"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEditDataSource(ds)}
                      className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
                      title="Edit"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-xs text-gray-500 mt-2">
                  <span className="font-medium">Type:</span> Host Function
                  {ds.type === "host-function" &&
                    (ds as HostFunctionDataSource).parameters && (
                      <span className="ml-2">
                        • {(ds as HostFunctionDataSource).parameters!.length}{" "}
                        parameters
                      </span>
                    )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* API数据源 */}
      {apiSources.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium text-gray-800">
            API Data Sources ({apiSources.length})
          </h4>

          <div className="space-y-3">
            {apiSources.map((ds) => (
              <div
                key={ds.id}
                className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium text-gray-900">{ds.name}</h5>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getDataSourceBadgeColor(
                          ds.type
                        )}`}
                      >
                        API
                      </span>
                      {ds.category && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          {ds.category}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <LinkIcon className="w-3 h-3" />
                      {ds.type === "api" && ds.endpoint}
                    </p>
                    {ds.description && (
                      <p className="text-xs text-gray-600 mt-2">
                        {ds.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
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

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div className="flex flex-col">
                    <span className="text-gray-600 text-xs">Method:</span>
                    <span className="font-medium">
                      {ds.type === "api" && ds.method}
                    </span>
                  </div>
                  {ds.type === "api" && ds.refreshInterval > 0 && (
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-xs">Refresh:</span>
                      <span className="font-medium">
                        Every {ds.refreshInterval}s
                      </span>
                    </div>
                  )}
                  {ds.type === "api" && ds.lastFetched && (
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-xs">
                        Last Fetched:
                      </span>
                      <span className="font-medium text-xs">
                        {new Date(ds.lastFetched).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-4 text-xs text-gray-500">
                  <span>
                    Headers:{" "}
                    {ds.type === "api" && Object.keys(ds.headers || {}).length}
                  </span>
                  <span>
                    Params:{" "}
                    {ds.type === "api" &&
                      Object.keys(ds.parameters || {}).length}
                  </span>
                  {ds.data && (
                    <span className="text-green-600">
                      Data:{" "}
                      {Array.isArray(ds.data)
                        ? `${ds.data.length} items`
                        : "Loaded"}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 静态和函数数据源 */}
      {(staticSources.length > 0 || functionSources.length > 0) && (
        <div className="space-y-4">
          <h4 className="font-medium text-gray-800">Other Data Sources</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {staticSources.map((ds) => (
              <div
                key={ds.id}
                className="bg-white rounded-lg border border-purple-200 p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium text-gray-900">{ds.name}</h5>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getDataSourceBadgeColor(
                          ds.type
                        )}`}
                      >
                        Static
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {ds.description || "Static JSON data"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEditDataSource(ds)}
                      className="p-1 text-gray-600 hover:text-blue-600"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteDataSource(ds.id)}
                      className="p-1 text-red-600 hover:text-red-800"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {ds.type === "static" && (
                    <span>
                      Data:{" "}
                      {Array.isArray(ds.data)
                        ? `${ds.data.length} items`
                        : "Object"}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {functionSources.map((ds) => (
              <div
                key={ds.id}
                className="bg-white rounded-lg border border-yellow-200 p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium text-gray-900">{ds.name}</h5>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getDataSourceBadgeColor(
                          ds.type
                        )}`}
                      >
                        Function
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {ds.description || "Custom JavaScript function"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEditDataSource(ds)}
                      className="p-1 text-gray-600 hover:text-blue-600"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteDataSource(ds.id)}
                      className="p-1 text-red-600 hover:text-red-800"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {ds.type === "function" && (
                    <span>
                      Function code: {ds.functionCode.length} characters
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 空状态 */}
      {dataSources.length === 0 && (
        <div className="text-center py-8 text-gray-500 bg-white rounded-lg border">
          <div className="text-3xl mb-2">🔗</div>
          <p className="text-sm">No data sources created yet</p>
          <button
            onClick={handleCreateDataSource}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Create your first data source
          </button>
        </div>
      )}

      {/* 数据源对话框 */}
      <DataSourceDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingDataSource(null);
        }}
        onSave={handleSaveDataSource}
        initialData={editingDataSource}
        // 传递宿主数据源获取函数
        getHostDataSources={getHostDataSources}
      />
    </div>
  );
};
