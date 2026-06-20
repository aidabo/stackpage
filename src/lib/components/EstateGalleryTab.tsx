import { useState, useCallback, ReactNode } from "react";
import { HomeIcon } from "@heroicons/react/24/outline";
import { CustomActionFn } from "..";

interface EstateGalleryTabProps {
  onCustomAction?: CustomActionFn;
  onDragStart?: (e: React.DragEvent, componentType: string) => void;
}

export const EstateGalleryTab = ({
  onCustomAction,
  onDragStart,
}: EstateGalleryTabProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ReactNode | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback((e?: React.FormEvent) => {
    e?.preventDefault();
    if (!onCustomAction) {
      setError("Custom action handler not provided");
      return;
    }

    const nextQuery = query.trim();
    if (!nextQuery) {
      setResults(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const result = onCustomAction("gallery/properties", { query: nextQuery, onDragStart });
      setResults(<div key={`${nextQuery}-${Date.now()}`}>{result}</div>);
    } catch (err) {
      console.error("Property gallery search error:", err);
      setError("Failed to perform property gallery search");
    } finally {
      setIsLoading(false);
    }
  }, [query, onCustomAction, onDragStart]);

  return (
    <div
      className="h-full min-h-0 flex flex-col bg-zinc-200 overflow-y-auto"
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
      }}
    >
      <div className="p-4 bg-white border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Property Gallery</h3>
        <form className="flex gap-2" onSubmit={handleSearch}>
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search properties..."
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
              <HomeIcon className="w-5 h-5" />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading || !onCustomAction}
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "..." : "Search"}
          </button>
        </form>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
      <div className="flex-1 overflow-auto p-4">
        {results ? (
          results
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <HomeIcon className="w-12 h-12 mb-2 opacity-20" />
            <p className="text-sm">Enter a query to search property gallery</p>
          </div>
        )}
      </div>
    </div>
  );
};
