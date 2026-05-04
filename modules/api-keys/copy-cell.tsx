"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function CopyCell({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const display = value.slice(0, 22) + "••••••••••••";

  function handleCopy() {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-xs text-zinc-500 tracking-wide">{display}</span>
      <motion.button
        onClick={handleCopy}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", duration: 0.3, bounce: 0 }}
        className="text-neutral-300 hover:text-zinc-500 transition-colors cursor-pointer"
        title="Copy key"
      >
        <span className="relative w-3.5 h-3.5 flex items-center justify-center">
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
                <Copy size={13} />
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
                <Check size={13} />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </motion.button>
    </div>
  );
}
