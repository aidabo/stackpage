import { GridStackWidget } from "gridstack";
import { ComponentType } from "react";
export declare function GridStackWidgetRenderer({ id, meta, WidgetComponent, widgetContainer, showMenubar, }: {
    id: string;
    meta: GridStackWidget;
    WidgetComponent: ComponentType<any>;
    widgetContainer: HTMLElement;
    showMenubar?: boolean;
}): import("react/jsx-runtime").JSX.Element;
