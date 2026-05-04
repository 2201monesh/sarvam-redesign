"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import SetupCard from "@/modules/home/SetupCard";

const setupItems = [
  {
    title: "Text Processing Overview",
    description:
      "Sarvam Translate enables high quality translation between English and 22 scheduled Indian languages, optimised for structured, long text.",
    color: "#e0e9fc",
    href: "https://docs.sarvam.ai/api-reference-docs",
  },
  {
    title: "Getting Started with TTS",
    description:
      "Convert any text into natural-sounding speech in seconds. Configure voice, pitch, and pace to match your product's tone and audience.",
    color: "#fde7dd",
    href: "https://docs.sarvam.ai/api-reference-docs/text-to-speech",
  },
  {
    title: "Speech Recognition Setup",
    description:
      "Integrate Saaras into your app to transcribe audio in real time. Supports 10+ Indian languages with high accuracy across accents.",
    color: "#d9ecc8",
    href: "https://docs.sarvam.ai/api-reference-docs/speech-to-text",
  },
  {
    title: "Voice Agent Quickstart",
    description:
      "Build end-to-end voice bots that understand and respond naturally. Connect your backend with Sarvam's agent APIs in minutes.",
    color: "#ffeec7",
    href: "https://docs.sarvam.ai/api-reference-docs/",
  },
  {
    title: "API Key & Authentication",
    description:
      "Generate and manage API keys from your dashboard. Secure every request with token-based auth and monitor usage per key.",
    color: "#f2e6e2",
    href: "https://docs.sarvam.ai/",
  },
];

export default function SetupSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft]   = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateFades = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateFades();
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between pb-6">
        <p className="font-season-mix capitalize font-medium text-3xl mr-6">Learn how to setup?</p>
        <a
          href="https://docs.sarvam.ai/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-neutral-500 bg-neutral-100 hover:text-neutral-800 transition-colors duration-100 cursor-pointer"
        >
          Read documentation
          <ChevronRight size={14} />
        </a>
      </div>

      <div className="relative">
        {/* Left fade */}
        {canScrollLeft && (
          <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10"
            style={{ background: "linear-gradient(to right, rgba(255,255,255,0.95), transparent)" }}
          />
        )}

        {/* Right fade */}
        {canScrollRight && (
          <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10"
            style={{ background: "linear-gradient(to left, rgba(255,255,255,0.95), transparent)" }}
          />
        )}

        <div
          ref={scrollRef}
          onScroll={updateFades}
          className="w-full flex gap-4 overflow-x-auto rounded-xl pt-4 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {setupItems.map((item) => (
            <SetupCard key={item.title} title={item.title} description={item.description} color={item.color} href={item.href} />
          ))}
        </div>
      </div>
    </div>
  );
}
