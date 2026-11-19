"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { AuthGuard } from "@/components/auth/auth-guard";
import { usePlants } from "@/hooks/use-plants";
import { PlantSelect } from "@/components/plants/plant-select";
import { chatWithAssistant } from "@/services/assistant.service";

export default function AssistantPage() {
  const { plants } = usePlants();
  const [plantId, setPlantId] = useState("");
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");
  const [working, setWorking] = useState(false);

  async function send() {
    if (!plantId || !message.trim()) { setError("Choose a plant and ask a question."); return; }
    setWorking(true); setError("");
    try { setReply(await chatWithAssistant(plantId, message.trim())); setMessage(""); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "The assistant is unavailable."); }
    finally { setWorking(false); }
  }

  return <AuthGuard><AppShell title="AI assistant" description="Ask practical questions about your plants."><div className="max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"><PlantSelect label="Plant context" plants={plants} value={plantId} onChange={setPlantId} placeholder="Select a plant for context" />{reply && <div className="mt-5 rounded-xl bg-emerald-50 p-5 text-sm leading-6 text-gray-700"><p className="mb-2 font-semibold text-emerald-900">LeafLens assistant</p>{reply}</div>}<textarea value={message} onChange={(event) => setMessage(event.target.value)} rows={4} placeholder="How often should I water this plant?" className="mt-5 w-full rounded-xl border border-gray-300 px-4 py-3" />{error && <p className="mt-3 text-sm text-red-700">{error}</p>}<button type="button" onClick={() => void send()} disabled={working || plants.length === 0} className="mt-4 rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white disabled:opacity-50">{working ? "Thinking..." : "Ask assistant"}</button></div></AppShell></AuthGuard>;
}
