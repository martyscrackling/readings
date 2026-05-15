"use client";

const colors = [
  "#F6C26B",
  "#67E8A5",
  "#6BCBFF",
  "#FF7AA2",
];

export default function HighlightToolbar({
  onColorSelect,
}: {
  onColorSelect: (color: string) => void;
}) {
  return (
    <div className="flex gap-2">
      {colors.map((color) => (
        <button
          key={color}
          onClick={() => onColorSelect(color)}
          className="w-7 h-7 rounded-full border"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}