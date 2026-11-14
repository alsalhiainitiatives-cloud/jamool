import type { SectionId } from "@/lib/brand-assets";
import type { AgeBand } from "./stories";

export type Adventure = {
  id: string;
  kind: "قصة" | "لعبة" | "نشاط تعليمي" | "تحدٍّ" | "نشاط فني" | "قيمة";
  title: string;
  blurb: string;
  href: string;
  section: SectionId;
  ages: AgeBand[];
  cta: string;
};

/** Curated entry points into real, working activities on the platform. */
export const adventures: Adventure[] = [
  {
    id: "story-oasis",
    kind: "قصة",
    title: "ثعلوب وكنز الواحة",
    blurb: "خريطة قديمة، وصخرة عنيدة، وكنز لا يظهر إلا للأصدقاء.",
    href: "/stories/thaloob-and-the-oasis-treasure",
    section: "stories",
    ages: ["6-8"],
    cta: "اقرأ القصة",
  },
  {
    id: "game-memory",
    kind: "لعبة",
    title: "ذاكرة ثعلوب",
    blurb: "اقلب البطاقات وطابق أصدقاء جمّول.",
    href: "/games/memory",
    section: "games",
    ages: ["3-5", "6-8", "9-12"],
    cta: "العب الآن",
  },
  {
    id: "learn-letters",
    kind: "نشاط تعليمي",
    title: "أين الحرف؟",
    blurb: "استمع لاسم الحرف في رأسك ثم اختره.",
    href: "/learn",
    section: "learn",
    ages: ["3-5", "6-8"],
    cta: "ابدأ النشاط",
  },
  {
    id: "challenge-saudi",
    kind: "تحدٍّ",
    title: "تحدي بيئتنا",
    blurb: "ستة أسئلة عن وطننا وطبيعته.",
    href: "/competitions",
    section: "competitions",
    ages: ["6-8", "9-12"],
    cta: "اقبل التحدي",
  },
  {
    id: "art-free",
    kind: "نشاط فني",
    title: "لوحة حرّة مع مها",
    blurb: "ارسم ما يخطر في بالك واحفظ لوحتك.",
    href: "/art",
    section: "art",
    ages: ["3-5", "6-8", "9-12"],
    cta: "افتح اللوحة",
  },
  {
    id: "value-honesty",
    kind: "قيمة",
    title: "بذرة الصدق",
    blurb: "موقف صغير، واختيار يُنبت زهرة.",
    href: "/values",
    section: "values",
    ages: ["3-5", "6-8", "9-12"],
    cta: "ازرع البذرة",
  },
  {
    id: "story-star",
    kind: "قصة",
    title: "جمّول والنجمة الضائعة",
    blurb: "نجمة صغيرة سقطت على الرمل، وجمّول يعيدها إلى السماء.",
    href: "/stories/jamool-and-the-lost-star",
    section: "stories",
    ages: ["3-5"],
    cta: "اقرأ القصة",
  },
  {
    id: "learn-count",
    kind: "نشاط تعليمي",
    title: "عدّ النجوم",
    blurb: "كم نجمة ترى؟ عُدّ واختر الرقم الصحيح.",
    href: "/learn?tab=numbers",
    section: "learn",
    ages: ["3-5", "6-8"],
    cta: "ابدأ العدّ",
  },
];

export const featuredIds = ["story-oasis", "game-memory", "learn-letters", "challenge-saudi"] as const;
