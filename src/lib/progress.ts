"use client";

/**
 * Child progress lives only in this browser (localStorage). Nothing is sent
 * to a server and no personal data is collected.
 */
import { useSyncExternalStore } from "react";

export type Progress = {
  /** Activity id -> stars earned for it (each activity counts once). */
  done: Record<string, number>;
};

const KEY = "jamool.progress.v1";
const EMPTY: Progress = { done: {} };
let cache: Progress | null = null;
const listeners = new Set<() => void>();

function read(): Progress {
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as Progress) : EMPTY;
    cache = parsed && typeof parsed.done === "object" ? parsed : EMPTY;
  } catch {
    cache = EMPTY;
  }
  return cache;
}

function write(next: Progress) {
  cache = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable: progress stays in memory for this visit */
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Records an activity. Returns true only the first time it is completed. */
export function completeActivity(id: string, stars = 1): boolean {
  const current = read();
  if (current.done[id]) return false;
  write({ done: { ...current.done, [id]: stars } });
  return true;
}

export function resetProgress() {
  write(EMPTY);
}

export function useProgress() {
  const progress = useSyncExternalStore(subscribe, read, () => EMPTY);
  const ids = Object.keys(progress.done);
  const stars = ids.reduce((sum, id) => sum + progress.done[id], 0);
  return {
    done: progress.done,
    ids,
    stars,
    points: stars * 10,
    has: (id: string) => Boolean(progress.done[id]),
    countPrefix: (prefix: string) => ids.filter((id) => id.startsWith(prefix)).length,
  };
}
