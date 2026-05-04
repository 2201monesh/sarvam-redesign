export const CONVERSATION_SPEAKERS = [
  {
    name: "Arya",
    voice: "ishita",
    text: "Arya speaks with a calm, professional tone that instantly builds trust with callers. Her voice is clear and measured, making her ideal for customer support and IVR flows where clarity matters most.",
  },
  {
    name: "Ravi",
    voice: "rahul",
    text: "Ravi brings energy and warmth to every interaction. His upbeat delivery keeps listeners engaged, making him a strong fit for marketing campaigns, onboarding experiences, and brand storytelling.",
  },
  {
    name: "Neha",
    voice: "neha",
    text: "Neha's voice carries a natural softness with just the right amount of authority. She works exceptionally well in healthcare and financial contexts where empathy and precision go hand in hand.",
  },
  {
    name: "Karan",
    voice: "kabir",
    text: "Karan delivers a deep, resonant tone that commands attention. His voice is well-suited for documentary narration, edtech content, and scenarios where gravitas and credibility are key.",
  },
  {
    name: "Priya",
    voice: "priya",
    text: "Priya combines a youthful energy with a conversational ease that feels approachable and real. She excels in social media content, casual brand interactions, and youth-focused campaigns.",
  },
] as const;

export type ConversationSpeaker = (typeof CONVERSATION_SPEAKERS)[number];
