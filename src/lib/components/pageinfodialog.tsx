import * as React from "react";
import { PageInfo } from "./pageinfo";

interface PageInfoDialogsProps {
  isOpen: boolean;
  pageInfo: any;
  resetOpenInfo: (open: boolean) => void;
}

export default function PageInfoDialogs({
  isOpen,
  pageInfo,
  resetOpenInfo,
}: PageInfoDialogsProps) {
  const [copy, setCopy] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      // Component is controlled by parent via isOpen prop
    }
  }, [isOpen, pageInfo]);

  const handleClose = () => {
    resetOpenInfo(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(
      document.getElementById("pageinfo")?.innerText || ""
    );
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 3000);
  };

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
          <h2 className="text-lg font-semibold truncate mr-2">
            Page Information
          </h2>
          <div className="flex items-center space-x-1 flex-shrink-0">
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center relative"
              aria-label="Copy page info"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              {copy && (
                <span className="absolute -top-8 -right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  copied
                </span>
              )}
            </button>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content - Scrollable area */}
        <div className="p-4 overflow-y-auto flex-1">
          <PageInfo pageInfo={pageInfo} />
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t flex-shrink-0">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors w-full sm:w-auto"
            autoFocus
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
