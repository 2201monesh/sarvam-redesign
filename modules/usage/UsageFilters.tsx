"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, X } from "lucide-react";
import {
  FilterOption, PERIOD_OPTIONS, MODEL_OPTIONS,
  API_KEY_OPTIONS, STATUS_OPTIONS, ENV_OPTIONS,
} from "@/modules/usage/usageMockData";


function FilterSelect({ label, options, value, onChange }: {
  label: string; options: FilterOption[]; value: string; onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  function handleOpen() {
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 4, left: r.left, width: Math.max(r.width, 160) });
    }
    setOpen((o) => !o);
  }

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        btnRef.current && !btnRef.current.contains(e.target as Node)
      ) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value);
  const isActive = !!value;

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={handleOpen}
        className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition-colors duration-150 cursor-pointer whitespace-nowrap ${
          isActive
            ? "border-zinc-800 bg-zinc-900 text-white"
            : "border-neutral-200 text-zinc-600 hover:border-neutral-300 hover:text-zinc-800 bg-white"
        }`}
      >
        {selected ? selected.label : label}
        <ChevronDown
          size={12}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""} ${isActive ? "text-zinc-300" : "text-neutral-400"}`}
        />
      </button>

      {open && (
        <div
          ref={menuRef}
          style={{ position: "fixed", top: pos.top, left: pos.left, minWidth: pos.width }}
          className="z-50 rounded-xl border border-neutral-200 bg-white shadow-lg shadow-black/5 py-1 overflow-hidden"
        >
          {value && (
            <button
              type="button"
              onClick={() => { onChange(""); setOpen(false); }}
              className="w-full px-3.5 py-2 text-xs text-left text-neutral-400 hover:bg-neutral-50 transition-colors cursor-pointer border-b border-neutral-100"
            >
              Clear filter
            </button>
          )}
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`w-full flex items-center justify-between gap-3 px-3.5 py-2 text-xs text-left transition-colors cursor-pointer ${
                value === opt.value ? "bg-zinc-50 text-zinc-900" : "text-zinc-700 hover:bg-neutral-50"
              }`}
            >
              {opt.label}
              {value === opt.value && <Check size={12} className="text-zinc-800 shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

export interface UsageFiltersState {
  period: string;
  model: string;
  apiKey: string;
  status: string;
  env: string;
}

interface UsageFiltersProps {
  filters: UsageFiltersState;
  onChange: (patch: Partial<UsageFiltersState>) => void;
  onClear: () => void;
}

export default function UsageFilters({ filters, onChange, onClear }: UsageFiltersProps) {
  const activeCount = [filters.model, filters.apiKey, filters.status, filters.env].filter(Boolean).length;

  return (
    <div className="flex items-center justify-between gap-3 flex-wrap">
      {/* Period segmented control */}
      <div className="flex items-center gap-0.5 rounded-lg border border-neutral-200 bg-neutral-50 p-0.5">
        {PERIOD_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange({ period: opt.value })}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors duration-150 cursor-pointer ${
              filters.period === opt.value
                ? "bg-white text-zinc-900 shadow-sm border border-neutral-200"
                : "text-neutral-500 hover:text-zinc-700"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Dropdown filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <FilterSelect label="Model"       options={MODEL_OPTIONS}   value={filters.model}  onChange={(v) => onChange({ model: v })}  />
        <FilterSelect label="API Key"     options={API_KEY_OPTIONS} value={filters.apiKey} onChange={(v) => onChange({ apiKey: v })} />
        <FilterSelect label="Status"      options={STATUS_OPTIONS}  value={filters.status} onChange={(v) => onChange({ status: v })} />
        {/* <FilterSelect label="Environment" options={ENV_OPTIONS}     value={filters.env}    onChange={(v) => onChange({ env: v })}    /> */}

        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="flex items-center gap-1 rounded-lg border border-neutral-200 px-2.5 py-1.5 text-xs text-neutral-500 hover:text-zinc-700 hover:border-neutral-300 bg-white transition-colors cursor-pointer"
          >
            <X size={11} />
            {activeCount > 1 ? `Clear (${activeCount})` : "Clear"}
          </button>
        )}
      </div>
    </div>
  );
}
