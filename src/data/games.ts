export type GameCategory = "memory" | "focus" | "words" | "puzzle";
export const gameCategories: { value: GameCategory; label: string }[] = [
  { value: "memory", label: "ذاكرة" },
  { value: "focus", label: "تركيز" },
  { value: "words", label: "كلمات" },
  { value: "puzzle", label: "أحاجي" },
];

export type Game = {
  slug: string;
  title: string;
  blurb: string;
  category: GameCategory;
  ages: string;
  /** Only `ready` games are playable; the rest are honestly marked as planned. */
  status: "ready" | "planned";
  howTo: string[];
  skills: string[];
};

export const games: Game[] = [
  {
    slug: "memory",
    title: "ذاكرة ثعلوب",
    blurb: "اقلب بطاقتين في كل مرة، وتذكّر أماكن الأصدقاء حتى تطابقها كلها.",
    category: "memory",
    ages: "٣ – ١٢ سنة",
    status: "ready",
    howTo: ["اختر المستوى المناسب لك.", "اضغط على بطاقة لتقلبها، ثم على بطاقة ثانية.", "إن تشابهتا بقيتا مكشوفتين، وإلا عادتا مقلوبتين.", "طابق كل البطاقات لتفوز بالجولة."],
    skills: ["الذاكرة البصرية", "التركيز", "الصبر"],
  },
  {
    slug: "letter-hunt",
    title: "صيد الحروف",
    blurb: "حروف تتطاير في الواحة، فالتقط الحرف المطلوب قبل أن يختفي.",
    category: "words",
    ages: "٥ – ٨ سنوات",
    status: "planned",
    howTo: [],
    skills: ["تمييز الحروف", "سرعة الملاحظة"],
  },
  {
    slug: "oasis-maze",
    title: "متاهة الواحة",
    blurb: "ساعد جمّول على الوصول إلى عين الماء عبر طرق الكثبان.",
    category: "puzzle",
    ages: "٦ – ١٠ سنوات",
    status: "planned",
    howTo: [],
    skills: ["التخطيط", "حل المشكلات"],
  },
  {
    slug: "spot-the-difference",
    title: "أين الاختلاف؟",
    blurb: "صورتان متشابهتان، وبينهما فروق صغيرة تنتظر عينًا ذكية.",
    category: "focus",
    ages: "٥ – ١٢ سنة",
    status: "planned",
    howTo: [],
    skills: ["قوة الملاحظة", "التركيز"],
  },
];

export const gameBySlug = (slug: string) => games.find((g) => g.slug === slug);
export const categoryLabel = (c: GameCategory) => gameCategories.find((x) => x.value === c)!.label;
