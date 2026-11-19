import { apiRequest } from "@/lib/api";
import { getAccessToken } from "@/lib/auth";

export interface Recommendation {
  id: string;
  _id?: string;
  title?: string;
  description?: string;
  priority?: string;
  status?: string;
  createdAt: string;
}

export async function listRecommendations(plantId: string) {
  const response = await apiRequest<{ recommendations: Recommendation[] }>(`/recommendations/plants/${plantId}/recommendations`, {}, getAccessToken());
  return response.data.recommendations;
}

export async function generateRecommendations(plantId: string) {
  const response = await apiRequest<{ recommendations: Recommendation[] }>(
    `/recommendations/plants/${plantId}/recommendations/generate`,
    { method: "POST" },
    getAccessToken(),
  );
  return response.data.recommendations;
}

export async function updateRecommendationStatus(
  plantId: string,
  recommendationId: string,
  status: string,
) {
  const response = await apiRequest<Recommendation>(
    `/recommendations/plants/${plantId}/recommendations/${recommendationId}/status`,
    { method: "PATCH", body: JSON.stringify({ status }) },
    getAccessToken(),
  );
  return response.data;
}
