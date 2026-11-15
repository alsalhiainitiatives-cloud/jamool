"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const POSTER = "/assets/video/hero-friends-poster.webp";

/**
 * The five friends as a short looping clip.
 *
 * The poster is the clip's own first frame, painted as a background at once,
 * so nothing waits for the video: it fades in over the identical picture
 * when it can play. Viewers who ask for reduced motion keep the still.
 */
export function HeroVideo({ className }: { className?: string }) {
  const [enabled, setEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!calm.matches);
    update();
    calm.addEventListener("change", update);
    return () => calm.removeEventListener("change", update);
  }, []);

  return (
    <div
      role="img"
      aria-label="جمّول يلوّح محاطًا بأصدقائه: مها وثعلوب ونور وزيزو"
      className={cn("relative aspect-[1280/756] bg-cover bg-center", className)}
      style={{ backgroundImage: `url(${POSTER})` }}
    >
      <link rel="preload" as="image" href={POSTER} fetchPriority="high" />
      {enabled ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          tabIndex={-1}
          onPlaying={() => setPlaying(true)}
          className={cn("absolute inset-0 size-full object-cover transition-opacity duration-300", playing ? "opacity-100" : "opacity-0")}
        >
          <source src="/assets/video/hero-friends.webm" type="video/webm" />
          <source src="/assets/video/hero-friends.mp4" type="video/mp4" />
        </video>
      ) : null}
      {/* Soft edges painted in the page colour (no CSS mask: masks over video are fragile). */}
      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[12%] bg-linear-to-b from-page to-transparent" />
      <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[3%] bg-linear-to-t from-page to-transparent" />
      <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-[3%] bg-linear-to-r from-page to-transparent" />
      <span aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-[3%] bg-linear-to-l from-page to-transparent" />
    </div>
  );
}
