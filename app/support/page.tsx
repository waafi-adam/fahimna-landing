import Link from "next/link";
import type { Metadata } from "next";

const BMC_URL = "https://buymeacoffee.com/fahimna";

export const metadata: Metadata = {
  title: "Support Fahimna",
  description:
    "Back the mission to help every Muslim understand the Quran. Support Fahimna and share in the ongoing reward of beneficial knowledge.",
};

function HeartIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function ArrowLeftIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>
  );
}

export default function SupportPage() {
  return (
    <>
      <main className="pb-32">
        {/* Header bar */}
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

        {/* Hero */}
        <section className="px-6 pt-12 pb-12 sm:pt-16 sm:pb-16">
          <div className="mx-auto max-w-2xl flex flex-col items-center text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-accent-bg flex items-center justify-center mb-5">
              <HeartIcon className="w-8 h-8 sm:w-10 sm:h-10 text-accent" />
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
              Support Fahimna
            </h1>
            <p className="mt-4 text-base sm:text-xl text-muted max-w-xl">
              Back the mission to help every Muslim finally understand the Quran — word by word, verse by verse.
            </p>
            <a
              href={BMC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 px-6 py-3 rounded-xl bg-foreground text-background font-semibold transition hover:opacity-90 inline-flex items-center gap-2"
            >
              <HeartIcon className="w-4 h-4" />
              Support on Buy Me a Coffee
            </a>
          </div>
        </section>

        {/* Why support */}
        <section className="px-6 py-16 sm:py-20 border-t border-border">
          <div className="mx-auto max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-accent mb-3 text-center">
              WHY SUPPORT FAHIMNA
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-8">
              Your support keeps Fahimna growing — with intention.
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-muted mb-4">
              Support means new features get built on a steady, planned roadmap instead of in stolen moments — and the app stays maintained as more Muslims rely on it.
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-muted">
              In the future, monthly supporters may unlock exclusive AI-powered features — comprehension checks, deeper analysis, conversational practice — things that cost real money to run for every user. The heart of Fahimna stays open to every Muslim, with a limited daily quota for everyone.
            </p>
          </div>
        </section>

        {/* Ongoing reward */}
        <section className="px-6 py-16 sm:py-20 border-t border-border">
          <div className="mx-auto max-w-2xl">
            <div className="p-8 sm:p-10 rounded-3xl bg-accent-bg">
              <p className="text-xs font-bold tracking-wider text-accent mb-4 text-center">
                YOUR ONGOING REWARD
              </p>
              <p
                className="text-3xl sm:text-4xl text-center mb-6 text-foreground"
                style={{ lineHeight: "1.6" }}
              >
                صَدَقَةٌ جَارِيَةٌ
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-muted mb-4">
                The Prophet ﷺ said: &ldquo;When a person dies, their deeds come to an end except for three — ongoing charity, knowledge that benefits others, or a righteous child who prays for them.&rdquo;
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-muted">
                Fahimna is knowledge that benefits others. Every Muslim who opens it and finally understands an ayah of the Quran — your support is woven into that. Your share of the reward keeps growing, long after this life.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6 py-16 sm:py-20 border-t border-border">
          <div className="mx-auto max-w-2xl flex flex-col items-center text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
              Ready to back Fahimna?
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-muted mb-8">
              Monthly or one-time — every contribution keeps the roadmap moving forward.
            </p>
            <a
              href={BMC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-foreground text-background font-semibold transition hover:opacity-90 inline-flex items-center gap-2"
            >
              <HeartIcon className="w-4 h-4" />
              Support on Buy Me a Coffee
            </a>
            <p className="mt-6 text-sm text-faint">JazakAllah khayran.</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-12 border-t border-border">
          <div className="mx-auto max-w-3xl flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted">
            <p>© {new Date().getFullYear()} Fahimna.</p>
            <Link href="/" className="hover:text-foreground transition">
              Back to Fahimna
            </Link>
          </div>
        </footer>
      </main>

      {/* Sticky bottom CTA — mobile only */}
      <div className="fixed bottom-0 left-0 right-0 px-4 pb-4 pt-3 bg-background border-t border-border sm:hidden">
        <a
          href={BMC_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 rounded-xl bg-foreground text-background font-semibold flex items-center justify-center gap-2"
        >
          <HeartIcon className="w-4 h-4" />
          Support on Buy Me a Coffee
        </a>
      </div>
    </>
  );
}
