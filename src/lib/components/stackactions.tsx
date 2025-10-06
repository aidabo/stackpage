import { forwardRef, useImperativeHandle } from "react";
import { useGridStackContext } from "..";
import { GridStackOptions, GridStackWidget } from "gridstack";

export type StackActionsRef = {
  saveLayout: () => GridStackOptions | GridStackWidget[] | undefined;
  addWidget: (fn: (id: string) => Omit<GridStackWidget, "id">) => void;
  addSubGrid: (
    fn: (
      id: string,
      withWidget: (w: Omit<GridStackWidget, "id">) => GridStackWidget
    ) => Omit<GridStackWidget, "id">
  ) => void;
};

const StackActions = forwardRef<StackActionsRef>((_, ref) => {
  const { addWidget, addSubGrid, saveOptions } = useGridStackContext();

  useImperativeHandle(ref, () => ({
    saveLayout: () => {
      return saveOptions();
    },
    addWidget,
    addSubGrid,
  }));

  return null;
});

export default StackActions;