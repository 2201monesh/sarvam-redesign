"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface LayoutGridIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface LayoutGridIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const R1: Variants = { normal: { translateX: 0 }, animate: { translateX: [0, 11, 11, 0], transition: { duration: 0.8, ease: "easeInOut", times: [0, 0.4, 0.6, 1] } } };
const R2: Variants = { normal: { translateY: 0 }, animate: { translateY: [0, 11, 11, 0], transition: { duration: 0.8, ease: "easeInOut", times: [0, 0.4, 0.6, 1] } } };
const R3: Variants = { normal: { translateX: 0 }, animate: { translateX: [0, -11, -11, 0], transition: { duration: 0.8, ease: "easeInOut", times: [0, 0.4, 0.6, 1] } } };
const R4: Variants = { normal: { translateY: 0 }, animate: { translateY: [0, -11, -11, 0], transition: { duration: 0.8, ease: "easeInOut", times: [0, 0.4, 0.6, 1] } } };

const LayoutGridIcon = forwardRef<LayoutGridIconHandle, LayoutGridIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return { startAnimation: () => controls.start("animate"), stopAnimation: () => controls.start("normal") };
    });

    const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) { onMouseEnter?.(e); } else { controls.start("animate"); }
    }, [controls, onMouseEnter]);

    const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) { onMouseLeave?.(e); } else { controls.start("normal"); }
    }, [controls, onMouseLeave]);

    return (
      <div className={cn(className)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
        <svg fill="none" height={size} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width={size}>
          <motion.rect animate={controls} height="7" initial="normal" rx="1" variants={R1} width="7" x="3" y="3" />
          <motion.rect animate={controls} height="7" initial="normal" rx="1" variants={R2} width="7" x="14" y="3" />
          <motion.rect animate={controls} height="7" initial="normal" rx="1" variants={R3} width="7" x="14" y="14" />
          <motion.rect animate={controls} height="7" initial="normal" rx="1" variants={R4} width="7" x="3" y="14" />
        </svg>
      </div>
    );
  }
);

LayoutGridIcon.displayName = "LayoutGridIcon";
export { LayoutGridIcon };
