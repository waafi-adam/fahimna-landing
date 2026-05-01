import Link from "next/link";
import type { Metadata } from "next";

const CONTACT_EMAIL = "abdullah.waafi@gmail.com";
const LAST_UPDATED = "May 1, 2026";

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
              <h2 className="text-xl font-semibold mb-3">Use of the Service</h2>
              <p className="text-muted">
                Fahimna is provided for personal, non-commercial use to help you read and understand the Quran. You agree not to misuse the Service — including reverse engineering it for the purpose of redistributing it, attempting to disrupt our infrastructure, or using it to harass or harm others.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Eligibility</h2>
              <p className="text-muted">
                Fahimna is intended for users aged 13 and older. By using the Service, you confirm that you meet this age requirement, or that a parent or guardian has consented to your use.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Content</h2>
              <p className="text-muted mb-4">
                The Quran text included in Fahimna is the word of Allah and is not subject to copyright. Translations, tafsir, audio recitations, and other supplementary content are used under the terms of their respective sources or licenses; credit is given in-app where applicable.
              </p>
              <p className="text-muted">
                The Fahimna name, logo, app design, code, and original explanatory text are owned by us. You may not copy, redistribute, or sell them without permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">No accounts, no payments</h2>
              <p className="text-muted">
                Fahimna does not currently require an account or charge for use. If we add paid features in the future, those will be governed by additional terms presented at the time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Donations</h2>
              <p className="text-muted">
                Donations made via Buy Me a Coffee are voluntary. They support development and do not entitle you to any specific feature or service.
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
                You may stop using Fahimna at any time by uninstalling the app. We may suspend or end the Service, in whole or in part, at any time.
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
