"use client";

import { useState, useEffect } from "react";
import Modal from "@/components/Modal";
import GlowButton from "@/components/GlowButton";

interface Props {
  open: boolean;
  onClose: () => void;
  current: string;
  onRename: (name: string) => void;
}

export default function RenameKeyModal({ open, onClose, current, onRename }: Props) {
  const [name, setName] = useState(current);

  // Sync the input whenever a different key is targeted for renaming
  useEffect(() => { setName(current); }, [current]);

  function handleSave() {
    if (name.trim()) { onRename(name.trim()); onClose(); }
  }

  return (
    <Modal open={open} onClose={onClose} title="Rename API key" description="Update the name of your API key.">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-zinc-700">Key name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSave(); }}
            autoFocus
            className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm text-zinc-800 outline-none focus:border-zinc-400 transition-colors bg-white placeholder:text-neutral-400"
          />
        </div>
        <div className="flex gap-2.5">
          <button
            onClick={onClose}
            className="flex-1 rounded-full border border-neutral-200 px-4 py-2.5 text-sm text-neutral-600 hover:bg-neutral-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <GlowButton label="Save" onClick={handleSave} disabled={!name.trim()} className="flex-1" />
        </div>
      </div>
    </Modal>
  );
}
