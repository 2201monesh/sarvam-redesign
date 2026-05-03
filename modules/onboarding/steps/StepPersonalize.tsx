import GlowButton from "@/components/GlowButton";
import Select from "@/components/Select";
import { HEARD_FROM_OPTIONS, LANGUAGES } from "@/modules/onboarding/constants";
import { StepProps } from "@/modules/onboarding/types";

const inputClass =
  "w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm text-zinc-800 outline-none focus:border-zinc-400 transition-colors duration-150 bg-white placeholder:text-neutral-400";

const languageOptions = LANGUAGES.map((l) => ({ value: l, label: l }));
const heardFromOptions = HEARD_FROM_OPTIONS.map((o) => ({ value: o.id, label: o.label }));

export default function StepPersonalize({ state, onChange, onNext, onBack }: StepProps) {
  return (
    <div className="flex flex-col max-w-lg mx-auto w-full">
      <h2 className="text-3xl font-medium font-season-mix mb-2 text-center">Personalise your experience</h2>
      <p className="text-neutral-500 text-sm text-center mb-8">Tell us a little about yourself to get started.</p>

      <div className="flex flex-col gap-4 mb-10">

        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700">Your name</label>
          <input
            type="text"
            placeholder="e.g. Monesh"
            value={state.name}
            onChange={(e) => onChange({ name: e.target.value })}
            className={inputClass}
          />
        </div>

        {/* Preferred language */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700">Preferred language</label>
          <Select
            options={languageOptions}
            value={state.preferredLanguage}
            onChange={(v) => onChange({ preferredLanguage: v })}
            placeholder="Select a language"
          />
        </div>

        {/* How did you hear about us (optional) */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-700">
            How did you hear about us <span className="text-neutral-400 font-normal">(optional)</span>
          </label>
          <Select
            options={heardFromOptions}
            value={state.heardFrom}
            onChange={(v) => onChange({ heardFrom: v })}
            placeholder="Select an option"
          />
        </div>

      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 rounded-full border border-neutral-200 px-6 py-3 text-sm text-neutral-600 hover:bg-neutral-50 transition-colors duration-150 cursor-pointer"
        >
          Back
        </button>
        <GlowButton
          label="Continue"
          onClick={onNext}
          disabled={!state.name.trim() || !state.preferredLanguage}
          className="flex-1"
        />
      </div>
    </div>
  );
}
