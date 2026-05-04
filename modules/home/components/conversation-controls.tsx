"use client";

import { Play, Pause, Square } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PlayState } from "../hooks/useConversationPlayer";

interface Props {
  playState: PlayState;
  isActive: boolean;
  disabled: boolean;
  onPlayPause: () => void;
  onStop: () => void;
}

const spring = { type: "spring", duration: 0.25, bounce: 0 } as const;

export default function ConversationControls({ playState, isActive, disabled, onPlayPause, onStop }: Props) {
  return (
    <div className="flex items-center gap-2">
      <motion.button
        onClick={onPlayPause}
        whileTap={{ scale: 0.93 }}
        transition={spring}
        disabled={disabled}
        className="w-11 h-11 rounded-full flex items-center justify-center cursor-pointer shrink-0 disabled:cursor-not-allowed disabled:opacity-50"
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,0.0) 100%), #e87541`,
        }}
      >
        <span className="relative w-4 h-4 flex items-center justify-center">
          <AnimatePresence initial={false} mode="popLayout">
            {playState === PlayState.Playing ? (
              <motion.span
                key="pause"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={spring}
                style={{ position: "absolute", display: "flex" }}
              >
                <Pause size={15} className="text-white fill-white" />
              </motion.span>
            ) : (
              <motion.span
                key="play"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={spring}
                style={{ position: "absolute", display: "flex" }}
              >
                <Play size={15} className="text-white fill-white ml-0.5" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </motion.button>

      <AnimatePresence>
        {isActive && (
          <motion.button
            onClick={onStop}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            whileTap={{ scale: 0.9 }}
            transition={spring}
            className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-400 hover:text-zinc-600 transition-colors"
          >
            <Square size={11} className="fill-current" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
