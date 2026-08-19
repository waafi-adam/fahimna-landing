import Link from "next/link";
import type { Metadata } from "next";

const CONTACT_EMAIL = "support@fahimna.app";
const LAST_UPDATED = "August 10, 2026";

export const metadata: Metadata = {
  title: "Privacy Policy — Fahimna",
  description:
    "How Fahimna handles your data. We collect the minimum, never run ads, and never sell your information.",
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
                Fahimna is a Quran learning app. This policy explains what data the app handles, where it is stored, and the limited information we receive. We do not run advertising, we do not sell or rent your data, and we do not track you across other apps or websites.
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
                Fahimna works fully without an account, and everything it remembers about you lives on your device first:
              </p>
              <ul className="space-y-2 text-muted list-disc pl-6">
                <li>An anonymous device identifier (a randomly generated UUID) created the first time you open the app.</li>
                <li>Your learning progress — words you&apos;ve marked as Learning or Known, your spaced-repetition review history, daily streaks, and bookmarks.</li>
                <li>Your reading history — which surahs and pages you&apos;ve viewed.</li>
                <li>Your settings — chosen translation language, reciter, theme, layout, and reader preferences.</li>
              </ul>
              <p className="text-muted mt-4">
                If you never sign in, this data stays on your phone, and uninstalling Fahimna deletes it.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Optional accounts and sync</h2>
              <p className="text-muted mb-4">
                You can create an optional account to back up your progress and use Fahimna across devices. Accounts work with your email address and a one-time code — there is no password for us to store. Your email address is the only identifying information we collect.
              </p>
              <p className="text-muted">
                When you are signed in, the learning data described above (word statuses, reviews, streaks, bookmarks, and settings) is synced to our servers, hosted by{" "}
                <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2 hover:opacity-80">
                  Supabase
                </a>
                , so it can follow you to a new phone. This data is used only to provide sync — nothing else.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Information we receive (analytics)</h2>
              <p className="text-muted mb-4">
                To understand how the app is used and improve it, we use{" "}
                <a href="https://posthog.com/privacy" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2 hover:opacity-80">
                  PostHog
                </a>
                {" "}as our analytics provider. PostHog receives a small set of usage events such as:
              </p>
              <ul className="space-y-2 text-muted list-disc pl-6">
                <li>App opens and onboarding completion.</li>
                <li>Pages and surahs viewed (so we can see which content is reached most).</li>
                <li>Audio playback events (so we can see which reciters are popular).</li>
                <li>Feature-usage events, such as reaching the free-word limit or viewing the Premium screen.</li>
                <li>Settings changes and crash or error reports.</li>
              </ul>
              <p className="text-muted mt-4">
                These events are tied to the anonymous device identifier described above, and to your account ID if you are signed in. We do not collect your name, phone number, contacts, photos, location, or advertising ID, and we do not track you across other apps or websites. To say it plainly: there are no ads in Fahimna, and your data is never sold.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Payments</h2>
              <p className="text-muted mb-4">
                Fahimna Premium purchases and subscriptions are processed entirely by the Apple App Store or Google Play. We never see or store your card details or billing address — payment happens inside your store account.
              </p>
              <p className="text-muted">
                Our payment partner{" "}
                <a href="https://www.revenuecat.com/privacy" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2 hover:opacity-80">
                  RevenueCat
                </a>
                {" "}processes purchase receipts on our behalf so the app knows which features your purchase unlocks, on every device you sign in to.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Financial-assistance requests</h2>
              <p className="text-muted">
                If you request free access because you cannot afford Premium, the short reason you write is stored with your account. It is used only to administer the assistance program, is never published, and is never used for anything else.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Transactional email</h2>
              <p className="text-muted">
                One-time login codes are delivered to your email address through our email provider,{" "}
                <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-2 hover:opacity-80">
                  Resend
                </a>
                . We do not send marketing email.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Audio streaming</h2>
              <p className="text-muted">
                Reciter audio is streamed from public Quran audio sources. Your IP address is sent to those servers as part of any normal HTTP request, the same as visiting a website. Fahimna does not record which audio you stream beyond the &ldquo;audio played&rdquo; analytics event described above.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Sharing</h2>
              <p className="text-muted">
                We do not sell or rent any data, and we do not share data with advertisers or data brokers. The only third parties that process data on our behalf are the service providers named above — Supabase (accounts and sync), PostHog (analytics), RevenueCat (purchase receipts), and Resend (login-code email) — plus Apple and Google for payments, each only for the purpose described.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Children</h2>
              <p className="text-muted">
                Fahimna is intended for users aged 13 and older. We do not knowingly collect information from children under 13. If you believe a child has used the app, please contact us and we will delete any associated data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Deleting your data</h2>
              <ul className="space-y-2 text-muted list-disc pl-6">
                <li>
                  To delete your account and all synced data: in the app, go to <span className="text-foreground">Settings → Data → Delete account</span>. This permanently removes your account and everything associated with it from our servers.
                </li>
                <li>
                  You can also request deletion — of your account, or of analytics data tied to your anonymous device ID — by emailing{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-foreground underline underline-offset-2 hover:opacity-80">
                    {CONTACT_EMAIL}
                  </a>
                  .
                </li>
                <li>To delete data stored only on your device: uninstall the app.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Security</h2>
              <p className="text-muted">
                Data on your device is stored in the standard local storage provided by your operating system. Synced data and analytics events travel over encrypted HTTPS connections, and server-side data is protected by per-account access rules — your synced data is readable only by your account.
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
            <Link href="/credits" className="hover:text-foreground transition">Credits</Link>
            <Link href="/" className="hover:text-foreground transition">Home</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
