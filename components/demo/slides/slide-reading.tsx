"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import { FATIHA_WORDS } from "../constants";

// Stagger reveal: 150ms initial delay, 160ms between each word, 280ms each.
// Total = 150 + 4*160 + verse-marker (240) = ~1030ms.
const REVEAL_TOTAL_MS = 150 + FATIHA_WORDS.length * 160 + 240;

export function SlideReading({
  active,
  onAutoComplete,
}: {
  active: boolean;
  onAutoComplete?: () => void;
}) {
  // Tell the parent when the reveal animation has finished playing out so it
  // can schedule the inter-slide pause and advance.
  useEffect(() => {
    if (!active || !onAutoComplete) return;
    const id = window.setTimeout(onAutoComplete, REVEAL_TOTAL_MS);
    return () => window.clearTimeout(id);
  }, [active, onAutoComplete]);

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.div
        key={active ? "card-active" : "card-idle"}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="w-full rounded-2xl bg-card px-4 py-4"
      >
        <p className="text-[10px] font-bold tracking-[1.5px] text-faint text-center mb-3">
          AL-FĀTIḤAH · 1
        </p>
        <div className="flex flex-row-reverse flex-wrap justify-center items-start gap-x-1 gap-y-2">
          {FATIHA_WORDS.map((w, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: active ? 1 : 0 }}
              transition={{
                duration: 0.28,
                delay: active ? 0.15 + i * 0.16 : 0,
              }}
              className="px-1.5 py-1 flex flex-col items-center min-w-[44px]"
            >
              <span className="font-arabic text-[26px] text-foreground leading-tight">
                {w.ar}
              </span>
              <span className="text-[10px] text-muted text-center mt-0.5 max-w-[80px] leading-tight">
                {w.en}
              </span>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{
              duration: 0.24,
              delay: active ? 0.15 + FATIHA_WORDS.length * 0.16 : 0,
            }}
            className="px-0.5 py-1 flex items-center justify-center"
          >
            <span className="font-arabic text-[28px] text-muted leading-none">
              ١
            </span>
          </motion.div>
        </div>
      </motion.div>
      <p className="text-xs text-faint text-center max-w-[240px] leading-relaxed">
        Each word translated under it. Tap any word for the deep analysis.
      </p>
    </div>
  );
}
