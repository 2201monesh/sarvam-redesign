import { unstable_cache } from "next/cache";
import type { TTSRequest, TTSResponse } from "./types";

const SARVAM_TTS_URL = "https://api.sarvam.ai/text-to-speech";

async function fetchTTS(params: TTSRequest): Promise<string> {
  const apiKey = process.env.SARVAM_API_KEY;
  if (!apiKey) throw new Error("SARVAM_API_KEY not configured");

  const res = await fetch(SARVAM_TTS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-subscription-key": apiKey,
    },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.message ?? `TTS failed (${res.status})`);
  }

  const data: TTSResponse = await res.json();
  return data.audios[0];
}

// Same text + same voice always produces the same audio — cache indefinitely.
export const textToSpeechServer = unstable_cache(
  fetchTTS,
  ["sarvam-tts"],
  { revalidate: false }
);
