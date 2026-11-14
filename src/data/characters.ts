import type { CharacterId, SectionId } from "@/lib/brand-assets";

export type Character = {
  id: CharacterId;
  name: string;
  latin: string;
  kind: string;
  role: string;
  blurb: string;
  section: SectionId;
  linkLabel: string;
  /** Visual scale so the five friends feel balanced when standing together. */
  stageScale: number;
  alt: string;
};

export const characters: Character[] = [
  {
    id: "jamool",
    name: "جمّول",
    latin: "Jamool",
    kind: "جمل صغير",
    role: "رفيق المغامرات",
    blurb: "فضولي ومرح، يحمل حقيبته ويقودك إلى كل حكاية جديدة.",
    section: "stories",
    linkLabel: "إلى القصص",
    stageScale: 1,
    alt: "جمّول، جمل صغير بلون كهرماني يلوّح بيده ويرتدي وشاحًا أحمر وحقيبة ظهر",
  },
  {
    id: "thaloob",
    name: "ثعلوب",
    latin: "Thaloob",
    kind: "ثعلب الصحراء",
    role: "بطل التحديات",
    blurb: "سريع البديهة ويحب الألغاز، ولا يرفض تحديًا أبدًا.",
    section: "games",
    linkLabel: "إلى الألعاب",
    stageScale: 0.84,
    alt: "ثعلوب، ثعلب صحراوي برتقالي بنظارة دائرية ووشاح فيروزي",
  },
  {
    id: "zizou",
    name: "زيزو",
    latin: "Zizou",
    kind: "روبوت ودود",
    role: "المساعد الذكي",
    blurb: "يحب الأسئلة، ويحوّل كل «ماذا لو؟» إلى فكرة ممتعة.",
    section: "ai",
    linkLabel: "إلى عالم زيزو",
    stageScale: 0.74,
    alt: "زيزو، روبوت صغير أزرق بوجه شاشة مبتسمة وقلب على صدره",
  },
  {
    id: "noor",
    name: "نور",
    latin: "Noor",
    kind: "هدهد حكيم",
    role: "صديقة القيم",
    blurb: "هادئة وحكيمة، تذكّرنا بأن الكلمة الطيبة تصنع فرقًا.",
    section: "values",
    linkLabel: "إلى حديقة القيم",
    stageScale: 0.8,
    alt: "نور، هدهد بنفسجي بتاج ذهبي وأجنحة مخططة",
  },
  {
    id: "maha",
    name: "مها",
    latin: "Maha",
    kind: "مها عربية",
    role: "فنانة الألوان",
    blurb: "ترى الجمال في كل شيء، وتحوّل الورقة البيضاء إلى عالم.",
    section: "art",
    linkLabel: "إلى الرسم",
    stageScale: 1.04,
    alt: "مها، مها عربية بيضاء بقرنين طويلين تحمل فرشاة ولوحة ألوان",
  },
];

export const characterById = Object.fromEntries(characters.map((c) => [c.id, c])) as Record<CharacterId, Character>;
