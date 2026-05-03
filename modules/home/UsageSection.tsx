import UsageChart from "@/modules/home/UsageChart";

export default function UsageSection() {
  return (
    <div className="w-full px-6 pb-10">
      <p className="font-season-mix capitalize font-medium text-3xl pb-6">Usage</p>
      <div className="w-full border border-neutral-200 rounded-xl px-4 pt-4 pb-2">
        <UsageChart />
      </div>
    </div>
  );
}
