"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";

export function Modal({
  open,
  onClose,
  children,
  labelledBy,
  returnFocusTo,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  labelledBy?: string;
  /**
   * Element to focus when the modal closes. Pass a ref (read inside the close
   * effect, not during render) so we don't violate React's no-ref-during-render
   * rule.
   */
  returnFocusTo?: React.RefObject<HTMLElement | null>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    // Capture the trigger ref once at open-time. The trigger button is
    // expected to remain mounted while the modal is open, so on close we
    // restore focus to it. (The lint rule `react-hooks/exhaustive-deps`
    // flags reading a ref during cleanup; capturing here satisfies it.)
    const capturedReturnFocus = returnFocusTo?.current ?? null;

    previouslyFocused.current =
      (document.activeElement as HTMLElement | null) ?? null;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      containerRef.current
        ? Array.from(
            containerRef.current.querySelectorAll<HTMLElement>(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
            ),
          ).filter((el) => !el.hasAttribute("disabled"))
        : [];

    queueMicrotask(() => {
      focusables()[0]?.focus();
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const els = focusables();
        if (els.length === 0) return;
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
      const fallback = previouslyFocused.current;
      const target = capturedReturnFocus ?? fallback;
      target?.focus?.();
    };
  }, [open, onClose, returnFocusTo]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
    >
      <div
        ref={containerRef}
        className="relative w-full max-w-md max-h-[95vh] overflow-y-auto"
      >
        {children}
      </div>
    </div>
  );
}
