import React, { useCallback, useLayoutEffect, useMemo, useRef } from "react";
import { useGridStackContext } from "./grid-stack-context";
import {
  GridItemHTMLElement,
  GridStack,
  GridStackOptions,
  GridStackWidget,
} from "gridstack";
import { GridStackRenderContext } from "./grid-stack-render-context";
import isEqual from "react-fast-compare";

export interface GridStackDropEvent {
  name: string;
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  props?: any;
}

export interface GridStackRenderProviderProps {
  children?: React.ReactNode;
  setupExternalDropForGrid: (grid: GridStack) => void,
  onGridReady?: (grid: GridStack) => void;
}

// Override the default resizeToContent method to ensure content.firstChildElement is null error,
// because resizeToContent called by GridStack before React DOM mounted and rendered
const originalResizeToContent = GridStack.prototype.resizeToContent;
GridStack.prototype.resizeToContent = function (el: GridItemHTMLElement) {
  const content = el.querySelector(".grid-stack-item-content");
  const first = content?.firstElementChild;
  if (!first) {
    // Silently skip
    return;
  }
  return originalResizeToContent.call(this, el);
};

export const GridStackRenderProvider: React.FC<
  GridStackRenderProviderProps
> = ({ children, setupExternalDropForGrid, onGridReady }) => {
  const {
    _gridStack: { value: gridStack, set: setGridStack },
    initialOptions,
  } = useGridStackContext();

  const widgetContainersRef = useRef<Map<string, HTMLElement>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<GridStackOptions>(initialOptions);

  const renderCBFn = useCallback(
    (element: HTMLElement, widget: GridStackWidget) => {
      if (widget.id) {
        widgetContainersRef.current.set(widget.id, element);
      }
    },
    [],
  );

  //Make sure subgrid rebind drop event when page load
  function rebindDropForGrid(
    grid: GridStack,
    setupExternalDropForGrid: (g: GridStack) => void
  ) {
    // bind root
    setupExternalDropForGrid(grid);

    // bind all existing sub-grids
    grid.engine.nodes.forEach((node) => {
      if (node.subGrid) {
        rebindDropForGrid(node.subGrid, setupExternalDropForGrid);
      }
    });
  }

  const initGrid = useCallback(() => {
    if (containerRef.current) {
      GridStack.renderCB = renderCBFn;

      const grid = GridStack.init(optionsRef.current, containerRef.current);

      //make subgrid and all grid rebind to receive dropped external component
      rebindDropForGrid(grid, setupExternalDropForGrid);

      //apply grid mode (edit, preview, view)
      if (onGridReady) {
        onGridReady(grid);
      }

      return grid;
    }

    return null;
  }, [renderCBFn/*, onGridStackDropEvent*/]);

  useLayoutEffect(() => {
    if (!isEqual(initialOptions, optionsRef.current) && gridStack) {
      try {
        gridStack.removeAll(false);
        gridStack.destroy(false);
        widgetContainersRef.current.clear();
        optionsRef.current = initialOptions;
        setGridStack(initGrid());
      } catch (e) {
        console.error("Error reinitializing gridstack", e);
      }
    }
  }, [initialOptions, gridStack, initGrid, setGridStack]);

  useLayoutEffect(() => {
    if (!gridStack) {
      try {
        setGridStack(initGrid());
      } catch (e) {
        console.error("Error initializing gridstack", e);
      }
    }
  }, [gridStack, initGrid, setGridStack]);

  return (
    <GridStackRenderContext.Provider
      value={useMemo(
        () => ({
          getWidgetContainer: (widgetId: string) => {
            return widgetContainersRef.current.get(widgetId) || null;
          },
        }),
        // ! gridStack is required to reinitialize the grid when the options change
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [gridStack],
      )}
    >
      <div ref={containerRef}>{gridStack ? children : null}</div>
    </GridStackRenderContext.Provider>
  );
};
