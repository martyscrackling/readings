"use client";

import { useEffect, useState } from "react";
import ReadingCard from "@/components/ReadingCard";
import ReadingTabs from "@/components/ReadingTabs";
import HighlightToolbar from "@/components/HighlightToolbar";
import { ArrowLeft } from "lucide-react";
import { db } from "@/lib/dexie";
import he from "he";

function cleanText(value: any) {
  if (!value) return "";
  return he.decode(value);
}

export default function ReadingPage() {
  const [reading, setReading] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("readings");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReadings();
  }, []);

  async function loadReadings() {
    try {
      setLoading(true);

      const res = await fetch("/api/readings");
      const data = await res.json();

      console.log("READINGS:", data);

      setReading(data);

      await db.readings.put({
        date: new Date().toISOString(),
        title: data?.Mass_G?.heading || "",
        content: data,
      });
    } catch (error) {
      console.error(error);

      const offline = await db.readings.toArray();
      if (offline.length > 0) {
        setReading(offline[0].content);
      }
    } finally {
      setLoading(false);
    }
  }

  function highlightSelectedText(color: string) {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    try {
      const range = selection.getRangeAt(0);
      const span = document.createElement("span");

      span.style.backgroundColor = color;
      range.surroundContents(span);

      selection.removeAllRanges();
    } catch (e) {
      console.warn("Highlight error:", e);
    }
  }

  if (loading) return <p className="p-10 text-center">Loading readings...</p>;
  if (!reading) return <p className="p-10 text-center">No readings found.</p>;

  return (
    <main className="min-h-screen bg-[#f7f7f7] pb-32">
      <div className="max-w-xl mx-auto px-5 pt-10">
        <ArrowLeft className="mb-10" />

        {/* HEADER */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">
            {cleanText(reading?.Mass_G?.heading) || "Daily Mass"}
          </h1>

          <p className="text-gray-500">{reading?.date}</p>

          <p className="text-sm text-gray-400">Lectionary</p>
        </div>

        {/* TABS */}
        <div className="flex justify-center mt-8">
          <ReadingTabs active={activeTab} setActive={setActiveTab} />
        </div>

        {/* TOOLBAR */}
        <div className="flex justify-end mt-8">
          <HighlightToolbar onColorSelect={highlightSelectedText} />
        </div>

        {/* READINGS */}
        <div className="mt-10 space-y-14">
          <ReadingCard
            title="First Reading"
            subtitle={reading?.Mass_R1?.source}
            content={reading?.Mass_R1?.text || "No reading available."}
          />

          <ReadingCard
            title="Responsorial Psalm"
            subtitle={reading?.Mass_Ps?.source}
            content={reading?.Mass_Ps?.text || "No psalm available."}
          />

          <ReadingCard
            title="Alleluia"
            subtitle={reading?.Mass_GA?.source}
            content={reading?.Mass_GA?.text || "No Alleluia available."}
          />

          <ReadingCard
            title="Gospel"
            subtitle={reading?.Mass_G?.source}
            content={reading?.Mass_G?.text || "No gospel available."}
          />
        </div>
      </div>
    </main>
  );
}
