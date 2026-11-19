import { apiRequest } from "@/lib/api";
import { getAccessToken } from "@/lib/auth";
import type { Plant, PlantInput } from "@/types/plant";

function normalizePlant(plant: Plant): Plant {
  return { ...plant, _id: plant.id ?? plant._id };
}

export async function listPlants() {
  const response = await apiRequest<{ plants: Plant[] }>("/plants", {}, getAccessToken());
  return { ...response.data, plants: response.data.plants.map(normalizePlant) };
}

export async function getPlant(plantId: string) {
  const response = await apiRequest<{ plant: Plant }>(`/plants/${plantId}`, {}, getAccessToken());
  return normalizePlant(response.data.plant);
}

export async function createPlant(input: PlantInput) {
  const response = await apiRequest<{ plant: Plant }>("/plants", { method: "POST", body: JSON.stringify(input) }, getAccessToken());
  return normalizePlant(response.data.plant);
}

export async function updatePlant(plantId: string, input: Partial<PlantInput>) {
  const response = await apiRequest<{ plant: Plant }>(`/plants/${plantId}`, { method: "PATCH", body: JSON.stringify(input) }, getAccessToken());
  return normalizePlant(response.data.plant);
}

export async function deletePlant(plantId: string) {
  await apiRequest(`/plants/${plantId}`, { method: "DELETE" }, getAccessToken());
}
