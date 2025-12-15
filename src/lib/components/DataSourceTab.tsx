// DataSourceTab.tsx
import React, { useState, useEffect, useCallback } from "react";
import {
  TrashIcon,
  PlusIcon,
  LinkIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { useStackPage } from "./StackPageContext";
import { DataSource } from "./types";
import { DataSourceDialog } from "./DataSourceDialog"; // 导入对话框组件

export const DataSourceTab: React.FC = (): JSX.Element => {
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
    // 改为打开对话框创建
    setEditingDataSource(null);
    setIsDialogOpen(true);
  };

  const handleDeleteDataSource = (id: string) => {
    if (window.confirm("Are you sure you want to delete this data source?")) {
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

  const handleUpdateDataSource = (id: string, updates: Partial<DataSource>) => {
    setDataSources(
      dataSources.map((ds) => (ds.id === id ? { ...ds, ...updates } : ds))
    );
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

      {/* 数据源列表 */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-800">
          Your Data Sources ({dataSources.length})
        </h4>

        {dataSources.length === 0 ? (
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
        ) : (
          <div className="space-y-3">
            {dataSources.map((ds) => (
              <div
                key={ds.id}
                className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium text-gray-900">{ds.name}</h5>
                      {ds.category && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          {ds.category}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <LinkIcon className="w-3 h-3" />
                      {ds.endpoint}
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
                    <span className="text-gray-600 text-xs">Type:</span>
                    <span className="font-medium capitalize">{ds.type}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-600 text-xs">Method:</span>
                    <span className="font-medium">{ds.method}</span>
                  </div>
                  {ds.refreshInterval > 0 && (
                    <div className="flex flex-col">
                      <span className="text-gray-600 text-xs">Refresh:</span>
                      <span className="font-medium">
                        Every {ds.refreshInterval}s
                      </span>
                    </div>
                  )}
                  {ds.lastFetched && (
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

                {/* 显示参数统计 */}
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-4 text-xs text-gray-500">
                  <span>Headers: {Object.keys(ds.headers || {}).length}</span>
                  <span>Params: {Object.keys(ds.parameters || {}).length}</span>
                  <span>Mapping: {Object.keys(ds.mapping || {}).length}</span>
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
        )}
      </div>

      {/* 使用说明 */}
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <h4 className="font-medium text-green-800 mb-2 text-sm">
          How to Use Data Sources
        </h4>
        <ul className="text-xs text-green-700 space-y-1">
          <li>• Connect to external APIs for dynamic data</li>
          <li>• Use in select fields for dynamic options</li>
          <li>• Reference in components: {"{{api.your_data_source}}"}</li>
          <li>• Click the pencil icon to edit any data source</li>
          <li>• Test your API endpoints before saving</li>
        </ul>
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
