import HomeHeader from "@/modules/home/HomeHeader";
import VoicesList from "@/modules/home/VoicesList";
import ConversationCard from "@/modules/home/ConversationCard";
import FeatureCTA from "@/modules/home/FeatureCTA";
import FeaturesGrid from "@/modules/home/FeaturesGrid";
import ApiKeyBanner from "@/modules/home/ApiKeyBanner";
import UsageSection from "@/modules/home/UsageSection";
import SetupSection from "@/modules/home/SetupSection";
import DeveloperQuickstart from "@/modules/home/DeveloperQuickstart";
import { textToSpeechServer } from "@/lib/sarvam/tts-server";
import { CONVERSATION_SPEAKERS } from "@/modules/home/data/conversationSpeakers";

export default async function HomePage() {
  const audios = await Promise.all(
    CONVERSATION_SPEAKERS.map((s) =>
      textToSpeechServer({
        text: s.text,
        target_language_code: "en-IN",
        speaker: s.voice,
        model: "bulbul:v3",
        speech_sample_rate: 8000,
        pace: 1.0,
      }).catch(() => "")
    )
  );

  return (
    <div className="flex-1 w-full">
      <HomeHeader />
      <div className="px-6 py-6 flex flex-col gap-10 max-w-[1400px] mx-auto w-full">
        <DeveloperQuickstart />
        <ApiKeyBanner />
        <UsageSection />

        <FeaturesGrid />
        <div className="w-full flex flex-col lg:flex-row items-stretch gap-6">
          <VoicesList />
          <ConversationCard audios={audios} />
        </div>
        <FeatureCTA />

        <SetupSection />
      </div>
    </div>
  );
}
