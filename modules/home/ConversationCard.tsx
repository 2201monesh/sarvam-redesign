"use client";

import { useState, useRef } from "react";
import { Play, Pause, Square, Loader } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { textToSpeech } from "@/lib/sarvam/tts";

// bulbul:v3 speaker names — neha/priya match the card character names exactly
const SPEAKERS = [
  {
    name: "Arya",
    voice: "ishita",
    text: "Arya speaks with a calm, professional tone that instantly builds trust with callers. Her voice is clear and measured, making her ideal for customer support and IVR flows where clarity matters most.",
  },
  {
    name: "Ravi",
    voice: "rahul",
    text: "Ravi brings energy and warmth to every interaction. His upbeat delivery keeps listeners engaged, making him a strong fit for marketing campaigns, onboarding experiences, and brand storytelling.",
  },
  {
    name: "Neha",
    voice: "neha",
    text: "Neha's voice carries a natural softness with just the right amount of authority. She works exceptionally well in healthcare and financial contexts where empathy and precision go hand in hand.",
  },
  {
    name: "Karan",
    voice: "kabir",
    text: "Karan delivers a deep, resonant tone that commands attention. His voice is well-suited for documentary narration, edtech content, and scenarios where gravitas and credibility are key.",
  },
  {
    name: "Priya",
    voice: "priya",
    text: "Priya combines a youthful energy with a conversational ease that feels approachable and real. She excels in social media content, casual brand interactions, and youth-focused campaigns.",
  },
];

type PlayState = "idle" | "loading" | "playing" | "paused";

export default function ConversationCard() {
  const [playState, setPlayState] = useState<PlayState>("idle");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [error, setError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cachedAudios = useRef<string[]>([]);
  const shouldStop = useRef(false);

  async function fetchAll(): Promise<string[]> {
    if (cachedAudios.current.length === SPEAKERS.length) return cachedAudios.current;
    const results = await Promise.all(
      SPEAKERS.map((s) =>
        textToSpeech({
          text: s.text,
          target_language_code: "en-IN",
          speaker: s.voice,
          model: "bulbul:v3",
          speech_sample_rate: 22050,
          pace: 1.0,
        })
      )
    );
    cachedAudios.current = results;
    return results;
  }

  async function playFrom(audios: string[], startIndex: number) {
    shouldStop.current = false;
    setPlayState("playing");

    for (let i = startIndex; i < audios.length; i++) {
      if (shouldStop.current) break;
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
    if (playState === "loading") return;

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

    // idle — fetch then play
    setError(null);
    setPlayState("loading");
    try {
      const audios = await fetchAll();
      await playFrom(audios, 0);
    } catch {
      setError("Could not load audio. Please try again.");
      setPlayState("idle");
    }
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
              disabled={playState === "loading"}
              className="w-11 h-11 rounded-full flex items-center justify-center cursor-pointer shrink-0 disabled:cursor-default"
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,0.0) 100%), #e87541`,
              }}
            >
              <span className="relative w-4 h-4 flex items-center justify-center">
                <AnimatePresence initial={false} mode="popLayout">
                  {playState === "loading" ? (
                    <motion.span
                      key="loader"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ type: "spring", duration: 0.25, bounce: 0 }}
                      style={{ position: "absolute", display: "flex" }}
                    >
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        style={{ display: "flex" }}
                      >
                        <Loader size={15} className="text-white" />
                      </motion.span>
                    </motion.span>
                  ) : playState === "playing" ? (
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

            {/* Stop button — only when active */}
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
            {error && (
              <p className="text-[10px] text-red-400 leading-tight mt-0.5">{error}</p>
            )}
          </div>
        </div>

        {/* Right — scrollable speaker descriptions */}
        <div className="flex-1 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-5 pr-5 flex flex-col gap-3.5">
          {SPEAKERS.map((speaker, i) => (
            <motion.div
              key={i}
              animate={{
                opacity: activeIndex === -1 || activeIndex === i ? 1 : 0.38,
              }}
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
                          animate={playState === "playing"
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
