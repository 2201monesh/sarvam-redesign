"use client";

import { useState, useRef } from "react";

export type PlayState = "idle" | "playing" | "paused";

export function useConversationPlayer(audios: string[]) {
  const [playState, setPlayState] = useState<PlayState>("idle");
  const [activeIndex, setActiveIndex] = useState(-1);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const shouldStop = useRef(false);

  async function playFrom(startIndex: number) {
    shouldStop.current = false;
    setPlayState("playing");

    for (let i = startIndex; i < audios.length; i++) {
      if (shouldStop.current) break;
      if (!audios[i]) continue;

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

  async function togglePlayPause() {
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
    await playFrom(0);
  }

  function stop() {
    shouldStop.current = true;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setPlayState("idle");
    setActiveIndex(-1);
  }

  return {
    playState,
    activeIndex,
    isActive: playState === "playing" || playState === "paused",
    hasAudio: audios.some((a) => a.length > 0),
    togglePlayPause,
    stop,
  };
}
