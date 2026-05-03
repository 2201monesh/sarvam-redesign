"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface MicIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MicIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const MIC_VARIANTS: Variants = {
  normal: { scaleX: 1, scaleY: 1 },
  animate: { scaleX: [1, 1.12, 0.95, 1.05, 1], scaleY: [1, 0.92, 1.08, 0.97, 1], transition: { duration: 0.6, ease: "easeInOut" } },
};

const ARC_VARIANTS: Variants = {
  normal: { scaleX: 1, scaleY: 1, opacity: 1 },
  animate: { scaleX: [1, 1.18, 1], scaleY: [1, 1.18, 1], opacity: [1, 0.5, 1], transition: { duration: 0.6, ease: "easeInOut" } },
};

const MicIcon = forwardRef<MicIconHandle, MicIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const micControls = useAnimation();
    const arcControls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => { micControls.start("animate"); arcControls.start("animate"); },
        stopAnimation: () => { micControls.start("normal"); arcControls.start("normal"); },
      };
    });

    const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) { onMouseEnter?.(e); } else { micControls.start("animate"); arcControls.start("animate"); }
    }, [onMouseEnter, micControls, arcControls]);

    const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) { onMouseLeave?.(e); } else { micControls.start("normal"); arcControls.start("normal"); }
    }, [micControls, arcControls, onMouseLeave]);

    return (
      <div className={cn(className)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
        <svg fill="none" height={size} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width={size}>
          <motion.path animate={micControls} d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" style={{ transformOrigin: "12px 9px" }} variants={MIC_VARIANTS} />
          <motion.path animate={arcControls} d="M19 10v2a7 7 0 0 1-14 0v-2" style={{ transformOrigin: "12px 13px" }} variants={ARC_VARIANTS} />
          <line x1="12" x2="12" y1="19" y2="22" />
        </svg>
      </div>
    );
  }
);

MicIcon.displayName = "MicIcon";
export { MicIcon };
