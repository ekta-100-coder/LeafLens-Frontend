"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { AuthGuard } from "@/components/auth/auth-guard";
import { getPlant, updatePlant } from "@/services/plants.service";
import type { Plant } from "@/types/plant";

export default function EditPlantPage() {
  const { plantId } = useParams<{ plantId: string }>();
  const router = useRouter();
  const [form, setForm] = useState<Partial<Plant>>({});
  const [error, setError] = useState("");
  useEffect(() => { void getPlant(plantId).then(setForm).catch((reason: unknown) => setError(reason instanceof Error ? reason.message : "Unable to load plant.")); }, [plantId]);
  async function submit(event: FormEvent) { event.preventDefault(); try { await updatePlant(plantId, { name: form.name || "", species: form.species, location: form.location, notes: form.notes }); router.push(`/plants/${plantId}`); } catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to update plant."); } }
  return <AuthGuard><AppShell title="Edit plant"><form onSubmit={submit} className="max-w-2xl space-y-5 rounded-2xl border border-gray-200 bg-white p-6">{(["name", "species", "location", "notes"] as const).map((field) => <label key={field} className="block text-sm font-medium capitalize">{field}<input required={field === "name"} value={form[field] || ""} onChange={(event) => setForm({ ...form, [field]: event.target.value })} className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3" /></label>)}{error && <p className="text-sm text-red-700">{error}</p>}<button className="rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white">Save changes</button></form></AppShell></AuthGuard>;
}
