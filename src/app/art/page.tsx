import type { Metadata } from "next";
import { ArtStudio } from "@/components/features/ArtStudio";
import { PageHero } from "@/components/layout/PageHero";
import { PageBody, SectionShell } from "@/components/layout/Shell";
import { Note } from "@/components/ui/States";

export const metadata: Metadata = { title: "الرسم والتلوين" };

export default function ArtPage() {
  return (
    <SectionShell section="art">
      <PageHero section="art" />
      <PageBody>
        <ArtStudio />
        <div className="mt-8 max-w-2xl">
          <Note>لوحتك تُحفظ على هذا الجهاز فقط، ولا تُرسل إلى أي مكان.</Note>
        </div>
      </PageBody>
    </SectionShell>
  );
}
