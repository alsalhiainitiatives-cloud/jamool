export type Letter = {
  char: string;
  name: string;
  word: string;
  /** Does not join to the following letter (no initial/medial form). */
  nonJoining?: boolean;
};

export const letters: Letter[] = [
  { char: "أ", name: "ألف", word: "أرنب", nonJoining: true },
  { char: "ب", name: "باء", word: "بطة" },
  { char: "ت", name: "تاء", word: "تمر" },
  { char: "ث", name: "ثاء", word: "ثعلب" },
  { char: "ج", name: "جيم", word: "جمل" },
  { char: "ح", name: "حاء", word: "حصان" },
  { char: "خ", name: "خاء", word: "خروف" },
  { char: "د", name: "دال", word: "ديك", nonJoining: true },
  { char: "ذ", name: "ذال", word: "ذرة", nonJoining: true },
  { char: "ر", name: "راء", word: "رمان", nonJoining: true },
  { char: "ز", name: "زاي", word: "زرافة", nonJoining: true },
  { char: "س", name: "سين", word: "سمكة" },
  { char: "ش", name: "شين", word: "شمس" },
  { char: "ص", name: "صاد", word: "صقر" },
  { char: "ض", name: "ضاد", word: "ضفدع" },
  { char: "ط", name: "طاء", word: "طائر" },
  { char: "ظ", name: "ظاء", word: "ظرف" },
  { char: "ع", name: "عين", word: "عنب" },
  { char: "غ", name: "غين", word: "غزال" },
  { char: "ف", name: "فاء", word: "فراشة" },
  { char: "ق", name: "قاف", word: "قمر" },
  { char: "ك", name: "كاف", word: "كتاب" },
  { char: "ل", name: "لام", word: "ليمون" },
  { char: "م", name: "ميم", word: "مها" },
  { char: "ن", name: "نون", word: "نخلة" },
  { char: "هـ", name: "هاء", word: "هدهد" },
  { char: "و", name: "واو", word: "وردة", nonJoining: true },
  { char: "ي", name: "ياء", word: "يد" },
];

const ZWJ = "‍";

/** Positional forms, produced with zero-width joiners so the font shapes them. */
export function letterForms(letter: Letter) {
  const base = letter.char === "هـ" ? "ه" : letter.char === "أ" ? "ا" : letter.char;
  const forms = [{ label: "منفردًا", text: letter.char === "هـ" ? "ه" : letter.char }];
  if (!letter.nonJoining) {
    forms.push({ label: "في البداية", text: base + ZWJ }, { label: "في الوسط", text: ZWJ + base + ZWJ });
  }
  forms.push({ label: "في النهاية", text: ZWJ + base });
  return forms;
}

export type NumberCard = { value: number; indic: string; name: string };

export const numbers: NumberCard[] = [
  { value: 1, indic: "١", name: "واحد" },
  { value: 2, indic: "٢", name: "اثنان" },
  { value: 3, indic: "٣", name: "ثلاثة" },
  { value: 4, indic: "٤", name: "أربعة" },
  { value: 5, indic: "٥", name: "خمسة" },
  { value: 6, indic: "٦", name: "ستة" },
  { value: 7, indic: "٧", name: "سبعة" },
  { value: 8, indic: "٨", name: "ثمانية" },
  { value: 9, indic: "٩", name: "تسعة" },
  { value: 10, indic: "١٠", name: "عشرة" },
];

export type Level = "easy" | "medium";
export const levels: { value: Level; label: string }[] = [
  { value: "easy", label: "سهل · ٣ – ٥ سنوات" },
  { value: "medium", label: "متوسط · ٦ – ٨ سنوات" },
];
