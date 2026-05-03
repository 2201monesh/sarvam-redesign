import { Volume2, Mic, Languages, MessageSquare, ChevronRight } from "lucide-react";
import FeatureCard from "@/modules/home/FeatureCard";

export default function FeaturesGrid() {
  return (
    <div className="w-full px-6 pb-10">
      <div className="flex items-center pt-6">
        <p className="capitalize font-medium text-3xl font-season-mix mr-6">Get connected with all the sarvam features</p>
        <button className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 transition-colors duration-100 cursor-pointer">
          Show more
          <ChevronRight size={14} />
        </button>
      </div>
      <div className="w-full pt-6 flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <FeatureCard title="Text to Speech" icon={Volume2} />
        <FeatureCard title="Speech to Text" icon={Mic} />
        <FeatureCard title="Translate" icon={Languages} />
        <FeatureCard title="Chat" icon={MessageSquare} />
      </div>
    </div>
  );
}
