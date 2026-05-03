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
        {/* <GlowButton label="Manage API Keys" /> */}
        <button
          className={`relative overflow-hidden bg-black text-white rounded-full px-5 text-sm py-3 font-season-mix cursor-pointer focus:outline-none outline-none border-none disabled:opacity-40 disabled:cursor-not-allowed`}
          style={{
             boxShadow:
             "inset 0 0 0 1.5px rgba(255,255,255,0.75), inset 0 0 12px rgba(255,255,255,0.55), inset 0 0 30px rgba(255,255,255,0.25)",
          }}
    >
      <span
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.12) 0%, transparent 55%)" }}
      />
      <span className="relative z-10">Manage API Keys</span>
    </button>
      </div>
    </div>
  );
}
