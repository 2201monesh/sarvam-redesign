import HomeHeader from "@/modules/home/HomeHeader";
import VoicesList from "@/modules/home/VoicesList";
import ConversationCard from "@/modules/home/ConversationCard";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex-1 w-full">
      <HomeHeader />
      <div className="w-full h-[45%] flex pt-6">
        <VoicesList />
        <ConversationCard />
      </div>
      <div className="flex w-full pt-4">
        <div className="w-[50%] pl-6">
          <p className="text-3xl font-season-mix font-medium capitalize">Voices that feel real</p>
          <p className="text-neutral-600 text-sm mt-2">Realistic. Nuanced. Expressive.</p>
          <button className="flex items-center gap-2 border border-neutral-200 hover:border-neutral-300 cursor-pointer rounded-full px-4 py-3 mt-3 text-sm">
            Generate Speech
            <ArrowRight size={14} />
          </button>
        </div>
        <div className="w-[50%] pr-6">
          <p className="text-3xl font-season-mix font-medium capitalize">Best-in-class Speech to Text</p>
          <p className="text-neutral-600 text-sm mt-2">Powered by Saaras. Accurate. Fast. Multilingual.</p>
          <button className="flex items-center gap-2 border border-neutral-200 hover:border-neutral-300 cursor-pointer rounded-full px-4 py-3 mt-3 text-sm">
            Start Transcribing
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
