import type { ReactNode } from "react";
import { SimpleHero } from "./SimpleHero";
import { PageBody } from "./Shell";
import { Note } from "@/components/ui/States";

export type InfoBlock = { title: string; body: ReactNode };

/** Shared layout for privacy, terms, contact and the parents' corner. */
export function InfoPage({ eyebrow, title, lead, draft, blocks, children }: { eyebrow: string; title: string; lead: string; draft?: boolean; blocks: InfoBlock[]; children?: ReactNode }) {
  return (
    <>
      <SimpleHero eyebrow={eyebrow} title={title} lead={lead} />
      <PageBody className="max-w-3xl">
        {draft ? (
          <div className="mb-8">
            <Note>هذه مسودة أولية تصف طريقة عمل النموذج الحالي، وليست نصًّا قانونيًا معتمدًا. تُستبدل بالنص الرسمي بعد اعتماده من الجمعية.</Note>
          </div>
        ) : null}
        <div className="grid gap-5">
          {blocks.map((b) => (
            <section key={b.title} className="rounded-lg bg-white p-6 ring-2 ring-navy/6 sm:p-7">
              <h2 className="text-xl sm:text-2xl">{b.title}</h2>
              <div className="prose-kid mt-2 text-ink-soft">{b.body}</div>
            </section>
          ))}
        </div>
        {children}
      </PageBody>
    </>
  );
}
