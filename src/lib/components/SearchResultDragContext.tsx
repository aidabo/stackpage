import { createContext, useContext } from "react";

export interface SearchResultDragContextValue {
  registerDragSource: (el: HTMLElement | null) => void;
}

const SearchResultDragContext =
  createContext<SearchResultDragContextValue | null>(null);

export const useSearchResultDrag = () => {
  const ctx = useContext(SearchResultDragContext);
  if (!ctx) {
    throw new Error(
      "useSearchResultDrag must be used inside SearchResultDragProvider",
    );
  }
  return ctx;
};

export default SearchResultDragContext;
