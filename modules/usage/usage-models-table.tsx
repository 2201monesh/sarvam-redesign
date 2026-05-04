import { ALL_MODEL_ROWS } from "@/modules/usage/usageMockData";

type ModelRow = typeof ALL_MODEL_ROWS[number];

export default function UsageModelsTable({ rows }: { rows: ModelRow[] }) {
  const totalRequests = rows.reduce((s, r) => s + r.requests, 0);
  const totalCredits  = rows.reduce((s, r) => s + r.credits,  0);

  return (
    <div className="border border-neutral-200 rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-neutral-100">
        <p className="text-sm font-medium text-zinc-800">Usage by model</p>
        <p className="text-xs text-neutral-400 mt-0.5">Breakdown of consumption per model for the selected period.</p>
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
          {rows.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-5 py-10 text-center text-xs text-neutral-400">
                No data matches the selected filters.
              </td>
            </tr>
          ) : rows.map((row) => (
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

        {rows.length > 1 && (
          <tfoot>
            <tr className="border-t border-neutral-200 bg-neutral-50/60">
              <td className="px-5 py-3 text-xs font-medium text-zinc-700">Total</td>
              <td className="px-5 py-3 text-xs font-medium text-zinc-700">{totalRequests.toLocaleString()}</td>
              <td className="px-5 py-3 text-xs font-medium text-zinc-700">—</td>
              <td className="px-5 py-3 text-xs font-medium text-zinc-700">{totalCredits.toLocaleString()}</td>
              <td className="px-5 py-3 text-xs font-medium text-zinc-800">—</td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
