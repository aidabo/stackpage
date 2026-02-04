import { useGridStackContext } from "./grid-stack-context";
import { useGridStackRenderContext } from "./grid-stack-render-context";
import { GridStackWidget } from "gridstack";
import { ComponentType } from "react";
import { GridStackWidgetRenderer } from "./grid-stack-widget-render";
import {
  useStackPageWidgetProps,
  useStackPage,
} from "@/lib/components/StackPageContext"; // Add this import

// Type for component registration
export type ComponentMap = Record<string, ComponentType<any>>;

// Widget content format
export interface ComponentDataType<T = object> {
  name: string;
  props: T;
}

function parseWidgetMeta(
  meta: GridStackWidget
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
      {/* Drop zone indicator when empty */}
      {Array.from(_rawWidgetMetaMap.value.entries()).length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 p-8 text-center">
          <div className="text-4xl mb-4">📦</div>
          <h3 className="text-lg font-medium mb-2">Drag Components Here</h3>
          <p className="text-sm">
            Drag components from the Components tab in the right panel to start
            building your layout
          </p>
        </div>
      )}

      {Array.from(_rawWidgetMetaMap.value.entries()).map(([id, meta]) => {
        const { name, props: metaProps } = parseWidgetMeta(meta);
        const WidgetComponent = componentMap[name];
        const widgetContainer = getWidgetContainer(id);

        // Use updated props from StackPageContext if available, otherwise use meta props
        const props = widgetProps.get(id) || metaProps;

        console.log(`[GridStackRenderer] Rendering widget ${id}`, props);

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
