"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import {
  accountNavigation,
  mainNavigation,
} from "@/config/navigation";

interface SidebarProps {
  onNavigate?: () => void;
  className?: string;
}

function isActiveRoute(pathname: string, href: string) {
  if (href === "/dashboard") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar({ onNavigate, className }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  function renderLinks(
    items: typeof mainNavigation,
  ) {
    return items.map(({ label, href, icon: Icon }) => {
      const active = isActiveRoute(pathname, href);

      return (
        <Link
          key={href}
          href={href}
          onClick={onNavigate}
          aria-current={active ? "page" : undefined}
          className={cn(
            "flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5",
            "text-sm font-medium transition-colors",
            active
              ? "bg-emerald-50 text-emerald-800"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
          )}
        >
          <Icon className="size-5 shrink-0" aria-hidden="true" />
          <span>{label}</span>
        </Link>
      );
    });
  }

  const displayName = user?.name || user?.email || "Plant enthusiast";

  return (
    <aside
      className={cn(
        "flex h-full w-64 shrink-0 flex-col border-r border-gray-200 bg-white",
        className,
      )}
    >
      <Link
        href="/dashboard"
        onClick={onNavigate}
        className="flex h-18 items-center gap-3 border-b border-gray-100 px-5"
      >
        <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-700 text-white">
          <Leaf className="size-6" aria-hidden="true" />
        </span>

        <span>
          <span className="block text-lg font-bold tracking-tight text-gray-900">
            LeafLens
          </span>
          <span className="block text-xs text-gray-500">
            Plant intelligence
          </span>
        </span>
      </Link>

      <nav
        aria-label="Main navigation"
        className="flex-1 space-y-6 overflow-y-auto px-3 py-5"
      >
        <div className="space-y-1">
          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Workspace
          </p>
          {renderLinks(mainNavigation)}
        </div>

        <div className="space-y-1">
          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Account
          </p>
          {renderLinks(accountNavigation)}
        </div>
      </nav>

      <div className="border-t border-gray-100 p-4">
        <div className="mb-3 flex min-w-0 items-center gap-3">
          <div
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-800"
            aria-hidden="true"
          >
            {(user?.name || user?.email || "P")
              .trim()
              .charAt(0)
              .toUpperCase()}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900">
              {displayName}
            </p>
            {user?.email ? (
              <p className="truncate text-xs text-gray-500">
                {user.email}
              </p>
            ) : null}
          </div>
        </div>

        <button
          type="button"
          onClick={logout}
          className="flex min-h-10 w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="size-4" aria-hidden="true" />
          Sign out
        </button>
      </div>
    </aside>
  );
}