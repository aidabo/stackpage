import { createContext, useContext } from "react";

export interface ExternalDragSourceContextValue {
  registerDragSource: (el: HTMLElement | null) => void;
}

const ExternalDragSourceContext =
  createContext<ExternalDragSourceContextValue | null>(null);

export const useExternalComponentDrag = () => {
  const ctx = useContext(ExternalDragSourceContext);
  if (!ctx) {
    throw new Error(
      "useSearchResultDrag must be used inside SearchResultDragProvider",
    );
  }
  return ctx;
};

export default ExternalDragSourceContext;
