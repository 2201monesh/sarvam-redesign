"use client";

import { useState, useRef } from "react";

export enum PlayState {
  Idle = "idle",
  Playing = "playing",
  Paused = "paused",
}

export function useConversationPlayer(audios: string[]) {
  const [playState, setPlayState] = useState<PlayState>(PlayState.Idle);
  const [activeIndex, setActiveIndex] = useState(-1);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const shouldStop = useRef(false);

  async function playFrom(startIndex: number) {
    shouldStop.current = false;
    setPlayState(PlayState.Playing);

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
      setPlayState(PlayState.Idle);
      setActiveIndex(-1);
    }
  }

  async function togglePlayPause() {
    if (playState === PlayState.Playing) {
      audioRef.current?.pause();
      setPlayState(PlayState.Paused);
      return;
    }
    if (playState === PlayState.Paused) {
      setPlayState(PlayState.Playing);
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
    setPlayState(PlayState.Idle);
    setActiveIndex(-1);
  }

  return {
    playState,
    activeIndex,
    isActive: playState === PlayState.Playing || playState === PlayState.Paused,
    hasAudio: audios.some((a) => a.length > 0),
    togglePlayPause,
    stop,
  };
}
