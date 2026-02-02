import { forwardRef, useImperativeHandle } from "react";
import { useGridStackContext } from "..";
import { GridStack, GridStackOptions, GridStackWidget } from "gridstack";

/**
 * Because useGridStackContext can not used in stackpage (must be child component),
 * Use this to reference of useGridStackContext
 */
export type StackActionsRef = {
  saveLayout: () => GridStackOptions | GridStackWidget[] | undefined;
  addWidget: (
    fn: (id: string) => Omit<GridStackWidget, "id">,
    targetGrid?: GridStack //should be currentGridstack
  ) => void;
  addSubGrid: (
    fn: (
      id: string,
      withWidget: (w: Omit<GridStackWidget, "id">) => GridStackWidget,
    ) => Omit<GridStackWidget, "id">,
    onSubGridReady?: (subGrid: GridStack) => void
  ) => void;
  rawWidgetMetaMap: {
    value: Map<string, GridStackWidget>;
    set: React.Dispatch<React.SetStateAction<Map<string, GridStackWidget>>>;
  };
  // When widget add into grid, which grid added (maybe subgrid). 
  // See stackpage's callback of drop event handler
  _currentGridStack: {
    value: GridStack | null;
    set: React.Dispatch<React.SetStateAction<GridStack | null>>;
  };
  _gridStack: {
    value: GridStack | null;
    set: React.Dispatch<React.SetStateAction<GridStack | null>>;
  };

};

const StackActions = forwardRef<StackActionsRef>((_, ref) => {
  const { addWidget, addSubGrid, saveOptions, _rawWidgetMetaMap, _currentGridStack, _gridStack } =
    useGridStackContext();

  useImperativeHandle(ref, () => ({
    saveLayout: () => {
      return saveOptions();
    },
    addWidget,
    addSubGrid,
    rawWidgetMetaMap: _rawWidgetMetaMap,
    _gridStack: _gridStack,
    _currentGridStack: _currentGridStack,
  }));

  return null;
});

export default StackActions;
