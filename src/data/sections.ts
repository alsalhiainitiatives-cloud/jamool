import type { CharacterId, SectionId } from "@/lib/brand-assets";

export type Section = {
  id: SectionId;
  href: string;
  name: string;
  tagline: string;
  description: string;
  guide: CharacterId;
  greeting: string;
};

export const sections: Section[] = [
  {
    id: "stories",
    href: "/stories",
    name: "القصص",
    tagline: "حكايات تأخذك بعيدًا",
    description: "حكايات قصيرة مصوّرة بالكلمات، تقرؤها وحدك أو مع من تحب.",
    guide: "jamool",
    greeting: "اختر حكاية، وأنا أقرأ معك!",
  },
  {
    id: "learn",
    href: "/learn",
    name: "الحروف والأرقام",
    tagline: "نتعلّم ونحن نلعب",
    description: "بطاقات كبيرة للحروف والأرقام، وأنشطة صغيرة تثبّت ما تعلّمته.",
    guide: "jamool",
    greeting: "حرفًا حرفًا نصير أبطالًا!",
  },
  {
    id: "surahs",
    href: "/surahs",
    name: "قصار السور",
    tagline: "نور في القلب",
    description: "سور قصيرة بخط واضح، نقرؤها بهدوء ونحفظها آية آية.",
    guide: "noor",
    greeting: "هيّا نقرأ بهدوء وتدبّر.",
  },
  {
    id: "games",
    href: "/games",
    name: "الألعاب",
    tagline: "تحدَّ ثعلوب!",
    description: "ألعاب خفيفة تقوّي الذاكرة والتركيز، وكل جولة فيها متعة.",
    guide: "thaloob",
    greeting: "هل أنت جاهز للتحدي؟",
  },
  {
    id: "art",
    href: "/art",
    name: "الرسم والتلوين",
    tagline: "لوّن خيالك",
    description: "لوحة بيضاء، وألوان كثيرة، وفرشاة تنتظر أفكارك.",
    guide: "maha",
    greeting: "كل لوحة تبدأ بخطّ صغير.",
  },
  {
    id: "ai",
    href: "/ai",
    name: "عالم زيزو الذكي",
    tagline: "أفكار لا تنتهي",
    description: "زيزو يساعدك على ابتكار أفكار للقصص والأنشطة.",
    guide: "zizou",
    greeting: "بيب بوب! عندي فكرة لك.",
  },
  {
    id: "values",
    href: "/values",
    name: "حديقة القيم",
    tagline: "نزرع الخير",
    description: "مواقف صغيرة نتعلّم منها الصدق والتعاون والاحترام والكرم.",
    guide: "noor",
    greeting: "كل قيمة بذرة، فلنزرعها معًا.",
  },
  {
    id: "competitions",
    href: "/competitions",
    name: "المسابقات",
    tagline: "اختبر معلوماتك",
    description: "تحديات تدريبية ممتعة تختبر بها معلوماتك في أي وقت.",
    guide: "thaloob",
    greeting: "أرني ما تعرف!",
  },
];

export const sectionById = Object.fromEntries(sections.map((s) => [s.id, s])) as Record<SectionId, Section>;
