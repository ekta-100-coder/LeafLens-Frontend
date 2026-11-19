import { apiRequest } from "@/lib/api";
import { getAccessToken } from "@/lib/auth";

export async function chatWithAssistant(plantId: string, message: string) {
  const response = await apiRequest<{ reply?: string; response?: string }>(`/assistant/plants/${plantId}/chat`, { method: "POST", body: JSON.stringify({ message }) }, getAccessToken());
  return response.data.reply ?? response.data.response ?? "";
}
