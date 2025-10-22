// TooltipButton component
export function TooltipButton({
  onClick,
  icon,
  tooltip,
  className = "",
}: {
  onClick: () => void;
  icon: React.ReactNode;
  tooltip: string;
  className?: string;
}) {
  return (
    <div className="relative group">
      <button
        onClick={onClick}
        className={`p-2 rounded-lg transition ${className}`}
      >
        {icon}
      </button>
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
        {tooltip}
        <div className="absolute bottom-full left-1/2 w-2 h-2 bg-black transform -translate-x-1/2 rotate-45 -mb-1"></div>
      </div>
    </div>
  );
}
