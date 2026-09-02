// TooltipButton component
export function TooltipButton({
  onClick,
  icon,
  tooltip,
  label,
  className = "",
}: {
  onClick: () => void;
  icon: React.ReactNode;
  tooltip: string;
  label?: string;
  className?: string;
}) {
  return (
    <div className="relative group">
      <button
        onClick={onClick}
        title={tooltip}
        aria-label={tooltip}
        className={`p-2 rounded-lg transition inline-flex items-center ${className}`}
      >
        {icon}
        {/* Icon-only on mobile so the toolbar fits one row; label shows on sm+ (PC). */}
        {label ? (
          <span className="ml-1 text-sm hidden sm:inline">{label}</span>
        ) : null}
      </button>
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
        {tooltip}
        <div className="absolute bottom-full left-1/2 w-2 h-2 bg-black transform -translate-x-1/2 rotate-45 -mb-1"></div>
      </div>
    </div>
  );
}
