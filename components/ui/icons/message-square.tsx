"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface MessageSquareIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MessageSquareIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const BUBBLE_VARIANTS: Variants = {
  normal: { y: 0, scaleY: 1, scaleX: 1 },
  animate: {
    y: [0, -3, 0, -1.5, 0],
    scaleY: [1, 1.04, 0.97, 1.02, 1],
    scaleX: [1, 0.97, 1.03, 0.99, 1],
    transition: { duration: 0.7, ease: "easeInOut" },
  },
};

const DOT_VARIANTS: Variants = {
  normal: { opacity: 0 },
  animate: { opacity: [0, 1, 1, 0], transition: { duration: 0.7, ease: "easeInOut" } },
};

const MessageSquareIcon = forwardRef<MessageSquareIconHandle, MessageSquareIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const bubbleControls = useAnimation();
    const dotControls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => { bubbleControls.start("animate"); dotControls.start("animate"); },
        stopAnimation: () => { bubbleControls.start("normal"); dotControls.start("normal"); },
      };
    });

    const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) { onMouseEnter?.(e); } else { bubbleControls.start("animate"); dotControls.start("animate"); }
    }, [onMouseEnter, bubbleControls, dotControls]);

    const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) { onMouseLeave?.(e); } else { bubbleControls.start("normal"); dotControls.start("normal"); }
    }, [bubbleControls, dotControls, onMouseLeave]);

    return (
      <div className={cn(className)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
        <svg fill="none" height={size} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width={size}>
          <motion.g animate={bubbleControls} style={{ transformOrigin: "12px 11px" }} variants={BUBBLE_VARIANTS}>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <motion.g animate={dotControls} variants={DOT_VARIANTS}>
              <circle cx="9" cy="10" r="0.8" fill="currentColor" stroke="none" />
              <circle cx="12" cy="10" r="0.8" fill="currentColor" stroke="none" />
              <circle cx="15" cy="10" r="0.8" fill="currentColor" stroke="none" />
            </motion.g>
          </motion.g>
        </svg>
      </div>
    );
  }
);

MessageSquareIcon.displayName = "MessageSquareIcon";
export { MessageSquareIcon };
