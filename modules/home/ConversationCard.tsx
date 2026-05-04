import { Play } from "lucide-react";

const descriptions = [
  "Arya speaks with a calm, professional tone that instantly builds trust with callers. Her voice is clear and measured, making her ideal for customer support and IVR flows where clarity matters most.",
  "Ravi brings energy and warmth to every interaction. His upbeat delivery keeps listeners engaged, making him a strong fit for marketing campaigns, onboarding experiences, and brand storytelling.",
  "Neha's voice carries a natural softness with just the right amount of authority. She works exceptionally well in healthcare and financial contexts where empathy and precision go hand in hand.",
  "Karan delivers a deep, resonant tone that commands attention. His voice is well-suited for documentary narration, edtech content, and scenarios where gravitas and credibility are key.",
  "Priya combines a youthful energy with a conversational ease that feels approachable and real. She excels in social media content, casual brand interactions, and youth-focused campaigns.",
];

export default function ConversationCard() {
  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center lg:pl-6">
      <div className="w-full h-64 border border-neutral-200 rounded-2xl flex">

        {/* Left — play button + label */}
        <div className="w-[35%] h-full pl-5 py-5 flex flex-col justify-between">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shrink-0"
            style={{
              background: `linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,0.0) 100%), #e87541`,
            }}
          >
            <Play size={16} className="text-white fill-white ml-0.5" />
          </div>
          <p className="text-sm text-neutral-700">Multi-Speaker Conversation</p>
        </div>

        {/* Right — scrollable descriptions */}
        <div className="w-[65%] h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-5 pr-5 flex flex-col gap-4">
          {descriptions.map((text, i) => (
            <p
              key={i}
              className="border-l-2 border-neutral-100 pl-3 text-sm leading-relaxed text-neutral-500 font-[family-name:var(--font-season-mix)]"
            >
              {text}
            </p>
          ))}
        </div>

      </div>
    </div>
  );
}
