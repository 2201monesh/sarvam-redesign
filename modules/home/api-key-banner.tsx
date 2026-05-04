import Image from "next/image";
import Link from "next/link";

export default function ApiKeyBanner() {
  return (
    <div className="w-full border border-neutral-200 rounded-xl flex items-center justify-between gap-6 pr-5 pl-2 py-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="shrink-0">
            <Image
              src="/sarvam-logo-removebg-preview.png"
              alt="Sarvam"
              width={60}
              height={60}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <p className="font-season-mix">Create an API Key</p>
            <p className="text-sm text-neutral-600 leading-snug">
              You need to have an API Key to start using Sarvam&apos;s features in your projects
            </p>
          </div>
        </div>
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
  );
}
