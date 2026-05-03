import UsageChart from "@/modules/home/UsageChart";
import { ChevronRight } from "lucide-react";

export default function UsageSection() {
  return (
    <div className="w-full px-6 pb-10">
      <div className="flex items-center pb-6">
        <p className="font-season-mix capitalize font-medium text-3xl mr-6">Usage</p>
        <button className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 transition-colors duration-100 cursor-pointer">
          View more
          <ChevronRight size={14} />
        </button>
      </div>
      <div className="w-full border border-neutral-200 rounded-xl px-4 pt-4 pb-2">
        <UsageChart />
      </div>
    </div>
  );
}
