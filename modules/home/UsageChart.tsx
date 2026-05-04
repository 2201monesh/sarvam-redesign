"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { apiUsageMockData } from "@/data/mock/apiUsage";

const SERIES = [
  { key: "tts",       label: "Text to Speech", color: "#8fa1f8" },
  { key: "stt",       label: "Speech to Text", color: "#72a539" },
  { key: "translate", label: "Translate",       color: "#e87541" },
];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const p = payload[0];
  return (
    <div className="rounded-lg border border-neutral-200 bg-white px-3 py-2.5 shadow-sm min-w-[160px]">
      <p className="text-xs text-neutral-400 mb-2">{label}</p>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
          <span className="text-xs text-neutral-500">{p.name}</span>
        </div>
        <span className="text-xs font-medium text-zinc-800">{p.value.toLocaleString()}</span>
      </div>
    </div>
  );
}

export default function UsageChart() {
  const [activeKey, setActiveKey] = useState(SERIES[0].key);
  const active = SERIES.find((s) => s.key === activeKey)!;

  return (
    <div>
      <div className="flex items-center justify-end gap-1 pb-3 px-1">
        {SERIES.map((s) => (
          <button
            key={s.key}
            onClick={() => setActiveKey(s.key)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition-colors duration-150 cursor-pointer ${
              activeKey === s.key
                ? "bg-neutral-900 text-white"
                : "text-neutral-500 hover:bg-neutral-100"
            }`}
          >
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
            {s.label}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={apiUsageMockData} margin={{ top: 10, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id={`grad-${active.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={active.color} stopOpacity={0.18} />
              <stop offset="95%" stopColor={active.color} stopOpacity={0}    />
            </linearGradient>
          </defs>

          <CartesianGrid vertical={false} stroke="#f0f0f0" strokeDasharray="4 4" />

          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: "#a3a3a3" }}
            axisLine={false}
            tickLine={false}
            dy={8}
          />

          <YAxis
            tick={{ fontSize: 11, fill: "#a3a3a3" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(1)}k` : `${v}`}
          />

          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#e5e5e5", strokeWidth: 1 }} />

          <Area
            key={active.key}
            type="monotone"
            dataKey={active.key}
            name={active.label}
            stroke={active.color}
            strokeWidth={1.5}
            fill={`url(#grad-${active.key})`}
            dot={false}
            activeDot={{ r: 3, fill: active.color, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
