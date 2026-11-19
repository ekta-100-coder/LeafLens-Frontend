import { apiRequest } from "@/lib/api";
import { getAccessToken } from "@/lib/auth";
import type { CareLog } from "@/types/care";

export async function listCareLogs(plantId: string) {
  const response = await apiRequest<{ careLogs: CareLog[] }>(`/care/plants/${plantId}/care-logs`, {}, getAccessToken());
  return response.data.careLogs;
}

export async function createCareLog(plantId: string, input: Record<string, unknown>) {
  const response = await apiRequest<{ careLog: CareLog }>(`/care/plants/${plantId}/care-logs`, { method: "POST", body: JSON.stringify(input) }, getAccessToken());
  return response.data.careLog;
}

export async function deleteCareLog(plantId: string, careLogId: string) {
  await apiRequest(`/care/plants/${plantId}/care-logs/${careLogId}`, { method: "DELETE" }, getAccessToken());
}
