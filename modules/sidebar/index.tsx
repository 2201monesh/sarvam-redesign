"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { useState } from "react";
import { PanelLeft, ChevronDown, Check, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SIDEBAR_OPTION_CONTENT, HOME_OPTION, DEV_OPTIONS } from "./constants";
import { SIDEBAR_OPTION } from "./interfaces";
import { HouseIcon, type HouseIconHandle } from "@/components/ui/icons/house";
import { CpuIcon, type CpuIconHandle } from "@/components/ui/icons/cpu";
import { BarChart2Icon, type BarChart2IconHandle } from "@/components/ui/icons/bar-chart-2";
import { KeyRoundIcon, type KeyRoundIconHandle } from "@/components/ui/icons/key-round";

type AnyHandle = { startAnimation: () => void; stopAnimation: () => void };

const GETTING_STARTED_STEPS = [
  { id: "api-key",  label: "Create API key",   href: "/api-keys" },
  { id: "credits",  label: "Add credits",       href: "/home" },
  { id: "prompt",   label: "Build a prompt",    href: "/home" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [devOpen, setDevOpen] = useState(true);
  const [done, setDone] = useState<Set<string>>(new Set());
  const [cardDismissed, setCardDismissed] = useState(false);

  const toggleDone = (id: string) =>
    setDone((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const homeRef    = useRef<HouseIconHandle>(null);
  const modelsRef  = useRef<CpuIconHandle>(null);
  const usageRef   = useRef<BarChart2IconHandle>(null);
  const apiKeysRef = useRef<KeyRoundIconHandle>(null);

  const iconRefs: Record<SIDEBAR_OPTION, React.RefObject<AnyHandle | null>> = {
    [SIDEBAR_OPTION.HOME]:     homeRef,
    [SIDEBAR_OPTION.MODELS]:   modelsRef,
    [SIDEBAR_OPTION.USAGE]:    usageRef,
    [SIDEBAR_OPTION.API_KEYS]: apiKeysRef,
  };

  const renderIcon = (option: SIDEBAR_OPTION, active: boolean) => {
    const cls = active ? "text-zinc-900" : "text-zinc-400";
    switch (option) {
      case SIDEBAR_OPTION.HOME:     return <HouseIcon    ref={homeRef}    size={16} className={cls} />;
      case SIDEBAR_OPTION.MODELS:   return <CpuIcon      ref={modelsRef}  size={16} className={cls} />;
      case SIDEBAR_OPTION.USAGE:    return <BarChart2Icon ref={usageRef}   size={16} className={cls} />;
      case SIDEBAR_OPTION.API_KEYS: return <KeyRoundIcon ref={apiKeysRef} size={16} className={cls} />;
    }
  };

  const isActive = (href: string) => pathname === href;
  const homeItem = SIDEBAR_OPTION_CONTENT[HOME_OPTION];

  const linkClass = (href: string) =>
    `group mb-1 flex items-center rounded-3xl px-3 py-2.5 text-sm transition-colors duration-100 ${
      collapsed ? "justify-center" : "gap-3.5"
    } ${
      isActive(href)
        ? "bg-[#f0f0f0] font-medium text-zinc-900"
        : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
    }`;

  return (
    <aside
      className={`flex h-screen shrink-0 flex-col bg-zinc-50 transition-[width] duration-200 ease-in-out ${
        collapsed ? "w-[56px]" : "w-60"
      }`}
    >
      {/* Logo + toggle */}
      <div className={`flex items-center py-5 ${collapsed ? "justify-center px-3" : "justify-between px-5"}`}>
        {!collapsed && (
          <span className="text-3xl font-medium tracking-tight text-zinc-900">sarvam</span>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
        >
          <PanelLeft size={16} />
        </button>
      </div>

      <nav className="mt-2 flex flex-1 flex-col px-2">
        {/* Home */}
        <Link
          href={homeItem.href}
          title={collapsed ? homeItem.label : undefined}
          className={linkClass(homeItem.href)}
          onMouseEnter={() => iconRefs[HOME_OPTION].current?.startAnimation()}
          onMouseLeave={() => iconRefs[HOME_OPTION].current?.stopAnimation()}
        >
          {renderIcon(HOME_OPTION, isActive(homeItem.href))}
          {!collapsed && <span>{homeItem.label}</span>}
        </Link>

        {/* Developers section */}
        <div className="mt-3">
          {collapsed ? (
            <div className="mb-1 flex justify-center px-3 py-1">
              <div className="h-px w-6 bg-zinc-200" />
            </div>
          ) : (
            <button
              onClick={() => setDevOpen((o) => !o)}
              className="mb-1 flex w-full items-center justify-between rounded-md px-3 py-1 text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-600"
            >
              Developers
              <ChevronDown size={13} className={`transition-transform duration-200 ${devOpen ? "rotate-0" : "-rotate-90"}`} />
            </button>
          )}

          <div className={`flex flex-col overflow-hidden transition-all duration-200 ease-in-out ${!collapsed && !devOpen ? "max-h-0" : "max-h-96"}`}>
            {DEV_OPTIONS.map((option) => {
              const item = SIDEBAR_OPTION_CONTENT[option];
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={linkClass(item.href)}
                  onMouseEnter={() => iconRefs[option].current?.startAnimation()}
                  onMouseLeave={() => iconRefs[option].current?.stopAnimation()}
                >
                  {renderIcon(option, isActive(item.href))}
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Get started card */}
      <AnimatePresence>
      {!collapsed && !cardDismissed && done.size < GETTING_STARTED_STEPS.length && (
        <motion.div
          className="mx-2 mb-3 rounded-xl border border-zinc-100 bg-white p-3"
          initial={{ opacity: 0, y: 10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.97 }}
          transition={{ duration: 0.22, ease: [0.25, 0, 0, 1] }}
        >
          <div className="mb-2.5 flex items-start justify-between">
            <div>
              <p className="text-[13px] font-medium text-zinc-800">Get started</p>
              <p className="mt-0.5 text-[11px] text-zinc-400">{done.size} of {GETTING_STARTED_STEPS.length} done</p>
            </div>
            <button
              onClick={() => setCardDismissed(true)}
              className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full text-zinc-300 transition-colors hover:bg-zinc-100 hover:text-zinc-500 cursor-pointer"
            >
              <X size={11} />
            </button>
          </div>

          {/* Progress bar */}
          <div className="mb-3 h-1 w-full overflow-hidden rounded-full bg-zinc-100">
            <div
              className="h-full rounded-full bg-zinc-900 transition-all duration-500 ease-out"
              style={{ width: `${(done.size / GETTING_STARTED_STEPS.length) * 100}%` }}
            />
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-1">
            {GETTING_STARTED_STEPS.map((step) => {
              const checked = done.has(step.id);
              return (
                <div key={step.id} className="group flex items-center gap-2.5 rounded-lg px-1 py-1.5 transition-colors hover:bg-zinc-50">
                  <button
                    onClick={() => toggleDone(step.id)}
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all duration-150 cursor-pointer ${
                      checked
                        ? "border-zinc-900 bg-zinc-900"
                        : "border-zinc-200 hover:border-zinc-400"
                    }`}
                  >
                    {checked && <Check size={8} strokeWidth={3} className="text-white" />}
                  </button>
                  <Link
                    href={step.href}
                    className={`flex-1 text-[12px] transition-colors ${
                      checked ? "text-zinc-300 line-through" : "text-zinc-600 hover:text-zinc-900"
                    }`}
                  >
                    {step.label}
                  </Link>
                  {!checked && (
                    <ArrowRight size={11} className="text-zinc-200 transition-colors group-hover:text-zinc-400" />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </aside>
  );
}
