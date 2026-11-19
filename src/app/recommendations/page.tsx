"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { AuthGuard } from "@/components/auth/auth-guard";
import { usePlants } from "@/hooks/use-plants";
import { listRecommendations, type Recommendation } from "@/services/recommendations.service";

export default function RecommendationsPage() {
  const { plants } = usePlants();
  const [items, setItems] = useState<Array<Recommendation & { plantName: string }>>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!plants.length) return;
    // Fetch recommendations after the plant list is available.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    void Promise.all(plants.map(async (plant) => (await listRecommendations(plant.id)).map((item) => ({ ...item, plantName: plant.name })))).then((groups) => setItems(groups.flat())).catch(() => setItems([])).finally(() => setLoading(false));
  }, [plants]);
  return <AuthGuard><AppShell title="Recommendations" description="Personalized actions for healthier plants.">{loading ? <p className="text-sm text-gray-500">Loading recommendations...</p> : items.length === 0 ? <p className="text-sm text-gray-500">Recommendations will appear as LeafLens learns about your plants.</p> : <div className="grid gap-4 md:grid-cols-2">{items.map((item) => <article key={item._id} className="rounded-2xl border border-gray-200 bg-white p-5"><p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{item.plantName}{item.priority ? ` · ${item.priority}` : ""}</p><h2 className="mt-2 font-semibold">{item.title || "Care recommendation"}</h2><p className="mt-2 text-sm leading-6 text-gray-600">{item.description}</p></article>)}</div>}</AppShell></AuthGuard>;
}
