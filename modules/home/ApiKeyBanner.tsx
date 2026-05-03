import GlowButton from "@/components/GlowButton";

export default function ApiKeyBanner() {
  return (
    <div className="w-full px-6 pb-10">
      <div className="w-full border border-neutral-200 rounded-xl h-26 flex items-center justify-between px-6">
        <div className="flex">
          <p className="mr-4 flex items-center justify-center border">logo</p>
          <div className="flex flex-col">
            <p className="font-season-mix">Create an API Key</p>
            <p className="text-sm text-neutral-600">
              You need to have an API Key to start using Sarvam's features in your projects
            </p>
          </div>
        </div>
        <GlowButton label="Manage API Keys" />
      </div>
    </div>
  );
}
