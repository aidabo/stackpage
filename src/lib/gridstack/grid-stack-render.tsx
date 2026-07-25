import { useGridStackContext } from "./grid-stack-context";
import { useGridStackRenderContext } from "./grid-stack-render-context";
import { GridStackWidget } from "gridstack";
import { ComponentType } from "react";
import { GridStackWidgetRenderer } from "./grid-stack-widget-render";
import {
  useStackPageWidgetProps,
  useStackPage,
} from "@/lib/components/StackPageContext"; // Add this import
import { debugLog } from "../utils/debug";

// Type for component registration
export type ComponentMap = Record<string, ComponentType<any>>;

// Widget content format
export interface ComponentDataType<T = object> {
  name: string;
  props: T;
}

function parseWidgetMeta(
  meta: GridStackWidget,
): ComponentDataType & { error: unknown } {
  let error = null;
  let name = "";
  let props = {};

  try {
    if (meta.content) {
      const result = JSON.parse(meta.content) as {
        name: string;
        props: object;
      };
      name = result.name;
      props = result.props;
    }
  } catch (e) {
    error = e;
  }

  return { name, props, error };
}

interface GridStackRenderProps {
  componentMap: ComponentMap;
  showMenubar?: boolean;
  selectedWidgetId?: string | null;
  onWidgetSelect?: (widgetData: {
    id: string;
    name: string;
    props: object;
  }) => void;
  currentMode?: "edit" | "view" | "preview";
}

export function GridStackRender({
  componentMap,
  showMenubar = false,
  onWidgetSelect,
  currentMode,
}: GridStackRenderProps) {
  const { _rawWidgetMetaMap } = useGridStackContext();
  const { getWidgetContainer } = useGridStackRenderContext();
  const { widgetProps } = useStackPageWidgetProps(); // Get widget props from StackPageContext
  const { selectedInstance } = useStackPage();

  return (
    <>
      {/* Always-visible drag hint in edit mode — absolute background behind all widgets */}
      {currentMode === "edit" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0 bg-blue-50/30 rounded">
          <div className="text-6xl mb-4 opacity-30">📦</div>
          <h3 className="text-xl font-semibold mb-2 text-gray-500 opacity-30">
            Drag Components Here
          </h3>
          <p className="text-sm text-gray-400 opacity-50 text-center max-w-xs px-4">
            Drag components from the Components tab in the right panel to start
            building your layout
          </p>
        </div>
      )}

      {Array.from(_rawWidgetMetaMap.value.entries()).map(([id, meta]) => {
        const { name, props: metaProps } = parseWidgetMeta(meta);
        const WidgetComponent = componentMap[name];
        const widgetContainer = getWidgetContainer(id);

        if (widgetContainer) {
          widgetContainer.setAttribute(
            "data-component-name",
            name || "Unknown",
          );
        }

        // Use updated props from StackPageContext if available, otherwise use meta props
        // We merge them to ensure we don't lose static metadata (like bindings) if the store only has partial updates
        const props = { ...metaProps, ...(widgetProps.get(id) || {}) };

        debugLog(`[GridStackRenderer] Rendering widget ${id}`, props);

        if (!WidgetComponent || !widgetContainer) return null;

        return (
          <GridStackWidgetRenderer
            key={id}
            id={id}
            meta={meta}
            WidgetComponent={WidgetComponent}
            widgetContainer={widgetContainer}
            showMenubar={showMenubar}
            isSelected={id === (selectedInstance as any)?.id}
            onWidgetSelect={onWidgetSelect}
            componentProps={props} // Pass the resolved props
            currentMode={currentMode}
          />
        );
      })}
    </>
  );
}
