"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FATIHA_WORDS, type WordStatus } from "../constants";
import { TapPulse } from "../tap-pulse";

export type SlideMarkWordsProps = {
  active: boolean;
  mode: "auto" | "interactive";
  hintTick?: number;
  onComplete?: () => void; // interactive — user-driven completion
  onAutoComplete?: () => void; // auto — scripted demo finished
};

// Mirrors STATUS_VISUAL from app/onboarding.tsx:413–416. Each layer's opacity
// is driven directly by the word's current status.
const STATUS_VISUAL: Record<
  WordStatus,
  { blue: number; yellow: number; meaning: number }
> = {
  new: { blue: 1, yellow: 0, meaning: 1 },
  learning: { blue: 0, yellow: 1, meaning: 0.4 },
  known: { blue: 0, yellow: 0, meaning: 0 },
};

const REQUIRED_PICKS = 2;
const EASE = [0.22, 1, 0.36, 1] as const;

// Spring matching the app's SegmentToggle (`friction: 9, tension: 90`).
const TOGGLE_SPRING = { type: "spring", stiffness: 180, damping: 24 } as const;
// Spring matching the app's sheet/legend pop (`friction: 6`).
const POP_SPRING = { type: "spring", stiffness: 220, damping: 18 } as const;

// In auto mode we demo three word picks:
//   word 0 (بِسۡمِ)        → known
//   word 1 (ٱللَّهِ)        → known
//   word 2 (ٱلرَّحۡمَٰنِ)   → learning
// word 3 (ٱلرَّحِيمِ) stays 'new' so the legend's blue still has a live example.
const AUTO_PLAN: ReadonlyArray<{ index: number; status: WordStatus }> = [
  { index: 0, status: "known" },
  { index: 1, status: "known" },
  { index: 2, status: "learning" },
];

type Mode = 0 | 1; // 0 = Reading, 1 = Learning

export function SlideMarkWords({
  active,
  mode,
  hintTick = 0,
  onComplete,
  onAutoComplete,
}: SlideMarkWordsProps) {
  const [modeIndex, setModeIndex] = useState<Mode>(0);
  const [wordPicked, setWordPicked] = useState<Record<number, WordStatus>>({});
  const [sheetWordIndex, setSheetWordIndex] = useState<number | null>(null);
  const [bouncedWord, setBouncedWord] = useState<number | null>(null);
  const [hintTarget, setHintTarget] = useState<"toggle" | "card" | null>(null);

  // Auto-mode pulse counters — bumped each time the scripted sequence "taps"
  // an element so a TapPulse ripple radiates from it.
  const [togglePulse, setTogglePulse] = useState(0);
  const [wordPulse, setWordPulse] = useState<Record<number, number>>({});
  const [sheetButtonPulse, setSheetButtonPulse] = useState(0);

  // Press-down feedback for elements being auto-tapped. Briefly scales the
  // target to ~0.95 so it visually "responds" before the action lands.
  const [togglePressed, setTogglePressed] = useState(false);

  const lastHintTick = useRef(0);
  const autoCompleteFiredRef = useRef(false);

  // Auto-mode scripted demonstration. Single play; on completion we fire
  // `onAutoComplete` exactly once per active mount and stop. The parent owns
  // the inter-slide pause and any looping.
  useEffect(() => {
    if (!active || mode !== "auto") return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const schedule = (ms: number, fn: () => void) => {
      timers.push(setTimeout(fn, ms));
    };

    let t = 0;

    // 1. Press-down on the toggle, ripple, then flip to Learning.
    t += 800;
    schedule(t, () => {
      setTogglePressed(true);
      setTogglePulse((c) => c + 1);
    });
    // Release press + apply state ~140ms later (matches a real press feel).
    schedule(t + 140, () => {
      setTogglePressed(false);
      setModeIndex(1);
    });

    // 2. Linger so the visitor sees the color morph.
    t += 1100;

    // 3. Demo three word picks: word 0 = Known, word 1 = Known, word 2 =
    //    Learning. Each cycle: tap word → sheet opens → 600ms → pick status
    //    (ripple on chosen pill) → 400ms → sheet closes → 450ms gap → next.
    AUTO_PLAN.forEach(({ index: wordIdx, status }) => {
      // Tap word: bounce + ripple + open sheet.
      schedule(t, () => {
        setBouncedWord(wordIdx);
        setWordPulse((prev) => ({
          ...prev,
          [wordIdx]: (prev[wordIdx] ?? 0) + 1,
        }));
        setSheetWordIndex(wordIdx);
      });
      schedule(t + 290, () => setBouncedWord(null));

      // Pick status: ripple on the pill + apply color.
      t += 600;
      schedule(t, () => {
        setSheetButtonPulse((c) => c + 1);
        setWordPicked((prev) => ({ ...prev, [wordIdx]: status }));
      });

      // Pause so the pick is visible.
      t += 400;
      schedule(t, () => setSheetWordIndex(null));

      // After the sheet finishes its exit animation, reset the shared pulse
      // counter so the next sheet's "new" pill doesn't auto-fire just because
      // the trigger value happens to still be > 0 from the previous pick.
      schedule(t + 250, () => setSheetButtonPulse(0));

      // Gap before next word.
      t += 450;
    });

    // 4. Notify parent — once.
    schedule(t, () => {
      if (autoCompleteFiredRef.current) return;
      autoCompleteFiredRef.current = true;
      onAutoComplete?.();
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [active, mode, onAutoComplete]);

  // Notify parent in interactive mode once the user has done enough.
  const pickedCount = Object.keys(wordPicked).length;
  useEffect(() => {
    if (mode !== "interactive") return;
    if (modeIndex === 1 && pickedCount >= REQUIRED_PICKS) {
      onComplete?.();
    }
  }, [mode, modeIndex, pickedCount, onComplete]);

  // Hint pulse — pulse whichever element the user still needs to touch.
  useEffect(() => {
    if (hintTick <= lastHintTick.current) return;
    lastHintTick.current = hintTick;
    const target: "toggle" | "card" = modeIndex === 0 ? "toggle" : "card";
    setHintTarget(target);
    const id = setTimeout(() => setHintTarget(null), 800);
    return () => clearTimeout(id);
  }, [hintTick, modeIndex]);

  const handleWordTap = useCallback(
    (i: number) => {
      if (mode !== "interactive") return;
      if (modeIndex !== 1) return;
      if (sheetWordIndex !== null) return;
      setBouncedWord(i);
      setSheetWordIndex(i);
      setTimeout(() => setBouncedWord(null), 290);
    },
    [mode, modeIndex, sheetWordIndex]
  );

  const handlePick = useCallback(
    (status: WordStatus) => {
      if (sheetWordIndex === null) return;
      const i = sheetWordIndex;
      setWordPicked((prev) => ({ ...prev, [i]: status }));
      setTimeout(() => setSheetWordIndex(null), 450);
    },
    [sheetWordIndex]
  );

  const isInteractive = mode === "interactive";
  const isAuto = mode === "auto";

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      {/* Toggle — hint pulse is on the wrapper (so the whole control draws
          attention in interactive mode); the auto-mode tap visually targets
          ONLY the Learning segment via SegmentToggle's autoTap props. */}
      <motion.div
        animate={{
          scale: hintTarget === "toggle" ? [1, 1.06, 1, 1.06, 1] : 1,
        }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative w-[200px]"
      >
        <SegmentToggle
          modeIndex={modeIndex}
          onChange={(next) => {
            if (!isInteractive) return;
            setModeIndex(next);
          }}
          disabled={!isInteractive}
          autoTapTarget={isAuto ? 1 : null}
          autoTapPulse={togglePulse}
          autoTapPressed={togglePressed}
        />
      </motion.div>

      {/* Verse card */}
      <motion.div
        animate={{
          scale: hintTarget === "card" ? [1, 1.06, 1, 1.06, 1] : 1,
        }}
        transition={{ duration: 0.8, ease: EASE }}
        className="w-full"
      >
        <div className="w-full rounded-2xl bg-card px-4 py-4">
          <p className="text-[10px] font-bold tracking-[1.5px] text-faint text-center mb-3">
            AL-FĀTIḤAH · 1
          </p>
          <div className="flex flex-row-reverse flex-wrap justify-center items-start gap-x-1 gap-y-2">
            {FATIHA_WORDS.map((w, i) => {
              const status: WordStatus =
                modeIndex === 1 ? wordPicked[i] ?? "new" : "new";
              const visual =
                modeIndex === 1
                  ? STATUS_VISUAL[status]
                  : { blue: 0, yellow: 0, meaning: 1 };
              const isBounced = bouncedWord === i;
              const tappable =
                isInteractive && modeIndex === 1 && sheetWordIndex === null;
              return (
                <motion.button
                  key={i}
                  type="button"
                  onClick={() => handleWordTap(i)}
                  aria-label={`Mark word: ${w.ar}`}
                  aria-disabled={!tappable}
                  animate={{ scale: isBounced ? [1, 0.9, 1] : 1 }}
                  transition={{ duration: 0.29, ease: EASE }}
                  className="relative px-1.5 py-1 flex flex-col items-center min-w-[44px] rounded-md focus:outline-none"
                  style={{ cursor: tappable ? "pointer" : "default" }}
                >
                  {/* Blue fill overlay — pops in (scale + opacity) so the
                      transition is visible, but stays absolute so the word's
                      position never shifts. */}
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-md bg-status-new origin-center"
                    initial={false}
                    animate={{
                      opacity: visual.blue,
                      scale: visual.blue > 0 ? 1 : 0.65,
                    }}
                    transition={{ duration: 0.32, ease: EASE }}
                  />
                  {/* Yellow fill overlay */}
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-md bg-status-learning origin-center"
                    initial={false}
                    animate={{
                      opacity: visual.yellow,
                      scale: visual.yellow > 0 ? 1 : 0.65,
                    }}
                    transition={{ duration: 0.32, ease: EASE }}
                  />
                  <span className="relative font-arabic text-[26px] text-foreground leading-tight">
                    {w.ar}
                  </span>
                  <motion.span
                    initial={false}
                    animate={{ opacity: visual.meaning }}
                    transition={{ duration: 0.32, ease: EASE }}
                    className="relative text-[10px] text-muted text-center mt-0.5 max-w-[80px] leading-tight"
                  >
                    {w.en}
                  </motion.span>
                  {isAuto && (
                    <TapPulse triggered={wordPulse[i] ?? 0} size={48} />
                  )}
                </motion.button>
              );
            })}
            <div className="px-0.5 py-1 flex items-center justify-center">
              <span className="font-arabic text-[24px] text-muted leading-none">
                ١
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Legend (only visible once Learning is on) */}
      <AnimatePresence>
        {modeIndex === 1 && (
          <motion.div
            key="legend"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="flex flex-row gap-3 justify-center"
          >
            <LegendSwatch className="bg-status-new" label="New" />
            <LegendSwatch className="bg-status-learning" label="Learning" />
            <LegendSwatch
              className="bg-transparent border border-dashed border-border"
              label="Known"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mini word-sheet slot */}
      <div className="h-[50px] w-full flex items-center justify-center">
        <AnimatePresence>
          {sheetWordIndex !== null && (
            <motion.div
              key="sheet"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{
                opacity: { duration: 0.2, ease: EASE },
                scale: POP_SPRING,
              }}
            >
              <MiniWordSheet
                selected={wordPicked[sheetWordIndex] ?? "new"}
                onPick={handlePick}
                interactive={isInteractive}
                showAutoPulse={isAuto}
                autoPulseTrigger={sheetButtonPulse}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ---- Sub-components ----

// iOS-style segmented control matching app/components/segment-toggle.tsx.
// Track is `bg-card`, indicator pill is `bg-background` with a soft shadow,
// and the indicator springs between segments with the same friction/tension
// as the app version (≈ stiffness 180, damping 24).
function SegmentToggle({
  modeIndex,
  onChange,
  disabled,
  autoTapTarget = null,
  autoTapPulse = 0,
  autoTapPressed = false,
}: {
  modeIndex: Mode;
  onChange: (next: Mode) => void;
  disabled: boolean;
  /** Which segment (0=Reading, 1=Learning) auto-mode is "tapping". */
  autoTapTarget?: 0 | 1 | null;
  /** Bump to fire a TapPulse from the targeted segment's center. */
  autoTapPulse?: number;
  /** True briefly while the auto sequence is "pressing" the targeted segment. */
  autoTapPressed?: boolean;
}) {
  return (
    <div
      className="relative flex flex-row bg-card"
      style={{ borderRadius: 9, padding: 2, height: 32 }}
    >
      <motion.div
        aria-hidden
        className="absolute bg-background"
        style={{
          top: 2,
          bottom: 2,
          width: "calc(50% - 2px)",
          borderRadius: 7,
          boxShadow: "0 1px 2px rgb(0 0 0 / 0.08)",
        }}
        animate={{ left: modeIndex === 0 ? 2 : "50%" }}
        transition={TOGGLE_SPRING}
      />
      {(["Reading", "Learning"] as const).map((label, i) => {
        const selected = modeIndex === i;
        const isAutoTarget = autoTapTarget === i;
        return (
          <motion.button
            key={label}
            type="button"
            onClick={() => onChange(i as Mode)}
            disabled={disabled}
            aria-pressed={selected}
            animate={{ scale: isAutoTarget && autoTapPressed ? 0.95 : 1 }}
            transition={{ duration: 0.16, ease: EASE }}
            className={`relative z-10 flex-1 flex items-center justify-center text-[13px] font-semibold transition-colors duration-200 ${
              selected ? "text-foreground" : "text-muted"
            } ${disabled ? "cursor-default" : "cursor-pointer"}`}
          >
            {label}
            {isAutoTarget && (
              <TapPulse triggered={autoTapPulse} size={56} />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

function LegendSwatch({
  className,
  label,
}: {
  className: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`inline-block w-3 h-3 rounded ${className}`} />
      <span className="text-[10px] text-muted">{label}</span>
    </div>
  );
}

function MiniWordSheet({
  selected,
  onPick,
  interactive,
  showAutoPulse,
  autoPulseTrigger,
}: {
  selected: WordStatus;
  onPick: (status: WordStatus) => void;
  interactive: boolean;
  showAutoPulse: boolean;
  autoPulseTrigger: number;
}) {
  const options: {
    key: WordStatus;
    label: string;
    activeClass: string;
  }[] = [
    {
      key: "new",
      label: "New",
      activeClass: "bg-status-new border-status-new-strong",
    },
    {
      key: "learning",
      label: "Learning",
      activeClass: "bg-status-learning border-status-learning-strong",
    },
    {
      key: "known",
      label: "Known",
      activeClass: "bg-transparent border-status-known-strong",
    },
  ];
  return (
    <div className="flex flex-row gap-1 bg-background px-1.5 py-1.5 rounded-[10px] border border-border shadow-md min-w-[220px]">
      {options.map((opt) => {
        const isActive = opt.key === selected;
        return (
          <motion.button
            key={opt.key}
            type="button"
            onClick={() => interactive && onPick(opt.key)}
            disabled={!interactive}
            aria-pressed={isActive}
            animate={{ scale: isActive ? [1, 0.92, 1] : 1 }}
            transition={{ duration: 0.25, ease: EASE }}
            className={`relative flex-1 py-1.5 rounded-lg border-[1.5px] text-[11px] text-center transition-colors ${
              isActive
                ? `${opt.activeClass} font-semibold text-foreground`
                : "bg-transparent border-border text-muted"
            } ${interactive ? "cursor-pointer" : "cursor-default"}`}
          >
            {opt.label}
            {showAutoPulse && isActive && (
              <TapPulse triggered={autoPulseTrigger} size={44} />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
