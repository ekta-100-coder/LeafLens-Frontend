
"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Leaf, LoaderCircle, LockKeyhole, Mail } from "lucide-react";
import { ApiError } from "@/lib/api";
import { useAuth } from "@/lib/auth";

export default function LoginPage() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login(email.trim(), password);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Unable to sign in. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-12">
      <section className="w-full max-w-md rounded-[2rem] border border-[#e3e8dd] bg-white p-7 shadow-xl shadow-[#193b2a]/5 sm:p-10">
        <Link href="/" className="inline-flex items-center gap-2 font-bold">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[#194b35] text-white">
            <Leaf size={22} />
          </span>
          LeafLens <span className="text-[#72936f]">AI</span>
        </Link>

        <p className="mt-10 text-sm font-semibold tracking-widest text-[#658667] uppercase">
          Welcome back
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Let's grow together.
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#6d7c70]">
          Sign in to check on your plants and continue their care journey.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email address
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-[#dce4d7] px-4 focus-within:border-[#58805a] focus-within:ring-2 focus-within:ring-[#58805a]/10">
              <Mail size={18} className="text-[#819180]" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="min-w-0 flex-1 py-3.5 text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium"
            >
              Password
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-[#dce4d7] px-4 focus-within:border-[#58805a] focus-within:ring-2 focus-within:ring-[#58805a]/10">
              <LockKeyhole size={18} className="text-[#819180]" />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                maxLength={128}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                className="min-w-0 flex-1 py-3.5 text-sm outline-none"
              />
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-xl bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#194b35] py-3.5 font-semibold text-white transition hover:bg-[#286346] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting && (
              <LoaderCircle size={18} className="animate-spin" />
            )}
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-[#6d7c70]">
          New to LeafLens?{" "}
          <Link
            href="/register"
            className="font-semibold text-[#286346] hover:underline"
          >
            Create an account
          </Link>
        </p>

        <Link
          href="/"
          className="mt-5 block text-center text-sm text-[#819180] hover:text-[#194b35]"
        >
          ← Back to home
        </Link>
      </section>
    </main>
  );
}
