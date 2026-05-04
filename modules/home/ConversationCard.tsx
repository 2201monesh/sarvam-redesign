"use client";

import { useState, useRef } from "react";
import { Play, Pause, Square, Loader } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CONVERSATION_SPEAKERS } from "./data/conversationSpeakers";

type PlayState = "idle" | "playing" | "paused";

interface Props {
  audios: string[];
}

export default function ConversationCard({ audios }: Props) {
  const [playState, setPlayState] = useState<PlayState>("idle");
  const [activeIndex, setActiveIndex] = useState(-1);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const shouldStop = useRef(false);

  const hasAudio = audios.some((a) => a.length > 0);

  async function playFrom(startIndex: number) {
    shouldStop.current = false;
    setPlayState("playing");

    for (let i = startIndex; i < audios.length; i++) {
      if (shouldStop.current) break;
      if (!audios[i]) continue; // skip any that failed server-side

      setActiveIndex(i);

      await new Promise<void>((resolve) => {
        const audio = new Audio(`data:audio/wav;base64,${audios[i]}`);
        audioRef.current = audio;
        audio.onended = () => resolve();
        audio.onerror = () => resolve();
        audio.play().catch(resolve);
      });
    }

    if (!shouldStop.current) {
      setPlayState("idle");
      setActiveIndex(-1);
    }
  }

  async function handlePlayPause() {
    if (playState === "playing") {
      audioRef.current?.pause();
      setPlayState("paused");
      return;
    }

    if (playState === "paused") {
      setPlayState("playing");
      await audioRef.current?.play();
      return;
    }

    // idle — play from start
    await playFrom(0);
  }

  function handleStop() {
    shouldStop.current = true;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setPlayState("idle");
    setActiveIndex(-1);
  }

  const isActive = playState === "playing" || playState === "paused";

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center lg:pl-6">
      <div className="w-full h-64 border border-neutral-200 rounded-2xl flex overflow-hidden">

        {/* Left — controls */}
        <div className="w-[35%] h-full pl-5 py-5 flex flex-col justify-between shrink-0">
          <div className="flex items-center gap-2">

            {/* Play / Pause button */}
            <motion.button
              onClick={handlePlayPause}
              whileTap={{ scale: 0.93 }}
              transition={{ type: "spring", duration: 0.25, bounce: 0 }}
              disabled={!hasAudio}
              className="w-11 h-11 rounded-full flex items-center justify-center cursor-pointer shrink-0 disabled:cursor-not-allowed disabled:opacity-50"
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,0.0) 100%), #e87541`,
              }}
            >
              <span className="relative w-4 h-4 flex items-center justify-center">
                <AnimatePresence initial={false} mode="popLayout">
                  {playState === "playing" ? (
                    <motion.span
                      key="pause"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ type: "spring", duration: 0.25, bounce: 0 }}
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
                      transition={{ type: "spring", duration: 0.25, bounce: 0 }}
                      style={{ position: "absolute", display: "flex" }}
                    >
                      <Play size={15} className="text-white fill-white ml-0.5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            </motion.button>

            {/* Stop — only while playing or paused */}
            <AnimatePresence>
              {isActive && (
                <motion.button
                  onClick={handleStop}
                  initial={{ opacity: 0, scale: 0.75 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.75 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", duration: 0.25, bounce: 0 }}
                  className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-400 hover:text-zinc-600 transition-colors"
                >
                  <Square size={11} className="fill-current" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-sm text-neutral-700">Multi-Speaker</p>
            <p className="text-sm text-neutral-700">Conversation</p>
            {!hasAudio && (
              <p className="text-[10px] text-red-400 leading-tight mt-0.5">Audio unavailable</p>
            )}
          </div>
        </div>

        {/* Right — scrollable speaker list */}
        <div className="flex-1 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-5 pr-5 flex flex-col gap-3.5">
          {CONVERSATION_SPEAKERS.map((speaker, i) => (
            <motion.div
              key={i}
              animate={{ opacity: activeIndex === -1 || activeIndex === i ? 1 : 0.38 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-1"
            >
              <div className="flex items-center gap-2 pl-3">
                <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider">
                  {speaker.name}
                </span>
                <AnimatePresence>
                  {activeIndex === i && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ type: "spring", duration: 0.25, bounce: 0 }}
                      className="flex gap-0.5 items-end h-3"
                    >
                      {[0, 1, 2].map((bar) => (
                        <motion.span
                          key={bar}
                          className="w-0.5 rounded-full bg-[#e87541]"
                          animate={
                            playState === "playing"
                              ? { height: ["4px", "10px", "4px"] }
                              : { height: "4px" }
                          }
                          transition={{
                            repeat: Infinity,
                            duration: 0.7,
                            delay: bar * 0.15,
                            ease: "easeInOut",
                          }}
                          style={{ height: "4px" }}
                        />
                      ))}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <p
                className="border-l-2 pl-3 text-sm leading-relaxed text-neutral-500 font-[family-name:var(--font-season-mix)] transition-colors duration-300"
                style={{ borderColor: activeIndex === i ? "#e87541" : "#f5f5f5" }}
              >
                {speaker.text}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
