"use client";

import { useRef } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { ChevronRight } from "lucide-react";
import { Volume2Icon, type Volume2IconHandle } from "@/components/ui/icons/volume-2";
import { MicIcon, type MicIconHandle } from "@/components/ui/icons/mic";
import { LanguagesIcon, type LanguagesIconHandle } from "@/components/ui/icons/languages";
import { MessageSquareIcon, type MessageSquareIconHandle } from "@/components/ui/icons/message-square";
import { ZapIcon, type ZapIconHandle } from "@/components/ui/icons/zap";
import { FileTextIcon, type FileTextIconHandle } from "@/components/ui/icons/file-text";
import { SparklesIcon, type SparklesIconHandle } from "@/components/ui/icons/sparkles";
import { CpuIcon, type CpuIconHandle } from "@/components/ui/icons/cpu";

interface FeatureItem {
  title: string;
  model: string;
  category: string;
  description: string;
  href: string;
}

const FEATURES: FeatureItem[] = [
  {
    title: "Text to Speech",
    model: "Bulbul",
    category: "Speech synthesis",
    description: "Convert text into natural, expressive speech across 10+ Indian languages with customisable voice and pace.",
    href: "/docs/tts",
  },
  {
    title: "Speech to Text",
    model: "Saaras",
    category: "Transcription",
    description: "Transcribe live or recorded audio with high accuracy across diverse Indian accents and code-switching.",
    href: "/docs/stt",
  },
  {
    title: "Translate",
    model: "Mayura",
    category: "Translation",
    description: "High-fidelity translation between English and all 22 scheduled Indian languages, optimised for long text.",
    href: "/docs/translate",
  },
  {
    title: "Chat",
    model: "Sarvam-2B",
    category: "Conversational AI",
    description: "Build multilingual conversational experiences with an LLM natively trained on Indic languages and scripts.",
    href: "/docs/chat",
  },
  {
    title: "Voice Agent",
    model: "Shuka",
    category: "Real-time agents",
    description: "Deploy low-latency voice agents that understand and respond in Indian languages end-to-end.",
    href: "/docs/voice-agent",
  },
  {
    title: "Transliteration",
    model: "Lipi",
    category: "Script conversion",
    description: "Convert text seamlessly between Indic scripts and Roman transliteration with phonetic precision.",
    href: "/docs/transliteration",
  },
];

type AnyHandle =
  | Volume2IconHandle
  | MicIconHandle
  | LanguagesIconHandle
  | MessageSquareIconHandle
  | ZapIconHandle
  | FileTextIconHandle
  | SparklesIconHandle
  | CpuIconHandle;

interface CardProps {
  feature: FeatureItem;
  icon: React.ReactNode;
  iconRef: React.RefObject<AnyHandle | null>;
}

function FeatureCompactCard({ feature, icon, iconRef }: CardProps) {
  return (
    <div
      className="group flex flex-col gap-4 p-5 border border-neutral-200 rounded-xl cursor-pointer hover:bg-neutral-50 active:scale-[0.98] transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
      onMouseEnter={() => (iconRef.current as AnyHandle)?.startAnimation()}
      onMouseLeave={() => (iconRef.current as AnyHandle)?.stopAnimation()}
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-700 shrink-0">
          {icon}
        </div>
        <GoArrowUpRight
          size={15}
          className="text-neutral-300 group-hover:text-neutral-500 transition-colors duration-150 mt-0.5 shrink-0"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-2">
          <p className="text-sm font-medium text-neutral-900">{feature.title}</p>
          <span className="text-xs text-neutral-400">{feature.model}</span>
        </div>
        <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">{feature.description}</p>
      </div>

      {/* Category tag */}
      <div className="mt-auto">
        <span className="inline-block text-[11px] text-neutral-400 bg-neutral-100 rounded-full px-2.5 py-0.5 leading-none">
          {feature.category}
        </span>
      </div>
    </div>
  );
}

export default function FeaturesShowcase() {
  const ttsRef    = useRef<Volume2IconHandle>(null);
  const sttRef    = useRef<MicIconHandle>(null);
  const transRef  = useRef<LanguagesIconHandle>(null);
  const chatRef   = useRef<MessageSquareIconHandle>(null);
  const agentRef  = useRef<ZapIconHandle>(null);
  const litRef    = useRef<FileTextIconHandle>(null);

  const cards: Omit<CardProps, "feature">[] = [
    { icon: <Volume2Icon   ref={ttsRef}   size={18} />, iconRef: ttsRef   },
    { icon: <MicIcon       ref={sttRef}   size={18} />, iconRef: sttRef   },
    { icon: <LanguagesIcon ref={transRef} size={18} />, iconRef: transRef },
    { icon: <MessageSquareIcon ref={chatRef} size={18} />, iconRef: chatRef },
    { icon: <ZapIcon       ref={agentRef} size={18} />, iconRef: agentRef },
    { icon: <FileTextIcon  ref={litRef}   size={18} />, iconRef: litRef   },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <p className="font-season-mix capitalize font-medium text-2xl">Recommended models</p>
        <button className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-neutral-500 bg-neutral-100 hover:text-neutral-800 transition-colors duration-150 cursor-pointer">
          Explore docs
          <ChevronRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {FEATURES.map((feature, i) => (
          <FeatureCompactCard
            key={feature.title}
            feature={feature}
            icon={cards[i].icon}
            iconRef={cards[i].iconRef}
          />
        ))}
      </div>
    </div>
  );
}
