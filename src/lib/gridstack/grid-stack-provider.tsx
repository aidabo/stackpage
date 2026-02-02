import type { GridStack, GridStackOptions, GridStackWidget } from "gridstack";
import { type PropsWithChildren, useCallback, useState } from "react";
import { GridStackContext } from "./grid-stack-context";
import { v4 as uuidv4 } from "uuid";

export function GridStackProvider({
  children,
  initialOptions,
}: PropsWithChildren<{ initialOptions: GridStackOptions }>) {
  const [gridStack, setGridStack] = useState<GridStack | null>(null);
  //for current grid or subgrid to add widget
  const [currentGridStack, setCurrentGridStack] = useState<GridStack | null>(null);
  const [rawWidgetMetaMap, setRawWidgetMetaMap] = useState(() => {
    const map = new Map<string, GridStackWidget>();
    const deepFindNodeWithContent = (obj: GridStackWidget) => {
      if (obj.id && obj.content) {
        map.set(obj.id, obj);
      }
      if (obj.subGridOpts?.children) {
        obj.subGridOpts.children.forEach((child: GridStackWidget) => {
          deepFindNodeWithContent(child);
        });
      }
    };
    initialOptions.children?.forEach((child: GridStackWidget) => {
      deepFindNodeWithContent(child);
    });
    return map;
  });

  const addWidget = useCallback(
    (fn: (id: string) => Omit<GridStackWidget, "id">,
      targetGrid?: GridStack
    ) => {
      const newId = `widget-${uuidv4()}`;
      const widget = fn(newId);

      const grid = targetGrid ?? gridStack;
      grid?.addWidget({ ...widget, id: newId });
      setRawWidgetMetaMap((prev) => {
        const newMap = new Map<string, GridStackWidget>(prev);
        newMap.set(newId, widget);
        return newMap;
      });
    },
    [gridStack]
  );

  const addSubGrid = useCallback(
    (
      fn: (
        id: string,
        withWidget: (w: Omit<GridStackWidget, "id">) => GridStackWidget
      ) => Omit<GridStackWidget, "id">,
      onSubGridReady?: (subGrid: GridStack) => void
    ) => {
      const newId = `subgrid-${uuidv4()}`;
      const subWidgetIdMap = new Map<string, GridStackWidget>();

      const widget = fn(newId, (w) => {
        const subWidgetId = `widget-${uuidv4()}`;
        subWidgetIdMap.set(subWidgetId, w);
        return { ...w, id: subWidgetId };
      });

      const el = gridStack?.addWidget({ ...widget, id: newId });
      // let subgrid can be dropped a external component
      const subGrid = el?.gridstackNode?.subGrid;
      if (subGrid && onSubGridReady) {
        onSubGridReady(subGrid);
      }

      setRawWidgetMetaMap((prev) => {
        const newMap = new Map<string, GridStackWidget>(prev);
        subWidgetIdMap.forEach((meta, id) => {
          newMap.set(id, meta);
        });
        return newMap;
      });
    },
    [gridStack]
  );

  const removeWidget = useCallback(
    (id: string) => {
      gridStack?.removeWidget(id);
      setRawWidgetMetaMap((prev) => {
        const newMap = new Map<string, GridStackWidget>(prev);
        newMap.delete(id);
        return newMap;
      });
    },
    [gridStack]
  );

  const saveOptions = useCallback(() => {
    return gridStack?.save(true, true, (_, widget) => widget);
  }, [gridStack]);

  return (
    <GridStackContext.Provider
      value={{
        initialOptions,
        gridStack,
        currentGridStack,

        addWidget,
        removeWidget,
        addSubGrid,
        saveOptions,

        _gridStack: {
          value: gridStack,
          set: setGridStack,
        },
        _currentGridStack: {
          value: currentGridStack,
          set: setCurrentGridStack,
        },
        _rawWidgetMetaMap: {
          value: rawWidgetMetaMap,
          set: setRawWidgetMetaMap,
        },
      }}
    >
      {children}
    </GridStackContext.Provider>
  );
}
