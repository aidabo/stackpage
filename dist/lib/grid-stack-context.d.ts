import { GridStack, GridStackOptions, GridStackWidget } from 'gridstack';
export declare const GridStackContext: import('react').Context<{
    initialOptions: GridStackOptions;
    gridStack: GridStack | null;
    addWidget: (fn: (id: string) => Omit<GridStackWidget, "id">) => void;
    removeWidget: (id: string) => void;
    addSubGrid: (fn: (id: string, withWidget: (w: Omit<GridStackWidget, "id">) => GridStackWidget) => Omit<GridStackWidget, "id">) => void;
    saveOptions: () => GridStackOptions | GridStackWidget[] | undefined;
    _gridStack: {
        value: GridStack | null;
        set: React.Dispatch<React.SetStateAction<GridStack | null>>;
    };
    _rawWidgetMetaMap: {
        value: Map<string, GridStackWidget>;
        set: React.Dispatch<React.SetStateAction<Map<string, GridStackWidget>>>;
    };
} | null>;
export declare function useGridStackContext(): {
    initialOptions: GridStackOptions;
    gridStack: GridStack | null;
    addWidget: (fn: (id: string) => Omit<GridStackWidget, "id">) => void;
    removeWidget: (id: string) => void;
    addSubGrid: (fn: (id: string, withWidget: (w: Omit<GridStackWidget, "id">) => GridStackWidget) => Omit<GridStackWidget, "id">) => void;
    saveOptions: () => GridStackOptions | GridStackWidget[] | undefined;
    _gridStack: {
        value: GridStack | null;
        set: React.Dispatch<React.SetStateAction<GridStack | null>>;
    };
    _rawWidgetMetaMap: {
        value: Map<string, GridStackWidget>;
        set: React.Dispatch<React.SetStateAction<Map<string, GridStackWidget>>>;
    };
};
