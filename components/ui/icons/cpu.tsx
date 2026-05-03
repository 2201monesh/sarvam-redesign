"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface CpuIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CpuIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const CORE_VARIANTS: Variants = {
  normal: { scale: 1, opacity: 1 },
  animate: { scale: [1, 1.3, 0.9, 1.1, 1], opacity: [1, 0.6, 1, 0.8, 1], transition: { duration: 0.7, ease: "easeInOut" } },
};

const PINS_VARIANTS: Variants = {
  normal: { opacity: 1 },
  animate: { opacity: [1, 0.4, 1, 0.6, 1], transition: { duration: 0.7, ease: "easeInOut", delay: 0.1 } },
};

const CpuIcon = forwardRef<CpuIconHandle, CpuIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const coreControls = useAnimation();
    const pinsControls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => { coreControls.start("animate"); pinsControls.start("animate"); },
        stopAnimation: () => { coreControls.start("normal"); pinsControls.start("normal"); },
      };
    });

    const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) { onMouseEnter?.(e); } else { coreControls.start("animate"); pinsControls.start("animate"); }
    }, [onMouseEnter, coreControls, pinsControls]);

    const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) { onMouseLeave?.(e); } else { coreControls.start("normal"); pinsControls.start("normal"); }
    }, [coreControls, pinsControls, onMouseLeave]);

    return (
      <div className={cn(className)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
        <svg fill="none" height={size} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width={size}>
          <rect width="16" height="16" x="4" y="4" rx="2" />
          <motion.rect animate={coreControls} height="6" rx="1" style={{ transformOrigin: "12px 12px" }} variants={CORE_VARIANTS} width="6" x="9" y="9" />
          <motion.g animate={pinsControls} variants={PINS_VARIANTS}>
            <path d="M15 2v2M15 20v2M2 15h2M20 15h2M2 9h2M20 9h2M9 2v2M9 20v2" />
          </motion.g>
        </svg>
      </div>
    );
  }
);

CpuIcon.displayName = "CpuIcon";
export { CpuIcon };
