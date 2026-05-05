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
        className="min-h-screen flex transition-opacity duration-500"
        style={{ opacity: showSplash ? 0 : 1 }}
      >
        {/* Left panel */}
        <div className="hidden lg:flex flex-col w-2/5 h-screen sticky top-0 bg-white p-4 relative">
          <div className="relative flex-1 rounded-2xl overflow-hidden bg-[#faf9f7]">

            {/* Amber orb — bottom-left, breathing + drift */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: '80%', height: '60%',
                bottom: '-18%', left: '-18%',
                background: 'radial-gradient(circle, #f5c28a75 0%, transparent 70%)',
                filter: 'blur(2px)',
              }}
              animate={{ scale: [1, 1.18, 0.96, 1], x: [0, 22, -8, 0], y: [0, -18, 10, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
            />

            {/* Periwinkle orb — top-right, breathing + drift */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: '75%', height: '55%',
                top: '-18%', right: '-18%',
                background: 'radial-gradient(circle, #d1defd85 0%, transparent 70%)',
                filter: 'blur(2px)',
              }}
              animate={{ scale: [1, 1.14, 0.97, 1], x: [0, -18, 6, 0], y: [0, 16, -8, 0] }}
              transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.5, repeatType: 'mirror' }}
            />

            {/* Soft centre pulse */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: '45%', height: '35%',
                top: '32%', left: '27%',
                background: 'radial-gradient(circle, #f5c28a40 0%, transparent 70%)',
              }}
              animate={{ scale: [1, 1.22, 1], opacity: [0.45, 0.75, 0.45] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
            />

            {/* Floating dots */}
            {([
              { left: '27%', top: '54%', size: 7,  color: '#f5a347', delay: 0,   dur: 5   },
              { left: '63%', top: '67%', size: 5,  color: '#a0b4f7', delay: 1.3, dur: 7   },
              { left: '44%', top: '36%', size: 4,  color: '#f5c28a', delay: 2.2, dur: 6   },
              { left: '71%', top: '44%', size: 6,  color: '#c5d5fd', delay: 0.7, dur: 8   },
              { left: '17%', top: '30%', size: 3,  color: '#f5a347', delay: 1.9, dur: 5.5 },
              { left: '55%', top: '22%', size: 4,  color: '#d1defd', delay: 3.0, dur: 6.5 },
            ] as const).map((p, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{ width: p.size, height: p.size, left: p.left, top: p.top, backgroundColor: p.color }}
                animate={{ y: [0, -20, 0], opacity: [0.35, 0.7, 0.35] }}
                transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.delay, repeatType: 'mirror' }}
              />
            ))}


            {/* Sarvam wordmark — bottom left */}
            <div className="absolute bottom-7 left-8 z-10 pointer-events-none select-none">
              <span className="text-[2.8rem] font-season-mix font-medium opacity-90 tracking-tight leading-none">
                sarvam
              </span>
            </div>

            {/* Grain texture — top layer */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                mixBlendMode: 'overlay',
                opacity: 0.22,
              }}
            />
          </div>


        </div>

        {/* Right panel — animated step content */}
        <div className="flex-1 min-h-screen flex flex-col items-center justify-center px-8 relative bg-white">
          {/* Progress bar */}
          {showProgress && (
            <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
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
      </div>
    </>
  );
}
