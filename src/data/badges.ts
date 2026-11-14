import type { SectionId } from "@/lib/brand-assets";

export type Badge = {
  id: string;
  name: string;
  hint: string;
  section: SectionId;
  /** Earned when at least `count` completed activity ids start with `prefix`. */
  prefix: string;
  count: number;
};

export const badges: Badge[] = [
  { id: "reader", name: "قارئ الحكايات", hint: "أكمل قراءة قصة واحدة", section: "stories", prefix: "story:", count: 1 },
  { id: "letters", name: "صديق الحروف", hint: "أنهِ نشاطًا في الحروف أو الأرقام", section: "learn", prefix: "learn:", count: 1 },
  { id: "memory", name: "بطل الذاكرة", hint: "اربح جولة في لعبة الذاكرة", section: "games", prefix: "game:", count: 1 },
  { id: "artist", name: "رسّام صغير", hint: "احفظ لوحة من رسمك", section: "art", prefix: "art:", count: 1 },
  { id: "gardener", name: "بستاني القيم", hint: "ازرع القيم الأربع في الحديقة", section: "values", prefix: "value:", count: 4 },
  { id: "challenger", name: "نجم التحديات", hint: "أكمل تحديًا تدريبيًا", section: "competitions", prefix: "challenge:", count: 1 },
];

/** Section-level progress shown as gentle, non-competitive tracks. */
export const tracks: { section: SectionId; label: string; prefix: string; total: number }[] = [
  { section: "stories", label: "قصص قرأتها", prefix: "story:", total: 5 },
  { section: "learn", label: "أنشطة الحروف والأرقام", prefix: "learn:", total: 2 },
  { section: "values", label: "قيم زرعتها", prefix: "value:", total: 4 },
  { section: "competitions", label: "تحديات أكملتها", prefix: "challenge:", total: 2 },
];
