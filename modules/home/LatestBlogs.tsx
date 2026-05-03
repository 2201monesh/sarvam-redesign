import { ChevronRight } from "lucide-react";

const blogs = [
  {
    tag: "Product",
    title: "Introducing Bulbul: Natural Text-to-Speech for Indian Languages",
    date: "Apr 28, 2025",
    readTime: "4 min read",
  },
  {
    tag: "Research",
    title: "Saaras v2: Faster and More Accurate Speech Recognition",
    date: "Apr 18, 2025",
    readTime: "6 min read",
  },
  {
    tag: "Tutorial",
    title: "Building Voice Agents with Sarvam APIs in Under 10 Minutes",
    date: "Apr 10, 2025",
    readTime: "5 min read",
  },
  {
    tag: "Product",
    title: "Mayura: High-Fidelity Translation Across 22 Indic Languages",
    date: "Mar 30, 2025",
    readTime: "3 min read",
  },
];

const tagColors: Record<string, { bg: string; text: string }> = {
  Product:  { bg: "bg-indigo-50",  text: "text-indigo-500" },
  Research: { bg: "bg-emerald-50", text: "text-emerald-600" },
  Tutorial: { bg: "bg-amber-50",   text: "text-amber-600"  },
};

export default function LatestBlogs() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between">
        <p className="capitalize font-medium text-3xl font-season-mix">Latest blogs</p>
        <button className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-neutral-500 bg-neutral-100 hover:text-neutral-800 transition-colors duration-100 cursor-pointer shrink-0">
          View all
          <ChevronRight size={14} />
        </button>
      </div>

      <div className="mt-6 flex-1 border border-neutral-200 rounded-xl overflow-hidden divide-y divide-neutral-100">
        {blogs.map((blog) => {
          const colors = tagColors[blog.tag] ?? { bg: "bg-neutral-100", text: "text-neutral-500" };
          return (
            <div
              key={blog.title}
              className="px-4 py-3.5 hover:bg-neutral-50 cursor-pointer transition-colors duration-100 group"
            >
              <span className={`inline-block text-[10px] font-medium uppercase tracking-wide px-2 py-0.5 rounded-full mb-1.5 ${colors.bg} ${colors.text}`}>
                {blog.tag}
              </span>
              <p className="text-sm font-medium text-zinc-800 leading-snug group-hover:text-zinc-900 line-clamp-2">
                {blog.title}
              </p>
              <p className="text-xs text-neutral-400 mt-1.5">
                {blog.date} · {blog.readTime}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
