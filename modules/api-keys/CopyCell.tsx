"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyCell({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  // Show only the first 22 chars; mask the rest
  const display = value.slice(0, 22) + "••••••••••••";

  function handleCopy() {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-xs text-zinc-500 tracking-wide">{display}</span>
      <button
        onClick={handleCopy}
        className="text-neutral-300 hover:text-zinc-500 transition-colors cursor-pointer"
        title="Copy key"
      >
        {copied ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
      </button>
    </div>
  );
}
