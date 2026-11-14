"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { Glyph, type GlyphName } from "@/components/ui/Glyph";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/cn";
import { completeActivity } from "@/lib/progress";

const W = 1200;
const H = 800;
const PAPER = "#FFFFFF";
const SAVE_KEY = "jamool.art.v1";
const MAX_HISTORY = 12;

const palette = [
  { hex: "#1F2A5C", name: "كحلي" },
  { hex: "#F0563A", name: "مرجاني" },
  { hex: "#F5A63A", name: "برتقالي" },
  { hex: "#FFC43D", name: "أصفر" },
  { hex: "#5DAA3A", name: "أخضر" },
  { hex: "#1E9E96", name: "فيروزي" },
  { hex: "#2F7BEA", name: "أزرق" },
  { hex: "#8D6BE8", name: "بنفسجي" },
  { hex: "#F58FB4", name: "وردي" },
  { hex: "#8A4B22", name: "بني" },
  { hex: "#111111", name: "أسود" },
];
const brushSizes = [
  { px: 8, name: "رفيعة" },
  { px: 20, name: "متوسطة" },
  { px: 42, name: "عريضة" },
];

type Tool = "brush" | "eraser";

function ToolButton({ icon, label, active, ...rest }: { icon: GlyphName; label: string; active?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      {...rest}
      className={cn(
        "grid size-12 shrink-0 place-items-center rounded-full transition-all duration-150 active:scale-90 disabled:opacity-35",
        active ? "bg-navy text-cream shadow-[0_4px_0_#0e1535]" : "bg-white text-ink ring-2 ring-navy/10 hover:bg-accent-soft",
      )}
    >
      <Glyph name={icon} />
    </button>
  );
}

export function ArtStudio() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const undoStack = useRef<ImageData[]>([]);
  const redoStack = useRef<ImageData[]>([]);
  const [tool, setTool] = useState<Tool>("brush");
  const [color, setColor] = useState(palette[1].hex);
  const [size, setSize] = useState(brushSizes[1].px);
  const [history, setHistory] = useState({ undo: 0, redo: 0 });
  const [confirmClear, setConfirmClear] = useState(false);
  const toast = useToast();

  const ctx = () => canvasRef.current!.getContext("2d", { willReadFrequently: true })!;
  const syncHistory = () => setHistory({ undo: undoStack.current.length, redo: redoStack.current.length });

  const fillPaper = useCallback(() => {
    const c = ctx();
    c.fillStyle = PAPER;
    c.fillRect(0, 0, W, H);
  }, []);

  // Start with white paper, or the drawing saved earlier on this device.
  useEffect(() => {
    fillPaper();
    try {
      const saved = window.localStorage.getItem(SAVE_KEY);
      if (!saved) return;
      const img = new Image();
      img.onload = () => ctx().drawImage(img, 0, 0, W, H);
      img.src = saved;
    } catch {
      /* no saved drawing */
    }
  }, [fillPaper]);

  const snapshot = () => {
    undoStack.current.push(ctx().getImageData(0, 0, W, H));
    if (undoStack.current.length > MAX_HISTORY) undoStack.current.shift();
    redoStack.current = [];
    syncHistory();
  };

  const undo = useCallback(() => {
    const prev = undoStack.current.pop();
    if (!prev) return;
    redoStack.current.push(ctx().getImageData(0, 0, W, H));
    ctx().putImageData(prev, 0, 0);
    syncHistory();
  }, []);

  const redo = useCallback(() => {
    const next = redoStack.current.pop();
    if (!next) return;
    undoStack.current.push(ctx().getImageData(0, 0, W, H));
    ctx().putImageData(next, 0, 0);
    syncHistory();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.ctrlKey || e.metaKey) || e.key.toLowerCase() !== "z") return;
      e.preventDefault();
      if (e.shiftKey) redo();
      else undo();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [undo, redo]);

  const point = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * W, y: ((e.clientY - r.top) / r.height) * H };
  };

  const stroke = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    const c = ctx();
    c.strokeStyle = tool === "eraser" ? PAPER : color;
    c.lineWidth = tool === "eraser" ? size * 1.6 : size;
    c.lineCap = "round";
    c.lineJoin = "round";
    c.beginPath();
    c.moveTo(from.x, from.y);
    c.lineTo(to.x, to.y);
    c.stroke();
  };

  function onDown(e: React.PointerEvent<HTMLCanvasElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    snapshot();
    drawing.current = true;
    const p = point(e);
    last.current = p;
    stroke(p, { x: p.x + 0.01, y: p.y + 0.01 });
  }

  function onMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current || !last.current) return;
    const p = point(e);
    stroke(last.current, p);
    last.current = p;
  }

  function onUp() {
    drawing.current = false;
    last.current = null;
  }

  function clear() {
    snapshot();
    fillPaper();
    setConfirmClear(false);
  }

  function save() {
    try {
      window.localStorage.setItem(SAVE_KEY, canvasRef.current!.toDataURL("image/png"));
      const first = completeActivity("art:saved", 2);
      toast(first ? "حُفظت لوحتك! نجمتان جديدتان" : "حُفظت لوحتك على هذا الجهاز");
    } catch {
      toast("تعذّر الحفظ على هذا الجهاز. جرّب تنزيل اللوحة.", "info");
    }
  }

  function download() {
    const a = document.createElement("a");
    a.href = canvasRef.current!.toDataURL("image/png");
    a.download = "jamool-drawing.png";
    a.click();
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_auto]">
      <div className="order-2 min-w-0 lg:order-1">
        <div className="overflow-hidden rounded-xl bg-white shadow-lift ring-4 ring-accent-soft">
          <canvas
            ref={canvasRef}
            width={W}
            height={H}
            role="img"
            aria-label="لوحة الرسم. ارسم بالإصبع أو الفأرة."
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            className={cn("block aspect-[3/2] w-full touch-none", tool === "eraser" ? "cursor-cell" : "cursor-crosshair")}
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            <ToolButton icon="undo" label="تراجع" onClick={undo} disabled={history.undo === 0} />
            <ToolButton icon="redo" label="إعادة" onClick={redo} disabled={history.redo === 0} />
            <ToolButton icon="trash" label="مسح اللوحة" onClick={() => setConfirmClear(true)} />
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="soft" onClick={download}>
              <Glyph name="download" size={20} />
              تنزيل
            </Button>
            <Button onClick={save}>
              <Glyph name="save" size={20} />
              حفظ لوحتي
            </Button>
          </div>
        </div>
      </div>

      <div className="order-1 flex min-w-0 flex-col gap-4 rounded-xl bg-accent-soft p-4 lg:order-2 lg:w-52">
        <div>
          <p className="mb-2 font-display text-sm font-bold text-accent-text">الأداة</p>
          <div className="flex gap-2">
            <ToolButton icon="brush" label="فرشاة" active={tool === "brush"} aria-pressed={tool === "brush"} onClick={() => setTool("brush")} />
            <ToolButton icon="eraser" label="ممحاة" active={tool === "eraser"} aria-pressed={tool === "eraser"} onClick={() => setTool("eraser")} />
          </div>
        </div>
        <div>
          <p className="mb-2 font-display text-sm font-bold text-accent-text">الحجم</p>
          <div className="flex gap-2" role="radiogroup" aria-label="حجم الفرشاة">
            {brushSizes.map((b) => (
              <button
                key={b.px}
                type="button"
                role="radio"
                aria-checked={size === b.px}
                aria-label={b.name}
                onClick={() => setSize(b.px)}
                className={cn("grid size-12 place-items-center rounded-full bg-white transition-all", size === b.px ? "ring-4 ring-navy" : "ring-2 ring-navy/10")}
              >
                <span className="rounded-full bg-navy" style={{ width: Math.max(6, b.px * 0.6), height: Math.max(6, b.px * 0.6) }} />
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 font-display text-sm font-bold text-accent-text">اللون</p>
          <div className="flex flex-wrap gap-2.5 p-1 lg:grid lg:grid-cols-3" role="radiogroup" aria-label="لون الفرشاة">
            {palette.map((p) => {
              const active = color === p.hex && tool === "brush";
              return (
                <button
                  key={p.hex}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  aria-label={p.name}
                  title={p.name}
                  onClick={() => {
                    setColor(p.hex);
                    setTool("brush");
                  }}
                  style={{ background: p.hex }}
                  className={cn("size-12 shrink-0 rounded-full shadow-[0_3px_0_rgb(31_42_92/0.18)] transition-transform duration-150 active:scale-90", active ? "scale-110 ring-4 ring-white outline-3 outline-navy" : "ring-2 ring-white")}
                />
              );
            })}
          </div>
        </div>
      </div>

      <Dialog open={confirmClear} onClose={() => setConfirmClear(false)} title="مسح اللوحة">
        <h2 className="pe-12 text-2xl">هل تريد مسح اللوحة؟</h2>
        <p className="mt-2 text-ink-soft">يمكنك التراجع عن المسح بزر «تراجع».</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="navy" onClick={clear}>
            نعم، امسحها
          </Button>
          <Button variant="soft" onClick={() => setConfirmClear(false)}>
            لا، أبقِها
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
