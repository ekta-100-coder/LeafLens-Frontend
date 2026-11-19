"use client";

import { AppShell } from "@/components/layout/app-shell";
import { AuthGuard } from "@/components/auth/auth-guard";
import { useAuth } from "@/lib/auth";

export default function SettingsPage() {
  const { logout } = useAuth();
  return <AuthGuard><AppShell title="Settings" description="Manage your LeafLens session."><div className="max-w-xl rounded-2xl border border-gray-200 bg-white p-6"><h2 className="font-semibold">Account session</h2><p className="mt-2 text-sm text-gray-600">Your session is stored locally and authenticated with the backend JWT.</p><button type="button" onClick={logout} className="mt-6 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-50">Sign out</button></div></AppShell></AuthGuard>;
}
