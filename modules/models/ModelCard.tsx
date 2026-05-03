import { ArrowRight } from "lucide-react";
import type { ModelData } from "@/modules/models/modelsData";

// 🖼️ Image list (ordered)
const IMAGES = [
  "https://images.unsplash.com/photo-1503455637927-730bce8583c0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1507608158173-1dcec673a2e5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1669392157886-f4e298c8ec6b?q=80&w=1122&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1675874973165-2c875c9ed382?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDY1fHx8ZW58MHx8fHx8",
  "https://plus.unsplash.com/premium_photo-1670271544820-462bffe5930d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2Mnx8fGVufDB8fHx8fA%3D%3D",
];

// 🔑 Stable mapping based on name
function getImage(name: string) {
  const index =
    name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    IMAGES.length;

  return IMAGES[index];
}

export default function ModelCard({ model }: { model: ModelData }) {
  const image = getImage(model.name);

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden flex flex-col">
      
      {/* Top section with image */}
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={image}
          alt="card visual"
          className="w-full h-full object-cover"
        />

        {/* subtle overlay for readability */}
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-base font-medium text-zinc-900 font-season-mix leading-tight">
              {model.name}
              {model.version && (
                <span className="text-neutral-400 font-matter font-normal text-sm ml-1">
                  {model.version}
                </span>
              )}
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              {model.type}
            </p>
          </div>

          <div className="flex gap-1.5 flex-wrap justify-end">
            {model.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-500 border border-neutral-200 font-medium whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <p className="text-xs text-neutral-500 leading-relaxed">
          {model.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {model.languages.map((lang) => (
            <span
              key={lang}
              className="text-[11px] px-2 py-0.5 rounded-full border border-neutral-200 text-neutral-500"
            >
              {lang}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-2 border-t border-neutral-100 flex items-center justify-between">
          <span className="font-mono text-[11px] text-neutral-400">
            {model.endpoint}
          </span>

          <button className="flex items-center gap-1.5 text-xs font-medium text-zinc-700 hover:text-zinc-900 transition-colors cursor-pointer">
            Explore API
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}