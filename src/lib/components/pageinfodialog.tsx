import { createPortal } from "react-dom";
import { useMemo, useState } from "react";

interface PageInfoDialogsProps {
  isOpen: boolean;
  pageInfo: any;
  resetOpenInfo: (open: boolean) => void;
}

export function PageInfoDialog({
  isOpen,
  pageInfo,
  resetOpenInfo,
}: PageInfoDialogsProps) {
  if (!isOpen) return null;

  const handleClose = () => resetOpenInfo(false);
  const [copied, setCopied] = useState(false);

  const pageInfoData = useMemo(() => {
    return typeof pageInfo === "function" ? pageInfo() : pageInfo;
  }, [pageInfo]);

  const pageInfoText = useMemo(() => {
    try {
      return JSON.stringify(pageInfoData, null, 2);
    } catch {
      return String(pageInfoData);
    }
  }, [pageInfoData]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pageInfoText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (e) {
      console.error("Failed to copy page info", e);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={handleClose}
      />

      {/* Dialog */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div
          className="
            bg-white rounded-lg shadow-xl
            w-[90vw] max-w-[720px]
            max-h-[calc(100vh-120px)]
            flex flex-col
          "
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b shrink-0">
            <h2 className="text-base font-semibold">Page Information</h2>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="
                  text-sm px-2 py-1 rounded
                  border border-gray-300
                  hover:bg-gray-100
                "
              >
                Copy
              </button>

              {copied && (
                <span className="text-xs text-green-600 transition-opacity">
                  Copied ✓
                </span>
              )}

              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 overflow-auto text-md">
            <pre className="bg-gray-50 rounded p-3 text-md overflow-auto">
              {pageInfoText}
            </pre>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
