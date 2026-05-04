"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { useState } from "react";
import { PanelLeft, ChevronDown } from "lucide-react";
import { SIDEBAR_OPTION_CONTENT, HOME_OPTION, DEV_OPTIONS } from "./constants";
import { SIDEBAR_OPTION } from "./interfaces";
import { HouseIcon, type HouseIconHandle } from "@/components/ui/icons/house";
import { CpuIcon, type CpuIconHandle } from "@/components/ui/icons/cpu";
import { BarChart2Icon, type BarChart2IconHandle } from "@/components/ui/icons/bar-chart-2";
import { KeyRoundIcon, type KeyRoundIconHandle } from "@/components/ui/icons/key-round";

type AnyHandle = { startAnimation: () => void; stopAnimation: () => void };

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [devOpen, setDevOpen] = useState(true);

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
    const cls = active ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400 dark:text-zinc-500";
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
        ? "bg-[#f0f0f0] font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
        : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-200"
    }`;

  return (
    <aside
      className={`flex h-screen shrink-0 flex-col bg-zinc-50 transition-[width] duration-200 ease-in-out dark:border-zinc-800 dark:bg-zinc-950 ${
        collapsed ? "w-[56px]" : "w-60"
      }`}
    >
      {/* Logo + toggle */}
      <div className={`flex items-center py-5 ${collapsed ? "justify-center px-3" : "justify-between px-5"}`}>
        {!collapsed && (
          <span className="text-3xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100">sarvam</span>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
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
              <div className="h-px w-6 bg-zinc-200 dark:bg-zinc-700" />
            </div>
          ) : (
            <button
              onClick={() => setDevOpen((o) => !o)}
              className="mb-1 flex w-full items-center justify-between rounded-md px-3 py-1 text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
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
    </aside>
  );
}
