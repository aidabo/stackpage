import {
  useState,
  useRef,
  useEffect,
  ReactNode,
  createContext,
  useContext,
  useCallback,
} from "react";
import {
  ArrowLeftIcon,
  ArrowPathIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TrashIcon,
  CloudArrowDownIcon,
  EyeIcon,
  ArrowLeftCircleIcon,
  PencilIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

import {
  GridStackProvider,
  GridStackRender,
  GridStackRenderProvider,
} from "..";
import { GridStackOptions } from "gridstack";
import {
  gridOptions,
  subGridOptions,
  PageProps,
  getDefaultPageProps,
  getComponentMap,
  getComponentProps,
  ComponentMapProvider,
  ComponentPropsProvider,
  GoBackListFn,
  LoadLayoutFn,
  SaveLayoutFn,
} from "./stackoptions";

import StackActions, { StackActionsRef } from "./stackactions";
import { GridStackDropEvent } from "../grid-stack-render-provider";
import PageInfoDialogs from "./pageinfodialog";
import DeleteDropZone from "./deletedropzone";

import "../styles/index.css";

// Types for components in the layout
export interface ComponentInstance {
  id: string;
  type: string;
  props: Record<string, any>;
  position?: { x: number; y: number };
}

// Create context for internal state management
interface StackPageContextType {
  selectedComponent: string | null;
  setSelectedComponent: (component: string | null) => void;
  selectedInstance: ComponentInstance | null;
  setSelectedInstance: (instance: ComponentInstance | null) => void;
  componentInstances: ComponentInstance[];
  setComponentInstances: (instances: ComponentInstance[]) => void;
  pageAttributes: {
    margin: string;
    padding: string;
    background: string;
    gap: string;
  };
  setPageAttributes: (attributes: any) => void;
  addComponentToLayout: (
    componentType: string,
    position: { x: number; y: number }
  ) => void;
  updateComponentProps: (
    componentId: string,
    props: Record<string, any>
  ) => void;
  removeComponent: (componentId: string) => void;
}

const StackPageContext = createContext<StackPageContextType | undefined>(
  undefined
);

export const useStackPage = () => {
  const context = useContext(StackPageContext);
  if (!context) {
    throw new Error("useStackPage must be used within a StackPage");
  }
  return context;
};

export interface StackPageProps {
  pageid: string;
  pageMode: "edit" | "preview" | "view";
  onLoadLayout: LoadLayoutFn; //(pageid: string) => Promise<PageProps>;
  onSaveLayout?: SaveLayoutFn; //(pageid: string, pageProps: PageProps) => void;
  componentMapProvider?: ComponentMapProvider;
  componentPropsProvider?: ComponentPropsProvider;
  gobackList: GoBackListFn; //() => void
  children?: ReactNode;
}

// TooltipButton component
function TooltipButton({
  onClick,
  icon,
  tooltip,
  className = "",
}: {
  onClick: () => void;
  icon: React.ReactNode;
  tooltip: string;
  className?: string;
}) {
  return (
    <div className="relative group">
      <button
        onClick={onClick}
        className={`p-2 rounded-lg transition ${className}`}
      >
        {icon}
      </button>
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
        {tooltip}
        <div className="absolute bottom-full left-1/2 w-2 h-2 bg-black transform -translate-x-1/2 rotate-45 -mb-1"></div>
      </div>
    </div>
  );
}

// StatusButton component
function StatusButton({
  onClick,
  icon,
  label,
  className = "",
  successMessage = "Success",
  errorMessage = "Error",
}: {
  onClick: () => Promise<void>;
  icon: React.ReactNode;
  label: string;
  className?: string;
  successMessage?: string;
  errorMessage?: string;
}) {
  const [status, setStatus] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    setStatus(null);
    try {
      await onClick();
      setStatus({ message: successMessage, type: "success" });
    } catch (error) {
      setStatus({ message: errorMessage, type: "error" });
    } finally {
      setIsLoading(false);
      setTimeout(() => setStatus(null), 3000);
    }
  };

  return (
    <div className="relative z-30">
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`p-2 rounded-lg transition flex items-center ${className} ${
          isLoading ? "opacity-70" : ""
        }`}
      >
        {isLoading ? (
          <ArrowPathIcon className="h-5 w-5 animate-spin" />
        ) : (
          <>
            {icon}
            <span className="ml-1 hidden sm:inline">{label}</span>
          </>
        )}
      </button>
      {status && (
        <div
          className={`absolute top-full left-0 mt-1 w-full text-center px-2 py-1 rounded-md text-xs font-medium animate-fadeIn ${
            status.type === "success"
              ? "bg-blue-500 text-white"
              : "bg-red-100 text-red-800"
          }`}
        >
          {status.message}
        </div>
      )}
    </div>
  );
}

// Mobile detection hook
const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return isMobile;
};

const StackPage = ({
  pageid,
  pageMode,
  onSaveLayout,
  onLoadLayout,
  componentMapProvider,
  componentPropsProvider,
  gobackList,
  children,
}: StackPageProps) => {
  // Simplified mode handling
  const [currentMode, setCurrentMode] = useState<"edit" | "preview" | "view">(pageMode);
  const [showEditor, setShowEditor] = useState(true);
  //const [isResizing, setIsResizing] = useState(false);
  const [panelWidth /*setPanelWidth*/] = useState(400);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [activeTab, setActiveTab] = useState<"components" | "properties" | "page">("components");

  const [pageProps, setPageProps] = useState<PageProps>({...getDefaultPageProps(), id: pageid});
  const [title, setTitle] = useState<string>()
  const [pageTitle, setPageTitle] = useState<string>();

  const [resetKey, setResetKey] = useState(0);
  const [initialOptions, setInitialOptions] = useState<GridStackOptions>(gridOptions);
  const stackActionsRef = useRef<StackActionsRef>(null);

  const [dropEvent, setDropEvent] = useState<GridStackDropEvent>();
  const [showGridInfo, setShowGridInfo] = useState(false);
  const [showMenubar /*setShowMenubar*/] = useState(true);

  // Internal state management
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [selectedInstance, setSelectedInstance] = useState<ComponentInstance | null>(null);
  const [componentInstances, setComponentInstances] = useState<ComponentInstance[]>([]);
  const [pageAttributes, setPageAttributes] = useState({
    margin: "0",
    padding: "20px",
    background: "#ffffff",
    gap: "16px",
  });

  //const resizeHandleRef = useRef<HTMLDivElement>(null);
  const nextComponentId = useRef(1);
  const isMobile = useMobile();

  // Update currentMode when pageMode prop changes
  useEffect(() => {
    setCurrentMode(pageMode);
  }, [pageMode]);

  const handleLoadLayout = useCallback(async (pageid: string): Promise<any> => {
    const pageProps = (await onLoadLayout(pageid)) || getDefaultPageProps();
    setPageProps(pageProps);
    setTitle(pageProps.title);
    setPageTitle(pageProps.title);
    return pageProps.grids;
  }, [onLoadLayout]);

  const handleReload = useCallback(async () => {
    if (pageid) {      
      const gridOptions: any = await handleLoadLayout(pageid);
      setInitialOptions(gridOptions);
      // Force remount
      setResetKey((prev) => prev + 1);
      clearSelectedData();
      console.log(`reload layout: pageid ${pageid}, props id ${pageProps?.id}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageid, handleLoadLayout]);

  // Load layout when component mounts or pageid changes
  useEffect(() => {
    const loadLayout = async () => {
      if (pageid) {
        try {
          await handleReload();
        } catch (error) {
          console.error("Failed to load layout:", error);
        }
      }
    };
    loadLayout()
  }, [pageid, handleReload]);

  const handleGoBack = () => {
    if (gobackList) {
      gobackList();
    }
  };

  // Default handlers
  const handleSave = async () => {
    if (onSaveLayout) {
      const layout = stackActionsRef.current?.saveLayout();
      if (layout) {
        const savedPageProps: PageProps = {
          ...(pageProps || getDefaultPageProps()) ,
          grids: layout,
          title: pageTitle as any
        }
        console.log(`Saving layout: pageid ${pageid}, props id ${savedPageProps.id}`);
        await onSaveLayout(pageid, savedPageProps);
      }
    }
  };

  const clearSelectedData = () => {
    setSelectedComponent(null);
    setSelectedInstance(null);
  };

  const handleClear = () => {
    if (
      confirm("Are you sure you want to clear all data? This cannot be undone.")
    ) {
      setInitialOptions(gridOptions);
      // Force remount
      setResetKey((prev) => prev + 1);

      clearSelectedData();
    }
  };

  const handleTitleEdit = () => {
    setIsEditingTitle(true);
  };

  const handleTitleSave = () => {
    setIsEditingTitle(false);    
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleTitleSave();
    } else if (e.key === "Escape") {
      setPageTitle(title);
      setIsEditingTitle(false);
    }
  };

  const handleDragStart = (e: React.DragEvent, componentType: string) => {
    e.dataTransfer.setData("text/plain", componentType);
    e.dataTransfer.effectAllowed = "copy";
  };

  // const handleDragOver = (e: React.DragEvent) => {
  //   //e.preventDefault();
  //   e.dataTransfer.dropEffect = "copy"; // allow ghost image to keep following
  // };

  const handleDropEvent = (event: GridStackDropEvent) => {
    setDropEvent(event);
  };

  // Internal function to handle adding components to layout
  const addComponentToLayout = (
    componentType: string,
    position: { x: number; y: number }
  ) => {
    const componentId = `comp-${nextComponentId.current++}`;
    const defaultProps = getComponentProps(componentPropsProvider)[
      componentType
    ]; // enhancedComponentPropsProvider(componentType);

    const newInstance: ComponentInstance = {
      id: componentId,
      type: componentType,
      props: { ...defaultProps },
      position,
    };

    setComponentInstances((prev) => [...prev, newInstance]);
    setSelectedInstance(newInstance);
    setSelectedComponent(componentType);
    setActiveTab("properties"); // Switch to properties tab when component is added
  };

  // Update component properties
  const updateComponentProps = (
    componentId: string,
    updatedProps: Record<string, any>
  ) => {
    setComponentInstances((prev) =>
      prev.map((instance) =>
        instance.id === componentId
          ? { ...instance, props: { ...instance.props, ...updatedProps } }
          : instance
      )
    );

    // Update selected instance if it's the one being edited
    if (selectedInstance && selectedInstance.id === componentId) {
      setSelectedInstance((prev) =>
        prev ? { ...prev, props: { ...prev.props, ...updatedProps } } : null
      );
    }
  };

  // Remove component
  const removeComponent = (componentId: string) => {
    setComponentInstances((prev) =>
      prev.filter((instance) => instance.id !== componentId)
    );
    if (selectedInstance && selectedInstance.id === componentId) {
      setSelectedInstance(null);
      setSelectedComponent(null);
    }
  };

  // Get components and props from enhanced providers
  const componentMap = getComponentMap(componentMapProvider);

  // Handle component property changes from properties tab
  const handlePropertyChange = (property: string, value: any) => {
    if (selectedInstance) {
      updateComponentProps(selectedInstance.id, { [property]: value });
    }
  };

  // Handle page attribute changes
  const handlePageAttributeChange = (attribute: string, value: string) => {
    const newAttributes = {
      ...pageAttributes,
      [attribute]: value,
    };
    setPageAttributes(newAttributes);
  };

  // Context value
  const contextValue: StackPageContextType = {
    selectedComponent,
    setSelectedComponent,
    selectedInstance,
    setSelectedInstance,
    componentInstances,
    setComponentInstances,
    pageAttributes,
    setPageAttributes,
    addComponentToLayout,
    updateComponentProps,
    removeComponent,
  };

  // Panel styles for different screen sizes
  const panelStyle = isMobile
    ? { width: "100vw", minWidth: "100vw", height: "100vh" }
    : { width: `${panelWidth}px`, minWidth: "300px", height: "100%" };

  // Main content style
  const mainContentStyle = {
    margin: pageAttributes.margin,
    padding: pageAttributes.padding,
    backgroundColor: pageAttributes.background,
    gap: pageAttributes.gap,
  };

  const getPageInfo = () => {
    const pageInfo: PageProps = JSON.parse(JSON.stringify(pageProps));
    pageInfo.grids = stackActionsRef.current?.saveLayout();
    return pageInfo;
  };

  useEffect(() => {
    if (dropEvent && stackActionsRef.current) {
      if (dropEvent.name !== "SubGrid") {
        stackActionsRef.current.addWidget((_id) => ({
          ...dropEvent,
          sizeToContent: true, // Ensure the widget is sized to its content
          content: JSON.stringify({
            name: dropEvent.name,
            props: getComponentProps(componentPropsProvider)[dropEvent.name],
          }),
        }));
      } else {
        stackActionsRef.current.addSubGrid((_id /*, withWidget: any*/) => ({
          ...dropEvent,
          ...subGridOptions,
        }));
      }
    }
  }, [dropEvent, componentPropsProvider]);

  // Render Components Tab
  // const renderComponentsTab = () => {
  //   return (
  //     <div className="p-4 space-y-4">
  //       <h3 className="text-lg font-medium mb-3">Components</h3>
  //       <p className="text-sm text-gray-600 mb-4">
  //         Drag components to the main area or click to select them
  //       </p>
  //       <div
  //         key="SubGrid"
  //         gs-type="SubGrid"
  //         data-gs-type="SubGrid"
  //         className="grid-stack-item grid-stack-item-widget"
  //         draggable="true"
  //         onDragStart={(e) => handleDragStart(e, "SubGrid")}
  //         onDragEnd={() => console.log("====SubGrid drag event end....")}
  //         onClick={() => {
  //           setSelectedComponent("SubGrid");
  //           setSelectedInstance(null);
  //         }}
  //       >
  //         {/* More prominent styling for SubGrid */}
  //         <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-dashed border-blue-300 text-sm hover:from-blue-100 hover:to-indigo-100 cursor-pointer transition-all duration-200 hover:shadow-lg text-center group">
  //           <div className="font-semibold text-blue-700 mb-2 flex items-center justify-center">
  //             <svg
  //               className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform"
  //               fill="none"
  //               stroke="currentColor"
  //               viewBox="0 0 24 24"
  //             >
  //               <path
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //                 strokeWidth={2}
  //                 d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"
  //               />
  //               <path
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //                 strokeWidth={2}
  //                 d="M9 3v18M3 9h18"
  //               />
  //             </svg>
  //             SubGrid
  //           </div>
  //           <div className="text-xs text-blue-600 font-medium">
  //             Nested Grid Container
  //           </div>
  //           <div className="text-xs text-blue-500 mt-1">
  //             Drag to create nested layout
  //           </div>
  //         </div>
  //       </div>
  //       <div className="grid grid-cols-2 gap-3">
  //         {Object.entries(componentMap).map(([name /*Component*/]) => (
  //           <div
  //             key={name}
  //             gs-type={name}
  //             data-gs-type={name}
  //             className="grid-stack-item grid-stack-item-widget"
  //             draggable="true"
  //             onDragStart={(e) => handleDragStart(e, name)}
  //             onDragEnd={() => console.log("====drag event end....")} // onDragOver={handleDragOver}
  //             onClick={() => {
  //               setSelectedComponent(name);
  //               setSelectedInstance(null);
  //             }}
  //           >
  //             {/* Wrap the content in a separate div for styling */}
  //             <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm hover:bg-gray-100 cursor-pointer transition-all duration-200 hover:shadow-md text-center">
  //               <div className="font-medium text-gray-800 mb-2">{name}</div>
  //               <div className="text-xs text-gray-500">Drag to main area</div>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //       {componentInstances.length > 0 && (
  //         <div className="mt-6 pt-4 border-t">
  //           <h4 className="font-medium mb-3">
  //             Placed Components ({componentInstances.length})
  //           </h4>
  //           <div className="space-y-2 max-h-40 overflow-y-auto">
  //             {componentInstances.map((instance) => (
  //               <div
  //                 key={instance.id}
  //                 className={`flex justify-between items-center p-2 rounded text-sm ${
  //                   selectedInstance?.id === instance.id
  //                     ? "bg-blue-100 border border-blue-300"
  //                     : "bg-gray-100"
  //                 }`}
  //                 onClick={() => {
  //                   setSelectedInstance(instance);
  //                   setSelectedComponent(instance.type);
  //                   setActiveTab("properties");
  //                 }}
  //               >
  //                 <span className="truncate">{instance.type}</span>
  //                 <button
  //                   onClick={(e) => {
  //                     e.stopPropagation();
  //                     removeComponent(instance.id);
  //                   }}
  //                   className="text-red-600 hover:text-red-800 text-xs px-2 py-1 rounded"
  //                 >
  //                   Remove
  //                 </button>
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   );
  // };

// Then in the renderComponentsTab function, add the DeleteDropZone at the top:
const renderComponentsTab = () => {
  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-medium mb-3">Components</h3>
      <p className="text-sm text-gray-600 mb-4">
        Drag components to the main area or click to select them
      </p>
      
      {/* Delete Drop Zone - Add this section */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Delete Zone</h4>
        <DeleteDropZone 
          onDropDelete={() => {
            console.log("Component deleted via drop zone");
            // Clear selection after deletion
            setSelectedComponent(null);
            setSelectedInstance(null);
          }} 
        />
        <p className="text-xs text-gray-500 mt-2 text-center">
          Drag components here to delete them
        </p>
      </div>

      {/* Rest of the existing components tab content */}
      <div
        key="SubGrid"
        gs-type="SubGrid"
        data-gs-type="SubGrid"
        className="grid-stack-item grid-stack-item-widget"
        draggable="true"
        onDragStart={(e) => handleDragStart(e, "SubGrid")}
        onDragEnd={() => console.log("====SubGrid drag event end....")}
        onClick={() => {
          setSelectedComponent("SubGrid");
          setSelectedInstance(null);
        }}
      >
        {/* More prominent styling for SubGrid */}
        <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-dashed border-blue-300 text-sm hover:from-blue-100 hover:to-indigo-100 cursor-pointer transition-all duration-200 hover:shadow-lg text-center group">
          <div className="font-semibold text-blue-700 mb-2 flex items-center justify-center">
            <svg
              className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 3v18M3 9h18"
              />
            </svg>
            SubGrid
          </div>
          <div className="text-xs text-blue-600 font-medium">
            Nested Grid Container
          </div>
          <div className="text-xs text-blue-500 mt-1">
            Drag to create nested layout
          </div>
        </div>
      </div>
      
      {/* Rest of the component grid */}
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(componentMap).map(([name /*Component*/]) => (
          <div
            key={name}
            gs-type={name}
            data-gs-type={name}
            className="grid-stack-item grid-stack-item-widget"
            draggable="true"
            onDragStart={(e) => handleDragStart(e, name)}
            onDragEnd={() => console.log("====drag event end....")}
            onClick={() => {
              setSelectedComponent(name);
              setSelectedInstance(null);
            }}
          >
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm hover:bg-gray-100 cursor-pointer transition-all duration-200 hover:shadow-md text-center">
              <div className="font-medium text-gray-800 mb-2">{name}</div>
              <div className="text-xs text-gray-500">Drag to main area</div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Rest of the existing component instances list */}
      {componentInstances.length > 0 && (
        <div className="mt-6 pt-4 border-t">
          <h4 className="font-medium mb-3">
            Placed Components ({componentInstances.length})
          </h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {componentInstances.map((instance) => (
              <div
                key={instance.id}
                className={`flex justify-between items-center p-2 rounded text-sm ${
                  selectedInstance?.id === instance.id
                    ? "bg-blue-100 border border-blue-300"
                    : "bg-gray-100"
                }`}
                onClick={() => {
                  setSelectedInstance(instance);
                  setSelectedComponent(instance.type);
                  setActiveTab("properties");
                }}
                draggable="true"
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", instance.id);
                  e.dataTransfer.effectAllowed = "move";
                }}
              >
                <span className="truncate">{instance.type}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeComponent(instance.id);
                  }}
                  className="text-red-600 hover:text-red-800 text-xs px-2 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

  // Render Properties Tab
  const renderPropertiesTab = () => {
    if (!selectedInstance && !selectedComponent) {
      return (
        <div className="p-4 text-center text-gray-500">
          <div className="mb-2">👈</div>
          <p>
            Select a component from the Components tab or click on a placed
            component to edit its properties
          </p>
        </div>
      );
    }

    const componentType = selectedInstance?.type || selectedComponent;
    const currentProps =
      selectedInstance?.props ||
      getComponentProps(componentPropsProvider)[componentType || ""];

    return (
      <div className="p-4 space-y-4">
        <h3 className="text-lg font-medium mb-3">
          Properties - {componentType}
          {selectedInstance && (
            <span className="text-sm text-gray-500 ml-2">
              (ID: {selectedInstance.id})
            </span>
          )}
        </h3>

        <div className="space-y-4">
          {Object.entries(currentProps).map(([key, value]) => (
            <div
              key={key}
              className="border-b border-gray-100 pb-3 last:border-b-0"
            >
              <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </label>
              {typeof value === "boolean" ? (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={value as boolean}
                    onChange={(e) =>
                      handlePropertyChange(key, e.target.checked)
                    }
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Enabled</span>
                </div>
              ) : typeof value === "number" ? (
                <input
                  type="number"
                  value={value as number}
                  onChange={(e) =>
                    handlePropertyChange(key, Number(e.target.value))
                  }
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <input
                  type="text"
                  value={value as string}
                  onChange={(e) => handlePropertyChange(key, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={`Enter ${key}`}
                />
              )}
            </div>
          ))}
        </div>

        {selectedInstance && (
          <div className="mt-6 pt-4 border-t">
            <button
              onClick={() => removeComponent(selectedInstance.id)}
              className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors font-medium"
            >
              Remove This Component
            </button>
          </div>
        )}
      </div>
    );
  };

  // Render Page Tab
  const renderPageTab = () => {
    return (
      <div className="p-4 space-y-4">
        <h3 className="text-lg font-medium mb-3">Page Settings</h3>
        <p className="text-sm text-gray-600 mb-4">
          Configure the overall page layout and appearance
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Margin
            </label>
            <input
              type="text"
              value={pageAttributes.margin}
              onChange={(e) =>
                handlePageAttributeChange("margin", e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 0, 10px, 1rem"
            />
            <p className="text-xs text-gray-500 mt-1">
              Space around the entire page content
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Padding
            </label>
            <input
              type="text"
              value={pageAttributes.padding}
              onChange={(e) =>
                handlePageAttributeChange("padding", e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 20px, 2rem"
            />
            <p className="text-xs text-gray-500 mt-1">
              Space inside the page container
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Background Color
            </label>
            <div className="flex gap-3 items-center">
              <input
                type="color"
                value={pageAttributes.background}
                onChange={(e) =>
                  handlePageAttributeChange("background", e.target.value)
                }
                className="w-12 h-12 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={pageAttributes.background}
                onChange={(e) =>
                  handlePageAttributeChange("background", e.target.value)
                }
                className="flex-1 p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="#ffffff, rgb(255,255,255), etc."
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Background color for the main content area
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Component Gap
            </label>
            <input
              type="text"
              value={pageAttributes.gap}
              onChange={(e) => handlePageAttributeChange("gap", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 16px, 1rem"
            />
            <p className="text-xs text-gray-500 mt-1">
              Space between components in the main area
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">
            Current Page Settings
          </h4>
          <div className="text-sm text-blue-700 grid grid-cols-2 gap-2">
            <div>
              Margin: <code>{pageAttributes.margin}</code>
            </div>
            <div>
              Padding: <code>{pageAttributes.padding}</code>
            </div>
            <div>
              Background: <code>{pageAttributes.background}</code>
            </div>
            <div>
              Gap: <code>{pageAttributes.gap}</code>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <GridStackProvider key={resetKey} initialOptions={initialOptions}>
      <StackPageContext.Provider value={contextValue}>
        <div className="min-h-screen bg-white text-black flex flex-col">

          {/* Toolbar - Only show in edit mode */}
          {currentMode === "edit" && (
            <header className="p-4 bg-white shadow relative">
              <div className="flex flex-col sm:flex-row sm:items-center">
                {/* Title and Description - Left side */}
                <div className="flex-1 mb-3 sm:mb-0 min-w-0">
                  <div className="flex items-center gap-2">
                    {isEditingTitle ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={pageTitle}
                          onChange={(e) => setPageTitle(e.target.value)}
                          onKeyDown={handleTitleKeyDown}
                          onBlur={handleTitleSave}
                          className="text-2xl font-bold border-b-2 border-blue-500 bg-transparent outline-none px-1"
                          autoFocus
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 group">
                        <h1 className="text-2xl font-bold truncate">
                          {pageTitle}
                        </h1>
                        <button
                          onClick={handleTitleEdit}
                          className="p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>

                </div>

                {/* Button Group - Right side */}
                <div className="flex flex-wrap gap-1 justify-end">
                  {/* Back to List */}
                  <TooltipButton
                    onClick={handleGoBack}
                    icon={<ArrowLeftIcon className="h-5 w-5" />}
                    tooltip="Back to list"
                    className="bg-gray-200 hover:bg-gray-300"
                  />

                  {/* Preview */}
                  <TooltipButton
                    onClick={() => setCurrentMode("preview")}
                    icon={<EyeIcon className="h-5 w-5" />}
                    tooltip="Preview"
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  />

                  {/* Save */}
                  <StatusButton
                    onClick={handleSave}
                    icon={<CloudArrowDownIcon className="h-5 w-5" />}
                    label="Save"
                    className="bg-green-600 hover:bg-green-700 text-white"
                    successMessage="Saved successfully!"
                    errorMessage="Save failed"
                  />

                  {/* Reload */}
                  <StatusButton
                    onClick={handleReload}
                    icon={<ArrowPathIcon className="h-5 w-5" />}
                    label="Reload"
                    className="bg-green-600 hover:bg-green-700 text-white"
                    successMessage="Reloaded successfully"
                    errorMessage="Failed to reload"
                  />

                  {/* Clear */}
                  <TooltipButton
                    onClick={handleClear}
                    icon={<TrashIcon className="h-5 w-5" />}
                    tooltip="Clear all data"
                    className="bg-red-600 hover:bg-red-700 text-white"
                  />

                  {/* Page Info */}
                  <TooltipButton
                    onClick={() => setShowGridInfo(true)}
                    icon={<InformationCircleIcon className="h-5 w-5" />}
                    tooltip="Page Info & Settings"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  />

                  {/* Toggle Editor - Hide on mobile when panel is open */}
                  {!isMobile && (
                    <TooltipButton
                      onClick={() => setShowEditor(!showEditor)}
                      icon={
                        showEditor ? (
                          <ChevronRightIcon className="h-5 w-5" />
                        ) : (
                          <ChevronLeftIcon className="h-5 w-5" />
                        )
                      }
                      tooltip={showEditor ? "Hide Editor" : "Show Editor"}
                      className="bg-gray-200 hover:bg-gray-300"
                    />
                  )}
                </div>
              </div>
            </header>
          )}

          {/* Main Content Area */}
          <div className="flex flex-1 overflow-hidden relative">

            {/* Main Content */}
            <div
              className={`flex-1 transition-all duration-200 ${
                showEditor && currentMode === "edit"
                  ? "overflow-auto"
                  : "overflow-hidden"
              }`}
              style={mainContentStyle}
            >
              <div className="h-full">
                <div className="bg-white rounded-lg shadow h-full flex flex-col">
                  <div
                    className={`flex-1 relative p-0 grid-stack-mode-${currentMode}`}
                  >
                    {/* Render existing component instances */}
                    <StackActions ref={stackActionsRef} />
                    <GridStackRenderProvider
                      onGridStackDropEvent={handleDropEvent}
                    >
                      <GridStackRender
                        componentMap={getComponentMap(componentMapProvider)}
                        showMenubar={showMenubar}
                      />
                    </GridStackRenderProvider>

                    {/* Custom children content */}
                    {children}

                  </div>
                </div>
              </div>
            </div>            
            {/* Main Content End*/}

            {/* Editor Panel - Only show in edit mode when enabled */}
            {currentMode === "edit" && showEditor && (
              <>
                {/* Mobile Overlay */}
                {isMobile && (
                  <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setShowEditor(false)}
                  />
                )}

                {/* Panel */}
                <div
                  className={`flex flex-col bg-white shadow-lg border-l border-gray-200 ${
                    isMobile
                      ? "fixed right-0 top-0 bottom-0 z-50 transform transition-transform duration-300"
                      : "relative"
                  }`}
                  style={panelStyle}
                >
                  {/* Close button for mobile */}
                  {isMobile && (
                    <div className="absolute top-4 right-4 z-10">
                      <button
                        onClick={() => setShowEditor(false)}
                        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                      >
                        <ChevronRightIcon className="h-5 w-5" />
                      </button>
                    </div>
                  )}

                  {/* Tab Header */}
                  <div className="flex border-b border-gray-200 pt-4">
                    {(["components", "properties", "page"] as const).map(
                      (tab) => (
                        <button
                          key={tab}
                          className={`flex-1 py-3 px-4 text-sm font-medium capitalize transition-colors ${
                            activeTab === tab
                              ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                              : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                          }`}
                          onClick={() => setActiveTab(tab)}
                        >
                          {tab}
                        </button>
                      )
                    )}
                  </div>

                  {/* Tab Content */}
                  <div className="flex-1 overflow-y-auto pb-4">
                    {activeTab === "components" && renderComponentsTab()}
                    {activeTab === "properties" && renderPropertiesTab()}
                    {activeTab === "page" && renderPageTab()}
                  </div>
                </div>
              </>
            )}
          </div>
          {/* Main Content Area End*/}

          {/* Mobile toggle button */}
          {currentMode === "edit" && isMobile && !showEditor && (
            <div className="fixed bottom-4 right-4 z-30">
              <button
                onClick={() => setShowEditor(true)}
                className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
            </div>
          )}

          {/* Floating Return Button - Show immediately in preview mode */}
          {currentMode === "preview" && (
            <div className="fixed inset-0 pointer-events-none z-50">
              <div className="absolute bottom-8 right-8 pointer-events-auto">
                <button
                  onClick={() => setCurrentMode("edit")}
                  className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 group"
                  title="Return to Edit Mode"
                >
                  <ArrowLeftCircleIcon className="h-6 w-6 group-hover:animate-bounce" />
                  <span className="text-sm font-medium">Edit Mode</span>
                </button>
              </div>
            </div>
          )}

          {/* Floating Return Button - For view mode (external) */}
          {currentMode === "view" && (
            <div className="fixed inset-0 pointer-events-none z-50">
              <div className="absolute bottom-8 right-8 pointer-events-auto">
                <button
                  onClick={gobackList}
                  className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 group"
                  title="Back to List"
                >
                  <ArrowLeftCircleIcon className="h-6 w-6 group-hover:animate-bounce" />
                  <span className="text-sm font-medium">Back to List</span>
                </button>
              </div>
            </div>
          )}

          {/* show page info */}
          <PageInfoDialogs
            isOpen={showGridInfo}
            pageInfo={getPageInfo()}
            resetOpenInfo={setShowGridInfo}
          />
        </div>
      </StackPageContext.Provider>
    </GridStackProvider>
  );
};

export default StackPage;
