// Downloads the eight section icons (family "Doodle", style "Motif") from the
// Lordicon API as Lottie JSON and records which ones are available.
// Run: LORDICON_API_TOKEN=... node scripts/fetch-lordicon.mjs
// (behind a proxy add NODE_USE_ENV_PROXY=1)
import { mkdirSync, writeFileSync } from "node:fs";

const API = "https://api.lordicon.com/v1/icons";
const token = process.env.LORDICON_API_TOKEN;
if (!token) throw new Error("LORDICON_API_TOKEN is not set");

// section id -> icon name on lordicon.com/icons/doodle/motif (all free icons)
const icons = {
  stories: "book-bookmark",
  learn: "pencil",
  surahs: "moon-stars",
  games: "joystick",
  art: "image-mountain",
  ai: "shooting-stars",
  values: "growing-plant",
  competitions: "medal-first-place",
};

const headers = { Authorization: `Bearer ${token}`, Accept: "application/json" };
mkdirSync("public/assets/lordicon", { recursive: true });

const done = [];
for (const [section, name] of Object.entries(icons)) {
  const query = new URLSearchParams({ family: "doodle", style: "motif", search: name, per_page: "50" });
  const res = await fetch(`${API}?${query}`, { headers });
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status} ${await res.text()}`);
  const body = await res.json();
  const list = Array.isArray(body) ? body : (body.data ?? body.icons ?? []);
  const icon = list.find((i) => i.name === name && i.family === "doodle" && i.style === "motif");
  const url = icon?.files?.json;
  if (!url) throw new Error(`${name}: no Lottie JSON in the API response`);

  const file = await fetch(url);
  if (!file.ok) throw new Error(`${name}: download failed, HTTP ${file.status}`);
  const lottie = await file.json();
  if (!Array.isArray(lottie.layers)) throw new Error(`${name}: not a Lottie file`);
  writeFileSync(`public/assets/lordicon/${section}.json`, JSON.stringify(lottie));
  done.push(section);
  console.log(`✓ ${section} ← ${name}`);
}

writeFileSync("src/data/lordicon-manifest.json", JSON.stringify(done) + "\n");
console.log(`Saved ${done.length} icons`);
