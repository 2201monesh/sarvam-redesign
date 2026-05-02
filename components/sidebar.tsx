"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  House,
  Cpu,
  FlaskConical,
  KeyRound,
  PanelLeft,
  ChevronDown,
} from "lucide-react";

const devItems = [
  { label: "Models", href: "/models", icon: Cpu },
  { label: "Playground", href: "/playground", icon: FlaskConical },
  { label: "API Keys", href: "/api-keys", icon: KeyRound },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [devOpen, setDevOpen] = useState(true);

  const isActive = (href: string) => pathname === href;

  return (
    <aside
      className={`flex h-screen shrink-0 flex-col border-r border-zinc-200 bg-zinc-50 transition-[width] duration-200 ease-in-out dark:border-zinc-800 dark:bg-zinc-950 ${
        collapsed ? "w-[56px]" : "w-60"
      }`}
    >
      {/* Logo + toggle */}
      <div
        className={`flex items-center py-5 ${
          collapsed ? "justify-center px-3" : "justify-between px-5"
        }`}
      >
        {!collapsed && (
          <span className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Sarvam
          </span>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
        >
          <PanelLeft size={16} />
        </button>
      </div>

      {/* Nav */}
      <nav className="mt-2 flex flex-1 flex-col px-2">

        {/* Home — standalone */}
        <Link
          href="/home"
          title={collapsed ? "Home" : undefined}
          className={`group mb-1 flex items-center rounded-3xl px-3 py-2.5 text-sm transition-colors duration-100 ${
            collapsed ? "justify-center" : "gap-3.5"
          } ${
            isActive("/home")
              ? "bg-[#f0f0f0] font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
              : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-200"
          }`}
        >
          <House
            size={16}
            className={`shrink-0 transition-transform duration-200 ease-out group-hover:scale-110 ${
              isActive("/home")
                ? "text-zinc-900 dark:text-zinc-100"
                : "text-zinc-400 dark:text-zinc-500"
            }`}
          />
          {!collapsed && <span>Home</span>}
        </Link>

        {/* Developers section */}
        <div className="mt-3">
          {/* Section heading — toggle button */}
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
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${devOpen ? "rotate-0" : "-rotate-90"}`}
              />
            </button>
          )}

          {/* Collapsible items */}
          <div
            className={`flex flex-col overflow-hidden transition-all duration-200 ease-in-out ${
              !collapsed && !devOpen ? "max-h-0" : "max-h-96"
            }`}
          >
            {devItems.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                title={collapsed ? label : undefined}
                className={`group flex items-center rounded-3xl px-3 py-2.5 text-sm transition-colors duration-100 mb-1 ${
                  collapsed ? "justify-center" : "gap-3.5"
                } ${
                  isActive(href)
                    ? "bg-[#f0f0f0] font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                    : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-200"
                }`}
              >
                <Icon
                  size={16}
                  className={`shrink-0 transition-transform duration-200 ease-out group-hover:scale-110 ${
                    isActive(href)
                      ? "text-zinc-900 dark:text-zinc-100"
                      : "text-zinc-400 dark:text-zinc-500"
                  }`}
                />
                {!collapsed && <span>{label}</span>}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}
