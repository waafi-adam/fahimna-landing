"use client";

import { useEffect, useRef, useState } from "react";

// Drives a number from 0 → target whenever `active` is true. Slides are
// conditionally mounted by the carousel (only the active slide is rendered),
// so we don't need to reset when active flips false — that path is the
// component unmounting, and the hook starts back at 0 next mount. Easing
// matches the app's Easing.out(Easing.cubic).
export function useCountUp(
  active: boolean,
  target: number,
  duration = 1100,
  delay = 200,
) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;

    let cancelled = false;
    let startTs = 0;

    const tick = (ts: number) => {
      if (cancelled) return;
      if (startTs === 0) startTs = ts + delay;
      if (ts < startTs) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const elapsed = ts - startTs;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3); // cubic-out
      setValue(Math.round(target * eased));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [active, target, duration, delay]);

  return value;
}
