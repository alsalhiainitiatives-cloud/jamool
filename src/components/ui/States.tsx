import type { ReactNode } from "react";
import { Character } from "@/components/brand/Character";
import type { CharacterId } from "@/lib/brand-assets";

export function LoadingState({ label = "لحظة واحدة…" }: { label?: string }) {
  return (
    <div role="status" className="flex flex-col items-center gap-4 py-16 text-center">
      <div className="flex gap-2" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-4 animate-bounce rounded-full bg-accent" style={{ animationDelay: `${i * 140}ms` }} />
        ))}
      </div>
      <p className="font-display text-lg font-bold text-ink-soft">{label}</p>
    </div>
  );
}

function StatePanel({
  character,
  title,
  children,
  action,
  tone,
}: {
  character: CharacterId;
  title: string;
  children?: ReactNode;
  action?: ReactNode;
  tone: "empty" | "error";
}) {
  return (
    <div
      role={tone === "error" ? "alert" : undefined}
      className={`mx-auto flex max-w-xl flex-col items-center gap-4 rounded-xl px-6 py-10 text-center ${tone === "error" ? "bg-[#ffe7df]" : "bg-accent-soft"}`}
    >
      <Character id={character} height={150} decorative />
      <h3 className="text-xl">{title}</h3>
      {children ? <div className="text-ink-soft">{children}</div> : null}
      {action}
    </div>
  );
}

export function EmptyState(props: { character?: CharacterId; title: string; children?: ReactNode; action?: ReactNode }) {
  return <StatePanel tone="empty" character={props.character ?? "jamool"} {...props} />;
}

export function ErrorState(props: { character?: CharacterId; title: string; children?: ReactNode; action?: ReactNode }) {
  return <StatePanel tone="error" character={props.character ?? "zizou"} {...props} />;
}

/** Honest marker for sample or not-yet-available content. */
export function Note({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-start gap-3 rounded-md bg-white px-4 py-3 text-sm text-ink-soft ring-2 ring-navy/8">
      <span aria-hidden className="mt-1.5 size-2.5 shrink-0 rounded-full bg-accent" />
      <span>{children}</span>
    </p>
  );
}
