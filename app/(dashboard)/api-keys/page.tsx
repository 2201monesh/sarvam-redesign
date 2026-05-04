import ApiKeysHeader from "@/modules/api-keys/api-keys-header";
import ApiKeysSection from "@/modules/api-keys/api-keys-section";

export default function ApiKeysPage() {
  return (
    <div className="flex-1 w-full">
      <ApiKeysHeader />
      <ApiKeysSection />
    </div>
  );
}
