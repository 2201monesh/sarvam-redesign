import { ChevronRight } from "lucide-react";

interface SetupCardProps {
  title: string;
  description: string;
  color: string;
}

export default function SetupCard({ title, description, color }: SetupCardProps) {
  return (
    <div className="w-80 shrink-0">
      <div
        className="relative w-full h-36 rounded-xl flex items-end px-4 pb-3 overflow-hidden border border-neutral-100"
        style={{
          background: `radial-gradient(ellipse at 62% 38%, rgba(255,255,255,0.28) 0%, transparent 55%), ${color}`,
        }}
      >
        <img
          src="/mandala.svg"
          alt=""
          aria-hidden="true"
          className="absolute -right-7 top-1/2 -translate-y-1/2 w-44 opacity-[0.70] pointer-events-none select-none"
        />
        <p className="relative capitalize font-semibold font-season-mix text-zinc-700">{title}</p>
      </div>
      <p className="text-sm mt-4 text-neutral-600">{description}</p>
      <button className="flex items-center gap-1.5 rounded-full px-3 py-1.5 mt-2 text-sm text-neutral-500 transition-colors duration-100 cursor-pointer -ml-3">
        Read more
        <ChevronRight size={14} />
      </button>
    </div>
  );
}
