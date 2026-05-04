"use client";

import { AnimatePresence, motion } from "motion/react";

/**
 * Visual "the demo just tapped this" indicator: a small filled blue circle
 * that radiates outward from the center of its parent. Mount inside a
 * `position: relative` element. Re-fires whenever `triggered` changes
 * (parents bump a counter when scripted auto-mode "clicks" the element).
 *
 * Always circular and blue — same shape across every tap target so the
 * visual language stays consistent across slides.
 */
export function TapPulse({
  triggered,
  size = 56,
}: {
  triggered: number;
  /** Diameter of the circle at scale 1, in px. Defaults to 56. */
  size?: number;
}) {
  return (
    <AnimatePresence>
      {triggered > 0 && (
        <motion.span
          key={triggered}
          aria-hidden="true"
          className="absolute pointer-events-none rounded-full bg-status-new-strong"
          style={{
            left: "50%",
            top: "50%",
            width: size,
            height: size,
            marginLeft: -size / 2,
            marginTop: -size / 2,
          }}
          initial={{ scale: 0.35, opacity: 0.55 }}
          animate={{ scale: 1.55, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        />
      )}
    </AnimatePresence>
  );
}
