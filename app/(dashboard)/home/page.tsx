import HomeHeader from "@/modules/home/HomeHeader";
import VoicesList from "@/modules/home/VoicesList";
import ConversationCard from "@/modules/home/ConversationCard";
import FeatureCTA from "@/modules/home/FeatureCTA";
import FeaturesGrid from "@/modules/home/FeaturesGrid";
import ApiKeyBanner from "@/modules/home/ApiKeyBanner";
import UsageSection from "@/modules/home/UsageSection";
import SetupSection from "@/modules/home/SetupSection";
import LatestBlogs from "@/modules/home/LatestBlogs";
import DeveloperQuickstart from "@/modules/home/DeveloperQuickstart";

export default function HomePage() {
  return (
    <div className="flex-1 w-full">
      <HomeHeader />
      <div className="px-6 py-6 flex flex-col gap-10 max-w-[1400px] mx-auto w-full">
        <DeveloperQuickstart />
        <ApiKeyBanner />
        <UsageSection />

        <FeaturesGrid />
        {/* <div className="w-full flex items-stretch gap-8">
          <div className="flex-4 min-w-0">
            <FeaturesGrid />
          </div>
          <div className="flex-2 min-w-0 flex flex-col">
            <LatestBlogs />
          </div>
        </div> */}
        <div className="w-full flex flex-col lg:flex-row items-stretch gap-6">
          <VoicesList />
          <ConversationCard />
        </div>
        <FeatureCTA />

        <SetupSection />
      </div>
    </div>
  );
}
