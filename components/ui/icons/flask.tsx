"use client";

import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface FlaskIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface FlaskIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const FlaskIcon = forwardRef<FlaskIconHandle, FlaskIconProps>(
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
          <motion.g
            animate={controls}
            variants={{
              normal: { rotate: 0, y: 0 },
              animate: { y: [0, -2, 0], rotate: [0, 5, -5, 3, -3, 0], transition: { duration: 0.8, ease: "easeInOut" } },
            }}
            style={{ transformOrigin: "12px 12px" }}
          >
            <path d="M9 3h6" />
            <path d="M10 9 4.5 19.5a1 1 0 0 0 .9 1.5h13.2a1 1 0 0 0 .9-1.5L14 9" />
            <line x1="9" x2="15" y1="9" y2="9" />
          </motion.g>
        </svg>
      </div>
    );
  }
);

FlaskIcon.displayName = "FlaskIcon";
export { FlaskIcon };
