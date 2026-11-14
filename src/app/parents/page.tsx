import type { Metadata } from "next";
import { InfoPage } from "@/components/layout/InfoPage";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "ركن أولياء الأمور" };

export default function ParentsPage() {
  return (
    <InfoPage
      eyebrow="الدخول وأولياء الأمور"
      title="الحسابات قادمة… بموافقتك"
      lead="إنشاء الحساب وتسجيل الدخول غير مفعّلين في هذا النموذج. يستطيع طفلك استخدام كل ما في المنصة الآن دون حساب."
      blocks={[
        { title: "ما المتاح الآن؟", body: <p>كل الأقسام مفتوحة دون تسجيل، والتقدم يُحفظ على هذا الجهاز فقط.</p> },
        {
          title: "ما الذي سيحتاج إلى موافقتك لاحقًا؟",
          body: (
            <ul className="grid list-disc gap-1 ps-5">
              <li>إنشاء حساب للطفل وحفظ تقدمه على أكثر من جهاز.</li>
              <li>المشاركة في مسابقات الجمعية الرسمية.</li>
              <li>المحادثة مع المساعد الذكي «زيزو».</li>
            </ul>
          ),
        },
        { title: "نصيحة", body: <p>شاركوا أطفالكم القراءة واللعب، واسألوهم عمّا تعلموه. الأنشطة قصيرة عمدًا لتناسب وقت شاشة معتدلًا.</p> },
      ]}
    >
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/explore">ابدأ دون حساب</Button>
        <Button href="/privacy" variant="soft">
          اقرأ عن الخصوصية
        </Button>
      </div>
    </InfoPage>
  );
}
