"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface FileTextIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface FileTextIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const makeLine = (delay: number): Variants => ({
  normal: { scaleX: 1, opacity: 1 },
  animate: {
    scaleX: [0.4, 1, 0.4],
    opacity: [0.3, 1, 0.3],
    transition: { duration: 0.9, ease: "easeInOut", delay },
  },
});

const L1 = makeLine(0);
const L2 = makeLine(0.15);
const L3 = makeLine(0.3);

const FileTextIcon = forwardRef<FileTextIconHandle, FileTextIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const l1Controls = useAnimation();
    const l2Controls = useAnimation();
    const l3Controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => { l1Controls.start("animate"); l2Controls.start("animate"); l3Controls.start("animate"); },
        stopAnimation: () => { l1Controls.start("normal"); l2Controls.start("normal"); l3Controls.start("normal"); },
      };
    });

    const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) { onMouseEnter?.(e); } else { l1Controls.start("animate"); l2Controls.start("animate"); l3Controls.start("animate"); }
    }, [onMouseEnter, l1Controls, l2Controls, l3Controls]);

    const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) { onMouseLeave?.(e); } else { l1Controls.start("normal"); l2Controls.start("normal"); l3Controls.start("normal"); }
    }, [l1Controls, l2Controls, l3Controls, onMouseLeave]);

    return (
      <div className={cn(className)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
        <svg fill="none" height={size} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width={size}>
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <motion.line animate={l1Controls} style={{ transformOrigin: "12px 13px" }} variants={L1} x1="16" x2="8" y1="13" y2="13" />
          <motion.line animate={l2Controls} style={{ transformOrigin: "12px 17px" }} variants={L2} x1="16" x2="8" y1="17" y2="17" />
          <motion.line animate={l3Controls} style={{ transformOrigin: "9px 9px" }} variants={L3} x1="10" x2="8" y1="9" y2="9" />
        </svg>
      </div>
    );
  }
);

FileTextIcon.displayName = "FileTextIcon";
export { FileTextIcon };
