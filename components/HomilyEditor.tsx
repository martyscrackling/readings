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
} from "lucide-react";

import { useEffect, useState } from "react";

interface Props {
  date: string;
}

export default function HomilyEditor({ date }: Props) {
  const [saved, setSaved] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      Color.configure({ types: ["textStyle"] }),
      TextStyle,
      Placeholder.configure({
        placeholder: "Write your homily here...",
      }),
    ],

    content: "",

    immediatelyRender: false,

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();

      localStorage.setItem(`homily-${date}`, html);

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 1500);
    },
  });

  // LOAD SAVED HOMILY
  useEffect(() => {
    if (!editor) return;

    const savedHomily = localStorage.getItem(`homily-${date}`);

    if (savedHomily) {
      editor.commands.setContent(savedHomily);
    }
  }, [editor, date]);

  if (!editor) return null;

  const colors = [
    { name: "Black", value: "#000000" },
    { name: "Red", value: "#ef4444" },
    { name: "Blue", value: "#3b82f6" },
    { name: "Orange", value: "#f97316" },
    { name: "Green", value: "#22c55e" },
    { name: "Violet", value: "#8b5cf6" },
  ];

  return (
    <div className="space-y-6">
      {/* TOOLBAR */}
      <div className="flex items-center gap-2 bg-[#f7eef4] p-3 rounded-2xl w-fit shadow-sm relative">
        {/* BOLD */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-lg transition ${
            editor.isActive("bold") ? "bg-pink-200" : "hover:bg-pink-100"
          }`}
        >
          <Bold size={18} />
        </button>

        {/* ITALIC */}
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-lg transition ${
            editor.isActive("italic") ? "bg-pink-200" : "hover:bg-pink-100"
          }`}
        >
          <Italic size={18} />
        </button>

        {/* UNDERLINE */}
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded-lg transition ${
            editor.isActive("underline") ? "bg-pink-200" : "hover:bg-pink-100"
          }`}
        >
          <UnderlineIcon size={18} />
        </button>

        {/* TEXT COLOR (CUSTOM DROPDOWN) */}
        <div className="relative">
          <button
            onClick={() => setColorOpen(!colorOpen)}
            className="p-2 rounded-lg hover:bg-pink-100 transition"
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
                  className="w-6 h-6 rounded-full border border-gray-300"
                  style={{ backgroundColor: c.value }}
                  title={c.name}
                />
              ))}
            </div>
          )}
        </div>

        {/* HIGHLIGHT */}
        <button
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHighlight({
                color: "#fff3a3",
              })
              .run()
          }
          className={`p-2 rounded-lg transition ${
            editor.isActive("highlight")
              ? "bg-yellow-200"
              : "hover:bg-yellow-100"
          }`}
        >
          <Highlighter size={18} />
        </button>
      </div>

      {/* EDITOR */}
      <div className="bg-white rounded-3xl shadow-sm min-h-[400px] p-6">
        <EditorContent
          editor={editor}
          className="prose prose-neutral max-w-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:focus:ring-0 [&_.ProseMirror]:focus-visible:outline-none"
        />
      </div>

      {/* SAVE STATUS */}
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Save size={16} />
        {saved ? <span>Saved</span> : <span>Auto-saving...</span>}
      </div>
    </div>
  );
}