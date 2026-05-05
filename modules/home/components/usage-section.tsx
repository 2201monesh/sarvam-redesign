import UsageChart from "./usage-chart";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function UsageSection() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between pb-6">
        <p className="font-season-mix capitalize font-medium text-xl mr-6">Usage</p>
        {/* <Link href="/usage">
        <button className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-neutral-500 bg-neutral-100 hover:text-neutral-800 transition-colors duration-100 cursor-pointer">
          View more
          <ChevronRight size={14} />
        </button>
        </Link> */}
         <Link href="/api-keys" className="shrink-0">
          <button
          className="relative isolate overflow-hidden bg-black text-white rounded-full px-5 text-sm py-2.5 font-season-mix cursor-pointer focus:outline-none outline-none w-fit flex items-center gap-2"
          style={{ boxShadow: "inset 0 0 12px rgba(255,255,255,0.55), inset 0 0 30px rgba(255,255,255,0.25)" }}
        >
          <span className="absolute inset-0 rounded-full pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.12) 0%, transparent 55%)" }} />
          <span className="relative z-10 flex items-center gap-2">Manage API Keys</span>
        </button>
        </Link>
      </div>
      <div className="w-full border border-neutral-200 rounded-xl px-4 pt-4 pb-2">
        <UsageChart />
      </div>
    </div>
  );
}
