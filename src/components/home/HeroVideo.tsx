"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const POSTER = "/assets/video/hero-friends-poster.webp";

/**
 * The five friends as a short looping clip (wide screens only).
 *
 * The poster is the clip's own first frame, painted as a background at once,
 * so nothing waits for the video: it fades in over the identical picture
 * when it can play. Viewers who ask for reduced motion keep the still.
 */
export function HeroVideo({ className }: { className?: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(wide.matches && !calm.matches);
    update();
    wide.addEventListener("change", update);
    calm.addEventListener("change", update);
    return () => {
      wide.removeEventListener("change", update);
      calm.removeEventListener("change", update);
    };
  }, []);

  return (
    <div
      role="img"
      aria-label="جمّول يلوّح محاطًا بأصدقائه: مها وثعلوب ونور وزيزو"
      className={cn("relative aspect-video bg-cover bg-center [mask-image:linear-gradient(to_bottom,transparent,black_12%),linear-gradient(to_right,transparent,black_3%,black_97%,transparent)] [mask-composite:intersect]", className)}
      style={{ backgroundImage: `url(${POSTER})` }}
    >
      {/* Fetch the still early, but only where this block is shown. */}
      <link rel="preload" as="image" href={POSTER} media="(min-width: 1024px)" fetchPriority="high" />
      {enabled ? (
        <video
          ref={video}
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
    </div>
  );
}
