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
      "useExternalComponentDrag must be used inside ExternalDragSourceProvider",
    );
  }
  return ctx;
};

export default ExternalDragSourceContext;
