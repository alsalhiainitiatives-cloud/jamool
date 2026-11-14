"use client";

import { createElement, useEffect } from "react";

let defined = false;

/** Thin wrapper around the <lord-icon> Lottie player (@lordicon/element, MIT). */
export function LordIcon({ src, size }: { src: string; size: number | string }) {
  useEffect(() => {
    if (defined) return;
    defined = true;
    import("@lordicon/element").then((m) => m.defineElement());
  }, []);

  return createElement("lord-icon", {
    src,
    trigger: "loop(2500)",
    loading: "lazy",
    "aria-hidden": "true",
    style: { width: size, height: size, display: "block" },
  });
}
