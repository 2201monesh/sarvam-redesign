"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface Volume2IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Volume2IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const SPEAKER_VARIANTS: Variants = {
  normal: { x: 0 },
  animate: { x: [0, -1, 0.5, 0], transition: { duration: 0.4, ease: "easeInOut" } },
};

const WAVE1_VARIANTS: Variants = {
  normal: { opacity: 1, scale: 1 },
  animate: { opacity: [1, 0.3, 1], scale: [1, 1.1, 1], transition: { duration: 0.6, ease: "easeInOut", delay: 0.05 } },
};

const WAVE2_VARIANTS: Variants = {
  normal: { opacity: 1, scale: 1 },
  animate: { opacity: [1, 0.3, 1], scale: [1, 1.12, 1], transition: { duration: 0.6, ease: "easeInOut", delay: 0.15 } },
};

const Volume2Icon = forwardRef<Volume2IconHandle, Volume2IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const speakerControls = useAnimation();
    const wave1Controls = useAnimation();
    const wave2Controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => { speakerControls.start("animate"); wave1Controls.start("animate"); wave2Controls.start("animate"); },
        stopAnimation: () => { speakerControls.start("normal"); wave1Controls.start("normal"); wave2Controls.start("normal"); },
      };
    });

    const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) { onMouseEnter?.(e); } else { speakerControls.start("animate"); wave1Controls.start("animate"); wave2Controls.start("animate"); }
    }, [onMouseEnter, speakerControls, wave1Controls, wave2Controls]);

    const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) { onMouseLeave?.(e); } else { speakerControls.start("normal"); wave1Controls.start("normal"); wave2Controls.start("normal"); }
    }, [speakerControls, wave1Controls, wave2Controls, onMouseLeave]);

    return (
      <div className={cn(className)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
        <svg fill="none" height={size} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width={size}>
          <motion.path
            animate={speakerControls}
            d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"
            variants={SPEAKER_VARIANTS}
          />
          <motion.path animate={wave1Controls} d="M16 9a5 5 0 0 1 0 6" style={{ transformOrigin: "16px 12px" }} variants={WAVE1_VARIANTS} />
          <motion.path animate={wave2Controls} d="M19.364 18.364a10 10 0 0 0 0-12.728" style={{ transformOrigin: "19px 12px" }} variants={WAVE2_VARIANTS} />
        </svg>
      </div>
    );
  }
);

Volume2Icon.displayName = "Volume2Icon";
export { Volume2Icon };
