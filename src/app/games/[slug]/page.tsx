import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MemoryGame } from "@/components/features/MemoryGame";
import { PageHero } from "@/components/layout/PageHero";
import { PageBody, SectionHeading, SectionShell } from "@/components/layout/Shell";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/States";
import { categoryLabel, gameBySlug, games } from "@/data/games";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return games.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: gameBySlug((await params).slug)?.title ?? "لعبة" };
}

export default async function GamePage({ params }: Props) {
  const game = gameBySlug((await params).slug);
  if (!game) notFound();

  return (
    <SectionShell section="games">
      <PageHero section="games" title={game.title} lead={game.blurb} back={{ href: "/games", label: "كل الألعاب" }}>
        <ul className="flex flex-wrap gap-2 font-display text-sm font-bold text-accent-deep">
          <li className="rounded-full bg-white px-4 py-1.5">{categoryLabel(game.category)}</li>
          <li className="rounded-full bg-white px-4 py-1.5">{game.ages}</li>
          {game.skills.map((s) => (
            <li key={s} className="rounded-full bg-white px-4 py-1.5">
              {s}
            </li>
          ))}
        </ul>
      </PageHero>
      <PageBody>
        {game.status === "ready" ? (
          <div className="grid gap-10 lg:grid-cols-[1fr_18rem]">
            <MemoryGame />
            <aside className="h-fit rounded-xl bg-accent-soft p-6">
              <h2 className="text-xl">طريقة اللعب</h2>
              <ol className="mt-4 grid gap-3">
                {game.howTo.map((step, i) => (
                  <li key={step} className="flex gap-3">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-deep font-display font-bold text-white">{i + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        ) : (
          <>
            <SectionHeading center title="هذه اللعبة قيد الإعداد" />
            <EmptyState character="thaloob" title="ثعلوب ما زال يجهّزها" action={<Button href="/games/memory">العب «ذاكرة ثعلوب» الآن</Button>}>
              لم تُنشر هذه اللعبة بعد. نعرضها هنا لتتعرف على ما نخطط له فقط.
            </EmptyState>
          </>
        )}
      </PageBody>
    </SectionShell>
  );
}
