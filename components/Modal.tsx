"use client";

import { useEffect, ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
}

export default function Modal({ open, onClose, title, description, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/25 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-white rounded-2xl border border-neutral-200 shadow-xl shadow-black/8 w-full max-w-lg">
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-neutral-100">
          <div>
            <h3 className="text-base font-medium font-season-mix text-zinc-900">{title}</h3>
            {description && <p className="text-xs text-neutral-400 mt-0.5">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="text-neutral-300 hover:text-zinc-500 transition-colors cursor-pointer mt-0.5"
          >
            <X size={17} />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
