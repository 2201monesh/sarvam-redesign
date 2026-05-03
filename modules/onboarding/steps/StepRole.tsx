"use client";

import { useRef } from "react";
import GlowButton from "@/components/GlowButton";
import { ROLES } from "@/modules/onboarding/constants";
import { StepProps } from "@/modules/onboarding/types";
import { playSelectClick } from "@/lib/sounds";
import { TerminalIcon, type TerminalIconHandle } from "@/components/ui/icons/terminal";
import { LayoutGridIcon, type LayoutGridIconHandle } from "@/components/ui/icons/layout-grid";
import { FlaskIcon, type FlaskIconHandle } from "@/components/ui/icons/flask";
import { BriefcaseBusinessIcon, type BriefcaseBusinessIconHandle } from "@/components/ui/icons/briefcase-business";
import { GraduationCapIcon, type GraduationCapIconHandle } from "@/components/ui/icons/graduation-cap";
import { SparklesIcon, type SparklesIconHandle } from "@/components/ui/icons/sparkles";

type AnyHandle = { startAnimation: () => void; stopAnimation: () => void };

export default function StepRole({ state, onChange, onNext, onBack }: StepProps) {
  const developerRef = useRef<TerminalIconHandle>(null);
  const productRef   = useRef<LayoutGridIconHandle>(null);
  const researcherRef = useRef<FlaskIconHandle>(null);
  const businessRef  = useRef<BriefcaseBusinessIconHandle>(null);
  const studentRef   = useRef<GraduationCapIconHandle>(null);
  const otherRef     = useRef<SparklesIconHandle>(null);

  const iconRefs: Record<string, React.RefObject<AnyHandle | null>> = {
    developer:  developerRef,
    product:    productRef,
    researcher: researcherRef,
    business:   businessRef,
    student:    studentRef,
    other:      otherRef,
  };

  const renderIcon = (id: string) => {
    switch (id) {
      case "developer":  return <TerminalIcon ref={developerRef} size={17} />;
      case "product":    return <LayoutGridIcon ref={productRef} size={17} />;
      case "researcher": return <FlaskIcon ref={researcherRef} size={17} />;
      case "business":   return <BriefcaseBusinessIcon ref={businessRef} size={17} />;
      case "student":    return <GraduationCapIcon ref={studentRef} size={17} />;
      case "other":      return <SparklesIcon ref={otherRef} size={17} />;
      default:           return null;
    }
  };

  return (
    <div className="flex flex-col max-w-lg mx-auto w-full">
      <h2 className="text-3xl font-medium font-season-mix mb-2 text-center">What best describes you?</h2>
      <p className="text-neutral-500 text-sm text-center mb-8">This helps us personalise your experience.</p>

      <div className="grid grid-cols-2 gap-3 mb-10">
        {ROLES.map((r) => (
          <button
            key={r.id}
            onClick={() => { playSelectClick(); onChange({ role: r.id }); }}
            onMouseEnter={() => iconRefs[r.id].current?.startAnimation()}
            onMouseLeave={() => iconRefs[r.id].current?.stopAnimation()}
            className={`rounded-xl border px-5 py-4 text-left text-sm font-medium transition-colors duration-100 cursor-pointer ${
              state.role === r.id
                ? "border-transparent bg-zinc-50 text-zinc-900 outline outline-2 outline-zinc-900 outline-offset-1"
                : "border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:text-zinc-800"
            }`}
          >
            <div className="flex flex-col gap-2.5">
              {renderIcon(r.id)}
              {r.label}
            </div>
          </button>
        ))}
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
