import { PropsWithChildren, useCallback } from "react";
import { GridStack } from "gridstack";
import ExternalDragSourceContext from "./ExternalDragSourceContext";

export function ExternalDragSourceProvider({ children }: PropsWithChildren) {
  const seen = new WeakSet<HTMLElement>();

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
