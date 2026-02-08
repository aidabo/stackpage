import { useMemo } from "react";
import { createPortal } from "react-dom";
import { GridStackWidget } from "gridstack";
import { ComponentType } from "react";
import { GridStackWidgetContext } from "./grid-stack-widget-context";
import { GridStackItemMenu } from "./grid-stack-Item-menu";
import { GridStackAutoResizer } from "./grid-stack-autoresizer";
import { useDataBinding } from "../components/useDataBinding";
import { useWidgetProps } from "../components/StackPageWidgetProps";

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
  currentMode?: "edit" | "view" | "preview";
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
  currentMode,
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

  // Get access to widget props updater
  const { updateProps } = useWidgetProps(id);

  // Generic handler for widget changes
  // This allows widgets (like RichText) to update their own props directly
  const handleWidgetChange = (value: any) => {
    let updates = {};
    // Determine what to update based on the value or component conventions
    // For RichText (and most simple inputs), value is the new content string
    if (typeof value === 'string') {
        updates = { content: value };
    } 
    // If value is an object, we assume it's a partial prop update
    else if (typeof value === 'object' && value !== null) {
        updates = value;
    }

    // Merge with current rawProps to ensure we preserving existing metadata 
    // (like __bindings, __schema) that might not be in the transient store yet.
    updateProps({ ...rawProps, ...updates });
  };

  const content = (
    <GridStackAutoResizer widgetId={id}>
      <div
        className="relative h-full w-full"
        onClick={currentMode === "edit" ? handleWidgetClick : undefined}
      >
        {isSelected && currentMode === "edit" && (
          <div className="pointer-events-none absolute inset-0 ring-2 ring-blue-400" />
        )}
        {showMenubar && (
          <div className="widget-header flex items-center justify-between bg-gray-100 border-b px-2 min-h-[36px]">
            <div className="font-medium truncate text-sm px-1">{title}</div>
            <GridStackItemMenu widgetId={id} />
          </div>
        )}
        <div className="widget-body flex-1 min-h-[40px] cursor-pointer">
          <WidgetComponent 
            {...props} 
            // In edit mode, allow the widget to update its own props
            isEditing={currentMode === "edit"}
            onChange={currentMode === "edit" ? handleWidgetChange : undefined}
          />
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
