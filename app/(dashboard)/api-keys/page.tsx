import ApiKeysHeader from "@/modules/api-keys/ApiKeysHeader";

export default function ApiKeysPage() {
  return (
    <div className="flex-1 w-full">
      <ApiKeysHeader />
      <div className="p-6">
        <p>Publishable and secret API keys</p>
      </div>
      <div className="w-full px-6 flex">
        <div className="border border-neutral-200 rounded-xl w-full h-30"></div>
      </div>
    </div>
  );
}
