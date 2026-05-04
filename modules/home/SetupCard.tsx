import { ChevronRight } from "lucide-react";

interface SetupCardProps {
  title: string;
  description: string;
}

export default function SetupCard({ title, description }: SetupCardProps) {
  return (
    <div className="w-80 shrink-0">
      <div
        className="w-full h-36 rounded-xl flex items-end px-4 pb-3 overflow-hidden"
        style={{
          backgroundImage: "url(/bg-img-sarvam.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <p className="capitalize font-semibold font-season-mix text-white drop-shadow-sm">{title}</p>
      </div>
      <p className="text-sm mt-4 text-neutral-600">{description}</p>
      <button className="flex items-center gap-1.5 rounded-full px-3 py-1.5 mt-2 text-sm text-neutral-500 transition-colors duration-100 cursor-pointer -ml-3">
        Read more
        <ChevronRight size={14} />
      </button>
    </div>
  );
}
