export type AnimationType = "waveform" | "ripple" | "translate" | "tokens" | "script";

export interface ModelData {
  id: string;
  name: string;
  version: string;
  type: string;
  animation: AnimationType;
  glow: string;
  description: string;
  languages: string[];
  tags: string[];
  endpoint: string;
}

export const MODELS: ModelData[] = [
  {
    id: "saarika",
    name: "Saarika",
    version: "v2",
    type: "Speech Recognition",
    animation: "waveform",
    glow: "radial-gradient(ellipse at center, rgba(59,130,246,0.18) 0%, transparent 70%)",
    description: "Real-time automatic speech recognition for 11 Indic languages with high accuracy across diverse accents and dialects.",
    languages: ["Hindi", "Tamil", "Telugu", "Kannada", "Malayalam", "Bengali"],
    tags: ["ASR", "Real-time", "Streaming"],
    endpoint: "/v1/speech/recognize",
  },
  {
    id: "bulbul",
    name: "Bulbul",
    version: "v2",
    type: "Text to Speech",
    animation: "ripple",
    glow: "radial-gradient(ellipse at center, rgba(139,92,246,0.18) 0%, transparent 70%)",
    description: "Natural-sounding neural TTS with expressive voices for Indic languages. Supports adjustable pitch, speed, and tone.",
    languages: ["Hindi", "Tamil", "Telugu", "Kannada", "Malayalam"],
    tags: ["TTS", "Neural", "Streaming"],
    endpoint: "/v1/speech/synthesize",
  },
  {
    id: "mayura",
    name: "Mayura",
    version: "v1",
    type: "Translation",
    animation: "translate",
    glow: "radial-gradient(ellipse at center, rgba(245,158,11,0.15) 0%, transparent 70%)",
    description: "Neural machine translation optimized for Indic language pairs. Supports document-level context and real-time translation.",
    languages: ["Hindi", "Tamil", "Telugu", "Marathi", "Gujarati", "English"],
    tags: ["NMT", "Indic", "Batch"],
    endpoint: "/v1/text/translate",
  },
  {
    id: "sarvam2b",
    name: "Sarvam-2B",
    version: "",
    type: "Language Model",
    animation: "tokens",
    glow: "radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, transparent 70%)",
    description: "A 2B parameter LLM trained on multilingual Indic corpora. Optimized for chat, instruction-following, and code generation.",
    languages: ["Hindi", "English", "Tamil", "Telugu", "+8 more"],
    tags: ["LLM", "Chat", "Completion"],
    endpoint: "/v1/chat/completions",
  },
  {
    id: "transliterate",
    name: "Transliterate",
    version: "",
    type: "Script Conversion",
    animation: "script",
    glow: "radial-gradient(ellipse at center, rgba(34,197,94,0.15) 0%, transparent 70%)",
    description: "Fast and accurate script conversion between Devanagari, Tamil, Telugu, and 7 other Indic writing systems.",
    languages: ["Devanagari", "Tamil", "Telugu", "Kannada", "Malayalam", "Roman"],
    tags: ["NLP", "Indic Scripts", "Fast"],
    endpoint: "/v1/text/transliterate",
  },
];
