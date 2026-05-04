import type { ReactNode } from "react";

const FRAME_CLASS =
  "rounded-[2.5rem] overflow-hidden border border-border bg-card shadow-2xl dark:shadow-[0_0_80px_-10px_rgba(129,140,248,0.45),0_0_30px_-10px_rgba(129,140,248,0.3)]";

export function PhoneFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className={FRAME_CLASS}>{children}</div>
    </div>
  );
}

export { FRAME_CLASS };
