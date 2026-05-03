import GlowButton from "@/components/GlowButton";
import { StepProps } from "@/modules/onboarding/types";

export default function StepComplete({ onNext }: StepProps) {
  return (
    <div className="flex flex-col items-center text-center max-w-md mx-auto">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 mb-8">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h2 className="text-4xl font-medium font-season-mix mb-4">You're all set!</h2>
      <p className="text-neutral-500 text-base leading-relaxed mb-10">
        Your workspace is ready. Start exploring Sarvam's APIs and build something great.
      </p>
      <GlowButton label="Go to Dashboard" onClick={onNext} className="w-full max-w-xs" />
    </div>
  );
}
