import { Play } from "lucide-react";

interface VoicesTabsProps {
  title: string;
  category: string;
  color: string;
}

export default function VoicesTabs({ title, category, color }: VoicesTabsProps) {
  return (
    <div className="w-[80%] h-18 border border-neutral-200 rounded-full flex items-center px-3">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shrink-0"
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,0.0) 100%), ${color}`,
        }}
      >
        <Play size={16} className="text-white fill-white ml-0.5" />
      </div>
      <div className="pl-4">
        <p className="text-sm">{title}</p>
        <p className="text-sm text-neutral-600">{category}</p>
      </div>
    </div>
  );
}
