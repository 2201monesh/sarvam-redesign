import { ArrowRight, RefreshCw, Volume2 } from "lucide-react";
import type { ModelData } from "@/modules/models/modelsData";

// ─── Animations ───────────────────────────────────────────────────────────────

const BAR_HEIGHTS = [0.45, 0.8, 0.55, 1, 0.7, 0.9, 0.4, 0.75, 0.5];

function WaveformAnim() {
  return (
    <div className="flex items-end justify-center gap-1.5" style={{ height: 56 }}>
      {BAR_HEIGHTS.map((h, i) => (
        <div
          key={i}
          className="w-1.5 rounded-full bg-white"
          style={{
            height: `${h * 56}px`,
            transformOrigin: "bottom",
            animation: `waveBar 1.1s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.11}s`,
          }}
        />
      ))}
    </div>
  );
}

function RippleAnim() {
  return (
    <div className="relative flex items-center justify-center w-20 h-20">
      {[0, 0.7, 1.4].map((delay) => (
        <div
          key={delay}
          className="absolute rounded-full border border-white/30"
          style={{
            width: 44, height: 44,
            animation: "ripple 2.4s ease-out infinite",
            animationDelay: `${delay}s`,
          }}
        />
      ))}
      <div className="relative z-10 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center">
        <Volume2 size={20} className="text-white" />
      </div>
    </div>
  );
}

function TranslateAnim() {
  return (
    <div className="flex items-center gap-6">
      <div className="text-center">
        <span className="text-4xl font-bold text-white/80" style={{ fontFamily: "serif" }}>हि</span>
        <p className="text-[10px] text-white/30 mt-1 tracking-wide uppercase">Indic</p>
      </div>
      <div style={{ animation: "orbit 3.5s linear infinite" }}>
        <RefreshCw size={18} className="text-white/40" />
      </div>
      <div className="text-center">
        <span className="text-3xl font-bold text-white/80 font-mono">EN</span>
        <p className="text-[10px] text-white/30 mt-1 tracking-wide uppercase">Roman</p>
      </div>
    </div>
  );
}

const TOKEN_WIDTHS = [28, 40, 22, 46, 32, 36, 20, 42, 26, 38, 24, 34];

function TokensAnim() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-1.5 flex-wrap justify-center" style={{ maxWidth: 180 }}>
        {TOKEN_WIDTHS.map((w, i) => (
          <div
            key={i}
            className="h-1.5 rounded-sm bg-white/40"
            style={{
              width: w,
              animation: "tokenPulse 2s ease-in-out infinite",
              animationDelay: `${i * 0.14}s`,
            }}
          />
        ))}
      </div>
      <div className="flex items-center gap-1 text-white/50 text-xs font-mono">
        <span>generating</span>
        <span
          className="inline-block w-0.5 h-3.5 bg-white/80 ml-0.5"
          style={{ animation: "blink 0.85s step-end infinite" }}
        />
      </div>
    </div>
  );
}

function ScriptAnim() {
  return (
    <div className="flex items-center gap-5">
      <div className="text-center">
        <span
          className="text-4xl font-bold text-white"
          style={{ fontFamily: "serif", animation: "fadeAlt 3s ease-in-out infinite" }}
        >
          नम
        </span>
        <p className="text-[10px] text-white/30 mt-1 tracking-wide uppercase">Devanagari</p>
      </div>
      <ArrowRight size={16} className="text-white/25 shrink-0" />
      <div className="text-center">
        <span
          className="text-3xl font-bold text-white font-mono"
          style={{ animation: "fadeAlt 3s ease-in-out infinite", animationDelay: "1.5s" }}
        >
          Nam
        </span>
        <p className="text-[10px] text-white/30 mt-1 tracking-wide uppercase">Roman</p>
      </div>
    </div>
  );
}

const ANIM_MAP = {
  waveform:  <WaveformAnim />,
  ripple:    <RippleAnim />,
  translate: <TranslateAnim />,
  tokens:    <TokensAnim />,
  script:    <ScriptAnim />,
};

// ─── Card ─────────────────────────────────────────────────────────────────────

export default function ModelCard({ model }: { model: ModelData }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden flex flex-col">
      {/* Animated visual */}
      <div
        className="relative h-44 bg-zinc-950 flex items-center justify-center overflow-hidden"
        style={{ background: `${model.glow}, #09090b` }}
      >
        {ANIM_MAP[model.animation]}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-base font-medium text-zinc-900 font-season-mix leading-tight">
              {model.name}
              {model.version && (
                <span className="text-neutral-400 font-matter font-normal text-sm ml-1">{model.version}</span>
              )}
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">{model.type}</p>
          </div>
          <div className="flex gap-1.5 flex-wrap justify-end">
            {model.tags.map((tag) => (
              <span key={tag} className="text-[11px] px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-500 border border-neutral-200 font-medium whitespace-nowrap">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <p className="text-xs text-neutral-500 leading-relaxed">{model.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {model.languages.map((lang) => (
            <span key={lang} className="text-[11px] px-2 py-0.5 rounded-full border border-neutral-200 text-neutral-500">
              {lang}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-2 border-t border-neutral-100 flex items-center justify-between">
          <span className="font-mono text-[11px] text-neutral-400">{model.endpoint}</span>
          <button className="flex items-center gap-1.5 text-xs font-medium text-zinc-700 hover:text-zinc-900 transition-colors cursor-pointer">
            Explore API
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
