import GlowButton from "@/components/GlowButton";
import { LANGUAGES } from "@/modules/onboarding/constants";
import { StepProps } from "@/modules/onboarding/types";

export default function StepLanguage({ state, onChange, onNext, onBack }: StepProps) {
  const toggle = (lang: string) => {
    const current = state.languages;
    const updated = current.includes(lang)
      ? current.filter((l) => l !== lang)
      : [...current, lang];
    onChange({ languages: updated });
  };

  return (
    <div className="flex flex-col max-w-lg mx-auto w-full">
      <h2 className="text-3xl font-medium font-season-mix mb-2 text-center">Which languages do you work with?</h2>
      <p className="text-neutral-500 text-sm text-center mb-8">Select all that apply. You can change this later.</p>

      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {LANGUAGES.map((lang) => {
          const selected = state.languages.includes(lang);
          return (
            <button
              key={lang}
              onClick={() => toggle(lang)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors duration-100 cursor-pointer ${
                selected
                  ? "border-zinc-900 bg-zinc-900 text-white"
                  : "border-neutral-200 text-neutral-600 hover:border-neutral-400 hover:text-zinc-800"
              }`}
            >
              {lang}
            </button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 rounded-full border border-neutral-200 px-6 py-3 text-sm text-neutral-600 hover:bg-neutral-50 transition-colors duration-150 cursor-pointer">
          Back
        </button>
        <GlowButton label="Continue" onClick={onNext} disabled={state.languages.length === 0} className="flex-1" />
      </div>
    </div>
  );
}
