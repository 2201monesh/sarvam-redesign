import ApiKeysHeader from "@/modules/api-keys/ApiKeysHeader";
import ApiKeysSection from "@/modules/api-keys/ApiKeysSection";

export default function ApiKeysPage() {
  return (
    <div className="flex-1 w-full">
      <ApiKeysHeader />
      <ApiKeysSection />
    </div>
  );
}
