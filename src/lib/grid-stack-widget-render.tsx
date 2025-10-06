import { createPortal } from "react-dom";
import { GridStackWidget } from "gridstack";
import { ComponentType } from "react";
import { GridStackWidgetContext } from "./grid-stack-widget-context";
import { GridStackItemMenu } from "./grid-stack-Item-menu";
import { GridStackAutoResizer } from "./grid-stack-autoresizer";

// Parse widget metadata into usable component info
function parseWidgetMeta(meta: GridStackWidget): {
  name: string;
  props: object;
  error: unknown;
} {
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

export function GridStackWidgetRenderer({
  id,
  meta,
  WidgetComponent,
  widgetContainer,
  showMenubar,
}: {
  id: string;
  meta: GridStackWidget;
  WidgetComponent: ComponentType<any>;
  widgetContainer: HTMLElement;
  showMenubar?: boolean;
}) {
  const componentData = parseWidgetMeta(meta);
  const title =
    (componentData.props as any)?.title || `Widget ${id.slice(0, 4)}`;

  const content = (
    <GridStackAutoResizer widgetId={id}>
      {showMenubar && (
        <div className="widget-header flex items-center justify-between bg-gray-100 border-b px-2 min-h-[36px]">
          <div className="font-medium truncate text-sm px-1">{title}</div>
          <GridStackItemMenu widgetId={id} />
        </div>
      )}
      <div className="widget-body flex-1 min-h-[40px]">
        <WidgetComponent {...componentData.props} />
      </div>
    </GridStackAutoResizer>
  );

  return (
    <GridStackWidgetContext.Provider value={{ widget: { id } }}>
      {createPortal(content, widgetContainer)}
    </GridStackWidgetContext.Provider>
  );
}
