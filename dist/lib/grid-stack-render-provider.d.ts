import { PropsWithChildren } from 'react';
export interface GridStackDropEvent {
    name: string;
    id: string;
    x: number;
    y: number;
    w: number;
    h: number;
    gridId?: string;
}
export type GridStackDropEventCallback = (event: GridStackDropEvent) => void;
export declare function GridStackRenderProvider({ children, onGridStackDropEvent, }: PropsWithChildren<{
    onGridStackDropEvent?: GridStackDropEventCallback;
}>): import("react/jsx-runtime").JSX.Element;
