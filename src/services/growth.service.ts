import { apiRequest } from "@/lib/api";
import { getAccessToken } from "@/lib/auth";
import type { GrowthRecord } from "@/types/growth";

export async function listGrowthRecords(plantId: string) {
  const response = await apiRequest<{ growthRecords: GrowthRecord[] }>(`/growth/plants/${plantId}/growth`, {}, getAccessToken());
  return response.data.growthRecords;
}

export async function createGrowthRecord(plantId: string, input: Record<string, unknown>) {
  const response = await apiRequest<{ growthRecord: GrowthRecord }>(`/growth/plants/${plantId}/growth`, { method: "POST", body: JSON.stringify(input) }, getAccessToken());
  return response.data.growthRecord;
}

export async function deleteGrowthRecord(plantId: string, growthRecordId: string) {
  await apiRequest(`/growth/plants/${plantId}/growth/${growthRecordId}`, { method: "DELETE" }, getAccessToken());
}
