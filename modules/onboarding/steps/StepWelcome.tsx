import GlowButton from "@/components/GlowButton";
import { StepProps } from "@/modules/onboarding/types";

export default function StepWelcome({ onNext }: StepProps) {
  return (
    <div className="flex flex-col items-center text-center max-w-md mx-auto">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 mb-8">
        <span className="text-sm font-bold text-white">S</span>
      </div>
      <h1 className="text-4xl font-medium font-season-mix mb-4">Welcome to Sarvam AI</h1>
      <p className="text-neutral-500 text-base leading-relaxed mb-10">
        India's AI platform built for Indic languages. Let's get you set up in a few quick steps.
      </p>
      <GlowButton label="Get Started" onClick={onNext} className="w-full max-w-xs" />
    </div>
  );
}
