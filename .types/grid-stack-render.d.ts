import { ComponentType } from "react";
export type ComponentMap = Record<string, ComponentType<any>>;
export interface ComponentDataType<T = object> {
    name: string;
    props: T;
}
export declare function GridStackRender({ componentMap, showMenubar, }: {
    componentMap: ComponentMap;
    showMenubar?: boolean;
}): import("react/jsx-runtime").JSX.Element;
