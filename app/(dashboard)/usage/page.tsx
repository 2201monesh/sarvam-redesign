import UsageHeader from "@/modules/usage/UsageHeader";
import UsageContent from "@/modules/usage/UsageContent";

export default function UsagePage() {
  return (
    <div className="flex-1 w-full">
      <UsageHeader />
      <UsageContent />
    </div>
  );
}
