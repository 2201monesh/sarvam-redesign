"use client";

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

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-neutral-200 bg-white px-3 py-2 shadow-sm">
      <p className="text-xs text-neutral-400 mb-0.5">{label}</p>
      <p className="text-sm font-medium text-neutral-800">
        {payload[0].value.toLocaleString()} hits
      </p>
    </div>
  );
}

export default function UsageChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={apiUsageMockData} margin={{ top: 10, right: 4, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="usageGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#a3a3a3" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#a3a3a3" stopOpacity={0}    />
          </linearGradient>
        </defs>

        <CartesianGrid
          vertical={false}
          stroke="#f0f0f0"
          strokeDasharray="4 4"
        />

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
          tickFormatter={(v) => `${(v / 1000).toFixed(v >= 1000 ? 1 : 0)}k`}
        />

        <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#e5e5e5", strokeWidth: 1 }} />

        <Area
          type="monotone"
          dataKey="hits"
          stroke="#404040"
          strokeWidth={1.5}
          fill="url(#usageGradient)"
          dot={false}
          activeDot={{ r: 3, fill: "#404040", strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
