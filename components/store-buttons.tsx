// The one place the store status lives. iOS is on the App Store (1.0.2,
// released 2026-09-01); Android is built and in release prep, not yet listed
// on Google Play — so it gets an honest "coming soon" pill, never a dead link.
// The ayah share pages import the same URL so a change here changes everywhere.

export const APP_STORE_URL = "https://apps.apple.com/app/id6767471815";

function AppleLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z" />
    </svg>
  );
}

function AndroidLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85a.637.637 0 0 0-.83.22l-1.88 3.24a11.43 11.43 0 0 0-8.94 0L5.65 5.67a.643.643 0 0 0-.87-.2c-.28.18-.37.54-.22.83L6.4 9.48A10.81 10.81 0 0 0 1 18h22a10.81 10.81 0 0 0-5.4-8.52zM7 15.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm10 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" />
    </svg>
  );
}

/**
 * The App Store badge as a real link, and Android as a non-interactive
 * "coming soon" pill beside it — so nobody taps a button that goes nowhere.
 * `align` follows the hero: centered on small screens, left on large.
 */
export function StoreButtons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col sm:flex-row items-center gap-3 ${className}`}>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 pl-4 pr-5 py-2.5 rounded-xl bg-foreground text-background hover:opacity-90 transition"
      >
        <AppleLogo className="w-7 h-7 -mt-0.5" />
        <span className="flex flex-col leading-none text-left">
          <span className="text-[11px] font-medium opacity-80">Download on the</span>
          <span className="text-lg font-semibold tracking-tight">App Store</span>
        </span>
      </a>
      <div
        className="inline-flex items-center gap-3 pl-4 pr-5 py-2.5 rounded-xl border border-border bg-card text-muted"
        aria-label="Android version coming soon to Google Play"
      >
        <AndroidLogo className="w-7 h-7" />
        <span className="flex flex-col leading-none text-left">
          <span className="text-[11px] font-medium opacity-80">Coming soon on</span>
          <span className="text-lg font-semibold tracking-tight">Google Play</span>
        </span>
      </div>
    </div>
  );
}
