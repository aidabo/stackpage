import {
  PropsWithChildren,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { useGridStackContext } from "./grid-stack-context";
import {
  GridItemHTMLElement,
  GridStack,
  GridStackOptions,
  GridStackWidget,
} from "gridstack";
import { GridStackRenderContext } from "./grid-stack-render-context";
import isEqual from "react-fast-compare";
import { v4 as uuidv4 } from "uuid";

export interface GridStackDropEvent {
  name: string;
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export type GridStackDropEventCallback = (event: GridStackDropEvent) => void;

// Override the default resizeToContent method to ensure content.firstChildElement is null error, 
// because resizeToContent called by GridStack before React DOM mounted and rendered
const originalResizeToContent = GridStack.prototype.resizeToContent;
GridStack.prototype.resizeToContent = function(el: GridItemHTMLElement) {
  const content = el.querySelector('.grid-stack-item-content');
  const first = content?.firstElementChild;
  if (!first) {
    // Silently skip
    return;
  }
  return originalResizeToContent.call(this, el);
};

export function GridStackRenderProvider({
  children,
  onGridStackDropEvent,
}: PropsWithChildren<{ onGridStackDropEvent?: GridStackDropEventCallback }>) {
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
    []
  );

  const initGrid = useCallback(() => {
    if (containerRef.current) {
      GridStack.renderCB = renderCBFn;

      const grid = GridStack.init(optionsRef.current, containerRef.current);

      // Enable drag-and-drop from external sources
      GridStack.setupDragIn(".grid-stack-item-widget", {
         appendTo: "body", 
         helper: "clone",
         scroll: false,
      }
    );
            
      // grid.on('added removed change', function(e:any, items: any) {
      //   let str = '';
      //   items.forEach(function(item:any) { str += ' (x,y)=' + item.x + ',' + item.y; });
      //   console.log(e.type + ' ' + items.length + ' items:' + str );
      // });

      // grid.on('drag', function(event: any, el) {
      //   //const n = el.gridstackNode;
      //   const x = el.getAttribute('gs-x'); // verify node (easiest) and attr are the same
      //   const y = el.getAttribute('gs-y');
      //   // console.log((g || el.gridstackNode.grid.opts.id) + ' drag ' + (n.content || '') + ' pos: (' + n.x + ',' + n.y + ') = (' + x + ',' + y + ')');
      //   console.log("drag...", x, y, event.target)
      // })

      // grid.on('dragstop', function(event: any, el) {
      //   //let n = el.gridstackNode;
      //   const x = el.getAttribute('gs-x'); // verify node (easiest) and attr are the same
      //   const y = el.getAttribute('gs-y');
      //   //console.log((g || el.gridstackNode.grid.opts.id) + ' dragstop ' + (n.content || '') + ' pos: (' + n.x + ',' + n.y + ') = (' + x + ',' + y + ')');
      //   console.log("dragstop", x, y, event.target);
      // });

      grid.on("dropped", function (_event, _previousNode, newNode) {    
        console.log("dropped....", newNode);
        
        if (newNode) {
          // Remove the node that gridstack added
          const el: any = newNode.el;
          const type: string = el.dataset.gsType;
          if (type && onGridStackDropEvent) {
            const dropEvent: GridStackDropEvent = {
              name: type,
              id: uuidv4(),
              x: newNode.x || 0,
              y: newNode.y || 0,
              w: type === "SubGrid" ? 12 : 4, // SubGrid takes full width
              h: type === "SubGrid" ? 6 : 4,  // SubGrid is taller              
            };
            onGridStackDropEvent(dropEvent);
            //remove el.gridstackNode from gridstack
            //add by callback
            grid.removeWidget(el, true);
          }
          //if drag from SubGrid, that's OK,           
        }
      });

      return grid;
    }

    return null;
  }, [renderCBFn, onGridStackDropEvent]);


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
        [gridStack]
      )}
    >
      <div ref={containerRef}>{gridStack ? children : null}</div>
    </GridStackRenderContext.Provider>
  );
}
