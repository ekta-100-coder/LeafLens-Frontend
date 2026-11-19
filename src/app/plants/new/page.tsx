"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { AuthGuard } from "@/components/auth/auth-guard";
import {
  demoPlantSpecies,
  healthStatuses,
  indoorOutdoorOptions,
  lightConditions,
  plantCategories,
} from "@/config/plant-options";
import { createPlant } from "@/services/plants.service";
import type { PlantInput } from "@/types/plant";

const initialForm: PlantInput = {
  name: "",
  species: "",
  scientificName: "",
  category: "other",
  location: "",
  lightCondition: "unknown",
  indoorOutdoor: "unknown",
  healthStatus: "unknown",
  wateringFrequency: null,
  fertilizingFrequency: null,
  careNotes: "",
};

export default function NewPlantPage() {
  const router = useRouter();
  const [form, setForm] = useState<PlantInput>(initialForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function update<K extends keyof PlantInput>(field: K, value: PlantInput[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function selectSpecies(value: string) {
    const option = demoPlantSpecies.find((item) => item.species === value);
    setForm((current) => ({
      ...current,
      species: value,
      scientificName: option?.scientificName ?? current.scientificName,
      category: option?.category ?? current.category,
    }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const plant = await createPlant(form);
      router.push(`/plants/${plant.id}`);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to save plant.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AuthGuard>
      <AppShell title="Add a plant" description="Start a new care journey.">
        <form onSubmit={submit} className="max-w-3xl space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-lg font-semibold">Plant identity</h2>
            <p className="mt-1 text-sm text-gray-500">Choose a suggested species or enter your own.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-medium">Plant name<input required value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="e.g. Living room Monstera" className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-emerald-600" /></label>
            <label className="block text-sm font-medium">Species<select value={form.species} onChange={(event) => selectSpecies(event.target.value)} className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3"><option value="">Select a species</option>{demoPlantSpecies.map((item) => <option key={item.species} value={item.species}>{item.species}</option>)}</select></label>
            <label className="block text-sm font-medium">Scientific name<input value={form.scientificName} onChange={(event) => update("scientificName", event.target.value)} className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-emerald-600" /></label>
            <label className="block text-sm font-medium">Category<select value={form.category} onChange={(event) => update("category", event.target.value)} className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3">{plantCategories.map((item) => <option key={item} value={item}>{item.charAt(0).toUpperCase() + item.slice(1)}</option>)}</select></label>
            <label className="block text-sm font-medium">Location<input value={form.location} onChange={(event) => update("location", event.target.value)} placeholder="e.g. South-facing window" className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-emerald-600" /></label>
            <label className="block text-sm font-medium">Health status<select value={form.healthStatus} onChange={(event) => update("healthStatus", event.target.value)} className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3">{healthStatuses.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
            <label className="block text-sm font-medium">Light<select value={form.lightCondition} onChange={(event) => update("lightCondition", event.target.value)} className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3">{lightConditions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
            <label className="block text-sm font-medium">Environment<select value={form.indoorOutdoor} onChange={(event) => update("indoorOutdoor", event.target.value)} className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3">{indoorOutdoorOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-medium">Water every (days)<input type="number" min="0" max="365" value={form.wateringFrequency ?? ""} onChange={(event) => update("wateringFrequency", event.target.value ? Number(event.target.value) : null)} className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3" /></label>
            <label className="block text-sm font-medium">Fertilize every (days)<input type="number" min="0" max="365" value={form.fertilizingFrequency ?? ""} onChange={(event) => update("fertilizingFrequency", event.target.value ? Number(event.target.value) : null)} className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3" /></label>
          </div>
          <label className="block text-sm font-medium">Care notes<textarea value={form.careNotes} onChange={(event) => update("careNotes", event.target.value)} rows={4} placeholder="Anything to remember about this plant?" className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3" /></label>
          {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <button disabled={saving} className="rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white disabled:opacity-50">{saving ? "Saving..." : "Save plant"}</button>
        </form>
      </AppShell>
    </AuthGuard>
  );
}
