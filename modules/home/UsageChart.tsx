"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { apiUsageMockData } from "@/data/mock/apiUsage";

const SERIES = [
  { key: "tts",       label: "Text to Speech", color: "#8fa1f8" },
  { key: "stt",       label: "Speech to Text", color: "#72a539" },
  { key: "translate", label: "Translate",       color: "#e87541" },
];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-neutral-200 bg-white px-3 py-2.5 shadow-sm min-w-[160px]">
      <p className="text-xs text-neutral-400 mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center justify-between gap-4 mb-1 last:mb-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
            <span className="text-xs text-neutral-500">{p.name}</span>
          </div>
          <span className="text-xs font-medium text-zinc-800">{p.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

function CustomLegend() {
  return (
    <div className="flex items-center gap-5 justify-end px-2 pb-2">
      {SERIES.map((s) => (
        <div key={s.key} className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
          <span className="text-xs text-neutral-500">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function UsageChart() {
  return (
    <div>
      <CustomLegend />
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={apiUsageMockData} margin={{ top: 10, right: 4, left: -20, bottom: 0 }}>
          <defs>
            {SERIES.map((s) => (
              <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={s.color} stopOpacity={0.18} />
                <stop offset="95%" stopColor={s.color} stopOpacity={0}    />
              </linearGradient>
            ))}
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

          {SERIES.map((s) => (
            <Area
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.label}
              stroke={s.color}
              strokeWidth={1.5}
              fill={`url(#grad-${s.key})`}
              dot={false}
              activeDot={{ r: 3, fill: s.color, strokeWidth: 0 }}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
