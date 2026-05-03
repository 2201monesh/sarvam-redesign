"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function ChartTooltip({ active, payload, label, unit = "requests" }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-neutral-200 bg-white px-3 py-2 shadow-sm">
      <p className="text-xs text-neutral-400 mb-0.5">{label}</p>
      <p className="text-sm font-medium text-zinc-800">{payload[0].value.toLocaleString()} {unit}</p>
    </div>
  );
}

interface UsageBarCardProps {
  title: string;
  description: string;
  stat: string;
  data: any[];
  xKey: string;
  barKey: string;
  unit?: string;
}

export default function UsageBarCard({ title, description, stat, data, xKey, barKey, unit }: UsageBarCardProps) {
  return (
    <div className="border border-neutral-200 rounded-xl px-5 pt-5 pb-3">
      <div className="mb-4">
        <p className="text-sm font-medium text-zinc-800">{title}</p>
        <div className="flex items-baseline gap-2 mt-0.5">
          <span className="text-2xl font-medium text-zinc-900 font-season-mix">{stat}</span>
          <span className="text-xs text-neutral-400">{description}</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barSize={28}>
          <CartesianGrid vertical={false} stroke="#f0f0f0" strokeDasharray="4 4" />
          <XAxis
            dataKey={xKey}
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
          <Tooltip
            content={(props) => <ChartTooltip {...props} unit={unit} />}
            cursor={{ fill: "#f5f5f5" }}
          />
          <Bar dataKey={barKey} fill="#3f3f46" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
