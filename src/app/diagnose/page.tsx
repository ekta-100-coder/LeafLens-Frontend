"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { AuthGuard } from "@/components/auth/auth-guard";
import { usePlants } from "@/hooks/use-plants";
import { PlantSelect } from "@/components/plants/plant-select";
import { diagnosePlant } from "@/services/diagnosis.service";
import type { Diagnosis } from "@/types/ai";

export default function DiagnosePage() {
  const { plants } = usePlants();
  const searchParams = useSearchParams();
  const [plantId, setPlantId] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState<Diagnosis | null>(null);
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
    if (!plantId || !symptoms.trim()) { setError("Choose a plant and describe its symptoms."); return; }
    setWorking(true); setError("");
    try { setResult(await diagnosePlant(plantId, symptoms.split(",").map((item) => item.trim()).filter(Boolean))); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Diagnosis failed."); }
    finally { setWorking(false); }
  }

  return <AuthGuard><AppShell title="Diagnose plant health" description="Turn observations into practical next steps."><div className="max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"><PlantSelect label="Plant" plants={plants} value={plantId} onChange={setPlantId} /><label className="mt-5 block text-sm font-medium">Symptoms<textarea value={symptoms} onChange={(event) => setSymptoms(event.target.value)} placeholder="yellow leaves, dry soil, curling edges" rows={5} className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3" /></label>{error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}<button type="button" onClick={() => void submit()} disabled={working || plants.length === 0} className="mt-5 rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white disabled:opacity-50">{working ? "Assessing..." : "Assess health"}</button>{result && <div className="mt-6 rounded-xl bg-emerald-50 p-5"><h2 className="font-semibold">Assessment</h2>{result.problems?.map((problem) => <p key={problem.name} className="mt-2 text-sm"><strong>{problem.name}</strong>{problem.severity ? ` · ${problem.severity}` : ""}</p>)}{result.treatments?.length ? <><h3 className="mt-4 font-medium">Suggested treatment</h3><ul className="mt-2 list-disc pl-5 text-sm text-gray-600">{result.treatments.map((treatment) => <li key={treatment}>{treatment}</li>)}</ul></> : null}</div>}</div></AppShell></AuthGuard>;
}
