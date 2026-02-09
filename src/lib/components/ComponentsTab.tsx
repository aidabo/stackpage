import { useEffect, useMemo, useState } from "react";
import {
  getComponentMap,
  ComponentMapProvider,
  ComponentCatalogProvider,
} from "./stackoptions";
import { useStackPage } from "./StackPageContext";
import DeleteDropZone from "./Deletedropzone";
import { useExternalComponentDrag } from "./ExternalDragSourceContext";

interface ComponentsTabProps {
  componentMapProvider?: ComponentMapProvider;
  componentCatalogProvider?: ComponentCatalogProvider;
  onDragStart: (e: React.DragEvent, componentType: string) => void;
}

export const ComponentsTab = ({
  componentMapProvider,
  componentCatalogProvider,
  onDragStart,
}: ComponentsTabProps) => {
  const { setSelectedComponent, setSelectedInstance } = useStackPage();
  const componentMap = getComponentMap(componentMapProvider);
  const { registerDragSource } = useExternalComponentDrag();

  const [sectionTab, setSectionTab] = useState<"common" | "business">("common");
  const catalog = componentCatalogProvider?.();
  const componentNames = useMemo(
    () => Object.keys(componentMap).filter((name) => name !== "SubGrid"),
    [componentMap]
  );

  const businessGroups = useMemo(() => {
    const groups = catalog?.businesses || [];
    return groups
      .map((group) => ({
        ...group,
        components: group.components.filter((name) =>
          componentNames.includes(name)
        ),
      }))
      .filter((group) => group.components.length > 0);
  }, [catalog?.businesses, componentNames]);

  const [activeBusinessId, setActiveBusinessId] = useState<string>(
    businessGroups[0]?.id || ""
  );

  useEffect(() => {
    if (businessGroups.length === 0) {
      setActiveBusinessId("");
      return;
    }
    if (!businessGroups.some((group) => group.id === activeBusinessId)) {
      setActiveBusinessId(businessGroups[0]?.id || "");
    }
  }, [activeBusinessId, businessGroups]);

  useEffect(() => {
    if (sectionTab === "business" && businessGroups.length === 0) {
      setSectionTab("common");
    }
  }, [businessGroups.length, sectionTab]);

  const commonComponents = useMemo(() => {
    const declaredCommon = catalog?.common || [];
    const validDeclaredCommon = declaredCommon.filter((name) =>
      componentNames.includes(name)
    );

    if (validDeclaredCommon.length > 0) {
      return validDeclaredCommon;
    }

    const businessComponentSet = new Set(
      businessGroups.flatMap((group) => group.components)
    );
    const fallbackCommon = componentNames.filter(
      (name) => !businessComponentSet.has(name)
    );
    return fallbackCommon.length > 0 ? fallbackCommon : componentNames;
  }, [businessGroups, catalog?.common, componentNames]);

  const activeBusiness = businessGroups.find(
    (group) => group.id === activeBusinessId
  );

  const visibleComponents =
    sectionTab === "common"
      ? commonComponents
      : (activeBusiness?.components ?? []);

  const renderComponentTile = (name: string) => (
    <div
      ref={registerDragSource}
      key={name}
      gs-type={name}
      data-gs-type={name}
      className="grid-stack-item grid-stack-item-widget"
      draggable="true"
      onDragStart={(e) => onDragStart(e, name)}
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
  );

  return (
    <div className="h-full p-4 space-y-4 max-h-[calc(100vh-48*0.25rem)] bg-zinc-200 overflow-y-auto">
      <h3 className="text-lg font-medium mb-1">Components</h3>
      <p className="text-sm text-gray-600 mb-2">
        Drag components to the main area or click to select them
      </p>

      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={() => setSectionTab("common")}
          className={`px-3 py-1.5 text-sm rounded border transition-colors ${
            sectionTab === "common"
              ? "bg-white border-blue-300 text-blue-700"
              : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Common ({commonComponents.length + 1})
        </button>
        <button
          type="button"
          onClick={() => setSectionTab("business")}
          disabled={businessGroups.length === 0}
          className={`px-3 py-1.5 text-sm rounded border transition-colors ${
            sectionTab === "business"
              ? "bg-white border-blue-300 text-blue-700"
              : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Business (
          {businessGroups.reduce((count, group) => count + group.components.length, 0)}
          )
        </button>
      </div>

      {/* Delete Drop Zone */}
      <div className="mb-2">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Delete Zone</h4>
        <DeleteDropZone
          onDropDelete={() => {
            setSelectedComponent(null);
            setSelectedInstance(null);
          }}
        />
        <p className="text-xs text-gray-500 mt-2 text-center">
          Drag components here to delete them
        </p>
      </div>

      {sectionTab === "business" && businessGroups.length > 0 && (
        <div className="space-y-3">
          <div className="text-sm font-medium text-gray-700">Business Libraries</div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {businessGroups.map((group) => {
              const isActive = group.id === activeBusinessId;
              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => setActiveBusinessId(group.id)}
                  className={`min-w-[140px] text-left px-3 py-2 rounded-lg border transition-colors ${
                    isActive
                      ? "bg-white border-blue-300 text-blue-700"
                      : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <div className="text-sm font-semibold">{group.label}</div>
                  <div className="text-xs opacity-80">
                    {group.components.length} components
                  </div>
                  {group.description && (
                    <div className="text-[11px] opacity-70 line-clamp-2 mt-1">
                      {group.description}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {sectionTab === "common" && (
        <div
          ref={registerDragSource}
          key="SubGrid"
          gs-type="SubGrid"
          data-gs-type="SubGrid"
          className="grid-stack-item grid-stack-item-widget"
          draggable="true"
          onDragStart={(e) => onDragStart(e, "SubGrid")}
          onDragEnd={() => console.log("====SubGrid drag event end....")}
          onClick={() => {
            setSelectedComponent("SubGrid");
            setSelectedInstance(null);
          }}
        >
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
          </div>
        </div>
      )}

      {visibleComponents.length === 0 ? (
        <div className="p-6 rounded-lg border border-dashed border-gray-300 bg-white text-sm text-gray-500 text-center">
          No components configured in this section.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {visibleComponents.map((name) => renderComponentTile(name))}
        </div>
      )}
    </div>
  );
};
