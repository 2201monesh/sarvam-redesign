"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface BookOpenIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface BookOpenIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const LEFT_PAGE: Variants = {
  normal: { rotateY: 0, x: 0 },
  animate: { x: [0, -2, 0], rotateY: [0, 8, 0], transition: { duration: 0.6, ease: "easeInOut" } },
};

const RIGHT_PAGE: Variants = {
  normal: { rotateY: 0, x: 0 },
  animate: { x: [0, 2, 0], rotateY: [0, -8, 0], transition: { duration: 0.6, ease: "easeInOut" } },
};

const BookOpenIcon = forwardRef<BookOpenIconHandle, BookOpenIconProps>(
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
          <motion.path
            animate={leftControls}
            d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"
            style={{ transformOrigin: "12px 12px" }}
            variants={LEFT_PAGE}
          />
          <motion.path
            animate={rightControls}
            d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
            style={{ transformOrigin: "12px 12px" }}
            variants={RIGHT_PAGE}
          />
        </svg>
      </div>
    );
  }
);

BookOpenIcon.displayName = "BookOpenIcon";
export { BookOpenIcon };
