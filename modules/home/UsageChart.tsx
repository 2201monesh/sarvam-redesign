"use client";

import { useState, useRef, useLayoutEffect } from "react";
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
import { SERIES } from "./data/usageConfig";
import UsageChartTooltip from "./UsageChartTooltip";

export default function UsageChart() {
  const [activeKey, setActiveKey] = useState(SERIES[0].key);
  const active = SERIES.find((s) => s.key === activeKey)!;
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  useLayoutEffect(() => {
    const idx = SERIES.findIndex((s) => s.key === activeKey);
    const btn = btnRefs.current[idx];
    const container = containerRef.current;
    if (!btn || !container) return;
    const bRect = btn.getBoundingClientRect();
    const cRect = container.getBoundingClientRect();
    setPill({ left: bRect.left - cRect.left, width: bRect.width });
  }, [activeKey]);

  return (
    <div>
      <div ref={containerRef} className="relative flex items-center justify-end gap-1 pb-3 px-1">
        {pill && (
          <span
            className="absolute top-0 rounded-full bg-neutral-900"
            style={{
              left: pill.left,
              width: pill.width,
              height: "calc(100% - 12px)",
              transition: "left 220ms ease-in-out, width 220ms ease-in-out",
            }}
          />
        )}
        {SERIES.map((s, i) => (
          <button
            key={s.key}
            ref={(el) => { btnRefs.current[i] = el; }}
            onClick={() => setActiveKey(s.key)}
            className={`relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs cursor-pointer transition-colors duration-150 ${
              activeKey === s.key ? "text-white" : "text-neutral-500 hover:text-neutral-700"
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

          <Tooltip content={<UsageChartTooltip />} cursor={{ stroke: "#e5e5e5", strokeWidth: 1 }} />

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
