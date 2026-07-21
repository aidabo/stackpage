import React from "react";

const COLOR_PRESETS = [
  "#FFFFFF", "#C0C0C0", "#808080", "#000000", "#FF0000", "#800000",
  "#FFFF00", "#808000", "#00FF00", "#008000", "#00FFFF", "#008080",
  "#0000FF", "#000080", "#FF00FF", "#800080", "#FFA500", "#A52A2A",
  "#FFC0CB", "#FFD700", "#4B0082", "#EE82EE",
];

type ColorPickerPopoverProps = {
  value?: string;
  onChange: (value: string) => void;
  onSelect?: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
};

const isHexColor = (value: string) => /^#[0-9a-f]{6}$/i.test(value);

export const ColorPickerPopover = ({
  value = "#000000",
  onChange,
  onSelect,
  className = "",
  style,
  onMouseDown,
}: ColorPickerPopoverProps) => {
  const colorValue = value || "#000000";
  const nativeValue = isHexColor(colorValue) ? colorValue : "#000000";

  return (
    <div
      className={`bg-white border border-gray-300 shadow-xl p-4 rounded-lg w-80 ${className}`}
      style={style}
      onMouseDown={(event) => {
        onMouseDown?.(event);
        event.stopPropagation();
      }}
    >
      <label className="block mb-1 text-xs font-medium text-gray-600">
        HEX color
      </label>
      <input
        type="text"
        value={colorValue}
        onChange={(event) => onChange(event.target.value)}
        className="w-full mb-3 p-2 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500"
        placeholder="#0032FD"
        spellCheck={false}
      />
      <div className="grid grid-cols-6 gap-2 mb-3">
        {COLOR_PRESETS.map((color) => (
          <button
            type="button"
            key={color}
            style={{ backgroundColor: color }}
            className="w-8 h-8 rounded border border-gray-200 hover:scale-105 transition-transform"
            onClick={() => {
              onChange(color);
              onSelect?.(color);
            }}
            title={color}
          />
        ))}
      </div>
      <label className="relative block w-full py-2 rounded border border-gray-300 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 text-white text-xs font-bold text-center cursor-pointer overflow-hidden">
        Native color picker
        <input
          type="color"
          className="absolute inset-0 opacity-0 cursor-pointer"
          value={nativeValue}
          onChange={(event) => {
            onChange(event.target.value);
            onSelect?.(event.target.value);
          }}
        />
      </label>
    </div>
  );
};

export default ColorPickerPopover;
