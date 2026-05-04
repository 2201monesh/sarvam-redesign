"use client";

import { useState } from "react";
import { Copy, Check, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CODE_LINES, PLAIN_CODE } from "../data/quickstartCode";

export default function DeveloperQuickstart() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(PLAIN_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="w-full flex flex-col lg:flex-row gap-10 items-stretch">

      {/* Left — text pinned to bottom */}
      <div className="w-full lg:w-[36%] flex flex-col justify-start gap-4 shrink-0">
        <div className="flex flex-col gap-3">
          <p className="text-3xl font-season-mix font-medium leading-snug">Developer Quickstart</p>
          <p className="text-sm text-neutral-500 leading-relaxed">
            Integrate Sarvam's speech, translation, and language APIs into your app in minutes. Simple REST endpoints, consistent responses.
          </p>
        </div>
        <button
          className="relative isolate overflow-hidden bg-black text-white rounded-full px-5 text-sm py-2.5 font-season-mix cursor-pointer focus:outline-none outline-none w-fit flex items-center gap-2"
          style={{ boxShadow: "inset 0 0 12px rgba(255,255,255,0.55), inset 0 0 30px rgba(255,255,255,0.25)" }}
        >
          <span className="absolute inset-0 rounded-full pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.12) 0%, transparent 55%)" }} />
          <span className="relative z-10 flex items-center gap-2">Get started <ArrowRight size={13} /></span>
        </button>
      </div>

      {/* Right — light code editor */}
      <div className="w-full lg:w-[46%] lg:ml-auto min-w-0 shrink-0">
        <div className="rounded-2xl overflow-hidden border border-neutral-200">

          {/* Editor top bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-50 border-b border-neutral-200">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-200" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-200" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-200" />
              </div>
              <span className="text-xs text-neutral-400 font-mono">quickstart.py</span>
            </div>
            <motion.button
              onClick={handleCopy}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", duration: 0.3, bounce: 0 }}
              className="flex items-center justify-center gap-1.5 text-xs text-neutral-400 hover:text-zinc-600 transition-colors cursor-pointer rounded-md px-2 py-1.5"
            >
              <span className="relative w-3 h-3 flex items-center justify-center">
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
                      <Copy size={12} />
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
                      <Check size={12} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
              <span style={{ position: "relative", display: "inline-flex", width: "42px", height: "1em", alignItems: "center", overflow: "hidden" }}>
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.span
                    key={copied ? "copied-text" : "copy-text"}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                    style={{ position: "absolute", left: 0, whiteSpace: "nowrap" }}
                  >
                    {copied ? "Copied" : "Copy"}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.button>
          </div>

          {/* Code body */}
          <div className="bg-white px-5 py-4 overflow-x-auto">
            <pre className="text-[11px] font-mono leading-[1.8] [&::-webkit-scrollbar]:hidden">
              {CODE_LINES.map((line, i) => (
                <div key={i}>
                  {line.tokens.length === 0
                    ? <span>&nbsp;</span>
                    : line.tokens.map((token, j) => (
                        <span key={j} style={{ color: token.color }}>{token.text}</span>
                      ))
                  }
                </div>
              ))}
            </pre>
          </div>

        </div>
      </div>

    </div>
  );
}
