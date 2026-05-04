"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

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
        <motion.button
          onClick={handleCopy}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", duration: 0.3, bounce: 0 }}
          className="shrink-0 flex items-center justify-center w-9 h-9 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-400 hover:text-zinc-600 transition-colors cursor-pointer"
        >
          <span className="relative w-4 h-4 flex items-center justify-center">
            <AnimatePresence initial={false} mode="popLayout">
              {!copied ? (
                <motion.span
                  key="copy-icon"
                  initial={{ scale: 0.25, opacity: 0, filter: "blur(4px)" }}
                  animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                  exit={{ scale: 0.25, opacity: 0, filter: "blur(4px)" }}
                  transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                  style={{ position: "absolute", display: "flex" }}
                >
                  <Copy size={15} />
                </motion.span>
              ) : (
                <motion.span
                  key="check-icon"
                  initial={{ scale: 0.25, opacity: 0, filter: "blur(4px)" }}
                  animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                  exit={{ scale: 0.25, opacity: 0, filter: "blur(4px)" }}
                  transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                  style={{ position: "absolute", display: "flex" }}
                >
                  <Check size={15} />
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </motion.button>
      </div>
    </div>
  );
}
