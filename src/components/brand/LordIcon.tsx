"use client";

import { createElement, useEffect } from "react";

let defined = false;

/** Thin wrapper around Lordicon's official <lord-icon> player (MIT). */
export function LordIcon({ src, colors, size }: { src: string; colors?: string; size: number | string }) {
  useEffect(() => {
    if (defined) return;
    defined = true;
    import("@lordicon/element").then((m) => m.defineElement());
  }, []);

  return createElement("lord-icon", {
    src,
    colors,
    trigger: "loop(2500)",
    loading: "lazy",
    "aria-hidden": "true",
    style: { width: size, height: size, display: "block" },
  });
}
