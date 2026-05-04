import UsageHeader from "@/modules/usage/usage-header";
import UsageContent from "@/modules/usage/usage-content";

export default function UsagePage() {
  return (
    <div className="flex-1 w-full">
      <UsageHeader />
      <UsageContent />
    </div>
  );
}
