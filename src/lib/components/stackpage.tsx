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
  getDefaultPageProps,
  getComponentMap,
  getComponentProps,
  ComponentMapProvider,
  ComponentPropsProvider,
  GoBackListFn,
  LoadLayoutFn,
  SaveLayoutFn,
  FileUploadFn,
  GetTagsFn,
  ApiCallFn,
  CustomActionFn,
  GetSelectOptionsFn,
} from "./stackoptions";

import StackActions, { StackActionsRef } from "./stackactions";
import { GridStackDropEvent } from "../grid-stack-render-provider";
import PageInfoDialogs from "./pageinfodialog";
// Import the new context
import { StackPageProvider } from "./StackPageProvider";
import { useStackPage } from "./StackPageContext";
import { PropertiesTab } from "./PropertiesTab";
import { ComponentsTab } from "./ComponentsTab";
import { PageTab } from "./PageTab";
import { StatusButton } from "./StatusButton";
import { TooltipButton } from "./TooltipButton";
import { LocaleProvider } from "./LocaleContext.tsx";

import "../styles/index.css";

export interface StackPageProps {
  pageid: string;
  pageMode: "edit" | "preview" | "view";
  onLoadLayout: LoadLayoutFn;
  onSaveLayout: SaveLayoutFn;
  gobackList: GoBackListFn;
  componentMapProvider?: ComponentMapProvider;
  componentPropsProvider?: ComponentPropsProvider;
  onFileUpload?: FileUploadFn;
  onGetTags?: GetTagsFn;
  onApiCall?: ApiCallFn;
  onCustomAction?: CustomActionFn;
  onGetSelectOptions?: GetSelectOptionsFn;
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
  onGetTags,
  onApiCall,
  onCustomAction,
  onGetSelectOptions,
  children,
}: StackPageProps) => {
  const [currentMode, setCurrentMode] = useState<"edit" | "preview" | "view">(
    pageMode
  );
  const [showEditor, setShowEditor] = useState(true);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const {
    activeTab,
    setActiveTab,
    pageAttributes,
    setPageAttributes,
    setSelectedInstance,
    setSelectedComponent,
    widgetProps, // Add this to get widgetProps from context
  } = useStackPage();

  const [pageProps, setPageProps] = useState<PageProps>({
    ...getDefaultPageProps(),
    id: pageid,
  });
  const [title, setTitle] = useState<string>();
  const [pageTitle, setPageTitle] = useState<string>();

  const [resetKey, setResetKey] = useState(0);
  const [initialOptions, setInitialOptions] =
    useState<GridStackOptions>(gridOptions);
  const stackActionsRef = useRef<StackActionsRef>(null);

  const [dropEvent, setDropEvent] = useState<GridStackDropEvent>();
  const [showGridInfo, setShowGridInfo] = useState(false);

  const isMobile = useMobile();

  // Update currentMode when pageMode prop changes
  useEffect(() => {
    setCurrentMode(pageMode);
  }, [pageMode]);

  const handleLoadLayout = useCallback(
    async (pageid: string): Promise<any> => {
      const pageProps = (await onLoadLayout(pageid)) || getDefaultPageProps();
      setPageProps(pageProps);
      setTitle(pageProps.title);
      setPageTitle(pageProps.title);
      setPageAttributes(pageProps.pageAttributes || pageAttributes);
      return pageProps.grids;
    },
    [onLoadLayout]
  );

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

  // Default handlers
  const handleSave = async () => {
    if (onSaveLayout) {
      let layout = stackActionsRef.current?.saveLayout();
      console.log("****grid stack layout: ", layout);

      if (layout) {
        // Update the layout with the latest props from context
        layout = updateLayoutWithNewProps(layout, widgetProps);

        const savedPageProps: PageProps = {
          ...(pageProps || getDefaultPageProps()),
          grids: layout,
          title: pageTitle as any,
          tag: pageAttributes.tag,
          status: pageAttributes.status,
          pageAttributes: pageAttributes,
        };
        console.log(
          `Saving layout: pageid ${pageid}, props id ${savedPageProps.id}`
        );
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
    ? { width: "100vw", minWidth: "100vw", height: "100vh" }
    : { width: `400px`, minWidth: "300px", height: "100%" };

  // Main content style
  const mainContentStyle = {
    margin: pageAttributes.margin,
    padding: pageAttributes.padding,
    backgroundColor: pageAttributes.background,
  };

  return (
    <GridStackProvider key={resetKey} initialOptions={initialOptions}>
      <div className="min-h-screen bg-white text-black flex flex-col">
        {/* Toolbar - Only show in edit mode */}
        {currentMode === "edit" && (
          <header className="mx-2 p-4 bg-white shadow relative">
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
                      showMenubar={pageAttributes.showMenubar}
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
  <div style={{ display: activeTab === "components" ? "block" : "none" }}>
    <ComponentsTab
      componentMapProvider={componentMapProvider}
      onDragStart={handleDragStart}
    />
  </div>
  <div style={{ display: activeTab === "properties" ? "block" : "none" }}>
    <PropertiesTab
      onFileUpload={onFileUpload}
      onApiCall={onApiCall}
      onCustomAction={onCustomAction}
      onGetSelectOptions={onGetSelectOptions}
    />
  </div>
  <div style={{ display: activeTab === "page" ? "block" : "none" }}>
    <PageTab
      onFileUpload={onFileUpload}
      onGetTags={onGetTags}
    />
  </div>
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
    </GridStackProvider>
  );
};

// Main exported component with StackPageProvider
const StackPage = (props: StackPageProps) => {
  return (
    <LocaleProvider defaultLocale="ja-JP">
      <StackPageProvider>
        <StackPageContent {...props} />
      </StackPageProvider>
    </LocaleProvider>
  );
};

export default StackPage;
