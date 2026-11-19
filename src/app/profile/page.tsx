"use client";

import { AppShell } from "@/components/layout/app-shell";
import { AuthGuard } from "@/components/auth/auth-guard";
import { useAuth } from "@/lib/auth";

export default function ProfilePage() {
  const { user } = useAuth();
  return <AuthGuard><AppShell title="Profile" description="Your LeafLens account."><div className="max-w-xl rounded-2xl border border-gray-200 bg-white p-6"><div className="flex size-16 items-center justify-center rounded-full bg-emerald-100 text-2xl font-semibold text-emerald-800">{user?.name?.charAt(0).toUpperCase()}</div><h2 className="mt-5 text-xl font-semibold">{user?.name}</h2><p className="mt-1 text-sm text-gray-500">{user?.email}</p><p className="mt-6 text-sm text-gray-600">Profile editing will be available when the backend user-management endpoints are enabled.</p></div></AppShell></AuthGuard>;
}
