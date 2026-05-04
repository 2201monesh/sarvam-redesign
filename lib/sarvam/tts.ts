import type { TTSRequest, TTSResponse } from "./types";

export async function textToSpeech(params: TTSRequest): Promise<string> {
  const res = await fetch("/api/sarvam/tts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.message ?? data?.error ?? `TTS failed (${res.status})`);
  }

  const data: TTSResponse = await res.json();
  return data.audios[0];
}
