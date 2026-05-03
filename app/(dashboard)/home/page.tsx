import HomeHeader from "@/modules/home/HomeHeader";
import VoicesList from "@/modules/home/VoicesList";
import ConversationCard from "@/modules/home/ConversationCard";

export default function HomePage() {
  return (
    <div className="flex-1 w-full">
      <HomeHeader />
      <div className="w-full h-[45%] flex pt-6">
        <VoicesList />
        <ConversationCard />
      </div>
    </div>
  );
}
