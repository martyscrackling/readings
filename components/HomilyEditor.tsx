"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Placeholder from "@tiptap/extension-placeholder";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Highlighter,
  Palette,
  Save,
  Undo2,
  Redo2,
  Expand,
  Minimize,
  Lock,
  Unlock,
  Minus,
  Plus,
} from "lucide-react";

import { useEffect, useState } from "react";

interface Props {
  date: string;
}

export default function HomilyEditor({ date }: Props) {
  const [saved, setSaved] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const [highlightOpen, setHighlightOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  // GLOBAL FONT SIZE
  const [fontSize, setFontSize] = useState(22);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight.configure({ multicolor: true }),
      Color.configure({ types: ["textStyle"] }),
      TextStyle,
      Placeholder.configure({
        placeholder: "Write your homily here...",
      }),
    ],
    content: "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "focus:outline-none outline-none border-none min-h-[300px]",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      localStorage.setItem(`homily-${date}`, html);

      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    },
  });

  useEffect(() => {
    if (!editor) return;

    const savedHomily = localStorage.getItem(`homily-${date}`);
    if (savedHomily) editor.commands.setContent(savedHomily);
  }, [editor, date]);

  useEffect(() => {
    if (!editor) return;
    editor.setEditable(!isLocked);
  }, [isLocked, editor]);

  if (!editor) return null;

  const colors = [
    { name: "Black", value: "#000000" },
    { name: "Red", value: "#ef4444" },
    { name: "Blue", value: "#3b82f6" },
    { name: "Orange", value: "#f97316" },
    { name: "Green", value: "#22c55e" },
    { name: "Violet", value: "#8b5cf6" },
  ];

  const highlights = [
    { name: "Peach", value: "#ffd8b1" },
    { name: "Mint", value: "#bff7d2" },
    { name: "Sky Blue", value: "#cfe8ff" },
    { name: "Rose Pink", value: "#ffd1dc" },
  ];

  const increaseFont = () => {
    if (fontSize < 60) setFontSize(fontSize + 2);
  };

  const decreaseFont = () => {
    if (fontSize > 14) setFontSize(fontSize - 2);
  };

  return (
    <div
      className={`space-y-4 transition-all ${
        isFullScreen ? "fixed inset-0 z-50 bg-white p-6 overflow-y-auto" : ""
      }`}
    >
      {/* TOOLBAR */}
      {!isLocked && (
        <div
          className={`flex items-center justify-between bg-[#f7eef4] p-3 rounded-2xl w-full shadow-sm flex-wrap gap-3 ${
            isFullScreen ? "sticky top-0 z-50" : ""
          }`}
        >
          {/* LEFT */}
          <div className="flex items-center gap-2 relative flex-wrap">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className="p-2 rounded-lg hover:bg-pink-100"
            >
              <Bold size={18} />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className="p-2 rounded-lg hover:bg-pink-100"
            >
              <Italic size={18} />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className="p-2 rounded-lg hover:bg-pink-100"
            >
              <UnderlineIcon size={18} />
            </button>

            {/* FONT COLOR */}
            <div className="relative">
              <button
                onClick={() => setColorOpen(!colorOpen)}
                className="p-2 rounded-lg hover:bg-pink-100"
              >
                <Palette size={18} />
              </button>

              {colorOpen && (
                <div className="absolute top-10 left-0 bg-white shadow-md rounded-xl p-2 flex gap-2 z-50">
                  {colors.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => {
                        editor.chain().focus().setColor(c.value).run();
                        setColorOpen(false);
                      }}
                      className="w-6 h-6 rounded-full border"
                      style={{ backgroundColor: c.value }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* HIGHLIGHT */}
            <div className="relative">
              <button
                onClick={() => setHighlightOpen(!highlightOpen)}
                className="p-2 rounded-lg hover:bg-pink-100"
              >
                <Highlighter size={18} />
              </button>

              {highlightOpen && (
                <div className="absolute top-10 left-0 bg-white shadow-md rounded-xl p-2 flex gap-2 z-50">
                  {highlights.map((h) => (
                    <button
                      key={h.value}
                      onClick={() => {
                        editor.chain().focus().toggleHighlight({ color: h.value }).run();
                        setHighlightOpen(false);
                      }}
                      className="w-6 h-6 rounded-full border"
                      style={{ backgroundColor: h.value }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-end gap-2">
            {/* TOP CONTROLS */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="p-2 rounded-lg hover:bg-pink-100"
              >
                {isFullScreen ? <Minimize size={18} /> : <Expand size={18} />}
              </button>

              <button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                className="p-2 rounded-lg hover:bg-pink-100 disabled:opacity-30"
              >
                <Undo2 size={18} />
              </button>

              <button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                className="p-2 rounded-lg hover:bg-pink-100 disabled:opacity-30"
              >
                <Redo2 size={18} />
              </button>
            </div>

            {/* FONT SIZE CONTROLS */}
            <div className="flex items-center gap-2 bg-white rounded-xl shadow-sm px-2 py-1">
              <button
                onClick={decreaseFont}
                className="w-6 h-6 rounded-full bg-pink-100 hover:bg-pink-200 flex items-center justify-center"
              >
                <Minus size={12} />
              </button>

              <div className="text-xs font-medium min-w-[40px] text-center">
                {fontSize}px
              </div>

              <button
                onClick={increaseFont}
                className="w-6 h-6 rounded-full bg-pink-100 hover:bg-pink-200 flex items-center justify-center"
              >
                <Plus size={12} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDITOR */}
      <div
        className={`bg-white rounded-3xl shadow-sm min-h-[400px] p-6 ${
          isFullScreen ? "flex-1" : ""
        }`}
      >
        <div style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }}>
          <EditorContent editor={editor} />
        </div>
      </div>

      {/* SAVE STATUS */}
      {!isLocked && (
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Save size={16} />
          {saved ? "Saved" : "Auto-saving..."}
        </div>
      )}

      {/* LOCK / UNLOCK FAB */}
      {isFullScreen && (
        <button
          onClick={() => setIsLocked(!isLocked)}
          className="fixed bottom-6 right-6 z-[999] w-14 h-14 rounded-full bg-pink-500 text-white shadow-xl flex items-center justify-center hover:scale-105 transition-all"
        >
          {isLocked ? <Unlock size={22} /> : <Lock size={22} />}
        </button>
      )}
    </div>
  );
}