import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type StatusVariant =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral";

interface StatusBadgeProps {
  children: ReactNode;
  variant?: StatusVariant;
  className?: string;
}

const variantClasses: Record<StatusVariant, string> = {
  success: "bg-emerald-50 text-emerald-800 ring-emerald-700/15",
  warning: "bg-amber-50 text-amber-800 ring-amber-700/15",
  danger: "bg-red-50 text-red-700 ring-red-700/15",
  info: "bg-blue-50 text-blue-700 ring-blue-700/15",
  neutral: "bg-gray-100 text-gray-700 ring-gray-500/15",
};

export function StatusBadge({
  children,
  variant = "neutral",
  className,
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1",
        "text-xs font-medium ring-1 ring-inset",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}