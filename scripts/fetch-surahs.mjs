// Fetches the text of selected short surahs from the Al Quran Cloud API
// (edition "quran-uthmani", Tanzil Uthmani text) and stores it verbatim.
// Run: node scripts/fetch-surahs.mjs
import { writeFileSync } from "node:fs";

const numbers = [1, 103, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114];
const out = [];
for (const n of numbers) {
  const res = await fetch(`https://api.alquran.cloud/v1/surah/${n}/quran-uthmani`);
  if (!res.ok) throw new Error(`Surah ${n}: HTTP ${res.status}`);
  const { data } = await res.json();
  out.push({
    number: data.number,
    name: data.name,
    englishName: data.englishName,
    revelationType: data.revelationType,
    ayahs: data.ayahs.map((a) => ({ number: a.numberInSurah, text: a.text })),
  });
}
writeFileSync("src/data/surahs.json", JSON.stringify(out, null, 2) + "\n");
console.log(`Saved ${out.length} surahs`);
