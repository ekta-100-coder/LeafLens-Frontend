import { apiRequest } from "@/lib/api";
import { getAccessToken } from "@/lib/auth";

export async function uploadPlantImage(plantId: string, file: File) {
  const form = new FormData();
  form.append("image", file);
  const response = await apiRequest<{ image: { _id: string; imageUrl?: string } }>(`/plants/${plantId}/images`, { method: "POST", body: form }, getAccessToken());
  return response.data.image;
}
