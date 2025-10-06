import { PropsWithChildren } from "react";
export interface GridStackDropEvent {
    name: string;
    id: string;
    x: number;
    y: number;
    w: number;
    h: number;
}
export type GridStackDropEventCallback = (event: GridStackDropEvent) => void;
export declare function GridStackRenderProvider({ children, onGridStackDropEvent, }: PropsWithChildren<{
    onGridStackDropEvent?: GridStackDropEventCallback;
}>): import("react/jsx-runtime").JSX.Element;
