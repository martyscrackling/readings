"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "../../lib/supabaseClient";

export default function DashboardClient() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const client = supabase;
    if (!client) {
      setIsLoading(false);
      return () => {
        isMounted = false;
      };
    }

    async function load(nonNullClient: NonNullable<typeof supabase>) {
      setError(null);

      const { data, error: sessionError } =
        await nonNullClient.auth.getSession();
      if (!isMounted) return;

      if (sessionError) {
        setError(sessionError.message);
        setIsLoading(false);
        return;
      }

      const userEmail = data.session?.user.email ?? null;
      setEmail(userEmail);
      setIsLoading(false);

      if (!userEmail) {
        router.replace("/login");
      }
    }

    void load(client);

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;
      const nextEmail = session?.user.email ?? null;
      setEmail(nextEmail);
      if (!nextEmail) router.replace("/login");
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [router]);

  async function onSignOut() {
    setError(null);
    if (!supabase) return;
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) setError(signOutError.message);
  }

  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-6 py-16 dark:bg-black">
      <div className="w-full max-w-lg rounded-2xl border border-black/8 bg-white p-8 dark:border-white/15 dark:bg-black">
        <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Dashboard
        </h1>

        {!isSupabaseConfigured ? (
          <div className="mt-4 rounded-xl border border-black/8 bg-zinc-50 p-4 text-sm text-zinc-700 dark:border-white/15 dark:bg-zinc-950 dark:text-zinc-300">
            Supabase env vars missing. Add{" "}
            <span className="font-mono">NEXT_PUBLIC_SUPABASE_URL</span> and{" "}
            <span className="font-mono">NEXT_PUBLIC_SUPABASE_ANON_KEY</span> to{" "}
            <span className="font-mono">.env.local</span>.
          </div>
        ) : null}

        {error ? (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-700 dark:text-red-300">
            {error}
          </div>
        ) : null}

        {isLoading ? (
          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
            Loading session…
          </p>
        ) : email ? (
          <div className="mt-4">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Signed in as <span className="font-medium">{email}</span>
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={onSignOut}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-foreground px-4 text-sm font-medium text-background transition-colors"
              >
                Sign out
              </button>
              <Link
                href="/"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-black/8 px-4 text-sm font-medium text-black transition-colors hover:bg-black/4 dark:border-white/15 dark:text-zinc-50 dark:hover:bg-white/6"
              >
                Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-4">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              You are not signed in.
            </p>
            <Link
              href="/login"
              className="mt-4 inline-flex h-11 items-center justify-center rounded-xl bg-foreground px-4 text-sm font-medium text-background transition-colors"
            >
              Go to login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
