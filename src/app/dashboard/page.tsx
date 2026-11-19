"use client";

import Link from "next/link";
import { ArrowRight, ScanSearch, Sprout, Stethoscope } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { AuthGuard } from "@/components/auth/auth-guard";
import { useAuth } from "@/lib/auth";
import { usePlants } from "@/hooks/use-plants";

export default function DashboardPage() {
  const { user } = useAuth();
  const { plants, loading } = usePlants();

  return (
    <AuthGuard>
      <AppShell title="Dashboard" description={`Welcome back, ${user?.name || "plant enthusiast"}.`}>
        <section className="rounded-3xl bg-emerald-900 p-7 text-white sm:p-10">
          <p className="text-sm font-medium text-emerald-200">Your plant intelligence workspace</p>
          <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">Observe, understand, and help every plant thrive.</h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-emerald-100">Connect your care routines, AI insights, and growth records in one calm workspace.</p>
        </section>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-5"><Sprout className="size-5 text-emerald-700" /><p className="mt-4 text-3xl font-semibold">{loading ? "—" : plants.length}</p><p className="text-sm text-gray-500">Plants tracked</p></div>
          <Link href="/identify" className="rounded-2xl border border-gray-200 bg-white p-5 hover:border-emerald-300"><ScanSearch className="size-5 text-emerald-700" /><p className="mt-4 font-semibold">Identify a plant</p><p className="mt-1 text-sm text-gray-500">Use an existing plant image</p></Link>
          <Link href="/diagnose" className="rounded-2xl border border-gray-200 bg-white p-5 hover:border-emerald-300"><Stethoscope className="size-5 text-emerald-700" /><p className="mt-4 font-semibold">Check plant health</p><p className="mt-1 text-sm text-gray-500">Get an AI-supported assessment</p></Link>
        </div>
        <div className="mt-8 flex items-center justify-between"><h2 className="text-lg font-semibold">Recent plants</h2><Link href="/plants" className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700">View all <ArrowRight className="size-4" /></Link></div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{plants.slice(0, 3).map((plant) => <Link key={plant.id} href={`/plants/${plant.id}`} className="rounded-xl border border-gray-200 bg-white p-4 hover:border-emerald-300"><p className="font-medium">{plant.name}</p><p className="mt-1 text-sm text-gray-500">{plant.species || "Species not identified"}</p></Link>)}</div>
      </AppShell>
    </AuthGuard>
  );
}
