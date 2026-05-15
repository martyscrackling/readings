"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isDisabled = useMemo(() => {
    return isSubmitting;
  }, [isSubmitting]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // 💡 Fake login (offline mode)
      if (!email || !password) {
        setError("Please enter email and password.");
        return;
      }

      // store user locally
      localStorage.setItem("userEmail", email);

      router.push("/dashboard");
    } catch (err) {
      setError("Login failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function onGoogle() {
    setError("Google login is disabled in offline mode.");
  }

  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-6 py-16 dark:bg-black">
      <div className="w-full max-w-md rounded-2xl border border-black/8 bg-white p-8 dark:border-white/15 dark:bg-black">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Log in
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Use your email and password.
          </p>
        </div>

        {error ? (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-700 dark:text-red-300">
            {error}
          </div>
        ) : null}

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 rounded-xl border border-black/8 bg-transparent px-3 text-sm outline-none dark:border-white/15 dark:text-zinc-50"
              placeholder="you@example.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 rounded-xl border border-black/8 bg-transparent px-3 text-sm outline-none dark:border-white/15 dark:text-zinc-50"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isDisabled}
            className="mt-2 inline-flex h-11 items-center justify-center rounded-xl bg-foreground px-4 text-sm font-medium text-background disabled:opacity-60"
          >
            {isSubmitting ? "Signing in…" : "Sign in"}
          </button>

          <button
            type="button"
            onClick={onGoogle}
            className="inline-flex h-11 items-center justify-center rounded-xl border border-black/8 px-4 text-sm font-medium dark:border-white/15"
          >
            Continue with Google
          </button>

          <p className="mt-2 text-center text-sm text-zinc-600 dark:text-zinc-400">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}