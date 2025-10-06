import { GridStackOptions, GridStackWidget } from 'gridstack';
export type StackActionsRef = {
    saveLayout: () => GridStackOptions | GridStackWidget[] | undefined;
    addWidget: (fn: (id: string) => Omit<GridStackWidget, "id">) => void;
    addSubGrid: (fn: (id: string, withWidget: (w: Omit<GridStackWidget, "id">) => GridStackWidget) => Omit<GridStackWidget, "id">) => void;
};
declare const StackActions: import('react').ForwardRefExoticComponent<import('react').RefAttributes<StackActionsRef>>;
export default StackActions;
