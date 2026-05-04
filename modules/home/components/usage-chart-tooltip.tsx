export default function UsageChartTooltip({ active, payload, label }: any) {
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
