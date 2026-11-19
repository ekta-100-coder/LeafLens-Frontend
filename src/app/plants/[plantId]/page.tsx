"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowLeft, Leaf, MessageCircle, RefreshCw, Sprout, Stethoscope } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { AuthGuard } from "@/components/auth/auth-guard";
import { getPlant } from "@/services/plants.service";
import { createCareLog, listCareLogs } from "@/services/care.service";
import { createGrowthRecord, listGrowthRecords } from "@/services/growth.service";
import { listPlantTimeline, type TimelineEvent } from "@/services/history.service";
import { chatWithAssistant } from "@/services/assistant.service";
import { generateRecommendations, listRecommendations, type Recommendation } from "@/services/recommendations.service";
import { careActionTypes } from "@/config/plant-options";
import type { CareLog } from "@/types/care";
import type { GrowthRecord } from "@/types/growth";
import type { Plant } from "@/types/plant";

type Tab = "overview" | "care" | "growth" | "history" | "insights";

const tabs: Array<{ id: Tab; label: string }> = [
  { id: "overview", label: "Overview" },
  { id: "care", label: "Care log" },
  { id: "growth", label: "Growth" },
  { id: "history", label: "History" },
  { id: "insights", label: "AI insights" },
];

function formatDate(value?: string) {
  if (!value) return "No date";
  return new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export default function PlantDetailsPage() {
  const { plantId } = useParams<{ plantId: string }>();
  const [plant, setPlant] = useState<Plant | null>(null);
  const [tab, setTab] = useState<Tab>("overview");
  const [careLogs, setCareLogs] = useState<CareLog[]>([]);
  const [growthRecords, setGrowthRecords] = useState<GrowthRecord[]>([]);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [careAction, setCareAction] = useState("watering");
  const [careNotes, setCareNotes] = useState("");
  const [growthHeight, setGrowthHeight] = useState("");
  const [growthNotes, setGrowthNotes] = useState("");
  const [question, setQuestion] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");

  async function loadPlantData() {
    setLoading(true);
    setError("");
    try {
      const [plantResult, careResult, growthResult, historyResult, recommendationsResult] = await Promise.all([
        getPlant(plantId),
        listCareLogs(plantId),
        listGrowthRecords(plantId),
        listPlantTimeline(plantId),
        listRecommendations(plantId),
      ]);
      setPlant(plantResult);
      setCareLogs(careResult);
      setGrowthRecords(growthResult);
      setTimeline(historyResult.timeline);
      setRecommendations(recommendationsResult);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to load this plant.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Load the server-backed plant hub when its route identity changes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadPlantData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plantId]);

  async function addCareLog(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setWorking(true);
    try {
      const log = await createCareLog(plantId, { actionType: careAction, notes: careNotes.trim() || undefined });
      setCareLogs((current) => [log, ...current]);
      setCareNotes("");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to save the care log.");
    } finally {
      setWorking(false);
    }
  }

  async function addGrowthRecord(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!growthHeight) return;
    setWorking(true);
    try {
      const record = await createGrowthRecord(plantId, {
        height: Number(growthHeight),
        recordedAt: new Date().toISOString(),
        notes: growthNotes.trim() || undefined,
      });
      setGrowthRecords((current) => [record, ...current]);
      setGrowthHeight("");
      setGrowthNotes("");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to save the growth record.");
    } finally {
      setWorking(false);
    }
  }

  async function askAssistant(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!question.trim()) return;
    setWorking(true);
    try {
      setReply(await chatWithAssistant(plantId, question.trim()));
      setQuestion("");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "The assistant is unavailable.");
    } finally {
      setWorking(false);
    }
  }

  async function refreshRecommendations() {
    setWorking(true);
    try {
      setRecommendations(await generateRecommendations(plantId));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to generate recommendations.");
    } finally {
      setWorking(false);
    }
  }

  return (
    <AuthGuard>
      <AppShell title={plant?.name || "Plant details"} description={plant?.species || "Your plant care hub"}>
        <Link href="/plants" className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-900">
          <ArrowLeft className="size-4" /> All plants
        </Link>
        {error && <div role="alert" className="mb-5 flex items-center justify-between rounded-xl bg-red-50 p-4 text-sm text-red-700"><span>{error}</span><button type="button" onClick={() => setError("")}>Dismiss</button></div>}
        {loading ? <p className="text-sm text-gray-500">Loading your plant workspace...</p> : plant ? (
          <>
            <section className="overflow-hidden rounded-3xl bg-emerald-900 p-6 text-white sm:p-8">
              <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                <div>
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-white/10"><Leaf className="size-6" /></div>
                  <p className="mt-5 text-sm text-emerald-200">{plant.location || "Your plant collection"}</p>
                  <h2 className="mt-1 text-3xl font-semibold">{plant.name}</h2>
                  <p className="mt-2 text-emerald-100">{plant.scientificName || plant.species || "Species not identified yet"}</p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/plants/${plantId}/edit`} className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-emerald-900">Edit profile</Link>
                  <button type="button" onClick={() => void loadPlantData()} className="rounded-xl border border-white/30 p-2.5" aria-label="Refresh plant data"><RefreshCw className="size-4" /></button>
                </div>
              </div>
            </section>
            <nav className="mt-6 flex gap-1 overflow-x-auto border-b border-gray-200" aria-label="Plant sections">
              {tabs.map((item) => <button key={item.id} type="button" onClick={() => setTab(item.id)} className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium ${tab === item.id ? "border-emerald-700 text-emerald-800" : "border-transparent text-gray-500 hover:text-gray-900"}`}>{item.label}</button>)}
            </nav>
            <div className="mt-6">
              {tab === "overview" && <div className="grid gap-5 lg:grid-cols-3">
                <section className="rounded-2xl border border-gray-200 bg-white p-5 lg:col-span-2"><h3 className="text-lg font-semibold">About {plant.name}</h3><p className="mt-3 text-sm leading-6 text-gray-600">{plant.description || plant.notes || "Add a note to capture what makes this plant unique."}</p><div className="mt-6 grid gap-4 sm:grid-cols-3"><div className="rounded-xl bg-emerald-50 p-4"><p className="text-2xl font-semibold text-emerald-800">{careLogs.length}</p><p className="text-xs text-gray-600">Care activities</p></div><div className="rounded-xl bg-blue-50 p-4"><p className="text-2xl font-semibold text-blue-800">{growthRecords.length}</p><p className="text-xs text-gray-600">Growth records</p></div><div className="rounded-xl bg-amber-50 p-4"><p className="text-2xl font-semibold text-amber-800">{recommendations.length}</p><p className="text-xs text-gray-600">Recommendations</p></div></div></section>
                <section className="rounded-2xl border border-gray-200 bg-white p-5"><h3 className="font-semibold">Quick actions</h3><div className="mt-4 grid gap-2"><button type="button" onClick={() => setTab("care")} className="rounded-xl bg-emerald-700 px-4 py-3 text-left text-sm font-semibold text-white">Log care activity</button><button type="button" onClick={() => setTab("growth")} className="rounded-xl border border-gray-200 px-4 py-3 text-left text-sm font-semibold">Record growth</button><Link href={`/diagnose?plantId=${plantId}`} className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold">Run health check</Link><Link href={`/identify?plantId=${plantId}`} className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold">Identify species</Link></div></section>
              </div>}
              {tab === "care" && <div className="grid gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]"><form onSubmit={addCareLog} className="rounded-2xl border border-gray-200 bg-white p-5"><h3 className="font-semibold">Log an activity</h3><label className="mt-5 block text-sm font-medium">Activity<select value={careAction} onChange={(event) => setCareAction(event.target.value)} className="mt-2 w-full rounded-xl border border-gray-300 px-3 py-3">{careActionTypes.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label><label className="mt-4 block text-sm font-medium">Notes<textarea value={careNotes} onChange={(event) => setCareNotes(event.target.value)} rows={4} className="mt-2 w-full rounded-xl border border-gray-300 px-3 py-3" placeholder="What did you notice?" /></label><button type="submit" disabled={working} className="mt-4 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white disabled:opacity-50">{working ? "Saving..." : "Save activity"}</button></form><section className="rounded-2xl border border-gray-200 bg-white p-5"><h3 className="font-semibold">Recent care</h3><div className="mt-4 space-y-3">{careLogs.length ? careLogs.map((log) => <div key={log._id || log.id} className="flex items-start justify-between border-b border-gray-100 pb-3"><div><p className="font-medium capitalize">{log.actionType.replace("_", " ")}</p><p className="text-sm text-gray-500">{log.notes || "Activity recorded"}</p></div><time className="text-xs text-gray-400">{formatDate(log.actionDate || log.createdAt)}</time></div>) : <p className="text-sm text-gray-500">Your care story starts here.</p>}</div></section></div>}
              {tab === "growth" && <div className="grid gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]"><form onSubmit={addGrowthRecord} className="rounded-2xl border border-gray-200 bg-white p-5"><h3 className="font-semibold">Record a measurement</h3><label className="mt-5 block text-sm font-medium">Height (cm)<input type="number" min="0" step="0.1" required value={growthHeight} onChange={(event) => setGrowthHeight(event.target.value)} className="mt-2 w-full rounded-xl border border-gray-300 px-3 py-3" /></label><label className="mt-4 block text-sm font-medium">Notes<textarea value={growthNotes} onChange={(event) => setGrowthNotes(event.target.value)} rows={4} className="mt-2 w-full rounded-xl border border-gray-300 px-3 py-3" /></label><button type="submit" disabled={working} className="mt-4 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white disabled:opacity-50">{working ? "Saving..." : "Save measurement"}</button></form><section className="rounded-2xl border border-gray-200 bg-white p-5"><h3 className="font-semibold">Growth history</h3><div className="mt-4 space-y-3">{growthRecords.length ? growthRecords.map((record) => <div key={record._id} className="flex items-center justify-between rounded-xl bg-gray-50 p-4"><div><p className="font-semibold">{record.height ?? "—"} cm</p><p className="text-sm text-gray-500">{record.notes || "Measurement recorded"}</p></div><time className="text-xs text-gray-400">{formatDate(record.recordedAt)}</time></div>) : <p className="text-sm text-gray-500">Add measurements over time to see growth.</p>}</div></section></div>}
              {tab === "history" && <section className="rounded-2xl border border-gray-200 bg-white p-5"><h3 className="font-semibold">Plant timeline</h3><div className="mt-6 space-y-5">{timeline.length ? timeline.map((event, index) => <div key={event.id || event._id || `${event.type}-${index}`} className="relative flex gap-4"><div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><Sprout className="size-4" /></div><div><p className="font-medium">{event.title || event.eventType || event.type || "Plant update"}</p><p className="mt-1 text-sm text-gray-600">{event.description || "A new event was recorded for this plant."}</p><time className="mt-1 block text-xs text-gray-400">{formatDate(event.occurredAt || event.date || event.createdAt)}</time></div></div>) : <p className="text-sm text-gray-500">Your plant timeline will build as you care for it.</p>}</div></section>}
              {tab === "insights" && <div className="grid gap-5 lg:grid-cols-2"><section className="rounded-2xl border border-gray-200 bg-white p-5"><div className="flex items-center justify-between"><h3 className="font-semibold">Recommendations</h3><button type="button" onClick={() => void refreshRecommendations()} disabled={working} className="text-sm font-semibold text-emerald-700">Generate fresh</button></div><div className="mt-4 space-y-3">{recommendations.length ? recommendations.map((item) => <article key={item._id} className="rounded-xl bg-emerald-50 p-4"><p className="text-xs font-semibold uppercase text-emerald-700">{item.priority || "Care insight"}</p><h4 className="mt-1 font-medium">{item.title || "Personalized recommendation"}</h4><p className="mt-1 text-sm leading-6 text-gray-600">{item.description}</p></article>) : <p className="text-sm text-gray-500">Generate personalized care suggestions from this plant&apos;s history.</p>}</div></section><section className="rounded-2xl border border-gray-200 bg-white p-5"><div className="flex items-center gap-2"><MessageCircle className="size-5 text-emerald-700" /><h3 className="font-semibold">Ask LeafLens</h3></div>{reply && <div className="mt-4 rounded-xl bg-gray-50 p-4 text-sm leading-6 text-gray-700">{reply}</div>}<form onSubmit={askAssistant} className="mt-4"><textarea value={question} onChange={(event) => setQuestion(event.target.value)} rows={4} placeholder="How can I help this plant thrive?" className="w-full rounded-xl border border-gray-300 px-3 py-3" /><button type="submit" disabled={working} className="mt-3 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"><Stethoscope className="size-4" /> Ask assistant</button></form></section></div>}
            </div>
          </>
        ) : null}
      </AppShell>
    </AuthGuard>
  );
}
