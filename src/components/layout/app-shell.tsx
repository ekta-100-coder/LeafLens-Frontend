"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Sidebar } from "@/components/layout/sidebar";

interface AppShellProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function AppShell({
  title,
  description,
  children,
}: AppShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  function closeMobileNav() {
    setMobileNavOpen(false);
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        <div className="sticky top-0 hidden h-screen shrink-0 md:block">
          <Sidebar />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <Header
            title={title}
            description={description}
            onMenuClick={() => setMobileNavOpen(true)}
          />

          <main className="w-full flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <div className="mx-auto w-full max-w-7xl">{children}</div>
          </main>
        </div>
      </div>

      <MobileNav open={mobileNavOpen} onClose={closeMobileNav} />
    </div>
  );
}