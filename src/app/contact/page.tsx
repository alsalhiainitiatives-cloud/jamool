import type { Metadata } from "next";
import { InfoPage } from "@/components/layout/InfoPage";
import { owner } from "@/data/navigation";

export const metadata: Metadata = { title: "تواصل معنا" };

export default function ContactPage() {
  return (
    <InfoPage
      eyebrow="تواصل معنا"
      title="يسعدنا سماع رأيك"
      lead="ملاحظات أولياء الأمور والمعلمين تساعدنا على جعل جمّول أفضل."
      blocks={[
        { title: "الجهة المالكة", body: <p>{owner.name}، {owner.place}.</p> },
        {
          title: "قنوات التواصل",
          body: <p>لم تُضف قنوات التواصل الرسمية إلى هذا النموذج بعد. ستُنشر هنا بيانات الجمعية المعتمدة (الهاتف والبريد والعنوان) عند تزويدنا بها.</p>,
        },
        { title: "لماذا لا يوجد نموذج مراسلة؟", body: <p>حتى لا نجمع أي بيانات قبل اعتماد سياسة الخصوصية وربط المنصة بنظام مراسلة آمن.</p> },
      ]}
    />
  );
}
