"use client";

import { useState } from "react";
import { Copy, Check, ArrowRight } from "lucide-react";

const CODE_LINES = [
  { tokens: [{ text: "import ", color: "#7c3aed" }, { text: "requests", color: "#1e293b" }] },
  { tokens: [] },
  { tokens: [{ text: "API_KEY", color: "#2563eb" }, { text: " = ", color: "#0891b2" }, { text: '"your_api_key"', color: "#16a34a" }] },
  { tokens: [{ text: "BASE_URL", color: "#2563eb" }, { text: " = ", color: "#0891b2" }, { text: '"https://api.sarvam.ai/v1"', color: "#16a34a" }] },
  { tokens: [] },
  { tokens: [{ text: "# Convert text to natural speech", color: "#94a3b8" }] },
  { tokens: [{ text: "response", color: "#1e293b" }, { text: " = ", color: "#0891b2" }, { text: "requests", color: "#1e293b" }, { text: ".", color: "#0891b2" }, { text: "post", color: "#2563eb" }, { text: "(", color: "#1e293b" }] },
  { tokens: [{ text: "    f", color: "#1e293b" }, { text: '"{BASE_URL}/text-to-speech"', color: "#16a34a" }, { text: ",", color: "#1e293b" }] },
  { tokens: [{ text: "    headers", color: "#1e293b" }, { text: "={", color: "#0891b2" }, { text: '"API-Subscription-Key"', color: "#16a34a" }, { text: ": ", color: "#1e293b" }, { text: "API_KEY", color: "#2563eb" }, { text: "},", color: "#1e293b" }] },
  { tokens: [{ text: "    json", color: "#1e293b" }, { text: "={", color: "#0891b2" }] },
  { tokens: [{ text: '        "inputs"', color: "#16a34a" }, { text: ": [{", color: "#1e293b" }, { text: '"text"', color: "#16a34a" }, { text: ": ", color: "#1e293b" }, { text: '"नमस्ते, मैं सर्वम AI हूँ"', color: "#16a34a" }, { text: "}],", color: "#1e293b" }] },
  { tokens: [{ text: '        "target_language_code"', color: "#16a34a" }, { text: ": ", color: "#1e293b" }, { text: '"hi-IN"', color: "#16a34a" }, { text: ",", color: "#1e293b" }] },
  { tokens: [{ text: '        "speaker"', color: "#16a34a" }, { text: ": ", color: "#1e293b" }, { text: '"anushka"', color: "#16a34a" }] },
  { tokens: [{ text: "    }", color: "#1e293b" }] },
  { tokens: [{ text: ")", color: "#1e293b" }] },
  { tokens: [] },
  { tokens: [{ text: "print", color: "#2563eb" }, { text: "(", color: "#1e293b" }, { text: "response", color: "#1e293b" }, { text: ".", color: "#0891b2" }, { text: "json", color: "#2563eb" }, { text: "())", color: "#1e293b" }] },
];

const PLAIN_CODE = `import requests

API_KEY = "your_api_key"
BASE_URL = "https://api.sarvam.ai/v1"

# Convert text to natural speech
response = requests.post(
    f"{BASE_URL}/text-to-speech",
    headers={"API-Subscription-Key": API_KEY},
    json={
        "inputs": [{"text": "नमस्ते, मैं सर्वम AI हूँ"}],
        "target_language_code": "hi-IN",
        "speaker": "anushka"
    }
)

print(response.json())`;

export default function DeveloperQuickstart() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(PLAIN_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="w-full flex flex-col lg:flex-row gap-10 items-stretch">

      {/* Left — text pinned to bottom */}
      <div className="w-full lg:w-[36%] flex flex-col justify-start gap-4 shrink-0">
        <div className="flex flex-col gap-3">
          <p className="text-3xl font-season-mix font-medium leading-snug">Developer Quickstart</p>
          <p className="text-sm text-neutral-500 leading-relaxed">
            Integrate Sarvam's speech, translation, and language APIs into your app in minutes. Simple REST endpoints, consistent responses.
          </p>
        </div>
        <button
          className="relative overflow-hidden bg-black text-white rounded-full px-5 text-sm py-2.5 font-season-mix cursor-pointer focus:outline-none outline-none border-none w-fit flex items-center gap-2"
          style={{ boxShadow: "inset 0 0 0 1.5px rgba(255,255,255,0.75), inset 0 0 12px rgba(255,255,255,0.55), inset 0 0 30px rgba(255,255,255,0.25)" }}
        >
          <span className="absolute inset-0 rounded-full pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.12) 0%, transparent 55%)" }} />
          <span className="relative z-10 flex items-center gap-2">Get started <ArrowRight size={13} /></span>
        </button>
      </div>

      {/* Right — light code editor */}
      <div className="w-full lg:flex-1 min-w-0">
        <div className="rounded-2xl overflow-hidden border border-neutral-200">

          {/* Editor top bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-50 border-b border-neutral-200">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-200" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-200" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-200" />
              </div>
              <span className="text-xs text-neutral-400 font-mono">quickstart.py</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-zinc-600 transition-colors cursor-pointer"
            >
              {copied
                ? <><Check size={12} className="text-green-500" /><span className="text-green-500">Copied</span></>
                : <><Copy size={12} /><span>Copy</span></>
              }
            </button>
          </div>

          {/* Code body */}
          <div className="bg-white px-5 py-4 overflow-x-auto">
            <pre className="text-[11px] font-mono leading-[1.8] [&::-webkit-scrollbar]:hidden">
              {CODE_LINES.map((line, i) => (
                <div key={i}>
                  {line.tokens.length === 0
                    ? <span>&nbsp;</span>
                    : line.tokens.map((token, j) => (
                        <span key={j} style={{ color: token.color }}>{token.text}</span>
                      ))
                  }
                </div>
              ))}
            </pre>
          </div>

        </div>
      </div>

    </div>
  );
}
