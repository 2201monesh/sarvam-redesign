import HomeHeader from "@/modules/home/HomeHeader";
import VoicesList from "@/modules/home/VoicesList";
import ConversationCard from "@/modules/home/ConversationCard";
import FeatureCTA from "@/modules/home/FeatureCTA";
import FeaturesGrid from "@/modules/home/FeaturesGrid";
import ApiKeyBanner from "@/modules/home/ApiKeyBanner";
import UsageSection from "@/modules/home/UsageSection";
import SetupSection from "@/modules/home/SetupSection";

export default function HomePage() {
  return (
    <div className="flex-1 w-full">
      <HomeHeader />
      <ApiKeyBanner />
      <div className="w-full flex items-stretch pt-4 pb-10">
        <VoicesList />
        <ConversationCard />
      </div>
      <FeatureCTA />
      <FeaturesGrid />
      <UsageSection />
      <SetupSection />
    </div>
  );
}
