import { ChevronRight } from "lucide-react";

interface SetupCardProps {
  title: string;
  description: string;
  color: string;
  href: string;
}

export default function SetupCard({ title, description, color, href }: SetupCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-80 shrink-0 group cursor-pointer"
    >
      <div
        className="relative w-full h-36 rounded-xl flex items-end px-4 pb-3 overflow-hidden border border-neutral-100 transition-shadow duration-200"
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
      <span className="flex items-center gap-1.5 rounded-full px-3 py-1.5 mt-2 text-sm text-neutral-500 group-hover:text-neutral-800 transition-colors duration-100 -ml-3">
        Read more
        <ChevronRight size={14} className="transition-transform duration-150 group-hover:translate-x-0.5" />
      </span>
    </a>
  );
}
