"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function UrlRow({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="flex flex-col gap-3 px-5 py-5">
      <p className="text-xs text-neutral-400 leading-relaxed">
        Use this URL as the base for all REST API requests to your project.
      </p>
      <div className="flex items-center gap-2">
        <div className="flex-1 flex items-center rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 min-w-0">
          <span className="font-mono text-xs text-zinc-600 truncate">{url}</span>
        </div>
        <button
          onClick={handleCopy}
          className="shrink-0 flex items-center justify-center w-9 h-9 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-400 hover:text-zinc-600 transition-colors cursor-pointer overflow-hidden"
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
  );
}
