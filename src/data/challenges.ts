import type { QuizQuestion } from "@/components/features/Quiz";

export type Challenge = {
  id: string;
  title: string;
  blurb: string;
  ages: string;
  questions: QuizQuestion[];
};

/** Self-paced practice challenges. They are not official competitions. */
export const challenges: Challenge[] = [
  {
    id: "our-land",
    title: "تحدي بيئتنا",
    blurb: "ستة أسئلة عن وطننا وطبيعته وحيواناته.",
    ages: "٦ – ١٢ سنة",
    questions: [
      { prompt: "ما الحيوان الذي يُلقَّب بـ«سفينة الصحراء»؟", options: ["الحصان", "الجمل", "الغزال", "الصقر"], answer: 1, explain: "الجمل يصبر على العطش ويمشي طويلًا في الرمال." },
      { prompt: "ما عاصمة المملكة العربية السعودية؟", options: ["جدة", "الدمام", "الرياض", "أبها"], answer: 2 },
      { prompt: "أي شجرة تعطينا التمر؟", options: ["النخلة", "الزيتون", "السدر", "الليمون"], answer: 0, explain: "النخلة رمز من رموز المملكة." },
      { prompt: "في أي منطقة تقع محافظة عنيزة؟", options: ["عسير", "القصيم", "تبوك", "جازان"], answer: 1 },
      { prompt: "أي طائر يحمل على رأسه تاجًا من الريش؟", options: ["الحمامة", "العصفور", "الهدهد", "البطة"], answer: 2, explain: "ونور، صديقة جمّول، هدهد!" },
      { prompt: "ما اللون الأساسي في علم المملكة؟", options: ["الأحمر", "الأزرق", "الأصفر", "الأخضر"], answer: 3 },
    ],
  },
  {
    id: "quick-math",
    title: "تحدي الأرقام",
    blurb: "مسائل قصيرة في الجمع والطرح تنشّط عقلك.",
    ages: "٦ – ٩ سنوات",
    questions: [
      { prompt: "٣ + ٤ = ؟", options: ["٦", "٧", "٨", "٩"], answer: 1 },
      { prompt: "٩ − ٥ = ؟", options: ["٣", "٥", "٤", "٦"], answer: 2 },
      { prompt: "مع جمّول تمرتان، وأعطاه ثعلوب ثلاثًا. كم تمرة معه الآن؟", options: ["٤", "٦", "٥", "٣"], answer: 2 },
      { prompt: "٦ + ٦ = ؟", options: ["١٢", "١٠", "١١", "١٣"], answer: 0 },
      { prompt: "أي عدد يأتي بعد ١٩؟", options: ["١٨", "٢١", "٢٠", "٢٩"], answer: 2 },
      { prompt: "١٠ − ٧ = ؟", options: ["٢", "٣", "٤", "١"], answer: 1 },
    ],
  },
];
