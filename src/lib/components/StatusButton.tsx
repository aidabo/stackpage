import { useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

// StatusButton component
export function StatusButton({
  onClick,
  icon,
  label,
  className = "",
  successMessage = "Success",
  errorMessage = "Error",
}: {
  onClick: () => Promise<void>;
  icon: React.ReactNode;
  label: string;
  className?: string;
  successMessage?: string;
  errorMessage?: string;
}) {
  const [status, setStatus] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    setStatus(null);
    try {
      await onClick();
      setStatus({ message: successMessage, type: "success" });
    } catch (error) {
      setStatus({ message: errorMessage, type: "error" });
    } finally {
      setIsLoading(false);
      setTimeout(() => setStatus(null), 3000);
    }
  };

  return (
    <div className="relative z-30">
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`p-2 rounded-lg transition flex items-center ${className} ${
          isLoading ? "opacity-70" : ""
        }`}
      >
        {isLoading ? (
          <ArrowPathIcon className="h-5 w-5 animate-spin" />
        ) : (
          <>
            {icon}
            <span className="ml-1 hidden sm:inline">{label}</span>
          </>
        )}
      </button>
      {status && (
        <div
          className={`absolute top-full left-0 mt-1 w-full text-center px-2 py-1 rounded-md text-xs font-medium animate-fadeIn ${
            status.type === "success"
              ? "bg-blue-500 text-white"
              : "bg-red-100 text-red-800"
          }`}
        >
          {status.message}
        </div>
      )}
    </div>
  );
}