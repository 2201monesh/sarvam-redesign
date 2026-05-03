import VoicesTabs from "@/components/VoicesTabs";

const COLORS = ["#72a539", "#8fa1f8", "#ffbd50"];

const voices = [
  { title: "Energetic Voice for Helpdesk", category: "Male - Shubh" },
  { title: "Engaging Voice for Storytelling", category: "Male - Aditya" },
  { title: "Deep Voice for Edtech & Media", category: "Female - Ishita" },
];

function randomColors() {
  return [...COLORS].sort(() => Math.random() - 0.5);
}

export default function VoicesList() {
  const colors = randomColors();

  return (
    <div className="w-[50%] flex flex-col pl-6 gap-3.5 justify-center">
      {voices.map((v, i) => (
        <VoicesTabs key={v.category} title={v.title} category={v.category} color={colors[i]} />
      ))}
    </div>
  );
}
