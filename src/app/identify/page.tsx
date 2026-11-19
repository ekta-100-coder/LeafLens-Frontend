"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { AuthGuard } from "@/components/auth/auth-guard";
import { usePlants } from "@/hooks/use-plants";
import { PlantSelect } from "@/components/plants/plant-select";
import { uploadPlantImage } from "@/services/images.service";
import { identifyPlant } from "@/services/identification.service";
import type { Identification } from "@/types/ai";

export default function IdentifyPage() {
  const { plants } = usePlants();
  const searchParams = useSearchParams();
  const [plantId, setPlantId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<Identification | null>(null);
  const [error, setError] = useState("");
  const [working, setWorking] = useState(false);

  useEffect(() => {
    const requestedPlant = searchParams.get("plantId");
    if (requestedPlant && plants.some((plant) => plant.id === requestedPlant)) {
      // The selected plant mirrors navigation context supplied by the plant hub.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPlantId(requestedPlant);
    }
  }, [plants, searchParams]);

  async function submit() {
    if (!plantId || !file) { setError("Choose a plant and an image first."); return; }
    setWorking(true); setError("");
    try { const image = await uploadPlantImage(plantId, file); setResult(await identifyPlant(plantId, image._id)); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Identification failed."); }
    finally { setWorking(false); }
  }

  return <AuthGuard><AppShell title="Identify a plant" description="Use a clear photo to learn more about your plant."><div className="max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"><PlantSelect label="Plant" plants={plants} value={plantId} onChange={setPlantId} /><label className="mt-5 block text-sm font-medium">Plant image<input type="file" accept="image/*" onChange={(event) => setFile(event.target.files?.[0] || null)} className="mt-2 block w-full rounded-xl border border-dashed border-gray-300 p-4 text-sm" /></label>{error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}<button type="button" onClick={() => void submit()} disabled={working || plants.length === 0} className="mt-5 rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white disabled:opacity-50">{working ? "Analyzing..." : "Identify plant"}</button>{result && <div className="mt-6 rounded-xl bg-emerald-50 p-5"><h2 className="font-semibold">{result.commonName || "Identification result"}</h2><p className="mt-1 text-sm text-gray-600">{result.scientificName || "Scientific name unavailable"}</p>{result.confidence !== undefined && <p className="mt-3 text-sm">Confidence: {Math.round(result.confidence * 100)}%</p>}{result.description && <p className="mt-3 text-sm text-gray-600">{result.description}</p>}</div>}</div></AppShell></AuthGuard>;
}
