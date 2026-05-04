export type WordStatus = "new" | "learning" | "known";

export type FatihaWord = {
  ar: string;
  en: string;
};

// Bismillah — Al-Fatihah 1:1, in right-to-left reading order.
export const FATIHA_WORDS: FatihaWord[] = [
  { ar: "بِسۡمِ", en: "In (the) name" },
  { ar: "ٱللَّهِ", en: "(of) Allah" },
  { ar: "ٱلرَّحۡمَٰنِ", en: "the Most Gracious" },
  { ar: "ٱلرَّحِيمِ", en: "the Most Merciful" },
];

// Auto-mode "scripted" demonstration — the sequence of statuses the auto
// player applies to each word once Learning mode is on. Mirrors the visual
// example from the app onboarding (slide 2).
export const AUTO_PICKS: WordStatus[] = ["known", "known", "learning", "new"];

export type RatingDef = {
  label: string;
  interval: string;
  bgLight: string;
  bgDark: string;
  fg: string;
  explanation: string;
};

// Mirrors GRADE_COLORS / GRADE_INTERVALS / GRADE_LABELS from the app.
export const RATINGS: RatingDef[] = [
  {
    label: "Forgot",
    interval: "Now",
    bgLight: "#FFEBE9",
    bgDark: "#3a0e0c",
    fg: "#FF3B30",
    explanation:
      "Now: you forgot. The card comes right back so you can try again.",
  },
  {
    label: "Hard",
    interval: "6 min",
    bgLight: "#FFF4E5",
    bgDark: "#3D2400",
    fg: "#FF9500",
    explanation:
      "6 minutes: a quick recap. Hard cards stay close until they stick.",
  },
  {
    label: "Good",
    interval: "1 d",
    bgLight: "#E5F2FF",
    bgDark: "#0F2647",
    fg: "#007AFF",
    explanation:
      "1 day. Pick Good again next time and the gap stretches: 1d → 3d → 7d → 2 weeks…",
  },
  {
    label: "Easy",
    interval: "4 d",
    bgLight: "#EBF9EE",
    bgDark: "#0F2D1A",
    fg: "#34C759",
    explanation:
      "4 days. Easy cards grow fast — next time it could be 2 weeks, then a month.",
  },
];

export type SlideKey = "reading" | "mark-words" | "flashcard" | "dashboard";

export type SlideMeta = {
  key: SlideKey;
  title: string;
  body: string;
};

// Source: app/onboarding.tsx slides 0-3.
export const SLIDES: SlideMeta[] = [
  {
    key: "reading",
    title: "Read the Quran",
    body: "Browse all 114 surahs with the traditional Uthmani script and word-by-word translation.",
  },
  {
    key: "mark-words",
    title: "Mark words as you learn",
    body: "Tap Learning, then tap each word to mark it Known or Learning.",
  },
  {
    key: "flashcard",
    title: "Save and review",
    body: "Try the flashcard — pick how well you knew it. Each Good or Easy stretches the gap before the card returns.",
  },
  {
    key: "dashboard",
    title: "Track your journey",
    body: "Your dashboard shows streaks, daily goals, and how much of the Quran you've come to understand.",
  },
];
