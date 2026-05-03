"use client";

import { useEffect } from "react";
import { StepProps } from "@/modules/onboarding/types";

export default function StepComplete({ onNext }: StepProps) {
  useEffect(() => {
    const t = setTimeout(onNext, 2000);
    return () => clearTimeout(t);
  }, [onNext]);

  return (
    <div className="flex flex-col items-center text-center max-w-md mx-auto">
      <h2 className="text-4xl font-medium font-season-mix mb-4">You're all set!</h2>
      <p className="text-neutral-500 text-base leading-relaxed">
        Your workspace is ready. Start exploring Sarvam's APIs and build something great.
      </p>
    </div>
  );
}
