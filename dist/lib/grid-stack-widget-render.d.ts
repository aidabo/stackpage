import { GridStackWidget } from 'gridstack';
import { ComponentType } from 'react';
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
}
export declare function GridStackWidgetRenderer({ id, meta, WidgetComponent, widgetContainer, showMenubar, isSelected, onWidgetSelect, }: GridStackWidgetRendererProps): import("react/jsx-runtime").JSX.Element;
export {};
