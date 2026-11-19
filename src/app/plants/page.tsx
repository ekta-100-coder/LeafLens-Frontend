"use client";

import Link from "next/link";
import { Plus, Sprout, Trash2 } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { AuthGuard } from "@/components/auth/auth-guard";
import { usePlants } from "@/hooks/use-plants";
import { deletePlant } from "@/services/plants.service";

export default function PlantsPage() {
  const { plants, loading, error, refresh } = usePlants();
  const [deleting, setDeleting] = useState("");
  const [confirming, setConfirming] = useState("");
  const [deleteError, setDeleteError] = useState("");

  async function handleDelete(id: string) {
    setDeleting(id);
    setDeleteError("");
    try {
      await deletePlant(id);
      await refresh();
    } catch (reason) {
      setDeleteError(reason instanceof Error ? reason.message : "Unable to delete this plant.");
    } finally {
      setDeleting("");
      setConfirming("");
    }
  }

  return (
    <AuthGuard>
      <AppShell title="My plants" description="Keep every plant's story in one place.">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{plants.length} plants in your collection</p>
          </div>
          <Link href="/plants/new" className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800">
            <Plus className="size-4" /> Add plant
          </Link>
        </div>
        {error && <p className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}
        {deleteError && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-700">{deleteError}</p>}
        {loading ? <p className="mt-8 text-sm text-gray-500">Loading plants...</p> : plants.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/50 p-12 text-center">
            <Sprout className="mx-auto size-10 text-emerald-700" />
            <h2 className="mt-4 text-lg font-semibold">Your collection is ready to grow</h2>
            <p className="mt-2 text-sm text-gray-500">Add your first plant to start tracking care, growth, and health.</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {plants.map((plant) => (
              <article key={plant.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-semibold text-gray-900">{plant.name}</h2>
                    <p className="mt-1 text-sm text-gray-500">{plant.species || "Species not identified"}</p>
                  </div>
                  {confirming === plant.id ? (
                    <span className="flex items-center gap-2 text-xs">
                      <button type="button" onClick={() => void handleDelete(plant.id)} disabled={deleting === plant.id} className="font-semibold text-red-600">{deleting === plant.id ? "Deleting..." : "Delete"}</button>
                      <button type="button" onClick={() => setConfirming("")} className="text-gray-500">Cancel</button>
                    </span>
                  ) : (
                    <button type="button" aria-label={`Delete ${plant.name}`} onClick={() => setConfirming(plant.id)} className="text-gray-400 hover:text-red-600">
                      <Trash2 className="size-4" />
                    </button>
                  )}
                </div>
                <p className="mt-5 text-sm text-gray-600">{plant.location || "No location set"}</p>
                <Link href={`/plants/${plant.id}`} className="mt-5 inline-block text-sm font-semibold text-emerald-700 hover:underline">View plant →</Link>
              </article>
            ))}
          </div>
        )}
      </AppShell>
    </AuthGuard>
  );
}
