"use client";

import { useRef } from "react";
import GlowButton from "@/components/glow-button";
import { USE_CASES } from "@/modules/onboarding/constants";
import { StepProps } from "@/modules/onboarding/types";
import { playSelectClick } from "@/lib/sounds";
import { MicIcon, type MicIconHandle } from "@/components/ui/icons/mic";
import { MessageSquareIcon, type MessageSquareIconHandle } from "@/components/ui/icons/message-square";
import { FileTextIcon, type FileTextIconHandle } from "@/components/ui/icons/file-text";
import { LanguagesIcon, type LanguagesIconHandle } from "@/components/ui/icons/languages";
import { BookOpenIcon, type BookOpenIconHandle } from "@/components/ui/icons/book-open";
import { ZapIcon, type ZapIconHandle } from "@/components/ui/icons/zap";

type AnyHandle = { startAnimation: () => void; stopAnimation: () => void };

export default function StepUseCase({ state, onChange, onNext, onBack }: StepProps) {
  const voiceRef       = useRef<MicIconHandle>(null);
  const chatbotRef     = useRef<MessageSquareIconHandle>(null);
  const transcriptRef  = useRef<FileTextIconHandle>(null);
  const translationRef = useRef<LanguagesIconHandle>(null);
  const edtechRef      = useRef<BookOpenIconHandle>(null);
  const otherRef       = useRef<ZapIconHandle>(null);

  const iconRefs: Record<string, React.RefObject<AnyHandle | null>> = {
    voice_app:     voiceRef,
    chatbot:       chatbotRef,
    transcription: transcriptRef,
    translation:   translationRef,
    edtech:        edtechRef,
    other:         otherRef,
  };

  const renderIcon = (id: string) => {
    switch (id) {
      case "voice_app":     return <MicIcon ref={voiceRef} size={17} />;
      case "chatbot":       return <MessageSquareIcon ref={chatbotRef} size={17} />;
      case "transcription": return <FileTextIcon ref={transcriptRef} size={17} />;
      case "translation":   return <LanguagesIcon ref={translationRef} size={17} />;
      case "edtech":        return <BookOpenIcon ref={edtechRef} size={17} />;
      case "other":         return <ZapIcon ref={otherRef} size={17} />;
      default:              return null;
    }
  };

  return (
    <div className="flex flex-col max-w-lg mx-auto w-full">
      <h2 className="text-3xl font-medium font-season-mix mb-2 text-center">What are you building?</h2>
      <p className="text-neutral-500 text-sm text-center mb-8">Select the option that fits your primary use case.</p>

      <div className="grid grid-cols-2 gap-3 mb-10">
        {USE_CASES.map((u) => (
          <button
            key={u.id}
            onClick={() => { playSelectClick(); onChange({ useCase: u.id }); }}
            onMouseEnter={() => iconRefs[u.id].current?.startAnimation()}
            onMouseLeave={() => iconRefs[u.id].current?.stopAnimation()}
            className={`rounded-xl border px-5 py-4 text-left text-sm font-medium transition-colors duration-100 cursor-pointer ${
              state.useCase === u.id
                ? "border-transparent bg-zinc-50 text-zinc-900 outline outline-2 outline-zinc-900 outline-offset-1"
                : "border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:text-zinc-800"
            }`}
          >
            <div className="flex flex-col gap-2.5">
              {renderIcon(u.id)}
              {u.label}
            </div>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 rounded-full border border-neutral-200 px-6 py-3 text-sm text-neutral-600 hover:bg-neutral-50 transition-colors duration-150 cursor-pointer">
          Back
        </button>
        <GlowButton label="Continue" onClick={onNext} disabled={!state.useCase} className="flex-1" />
      </div>
    </div>
  );
}
