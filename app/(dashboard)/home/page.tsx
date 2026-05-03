import VoicesTabs from "@/components/VoicesTabs";

const COLORS = ["#72a539", "#8fa1f8", "#ffbd50"];

function randomColors() {
  return [...COLORS].sort(() => Math.random() - 0.5);
}

const voices = [
  { title: "Energetic Voice for Helpdesk", category: "Male - Shubh" },
  { title: "Engaging Voice for Storytelling", category: "Male - Aditya" },
  { title: "Deep Voice for Edtech & Media", category: "Female - Ishita" },
];

export default function HomePage() {
  const colors = randomColors();

  return (
    <div className="flex-1 w-full">
      <div className="w-full h-[10%] border-b border-neutral-200 flex items-center px-6">
        <p className="text-xl font-[family-name:var(--font-season-mix)]">Welcome, Monesh</p>
      </div>
      <div className="w-full h-[45%] extra flex pt-6">
        <div className="w-[50%] h-full flex flex-col pl-6 gap-3.5 justify-center">
          {voices.map((v, i) => (
            <VoicesTabs key={v.category} title={v.title} category={v.category} color={colors[i]} />
          ))}
        </div>
        <div className="w-[50%] h-full border"></div>
      </div>
    </div>
  );
}
