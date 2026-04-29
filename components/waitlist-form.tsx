"use client";

import { useActionState } from "react";
import { joinWaitlist, type WaitlistState } from "@/app/actions";

const initialState: WaitlistState = { status: "idle" };

export function WaitlistForm() {
  const [state, formAction, isPending] = useActionState(
    joinWaitlist,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="w-full sm:w-auto flex flex-col gap-2"
      aria-live="polite"
    >
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          name="email"
          required
          placeholder="you@email.com"
          aria-label="Your email address"
          disabled={isPending || state.status === "success"}
          className="flex-1 sm:min-w-[220px] px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={isPending || state.status === "success"}
          className="px-6 py-3 rounded-xl bg-foreground text-background font-semibold transition hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending
            ? "Joining…"
            : state.status === "success"
              ? "You're in"
              : "Notify me when it launches"}
        </button>
      </div>
      {state.status === "error" && (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {state.message}
        </p>
      )}
      {state.status === "success" && (
        <p className="text-sm text-emerald-700 dark:text-emerald-400">
          {state.message}
        </p>
      )}
      {state.status === "idle" && (
        <p className="text-xs text-faint">
          Get an email when Fahimna lands on the App Store. No spam, ever.
        </p>
      )}
    </form>
  );
}
