"use client";

import { createElement, useEffect } from "react";

let defined = false;

/** Thin wrapper around the <lord-icon> Lottie player (@lordicon/element, MIT). */
/**
 * `color` recolours the icon's line. The same colour is added as two tight
 * drop shadows so the thin outline reads at small sizes.
 */
export function LordIcon({ src, color, size }: { src: string; color?: string; size: number | string }) {
  useEffect(() => {
    if (defined) return;
    defined = true;
    import("@lordicon/element").then((m) => m.defineElement());
  }, []);

  return createElement("lord-icon", {
    src,
    colors: color ? `primary:${color}` : undefined,
    trigger: "loop(2500)",
    loading: "lazy",
    "aria-hidden": "true",
    style: { width: size, height: size, display: "block", filter: color ? `drop-shadow(0 0 0.7px ${color}) drop-shadow(0 0 0.7px ${color})` : undefined },
  });
}
