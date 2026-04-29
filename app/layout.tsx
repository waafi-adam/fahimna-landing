import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fahimna.com"),
  title: "Fahimna — Understand the Quran, word by word",
  description:
    "Fahimna is Arabic for “we understood.” A free Quran learning app with word-by-word translation, multiple reading layouts, and spaced-repetition flashcards. Free, forever, no paywalls.",
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
      "A free Quran learning app with word-by-word translation, multiple reading layouts, and spaced-repetition flashcards. Free, forever, no paywalls.",
    url: "https://fahimna.com",
    siteName: "Fahimna",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fahimna — Understand the Quran, word by word",
    description:
      "A free Quran learning app with word-by-word translation, multiple reading layouts, and spaced-repetition flashcards.",
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
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
