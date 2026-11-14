import type { Metadata } from "next";
import { ChallengeHub } from "@/components/features/ChallengeHub";
import { BadgeMedal } from "@/components/features/BadgeMedal";
import { PageHero } from "@/components/layout/PageHero";
import { PageBody, SectionHeading, SectionShell } from "@/components/layout/Shell";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/States";
import { badges } from "@/data/badges";

export const metadata: Metadata = { title: "المسابقات" };

const steps = [
  { title: "إعلان المسابقة", text: "تُنشر هنا تفاصيل كل مسابقة: موضوعها، وموعدها، والفئة العمرية." },
  { title: "موافقة ولي الأمر", text: "لا يشارك الطفل في أي مسابقة رسمية إلا بعد موافقة ولي أمره." },
  { title: "المشاركة والتكريم", text: "يجيب الطفل عن الأسئلة، وتُعلن النتائج بطريقة تحفظ خصوصية الجميع." },
];

export default function CompetitionsPage() {
  return (
    <SectionShell section="competitions">
      <PageHero section="competitions" />
      <PageBody>
        <section>
          <SectionHeading eyebrow="متاحة الآن" title="تحديات تدريبية" lead="العب في أي وقت، وأعد المحاولة كما تشاء. هذه التحديات للتدريب والمتعة فقط." />
          <ChallengeHub />
        </section>

        <section className="mt-20">
          <SectionHeading eyebrow="المسابقات الرسمية" title="مسابقات الجمعية" />
          <EmptyState character="thaloob" title="لا توجد مسابقات معلنة حاليًا" action={<Button href="/parents" variant="navy">ركن أولياء الأمور</Button>}>
            حين تعلن الجمعية عن مسابقة جديدة ستظهر هنا بكل تفاصيلها.
          </EmptyState>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-lg bg-white p-6 ring-2 ring-navy/6">
                <span className="grid size-11 place-items-center rounded-full bg-accent font-display text-xl font-extrabold text-ink">{i + 1}</span>
                <h3 className="mt-3 text-xl">{s.title}</h3>
                <p className="mt-1 text-ink-soft">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-20">
          <SectionHeading eyebrow="المكافآت" title="شارة بانتظارك" lead="أكمل أي تحدٍّ تدريبي لتحصل على شارة «نجم التحديات»، وتجدها في صفحة إنجازاتي." />
          <div className="flex flex-wrap items-center gap-8">
            <BadgeMedal badge={badges.find((b) => b.id === "challenger")!} earned preview />
            <Button href="/achievements" variant="soft">
              شاهد إنجازاتي
            </Button>
          </div>
        </section>
      </PageBody>
    </SectionShell>
  );
}
