// Builds Jamool's own animated section icons as Lottie JSON files.
//
// The files follow the conventions the <lord-icon> player understands:
// a square composition at 60 fps whose markers name the states
// ("in-reveal" draws the icon in, "default:hover-…" is the looping motion).
// The artwork itself is original: outlined shapes with an offset colour
// blob behind them, in the palette of the platform characters.
//
//   node scripts/build-animated-icons.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "assets", "animated-icons");

const SIZE = 96;
const FPS = 60;
const REVEAL = 60; // frames 0–60: the icon draws itself in
const HOVER_AT = 70; // frames 70–130: the looping motion
const HOVER = 60;
const END = HOVER_AT + HOVER + 1;

const INK = "#1F2A5C";
const WHITE = "#FFFFFF";
const GOLD = "#FFC43D";
const CORAL = "#F0563A";
const TEAL = "#1E9E96";
const PURPLE = "#8D6BE8";
const BLUE = "#2F7BEA";
const CYAN = "#18A7C9";
const GREEN = "#5DAA3A";
const ORANGE = "#F5A63A";

const SW = 3.2; // outline width
const MOTIF = 2.6; // offset of the colour blob behind an outline

/* ---------- geometry ---------- */

const rgb = (hex) => [1, 3, 5].map((i) => +(parseInt(hex.slice(i, i + 2), 16) / 255).toFixed(4)).concat(1);
const r2 = (n) => +n.toFixed(3);

/** SVG endpoint arc → cubic segments [[c1, c2, end], …]. */
function arcToCubics([x1, y1], rx, ry, phiDeg, fa, fs, [x2, y2]) {
  const phi = (phiDeg * Math.PI) / 180;
  const cos = Math.cos(phi);
  const sin = Math.sin(phi);
  const dx = (x1 - x2) / 2;
  const dy = (y1 - y2) / 2;
  const xp = cos * dx + sin * dy;
  const yp = -sin * dx + cos * dy;
  const lambda = (xp * xp) / (rx * rx) + (yp * yp) / (ry * ry);
  if (lambda > 1) {
    rx *= Math.sqrt(lambda);
    ry *= Math.sqrt(lambda);
  }
  const num = rx * rx * ry * ry - rx * rx * yp * yp - ry * ry * xp * xp;
  const den = rx * rx * yp * yp + ry * ry * xp * xp;
  const k = (fa === fs ? -1 : 1) * Math.sqrt(Math.max(0, num / den));
  const cxp = (k * rx * yp) / ry;
  const cyp = (-k * ry * xp) / rx;
  const cx = cos * cxp - sin * cyp + (x1 + x2) / 2;
  const cy = sin * cxp + cos * cyp + (y1 + y2) / 2;
  const angle = (ux, uy, vx, vy) => Math.atan2(ux * vy - uy * vx, ux * vx + uy * vy);
  const t1 = angle(1, 0, (xp - cxp) / rx, (yp - cyp) / ry);
  let dt = angle((xp - cxp) / rx, (yp - cyp) / ry, (-xp - cxp) / rx, (-yp - cyp) / ry);
  if (!fs && dt > 0) dt -= 2 * Math.PI;
  if (fs && dt < 0) dt += 2 * Math.PI;
  const n = Math.ceil(Math.abs(dt) / (Math.PI / 2));
  const step = dt / n;
  const h = (4 / 3) * Math.tan(step / 4);
  const point = (t) => [cx + rx * Math.cos(t) * cos - ry * Math.sin(t) * sin, cy + rx * Math.cos(t) * sin + ry * Math.sin(t) * cos];
  const deriv = (t) => [-rx * Math.sin(t) * cos - ry * Math.cos(t) * sin, -rx * Math.sin(t) * sin + ry * Math.cos(t) * cos];
  const out = [];
  for (let i = 0; i < n; i++) {
    const a = t1 + i * step;
    const b = a + step;
    const [pa, pb, da, db] = [point(a), point(b), deriv(a), deriv(b)];
    out.push([[pa[0] + h * da[0], pa[1] + h * da[1]], [pb[0] - h * db[0], pb[1] - h * db[1]], pb]);
  }
  return out;
}

/** Absolute SVG path data (M L H V C Q A Z) → Lottie bezier shapes. */
function pathToShapes(d) {
  const tokens = d.match(/[MLHVCQAZ]|-?\d*\.?\d+(?:e-?\d+)?/gi);
  const subs = [];
  let cur = null;
  let i = 0;
  let cmd = "";
  const num = () => parseFloat(tokens[i++]);
  const last = () => cur.pts[cur.pts.length - 1];
  const push = (v, c1, c2) => {
    const prev = last();
    if (c1) prev.o = [c1[0] - prev.v[0], c1[1] - prev.v[1]];
    cur.pts.push({ v, i: c2 ? [c2[0] - v[0], c2[1] - v[1]] : [0, 0], o: [0, 0] });
  };
  while (i < tokens.length) {
    if (/[A-Z]/i.test(tokens[i])) cmd = tokens[i++];
    if (cmd === "M") {
      cur = { pts: [{ v: [num(), num()], i: [0, 0], o: [0, 0] }], closed: false };
      subs.push(cur);
      cmd = "L";
    } else if (cmd === "L") push([num(), num()]);
    else if (cmd === "H") push([num(), last().v[1]]);
    else if (cmd === "V") push([last().v[0], num()]);
    else if (cmd === "C") {
      const c1 = [num(), num()];
      const c2 = [num(), num()];
      push([num(), num()], c1, c2);
    } else if (cmd === "Q") {
      const p0 = last().v;
      const q = [num(), num()];
      const p1 = [num(), num()];
      push(p1, [p0[0] + (2 / 3) * (q[0] - p0[0]), p0[1] + (2 / 3) * (q[1] - p0[1])], [p1[0] + (2 / 3) * (q[0] - p1[0]), p1[1] + (2 / 3) * (q[1] - p1[1])]);
    } else if (cmd === "A") {
      const [rx, ry, phi, fa, fs] = [num(), num(), num(), num(), num()];
      for (const [c1, c2, p] of arcToCubics(last().v, rx, ry, phi, fa, fs, [num(), num()])) push(p, c1, c2);
    } else if (cmd === "Z") {
      cur.closed = true;
      const first = cur.pts[0];
      const end = last();
      if (cur.pts.length > 1 && Math.hypot(end.v[0] - first.v[0], end.v[1] - first.v[1]) < 1e-6) {
        first.i = end.i;
        cur.pts.pop();
      }
    } else throw new Error(`Unsupported path command "${cmd}" in ${d}`);
  }
  return subs.map((s) => ({
    ty: "sh",
    ks: { a: 0, k: { c: s.closed, v: s.pts.map((p) => p.v.map(r2)), i: s.pts.map((p) => p.i.map(r2)), o: s.pts.map((p) => p.o.map(r2)) } },
  }));
}

function star(cx, cy, R, r = R * 0.45) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const a = ((-90 + i * 36) * Math.PI) / 180;
    const rad = i % 2 ? r : R;
    pts.push(`${(cx + rad * Math.cos(a)).toFixed(2)} ${(cy + rad * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
}

const heart = (cx, cy, s) =>
  `M${cx} ${cy + 12 * s}C${cx - 14 * s} ${cy + 3 * s} ${cx - 15 * s} ${cy - 10 * s} ${cx - 7 * s} ${cy - 12.5 * s}C${cx - 3 * s} ${cy - 13.8 * s} ${cx} ${cy - 11 * s} ${cx} ${cy - 8.5 * s}C${cx} ${cy - 11 * s} ${cx + 3 * s} ${cy - 13.8 * s} ${cx + 7 * s} ${cy - 12.5 * s}C${cx + 15 * s} ${cy - 10 * s} ${cx + 14 * s} ${cy + 3 * s} ${cx} ${cy + 12 * s}Z`;

/* ---------- Lottie building blocks ---------- */

const ease = (dims) => ({ o: { x: Array(dims).fill(0.33), y: Array(dims).fill(0) }, i: { x: Array(dims).fill(0.67), y: Array(dims).fill(1) } });

/** [[frame, value], …] → a Lottie property (static when there is one key). */
function prop(keys) {
  const sorted = [...keys].sort((a, b) => a[0] - b[0]);
  if (sorted.length === 1) return { a: 0, k: sorted[0][1] };
  return {
    a: 1,
    k: sorted.map(([t, v], idx) => {
      const s = Array.isArray(v) ? v : [v];
      return idx === sorted.length - 1 ? { t, s } : { t, s, ...ease(s.length) };
    }),
  };
}

const fixed = (k) => ({ a: 0, k });
const groupTransform = (p = [0, 0], r = 0) => ({ ty: "tr", p: fixed(p), a: fixed([0, 0]), s: fixed([100, 100]), r: fixed(r), o: fixed(100), sk: fixed(0), sa: fixed(0) });

function geometry(shape) {
  if (shape.d) return pathToShapes(shape.d);
  if (shape.circle) {
    const [cx, cy, radius] = shape.circle;
    return [{ ty: "el", d: 1, p: fixed([cx, cy]), s: fixed([radius * 2, radius * 2]) }];
  }
  const [x, y, w, h, radius = 0] = shape.rect;
  return [{ ty: "rc", d: 1, p: fixed([x + w / 2, y + h / 2]), s: fixed([w, h]), r: fixed(radius) }];
}

const fillOf = (hex) => ({ ty: "fl", c: fixed(rgb(hex)), o: fixed(100), r: 1 });
const strokeOf = (hex, w) => ({ ty: "st", c: fixed(rgb(hex)), o: fixed(100), w: fixed(w), lc: 2, lj: 2 });

/**
 * One drawn shape → Lottie groups (top first).
 *   fill / stroke+sw : paint
 *   casing           : a wider ink stroke underneath, for "tube" lines
 *   motif            : colour blob offset behind the shape
 *   rot              : [degrees, cx, cy] static rotation
 * `shift` moves the whole shape (used by stand-alone colour blobs).
 */
function shapeGroups(shape, trim, shift = 0) {
  const wrap = (items, offset = [shift, shift]) => {
    let it = [...items, groupTransform(offset)];
    if (shape.rot) {
      const [deg, cx, cy] = shape.rot;
      const turn = groupTransform([cx, cy], deg);
      turn.a = fixed([cx, cy]);
      it = [{ ty: "gr", it }, turn];
    }
    return { ty: "gr", it };
  };
  const paint = [];
  if (trim) paint.push(trim);
  if (shape.stroke !== null) paint.push(strokeOf(shape.stroke ?? INK, shape.sw ?? SW));
  if (shape.fill) paint.push(fillOf(shape.fill));
  const groups = [wrap([...geometry(shape), ...paint])];
  if (shape.casing) groups.push(wrap([...geometry(shape), ...(trim ? [trim] : []), strokeOf(INK, shape.casing)]));
  if (shape.motif) groups.push(wrap([...geometry(shape), fillOf(shape.motif)], [MOTIF, MOTIF]));
  return groups;
}

/** Shifts a hover track ([[offset, value], …]) onto the timeline. */
const onHover = (track) => track.map(([t, v]) => [HOVER_AT + t, v]);

/**
 * A part is one layer: it pops in during "in-reveal" (or draws itself when
 * `draw` is set) and may move during the hover state.
 */
function partLayer(part, index, order) {
  const start = 2 + order * 4;
  const pivot = part.pivot ?? [SIZE / 2, SIZE / 2];
  const hover = part.hover ?? {};

  const scale = part.draw
    ? [[0, [100, 100, 100]]]
    : [
        [0, [0, 0, 100]],
        [start, [0, 0, 100]],
        [start + 14, [114, 114, 100]],
        [start + 24, [100, 100, 100]],
      ];
  if (hover.s) scale.push(...onHover(hover.s.map(([t, v]) => [t, Array.isArray(v) ? [...v, 100] : [v, v, 100]])));

  const base = part.rot ?? 0;
  const rotation = [[0, base]];
  if (hover.r) rotation.push(...onHover(hover.r.map(([t, v]) => [t, base + v])));

  const position = [[0, [...pivot, 0]]];
  if (hover.p) position.push(...onHover(hover.p.map(([t, [x, y]]) => [t, [pivot[0] + x, pivot[1] + y, 0]])));

  let trim = null;
  if (part.draw) {
    const end = [
      [0, 0],
      [start, 0],
      [start + 26, 100],
    ];
    if (hover.draw) end.push([HOVER_AT, 100], [HOVER_AT + 1, 0], [HOVER_AT + 6, 0], [HOVER_AT + 40, 100]);
    trim = { ty: "tm", s: fixed(0), e: prop(end), o: fixed(0), m: 1 };
  }

  return {
    ddd: 0,
    ind: index,
    ty: 4,
    nm: part.name,
    parent: 1,
    sr: 1,
    ks: { o: fixed(100), r: prop(rotation), p: prop(position), a: fixed([...pivot, 0]), s: prop(scale) },
    ao: 0,
    shapes: part.shapes.flatMap((s) => shapeGroups(s, trim, part.offsetBy)),
    ip: 0,
    op: END,
    st: 0,
    bm: 0,
  };
}

/** `parts` are listed back to front; `root` moves the whole icon on hover. */
function buildIcon({ name, motion, parts, root = {} }) {
  const centre = [SIZE / 2, SIZE / 2];
  const pivot = root.pivot ?? centre;
  const rootLayer = {
    ddd: 0,
    ind: 1,
    ty: 3,
    nm: "root",
    sr: 1,
    ks: {
      o: fixed(0),
      r: prop([[0, 0], ...(root.r ? onHover(root.r) : [])]),
      p: prop([[0, [...pivot, 0]], ...(root.p ? onHover(root.p.map(([t, [x, y]]) => [t, [pivot[0] + x, pivot[1] + y, 0]])) : [])]),
      a: fixed([...pivot, 0]),
      s: prop([[0, [100, 100, 100]], ...(root.s ? onHover(root.s.map(([t, v]) => [t, [v[0], v[1], 100]])) : [])]),
    },
    ao: 0,
    ip: 0,
    op: END,
    st: 0,
    bm: 0,
  };
  const layers = parts.map((part, order) => partLayer(part, order + 2, order)).reverse();
  return {
    v: "5.12.1",
    fr: FPS,
    ip: 0,
    op: END,
    w: SIZE,
    h: SIZE,
    nm: `jamool-${name}`,
    ddd: 0,
    assets: [],
    layers: [rootLayer, ...layers],
    markers: [
      { tm: 0, cm: "in-reveal", dr: REVEAL },
      { tm: HOVER_AT, cm: `default:hover-${motion}`, dr: HOVER },
    ],
  };
}

/* ---------- motion presets (offsets within the hover state) ---------- */

const pop = (at, amount = 126) => [
  [at, 100],
  [at + 9, amount],
  [at + 20, 100],
];
const spin = (turn) => [
  [4, 0],
  [44, turn],
];
const sway = (deg) => [
  [0, 0],
  [12, -deg],
  [30, deg],
  [46, -deg / 2],
  [60, 0],
];
const hop = (at, height) => [
  [at, [0, 0]],
  [at + 10, [0, -height]],
  [at + 22, [0, 0]],
];

/* ---------- the eight icons ---------- */

const bookPages = (y) => [
  { d: `M47 ${y + 8}C40 ${y + 2} 29 ${y + 1} 20 ${y + 4}V${y + 40}C29 ${y + 37} 40 ${y + 38} 47 ${y + 44}Z`, fill: WHITE },
  { d: `M49 ${y + 8}C56 ${y + 2} 67 ${y + 1} 76 ${y + 4}V${y + 40}C67 ${y + 37} 56 ${y + 38} 49 ${y + 44}Z`, fill: WHITE },
];
const bookShadow = (y, colour) => ({ d: `M20 ${y + 4}C29 ${y + 1} 40 ${y + 2} 48 ${y + 8}C56 ${y + 2} 67 ${y + 1} 76 ${y + 4}V${y + 40}C67 ${y + 37} 56 ${y + 38} 48 ${y + 44}C40 ${y + 38} 29 ${y + 37} 20 ${y + 40}Z`, fill: colour, stroke: null });

const icons = [
  {
    name: "stories",
    motion: "sparkle",
    root: { s: [[0, [100, 100]], [14, [104, 104]], [30, [100, 100]]] },
    parts: [
      { name: "shadow", pivot: [50, 48], shapes: [bookShadow(24, PURPLE)], offsetBy: MOTIF },
      { name: "ribbon", pivot: [46, 68], shapes: [{ d: "M41.5 66V82L46.5 77.5L51.5 82V67Z", fill: CORAL }] },
      { name: "book", pivot: [48, 48], shapes: bookPages(24) },
      { name: "lines", draw: true, hover: { draw: true }, shapes: [{ d: "M26 38H40M26 45H40M26 52H37", stroke: PURPLE, sw: 3 }] },
      { name: "star", pivot: [63, 46], hover: { r: spin(72), s: pop(6, 132) }, shapes: [{ d: star(63, 46, 10.5), fill: GOLD, sw: 2.8 }] },
    ],
  },
  {
    name: "learn",
    motion: "hop",
    parts: [
      {
        name: "block-ba",
        pivot: [30, 62],
        rot: -7,
        hover: { p: hop(0, 7) },
        shapes: [
          { circle: [30, 73.2, 1.9], fill: INK, stroke: null },
          { d: "M22.5 57C21.5 65 25 67.5 30 67.5C35 67.5 38.5 65 37.5 57", sw: 3.4 },
          { rect: [14, 46, 32, 32, 9], fill: WHITE, motif: ORANGE },
        ],
      },
      {
        name: "block-one",
        pivot: [66, 62],
        rot: 7,
        hover: { p: hop(12, 7) },
        shapes: [
          { d: "M61.5 58.5L67 54V71M61.5 71H72", stroke: WHITE, sw: 3.4 },
          { rect: [50, 46, 32, 32, 9], fill: BLUE, motif: ORANGE },
        ],
      },
      {
        name: "block-alif",
        pivot: [48, 32],
        rot: -4,
        hover: { p: hop(24, 8) },
        shapes: [
          { d: "M48 28V42M50.6 20.6C48.4 19.2 45.6 20.4 46.4 22.4C47 23.6 49 23.6 51 23", stroke: WHITE, sw: 3.2 },
          { rect: [32, 16, 32, 32, 9], fill: PURPLE, motif: ORANGE },
        ],
      },
    ],
  },
  {
    name: "surahs",
    motion: "glow",
    parts: [
      { name: "stand", pivot: [48, 70], shapes: [{ d: "M22 82L52 58M74 82L44 58", stroke: GOLD, sw: 5, casing: 11 }] },
      { name: "shadow", pivot: [50, 40], shapes: [bookShadow(18, TEAL)], offsetBy: MOTIF },
      { name: "book", pivot: [48, 40], hover: { s: [[0, 100], [16, 105], [34, 100]] }, shapes: bookPages(18) },
      { name: "lines", draw: true, hover: { draw: true }, shapes: [{ d: "M26 30H40M26 37H40M26 44H38", stroke: TEAL, sw: 3 }] },
      { name: "crescent", pivot: [64, 37], hover: { r: sway(14) }, shapes: [{ d: "M67 28A9 9 0 1 0 67 46A7.2 7.2 0 1 1 67 28Z", fill: GOLD, sw: 2.4 }] },
      { name: "star", pivot: [70.5, 33], hover: { s: [[0, 100], [10, 40], [22, 150], [36, 100]], r: spin(72) }, shapes: [{ d: star(70.5, 33, 4.4), fill: GOLD, sw: 1.8 }] },
    ],
  },
  {
    name: "games",
    motion: "wiggle",
    root: { r: sway(9) },
    parts: [
      {
        name: "pad",
        pivot: [48, 50],
        shapes: [{ d: "M22 36C22 29 28 26 35 26H61C68 26 74 29 74 36L80 61C82 70 73 75 67 70L59 62H37L29 70C23 75 14 70 16 61Z", fill: WHITE, motif: BLUE }],
      },
      { name: "dpad", pivot: [35.5, 43.3], hover: { s: pop(2, 118) }, shapes: [{ rect: [27, 40, 17, 6.5, 2.5], fill: INK, stroke: null }, { rect: [32.2, 34.8, 6.5, 17, 2.5], fill: INK, stroke: null }] },
      { name: "grip", draw: true, shapes: [{ d: "M42 54H54", stroke: BLUE, sw: 3 }] },
      { name: "button-top", pivot: [64, 37.5], hover: { s: pop(4, 140) }, shapes: [{ circle: [64, 37.5, 4.6], fill: CORAL, sw: 2.4 }] },
      { name: "button-right", pivot: [72, 45], hover: { s: pop(14, 140) }, shapes: [{ circle: [72, 45, 4.6], fill: GOLD, sw: 2.4 }] },
      { name: "button-bottom", pivot: [64, 52.5], hover: { s: pop(24, 140) }, shapes: [{ circle: [64, 52.5, 4.6], fill: PURPLE, sw: 2.4 }] },
      { name: "button-left", pivot: [56, 45], hover: { s: pop(34, 140) }, shapes: [{ circle: [56, 45, 4.6], fill: TEAL, sw: 2.4 }] },
    ],
  },
  {
    name: "art",
    motion: "paint",
    parts: [
      {
        name: "palette",
        pivot: [48, 46],
        shapes: [{ d: "M22 34C26 20 48 16 64 23C80 30 84 48 76 60C70 70 60 65 54 69C46 75 30 72 23 61C17 52 18 42 22 34Z", fill: WHITE, motif: CORAL }],
      },
      { name: "hole", pivot: [60, 61], shapes: [{ circle: [60, 61, 4.6], fill: CORAL }] },
      { name: "dab-gold", pivot: [33, 42], hover: { s: pop(4, 138) }, shapes: [{ circle: [33, 42, 5.2], fill: GOLD, sw: 2.4 }] },
      { name: "dab-blue", pivot: [43, 31], hover: { s: pop(14, 138) }, shapes: [{ circle: [43, 31, 5.2], fill: BLUE, sw: 2.4 }] },
      { name: "dab-teal", pivot: [31, 55], hover: { s: pop(24, 138) }, shapes: [{ circle: [31, 55, 5.2], fill: TEAL, sw: 2.4 }] },
      { name: "dab-purple", pivot: [45, 61], hover: { s: pop(34, 138) }, shapes: [{ circle: [45, 61, 5.2], fill: PURPLE, sw: 2.4 }] },
      {
        name: "brush",
        pivot: [80, 14],
        hover: { r: [[0, 0], [12, 9], [26, -7], [40, 6], [56, 0]] },
        shapes: [
          { d: "M56 45L49 54.5", stroke: PURPLE, sw: 5.5, casing: 11 },
          { d: "M60 40L56 45", stroke: "#DDE3EE", sw: 5.5, casing: 11 },
          { d: "M80 14L60 40", stroke: GOLD, sw: 5, casing: 11 },
        ],
      },
    ],
  },
  {
    name: "ai",
    motion: "blink",
    root: { r: sway(5), pivot: [48, 80] },
    parts: [
      { name: "body", pivot: [48, 75], shapes: [{ d: heart(48, 75.4, 0.36), fill: CORAL, stroke: null }, { rect: [30, 68, 36, 14, 7], fill: WHITE, motif: CYAN }] },
      { name: "antenna", draw: true, shapes: [{ d: "M48 25V16" }] },
      { name: "ears", pivot: [48, 45], shapes: [{ rect: [15, 38, 8, 15, 4], fill: GOLD }, { rect: [73, 38, 8, 15, 4], fill: GOLD }] },
      { name: "head", pivot: [48, 45], shapes: [{ rect: [27, 30, 42, 30, 12], fill: INK, stroke: null }, { rect: [21, 24, 54, 42, 17], fill: WHITE, motif: CYAN }] },
      { name: "smile", draw: true, hover: { draw: true }, shapes: [{ d: "M42 51Q48 56 54 51", stroke: "#6EE7EE", sw: 3.6 }] },
      {
        name: "eyes",
        pivot: [48, 42],
        hover: { s: [[0, [100, 100]], [6, [100, 12]], [12, [100, 100]], [30, [100, 100]], [36, [100, 12]], [42, [100, 100]]] },
        shapes: [{ d: "M35 44Q39 37 43 44M53 44Q57 37 61 44", stroke: "#6EE7EE", sw: 3.6 }],
      },
      { name: "spark", pivot: [48, 13], hover: { r: spin(72), s: pop(8, 135) }, shapes: [{ d: star(48, 13, 7.5), fill: GOLD, sw: 2.6 }] },
    ],
  },
  {
    name: "values",
    motion: "grow",
    parts: [
      { name: "soil", pivot: [48, 82], shapes: [{ d: "M16 82C26 70 70 70 80 82Z", fill: "#8A4B22", motif: GREEN }] },
      { name: "stem", draw: true, shapes: [{ d: "M48 74V45", stroke: "#3F8228", sw: 4, casing: 9 }] },
      { name: "leaf-left", pivot: [48, 62], hover: { r: sway(-10) }, shapes: [{ d: "M48 62C36 64 27 58 25 47C37 45 46 51 48 62Z", fill: "#A5DC7A" }] },
      { name: "leaf-right", pivot: [48, 56], hover: { r: sway(10) }, shapes: [{ d: "M48 56C60 58 69 52 71 41C59 39 50 45 48 56Z", fill: "#A5DC7A" }] },
      {
        name: "heart",
        pivot: [48, 40],
        hover: { s: [[0, 100], [8, 120], [18, 100], [28, 114], [40, 100]] },
        shapes: [{ d: "M48 44C34 35 33 22 41 19.5C45 18.2 48 21 48 23.5C48 21 51 18.2 55 19.5C63 22 62 35 48 44Z", fill: CORAL }],
      },
    ],
  },
  {
    name: "competitions",
    motion: "cheer",
    root: { p: hop(2, 6), pivot: [48, 80], s: [[0, [100, 100]], [4, [104, 94]], [12, [98, 104]], [24, [103, 96]], [34, [100, 100]]] },
    parts: [
      { name: "handles", draw: true, shapes: [{ d: "M30 26H21C19 42 26 49 35 49M66 26H75C77 42 70 49 61 49", stroke: WHITE, sw: 3.4, casing: 9 }] },
      { name: "base", pivot: [48, 74], shapes: [{ d: "M38 74H58", stroke: GOLD, sw: 3 }, { rect: [31, 68, 34, 12, 4], fill: INK, stroke: null }, { rect: [43, 57, 10, 11, 0], fill: WHITE }] },
      { name: "cup", pivot: [48, 40], shapes: [{ d: "M29 16H67V36C67 50 58 58 48 58C38 58 29 50 29 36Z", fill: WHITE, motif: GOLD }] },
      { name: "star", pivot: [48, 36], hover: { r: spin(72), s: pop(14, 130) }, shapes: [{ d: star(48, 36, 11.5), fill: GOLD, sw: 2.8 }] },
    ],
  },
];

mkdirSync(OUT, { recursive: true });
for (const icon of icons) {
  const data = buildIcon(icon);
  const file = join(OUT, `${icon.name}.json`);
  writeFileSync(file, JSON.stringify(data));
  console.log(`${icon.name}.json  ${(JSON.stringify(data).length / 1024).toFixed(1)} kB`);
}
