import Image from "next/image";
import Link from "next/link";
import { WaitlistForm } from "@/components/waitlist-form";
import { HeroDemoWithModal } from "@/components/demo/hero-demo";

type Feature = {
  title: string;
  body: string;
  light?: string;
  dark?: string;
  alt: string;
};

const FEATURES: Feature[] = [
  {
    title: "Word-by-word, in context",
    body: "Tap any word to see its meaning. Build understanding atom by atom — not by translating whole verses and hoping it sticks.",
    light: "/screenshots/reading-wbw-light.jpg",
    dark: "/screenshots/reading-wbw-dark.jpg",
    alt: "Word-by-word reading of Surah Al-Baqarah with each Arabic word translated underneath",
  },
  {
    title: "Deep word analysis",
    body: "Every word: root, pattern, gender, person, part of speech. Understand the grammar, not just the gloss.",
    light: "/screenshots/word-detail-light.jpg",
    dark: "/screenshots/word-detail-dark.jpg",
    alt: "Word detail sheet showing al-raḥīmi with morphology, part of speech, gender, number, case and state",
  },
  {
    title: "Tafsir, translation & i'rab",
    body: "Sahih International translation alongside classical tafsir, plus full grammatical analysis for every ayah.",
    light: "/screenshots/ayah-grammar-light.jpg",
    dark: "/screenshots/ayah-grammar-dark.jpg",
    alt: "Grammar / iʿrab analysis for the bismillah in Al-Fatihah 1:1",
  },
  {
    title: "Flashcards that stick",
    body: "Mark words you're learning. Fahimna brings them back at the right interval with FSRS spaced repetition — vocabulary becomes part of you.",
    light: "/screenshots/flashcard-question-light.jpg",
    dark: "/screenshots/flashcard-question-dark.jpg",
    alt: "Flashcard asking what a word family means with a Show Answer button",
  },
];

const ROADMAP = [
  { title: "Accounts & cloud sync", body: "Optional login with Apple or Google — pick up your progress on any device." },
  { title: "More reciters & audio downloads", body: "Listen offline, choose your favorite voice." },
  { title: "Expanded tafsir & translations", body: "Deeper context, more languages." },
  { title: "Smarter review schedules", body: "Tune the spaced repetition to your pace." },
  { title: "AI comprehension checks", body: "Speak or type the meaning — verifies you grasp ayahs in context, not just vocab." },
  { title: "iPad & web companion", body: "Read on the big screen too." },
];

function HeartIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

const FRAME_CLASS =
  "rounded-[2.5rem] overflow-hidden border border-border bg-card shadow-2xl dark:shadow-[0_0_80px_-10px_rgba(129,140,248,0.45),0_0_30px_-10px_rgba(129,140,248,0.3)]";

function PhoneScreenshot({
  light,
  dark,
  alt,
  className = "",
}: {
  light?: string;
  dark?: string;
  alt: string;
  className?: string;
}) {
  if (light && dark) {
    return (
      <div className={className}>
        <div className={`${FRAME_CLASS} block dark:hidden`}>
          <Image
            src={light}
            alt={alt}
            width={1080}
            height={2400}
            className="w-full h-auto block"
          />
        </div>
        <div className={`${FRAME_CLASS} hidden dark:block`}>
          <Image
            src={dark}
            alt={alt}
            width={1080}
            height={2400}
            className="w-full h-auto block"
          />
        </div>
      </div>
    );
  }

  const src = (light ?? dark)!;
  return (
    <div className={`${FRAME_CLASS} ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={1080}
        height={2400}
        className="w-full h-auto block"
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <main className="pb-32">
        {/* Hero */}
        <section className="px-6 pt-16 pb-12 sm:pt-24 sm:pb-20">
          <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Copy */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <Image
                src="/fahimna-logo.svg"
                alt="Fahimna"
                width={80}
                height={80}
                priority
                className="w-16 h-16 sm:w-20 sm:h-20 mb-5"
              />
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
                Fahimna
              </h1>
              <p className="mt-3 text-base sm:text-xl text-muted max-w-xl">
                Finally understand the Quran — word by word, verse by verse.
              </p>
              <div className="mt-7 w-full max-w-md">
                <WaitlistForm />
                <p className="mt-5 text-sm text-muted">
                  Already love what we&apos;re building?{" "}
                  <Link
                    href="/support"
                    className="text-foreground font-semibold underline underline-offset-2 hover:opacity-80"
                  >
                    Support Fahimna →
                  </Link>
                </p>
              </div>
            </div>

            {/* Hero — interactive demo (replaces static screenshot) */}
            <div className="flex justify-center lg:justify-end">
              <HeroDemoWithModal className="w-full max-w-[300px] sm:max-w-[340px]" />
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="px-6 py-16 sm:py-20 border-t border-border">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold tracking-wider text-faint mb-6">
              THE MISSION
            </p>
            <p className="text-xl sm:text-2xl leading-relaxed text-foreground">
              Too many of us have become{" "}
              <span className="font-semibold">tourists to our own religion</span>{" "}
              — reciting without understanding, following without connecting.
            </p>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted">
              Islam is meant to be guidance. That only works when we understand what we&apos;re reading. Fahimna is built so any Muslim — anywhere, regardless of background — can finally read the Quran and understand it.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="px-6 py-16 sm:py-24 border-t border-border">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-semibold tracking-wider text-faint mb-3 text-center">
              WHAT FAHIMNA DOES
            </p>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-center mb-14">
              Understand what you&apos;ve been reciting.
            </h2>
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="p-6 sm:p-8 rounded-3xl border border-border bg-card flex flex-col items-center gap-6"
                >
                  <PhoneScreenshot
                    light={f.light}
                    dark={f.dark}
                    alt={f.alt}
                    className="w-full max-w-[240px]"
                  />
                  <div className="text-center">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">
                      {f.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted leading-relaxed">
                      {f.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Progress / Dashboard */}
        <section className="px-6 py-16 sm:py-24 border-t border-border">
          <div className="mx-auto max-w-5xl grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="flex justify-center order-last lg:order-first">
              <PhoneScreenshot
                light="/screenshots/dashboard-light.jpg"
                dark="/screenshots/dashboard-dark.jpg"
                alt="Fahimna dashboard showing 39,077 known words, 1-day streak, daily goal progress and weekly activity chart"
                className="w-full max-w-[260px]"
              />
            </div>
            <div className="text-center lg:text-left">
              <p className="text-xs font-semibold tracking-wider text-faint mb-3">
                YOUR JOURNEY
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                See yourself through the Quran.
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-muted mb-3">
                Watch your progress through 77,000+ Quranic words fill in as you mark them learning or known.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-muted">
                Daily goals. Streaks. A clear picture of how much of the Book of Allah you can already read with understanding.
              </p>
            </div>
          </div>
        </section>

        {/* Library / Bookmarks */}
        <section className="px-6 py-16 sm:py-24 border-t border-border">
          <div className="mx-auto max-w-5xl grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <p className="text-xs font-semibold tracking-wider text-faint mb-3">
                YOUR LIBRARY
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                Pick up where you left off.
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-muted mb-3">
                Recently read pages, page bookmarks, ayah bookmarks — all one tap away. Browse by surah, juz, or the spots you&apos;ve marked.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-muted">
                Your reading is yours. Pick it up the moment you open the app.
              </p>
            </div>
            <div className="flex justify-center">
              <PhoneScreenshot
                light="/screenshots/home-bookmarks-light.jpg"
                dark="/screenshots/home-bookmarks-dark.jpg"
                alt="Fahimna home screen showing recently read pages and saved bookmarks"
                className="w-full max-w-[260px]"
              />
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="px-6 py-16 sm:py-20 border-t border-border">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold tracking-wider text-faint mb-3 text-center">
              ON THE ROADMAP
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-12">
              What&apos;s coming next.
            </h2>
            <ul className="space-y-3">
              {ROADMAP.map((item) => (
                <li
                  key={item.title}
                  className="p-5 rounded-2xl border border-border bg-card"
                >
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted mt-1">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-12 border-t border-border">
          <div className="mx-auto max-w-3xl flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted">
            <p>© {new Date().getFullYear()} Fahimna. JazakAllah khayran.</p>
            <div className="flex gap-6">
              <Link href="/credits" className="hover:text-foreground transition">
                Sources &amp; Credits
              </Link>
              <Link href="/support" className="hover:text-foreground transition">
                Support Fahimna
              </Link>
            </div>
          </div>
        </footer>
      </main>

      {/* Sticky bottom CTA — mobile only */}
      <div className="fixed bottom-0 left-0 right-0 px-4 pb-4 pt-3 bg-background border-t border-border sm:hidden flex gap-2">
        <a
          href="#top"
          className="flex-1 py-3 rounded-xl bg-foreground text-background font-semibold flex items-center justify-center text-sm"
        >
          Notify me
        </a>
        <Link
          href="/support"
          className="flex-1 py-3 rounded-xl border border-border bg-card text-foreground font-semibold flex items-center justify-center gap-2 text-sm"
        >
          <HeartIcon className="w-4 h-4" />
          Support
        </Link>
      </div>
    </>
  );
}
