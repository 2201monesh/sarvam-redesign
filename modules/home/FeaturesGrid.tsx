"use client";

import { useRef } from "react";
import { ChevronRight } from "lucide-react";
import FeatureCard from "@/modules/home/FeatureCard";
import { Volume2Icon, type Volume2IconHandle } from "@/components/ui/icons/volume-2";
import { MicIcon, type MicIconHandle } from "@/components/ui/icons/mic";
import { LanguagesIcon, type LanguagesIconHandle } from "@/components/ui/icons/languages";
import { MessageSquareIcon, type MessageSquareIconHandle } from "@/components/ui/icons/message-square";

export default function FeaturesGrid() {
  const ttsRef  = useRef<Volume2IconHandle>(null);
  const sttRef  = useRef<MicIconHandle>(null);
  const transRef = useRef<LanguagesIconHandle>(null);
  const chatRef = useRef<MessageSquareIconHandle>(null);

  return (
    <div className="w-full px-6 pb-10">
      <div className="flex items-center pt-6">
        <p className="capitalize font-medium text-3xl font-season-mix mr-6">Get connected with all the sarvam features</p>
        <button className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 transition-colors duration-100 cursor-pointer">
          Start building
          <ChevronRight size={14} />
        </button>
      </div>
      <div className="w-full pt-6 flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <FeatureCard
          title="Text to Speech"
          gradientColor="#c3cff3"
          iconElement={<Volume2Icon ref={ttsRef} size={20} />}
          onMouseEnter={() => ttsRef.current?.startAnimation()}
          onMouseLeave={() => ttsRef.current?.stopAnimation()}
        />
        <FeatureCard
          title="Speech to Text"
          gradientColor="#fbd6c6"
          iconElement={<MicIcon ref={sttRef} size={20} />}
          onMouseEnter={() => sttRef.current?.startAnimation()}
          onMouseLeave={() => sttRef.current?.stopAnimation()}
        />
        <FeatureCard
          title="Translate"
          gradientColor="#c3cff3"
          iconElement={<LanguagesIcon ref={transRef} size={20} />}
          onMouseEnter={() => transRef.current?.startAnimation()}
          onMouseLeave={() => transRef.current?.stopAnimation()}
        />
        <FeatureCard
          title="Chat"
          gradientColor="#fbd6c6"
          iconElement={<MessageSquareIcon ref={chatRef} size={20} />}
          onMouseEnter={() => chatRef.current?.startAnimation()}
          onMouseLeave={() => chatRef.current?.stopAnimation()}
        />
      </div>
    </div>
  );
}
