"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface BarChart2IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface BarChart2IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const makeBar = (delay: number): Variants => ({
  normal: { scaleY: 1 },
  animate: { scaleY: [1, 1.25, 0.85, 1.1, 1], transition: { duration: 0.7, ease: "easeInOut", delay } },
});

const B1 = makeBar(0);
const B2 = makeBar(0.1);
const B3 = makeBar(0.2);

const BarChart2Icon = forwardRef<BarChart2IconHandle, BarChart2IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const b1Controls = useAnimation();
    const b2Controls = useAnimation();
    const b3Controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => { b1Controls.start("animate"); b2Controls.start("animate"); b3Controls.start("animate"); },
        stopAnimation: () => { b1Controls.start("normal"); b2Controls.start("normal"); b3Controls.start("normal"); },
      };
    });

    const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) { onMouseEnter?.(e); } else { b1Controls.start("animate"); b2Controls.start("animate"); b3Controls.start("animate"); }
    }, [onMouseEnter, b1Controls, b2Controls, b3Controls]);

    const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) { onMouseLeave?.(e); } else { b1Controls.start("normal"); b2Controls.start("normal"); b3Controls.start("normal"); }
    }, [b1Controls, b2Controls, b3Controls, onMouseLeave]);

    return (
      <div className={cn(className)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
        <svg fill="none" height={size} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width={size}>
          <motion.line animate={b1Controls} style={{ transformOrigin: "6px 20px" }} variants={B1} x1="6" x2="6" y1="20" y2="14" />
          <motion.line animate={b2Controls} style={{ transformOrigin: "12px 20px" }} variants={B2} x1="12" x2="12" y1="20" y2="4" />
          <motion.line animate={b3Controls} style={{ transformOrigin: "18px 20px" }} variants={B3} x1="18" x2="18" y1="20" y2="10" />
        </svg>
      </div>
    );
  }
);

BarChart2Icon.displayName = "BarChart2Icon";
export { BarChart2Icon };
