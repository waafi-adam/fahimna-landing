import Link from "next/link";
import type { Metadata } from "next";

const CONTACT_EMAIL = "support@fahimna.app";
const LAST_UPDATED = "August 10, 2026";

export const metadata: Metadata = {
  title: "Terms of Service — Fahimna",
  description:
    "The terms under which you may use the Fahimna Quran learning app.",
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

export default function TermsPage() {
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
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Terms of Service</h1>
          <p className="mt-3 text-sm text-faint">Last updated: {LAST_UPDATED}</p>

          <div className="mt-10 space-y-8 text-base leading-relaxed text-foreground">
            <section>
              <p className="text-muted">
                These terms govern your use of the Fahimna mobile app and related websites (together, &ldquo;Fahimna&rdquo; or the &ldquo;Service&rdquo;). By installing or using Fahimna, you agree to these terms. If you do not agree, please do not use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Who we are</h2>
              <p className="text-muted">
                Fahimna is operated by Abdullah Waafi. Contact:{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-foreground underline underline-offset-2 hover:opacity-80">
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">The Service and the free tier</h2>
              <p className="text-muted mb-4">
                Fahimna is provided for personal, non-commercial use to help you read and understand the Quran. Reading the Quran, listening to recitation, translations, tafsir, and word-by-word grammar are free, and we intend to keep them free. The free tier also includes marking your first 50 words (counted by dictionary word, or &ldquo;lemma&rdquo;) as Learning or Known; Fahimna Premium removes that limit.
              </p>
              <p className="text-muted">
                You agree not to misuse the Service — including reverse engineering it for the purpose of redistributing it, attempting to disrupt our infrastructure, or using it to harass or harm others.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Eligibility</h2>
              <p className="text-muted">
                Fahimna is intended for users aged 13 and older. By using the Service, you confirm that you meet this age requirement, or that a parent or guardian has consented to your use.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Accounts</h2>
              <p className="text-muted">
                Accounts are optional and are used to sync your progress across devices and to manage Premium. Sign-in works with a one-time code sent to your email, so you are responsible for keeping access to your email account secure. We may suspend or terminate accounts that abuse the Service. You can delete your account at any time in the app (Settings → Data → Delete account).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Fahimna Premium</h2>
              <p className="text-muted mb-4">
                Fahimna Premium is available as a monthly or yearly auto-renewing subscription, or as a one-time lifetime purchase. All payments are billed through your Apple App Store or Google Play account — never directly by us. There is no separate free trial: the free tier described above is available to everyone, indefinitely, without payment details.
              </p>
              <ul className="space-y-2 text-muted list-disc pl-6">
                <li>Subscriptions renew automatically unless cancelled at least 24 hours before the end of the current period.</li>
                <li>You can manage or cancel a subscription any time in your App Store or Google Play account settings; cancelling stops future renewals and Premium remains active until the period ends.</li>
                <li>Refunds are handled by Apple and Google under their own policies — we cannot issue refunds directly.</li>
                <li>Prices vary by country and are always shown in the store before you confirm a purchase.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Financial assistance</h2>
              <p className="text-muted">
                If you cannot afford Premium, you may request free access from within the app. Granted access lasts for a year at our discretion and may be renewed. The program exists so that money is never what stands between anyone and learning the Quran; abuse of it may lead to revocation.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Content</h2>
              <p className="text-muted mb-4">
                The Quran text included in Fahimna is the word of Allah and is not subject to copyright — the Quran itself is not sold, and core reading features remain free. Translations, tafsir, audio recitations, and other supplementary content belong to their respective rights holders and are used under the terms of their sources or licenses, for your personal use; credit is given in-app where applicable.
              </p>
              <p className="text-muted">
                The Fahimna name, logo, app design, code, and original explanatory text are owned by us. You may not copy, redistribute, or sell them without permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Disclaimer</h2>
              <p className="text-muted">
                Fahimna is provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without warranties of any kind, express or implied. While we make a sincere effort to present the Quran and its translations accurately, we cannot guarantee freedom from errors. For matters of religious ruling, please consult a qualified scholar.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Limitation of liability</h2>
              <p className="text-muted">
                To the fullest extent permitted by law, we will not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Termination</h2>
              <p className="text-muted">
                You may stop using Fahimna at any time by uninstalling the app, and you may delete your account in the app&apos;s settings. We may suspend or end the Service, in whole or in part, at any time; active subscriptions remain governed by your store&apos;s policies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Changes to these terms</h2>
              <p className="text-muted">
                We may update these terms from time to time. The &ldquo;Last updated&rdquo; date will reflect any changes. Continued use of the Service after a change means you accept the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Privacy</h2>
              <p className="text-muted">
                Your use of Fahimna is also governed by our{" "}
                <Link href="/privacy" className="text-foreground underline underline-offset-2 hover:opacity-80">
                  Privacy Policy
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Contact</h2>
              <p className="text-muted">
                Questions about these terms:{" "}
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
            <Link href="/privacy" className="hover:text-foreground transition">Privacy</Link>
            <Link href="/" className="hover:text-foreground transition">Home</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
