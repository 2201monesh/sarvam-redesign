"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function Select({ options, value, onChange, placeholder = "Select an option" }: SelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full rounded-xl border px-4 py-3 text-sm text-left flex items-center justify-between gap-2 bg-white transition-colors duration-150 outline-none cursor-pointer ${
          open ? "border-zinc-400" : "border-neutral-200 hover:border-neutral-300"
        }`}
      >
        <span className={selected ? "text-zinc-800" : "text-neutral-400"}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          size={15}
          className={`shrink-0 text-neutral-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-1.5 w-full rounded-xl border border-neutral-200 bg-white shadow-lg shadow-black/5 overflow-hidden">
          <ul className="py-1 max-h-52 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => { onChange(option.value); setOpen(false); }}
                    className={`w-full px-4 py-2.5 text-sm text-left flex items-center justify-between gap-2 transition-colors duration-100 cursor-pointer ${
                      isSelected
                        ? "bg-zinc-50 text-zinc-900"
                        : "text-zinc-700 hover:bg-neutral-50"
                    }`}
                  >
                    {option.label}
                    {isSelected && <Check size={14} className="text-zinc-800 shrink-0" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
