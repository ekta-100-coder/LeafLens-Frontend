"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { AuthGuard } from "@/components/auth/auth-guard";
import { listNotifications, markNotificationRead, type Notification } from "@/services/notifications.service";

export default function NotificationsPage() {
  const [items, setItems] = useState<Notification[]>([]);
  const [error, setError] = useState("");
  useEffect(() => { void listNotifications().then(setItems).catch((reason: unknown) => setError(reason instanceof Error ? reason.message : "Unable to load notifications.")); }, []);
  async function markRead(id: string) { await markNotificationRead(id); setItems((current) => current.map((item) => item._id === id ? { ...item, isRead: true } : item)); }
  return <AuthGuard><AppShell title="Notifications" description="Stay on top of care reminders and updates.">{error && <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}<div className="space-y-3">{items.length === 0 && !error ? <p className="text-sm text-gray-500">No notifications yet.</p> : items.map((item) => <article key={item._id} className={`rounded-2xl border p-5 ${item.isRead ? "border-gray-200 bg-white" : "border-emerald-200 bg-emerald-50"}`}><div className="flex items-start justify-between gap-4"><div><h2 className="font-semibold">{item.title || "Plant care update"}</h2><p className="mt-1 text-sm text-gray-600">{item.message}</p><p className="mt-3 text-xs text-gray-400">{new Date(item.createdAt).toLocaleString()}</p></div>{!item.isRead && <button type="button" onClick={() => void markRead(item._id)} className="text-sm font-semibold text-emerald-700">Mark read</button>}</div></article>)}</div></AppShell></AuthGuard>;
}
