"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { MdCurrencyRupee } from "react-icons/md";

const MOCK = {
  requests: {
    total: 18_650,
    delta: 12,
    positive: true,
    period: "May 2025",
  },
  credits: {
    remaining: 320,
    total: 500,
    resetDate: "Jun 1, 2025",
  },
  audio: {
    minutes: 342,
    characters: "1.24M",
  },
};

function StatDelta({ value, positive }: { value: number; positive: boolean }) {
  const Icon = positive ? TrendingUp : TrendingDown;
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-medium ${
        positive ? "text-emerald-600" : "text-red-500"
      }`}
    >
      <Icon size={12} />
      {value}% vs last period
    </span>
  );
}

export default function UsageStatsBar() {
  const { requests, credits, audio } = MOCK;
  const usedPct = Math.round(((credits.total - credits.remaining) / credits.total) * 100);
  const remainingPct = 100 - usedPct;

  return (
    <div className="w-full flex border border-neutral-200 rounded-t-xl overflow-hidden divide-x divide-neutral-200">
      {/* Left — API Requests */}
      <div className="flex-1 px-5 py-5 flex flex-col gap-3">
        <p className="text-xs text-neutral-500 tracking-wide uppercase">API Requests</p>
        <div>
          <p className="text-[28px] leading-none font-season-mix font-medium text-neutral-900 tabular-nums">
            {requests.total.toLocaleString("en-IN")}
          </p>
          <p className="text-xs text-neutral-400 mt-1.5">{requests.period}</p>
        </div>
        <StatDelta value={requests.delta} positive={requests.positive} />
      </div>

      {/* Middle — Credits Remaining (wider) */}
      <div className="flex-[1.5] px-6 py-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-xs text-neutral-500 tracking-wide uppercase">Credits Remaining</p>
          <span className="text-xs text-neutral-400">Resets {credits.resetDate}</span>
        </div>

        <div className="flex items-end justify-between gap-2">
          <div>
            <p className="text-[28px] leading-none font-season-mix font-medium text-neutral-900 tabular-nums flex items-center gap-0.5">
              <MdCurrencyRupee className="text-2xl text-neutral-600" />
              {credits.remaining.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-neutral-400 mt-1.5">
              of{" "}
              <MdCurrencyRupee className="inline text-neutral-400" style={{ fontSize: 11, verticalAlign: "middle" }} />
              {credits.total.toLocaleString("en-IN")} total
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-sm font-medium text-neutral-700 tabular-nums">{remainingPct}%</p>
            <p className="text-xs text-neutral-400">remaining</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 rounded-full bg-neutral-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-neutral-900 transition-all duration-700"
            style={{ width: `${remainingPct}%` }}
          />
        </div>

        {/* Breakdown row */}
        <div className="flex items-center gap-4 pt-0.5">
          {[
            { label: "Speech", pct: 48 },
            { label: "Translate", pct: 22 },
            { label: "Other", pct: 30 },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 shrink-0" />
              <span className="text-xs text-neutral-400">{item.label}</span>
              <span className="text-xs text-neutral-500 font-medium tabular-nums">{item.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right — Audio Processed */}
      <div className="flex-1 px-5 py-5 flex flex-col gap-3">
        <p className="text-xs text-neutral-500 tracking-wide uppercase">Audio Processed</p>
        <div>
          <p className="text-[28px] leading-none font-season-mix font-medium text-neutral-900 tabular-nums">
            {audio.minutes}
            <span className="text-base font-normal text-neutral-500 ml-1">min</span>
          </p>
          <p className="text-xs text-neutral-400 mt-1.5">
            {audio.characters} characters synthesised
          </p>
        </div>
        <div className="flex items-center gap-3">
          {[
            { label: "TTS", color: "#8fa1f8", val: "198 min" },
            { label: "STT", color: "#72a539", val: "144 min" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
              <span className="text-xs text-neutral-500">{s.label}</span>
              <span className="text-xs font-medium text-neutral-700 tabular-nums">{s.val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
