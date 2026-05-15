"use client";

import he from "he";

interface Props {
  title: string;
  subtitle?: string;
  content: string;
}
function cleanText(value: any) {
  if (!value) return "";
  return he.decode(value);
}
export default function ReadingCard({ title, subtitle, content }: Props) {
  // STEP 1: decode HTML entities
  const decoded = he.decode(content || "");

  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>

        {subtitle && (
          <p className="text-gray-500 text-sm">{cleanText(subtitle)}</p>
        )}
      </div>

      {/* STEP 2: render HTML */}
      <div
        className="leading-8 text-[17px]"
        dangerouslySetInnerHTML={{ __html: decoded }}
      />
    </div>
  );
}
