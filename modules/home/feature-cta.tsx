import { ArrowRight } from "lucide-react";

export default function FeatureCTA() {
  return (
    <div className="flex flex-col lg:flex-row w-full gap-6">
      <div className="w-full lg:w-1/2 pt-2 pb-6">
        <p className="text-3xl font-season-mix font-medium capitalize">Voices that feel real</p>
        <p className="text-neutral-600 text-sm mt-2">Realistic. Nuanced. Expressive.</p>
        <button className="flex items-center gap-2 border border-neutral-200 hover:border-neutral-300 cursor-pointer rounded-full px-4 py-3 mt-4 text-sm">
          Generate Speech
          <ArrowRight size={14} />
        </button>
      </div>
      <div className="w-full lg:w-1/2 pt-2 pb-6 lg:pl-6">
        <p className="text-3xl font-season-mix font-medium capitalize">Best-in-class Speech to Text</p>
        <p className="text-neutral-600 text-sm mt-2">Powered by Saaras. Accurate. Fast. Multilingual.</p>
        <button className="flex items-center gap-2 border border-neutral-200 hover:border-neutral-300 cursor-pointer rounded-full px-4 py-3 mt-4 text-sm">
          Start Transcribing
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
