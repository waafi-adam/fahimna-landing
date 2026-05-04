"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { RATINGS } from "../constants";
import { TapPulse } from "../tap-pulse";

export type SlideFlashcardProps = {
  active: boolean;
  mode: "auto" | "interactive";
  hintTick?: number;
  onComplete?: () => void; // interactive — user-driven completion
  onAutoComplete?: () => void; // auto — scripted demo finished
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Auto-mode timing (ms). Compressed but breathable.
const AUTO_SHOW_ANSWER_AT = 1200;
const AUTO_PICK_GOOD_AT = AUTO_SHOW_ANSWER_AT + 1100; // 2300
const AUTO_COMPLETE_AT = AUTO_PICK_GOOD_AT + 600; // 2900
const AUTO_PICK_INDEX = 2; // "Good"

// Tracks `prefers-color-scheme: dark` so we can pick between the light/dark
// rating tints inline (the rest of the site uses CSS vars for theme tokens
// via globals.css; for these per-rating colors we need a JS-accessible
// theme signal). useSyncExternalStore avoids the cascading-render lint that
// fires for setState-in-effect patterns.
const subscribeDark = (cb: () => void) => {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const getDarkSnapshot = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;
const getDarkServerSnapshot = () => false;

function usePrefersDark(): boolean {
  return useSyncExternalStore(
    subscribeDark,
    getDarkSnapshot,
    getDarkServerSnapshot,
  );
}

export function SlideFlashcard({
  active,
  mode,
  hintTick = 0,
  onComplete,
  onAutoComplete,
}: SlideFlashcardProps) {
  const [showedAnswer, setShowedAnswer] = useState(false);
  const [pickedRating, setPickedRating] = useState<number | null>(null);
  const isDark = usePrefersDark();

  // Tap-pulse counters — bumped when auto-mode "clicks" an element. One per
  // rating so only the picked button ripples. Show-answer has its own.
  const [showAnswerPulse, setShowAnswerPulse] = useState(0);
  const [ratingPulses, setRatingPulses] = useState<number[]>(() =>
    RATINGS.map(() => 0),
  );

  // Hint pulse — replays when hintTick changes.
  const [hintPulseKey, setHintPulseKey] = useState(0);
  const lastHintTick = useRef(0);
  useEffect(() => {
    if (hintTick <= lastHintTick.current) return;
    lastHintTick.current = hintTick;
    setHintPulseKey((k) => k + 1);
  }, [hintTick]);

  // Reset whenever the slide goes inactive (e.g. user navigated away). The
  // setState calls live inside the cleanup so they fire on transition out
  // rather than synchronously during the effect body.
  useEffect(() => {
    if (!active) return;
    return () => {
      setShowedAnswer(false);
      setPickedRating(null);
      setShowAnswerPulse(0);
      setRatingPulses(RATINGS.map(() => 0));
    };
  }, [active]);

  const handleShowAnswer = useCallback(() => {
    setShowedAnswer((prev) => prev || true);
  }, []);

  const handleRating = useCallback((i: number) => {
    setPickedRating(i);
  }, []);

  // Notify parent once both interactions are done (interactive mode).
  useEffect(() => {
    if (mode !== "interactive") return;
    if (showedAnswer && pickedRating !== null) {
      onComplete?.();
    }
  }, [mode, showedAnswer, pickedRating, onComplete]);

  // Auto-mode scripted choreography: tap Show Answer, pick "Good", fire
  // onAutoComplete. Single play — the parent unmounts on advance.
  useEffect(() => {
    if (!active || mode !== "auto") return;
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const schedule = (fn: () => void, ms: number) => {
      const t = setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
      timeouts.push(t);
    };

    schedule(() => {
      setShowAnswerPulse((n) => n + 1);
      setShowedAnswer(true);
    }, AUTO_SHOW_ANSWER_AT);

    schedule(() => {
      setRatingPulses((prev) => {
        const next = prev.slice();
        next[AUTO_PICK_INDEX] = next[AUTO_PICK_INDEX] + 1;
        return next;
      });
      setPickedRating(AUTO_PICK_INDEX);
    }, AUTO_PICK_GOOD_AT);

    schedule(() => {
      onAutoComplete?.();
    }, AUTO_COMPLETE_AT);

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [active, mode, onAutoComplete]);

  // Determine which element should pulse on hintTick.
  const pulseTarget: "show" | "rate" = showedAnswer ? "rate" : "show";
  const hintPulseAnim = {
    scale: [1, 1.06, 1, 1.06, 1],
    transition: { duration: 0.8, ease: EASE },
  };

  const explanationText =
    pickedRating !== null ? RATINGS[pickedRating].explanation : "";

  return (
    <div className="flex w-full flex-col gap-3">
      {/* Card area */}
      <div className="w-full rounded-2xl bg-card px-5 py-5">
        <div className="flex min-h-[130px] flex-col items-center justify-center">
          <span className="font-arabic text-[38px] leading-none text-foreground">
            ٱلرَّحۡمَٰنِ
          </span>
          <span className="mt-3 text-xs text-faint">
            {showedAnswer ? "Did you know it?" : "What does this word mean?"}
          </span>
          <AnimatePresence initial={false}>
            {showedAnswer && (
              <motion.div
                key="meaning-pill"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.28, ease: EASE }}
                className="mt-3 rounded-xl bg-background px-3 py-2"
              >
                <span className="text-base font-semibold text-foreground">
                  the Most Gracious
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Action area — Show Answer ↔ rating row */}
      <div className="relative min-h-[56px]">
        <AnimatePresence initial={false} mode="wait">
          {!showedAnswer ? (
            <motion.div
              key="show-answer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="absolute inset-x-0 top-0"
            >
              <motion.button
                type="button"
                onClick={
                  mode === "interactive" ? handleShowAnswer : undefined
                }
                disabled={mode !== "interactive"}
                animate={
                  pulseTarget === "show" && hintPulseKey > 0
                    ? hintPulseAnim
                    : { scale: 1 }
                }
                key={`show-${hintPulseKey}`}
                whileTap={mode === "interactive" ? { scale: 0.97 } : undefined}
                className="relative w-full rounded-xl bg-accent py-3.5 text-center text-base font-bold text-white"
              >
                Show Answer
                {mode === "auto" && (
                  <TapPulse triggered={showAnswerPulse} shape="rect" />
                )}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="rating-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.28, delay: 0.08, ease: EASE },
                y: { duration: 0.32, delay: 0.08, ease: EASE },
              }}
              className="absolute inset-x-0 top-0"
            >
              <motion.div
                key={`rate-${hintPulseKey}`}
                animate={
                  pulseTarget === "rate" && hintPulseKey > 0
                    ? hintPulseAnim
                    : { scale: 1 }
                }
                className="flex w-full flex-row gap-1"
              >
                {RATINGS.map((r, i) => {
                  const isPicked = pickedRating === i;
                  const bg = isDark ? r.bgDark : r.bgLight;
                  return (
                    <motion.button
                      key={r.label}
                      type="button"
                      onClick={
                        mode === "interactive"
                          ? () => handleRating(i)
                          : undefined
                      }
                      disabled={mode !== "interactive"}
                      whileTap={
                        mode === "interactive" ? { scale: 0.92 } : undefined
                      }
                      animate={
                        isPicked ? { scale: [1, 0.92, 1] } : { scale: 1 }
                      }
                      transition={{
                        duration: 0.22,
                        times: isPicked ? [0, 0.41, 1] : undefined,
                        ease: EASE,
                      }}
                      aria-pressed={isPicked}
                      aria-label={`Rate as ${r.label} — next review in ${r.interval}`}
                      className="relative flex flex-1 flex-col items-center justify-center rounded-xl py-2"
                      style={{
                        backgroundColor: bg,
                        color: r.fg,
                        borderWidth: 2,
                        borderStyle: "solid",
                        borderColor: isPicked ? r.fg : "transparent",
                      }}
                    >
                      <span
                        className="text-[12px] font-bold leading-tight"
                        style={{ color: r.fg }}
                      >
                        {r.label}
                      </span>
                      <span
                        className="mt-0.5 text-[10px] leading-tight"
                        style={{ color: r.fg, opacity: 0.7 }}
                      >
                        {r.interval}
                      </span>
                      {mode === "auto" && (
                        <TapPulse
                          triggered={ratingPulses[i]}
                          shape="rect"
                          color={r.fg}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Explanation callout — always rendered to keep layout stable. */}
      <motion.div
        initial={false}
        animate={{
          opacity: pickedRating !== null ? 1 : 0,
          y: pickedRating !== null ? 0 : 8,
        }}
        transition={{ duration: 0.28, ease: EASE }}
        className="min-h-[64px] rounded-xl bg-background px-3 py-2"
        aria-hidden={pickedRating === null}
      >
        <p className="text-center text-[12px] leading-[17px] text-foreground">
          {explanationText || " "}
        </p>
      </motion.div>
    </div>
  );
}
