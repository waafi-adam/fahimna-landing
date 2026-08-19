import Link from "next/link";
import type { Metadata } from "next";

const CONTACT_EMAIL = "support@fahimna.app";
const LAST_UPDATED = "August 19, 2026";

export const metadata: Metadata = {
  title: "Sources & Credits — Fahimna",
  description:
    "Every Quran text, translation, tafsir, grammar dataset and recitation in Fahimna, and where each one comes from.",
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

function Source({
  title,
  source,
  license,
  children,
}: {
  title: string;
  source: string;
  license?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="border-t border-black/5 dark:border-white/10 pt-5">
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted">{source}</p>
      {license ? (
        <p className="mt-1 text-sm text-faint">{license}</p>
      ) : null}
      {children ? <div className="mt-2 text-sm text-muted">{children}</div> : null}
    </div>
  );
}

export default function CreditsPage() {
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
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Sources &amp; Credits</h1>
          <p className="mt-3 text-sm text-faint">Last updated: {LAST_UPDATED}</p>

          <div className="mt-10 space-y-8 text-base leading-relaxed text-foreground">
            <section>
              <p className="text-muted">
                Fahimna is built on the work of many scholars, institutions, reciters and open
                projects. The Quran itself belongs to no one but Allah; everything else here has an
                author, and this page names them. If you hold rights to any material listed below and
                would like it credited differently, corrected, or removed, please write to us at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-foreground underline underline-offset-2 hover:opacity-80">
                  {CONTACT_EMAIL}
                </a>{" "}
                — we will act promptly.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Quran text</h2>
              <div className="space-y-5">
                <Source
                  title="Uthmanic Hafs mushaf text"
                  source="King Fahd Glorious Quran Printing Complex (KFGQPC), Madinah — QPC Hafs digital encoding."
                />
                <Source
                  title="KFGQPC Uthmanic Hafs typeface"
                  source="King Fahd Glorious Quran Printing Complex, provided for Quranic use."
                />
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Translations &amp; tafsir</h2>
              <p className="text-muted mb-5">
                Fahimna offers a library of Quran translations and tafsir works, compiled from the
                Quranic Universal Library (QUL, qul.tarteel.ai). Each work remains the property of its
                translator, author or publisher, and is presented unmodified and in full. Among them:
              </p>
              <div className="space-y-5">
                <Source
                  title="Saheeh International"
                  source="Al-Muntada Al-Islami Trust / Dar Abul-Qasim."
                />
                <Source
                  title="The Noble Quran"
                  source="Dr. Muhammad Taqi-ud-Din al-Hilali &amp; Dr. Muhammad Muhsin Khan — King Fahd Complex."
                />
                <Source
                  title="Al-Mukhtasar fi Tafsir al-Quran al-Karim"
                  source="Tafsir Center for Quranic Studies (markazTafsir), in its many language editions."
                />
                <Source
                  title="Indonesian translation"
                  source="Ministry of Religious Affairs of the Republic of Indonesia (Kemenag), and King Fahd Complex."
                />
                <Source
                  title="Classical tafsir"
                  source="Ibn Kathir, al-Tabari, al-Qurtubi, al-Jalalayn, al-Baydawi, al-Razi, al-Alusi, al-Sa'di and others, in the public domain."
                />
                <Source
                  title="Other translations"
                  source="Yusuf Ali, Pickthall, Shakir, Arberry, Abdul Haleem, Muhammad Asad, Mufti Taqi Usmani, Abul A'la Maududi, Fadel Soliman (Bridges), Fateh Muhammad Jalandhry, and many more across 20+ languages."
                />
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Grammar &amp; language data</h2>
              <div className="space-y-5">
                <Source
                  title="Morphological analysis"
                  source="NoorBayan / Quranic (MASAQ) dataset — github.com/NoorBayan/Quranic"
                  license="Licensed under the MIT License."
                />
                <Source
                  title="Verb meanings"
                  source="The Quranic Arabic Corpus — corpus.quran.com, by Kais Dukes."
                  license="Attribution given as required by its license; the data is presented with our own formatting."
                />
                <Source
                  title="I'raab (grammatical analysis)"
                  source="Al-I'raab al-Muyassar, with supplementary readings from I'raab al-Quran by Muhyi al-Din al-Darwish and by Ahmad Ubayd al-Da'as."
                />
                <Source
                  title="Conjugation tables &amp; noun paradigms"
                  source="Generated by Fahimna using large language models, then reviewed against classical Arabic morphology references."
                />
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Recitations</h2>
              <p className="text-muted mb-5">
                Audio recitations are used with gratitude to the reciters and the projects that make
                them freely available for the sake of Allah. Word-timing data is compiled from the
                Quranic Universal Library.
              </p>
              <div className="space-y-5">
                <Source
                  title="Reciters"
                  source="Abdul Basit Abdul Samad, Mahmoud Khalil Al-Husary, Abdur-Rahman as-Sudais, Abu Bakr al-Shatri, Ahmad Alnufais, Hani ar-Rifai, Khalifa Al-Tunaiji, Maher Al-Muaiqly, Mishari Rashid al-Afasy, Mohamed al-Tablawi, Muhammad Siddiq al-Minshawi, Saad al-Ghamdi, Saud Al-Shuraim, Yasser al-Dosari."
                />
                <Source
                  title="Audio sources"
                  source="EveryAyah, QuranicAudio, and the Quranic Universal Library."
                />
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">A note on rights</h2>
              <p className="text-muted">
                Fahimna does not sell the Quran. Reading it, listening to it, and its translations,
                tafsir and grammar are free in the app and always will be. Where a work is offered
                under an open licence, we follow its terms. Where a work belongs to a publisher, we
                present it unmodified, with credit, and we remove anything on request from those who
                hold the right to ask.
              </p>
            </section>
          </div>
        </div>
      </article>

      <footer className="px-6 py-12 border-t border-border">
        <div className="mx-auto max-w-3xl flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted">
          <p>&copy; {new Date().getFullYear()} Fahimna.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground transition">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition">Terms</Link>
            <Link href="/" className="hover:text-foreground transition">Home</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
