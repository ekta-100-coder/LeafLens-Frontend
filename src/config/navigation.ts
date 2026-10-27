import {
  LayoutDashboard,
  Sprout,
  ScanSearch,
  Stethoscope,
  Lightbulb,
  MessageCircle,
  Bell,
  UserRound,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavigationItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const mainNavigation: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Plants",
    href: "/plants",
    icon: Sprout,
  },
  {
    label: "Identify Plant",
    href: "/identify",
    icon: ScanSearch,
  },
  {
    label: "Diagnose Plant",
    href: "/diagnose",
    icon: Stethoscope,
  },
  {
    label: "Recommendations",
    href: "/recommendations",
    icon: Lightbulb,
  },
  {
    label: "AI Assistant",
    href: "/assistant",
    icon: MessageCircle,
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
];

export const accountNavigation: NavigationItem[] = [
  {
    label: "Profile",
    href: "/profile",
    icon: UserRound,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];