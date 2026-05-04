"use client";

import { motion, AnimatePresence } from "motion/react";
import { CONVERSATION_SPEAKERS } from "../data/conversationSpeakers";
import { useConversationPlayer, PlayState } from "../hooks/useConversationPlayer";
import ConversationControls from "./conversation-controls";

interface Props {
  audios: string[];
}

export default function ConversationCard({ audios }: Props) {
  const { playState, activeIndex, isActive, hasAudio, togglePlayPause, stop } =
    useConversationPlayer(audios);

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center lg:pl-6">
      <div className="w-full h-64 border border-neutral-200 rounded-2xl flex overflow-hidden">

        {/* Left — controls + label */}
        <div className="w-[35%] h-full pl-5 py-5 flex flex-col justify-between shrink-0">
          <ConversationControls
            playState={playState}
            isActive={isActive}
            disabled={!hasAudio}
            onPlayPause={togglePlayPause}
            onStop={stop}
          />
          <div className="flex flex-col gap-1">
            <p className="text-sm text-neutral-700">Multi-Speaker</p>
            <p className="text-sm text-neutral-700">Conversation</p>
            {!hasAudio && (
              <p className="text-[10px] text-red-400 leading-tight mt-0.5">Audio unavailable</p>
            )}
          </div>
        </div>

        {/* Right — speaker list */}
        <div className="flex-1 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-5 pr-5 flex flex-col gap-3.5">
          {CONVERSATION_SPEAKERS.map((speaker, i) => (
            <SpeakerRow
              key={i}
              speaker={speaker}
              isActive={activeIndex === i}
              isDimmed={activeIndex !== -1 && activeIndex !== i}
              isPlaying={playState === PlayState.Playing}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

interface SpeakerRowProps {
  speaker: (typeof CONVERSATION_SPEAKERS)[number];
  isActive: boolean;
  isDimmed: boolean;
  isPlaying: boolean;
}

function SpeakerRow({ speaker, isActive, isDimmed, isPlaying }: SpeakerRowProps) {
  return (
    <motion.div
      animate={{ opacity: isDimmed ? 0.38 : 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-1"
    >
      <div className="flex items-center gap-2 pl-3">
        <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider">
          {speaker.name}
        </span>
        <AnimatePresence>
          {isActive && <WaveformBars isPlaying={isPlaying} />}
        </AnimatePresence>
      </div>
      <p
        className="border-l-2 pl-3 text-sm leading-relaxed text-neutral-500 font-[family-name:var(--font-season-mix)] transition-colors duration-300"
        style={{ borderColor: isActive ? "#e87541" : "#f5f5f5" }}
      >
        {speaker.text}
      </p>
    </motion.div>
  );
}

function WaveformBars({ isPlaying }: { isPlaying: boolean }) {
  return (
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
          animate={isPlaying ? { height: ["4px", "10px", "4px"] } : { height: "4px" }}
          transition={{ repeat: Infinity, duration: 0.7, delay: bar * 0.15, ease: "easeInOut" }}
          style={{ height: "4px" }}
        />
      ))}
    </motion.span>
  );
}
