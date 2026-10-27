"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <button
        type="button"
        aria-label="Close navigation menu"
        onClick={onClose}
        className="absolute inset-0 size-full bg-gray-950/40"
      />

      <div
        id="leaflens-mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className="absolute inset-y-0 left-0 flex w-[min(20rem,85vw)] flex-col bg-white shadow-xl"
      >
        <div className="flex min-h-14 items-center justify-end border-b border-gray-100 px-3">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="inline-flex size-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="min-h-0 flex-1">
          <Sidebar onNavigate={onClose} className="w-full border-r-0" />
        </div>
      </div>
    </div>
  );
}