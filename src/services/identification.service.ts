import { apiRequest } from "@/lib/api";
import { getAccessToken } from "@/lib/auth";
import type { Identification } from "@/types/ai";

export async function identifyPlant(plantId: string, imageId?: string) {
  const response = await apiRequest<Identification>(`/identification/plants/${plantId}/identify`, { method: "POST", body: JSON.stringify({ imageId }) }, getAccessToken());
  return response.data;
}
