import { apiRequest } from "@/lib/api";
import { getAccessToken } from "@/lib/auth";

export interface Notification {
  _id: string;
  title?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export async function listNotifications() {
  const response = await apiRequest<{ notifications: Notification[] }>("/notifications", {}, getAccessToken());
  return response.data.notifications;
}

export async function markNotificationRead(id: string) {
  await apiRequest(`/notifications/${id}/read`, { method: "PATCH" }, getAccessToken());
}

export async function markAllNotificationsRead() {
  await apiRequest("/notifications/read-all", { method: "PATCH" }, getAccessToken());
}
