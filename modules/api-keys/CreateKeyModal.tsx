"use client";

import { useState } from "react";
import { Copy, Check, TriangleAlert } from "lucide-react";
import Modal from "@/components/Modal";
import GlowButton from "@/components/GlowButton";
import type { ApiKey } from "./types";
import { generateApiKey } from "./utils";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (key: ApiKey) => void;
}

export default function CreateKeyModal({ open, onClose, onCreate }: Props) {
  const [step, setStep] = useState<"form" | "created">("form");
  const [name, setName] = useState("");
  const [newKey, setNewKey] = useState("");
  const [copied, setCopied] = useState(false);

  function handleCreate() {
    const value = generateApiKey();
    setNewKey(value);
    setStep("created");
    setCopied(true);
    // Auto-copy the key immediately so the user doesn't have to
    navigator.clipboard.writeText(value);
    onCreate({ id: `key_${Date.now()}`, name: name.trim(), value, createdAt: new Date(), status: "active" });
  }

  function handleClose() {
    onClose();
    // Delay reset until the modal exit animation finishes
    setTimeout(() => { setStep("form"); setName(""); setNewKey(""); setCopied(false); }, 300);
  }

  function handleCopy() {
    navigator.clipboard.writeText(newKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={step === "form" ? "Create API key" : "API key created"}
      description={step === "form" ? "Give your key a name to identify where it's used." : undefined}
    >
      {step === "form" ? (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-700">Key name</label>
            <input
              type="text"
              placeholder="e.g. Production Backend"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && name.trim()) handleCreate(); }}
              autoFocus
              className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm text-zinc-800 outline-none focus:border-zinc-400 transition-colors bg-white placeholder:text-neutral-400"
            />
          </div>
          <div className="flex gap-2.5">
            <button
              onClick={handleClose}
              className="flex-1 rounded-full border border-neutral-200 px-4 py-2.5 text-sm text-neutral-600 hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <GlowButton label="Create key" onClick={handleCreate} disabled={!name.trim()} className="flex-1" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="flex items-start gap-3 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3.5">
            <TriangleAlert size={14} className="text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 leading-relaxed">
              Copy this key now for security reasons and keep it somewhere safe.
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-700">Your new API key</label>
            <div className="flex items-stretch gap-2">
              <div className="flex-1 rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 min-w-0">
                <span className="font-mono text-xs text-zinc-600 break-all">{newKey}</span>
              </div>
              <button
                onClick={handleCopy}
                className="shrink-0 flex items-center justify-center w-10 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-400 hover:text-zinc-600 transition-colors cursor-pointer overflow-hidden"
              >
                <span className="relative w-4 h-4">
                  <span style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    opacity: copied ? 0 : 1,
                    filter: copied ? 'blur(6px)' : 'blur(0px)',
                    transform: copied ? 'scale(0.6)' : 'scale(1)',
                    transition: 'opacity 220ms ease, filter 220ms ease, transform 220ms ease',
                  }}>
                    <Copy size={15} />
                  </span>
                  <span style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    opacity: copied ? 1 : 0,
                    filter: copied ? 'blur(0px)' : 'blur(6px)',
                    transform: copied ? 'scale(1)' : 'scale(0.6)',
                    transition: 'opacity 220ms ease, filter 220ms ease, transform 220ms ease',
                  }}>
                    <Check size={15} className="text-green-500" />
                  </span>
                </span>
              </button>
            </div>
          </div>
          <GlowButton label="Done" onClick={handleClose} className="w-full" />
        </div>
      )}
    </Modal>
  );
}
