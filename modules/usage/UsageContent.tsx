"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

// --- Mock data ---
const serviceData = [
  { service: "Saarika",       requests: 4820 },
  { service: "Bulbul",        requests: 3140 },
  { service: "Mayura",        requests: 2900 },
  { service: "Sarvam-2B",     requests: 1650 },
  { service: "Transliterate", requests: 980  },
];

const dailyData = [
  { day: "Apr 27", requests: 1200 },
  { day: "Apr 28", requests: 1850 },
  { day: "Apr 29", requests: 1400 },
  { day: "Apr 30", requests: 2100 },
  { day: "May 1",  requests: 1750 },
  { day: "May 2",  requests: 3400 },
  { day: "May 3",  requests: 2900 },
];

// --- Shared tooltip ---
function ChartTooltip({ active, payload, label, unit = "requests" }: {
  active?: boolean; payload?: { value: number }[]; label?: string; unit?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-neutral-200 bg-white px-3 py-2 shadow-sm">
      <p className="text-xs text-neutral-400 mb-0.5">{label}</p>
      <p className="text-sm font-medium text-zinc-800">
        {payload[0].value.toLocaleString()} {unit}
      </p>
    </div>
  );
}

// --- Bar chart card ---
function BarCard({
  title, description, stat, data, xKey, barKey, unit,
}: {
  title: string; description: string; stat: string;
  data: object[]; xKey: string; barKey: string; unit?: string;
}) {
  return (
    <div className="border border-neutral-200 rounded-xl px-5 pt-5 pb-3">
      <div className="mb-4">
        <div className="flex items-baseline gap-3">
          <p className="text-sm font-medium text-zinc-800">{title}</p>
        </div>
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

// --- Models table ---
const modelRows = [
  { model: "Saarika v2",   type: "ASR",         requests: 4820,  tokens: "38.2M",  credits: 1910,  amount: "₹19,782.10" },
  { model: "Bulbul v2",    type: "TTS",         requests: 3140,  tokens: "21.6M",  credits: 1256,  amount: "₹19,782.56" },
  { model: "Mayura v1",    type: "Translation", requests: 2900,  tokens: "17.4M",  credits: 870,   amount: "₹6,788.70"  },
  { model: "Sarvam-2B",    type: "LLM",         requests: 1650,  tokens: "9.8M",   credits: 660,   amount: "₹7,686.60"  },
  { model: "Transliterate",type: "NLP",         requests: 980,   tokens: "4.1M",   credits: 196,   amount: "₹5,871.96"  },
];

function ModelsTable() {
  return (
    <div className="border border-neutral-200 rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-neutral-100">
        <p className="text-sm font-medium text-zinc-800">Usage by model</p>
        <p className="text-xs text-neutral-400 mt-0.5">Breakdown of consumption per model for the current billing period.</p>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-neutral-100">
            <th className="px-5 py-3 text-left text-xs font-medium text-neutral-400">Model</th>
            <th className="px-5 py-3 text-left text-xs font-medium text-neutral-400">Requests</th>
            <th className="px-5 py-3 text-left text-xs font-medium text-neutral-400">Tokens used</th>
            <th className="px-5 py-3 text-left text-xs font-medium text-neutral-400">Credits</th>
            <th className="px-5 py-3 text-left text-xs font-medium text-neutral-400">Amount</th>
          </tr>
        </thead>
        <tbody>
          {modelRows.map((row) => (
            <tr key={row.model} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/60 transition-colors">
              <td className="px-5 py-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-medium text-zinc-800">{row.model}</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-500 border border-neutral-200 font-medium">
                    {row.type}
                  </span>
                </div>
              </td>
              <td className="px-5 py-3.5 text-xs text-zinc-600">{row.requests.toLocaleString()}</td>
              <td className="px-5 py-3.5 text-xs text-zinc-600">{row.tokens}</td>
              <td className="px-5 py-3.5 text-xs text-zinc-600">{row.credits.toLocaleString()}</td>
              <td className="px-5 py-3.5 text-xs font-medium text-zinc-800">{row.amount}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-neutral-200 bg-neutral-50/60">
            <td className="px-5 py-3 text-xs font-medium text-zinc-700">Total</td>
            <td className="px-5 py-3 text-xs font-medium text-zinc-700">13,490</td>
            <td className="px-5 py-3 text-xs font-medium text-zinc-700">91.1M</td>
            <td className="px-5 py-3 text-xs font-medium text-zinc-700">4,892</td>
            <td className="px-5 py-3 text-xs font-medium text-zinc-800">₹59,911.92</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

// --- Main ---
export default function UsageContent() {
  return (
    <div className="px-6 py-8 flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-6">
        <BarCard
          title="Requests by service"
          description="total across all services"
          stat="13,490"
          data={serviceData}
          xKey="service"
          barKey="requests"
          unit="requests"
        />
        <BarCard
          title="Daily requests"
          description="last 7 days"
          stat="14,600"
          data={dailyData}
          xKey="day"
          barKey="requests"
          unit="requests"
        />
      </div>
      <ModelsTable />
    </div>
  );
}
