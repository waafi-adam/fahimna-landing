import type { Metadata } from "next";
import { Geist } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Same Mushaf-style Arabic the mobile app uses (assets/fonts/UthmanicHafs_V22).
const uthmanicHafs = localFont({
  src: "./fonts/UthmanicHafs.ttf",
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fahimna.app"),
  title: "Fahimna — Understand the Quran, word by word",
  description:
    "Fahimna is Arabic for “we understood.” A Quran learning app with word-by-word translation, multiple reading layouts, and spaced-repetition flashcards.",
  keywords: [
    "Quran",
    "learn Arabic",
    "understand Quran",
    "Quran translation",
    "Quran word by word",
    "Quran app",
    "Islamic learning",
    "Quran flashcards",
    "tafsir",
  ],
  openGraph: {
    title: "Fahimna — Understand the Quran, word by word",
    description:
      "A Quran learning app with word-by-word translation, multiple reading layouts, and spaced-repetition flashcards.",
    url: "https://fahimna.app",
    siteName: "Fahimna",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fahimna",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fahimna — Understand the Quran, word by word",
    description:
      "A Quran learning app with word-by-word translation, multiple reading layouts, and spaced-repetition flashcards.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${uthmanicHafs.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
