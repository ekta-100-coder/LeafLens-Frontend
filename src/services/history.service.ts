import { apiRequest } from "@/lib/api";
import { getAccessToken } from "@/lib/auth";

export interface TimelineEvent {
  id?: string;
  _id?: string;
  type?: string;
  eventType?: string;
  title?: string;
  description?: string;
  createdAt?: string;
  occurredAt?: string;
  date?: string;
  metadata?: Record<string, unknown>;
}

export async function listPlantTimeline(plantId: string) {
  const response = await apiRequest<{
    timeline: TimelineEvent[];
    pagination?: { page: number; limit: number; total: number; pages: number };
  }>(`/history/plants/${plantId}/timeline?limit=50`, {}, getAccessToken());
  return response.data;
}
