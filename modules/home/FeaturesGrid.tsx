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
    <div className="w-full">
      <div className="flex items-center justify-between">
        <p className="capitalize font-medium text-3xl font-season-mix mr-6">Explore Sarvam features</p>
        <button className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-neutral-500 bg-neutral-100 hover:text-neutral-800 transition-colors duration-100 cursor-pointer">
          Start building
          <ChevronRight size={14} />
        </button>
      </div>
      <div className="w-full pt-6 grid grid-cols-2 gap-5">
        <FeatureCard
          title="Text to Speech"
          modelName="Bulbul"
          description="Convert text into natural, expressive speech across 10+ Indian languages with customisable voice and tone."
          imageUrl="https://images.unsplash.com/photo-1503455637927-730bce8583c0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          iconElement={<Volume2Icon ref={ttsRef} size={24} />}
          onMouseEnter={() => ttsRef.current?.startAnimation()}
          onMouseLeave={() => ttsRef.current?.stopAnimation()}
        />
        <FeatureCard
          title="Speech to Text"
          modelName="Saaras"
          description="Transcribe live or recorded audio with high accuracy across diverse accents and Indian languages."
          imageUrl="https://images.unsplash.com/photo-1507608158173-1dcec673a2e5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          iconElement={<MicIcon ref={sttRef} size={24} />}
          onMouseEnter={() => sttRef.current?.startAnimation()}
          onMouseLeave={() => sttRef.current?.stopAnimation()}
        />
        <FeatureCard
          title="Translate"
          modelName="Mayura"
          description="Translate between English and 22 Indian languages with high fidelity, optimised for structured long text."
          imageUrl="https://plus.unsplash.com/premium_photo-1669392157886-f4e298c8ec6b?q=80&w=1122&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          iconElement={<LanguagesIcon ref={transRef} size={24} />}
          onMouseEnter={() => transRef.current?.startAnimation()}
          onMouseLeave={() => transRef.current?.stopAnimation()}
        />
        <FeatureCard
          title="Chat"
          modelName="Sarvam-2B"
          description="Build multilingual conversational experiences with Sarvam's Indic-optimised chat and agent APIs."
          imageUrl="https://plus.unsplash.com/premium_photo-1675874973165-2c875c9ed382?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDY1fHx8ZW58MHx8fHx8"
          iconElement={<MessageSquareIcon ref={chatRef} size={24} />}
          onMouseEnter={() => chatRef.current?.startAnimation()}
          onMouseLeave={() => chatRef.current?.stopAnimation()}
        />
      </div>
    </div>
  );
}
