import type { CSSProperties } from "react";
import { jamoolRig } from "@/data/rigs/jamool";
import type { PuppetAnimation, Rig, RigPiece } from "@/lib/animation/rig-types";
import { cn } from "@/lib/cn";

const rigs = { jamool: jamoolRig } satisfies Record<string, Rig>;
export type PuppetId = keyof typeof rigs;

const labels: Record<PuppetId, string> = { jamool: "جمّول، جمل صغير بوشاح أحمر وحقيبة ظهر" };

/** Pieces that move with the upper body rather than standing on the ground. */
const upperParts = new Set(["backpack", "body", "arm-l", "arm-r", "wave-l", "wave-r"]);

/**
 * A cut-out puppet: separate body pieces layered on one canvas and moved
 * with CSS only (see puppet.css). Every piece reads its visibility and its
 * animation from custom properties that the `data-anim` state sets on the
 * root, so a state is just a list of variables.
 */
export function PuppetCharacter({
  character = "jamool",
  animation = "idle",
  size,
  paused,
  decorative,
  className,
}: {
  character?: PuppetId;
  animation?: PuppetAnimation;
  /** Rendered height in CSS pixels; omit to size it with `className`. */
  size?: number;
  paused?: boolean;
  decorative?: boolean;
  className?: string;
}) {
  const rig = rigs[character];
  const pct = (v: number, of: number) => `${((v / of) * 100).toFixed(3)}%`;

  const box = (p: RigPiece): CSSProperties => ({
    left: pct(p.x, rig.width),
    top: pct(p.y, rig.height),
    width: pct(p.w, rig.width),
    height: pct(p.h, rig.height),
  });
  const origin = ([x, y]: [number, number]) => `${pct(x, rig.width)} ${pct(y, rig.height)}`;

  /** `slot` names the custom properties that show and animate this piece. */
  const piece = (p: RigPiece, slot: string, joint?: { px: number; py: number }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={p.name}
      src={`${rig.base}/${p.name}.webp`}
      alt=""
      draggable={false}
      decoding="async"
      className="pp-piece"
      style={{
        ...box(p),
        opacity: `var(--pp-${slot}, 0)`,
        animation: `var(--pp-a-${slot}, none)`,
        transformOrigin: joint ? `${pct(joint.px, p.w)} ${pct(joint.py, p.h)}` : undefined,
      }}
    />
  );
  /** Body pieces that are always shown. */
  const fixed = (p: RigPiece) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img key={p.name} src={`${rig.base}/${p.name}.webp`} alt="" draggable={false} decoding="async" className="pp-piece" style={box(p)} />
  );
  const group = (name: "all" | "upper" | "head"): CSSProperties => ({ transformOrigin: origin(rig.pivots[name]), animation: `var(--pp-a-${name}, none)` });

  const always = new Set(["backpack", "body", "head"]);
  const ground = rig.parts.filter((p) => !upperParts.has(p.name) && p.name !== "head");
  const upper = rig.parts.filter((p) => upperParts.has(p.name));
  const head = rig.parts.find((p) => p.name === "head")!;

  return (
    <div
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : labels[character]}
      aria-hidden={decorative || undefined}
      data-anim={animation}
      data-paused={paused || undefined}
      className={cn("pp-root relative inline-block", className)}
      style={{ aspectRatio: `${rig.width} / ${rig.height}`, height: size }}
    >
      <div className="pp-group" style={group("all")}>
        {ground.map((p) => piece(p, p.name, p))}
        <div className="pp-group" style={group("upper")}>
          {upper.map((p) => (always.has(p.name) ? fixed(p) : piece(p, p.name, p)))}
          <div className="pp-group" style={group("head")}>
            {fixed(head)}
            {Object.entries(rig.mouths).map(([name, p]) => piece(p, `mouth-${name}`))}
            {Object.entries(rig.face).flatMap(([set, items]) => items.map((p) => piece(p, set)))}
          </div>
        </div>
      </div>
    </div>
  );
}
