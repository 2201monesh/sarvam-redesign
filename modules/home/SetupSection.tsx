import SetupCard from "@/modules/home/SetupCard";

const setupItems = [
  {
    title: "Text Processing Overview",
    description:
      "Sarvam Translate enables high quality translation between English and 22 scheduled Indian languages, optimised for structured, long-form text.",
  },
  {
    title: "Getting Started with TTS",
    description:
      "Convert any text into natural-sounding speech in seconds. Configure voice, pitch, and pace to match your product's tone and audience.",
  },
  {
    title: "Speech Recognition Setup",
    description:
      "Integrate Saaras into your app to transcribe audio in real time. Supports 10+ Indian languages with high accuracy across accents.",
  },
  {
    title: "Voice Agent Quickstart",
    description:
      "Build end-to-end voice bots that understand and respond naturally. Connect your backend with Sarvam's agent APIs in minutes.",
  },
  {
    title: "API Key & Authentication",
    description:
      "Generate and manage API keys from your dashboard. Secure every request with token-based auth and monitor usage per key.",
  },
];

export default function SetupSection() {
  return (
    <div className="w-full px-6 pb-10">
      <p className="font-season-mix capitalize font-medium text-3xl pb-6">Learn how to setup?</p>
      <div className="w-full flex gap-4 overflow-x-auto rounded-xl pt-4 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {setupItems.map((item) => (
          <SetupCard key={item.title} title={item.title} description={item.description} />
        ))}
      </div>
    </div>
  );
}
