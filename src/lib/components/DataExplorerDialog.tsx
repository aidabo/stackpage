import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";
import {
  XMarkIcon,
  TableCellsIcon,
  MapIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  PlusIcon,
  CheckIcon,
  ArrowRightIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
  CodeBracketSquareIcon,
  ClipboardDocumentCheckIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
} from "@heroicons/react/24/outline";
import { VisualDataPreview } from "./VisualDataPreview";
import { DataSource } from "./types";
import { generateSchemaFromCurrentProps } from "./PropertyTypeUtils";
import { get } from "../utils/get";
import { DataFetchUtils } from "../utils/dataFetchUtils";
import { DataSourceService } from "./DataSourceService";
import { transformers as transformerRegistry } from "../utils/transformers";
import {
  validateBindingAgainstSchema,
  getTypeCompatibilityDisplay,
} from "../utils/bindingValidation";

interface DataExplorerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  dataSources: DataSource[];
  onApplyMappings: (
    mappings: Record<string, string>,
    dataSourceId: string,
    _data?: any,
    transformers?: Record<string, string>,
    bindings?: Record<string, any>,
    ignoredFields?: string[]
  ) => void;
  onReleaseBindings?: () => void;
  onBindRecord: (
    record: any,
    mappings: Record<string, string>,
    dataSourceId: string
  ) => void;
  mappableProps: string[];
  currentMappings: Record<string, string>;
  currentTransformers?: Record<string, string>;
  currentBindings?: Record<string, any>;
  initialDataSourceId?: string;
  schema?: any;
  currentIgnoredFields?: string[];
}

export const DataExplorerDialog: React.FC<DataExplorerDialogProps> = ({
  isOpen,
  onClose,
  dataSources,
  onApplyMappings,
  onBindRecord,
  onReleaseBindings,
  mappableProps,
  currentMappings = {},
  currentTransformers,
  currentBindings,
  initialDataSourceId,
  schema,
  currentIgnoredFields,
}) => {
  const [activeTab, setActiveTab] = useState<"select" | "mapping">("select");
  const [mappings, setMappings] =
    useState<Record<string, string>>(currentMappings);
  const [ignoredFields, setIgnoredFields] = useState<string[]>(
    currentIgnoredFields || []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<
    { id: number; key: string; value: string }[]
  >([]);

  // Data Source State
  const [selectedDataSourceId, setSelectedDataSourceId] = useState<string>(
    initialDataSourceId || ""
  );
  const [previewData, setPreviewData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [selectedRecordIndex, setSelectedRecordIndex] = useState<number | null>(
    null
  );
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // Schema View State
  const [showSchema, setShowSchema] = useState(false);
  const [schemaJson, setSchemaJson] = useState<string>("");

  // Transformers State
  const [transformers, setTransformers] = useState<Record<string, string>>(
    currentTransformers || {}
  );

  // Binding Mode State
  const [bindToAll, setBindToAll] = useState<boolean>(false);

  // Resize State
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [dialogSize, setDialogSize] = useState({
    width: "90vw",
    height: "90vh",
    isResizing: false,
    resizeDirection: "" as "horizontal" | "vertical" | "both" | "",
    startX: 0,
    startY: 0,
    startWidth: 0,
    startHeight: 0,
  });

  const dialogRef = useRef<HTMLDivElement>(null);
  const resizeHandleRef = useRef<HTMLDivElement>(null);

  // Initialize mappings, transformers, and ignored fields
  useEffect(() => {
    console.log("[DataExplorerDialog] Initializing from props:", {
      currentMappings,
      currentTransformers,
      currentIgnoredFields,
    });

    setMappings(currentMappings);

    if (currentTransformers) {
      setTransformers(currentTransformers);
    }

    if (currentIgnoredFields) {
      setIgnoredFields(currentIgnoredFields);
    } else {
      setIgnoredFields([]);
    }
  }, [currentMappings, currentTransformers, currentIgnoredFields]);

  // Initial Data Source Selection
  useEffect(() => {
    if (isOpen && initialDataSourceId) {
      setSelectedDataSourceId(initialDataSourceId);
    } else if (isOpen && !selectedDataSourceId && dataSources.length > 0) {
      setSelectedDataSourceId(dataSources[0].id);
    }
  }, [isOpen, initialDataSourceId, dataSources]);

  // Fetch Data Function
  const fetchData = useCallback(async () => {
    if (!selectedDataSourceId) return;

    const ds = dataSources.find((d) => d.id === selectedDataSourceId);
    if (!ds) return;

    // For static data sources, use the stored data
    if (ds.type === "static" && ds.data) {
      setPreviewData(ds.data);
      setSelectedRecord(null); // Reset selection on data change
      setSelectedRecordIndex(null);
      setSelectedItems([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const result = await DataSourceService.fetchDataSourceData(
        ds,
        ds.parameters || {}
      );

      if (result.success) {
        // Cache result into datasource
        (ds as any).data = result.data;
        setPreviewData(result.data);
        setSelectedRecord(null); // Reset selection
        setSelectedRecordIndex(null);
        setSelectedItems([]);
      } else {
        throw new Error(result.error);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch data");
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedDataSourceId, dataSources]);

  // Fetch when source changes
  useEffect(() => {
    if (selectedDataSourceId && isOpen) {
      fetchData();
    }
  }, [selectedDataSourceId, isOpen, fetchData]);

  // Auto-select first record when data loads
  useEffect(() => {
    if (
      Array.isArray(previewData) &&
      previewData.length > 0 &&
      !selectedRecord
    ) {
      setSelectedRecord(previewData[0]);
      setSelectedRecordIndex(0);
      setSelectedItems([0]);
    } else if (previewData && !Array.isArray(previewData) && !selectedRecord) {
      setSelectedRecord(previewData);
      setSelectedRecordIndex(0);
      setSelectedItems([0]);
    }
  }, [previewData, selectedRecord]);

  // Restore selection from existing bindings
  useEffect(() => {
    if (
      previewData &&
      currentBindings &&
      Object.keys(currentBindings).length > 0
    ) {
      console.log(
        "[DataExplorerDialog] Restoring selection from existing bindings:",
        currentBindings
      );

      // Get the first binding to determine selection
      const firstBinding = Object.values(currentBindings)[0] as any;

      if (firstBinding && firstBinding.selector && Array.isArray(previewData)) {
        const selector = firstBinding.selector;

        console.log("[DataExplorerDialog] Restoring selector:", selector);

        switch (selector.type) {
          case "id":
            // Find record by ID
            const recordById = previewData.find(
              (item: any) => String(item.id) === String(selector.value)
            );
            if (recordById) {
              const index = previewData.indexOf(recordById);
              setSelectedRecord(recordById);
              setSelectedRecordIndex(index);
              setSelectedItems([index]);
            }
            break;

          case "ids":
            // Find records by IDs
            if (selector.value && Array.isArray(selector.value)) {
              const indices: number[] = [];
              previewData.forEach((item: any, index: number) => {
                if (selector.value.includes(String(item.id))) {
                  indices.push(index);
                }
              });
              if (indices.length > 0) {
                setSelectedItems(indices);
                setSelectedRecord(previewData[indices[0]]);
                setSelectedRecordIndex(indices[0]);
              }
            }
            break;

          case "index":
            // Select by index
            if (selector.value !== undefined) {
              const index = Number(selector.value);
              if (previewData[index]) {
                setSelectedRecord(previewData[index]);
                setSelectedRecordIndex(index);
                setSelectedItems([index]);
              }
            }
            break;

          case "all":
            // Select all
            setBindToAll(true);
            const allIndices = previewData.map((_, index) => index);
            setSelectedItems(allIndices);
            if (previewData.length > 0) {
              setSelectedRecord(previewData[0]);
              setSelectedRecordIndex(0);
            }
            break;
        }
      }
    }
  }, [previewData, currentBindings]);

  const currentDS = dataSources.find((d) => d.id === selectedDataSourceId);

  // Get data structure fields from selected record
  const dataFields = useMemo(() => {
    if (!selectedRecord) return [];

    const extractFields = (obj: any, path = "", level = 0): string[] => {
      const fields: string[] = [];

      if (!obj || typeof obj !== "object" || level > 5) return fields;

      Object.keys(obj).forEach((key) => {
        const value = obj[key];
        const currentPath = path ? `${path}.${key}` : key;

        // Add current path
        fields.push(currentPath);

        // Handle nested objects
        if (value && typeof value === "object" && !Array.isArray(value)) {
          fields.push(...extractFields(value, currentPath, level + 1));
        }
        // Handle arrays of objects (show first item as example)
        else if (
          Array.isArray(value) &&
          value.length > 0 &&
          typeof value[0] === "object"
        ) {
          fields.push(`${currentPath}[0]`);
          fields.push(
            ...extractFields(value[0], `${currentPath}[0]`, level + 1)
          );
        }
      });

      return fields;
    };

    return extractFields(selectedRecord);
  }, [selectedRecord]);

  // Generate Schema when data changes or modal opens
  useEffect(() => {
    if (showSchema && previewData) {
      let objectToSchema = previewData;
      if (Array.isArray(previewData) && previewData.length > 0) {
        objectToSchema = previewData[0];
      } else if (Array.isArray(previewData)) {
        objectToSchema = {};
      }

      const schema = generateSchemaFromCurrentProps(objectToSchema);
      setSchemaJson(JSON.stringify(schema, null, 2));
    }
  }, [showSchema, previewData]);

  // Update a mapping
  const updateMapping = (prop: string, field: string) => {
    setMappings({
      ...mappings,
      [prop]: field,
    });
  };

  // Update a transformer
  const updateTransformer = (prop: string, transformerId: string) => {
    setTransformers({
      ...transformers,
      [prop]: transformerId,
    });
  };

  // Handle ignore field change
  const handleIgnoreChange = (prop: string, isIgnored: boolean) => {
    if (isIgnored) {
      // Add to ignored fields
      setIgnoredFields((prev) => {
        const newIgnored = [...prev, prop];
        console.log(
          `[DataExplorerDialog] Ignoring ${prop}, ignoredFields:`,
          newIgnored
        );
        return newIgnored;
      });

      // Remove mapping for this field
      const newMappings = { ...mappings };
      delete newMappings[prop];
      setMappings(newMappings);

      // Remove transformer for this field
      const newTransformers = { ...transformers };
      delete newTransformers[prop];
      setTransformers(newTransformers);
    } else {
      // Remove from ignored fields
      setIgnoredFields((prev) => {
        const newIgnored = prev.filter((f) => f !== prop);
        console.log(
          `[DataExplorerDialog] Unignoring ${prop}, ignoredFields:`,
          newIgnored
        );
        return newIgnored;
      });
    }
  };

  // Handle record selection from VisualDataPreview
  const handleSelectRecord = (record: any, index: number) => {
    setSelectedRecord(record);
    setSelectedRecordIndex(index);

    // Add to selected items if not already there
    if (!selectedItems.includes(index)) {
      setSelectedItems([...selectedItems, index]);
    }

    // Auto-map record fields to component properties
    autoMapRecordToProps(record);
  };

  // Handle multi-select toggle
  const handleToggleSelection = (index: number) => {
    setSelectedItems((prev) => {
      if (prev.includes(index)) {
        // Remove from selection
        const newSelection = prev.filter((i) => i !== index);
        if (newSelection.length > 0) {
          // Update selected record to first in selection
          setSelectedRecord(previewData[newSelection[0]]);
          setSelectedRecordIndex(newSelection[0]);
        } else {
          setSelectedRecord(null);
          setSelectedRecordIndex(null);
        }
        return newSelection;
      } else {
        // Add to selection
        const newSelection = [...prev, index];
        setSelectedRecord(previewData[index]);
        setSelectedRecordIndex(index);
        return newSelection;
      }
    });
  };

  const autoMapRecordToProps = (_record: any) => {
    const newMappings: Record<string, string> = { ...mappings };
    const newTransformers: Record<string, string> = { ...transformers };

    mappableProps.forEach((prop) => {
      // Skip ignored fields
      if (ignoredFields.includes(prop)) return;

      // Try to find matching field in record
      const field = dataFields.find((f) => {
        const fieldName = f.split(".").pop() || "";
        return (
          fieldName.toLowerCase() === prop.toLowerCase() ||
          prop.toLowerCase().includes(fieldName.toLowerCase()) ||
          fieldName.toLowerCase().includes(prop.toLowerCase())
        );
      });

      if (field) {
        newMappings[prop] = field;

        // Auto-select transformer based on field type and schema
        if (schema?.properties?.[prop]) {
          const propType = schema.properties[prop].type;
          const value = get(_record, field);

          if (propType === "number" && typeof value !== "number") {
            newTransformers[prop] = "number";
          } else if (propType === "string" && typeof value !== "string") {
            newTransformers[prop] = "string";
          }
        }
      }
    });

    setMappings(newMappings);
    setTransformers(newTransformers);
  };

  // Apply mappings and bind selected record
  const applyMappingsAndBind = () => {
    const newBindings: Record<string, any> = {};

    Object.entries(mappings).forEach(([prop, path]) => {
      if (path && !ignoredFields.includes(prop)) {
        const propSchema = schema?.properties?.[prop];
        const targetType = propSchema?.type;

        // Determine selector based on binding mode and schema
        let selector;
        if (bindToAll && targetType === "array") {
          // Bind all records for array properties
          selector = { type: "all" as const };
        } else {
          // Use DataFetchUtils to create appropriate selector
          selector = DataFetchUtils.createBindingSelector(
            selectedRecord,
            selectedRecordIndex,
            selectedItems,
            targetType,
            Array.isArray(previewData) ? previewData : undefined
          );
        }

        newBindings[prop] = {
          sourceId: selectedDataSourceId,
          path: path,
          transformer: transformers[prop],
          selector: selector,
          targetType: targetType,
        };
      }
    });

    onApplyMappings(
      mappings,
      selectedDataSourceId,
      previewData,
      transformers,
      newBindings,
      ignoredFields
    );
    onClose();
  };

  // Get preview value for a field
  const getPreviewValue = (fieldPath: string) => {
    if (!selectedRecord || !fieldPath) return null;
    return get(selectedRecord, fieldPath);
  };

  // Get transformed preview value
  const getTransformedPreviewValue = (
    fieldPath: string,
    transformerId?: string
  ) => {
    const rawValue = getPreviewValue(fieldPath);
    if (rawValue === null || rawValue === undefined) return rawValue;

    if (transformerId && transformerRegistry[transformerId]) {
      try {
        return transformerRegistry[transformerId](rawValue);
      } catch (error) {
        console.error(`Transformer error (${transformerId}):`, error);
        return rawValue;
      }
    }

    return rawValue;
  };

  // Type compatibility checking
  const checkTypeCompatibility = (
    fieldPath: string,
    prop: string,
    transformerId?: string
  ) => {
    if (!fieldPath || !schema?.properties?.[prop]) return null;

    const propSchema = schema.properties[prop];
    const rawValue = getPreviewValue(fieldPath);

    if (rawValue === undefined || rawValue === null) {
      return <span className="text-gray-500 text-xs">No data</span>;
    }

    const binding = {
      sourceId: selectedDataSourceId,
      path: fieldPath,
      transformer: transformerId,
    };

    const warnings = validateBindingAgainstSchema(
      binding,
      propSchema,
      rawValue
    );
    const display = getTypeCompatibilityDisplay(warnings);

    if (display.tooltip) {
      return (
        <div className="group relative">
          <span className={display.className}>{display.text}</span>
          <div className="absolute bottom-full left-0 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 max-w-xs">
            {display.tooltip}
          </div>
        </div>
      );
    }

    return <span className={display.className}>{display.text}</span>;
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters([]);
    setSearchTerm("");
  };

  // Add filter
  const addFilter = () => {
    setFilters([...filters, { id: Date.now(), key: "title", value: "" }]);
  };

  // Update filter
  const updateFilter = (id: number, field: "key" | "value", value: string) => {
    setFilters(
      filters.map((f) => (f.id === id ? { ...f, [field]: value } : f))
    );
  };

  // Remove filter
  const removeFilter = (id: number) => {
    setFilters(filters.filter((f) => f.id !== id));
  };

  // Select all records
  const handleSelectAll = () => {
    if (Array.isArray(previewData) && previewData.length > 0) {
      const allIndices = previewData.map((_, index) => index);
      setSelectedItems(allIndices);
      setSelectedRecord(previewData[0]);
      setSelectedRecordIndex(0);
    }
  };

  // Clear selection
  const handleClearSelection = () => {
    setSelectedItems([]);
    setSelectedRecord(null);
    setSelectedRecordIndex(null);
  };

  // Resize handlers
  const handleResizeStart = (
    e: React.MouseEvent,
    direction: "horizontal" | "vertical" | "both"
  ) => {
    e.preventDefault();
    if (!dialogRef.current) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const rect = dialogRef.current.getBoundingClientRect();

    setDialogSize((prev) => ({
      ...prev,
      isResizing: true,
      resizeDirection: direction,
      startX,
      startY,
      startWidth: rect.width,
      startHeight: rect.height,
    }));

    // Add global event listeners
    document.addEventListener("mousemove", handleResizeMove);
    document.addEventListener("mouseup", handleResizeEnd);
  };

  const handleResizeMove = useCallback(
    (e: MouseEvent) => {
      if (!dialogSize.isResizing || !dialogRef.current) return;

      const deltaX = e.clientX - dialogSize.startX;
      const deltaY = e.clientY - dialogSize.startY;

      let newWidth = dialogSize.startWidth;
      let newHeight = dialogSize.startHeight;

      if (
        dialogSize.resizeDirection === "horizontal" ||
        dialogSize.resizeDirection === "both"
      ) {
        newWidth = Math.max(800, dialogSize.startWidth + deltaX);
      }

      if (
        dialogSize.resizeDirection === "vertical" ||
        dialogSize.resizeDirection === "both"
      ) {
        newHeight = Math.max(600, dialogSize.startHeight + deltaY);
      }

      setDialogSize((prev) => ({
        ...prev,
        width: `${newWidth}px`,
        height: `${newHeight}px`,
      }));
    },
    [dialogSize]
  );

  const handleResizeEnd = useCallback(() => {
    setDialogSize((prev) => ({
      ...prev,
      isResizing: false,
      resizeDirection: "",
    }));

    // Remove global event listeners
    document.removeEventListener("mousemove", handleResizeMove);
    document.removeEventListener("mouseup", handleResizeEnd);
  }, [handleResizeMove]);

  // Cleanup resize listeners
  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleResizeMove);
      document.removeEventListener("mouseup", handleResizeEnd);
    };
  }, [handleResizeMove, handleResizeEnd]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      setDialogSize({
        ...dialogSize,
        width: "95vw",
        height: "95vh",
      });
    } else {
      setDialogSize({
        ...dialogSize,
        width: "90vw",
        height: "90vh",
      });
    }
  };

  const dialogStyle = isFullscreen
    ? {
        width: "95vw",
        height: "95vh",
        maxWidth: "none",
        maxHeight: "none",
      }
    : {
        width: dialogSize.width,
        height: dialogSize.height,
        maxWidth: "65vw",
        maxHeight: "80vh",
      };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div
        ref={dialogRef}
        className="bg-white rounded-lg shadow-xl flex flex-col relative"
        style={dialogStyle}
      >
        {/* Resize handles */}
        {!isFullscreen && (
          <>
            {/* Bottom-right resize handle */}
            <div
              ref={resizeHandleRef}
              className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize flex items-center justify-center"
              onMouseDown={(e) => handleResizeStart(e, "both")}
            >
              <div className="w-3 h-3 border-b-2 border-r-2 border-gray-400" />
            </div>

            {/* Right resize handle */}
            <div
              className="absolute top-0 right-0 w-2 h-full cursor-ew-resize"
              onMouseDown={(e) => handleResizeStart(e, "horizontal")}
            />

            {/* Bottom resize handle */}
            <div
              className="absolute bottom-0 left-0 w-full h-2 cursor-ns-resize"
              onMouseDown={(e) => handleResizeStart(e, "vertical")}
            />
          </>
        )}

        {/* HEADER */}
        <div className="flex flex-col border-b bg-white flex-shrink-0">
          <div className="flex justify-between items-center p-4 pb-2">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <MagnifyingGlassIcon className="w-6 h-6 text-blue-600" />
              Data Explorer
            </h2>
            <div className="flex items-center gap-2">
              {/* Fullscreen toggle */}
              <button
                onClick={toggleFullscreen}
                className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? (
                  <ArrowsPointingInIcon className="w-5 h-5" />
                ) : (
                  <ArrowsPointingOutIcon className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="px-4 pb-4 flex items-center gap-4">
            {/* Data Source Selector */}
            <div className="flex-1 max-w-md">
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                Data Source
              </label>
              <div className="flex gap-2">
                <select
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={selectedDataSourceId}
                  onChange={(e) => setSelectedDataSourceId(e.target.value)}
                >
                  <option value="">Select Data Source...</option>
                  {dataSources.map((ds) => (
                    <option key={ds.id} value={ds.id}>
                      {ds.name} {ds.category ? `(${ds.category})` : ""}
                    </option>
                  ))}
                </select>
                <button
                  onClick={fetchData}
                  disabled={!selectedDataSourceId || isLoading}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg border border-gray-300 disabled:opacity-50 transition-colors"
                  title="Refresh Data"
                >
                  <ArrowPathIcon
                    className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`}
                  />
                </button>
              </div>
            </div>

            {/* Status Info */}
            {currentDS && (
              <div className="flex-1 pt-5">
                <div className="text-sm text-gray-600">
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium mr-2">
                    {currentDS.type.toUpperCase()}
                  </span>
                  {previewData && (
                    <span className="text-green-600 font-medium">
                      {Array.isArray(previewData)
                        ? `${previewData.length} records loaded`
                        : "Object loaded"}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Check Schema Button */}
            <div className="pt-5 px-2">
              <button
                onClick={() => setShowSchema(!showSchema)}
                disabled={!previewData}
                className={`p-2 rounded-lg transition-colors ${
                  showSchema
                    ? "bg-blue-100 text-blue-600"
                    : "hover:bg-gray-100 text-gray-500"
                } disabled:opacity-50`}
                title="Check Data Schema"
              >
                <CodeBracketSquareIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Schema Viewer Overlay */}
          {showSchema && (
            <div className="px-4 pb-4 bg-white border-b relative z-10 transition-all flex-shrink-0">
              <div className="bg-gray-800 rounded-lg p-4 font-mono text-xs text-green-400 overflow-auto max-h-[200px] shadow-inner relative group">
                <button
                  className="absolute top-2 right-2 p-1 bg-gray-700 rounded text-gray-300 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    navigator.clipboard.writeText(schemaJson);
                    const btn = e.currentTarget;
                    btn.classList.add("text-green-500");
                    setTimeout(
                      () => btn.classList.remove("text-green-500"),
                      1000
                    );
                  }}
                  title="Copy to Clipboard"
                >
                  <ClipboardDocumentCheckIcon className="w-4 h-4" />
                </button>
                <pre>{schemaJson}</pre>
              </div>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="px-4 pb-2 flex-shrink-0">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm">
                <ExclamationTriangleIcon className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="px-4 flex gap-1 bg-gray-50 border-t flex-shrink-0">
            <button
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === "select"
                  ? "border-blue-500 text-blue-600 bg-white"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("select")}
            >
              <TableCellsIcon className="w-4 h-4" />
              1. Select Record
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === "mapping"
                  ? "border-blue-500 text-blue-600 bg-white"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("mapping")}
            >
              <MapIcon className="w-4 h-4" />
              2. Map Fields
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-hidden bg-gray-50 relative min-h-0">
          {isLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-70 z-50 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <ArrowPathIcon className="w-8 h-8 text-blue-600 animate-spin" />
                <span className="text-sm font-medium text-gray-600">
                  Loading data...
                </span>
              </div>
            </div>
          )}

          {!previewData && !isLoading ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <MagnifyingGlassIcon className="w-16 h-16 mb-4 opacity-20" />
              <p>Select a data source to begin exploring</p>
            </div>
          ) : activeTab === "select" ? (
            <div className="h-full flex flex-col">
              {/* Search and Filter Bar */}
              <div className="p-3 bg-white border-b flex-shrink-0">
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative flex-1">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Search in data..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={() => setActiveTab("mapping")}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm flex items-center gap-2 flex-shrink-0"
                  >
                    <ArrowRightIcon className="w-4 h-4" />
                    Go to Mapping
                  </button>
                </div>

                {/* Selection Controls */}
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm text-gray-600">
                    {selectedItems.length > 0 ? (
                      <span className="font-medium text-blue-600">
                        {selectedItems.length} record(s) selected
                      </span>
                    ) : (
                      <span>No records selected</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSelectAll}
                      className="px-3 py-1 text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 rounded border border-blue-300"
                      disabled={
                        !Array.isArray(previewData) || previewData.length === 0
                      }
                    >
                      Select All
                    </button>
                    <button
                      onClick={handleClearSelection}
                      className="px-3 py-1 text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 rounded border border-gray-300"
                      disabled={selectedItems.length === 0}
                    >
                      Clear Selection
                    </button>
                  </div>
                </div>

                {/* Filters */}
                {filters.length > 0 && (
                  <div className="flex flex-wrap gap-2 items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      Filters:
                    </span>
                    {filters.map((filter) => (
                      <div
                        key={filter.id}
                        className="flex items-center gap-1 bg-gray-100 border rounded px-2 py-1 text-xs"
                      >
                        <input
                          type="text"
                          className="w-24 bg-transparent border-none outline-none"
                          placeholder="Field"
                          value={filter.key}
                          onChange={(e) =>
                            updateFilter(filter.id, "key", e.target.value)
                          }
                        />
                        <span className="text-gray-400">:</span>
                        <input
                          type="text"
                          className="w-32 bg-transparent border-none outline-none"
                          placeholder="Value"
                          value={filter.value}
                          onChange={(e) =>
                            updateFilter(filter.id, "value", e.target.value)
                          }
                        />
                        <button
                          onClick={() => removeFilter(filter.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <XMarkIcon className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addFilter}
                      className="px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded border border-blue-200 flex items-center gap-1"
                    >
                      <PlusIcon className="w-3 h-3" />
                      Add Filter
                    </button>
                    {filters.length > 0 && (
                      <button
                        onClick={clearFilters}
                        className="px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded border border-gray-300"
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Visual Preview */}
              <div className="flex-1 overflow-hidden min-h-0">
                <VisualDataPreview
                  data={previewData}
                  category={currentDS?.category}
                  onBind={(path, _isArray) => {
                    // Quick bind individual fields
                    if (mappableProps.length > 0) {
                      const prop =
                        mappableProps.find((p) => !mappings[p]) ||
                        mappableProps[0];
                      if (prop) {
                        updateMapping(prop, path);
                        setActiveTab("mapping");
                      }
                    }
                  }}
                  onSelectRecord={handleSelectRecord}
                  onToggleSelection={handleToggleSelection}
                  searchTerm={searchTerm}
                  filters={filters}
                  selectedIndices={selectedItems}
                />
              </div>

              {/* Quick Bind Button */}
              {selectedRecord && (
                <div className="p-3 border-t bg-white flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      {selectedItems.length > 1 ? (
                        <span>{selectedItems.length} records selected</span>
                      ) : (
                        <span>
                          Record{" "}
                          {selectedRecordIndex !== null
                            ? `#${selectedRecordIndex + 1}`
                            : ""}{" "}
                          selected
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        if (selectedRecord) {
                          onApplyMappings(mappings, selectedDataSourceId);
                          onBindRecord(
                            selectedRecord,
                            mappings,
                            selectedDataSourceId
                          );
                          onClose();
                        }
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-sm font-medium rounded-lg shadow-sm flex items-center gap-2"
                      disabled={!selectedDataSourceId}
                    >
                      <CheckCircleIcon className="w-4 h-4" />
                      Bind Selected Record with Current Mappings
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex min-w-0">
              {/* Left Panel - Field List */}
              <div className="w-96 min-w-[320px] max-w-lg border-r border-gray-200 bg-white flex flex-col overflow-hidden">
                <div className="p-3 border-b bg-gray-50 flex-shrink-0">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Available Data Fields
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Click to copy to unmapped property
                  </p>
                </div>

                <div className="flex-1 overflow-y-auto p-2 min-h-0">
                  {dataFields.length === 0 ? (
                    <div className="p-4 text-center text-gray-500 text-sm italic">
                      No fields found or no record selected.
                      <br />
                      Go back to "Select Record" tab.
                    </div>
                  ) : (
                    dataFields.map((field) => {
                      const preview = getPreviewValue(field);
                      return (
                        <div
                          key={field}
                          className="text-xs p-2 hover:bg-gray-50 rounded cursor-pointer border-l-2 border-l-gray-200 mb-1"
                          onClick={() => {
                            // Find first unmapped property
                            const unmappedProp = mappableProps.find(
                              (p) => !mappings[p]
                            );
                            if (unmappedProp) {
                              updateMapping(unmappedProp, field);
                            }
                          }}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-mono text-blue-600 break-all">
                              {field}
                            </span>
                            {mappings &&
                              Object.values(mappings).includes(field) && (
                                <CheckIcon className="w-3 h-3 text-green-500" />
                              )}
                          </div>
                          {preview !== undefined && (
                            <div className="text-gray-500 truncate text-xs mt-1 font-mono">
                              ={" "}
                              {typeof preview === "object"
                                ? JSON.stringify(preview).substring(0, 30) +
                                  "..."
                                : String(preview).substring(0, 30)}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Right Panel - Mapping Table */}
              <div className="flex-1 flex flex-col overflow-hidden min-w-0">
                <div className="p-4 bg-white border-b flex-shrink-0">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Set Field Mappings
                  </h3>
                  <p className="text-sm text-gray-600">
                    Map component properties to data fields (JSON path).
                  </p>
                </div>

                <div className="flex-1 overflow-auto p-4 bg-gray-50 min-h-0">
                  {/* Bind to all checkbox for array properties */}
                  {schema &&
                    Object.values(schema.properties || {}).some(
                      (prop: any) => prop.type === "array"
                    ) && (
                      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <label className="flex items-center gap-2 text-sm text-blue-800">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            checked={bindToAll}
                            onChange={(e) => {
                              setBindToAll(e.target.checked);
                              if (
                                e.target.checked &&
                                Array.isArray(previewData)
                              ) {
                                // Select all records when enabling bind to all
                                const allIndices = previewData.map(
                                  (_, index) => index
                                );
                                setSelectedItems(allIndices);
                              }
                            }}
                          />
                          Bind all records to array properties (instead of
                          selected records)
                        </label>
                        <p className="text-xs text-blue-600 mt-1 ml-6">
                          When enabled, all records from the data source will be
                          bound to array-type properties.
                        </p>
                      </div>
                    )}

                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm min-w-[1000px]">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-3 p-3 border-b bg-gray-50">
                      <div className="col-span-1 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Ignored
                      </div>
                      <div className="col-span-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Component Property
                      </div>
                      <div className="col-span-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        JSON Path / Field
                      </div>
                      <div className="col-span-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Transformer
                      </div>
                      <div className="col-span-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Type Check
                      </div>
                      <div className="col-span-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Preview
                      </div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-gray-100">
                      {mappableProps.map((prop) => {
                        const fieldPath = mappings[prop] || "";
                        const previewValue = fieldPath
                          ? getTransformedPreviewValue(
                              fieldPath,
                              transformers[prop]
                            )
                          : null;

                        return (
                          <div
                            key={prop}
                            className="grid grid-cols-12 gap-3 p-3 hover:bg-blue-50/50 items-center transition-colors"
                          >
                            {/* Ignored Column */}
                            <div className="col-span-1 flex justify-center">
                              <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                checked={ignoredFields.includes(prop)}
                                onChange={(e) => {
                                  handleIgnoreChange(prop, e.target.checked);
                                }}
                              />
                            </div>

                            {/* Property Column */}
                            <div className="col-span-3">
                              <div
                                className={`flex items-center gap-2 ${
                                  ignoredFields.includes(prop)
                                    ? "opacity-50"
                                    : ""
                                }`}
                              >
                                <div
                                  className={`w-2 h-2 rounded-full ${
                                    fieldPath ? "bg-green-500" : "bg-gray-300"
                                  }`}
                                ></div>
                                <div className="min-w-0">
                                  <div className="text-sm font-medium text-gray-900 truncate">
                                    {prop}
                                  </div>
                                  {schema?.properties?.[prop] && (
                                    <div className="text-xs text-gray-500 truncate">
                                      {schema.properties[prop].type}
                                      {schema.properties[prop].format &&
                                        ` (${schema.properties[prop].format})`}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Data Field Column (Dropdown + Input) */}
                            <div className="col-span-2">
                              <div className="flex gap-1">
                                <select
                                  className="w-1/3 min-w-[80px] px-2 py-1.5 border border-gray-300 rounded-l text-xs focus:ring-1 focus:ring-blue-500 outline-none disabled:bg-gray-100 disabled:text-gray-400"
                                  value={
                                    dataFields.includes(fieldPath)
                                      ? fieldPath
                                      : ""
                                  }
                                  onChange={(e) => {
                                    updateMapping(prop, e.target.value);
                                    // Auto-unignore if mapped
                                    if (ignoredFields.includes(prop)) {
                                      setIgnoredFields(
                                        ignoredFields.filter((f) => f !== prop)
                                      );
                                    }
                                  }}
                                  disabled={ignoredFields.includes(prop)}
                                >
                                  <option value="">Select...</option>
                                  {dataFields.map((field) => (
                                    <option key={field} value={field}>
                                      {field}
                                    </option>
                                  ))}
                                </select>
                                <input
                                  type="text"
                                  className="flex-1 min-w-[100px] px-2 py-1.5 border border-l-0 border-gray-300 rounded-r text-xs font-mono text-gray-700 focus:ring-1 focus:ring-blue-500 outline-none disabled:bg-gray-100 disabled:text-gray-400"
                                  value={fieldPath}
                                  placeholder={
                                    ignoredFields.includes(prop)
                                      ? "Ignored"
                                      : "e.g. items[0].name"
                                  }
                                  onChange={(e) => {
                                    updateMapping(prop, e.target.value);
                                    if (ignoredFields.includes(prop)) {
                                      setIgnoredFields(
                                        ignoredFields.filter((f) => f !== prop)
                                      );
                                    }
                                  }}
                                  disabled={ignoredFields.includes(prop)}
                                />
                              </div>
                            </div>

                            {/* Transformer Column */}
                            <div className="col-span-2">
                              <select
                                className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 outline-none"
                                value={transformers[prop] || ""}
                                onChange={(e) =>
                                  updateTransformer(prop, e.target.value)
                                }
                                disabled={ignoredFields.includes(prop)}
                              >
                                <option value="">None</option>
                                {Object.keys(transformerRegistry).map((key) => (
                                  <option key={key} value={key}>
                                    {key}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* Type Check Column */}
                            <div className="col-span-2">
                              {fieldPath &&
                                !ignoredFields.includes(prop) &&
                                checkTypeCompatibility(
                                  fieldPath,
                                  prop,
                                  transformers[prop]
                                )}
                            </div>

                            {/* Preview Column */}
                            <div className="col-span-2 min-w-0">
                              {!ignoredFields.includes(prop) ? (
                                previewValue !== undefined &&
                                previewValue !== null ? (
                                  <div
                                    className="text-xs font-mono bg-green-50 text-green-700 px-2 py-1 rounded border border-green-200 truncate"
                                    title={String(previewValue)}
                                  >
                                    {typeof previewValue === "object"
                                      ? `[${
                                          Array.isArray(previewValue)
                                            ? "Array"
                                            : "Object"
                                        }]`
                                      : String(previewValue).substring(0, 25)}
                                    {String(previewValue).length > 25
                                      ? "..."
                                      : ""}
                                  </div>
                                ) : fieldPath ? (
                                  <div className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded border border-red-200 truncate">
                                    Not found
                                  </div>
                                ) : (
                                  <span className="text-xs text-gray-400 italic">
                                    -
                                  </span>
                                )
                              ) : (
                                <span className="text-xs text-gray-400 italic">
                                  Ignored
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex justify-between items-center flex-shrink-0">
                    <div className="text-sm text-gray-500">
                      <div>
                        {
                          Object.keys(mappings).filter((k) => mappings[k])
                            .length
                        }{" "}
                        mapped, {ignoredFields.length} ignored
                      </div>
                    </div>
                    <div className="flex gap-3">
                      {onReleaseBindings && (
                        <button
                          onClick={onReleaseBindings}
                          className="px-4 py-2 text-sm text-red-700 bg-red-100 hover:bg-red-200 border border-red-200 rounded-lg transition-colors mr-auto"
                        >
                          Release All
                        </button>
                      )}
                      <button
                        onClick={() => setActiveTab("select")}
                        className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Back
                      </button>
                      <button
                        onClick={applyMappingsAndBind}
                        disabled={
                          Object.keys(mappings).filter((k) => mappings[k])
                            .length === 0 ||
                          !selectedRecord ||
                          !selectedDataSourceId
                        }
                        className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        <CheckCircleIcon className="w-4 h-4" />
                        Apply & Bind
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Resizing overlay */}
        {dialogSize.isResizing && (
          <div className="fixed inset-0 z-[201] cursor-se-resize" />
        )}
      </div>
    </div>
  );
};
