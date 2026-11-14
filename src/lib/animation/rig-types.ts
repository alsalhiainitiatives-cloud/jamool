/** One cut-out image placed on the rig canvas (pixels, top-left origin). */
export type RigPiece = { name: string; x: number; y: number; w: number; h: number };

/** A limb or body piece; `px`/`py` is its joint, relative to the piece. */
export type RigPart = RigPiece & { px: number; py: number };

export type Rig = {
  width: number;
  height: number;
  /** Public folder holding `<name>.webp` for every piece. */
  base: string;
  /** Back-to-front body pieces. */
  parts: RigPart[];
  /** Eye and eyebrow sets: a left and a right piece each. */
  face: Record<string, RigPiece[]>;
  mouths: Record<string, RigPiece>;
  /** Joints of the three groups: whole figure (ground), upper body (hips), head (neck). */
  pivots: { all: [number, number]; upper: [number, number]; head: [number, number] };
};

export const puppetAnimations = ["idle", "greeting", "talking", "happy", "jump", "thinking", "surprised", "sad", "sleeping", "walking"] as const;
export type PuppetAnimation = (typeof puppetAnimations)[number];

export const puppetAnimationLabels: Record<PuppetAnimation, string> = {
  idle: "هادئ",
  greeting: "تحية",
  talking: "يتكلم",
  happy: "فرحان",
  jump: "قفزة",
  thinking: "يفكّر",
  surprised: "متفاجئ",
  sad: "حاول مجددًا",
  sleeping: "نائم",
  walking: "يمشي",
};
