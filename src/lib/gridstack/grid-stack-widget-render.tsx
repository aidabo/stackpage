import { useMemo } from "react";
import { createPortal } from "react-dom";
import { GridStackWidget } from "gridstack";
import { ComponentType } from "react";
import { GridStackWidgetContext } from "./grid-stack-widget-context";
import { GridStackItemMenu } from "./grid-stack-Item-menu";
import { GridStackAutoResizer } from "./grid-stack-autoresizer";
import { useDataBinding } from "../components/useDataBinding";

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

interface GridStackWidgetRendererProps {
  id: string;
  meta: GridStackWidget;
  WidgetComponent: ComponentType<any>;
  widgetContainer: HTMLElement;
  showMenubar?: boolean;
  isSelected?: boolean;
  onWidgetSelect?: (widgetData: {
    id: string;
    name: string;
    props: object;
  }) => void;
  componentProps?: any;
}

export function GridStackWidgetRenderer({
  id,
  meta,
  WidgetComponent,
  widgetContainer,
  showMenubar,
  isSelected = false,
  onWidgetSelect,
  componentProps,
}: GridStackWidgetRendererProps) {
  const componentData = useMemo(() => parseWidgetMeta(meta), [meta]);

  // Use the passed componentProps if available, otherwise use parsed props
  const rawProps = useMemo(() => {
    return componentProps || componentData.props;
  }, [componentProps, componentData.props]);

  // Resolve bindings
  const props = useDataBinding(rawProps);
  //const props = rawProps;

  console.log(
    `[GridStackWidgetRenderer] Rendering widget ${id} of type ${componentData.name}`,
    {
      props,
      hasBindings: props?.__bindings ? Object.keys(props.__bindings).length : 0,
    }
  );

  const title = (props as any)?.title || `Widget ${id.slice(0, 4)}`;

  const handleWidgetClick = (_e: React.MouseEvent) => {
    if (onWidgetSelect) {
      onWidgetSelect({
        id,
        name: componentData.name,
        props: props,
      });
    }
  };

  const content = (
    <GridStackAutoResizer widgetId={id}>
      <div
        className="relative h-full w-full"
        onClick={handleWidgetClick}
      >
        {isSelected && (
          <div className="pointer-events-none absolute inset-0 ring-2 ring-blue-400" />
        )}
        {showMenubar && (
          <div className="widget-header flex items-center justify-between bg-gray-100 border-b px-2 min-h-[36px]">
            <div className="font-medium truncate text-sm px-1">{title}</div>
            <GridStackItemMenu widgetId={id} />
          </div>
        )}
        <div className="widget-body flex-1 min-h-[40px] cursor-pointer">
          <WidgetComponent {...props} />
        </div>
      </div>
    </GridStackAutoResizer>
  );

  return (
    <GridStackWidgetContext.Provider value={{ widget: { id } }}>
      {createPortal(content, widgetContainer)}
    </GridStackWidgetContext.Provider>
  );
}
