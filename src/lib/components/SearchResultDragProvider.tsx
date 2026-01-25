import { PropsWithChildren, useCallback } from "react";
import { GridStack } from "gridstack";
import SearchResultDragContext from "./SearchResultDragContext";

export function SearchResultDragProvider({ children }: PropsWithChildren) {
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
    <SearchResultDragContext.Provider value={{ registerDragSource }}>
      {children}
    </SearchResultDragContext.Provider>
  );
}
