import { House, Cpu, BarChart2, KeyRound } from "lucide-react";
import { SIDEBAR_OPTION } from "./interfaces";
import type { SidebarItemConfig } from "./interfaces";

export const SIDEBAR_OPTION_CONTENT: Record<SIDEBAR_OPTION, SidebarItemConfig> = {
  [SIDEBAR_OPTION.HOME]: {
    label: "Home",
    href: "/home",
    icon: House,
  },
  [SIDEBAR_OPTION.MODELS]: {
    label: "Models",
    href: "/models",
    icon: Cpu,
  },
  [SIDEBAR_OPTION.USAGE]: {
    label: "Usage",
    href: "/usage",
    icon: BarChart2,
  },
  [SIDEBAR_OPTION.API_KEYS]: {
    label: "API Keys",
    href: "/api-keys",
    icon: KeyRound,
  },
};

export const HOME_OPTION = SIDEBAR_OPTION.HOME;

export const DEV_OPTIONS: SIDEBAR_OPTION[] = [
  SIDEBAR_OPTION.API_KEYS,
  SIDEBAR_OPTION.MODELS,
  SIDEBAR_OPTION.USAGE,
];
