import type { LucideIcon } from "lucide-react";

export enum SIDEBAR_OPTION {
  HOME = "HOME",
  MODELS = "MODELS",
  PLAYGROUND = "PLAYGROUND",
  API_KEYS = "API_KEYS",
}

export interface SidebarItemConfig {
  label: string;
  href: string;
  icon: LucideIcon;
}
