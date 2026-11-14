import type { ReactNode } from "react";
import type { SectionId } from "@/lib/brand-assets";
import { cn } from "@/lib/cn";

/** Wraps a section page so descendants pick up its accent colours. */
export function SectionShell({ section, children }: { section: SectionId; children: ReactNode }) {
  return <div data-section={section}>{children}</div>;
}

export function PageBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("container-page py-10 sm:py-14", className)}>{children}</div>;
}

export function SectionHeading({ eyebrow, title, lead, center }: { eyebrow?: string; title: string; lead?: string; center?: boolean }) {
  return (
    <div className={cn("mb-8 max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow ? <p className="eyebrow mb-1">{eyebrow}</p> : null}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl">{title}</h2>
      {lead ? <p className="mt-3 text-lg text-ink-soft">{lead}</p> : null}
    </div>
  );
}
