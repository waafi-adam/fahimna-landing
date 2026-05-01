import Link from "next/link";
import type { Metadata } from "next";

const CONTACT_EMAIL = "abdullah.waafi@gmail.com";
const LAST_UPDATED = "May 1, 2026";

export const metadata: Metadata = {
  title: "Privacy Policy — Fahimna",
  description:
    "How Fahimna handles your data. We collect almost nothing, store almost everything on your device, and never sell your information.",
  robots: { index: true, follow: true },
};

function ArrowLeftIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>
  );
}

export default function PrivacyPage() {
  return (
    <main className="pb-24">
      <div className="px-6 pt-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Fahimna
          </Link>
        </div>
      </div>

      <article className="px-6 pt-10 pb-16">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="mt-3 text-sm text-faint">Last updated: {LAST_UPDATED}</p>

          <div className="mt-10 space-y-8 text-base leading-relaxed text-foreground">
            <section>
              <p className="text-muted">
                Fahimna is a Quran learning app. This policy explains what data the app handles, where it is stored, and the very limited information we receive. We do not sell your data, we do not run advertising, and we do not track you across other apps or websites.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Who we are</h2>
              <p className="text-muted">
                Fahimna (&ldquo;Fahimna&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is operated by Abdullah Waafi. You can reach us at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-foreground underline underline-offset-2 hover:opacity-80">
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Information stored on your device</h2>
              <p className="text-muted mb-4">
                Almost everything Fahimna remembers about you is stored only on your device. It never leaves your phone unless you explicitly send it to us (for example, by emailing support).
              </p>
              <ul className="space-y-2 text-muted list-disc pl-6">
                <li>An anonymous device identifier (a randomly generated UUID) created the first time you open the app.</li>
                <li>Your reading progress — which surahs and pages you&apos;ve viewed, your daily streak, and your spaced-repetition flashcard history.</li>
                <li>Words you&apos;ve marked as Learning or Known.</li>
                <li>Your settings — chosen translation language, reciter, theme, layout, and reader preferences.</li>
              </ul>
              <p className="text-muted mt-4">
                Uninstalling Fahimna deletes all of this from your device.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Information we receive (analytics)</h2>
              <p className="text-muted mb-4">
                To understand how the app is used and improve it, we use{" "}
                <a href="https://posthog.com/privacy" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2 hover:opacity-80">
                  PostHog
                </a>
                {" "}as our analytics provider. PostHog receives a small set of anonymous events such as:
              </p>
              <ul className="space-y-2 text-muted list-disc pl-6">
                <li>App opens and onboarding completion.</li>
                <li>Pages and surahs viewed (so we can see which content is reached most).</li>
                <li>Audio playback events (so we can see which reciters are popular).</li>
                <li>Settings changes (so we can understand which configurations users prefer).</li>
                <li>Crash and error reports.</li>
              </ul>
              <p className="text-muted mt-4">
                These events are tied to the anonymous device identifier described above. We do not collect your name, email, phone number, contacts, photos, location, advertising ID, or any data that could identify you personally. We do not track you across other apps or websites.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">No accounts, no login</h2>
              <p className="text-muted">
                Fahimna does not currently have user accounts or login. If we add optional accounts in the future, this policy will be updated and you will be asked before any data leaves your device.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Audio streaming</h2>
              <p className="text-muted">
                Reciter audio is streamed from public Quran audio sources. Your IP address is sent to those servers as part of any normal HTTP request, the same as visiting a website. Fahimna does not record which audio you stream beyond the anonymous &ldquo;audio played&rdquo; analytics event described above.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Sharing</h2>
              <p className="text-muted">
                We do not sell or rent any data. We do not share data with advertisers or data brokers. The only third party that receives any information about your use of the app is our analytics provider, PostHog, as described above.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Children</h2>
              <p className="text-muted">
                Fahimna is intended for users aged 13 and older. We do not knowingly collect information from children under 13. If you believe a child has used the app, please contact us and we will delete any associated analytics data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Your choices</h2>
              <ul className="space-y-2 text-muted list-disc pl-6">
                <li>To delete data stored on your device: uninstall the app.</li>
                <li>To request deletion of analytics data tied to your anonymous device ID: email us at{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-foreground underline underline-offset-2 hover:opacity-80">
                    {CONTACT_EMAIL}
                  </a>
                  . Find your anonymous ID in Settings, or just describe roughly when you started using the app.
                </li>
                <li>To stop sending analytics events: uninstall the app. (We may add an in-app analytics opt-out later.)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Security</h2>
              <p className="text-muted">
                Data on your device is stored in the standard local storage provided by your operating system. Analytics events are sent to PostHog over encrypted HTTPS connections.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Changes to this policy</h2>
              <p className="text-muted">
                If we update this policy we will change the &ldquo;Last updated&rdquo; date above. Material changes will be communicated in-app where reasonable.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Contact</h2>
              <p className="text-muted">
                Questions, requests, or anything else:{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-foreground underline underline-offset-2 hover:opacity-80">
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </article>

      <footer className="px-6 py-12 border-t border-border">
        <div className="mx-auto max-w-3xl flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted">
          <p>© {new Date().getFullYear()} Fahimna.</p>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-foreground transition">Terms</Link>
            <Link href="/" className="hover:text-foreground transition">Home</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
