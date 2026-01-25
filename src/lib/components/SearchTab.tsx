import { useState, useCallback, ReactNode } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { CustomActionFn } from "..";

interface SearchTabProps {
  onCustomAction?: CustomActionFn;
  onDragStart?: (e: React.DragEvent, componentType: string) => void;
}

export const SearchTab = ({ onCustomAction, onDragStart }: SearchTabProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ReactNode | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async () => {
    if (!onCustomAction) {
      setError("Custom action handler not provided");
      return;
    }

    if (!query.trim()) {
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      // Assuming onCustomAction returns ReactNode directly based on current type definition
      const result = onCustomAction("search", { query, onDragStart });
      setResults(result);
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to perform search");
    } finally {
      setIsLoading(false);
    }
  }, [query, onCustomAction]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      className="h-full flex flex-col bg-gray-50"
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
      }}
    >
      <div className="p-4 bg-white border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Search</h3>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search..."
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
              <MagnifyingGlassIcon className="w-5 h-5" />
            </div>
          </div>
          <button
            onClick={handleSearch}
            disabled={isLoading || !onCustomAction}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "..." : "Search"}
          </button>
        </div>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
      <div className="grid grid-cols-1 gap-3">
        <div
          key="PostView"
          gs-type="PostView"
          data-gs-type="PostView"
          className="grid-stack-item grid-stack-item-widget"
          draggable="true"
          onDragStart={(e) =>
            onDragStart ? onDragStart(e, "PostView") : () => {}
          }
          onDragEnd={() => console.log("====drag event end....")}
        >
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm hover:bg-gray-100 cursor-pointer transition-all duration-200 hover:shadow-md text-center">
            <div className="font-medium text-gray-800 mb-2">
              PostView Test Draggable
            </div>
            <div className="text-xs text-gray-500">Drag to main area</div>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4">
        {results ? (
          results
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <MagnifyingGlassIcon className="w-12 h-12 mb-2 opacity-20" />
            <p className="text-sm">Enter a query to search</p>
          </div>
        )}
      </div>
    </div>
  );
};
