import { LuKeyRound } from "react-icons/lu";
import { MdCurrencyRupee } from "react-icons/md";
import { BsChatLeftText } from "react-icons/bs";
import { GoArrowUpRight } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";

const STEPS = [
  { icon: <LuKeyRound size={16} />, label: "1. Create an API key" },
  { icon: <MdCurrencyRupee size={16} />, label: "2. Add credits" },
  { icon: <BsChatLeftText size={16} />, label: "3. Build a prompt" },
];

const LINKS = [
  {
    label: "Developer quickstart",
    sub: "Make your first API request in minutes",
  },
  {
    label: "Responses Starter app",
    sub: "Copy an example and start building",
  },
];

const MainSectionHome = () => {
  return (
    <div>
      <div className="w-full flex items-center justify-between mb-4">
        <p className="font-season-mix capitalize font-medium text-2xl">Get Started</p>
        <div className="flex items-center gap-1.5 cursor-pointer text-neutral-500 hover:text-neutral-800 transition-colors duration-150 select-none">
          <RxCross2 size={16} />
          <p className="text-sm">Dismiss</p>
        </div>
      </div>

      <div className="w-full border rounded-xl border-neutral-200 flex flex-row justify-between items-stretch px-6 py-5 gap-6">
        {/* Steps */}
        <div className="flex flex-col justify-between gap-3 min-h-[9rem]">
          {STEPS.map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-600 shrink-0">
                {icon}
              </span>
              <p className="text-neutral-600 leading-snug text-sm whitespace-nowrap">{label}</p>
            </div>
          ))}
        </div>

        {/* CTA cards */}
        <div className="flex flex-row flex-wrap items-end justify-end gap-2">
          {LINKS.map(({ label, sub }) => (
            <div
              key={label}
              className="w-52 xl:w-60 2xl:w-64 h-16 border border-neutral-200 shadow-xs rounded-lg flex flex-col justify-center gap-1 px-4 cursor-pointer hover:bg-neutral-50 active:scale-[0.96] transition-[transform,background-color] duration-150"
            >
              <div className="flex items-center gap-1.5">
                <p className="text-sm">{label}</p>
                <GoArrowUpRight size={14} className="shrink-0 text-neutral-500" />
              </div>
              <p className="text-xs text-neutral-500 leading-snug">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainSectionHome;
