import raw from "./surahs.json";

/**
 * Qur'anic text is stored verbatim in surahs.json exactly as fetched by
 * scripts/fetch-surahs.mjs (Tanzil Uthmani text via the Al Quran Cloud API).
 * Nothing here edits a verse; we only separate the opening basmala for
 * display, as printed mushafs do.
 */
export const surahSource = {
  text: "نص «تنزيل» بالرسم العثماني",
  via: "Al Quran Cloud API · quran-uthmani",
  url: "tanzil.net",
};

const plainNames: Record<number, string> = {
  1: "الفاتحة",
  103: "العصر",
  105: "الفيل",
  106: "قريش",
  107: "الماعون",
  108: "الكوثر",
  109: "الكافرون",
  110: "النصر",
  111: "المسد",
  112: "الإخلاص",
  113: "الفلق",
  114: "الناس",
};

const slugs: Record<number, string> = {
  1: "al-fatihah",
  103: "al-asr",
  105: "al-fil",
  106: "quraysh",
  107: "al-maun",
  108: "al-kawthar",
  109: "al-kafirun",
  110: "an-nasr",
  111: "al-masad",
  112: "al-ikhlas",
  113: "al-falaq",
  114: "an-nas",
};

export type Ayah = { number: number; text: string };
export type Surah = {
  number: number;
  slug: string;
  name: string;
  revelation: "مكية" | "مدنية";
  /** Basmala shown as a heading (it is verse 1 itself in Al-Fatihah). */
  basmala: string | null;
  ayahs: Ayah[];
};

const BOM = "﻿";
const fatihahFirst = raw[0].ayahs[0].text.replace(BOM, "");

export const surahs: Surah[] = raw.map((s) => {
  const ayahs = s.ayahs.map((a) => ({ number: a.number, text: a.text.replace(BOM, "") }));
  let basmala: string | null = null;
  if (s.number !== 1 && ayahs[0].text.startsWith(fatihahFirst + " ")) {
    basmala = fatihahFirst;
    ayahs[0] = { ...ayahs[0], text: ayahs[0].text.slice(fatihahFirst.length + 1) };
  }
  return {
    number: s.number,
    slug: slugs[s.number],
    name: plainNames[s.number],
    revelation: s.revelationType === "Medinan" ? "مدنية" : "مكية",
    basmala,
    ayahs,
  };
});

export const surahBySlug = (slug: string) => surahs.find((s) => s.slug === slug);

const indic = "٠١٢٣٤٥٦٧٨٩";
export const toIndic = (n: number) => String(n).replace(/\d/g, (d) => indic[Number(d)]);
