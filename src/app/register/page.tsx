
"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  Leaf,
  LoaderCircle,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";
import { ApiError } from "@/lib/api";
import { useAuth } from "@/lib/auth";

export default function RegisterPage() {
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedName.length < 2 || normalizedName.length > 100) {
      setError("Name must be between 2 and 100 characters.");
      return;
    }

    if (password.length < 8 || password.length > 128) {
      setError("Password must be between 8 and 128 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    try {
      await register(normalizedName, normalizedEmail, password);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Unable to create your account. Please try again."
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
          Get started
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Grow with confidence.
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#6d7c70]">
          Create your account to identify plants, understand their health, and
          build better care routines.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Full name
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-[#dce4d7] px-4 focus-within:border-[#58805a] focus-within:ring-2 focus-within:ring-[#58805a]/10">
              <UserRound size={18} className="text-[#819180]" />
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                minLength={2}
                maxLength={100}
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your full name"
                className="min-w-0 flex-1 py-3.5 text-sm outline-none"
              />
            </div>
          </div>

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
                autoComplete="new-password"
                required
                minLength={8}
                maxLength={128}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="At least 8 characters"
                className="min-w-0 flex-1 py-3.5 text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium"
            >
              Confirm password
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-[#dce4d7] px-4 focus-within:border-[#58805a] focus-within:ring-2 focus-within:ring-[#58805a]/10">
              <LockKeyhole size={18} className="text-[#819180]" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                maxLength={128}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Re-enter your password"
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
            {submitting && <LoaderCircle size={18} className="animate-spin" />}
            {submitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-[#6d7c70]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#286346] hover:underline"
          >
            Sign in
          </Link>
        </p>

        <Link
          href="/"
          className="mt-5 block text-center text-sm text-[#819180] hover:text-[#194b35]"
        >
          Back to home
        </Link>
      </section>
    </main>
  );
}
