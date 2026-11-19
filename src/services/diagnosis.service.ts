import { apiRequest } from "@/lib/api";
import { getAccessToken } from "@/lib/auth";
import type { Diagnosis } from "@/types/ai";

export async function diagnosePlant(plantId: string, symptoms: string[], imageId?: string) {
  const response = await apiRequest<Diagnosis>(`/diagnosis/plants/${plantId}/diagnose`, { method: "POST", body: JSON.stringify({ symptoms, imageId }) }, getAccessToken());
  return response.data;
}
