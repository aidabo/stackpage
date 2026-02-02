import { PropsWithChildren, useCallback } from "react";
import { GridStack } from "gridstack";
import ExternalDragSourceContext from "./ExternalDragSourceContext";

export function ExternalDragSourceProvider({ children }: PropsWithChildren) {
  const seen = new WeakSet<HTMLElement>();

  /**
   * Wrapp static and dynamic components draggable into grid stack when page load
   * Your component must has "ref={registerDragSource}"
   * <code>
   *  <div
            ref={registerDragSource}
            key={name}
            gs-type={name}
            data-gs-type={name}
            className="grid-stack-item grid-stack-item-widget"
            draggable="true"
            onDragStart={(e) => onDragStart(e, name)}
            onDragEnd={() => console.log("====drag event end....")}
            onClick={() => {
              setSelectedComponent(name);
              setSelectedInstance(null);
            }}
          >
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm hover:bg-gray-100 cursor-pointer transition-all duration-200 hover:shadow-md text-center">
              <div className="font-medium text-gray-800 mb-2">{name}</div>
              <div className="text-xs text-gray-500">Drag to main area</div>
            </div>
          </div>
      </code>    
   * 
   */
  const registerDragSource = useCallback((el: HTMLElement | null) => {
    if (!el || seen.has(el)) return;
    seen.add(el);
    GridStack.setupDragIn(el as any, {
      helper: "clone",
      appendTo: "body",
      scroll: false,
    });
  }, []);

  return (
    <ExternalDragSourceContext.Provider value={{ registerDragSource }}>
      {children}
    </ExternalDragSourceContext.Provider>
  );
}
