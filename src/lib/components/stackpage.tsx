import { useState, useRef, useEffect, ReactNode, useCallback } from "react";
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
  CubeIcon,
  CogIcon,
  DocumentTextIcon,
  ListBulletIcon,
  CircleStackIcon,
} from "@heroicons/react/24/outline";

import {
  GridStackProvider,
  GridStackRender,
  GridStackRenderProvider,
} from "..";
import { GridStackOptions, GridStackWidget } from "gridstack";
import {
  gridOptions,
  subGridOptions,
  PageProps,
  getComponentMap,
  getComponentProps,
  ComponentMapProvider,
  ComponentPropsProvider,
  GoBackListFn,
  LoadLayoutFn,
  SaveLayoutFn,
  FileUploadFn,
  ApiCallFn,
  CustomActionFn,
  GetSelectOptionsFn,
} from "./stackoptions";

import StackActions, { StackActionsRef } from "./stackactions";
import { GridStackDropEvent } from "../grid-stack-render-provider";
import PageInfoDialogs from "./pageinfodialog";
import { StackPageProvider } from "./StackPageProvider";
import { useStackPage } from "./StackPageContext";
import { PropertiesTab } from "./PropertiesTab";
import { ComponentsTab } from "./ComponentsTab";
import { PageTab } from "./PageTab";
import { ListTab } from "./ListTab";
import { DataSourceTab } from "./DataSourceTab";
import { StatusButton } from "./StatusButton";
import { TooltipButton } from "./TooltipButton";

import "../styles/index.css";

export interface StackPageOptions {
  options: any; // Define any specific options for the StackPage here
}

export interface StackPageProps {
  pageid: string;
  pageMode: "edit" | "preview" | "view";
  onLoadLayout: LoadLayoutFn;
  onSaveLayout?: SaveLayoutFn;
  gobackList?: GoBackListFn;
  componentMapProvider?: ComponentMapProvider;
  componentPropsProvider?: ComponentPropsProvider;
  onFileUpload?: FileUploadFn;
  onApiCall?: ApiCallFn;
  onCustomAction?: CustomActionFn;
  onGetSelectOptions?: GetSelectOptionsFn;
  options?: StackPageOptions;
  children?: ReactNode;
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

// Helper function to get icons for tabs
const getTabIcon = (tab: string) => {
  const iconClass = "w-5 h-5";
  switch (tab) {
    case "components":
      return <CubeIcon className={iconClass} />;
    case "properties":
      return <CogIcon className={iconClass} />;
    case "page":
      return <DocumentTextIcon className={iconClass} />;
    case "list":
      return <ListBulletIcon className={iconClass} />;
    case "datasource":
      return <CircleStackIcon className={iconClass} />;
    default:
      return <CubeIcon className={iconClass} />;
  }
};

// Main StackPage Content Component
const StackPageContent = ({
  pageid,
  pageMode,
  onSaveLayout,
  onLoadLayout,
  componentMapProvider,
  componentPropsProvider,
  gobackList,
  onFileUpload,
  onApiCall,
  onCustomAction,
  onGetSelectOptions,
  children,
}: StackPageProps) => {
  const [currentMode, setCurrentMode] = useState<"edit" | "preview" | "view">(
    pageMode
  );
  const isMobile = useMobile();
  const [showEditor, setShowEditor] = useState<boolean>(!isMobile);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const initialLoadRef = useRef(true);

  const {
    activeTab,
    setActiveTab,
    attributes,
    setPageAttributes,
    source,
    setSource,
    setSelectedInstance,
    setSelectedComponent,
    widgetProps, // Add this to get widgetProps from context
  } = useStackPage();

  const [pageProps, setPageProps] = useState<PageProps>({
    id: pageid,
    type: "page",
    title: "untitled page",
    layout: gridOptions,
  });
  const [title, setTitle] = useState<string>();
  const [pageTitle, setPageTitle] = useState<string>();

  const [resetKey, setResetKey] = useState(0);
  const [initialOptions, setInitialOptions] =
    useState<GridStackOptions>(gridOptions);
  const stackActionsRef = useRef<StackActionsRef>(null);

  const [dropEvent, setDropEvent] = useState<GridStackDropEvent>();
  const [showGridInfo, setShowGridInfo] = useState(false);

  // Update currentMode when pageMode prop changes
  useEffect(() => {
    setCurrentMode(pageMode);
  }, [pageMode]);

  useEffect(() => {
    setTimeout(() => {
      if (initialLoadRef.current && isMobile) {
        initialLoadRef.current = false;
        // Only set on initial load, not on subsequent resizes
        setShowEditor(!isMobile);
      }
    }, 100);
  }, [isMobile]);

  // Handle mode changes and update showMenubar accordingly
  useEffect(() => {
    if (currentMode === "preview" || currentMode === "view") {
      // When switching to preview or view mode, hide menubar
      setPageAttributes((prev: any) => ({
        ...prev,
        showMenubar: false,
      }));
    } else if (currentMode === "edit") {
      // When switching back to edit mode, show menubar
      setPageAttributes((prev: any) => ({
        ...prev,
        showMenubar: true,
      }));
    }
  }, [currentMode, setPageAttributes]);

  const handleLoadLayout = useCallback(
    async (pageid: string): Promise<any> => {
      const pageProps = await onLoadLayout(pageid);
      setPageProps(pageProps);
      setTitle(pageProps.title);
      setPageTitle(pageProps.title);
      setPageAttributes(pageProps.attributes || attributes);

      if (pageProps.source) {
        setSource(pageProps.source);
      } else {
        setSource({
          lists: [],
          dataSources: [],
        });
      }
      return pageProps.layout;
    },
    [onLoadLayout]
  );

  const handleReload = useCallback(async () => {
    if (pageid) {
      setPageProps((prev) => ({ ...prev, id: pageid })); // Trigger re-render
      const gridOptions: any = await handleLoadLayout(pageid);
      setInitialOptions(gridOptions);
      // Force remount
      setResetKey((prev) => prev + 1);
      clearSelectedData();
      console.log(`Reload layout: pageid ${pageid}, props id ${pageProps?.id}`);
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
    loadLayout();
  }, [pageid, handleReload]);

  const handleGoBack = () => {
    if (gobackList) {
      gobackList();
    }
  };

  // Function to update layout with new props from context
  const updateLayoutWithNewProps = (
    layout: GridStackOptions | GridStackWidget[],
    widgetProps: Map<string, object>
  ): GridStackOptions | GridStackWidget[] => {
    if (!layout) return layout;

    // Handle both GridStackOptions (with children) and GridStackWidget[] array
    const children = Array.isArray(layout)
      ? layout
      : (layout as GridStackOptions).children;

    if (!children) return layout;

    const updatedChildren = children.map((child: GridStackWidget) => {
      // If this widget has updated props in context, update its content
      if (child.id && widgetProps.has(child.id)) {
        const updatedProps = widgetProps.get(child.id);

        try {
          // Parse the existing content to preserve the component name
          let contentObj = { name: "", props: {} };
          if (child.content) {
            contentObj = JSON.parse(child.content);
          }

          // Merge the updated props
          contentObj.props = { ...contentObj.props, ...updatedProps };

          // Update the content with new props
          return {
            ...child,
            content: JSON.stringify(contentObj),
          };
        } catch (error) {
          console.error(`Error updating props for widget ${child.id}:`, error);
          return child;
        }
      }

      return child;
    });

    // Return the updated layout with the same structure
    if (Array.isArray(layout)) {
      return updatedChildren;
    } else {
      return {
        ...layout,
        children: updatedChildren,
      };
    }
  };

  const getCurrentPageProps = () => {
    let layout = stackActionsRef.current?.saveLayout();
    if (layout) {
      // Update the layout with the latest props from context
      layout = updateLayoutWithNewProps(layout, widgetProps);
    }
    const currentPageProps: PageProps = {
      ...pageProps,
      id: pageid,
      layout: layout,
      attributes: attributes,
      source: source,
      type: attributes.type,
      title: attributes.title,
      status: attributes.status,
      published_at: attributes.published_at,
    };
    return currentPageProps;
  };

  // Default handlers
  const handleSave = async () => {
    if (onSaveLayout) {
      const savedPageProps = getCurrentPageProps();
      await onSaveLayout(savedPageProps);
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

  const handleDropEvent = (event: GridStackDropEvent) => {
    setDropEvent(event);
  };

  // Add handler for widget selection from gridstack
  const handleWidgetSelect = useCallback(
    (widgetData: { id: string; name: string; props: object }) => {
      const instance = {
        id: widgetData.id,
        type: widgetData.name,
        props: widgetData.props,
      };

      setSelectedInstance(instance);
      setSelectedComponent(widgetData.name);
      setActiveTab("properties");
    },
    [setSelectedInstance, setSelectedComponent, setActiveTab]
  );

  useEffect(() => {
    if (dropEvent && stackActionsRef.current) {
      if (dropEvent.name !== "SubGrid") {
        stackActionsRef.current.addWidget((_id) => ({
          ...dropEvent,
          sizeToContent: true,
          content: JSON.stringify({
            name: dropEvent.name,
            props: getComponentProps(componentPropsProvider)[dropEvent.name],
          }),
        }));
      } else {
        stackActionsRef.current.addSubGrid((_id) => ({
          ...dropEvent,
          ...subGridOptions,
        }));
      }
    }
  }, [dropEvent, componentPropsProvider]);

  // Panel styles for different screen sizes
  const panelStyle = isMobile
    ? {
        width: "100vw",
        minWidth: "100vw",
        height: "calc(100% - var(--stackpage-top-spacing, 60px))",
        top: "var(--stackpage-top-spacing, 60px)",
        zIndex: 101 /** just greater than grid-stack */,
      }
    : {
        width: `500px`,
        minWidth: "300px",
        height: "calc(100% - var(--stackpage-top-spacing, 60px))",
        top: "var(--stackpage-top-spacing, 60px)",
      };

  // Main content style
  const mainContentStyle = {
    margin: attributes.margin,
    padding: attributes.padding,
    backgroundColor: attributes.background,
  };

  return (
    <GridStackProvider key={resetKey} initialOptions={initialOptions}>
      <div className="min-h-screen bg-white text-black flex flex-col">
        {/* Toolbar - Only show in edit mode */}
        {currentMode === "edit" && (
          <header className="mx-2 p-4 bg-white shadow relative">
            <div className="flex flex-col md:flex-row md:items-center text-lg">
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
                        maxLength={100}
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
                        className="p-1 text-gray-400 hover:text-gray-600 group-hover:opacity-100 transition-opacity"
                      >
                        <PencilIcon className="stack-btn-icon" />
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
                  icon={<ArrowLeftIcon className="stack-btn-icon" />}
                  tooltip="Back to list"
                  className="bg-gray-200 hover:bg-gray-300"
                />

                {/* Preview */}
                <TooltipButton
                  onClick={() => setCurrentMode("preview")}
                  icon={<EyeIcon className="stack-btn-icon" />}
                  tooltip="Preview"
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                />

                {/* Save */}
                <StatusButton
                  onClick={handleSave}
                  icon={<CloudArrowDownIcon className="stack-btn-icon" />}
                  label="Save"
                  className="bg-green-600 hover:bg-green-700 text-white"
                  successMessage="Saved successfully!"
                  errorMessage="Save failed"
                />

                {/* Reload */}
                <StatusButton
                  onClick={handleReload}
                  icon={<ArrowPathIcon className="stack-btn-icon" />}
                  label="Reload"
                  className="bg-green-600 hover:bg-green-700 text-white"
                  successMessage="Reloaded successfully"
                  errorMessage="Failed to reload"
                />

                {/* Clear */}
                <TooltipButton
                  onClick={handleClear}
                  icon={<TrashIcon className="stack-btn-icon" />}
                  tooltip="Clear all data"
                  className="bg-red-600 hover:bg-red-700 text-white"
                />

                {/* Page Info */}
                <TooltipButton
                  onClick={() => setShowGridInfo(true)}
                  icon={<InformationCircleIcon className="stack-btn-icon" />}
                  tooltip="Page Info & Settings"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                />

                {/* Toggle Editor - Hide on mobile when panel is open */}
                {!isMobile && (
                  <TooltipButton
                    onClick={() => setShowEditor(!showEditor)}
                    icon={
                      showEditor ? (
                        <ChevronRightIcon className="stack-btn-icon" />
                      ) : (
                        <ChevronLeftIcon className="stack-btn-icon" />
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
                      showMenubar={attributes.showMenubar}
                      onWidgetSelect={handleWidgetSelect}
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
                  className="relative inset-0 bg-black bg-opacity-50 z-40 stack-tab-panel-top-mobile"
                  onClick={() => setShowEditor(false)}
                />
              )}

              {/* Panel */}
              <div
                className={`flex flex-row bg-white shadow-lg border-l border-gray-200 ${
                  isMobile
                    ? "fixed right-0 bottom-0 transform transition-transform duration-300"
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
                      <ChevronRightIcon className="stack-btn-icon" />
                    </button>
                  </div>
                )}

                {/* Tab Content */}
                <div className="flex-1 overflow-y-auto pb-4">
                  <div
                    style={{
                      display: activeTab === "components" ? "block" : "none",
                    }}
                  >
                    <ComponentsTab
                      componentMapProvider={componentMapProvider}
                      onDragStart={handleDragStart}
                    />
                  </div>
                  <div
                    style={{
                      display: activeTab === "properties" ? "block" : "none",
                    }}
                  >
                    <PropertiesTab
                      onFileUpload={onFileUpload}
                      onApiCall={onApiCall}
                      onCustomAction={onCustomAction}
                      onGetSelectOptions={onGetSelectOptions}
                    />
                  </div>
                  <div
                    style={{ display: activeTab === "page" ? "block" : "none" }}
                  >
                    <PageTab onFileUpload={onFileUpload} />
                  </div>
                  <div
                    style={{ display: activeTab === "list" ? "block" : "none" }}
                  >
                    <ListTab />
                  </div>
                  <div
                    style={{
                      display: activeTab === "datasource" ? "block" : "none",
                    }}
                  >
                    <DataSourceTab />
                  </div>
                </div>

                {/* Vertical Tab Bar */}
                <div
                  className={`flex flex-col border-l border-gray-200 bg-gray-50 ${
                    isMobile ? "w-12" : "w-16 mx-[5px]" // Decreased width for mobile, keep margin for desktop
                  }`}
                >
                  {(
                    [
                      "components",
                      "properties",
                      "page",
                      "list",
                      "datasource",
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab}
                      className={`flex flex-col items-center justify-center py-4 px-2 text-xs font-medium transition-colors ${
                        activeTab === tab
                          ? "text-blue-600 bg-blue-50 border-r-2 border-blue-600"
                          : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveTab(tab)}
                      title={tab.charAt(0).toUpperCase() + tab.slice(1)}
                    >
                      {getTabIcon(tab)}
                      <span className="mt-1 capitalize">
                        {isMobile
                          ? // Shorter labels for mobile
                            tab === "components"
                            ? "comps"
                            : tab === "properties"
                            ? "props"
                            : tab === "datasource"
                            ? "data"
                            : tab
                          : // Full labels for desktop
                          tab === "datasource"
                          ? "data"
                          : tab}
                      </span>
                    </button>
                  ))}
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
              <ChevronLeftIcon className="stack-btn-icon" />
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
                <ArrowLeftCircleIcon className="stack-btn-icon group-hover:animate-bounce" />
                <span className="text-sm font-medium">Edit Mode</span>
              </button>
            </div>
          </div>
        )}

        {/* Floating Return Button - For view mode (external) */}
        {currentMode === "view" && gobackList && (
          <div className="fixed inset-0 pointer-events-none z-50">
            <div className="absolute bottom-8 right-8 pointer-events-auto">
              <button
                onClick={gobackList}
                className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 group"
                title="Back to List"
              >
                <ArrowLeftCircleIcon className="stack-btn-icon group-hover:animate-bounce" />
                <span className="text-sm font-medium">Back to List</span>
              </button>
            </div>
          </div>
        )}

        {/* show page info */}
        <PageInfoDialogs
          isOpen={showGridInfo}
          pageInfo={getCurrentPageProps}
          resetOpenInfo={setShowGridInfo}
        />
      </div>
    </GridStackProvider>
  );
};

// Main exported component with StackPageProvider
const StackPage = (props: StackPageProps) => {
  return (
    <StackPageProvider>
      <StackPageContent {...props} />
    </StackPageProvider>
  );
};

export default StackPage;
