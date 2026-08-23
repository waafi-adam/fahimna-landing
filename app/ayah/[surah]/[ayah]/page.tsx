import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const API = "https://api.quran.com/api/v4";
const SAHEEH_INTERNATIONAL = 131;
const MAX_RANGE = 20;
const APP_STORE_URL = "https://apps.apple.com/app/id6767471815";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.fahimna.quran";

type Params = { surah: string; ayah: string };
type Search = { to?: string | string[] };

type Verse = {
  key: string;
  number: number;
  arabic: string;
  translation: string;
};

type Chapter = {
  nameSimple: string;
  nameArabic: string;
  versesCount: number;
};

function parseInt10(value: string | undefined): number | null {
  if (!value || !/^\d{1,4}$/.test(value)) return null;
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : null;
}

/** Validates the route. Returns null when the URL is malformed. */
function parseRef(params: Params, search: Search) {
  const surah = parseInt10(params.surah);
  const from = parseInt10(params.ayah);
  if (surah === null || from === null || surah < 1 || surah > 114) return null;

  const toRaw = Array.isArray(search.to) ? search.to[0] : search.to;
  let to = from;
  if (toRaw !== undefined) {
    const parsed = parseInt10(toRaw);
    if (parsed === null || parsed < from) return null;
    to = Math.min(parsed, from + MAX_RANGE - 1);
  }
  return { surah, from, to };
}

/** Strips HTML footnote markers (<sup foot_note=...>1</sup>) Quran.com embeds in translations. */
function stripHtml(html: string): string {
  return html
    .replace(/<sup[^>]*>.*?<\/sup>/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function fetchChapter(surah: number): Promise<Chapter | null> {
  const data = await fetchJson<{
    chapter?: { name_simple: string; name_arabic: string; verses_count: number };
  }>(`${API}/chapters/${surah}`);
  if (!data?.chapter) return null;
  return {
    nameSimple: data.chapter.name_simple,
    nameArabic: data.chapter.name_arabic,
    versesCount: data.chapter.verses_count,
  };
}

async function fetchVerse(surah: number, n: number): Promise<Verse | null> {
  const data = await fetchJson<{
    verse?: {
      verse_key: string;
      verse_number: number;
      text_uthmani?: string;
      translations?: { text: string }[];
    };
  }>(
    `${API}/verses/by_key/${surah}:${n}?fields=text_uthmani&translations=${SAHEEH_INTERNATIONAL}`,
  );
  const v = data?.verse;
  if (!v?.text_uthmani) return null;
  return {
    key: v.verse_key,
    number: v.verse_number,
    arabic: v.text_uthmani,
    translation: stripHtml(v.translations?.[0]?.text ?? ""),
  };
}

/** Resolves the whole page's data, or null if anything is invalid/unreachable. */
async function loadPage(params: Params, search: Search) {
  const ref = parseRef(params, search);
  if (!ref) return null;

  const chapter = await fetchChapter(ref.surah);
  if (!chapter) return null;
  if (ref.from > chapter.versesCount) return null;
  const to = Math.min(ref.to, chapter.versesCount);

  const numbers = Array.from({ length: to - ref.from + 1 }, (_, i) => ref.from + i);
  const verses = await Promise.all(numbers.map((n) => fetchVerse(ref.surah, n)));
  if (verses.some((v) => v === null)) return null;

  const reference =
    ref.from === to ? `${ref.surah}:${ref.from}` : `${ref.surah}:${ref.from}–${to}`;

  return { ...ref, to, chapter, verses: verses as Verse[], reference };
}

type PageProps = {
  params: Promise<Params>;
  searchParams: Promise<Search>;
};

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const data = await loadPage(await params, await searchParams);
  if (!data) return { title: "Ayah not found — Fahimna Quran" };

  const title = `${data.chapter.nameSimple} ${data.reference} — Fahimna Quran`;
  const full = data.verses.map((v) => v.translation).join(" ");
  const description = full.length > 150 ? `${full.slice(0, 150).trimEnd()}…` : full;
  const path = `/ayah/${data.surah}/${data.from}${data.to !== data.from ? `?to=${data.to}` : ""}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: "Fahimna", type: "article" },
    twitter: { card: "summary", title, description },
  };
}

function ArrowLeftIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>
  );
}

export default async function AyahPage({ params, searchParams }: PageProps) {
  const data = await loadPage(await params, await searchParams);
  if (!data) notFound();

  const { chapter, verses, reference, surah, from } = data;
  const deepLink = `fahimna://ayah/${surah}/${from}`;

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
          <p className="font-arabic text-2xl text-muted" dir="rtl" lang="ar">
            {chapter.nameArabic}
          </p>
          <h1 className="mt-1 text-3xl sm:text-4xl font-bold tracking-tight">
            {chapter.nameSimple}{" "}
            <span className="text-muted font-normal">{reference}</span>
          </h1>

          <div className="mt-10 space-y-12">
            {verses.map((v) => (
              <section key={v.key} aria-label={`Ayah ${v.key}`}>
                <p
                  dir="rtl"
                  lang="ar"
                  className="font-arabic text-3xl sm:text-4xl leading-[2] text-foreground"
                >
                  {v.arabic}
                  <span className="text-faint text-2xl mx-2">﴿{v.number}﴾</span>
                </p>
                <p className="mt-6 text-lg leading-relaxed text-foreground">{v.translation}</p>
                <p className="mt-2 text-sm text-faint">— Saheeh International</p>
              </section>
            ))}
          </div>

          <aside className="mt-16 rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="text-xl font-semibold">
              Read {verses.length === 1 ? "this ayah" : "these ayahs"} word by word in Fahimna Quran
            </h2>
            <p className="mt-2 text-muted">
              Tap any word for its meaning, root, and grammar — and save the ones you&apos;re learning.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={deepLink}
                className="flex-1 py-3 px-5 rounded-xl bg-foreground text-background font-semibold flex items-center justify-center text-sm hover:opacity-90 transition"
              >
                Open in app
              </a>
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-5 rounded-xl border border-border font-semibold flex items-center justify-center text-sm hover:bg-background transition"
              >
                App Store
              </a>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-5 rounded-xl border border-border font-semibold flex items-center justify-center text-sm hover:bg-background transition"
              >
                Google Play
              </a>
            </div>
          </aside>
        </div>
      </article>

      <footer className="px-6 py-12 border-t border-border">
        <div className="mx-auto max-w-3xl flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted">
          <p>© {new Date().getFullYear()} Fahimna.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground transition">Privacy</Link>
            <Link href="/credits" className="hover:text-foreground transition">Credits</Link>
            <Link href="/" className="hover:text-foreground transition">Home</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
