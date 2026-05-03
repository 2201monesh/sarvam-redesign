"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface LanguagesIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface LanguagesIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const LEFT_VARIANTS: Variants = {
  normal: { rotate: 0, y: 0 },
  animate: { rotate: [0, -8, 6, -3, 0], y: [0, -1, 0], transition: { duration: 0.7, ease: "easeInOut" } },
};

const RIGHT_VARIANTS: Variants = {
  normal: { rotate: 0, y: 0 },
  animate: { rotate: [0, 8, -6, 3, 0], y: [0, 1, 0], transition: { duration: 0.7, ease: "easeInOut", delay: 0.1 } },
};

const LanguagesIcon = forwardRef<LanguagesIconHandle, LanguagesIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const leftControls = useAnimation();
    const rightControls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => { leftControls.start("animate"); rightControls.start("animate"); },
        stopAnimation: () => { leftControls.start("normal"); rightControls.start("normal"); },
      };
    });

    const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) { onMouseEnter?.(e); } else { leftControls.start("animate"); rightControls.start("animate"); }
    }, [onMouseEnter, leftControls, rightControls]);

    const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) { onMouseLeave?.(e); } else { leftControls.start("normal"); rightControls.start("normal"); }
    }, [leftControls, rightControls, onMouseLeave]);

    return (
      <div className={cn(className)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
        <svg fill="none" height={size} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width={size}>
          <motion.g animate={leftControls} style={{ transformOrigin: "7px 7px" }} variants={LEFT_VARIANTS}>
            <path d="m5 8 6 6" />
            <path d="m4 14 6-6 2-3" />
            <path d="M2 5h12" />
            <path d="M7 2h1" />
          </motion.g>
          <motion.g animate={rightControls} style={{ transformOrigin: "17px 18px" }} variants={RIGHT_VARIANTS}>
            <path d="m22 22-5-10-5 10" />
            <path d="M14 18h6" />
          </motion.g>
        </svg>
      </div>
    );
  }
);

LanguagesIcon.displayName = "LanguagesIcon";
export { LanguagesIcon };
