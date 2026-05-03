"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { TOTAL_STEPS } from "@/modules/onboarding/constants";
import { markOnboardingComplete } from "@/modules/onboarding/hooks/useOnboardingStorage";
import { OnboardingState } from "@/modules/onboarding/types";
import SplashScreen from "@/modules/onboarding/SplashScreen";
import StepWelcome  from "@/modules/onboarding/steps/StepWelcome";
import StepRole     from "@/modules/onboarding/steps/StepRole";
import StepUseCase  from "@/modules/onboarding/steps/StepUseCase";
import StepLanguage from "@/modules/onboarding/steps/StepLanguage";
import StepComplete from "@/modules/onboarding/steps/StepComplete";

const STEP_WELCOME  = 0;
const STEP_ROLE     = 1;
const STEP_USECASE  = 2;
const STEP_LANGUAGE = 3;
const STEP_COMPLETE = 4;

export default function OnboardingFlow() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);
  const [step, setStep] = useState(STEP_WELCOME);
  const [state, setState] = useState<OnboardingState>({
    role: "", useCase: "", languages: [],
  });

  const onChange = useCallback((patch: Partial<OnboardingState>) => {
    setState((prev) => ({ ...prev, ...patch }));
  }, []);

  const onNext = useCallback(() => {
    if (step === STEP_COMPLETE) {
      markOnboardingComplete();
      router.push("/home");
      return;
    }
    setStep((s) => s + 1);
  }, [step, router]);

  const onBack = useCallback(() => {
    setStep((s) => Math.max(0, s - 1));
  }, []);

  const stepProps = { state, onChange, onNext, onBack, step };

  const showProgress = step > STEP_WELCOME && step < STEP_COMPLETE;
  const progressStep = step; // 1-based progress shown for steps 1–3

  return (
    <>
      {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}

      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 bg-white transition-opacity duration-500"
        style={{ opacity: showSplash ? 0 : 1 }}
      >
        {/* Progress bar */}
        {showProgress && (
          <div className="fixed top-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i < progressStep ? "w-8 bg-zinc-900" : "w-4 bg-neutral-200"
                }`}
              />
            ))}
          </div>
        )}

        {/* Step content */}
        <div className="w-full max-w-lg">
          {step === STEP_WELCOME  && <StepWelcome  {...stepProps} />}
          {step === STEP_ROLE     && <StepRole     {...stepProps} />}
          {step === STEP_USECASE  && <StepUseCase  {...stepProps} />}
          {step === STEP_LANGUAGE && <StepLanguage {...stepProps} />}
          {step === STEP_COMPLETE && <StepComplete {...stepProps} />}
        </div>
      </div>
    </>
  );
}
