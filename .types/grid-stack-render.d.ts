import { ComponentType } from "react";
export type ComponentMap = Record<string, ComponentType<any>>;
export interface ComponentDataType<T = object> {
    name: string;
    props: T;
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
}
export declare function GridStackRender({ componentMap, showMenubar, selectedWidgetId, onWidgetSelect, }: GridStackRenderProps): import("react/jsx-runtime").JSX.Element;
export {};
