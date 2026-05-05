import HomeHeader from "@/modules/home/components/home-header";
import VoicesList from "@/modules/home/components/voices-list";
import ConversationCard from "@/modules/home/components/conversation-card";
import FeatureCTA from "@/modules/home/components/feature-cta";
import FeaturesGrid from "@/modules/home/components/features-grid";
import FeaturesShowcase from "@/modules/home/components/features-showcase";
import ApiKeyBanner from "@/modules/home/components/api-key-banner";
import UsageSection from "@/modules/home/components/usage-section";
import SetupSection from "@/modules/home/components/setup-section";
import DeveloperQuickstart from "@/modules/home/components/developer-quickstart";
import { textToSpeechServer } from "@/lib/sarvam/tts-server";
import { CONVERSATION_SPEAKERS } from "@/modules/home/data/conversationSpeakers";
import MainSectionHome from "@/modules/home/components/main-section-home";

export default async function HomePage() {
  // const audios = await Promise.all(
  //   CONVERSATION_SPEAKERS.map((s) =>
  //     textToSpeechServer({
  //       text: s.text,
  //       target_language_code: "en-IN",
  //       speaker: s.voice,
  //       model: "bulbul:v3",
  //       speech_sample_rate: 8000,
  //       pace: 1.0,
  //     }).catch(() => "")
  //   )
  // );

  return (
    <div className="flex-1 w-full">
      <HomeHeader />
      <div className="px-6 py-6 flex flex-col gap-10 max-w-[1400px] mx-auto w-full">
        {/* <DeveloperQuickstart /> */}
        {/* <MainSectionHome /> */}
        {/* <ApiKeyBanner /> */}
        <UsageSection />

        {/* <FeaturesGrid /> */}
        <FeaturesShowcase />
        {/* <div className="w-full flex flex-col lg:flex-row items-stretch gap-6">
          <VoicesList />
          <ConversationCard audios={audios} />
        </div>
        <FeatureCTA /> */}

        <SetupSection />
      </div>
    </div>
  );
}
