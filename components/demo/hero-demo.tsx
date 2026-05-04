"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { PhoneFrame } from "./phone-frame";
import { Modal } from "./modal";
import { SLIDES, type SlideKey } from "./constants";

// How long to linger on a slide AFTER its scripted animation finishes
// before advancing to the next. Per user spec: ~2s breathing room.
const POST_ANIMATION_PAUSE_MS = 2000;
// Hard ceiling: if a slide never reports completion (network slow, motion
// disabled), still advance after this long.
const MAX_SLIDE_MS = 12000;
import { SlideReading } from "./slides/slide-reading";
import { SlideMarkWords } from "./slides/slide-mark-words";
import { SlideFlashcard } from "./slides/slide-flashcard";
import { SlideDashboard } from "./slides/slide-dashboard";

type Mode = "auto" | "interactive";

const INTERACTIVE_SLIDES = new Set([1, 2]);

type DemoSlidesProps = {
  mode: Mode;
  current: number;
  setCurrent: (i: number) => void;
  hintTick: number;
  completed: Set<number>;
  markComplete: (i: number) => void;
  onAutoComplete?: () => void;
};

function DemoSlides({
  mode,
  current,
  hintTick,
  markComplete,
  onAutoComplete,
}: DemoSlidesProps) {
  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          {current === 0 && (
            <SlideReading
              active={current === 0}
              onAutoComplete={onAutoComplete}
            />
          )}
          {current === 1 && (
            <SlideMarkWords
              active={current === 1}
              mode={mode}
              hintTick={hintTick}
              onComplete={() => markComplete(1)}
              onAutoComplete={onAutoComplete}
            />
          )}
          {current === 2 && (
            <SlideFlashcard
              active={current === 2}
              mode={mode}
              hintTick={hintTick}
              onComplete={() => markComplete(2)}
              onAutoComplete={onAutoComplete}
            />
          )}
          {current === 3 && (
            <SlideDashboard
              active={current === 3}
              onAutoComplete={onAutoComplete}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function DotIndicator({
  total,
  current,
  onSelect,
}: {
  total: number;
  current: number;
  onSelect?: (i: number) => void;
}) {
  return (
    <div className="flex justify-center gap-1.5" role="tablist">
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i === current;
        return (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Step ${i + 1} of ${total}`}
            onClick={() => onSelect?.(i)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              isActive ? "w-5 bg-accent" : "w-1.5 bg-border hover:bg-muted/40"
            }`}
          />
        );
      })}
    </div>
  );
}

// ----- Hero (auto-play, compact) -----

export function HeroDemo({
  className = "",
  onTryInteractive,
  triggerRef,
}: {
  className?: string;
  onTryInteractive?: () => void;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  // Tracks which slide index has reported its scripted animation as done.
  // Storing the index (rather than a reset-per-slide boolean) lets us avoid
  // a useEffect-driven reset of the flag — `animationDone` is derived.
  const [completedSlide, setCompletedSlide] = useState<number | null>(null);
  const animationDone = completedSlide === current;
  const containerRef = useRef<HTMLDivElement>(null);

  // Pause auto-play when scrolled out of view.
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio > 0.4),
      { threshold: [0, 0.4, 1] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Failsafe: if a slide never reports completion (slow network, motion
  // disabled), advance after MAX_SLIDE_MS regardless.
  useEffect(() => {
    if (paused || !inView) return;
    const id = window.setTimeout(
      () => setCompletedSlide(current),
      MAX_SLIDE_MS,
    );
    return () => window.clearTimeout(id);
  }, [current, paused, inView]);

  // Once the current slide is done, wait POST_ANIMATION_PAUSE_MS then advance.
  useEffect(() => {
    if (!animationDone || paused || !inView) return;
    const id = window.setTimeout(
      () => setCurrent((c) => (c + 1) % SLIDES.length),
      POST_ANIMATION_PAUSE_MS,
    );
    return () => window.clearTimeout(id);
  }, [animationDone, paused, inView]);

  const handleAutoComplete = useCallback(() => {
    setCompletedSlide((prev) => (prev === current ? prev : current));
  }, [current]);

  const handleManualSelect = useCallback((i: number) => {
    setCurrent(i);
    setPaused(true);
  }, []);

  const slideTitle = SLIDES[current].title;
  const slideKey: SlideKey = SLIDES[current].key;

  return (
    <MotionConfig reducedMotion="user">
    <div
      ref={containerRef}
      className={`flex flex-col items-stretch gap-4 ${className}`}
      role="region"
      aria-label="Fahimna app demo"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
    >
      <PhoneFrame>
        <div className="px-4 pt-5 pb-4 flex flex-col gap-3 min-h-[420px]">
          <div className="flex-1 flex items-center">
            <DemoSlides
              mode="auto"
              current={current}
              setCurrent={setCurrent}
              hintTick={0}
              completed={new Set()}
              markComplete={() => {}}
              onAutoComplete={handleAutoComplete}
            />
          </div>

          <div className="flex flex-col items-center gap-2 pt-1">
            <p
              key={slideKey}
              className="text-[13px] font-semibold text-foreground tracking-tight"
            >
              {slideTitle}
            </p>
            <DotIndicator
              total={SLIDES.length}
              current={current}
              onSelect={handleManualSelect}
            />
          </div>
        </div>
      </PhoneFrame>

      {onTryInteractive && (
        <button
          ref={triggerRef}
          type="button"
          onClick={onTryInteractive}
          className="self-center inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:opacity-80 transition"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
          Try the interactive demo
        </button>
      )}
    </div>
    </MotionConfig>
  );
}

// ----- Modal (interactive) -----

function InteractiveDemoInner({ onClose }: { onClose: () => void }) {
  const [current, setCurrent] = useState(0);
  const [completed, setCompleted] = useState<Set<number>>(() => new Set());
  const [hintTick, setHintTick] = useState(0);
  const titleId = useId();

  const markComplete = useCallback((i: number) => {
    setCompleted((prev) => {
      if (prev.has(i)) return prev;
      const next = new Set(prev);
      next.add(i);
      return next;
    });
  }, []);

  const isInteractive = INTERACTIVE_SLIDES.has(current);
  const canAdvance = !isInteractive || completed.has(current);

  const handleNext = () => {
    if (!canAdvance) {
      setHintTick((n) => n + 1);
      return;
    }
    if (current < SLIDES.length - 1) setCurrent((c) => c + 1);
    else onClose();
  };

  const slide = SLIDES[current];

  return (
    <div className="bg-background rounded-3xl border border-border shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-border">
        <span className="text-xs font-semibold tracking-wider text-faint">
          DEMO · {current + 1}/{SLIDES.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close demo"
          className="w-8 h-8 -mr-1 flex items-center justify-center rounded-full hover:bg-card transition"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
            <path
              d="M6 6l12 12M6 18L18 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div className="px-6 pt-6 pb-3">
        <div className="min-h-[340px] flex items-center">
          <DemoSlides
            mode="interactive"
            current={current}
            setCurrent={setCurrent}
            hintTick={hintTick}
            completed={completed}
            markComplete={markComplete}
          />
        </div>
        <div className="mt-4 text-center">
          <h3
            id={titleId}
            className="text-lg font-bold tracking-tight text-foreground"
          >
            {slide.title}
          </h3>
          <p className="mt-2 text-sm text-muted leading-relaxed max-w-sm mx-auto">
            {slide.body}
          </p>
        </div>
      </div>

      <div className="px-6 pt-2 pb-6 flex flex-col items-center gap-4">
        <DotIndicator total={SLIDES.length} current={current} />
        <button
          type="button"
          onClick={handleNext}
          className={`w-full py-3.5 rounded-2xl text-base font-semibold transition ${
            canAdvance
              ? "bg-foreground text-background hover:opacity-90"
              : "bg-foreground/40 text-background/70 cursor-not-allowed"
          }`}
        >
          {current === SLIDES.length - 1 ? "Get Started" : "Next"}
        </button>
      </div>
    </div>
  );
}

function InteractiveDemo({ onClose }: { onClose: () => void }) {
  return (
    <MotionConfig reducedMotion="user">
      <InteractiveDemoInner onClose={onClose} />
    </MotionConfig>
  );
}

export function DemoModal({
  open,
  onClose,
  returnFocusTo,
}: {
  open: boolean;
  onClose: () => void;
  returnFocusTo?: React.RefObject<HTMLElement | null>;
}) {
  return (
    <Modal open={open} onClose={onClose} returnFocusTo={returnFocusTo}>
      <InteractiveDemo onClose={onClose} />
    </Modal>
  );
}

// ----- Hero + modal combo (drop-in for the page) -----

export function HeroDemoWithModal({ className = "" }: { className?: string }) {
  const [modalOpen, setModalOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return (
    <>
      <HeroDemo
        className={className}
        onTryInteractive={() => {
          setModalOpen(true);
        }}
        triggerRef={triggerRef}
      />
      <DemoModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        returnFocusTo={triggerRef}
      />
    </>
  );
}

export { DemoSlides };
