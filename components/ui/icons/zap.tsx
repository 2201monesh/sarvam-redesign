"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface ZapIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ZapIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const ZAP_VARIANTS: Variants = {
  normal: { scale: 1, opacity: 1, fill: "none" },
  animate: {
    scale: [1, 1.2, 0.9, 1.05, 1],
    opacity: [1, 0.7, 1, 0.85, 1],
    fill: ["none", "currentColor", "none"],
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const ZapIcon = forwardRef<ZapIconHandle, ZapIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return { startAnimation: () => controls.start("animate"), stopAnimation: () => controls.start("normal") };
    });

    const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) { onMouseEnter?.(e); } else { controls.start("animate"); }
    }, [onMouseEnter, controls]);

    const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) { onMouseLeave?.(e); } else { controls.start("normal"); }
    }, [controls, onMouseLeave]);

    return (
      <div className={cn(className)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
        <svg fill="none" height={size} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width={size}>
          <motion.path
            animate={controls}
            d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"
            style={{ transformOrigin: "12px 12px" }}
            variants={ZAP_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

ZapIcon.displayName = "ZapIcon";
export { ZapIcon };
