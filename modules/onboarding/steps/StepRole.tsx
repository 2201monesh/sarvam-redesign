import { Code2, LayoutDashboard, FlaskConical, Briefcase, GraduationCap, Sparkles, LucideIcon } from "lucide-react";
import GlowButton from "@/components/GlowButton";
import { ROLES } from "@/modules/onboarding/constants";
import { StepProps } from "@/modules/onboarding/types";
import { playSelectClick } from "@/lib/sounds";

const ROLE_ICONS: Record<string, LucideIcon> = {
  developer:  Code2,
  product:    LayoutDashboard,
  researcher: FlaskConical,
  business:   Briefcase,
  student:    GraduationCap,
  other:      Sparkles,
};

export default function StepRole({ state, onChange, onNext, onBack }: StepProps) {
  return (
    <div className="flex flex-col max-w-lg mx-auto w-full">
      <h2 className="text-3xl font-medium font-season-mix mb-2 text-center">What best describes you?</h2>
      <p className="text-neutral-500 text-sm text-center mb-8">This helps us personalise your experience.</p>

      <div className="grid grid-cols-2 gap-3 mb-10">
        {ROLES.map((r) => {
          const Icon = ROLE_ICONS[r.id];
          return (
            <button
              key={r.id}
              onClick={() => { playSelectClick(); onChange({ role: r.id }); }}
              className={`rounded-xl border px-5 py-4 text-left text-sm font-medium transition-colors duration-100 cursor-pointer ${
                state.role === r.id
                  ? "border-zinc-900 bg-zinc-50 text-zinc-900"
                  : "border-neutral-200 text-neutral-600 hover:border-neutral-400 hover:text-zinc-800"
              }`}
            >
              <div className="flex flex-col gap-2.5">
                <Icon size={17} strokeWidth={1.75} />
                {r.label}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 rounded-full border border-neutral-200 px-6 py-3 text-sm text-neutral-600 hover:bg-neutral-50 transition-colors duration-150 cursor-pointer">
          Back
        </button>
        <GlowButton label="Continue" onClick={onNext} disabled={!state.role} className="flex-1" />
      </div>
    </div>
  );
}
