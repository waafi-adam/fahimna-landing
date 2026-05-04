"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import { useCountUp } from "../use-count-up";

// Slide 4 — "Track your journey". Mirrors the Daily goal · TODAY card from
// app/onboarding.tsx (Slide4Mockup, lines 1407–1661). Reveal animations run
// when `active` flips true: count-ups for streak / today / status totals,
// plus the stacked goal bar growing in.

const PROGRESS_EASE = [0.22, 1, 0.36, 1] as const;
// Total time for all reveal animations to settle.
// Count-ups (1100ms + 350ms delay = 1450ms) + progress bar (900ms + 450ms
// delay = 1350ms). Pad slightly so the final number lands.
const REVEAL_TOTAL_MS = 1600;

export function SlideDashboard({
  active,
  onAutoComplete,
}: {
  active: boolean;
  onAutoComplete?: () => void;
}) {
  useEffect(() => {
    if (!active || !onAutoComplete) return;
    const id = window.setTimeout(onAutoComplete, REVEAL_TOTAL_MS);
    return () => window.clearTimeout(id);
  }, [active, onAutoComplete]);


  const streak = useCountUp(active, 7, 900, 200);
  const todayActions = useCountUp(active, 5, 900, 350);
  const knownCount = useCountUp(active, 387, 1100, 350);
  const learningCount = useCountUp(active, 124, 1100, 350);
  const newCount = useCountUp(active, 5912, 1100, 350);

  // The flame fills once the goal is met (matches goalMet = streak >= 5
  // in the app — by the end of the count-up animation, the flame is solid).
  const goalMet = streak >= 5;
  const goalReached = todayActions >= 5;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-full rounded-2xl bg-card px-5 py-5">
        {/* Header row: Daily goal + stepper */}
        <div className="flex flex-row items-center justify-between">
          <span className="text-[13px] font-semibold text-foreground">
            Daily goal
          </span>
          <div className="flex flex-row items-center gap-2">
            <span className="text-[11px] text-muted">Goal</span>
            <StepBtn icon="minus" />
            <span className="text-[14px] font-bold text-foreground tabular-nums min-w-[18px] text-center">
              5
            </span>
            <StepBtn icon="plus" />
            <span className="text-[11px] text-muted">words/day</span>
          </div>
        </div>

        {/* Hairline divider — full-bleed within the card padding. */}
        <div className="-mx-5 my-3.5 h-px bg-border" />

        <p className="text-[11px] font-bold tracking-[0.6px] text-faint mb-3">
          TODAY
        </p>

        {/* Streak + today row */}
        <div className="flex flex-row items-center gap-4">
          {/* Streak column */}
          <div className="flex flex-col items-center min-w-[56px]">
            <FlameIcon filled={goalMet} />
            <span className="text-[28px] font-extrabold text-foreground tabular-nums mt-0.5 leading-8">
              {streak}
            </span>
            <span className="text-[10px] text-muted -mt-0.5">day streak</span>
          </div>

          {/* Right column: today line + progress bar */}
          <div className="flex-1 flex flex-col gap-1.5">
            <div className="flex flex-row items-center justify-between">
              <span className="text-[12px] text-muted">Today</span>
              <span className="text-[13px] text-foreground tabular-nums flex flex-row items-center">
                <span className="font-bold">{todayActions}</span>
                <span className="text-muted">&nbsp;/ 5</span>
                {goalReached && (
                  <CheckIcon className="ml-1.5 text-status-known-strong" />
                )}
              </span>
            </div>
            <ProgressBar active={active} />
          </div>
        </div>

        {/* Legend row */}
        <div className="flex flex-row justify-between mt-4">
          <LegendItem
            colorClass="bg-status-known-strong"
            label="Known"
            count={knownCount}
          />
          <LegendItem
            colorClass="bg-status-learning-strong"
            label="Learning"
            count={learningCount}
          />
          <LegendItem
            colorClass="bg-status-new-strong"
            label="New"
            count={newCount}
          />
        </div>
      </div>
    </div>
  );
}

function StepBtn({ icon }: { icon: "plus" | "minus" }) {
  return (
    <span
      className="inline-flex items-center justify-center w-[22px] h-[22px] rounded-full bg-background"
      aria-hidden="true"
    >
      {icon === "plus" ? (
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5 1.5v7M1.5 5h7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="text-foreground"
          />
        </svg>
      ) : (
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M1.5 5h7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="text-foreground"
          />
        </svg>
      )}
    </span>
  );
}

function FlameIcon({ filled }: { filled: boolean }) {
  // Outline flame when goal not yet met; solid green when met.
  // Path traced from a generic Ionicons-style flame at 20×20.
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={filled ? "text-status-known-strong" : "text-muted"}
    >
      <path
        d="M12 2.5s1.6 2.5 1.6 4.8c0 1.6-1.1 2.5-1.1 4.1 0 1.5 1.2 2.6 2.6 2.6 1.6 0 2.7-1.3 2.7-2.7 0-.6-.1-1.1-.3-1.6 1.7 1.1 3 3 3 5.6 0 3.6-3 6.7-7.1 6.7-4 0-7.4-2.7-7.4-6.5 0-3.4 1.6-5.5 3.4-7.4C11 6 12 4.7 12 2.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill={filled ? "currentColor" : "none"}
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2.5 6.5l2.3 2.3L9.5 3.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProgressBar({ active }: { active: boolean }) {
  // Stacked horizontal bar — three colored segments grow from 0 to their
  // target widths after a 450ms delay over 900ms. The remaining track shows
  // through as bg-progress-bg.
  return (
    <div className="h-3 rounded-full bg-progress-bg overflow-hidden flex flex-row">
      <motion.div
        className="h-full bg-status-known-strong"
        initial={{ width: "0%" }}
        animate={{ width: active ? "18%" : "0%" }}
        transition={{ duration: 0.9, delay: 0.45, ease: PROGRESS_EASE }}
      />
      <motion.div
        className="h-full bg-status-learning-strong"
        initial={{ width: "0%" }}
        animate={{ width: active ? "12%" : "0%" }}
        transition={{ duration: 0.9, delay: 0.45, ease: PROGRESS_EASE }}
      />
      <motion.div
        className="h-full bg-status-new-strong"
        initial={{ width: "0%" }}
        animate={{ width: active ? "22%" : "0%" }}
        transition={{ duration: 0.9, delay: 0.45, ease: PROGRESS_EASE }}
      />
    </div>
  );
}

function LegendItem({
  colorClass,
  label,
  count,
}: {
  colorClass: string;
  label: string;
  count: number;
}) {
  return (
    <div className="flex flex-row items-center gap-1.5">
      <span
        className={`inline-block w-2.5 h-2.5 rounded-full ${colorClass}`}
        aria-hidden="true"
      />
      <span className="text-[12px] text-muted tabular-nums">
        {label} {count.toLocaleString()}
      </span>
    </div>
  );
}
