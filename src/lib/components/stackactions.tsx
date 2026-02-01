import { forwardRef, useImperativeHandle } from "react";
import { useGridStackContext } from "..";
import { GridStack, GridStackOptions, GridStackWidget } from "gridstack";

export type StackActionsRef = {
  saveLayout: () => GridStackOptions | GridStackWidget[] | undefined;
  addWidget: (fn: (id: string) => Omit<GridStackWidget, "id">) => void;
  addSubGrid: (
    fn: (
      id: string,
      withWidget: (w: Omit<GridStackWidget, "id">) => GridStackWidget,
    ) => Omit<GridStackWidget, "id">,
  ) => void;
  rawWidgetMetaMap: {
    value: Map<string, GridStackWidget>;
    set: React.Dispatch<React.SetStateAction<Map<string, GridStackWidget>>>;
  };
  grid: GridStack | null;
};

const StackActions = forwardRef<StackActionsRef>((_, ref) => {
  const { addWidget, addSubGrid, saveOptions, _rawWidgetMetaMap, gridStack } =
    useGridStackContext();

  useImperativeHandle(ref, () => ({
    saveLayout: () => {
      return saveOptions();
    },
    addWidget,
    addSubGrid,
    rawWidgetMetaMap: _rawWidgetMetaMap,
    grid: gridStack,
  }));

  return null;
});

export default StackActions;
