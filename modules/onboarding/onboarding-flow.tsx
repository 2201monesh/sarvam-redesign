"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { TOTAL_STEPS } from "@/modules/onboarding/constants";
import { markOnboardingComplete, saveUserName } from "@/modules/onboarding/helpers/useOnboardingStorage";
import { OnboardingState } from "@/modules/onboarding/types";
import SplashScreen    from "@/modules/onboarding/splash-screen";
import StepWelcome     from "@/modules/onboarding/steps/step-welcome";
import StepPersonalize from "@/modules/onboarding/steps/step-personalize";
import StepRole        from "@/modules/onboarding/steps/step-role";
import StepUseCase     from "@/modules/onboarding/steps/step-use-case";
import StepLanguage    from "@/modules/onboarding/steps/step-language";
import StepComplete    from "@/modules/onboarding/steps/step-complete";

const stepVariants = {
  initial: (dir: number) => ({ opacity: 0, y: dir * 14 }),
  animate: { opacity: 1, y: 0 },
  exit:    (dir: number) => ({ opacity: 0, y: dir * -14 }),
};

const STEP_WELCOME     = 0;
const STEP_PERSONALIZE = 1;
const STEP_ROLE        = 2;
const STEP_USECASE     = 3;
const STEP_LANGUAGE    = 4;
const STEP_COMPLETE    = 5;

export default function OnboardingFlow() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);
  const [step, setStep] = useState(STEP_WELCOME);
  const [direction, setDirection] = useState(1);
  const [state, setState] = useState<OnboardingState>({
    name: "", heardFrom: "", preferredLanguage: "",
    role: "", useCase: "", languages: [],
  });

  const onChange = useCallback((patch: Partial<OnboardingState>) => {
    setState((prev) => ({ ...prev, ...patch }));
  }, []);

  const onNext = useCallback(() => {
    if (step === STEP_COMPLETE) {
      saveUserName(state.name);
      markOnboardingComplete();
      router.push("/home");
      return;
    }
    setDirection(1);
    setStep((s) => s + 1);
  }, [step, router]);

  const onBack = useCallback(() => {
    setDirection(-1);
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
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={step}
              custom={direction}
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.22, ease: [0.25, 0, 0, 1] }}
              className="w-full"
            >
              {step === STEP_WELCOME     && <StepWelcome     {...stepProps} />}
              {step === STEP_PERSONALIZE && <StepPersonalize {...stepProps} />}
              {step === STEP_ROLE        && <StepRole        {...stepProps} />}
              {step === STEP_USECASE     && <StepUseCase     {...stepProps} />}
              {step === STEP_LANGUAGE    && <StepLanguage    {...stepProps} />}
              {step === STEP_COMPLETE    && <StepComplete    {...stepProps} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
