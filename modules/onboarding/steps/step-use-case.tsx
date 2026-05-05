"use client";

import GlowButton from "@/components/glow-button";
import { USE_CASES } from "@/modules/onboarding/constants";
import { StepProps } from "@/modules/onboarding/types";
import { playSelectClick } from "@/lib/sounds";
import {
  VoiceAppIcon,
  ChatbotIcon,
  TranscriptionIcon,
  TranslationIcon,
  EdTechIcon,
  OtherIcon,
} from "@/modules/onboarding/use-case-icons";

const ICON_MAP: Record<string, React.ReactNode> = {
  voice_app:     <VoiceAppIcon />,
  chatbot:       <ChatbotIcon />,
  transcription: <TranscriptionIcon />,
  translation:   <TranslationIcon />,
  edtech:        <EdTechIcon />,
  other:         <OtherIcon />,
};

export default function StepUseCase({ state, onChange, onNext, onBack }: StepProps) {
  return (
    <div className="flex flex-col max-w-lg mx-auto w-full">
      <h2 className="text-3xl font-medium font-season-mix mb-2 text-center">What are you building?</h2>
      <p className="text-neutral-500 text-sm text-center mb-8">Select the option that fits your primary use case.</p>

      <div className="grid grid-cols-2 gap-3 mb-10">
        {USE_CASES.map((u) => (
          <button
            key={u.id}
            onClick={() => { playSelectClick(); onChange({ useCase: u.id }); }}
            className={`rounded-xl border px-5 py-5 text-left font-medium transition-colors duration-150 cursor-pointer ${
              state.useCase === u.id
                ? "border-transparent bg-zinc-50 text-zinc-900 outline outline-2 outline-zinc-900 outline-offset-1"
                : "border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:text-zinc-800"
            }`}
          >
            <div className="flex flex-col gap-3">
              {ICON_MAP[u.id]}
              <span className="text-sm">{u.label}</span>
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
