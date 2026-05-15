"use client";

interface Props {
  active: string;
  setActive: (value: string) => void;
}

export default function ReadingTabs({
  active,
  setActive,
}: Props) {
  return (
    <div className="bg-gray-200 rounded-full p-1 flex w-[260px]">
      <button
        onClick={() => setActive("readings")}
        className={`flex-1 py-2 rounded-full text-sm transition ${
          active === "readings"
            ? "bg-white shadow"
            : ""
        }`}
      >
        Readings
      </button>

      <button
        onClick={() => setActive("homily")}
        className={`flex-1 py-2 rounded-full text-sm transition ${
          active === "homily"
            ? "bg-white shadow"
            : ""
        }`}
      >
        Homily
      </button>
    </div>
  );
}