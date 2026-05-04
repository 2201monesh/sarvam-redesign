"use client";

import { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

export default function RowActions({ onRename, onDelete }: { onRename: () => void; onDelete: () => void }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  function handleOpen() {
    if (btnRef.current) {
      // Capture button coords so the dropdown can be fixed-positioned outside the table's overflow
      const rect = btnRef.current.getBoundingClientRect();
      setPos({ top: rect.bottom + 4, left: rect.left });
    }
    setOpen((o) => !o);
  }

  // Close when the user clicks anywhere outside the menu or trigger button
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        btnRef.current && !btnRef.current.contains(e.target as Node)
      ) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex justify-start">
      <button
        ref={btnRef}
        onClick={handleOpen}
        className="flex items-center justify-center w-7 h-7 rounded-md text-neutral-400 hover:text-zinc-600 hover:bg-neutral-100 transition-colors cursor-pointer"
      >
        <MoreHorizontal size={15} />
      </button>

      {open && (
        <div
          ref={menuRef}
          style={{ position: "fixed", top: pos.top, left: pos.left }}
          className="z-50 w-36 rounded-xl border border-neutral-200 bg-white shadow-lg shadow-black/5 py-1 overflow-hidden"
        >
          <button
            onClick={() => { onRename(); setOpen(false); }}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-zinc-700 hover:bg-neutral-50 transition-colors cursor-pointer"
          >
            <Pencil size={13} className="text-neutral-400" />
            Rename
          </button>
          <button
            onClick={() => { onDelete(); setOpen(false); }}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
          >
            <Trash2 size={13} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
