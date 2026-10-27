"use client";

import Link from "next/link";
import { Bell, Menu, UserRound } from "lucide-react";

interface HeaderProps {
  title: string;
  description?: string;
  onMenuClick: () => void;
}

export function Header({
  title,
  description,
  onMenuClick,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="flex min-h-18 items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open navigation menu"
            aria-controls="leaflens-mobile-navigation"
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl text-gray-600 transition-colors hover:bg-gray-100 md:hidden"
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>

          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold tracking-tight text-gray-900 sm:text-xl">
              {title}
            </h1>

            {description ? (
              <p className="mt-0.5 hidden truncate text-sm text-gray-500 sm:block">
                {description}
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/notifications"
            aria-label="Notifications"
            className="inline-flex size-10 items-center justify-center rounded-xl text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <Bell className="size-5" aria-hidden="true" />
          </Link>

          <Link
            href="/profile"
            aria-label="Your profile"
            className="inline-flex size-10 items-center justify-center rounded-xl text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <UserRound className="size-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  );
}