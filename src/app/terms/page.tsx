import type { Metadata } from "next";
import { InfoPage } from "@/components/layout/InfoPage";
import { owner } from "@/data/navigation";

export const metadata: Metadata = { title: "الشروط" };

export default function TermsPage() {
  return (
    <InfoPage
      eyebrow="الشروط"
      title="شروط الاستخدام"
      lead="قواعد بسيطة تجعل جمّول مكانًا آمنًا وممتعًا للجميع."
      draft
      blocks={[
        { title: "لمن هذه المنصة؟", body: <p>جمّول منصة تعليمية ترفيهية للأطفال من ٣ إلى ١٥ سنة، ويُفضَّل أن يرافق الصغار أحد أفراد الأسرة.</p> },
        { title: "المحتوى", body: <p>المحتوى المعروض في هذا النموذج تجريبي، ويخضع للمراجعة التربوية قبل الإطلاق الرسمي.</p> },
        { title: "الملكية", body: <p>شخصيات جمّول ورسوماتها وعلامتها مملوكة لـ{owner.name}.</p> },
        { title: "الاستخدام اللائق", body: <p>نستخدم المنصة للتعلّم واللعب، ونحافظ على لطف الكلام والتعامل.</p> },
      ]}
    />
  );
}
