"use client";

import { useState, useRef } from "react";
import GoldButton from "@/components/ui/GoldButton";
import { GOLD, DARK, BG, MUTED, MATERIALS, COUNTERTOPS, WHATSAPP_NUMBER } from "@/lib/constants";

/* ── types ───────────────────────────────────────────────────── */

type EType = "upper-single" | "upper-double" | "lower-drawers" | "lower-door" | "appliance" | "sink";
type Rail = "upper" | "lower";
interface El { id: string; type: EType; }

/* ── catalog ─────────────────────────────────────────────────── */

const CAT: Record<EType, { label: string; sub: string; rail: Rail; cm: number }> = {
  "upper-single":  { label: "ארון עליון",  sub: "דלת אחת",   rail: "upper", cm: 40 },
  "upper-double":  { label: "ארון עליון",  sub: "דלתיים",    rail: "upper", cm: 80 },
  "lower-drawers": { label: "מגירות",      sub: "2–3 שורות", rail: "lower", cm: 40 },
  "lower-door":    { label: "ארון תחתון", sub: "דלת",        rail: "lower", cm: 40 },
  "appliance":     { label: "מכשיר",       sub: "תנור/מדיח",  rail: "lower", cm: 60 },
  "sink":          { label: "כיור",        sub: "עם ארון",   rail: "lower", cm: 80 },
};

const uid = () => Math.random().toString(36).slice(2, 8);
const isWide = (t: EType) => t === "upper-double" || t === "sink";

/* ── color helpers ───────────────────────────────────────────── */

function dk(hex: string, n: number) {
  const v = parseInt(hex.slice(1), 16);
  return "#" + [(v >> 16) - n, ((v >> 8) & 0xff) - n, (v & 0xff) - n]
    .map(c => Math.max(0, c).toString(16).padStart(2, "0")).join("");
}
function lt(hex: string, n: number) {
  const v = parseInt(hex.slice(1), 16);
  return "#" + [(v >> 16) + n, ((v >> 8) & 0xff) + n, (v & 0xff) + n]
    .map(c => Math.min(255, c).toString(16).padStart(2, "0")).join("");
}

/* ── layout constants ────────────────────────────────────────── */

const UNIT = 88;      // px ≈ 40 cm
const UPPER_H = 108;
const LOWER_H = 128;

const elW = (t: EType) => isWide(t) ? UNIT * 2 : UNIT;
const elH = (rail: Rail) => rail === "upper" ? UPPER_H : LOWER_H;

/* ── SVG element icon ────────────────────────────────────────── */

function ElSvg({ type, mat, scale = 1 }: { type: EType; mat: string; scale?: number }) {
  const bw = elW(type);
  const bh = elH(CAT[type].rail);
  const w = Math.round(bw * scale);
  const h = Math.round(bh * scale);
  const bdr = dk(mat, 28);
  const pan = lt(mat, 12);
  const hdl = dk(mat, 46);
  const p = 4;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${bw} ${bh}`} style={{ display: "block", flexShrink: 0 }}>
      {type === "upper-single" && <>
        <rect x={p} y={p} width={bw - 2*p} height={bh - 2*p} fill={mat} stroke={bdr} strokeWidth={1.5} rx={3} />
        <rect x={p+6} y={p+6} width={bw-2*p-12} height={bh-2*p-12} fill={pan} stroke={bdr} strokeWidth={0.8} rx={2} />
        <rect x={bw/2-12} y={bh-14} width={24} height={5} rx={2.5} fill={hdl} />
      </>}

      {type === "upper-double" && (() => {
        const hw = (bw - 12) / 2;
        return <>
          <rect x={p} y={p} width={hw} height={bh-2*p} fill={mat} stroke={bdr} strokeWidth={1.5} rx={3} />
          <rect x={p+6} y={p+6} width={hw-12} height={bh-2*p-12} fill={pan} stroke={bdr} strokeWidth={0.8} rx={2} />
          <rect x={hw/2-8} y={bh-14} width={16} height={5} rx={2.5} fill={hdl} />
          <rect x={hw+8} y={p} width={hw} height={bh-2*p} fill={mat} stroke={bdr} strokeWidth={1.5} rx={3} />
          <rect x={hw+14} y={p+6} width={hw-12} height={bh-2*p-12} fill={pan} stroke={bdr} strokeWidth={0.8} rx={2} />
          <rect x={hw+8+hw/2-8} y={bh-14} width={16} height={5} rx={2.5} fill={hdl} />
        </>;
      })()}

      {type === "lower-drawers" && (() => {
        const dh = Math.floor((bh - 2*p - 4) / 3);
        return <>{[0, 1, 2].map(i => (
          <g key={i}>
            <rect x={p} y={p+2+i*(dh+2)} width={bw-2*p} height={dh} fill={pan} stroke={bdr} strokeWidth={1} rx={2} />
            <rect x={bw/2-12} y={p+2+i*(dh+2)+dh/2-2.5} width={24} height={5} rx={2.5} fill={hdl} />
          </g>
        ))}</>;
      })()}

      {type === "lower-door" && <>
        <rect x={p} y={p} width={bw-2*p} height={bh-2*p} fill={mat} stroke={bdr} strokeWidth={1.5} rx={3} />
        <rect x={p+6} y={p+6} width={bw-2*p-12} height={bh-2*p-12} fill={pan} stroke={bdr} strokeWidth={0.8} rx={2} />
        <rect x={bw/2-12} y={bh-14} width={24} height={5} rx={2.5} fill={hdl} />
      </>}

      {type === "appliance" && <>
        <rect x={p} y={p} width={bw-2*p} height={bh-2*p} fill={dk(mat, 8)} stroke={bdr} strokeWidth={1.5} rx={3} />
        <rect x={p+4} y={p+4} width={bw-2*p-8} height={7} rx={3.5} fill={hdl} />
        <rect x={p+4} y={p+16} width={bw-2*p-8} height={bh-2*p-24} fill="rgba(10,10,10,0.78)" stroke={bdr} strokeWidth={0.8} rx={2} />
        {[0, 1, 2].map(i => (
          <line key={i} x1={p+8} y1={p+24+i*13} x2={bw-p-8} y2={p+24+i*13} stroke="rgba(255,255,255,0.07)" strokeWidth={1.5} />
        ))}
      </>}

      {type === "sink" && (() => {
        const hw = (bw - 16) / 2;
        return <>
          <rect x={p} y={30} width={bw-2*p} height={bh-34} fill={mat} stroke={bdr} strokeWidth={1.5} rx={3} />
          <rect x={p+6} y={35} width={hw} height={bh-47} fill="rgba(175,210,230,0.45)" stroke={bdr} strokeWidth={0.8} rx={2} />
          <rect x={hw+10} y={35} width={hw} height={bh-47} fill="rgba(175,210,230,0.45)" stroke={bdr} strokeWidth={0.8} rx={2} />
          <rect x={bw/2-5} y={8} width={10} height={22} fill={mat} stroke={bdr} strokeWidth={1} rx={3} />
          <rect x={bw/2-14} y={bh-14} width={28} height={5} rx={2.5} fill={hdl} />
        </>;
      })()}
    </svg>
  );
}

/* ── Drop slot ───────────────────────────────────────────────── */

function DropSlot({ rail, index, height, active, onOver, onDrop }: {
  rail: Rail; index: number; height: number; active: boolean;
  onOver(r: Rail, i: number): void;
  onDrop(r: Rail, i: number): void;
}) {
  return (
    <div
      onDragOver={e => { e.preventDefault(); e.stopPropagation(); onOver(rail, index); }}
      onDrop={e => { e.preventDefault(); e.stopPropagation(); onDrop(rail, index); }}
      style={{
        width: active ? 34 : 8,
        height,
        flexShrink: 0,
        borderRadius: 4,
        background: active ? `${GOLD}28` : "transparent",
        border: active ? `2px dashed ${GOLD}` : "2px dashed transparent",
        transition: "all 0.15s",
      }}
    />
  );
}

/* ── Rail ────────────────────────────────────────────────────── */

function KRail({ rail, els, mat, activeSlot, selectedId, draggingId,
  onSlotOver, onDrop, onDragStart, onDragEnd, onSelect, onDelete }: {
  rail: Rail; els: El[]; mat: string;
  activeSlot: { rail: Rail; index: number } | null;
  selectedId: string | null; draggingId: string | null;
  onSlotOver(r: Rail, i: number): void;
  onDrop(r: Rail, i: number): void;
  onDragStart(e: React.DragEvent, rail: Rail, idx: number, id: string): void;
  onDragEnd(): void;
  onSelect(id: string): void;
  onDelete(id: string): void;
}) {
  const h = elH(rail);

  return (
    <div style={{ marginBottom: 4 }}>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 6, fontWeight: 600, letterSpacing: "0.07em" }}>
        {rail === "upper" ? "ארונות עליונים" : "ארונות תחתונים"}
      </div>
      <div
        onDragOver={e => e.preventDefault()}
        style={{
          display: "flex",
          alignItems: "flex-end",
          minHeight: h + 20,
          padding: "8px 10px 10px",
          background: rail === "upper" ? "rgba(44,38,32,0.7)" : "rgba(28,26,24,0.65)",
          borderRadius: 12,
          border: "1px solid rgba(184,150,90,0.1)",
          overflowX: "auto",
        }}
      >
        {/* leading slot (always shown) */}
        <DropSlot
          rail={rail} index={0} height={h}
          active={activeSlot?.rail === rail && activeSlot?.index === 0}
          onOver={onSlotOver} onDrop={onDrop}
        />

        {els.length === 0
          ? (
            <div style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
              height: h, color: `${GOLD}60`, fontSize: 13, fontWeight: 500,
              border: `2px dashed ${GOLD}30`, borderRadius: 8, marginLeft: 4,
            }}>
              גררו פריט לכאן
            </div>
          )
          : els.map((el, i) => (
            <div key={el.id} style={{ display: "flex", alignItems: "flex-end" }}>
              <div
                draggable
                onDragStart={e => onDragStart(e, rail, i, el.id)}
                onDragEnd={onDragEnd}
                onClick={e => { e.stopPropagation(); onSelect(el.id); }}
                title={CAT[el.type].label}
                style={{
                  position: "relative",
                  cursor: "grab",
                  opacity: el.id === draggingId ? 0.25 : 1,
                  transition: "opacity 0.2s",
                  outline: el.id === selectedId ? `2px solid ${GOLD}` : "2px solid transparent",
                  outlineOffset: 2,
                  borderRadius: 4,
                }}
              >
                <ElSvg type={el.type} mat={mat} />

                {/* cm label */}
                <div style={{
                  position: "absolute", bottom: -16, left: 0, right: 0,
                  textAlign: "center", fontSize: 9, color: "rgba(255,255,255,0.25)",
                }}>
                  {CAT[el.type].cm} ס״מ
                </div>

                {/* delete button */}
                {el.id === selectedId && (
                  <button
                    onClick={e => { e.stopPropagation(); onDelete(el.id); }}
                    style={{
                      position: "absolute", top: -9, left: -9,
                      width: 20, height: 20, borderRadius: 10,
                      background: "#e53935", color: "#fff",
                      border: "none", fontSize: 13, fontWeight: 800,
                      cursor: "pointer", lineHeight: 1, zIndex: 20,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: "0 2px 6px rgba(229,57,53,0.5)",
                      fontFamily: "inherit",
                    }}
                  >×</button>
                )}
              </div>

              <DropSlot
                rail={rail} index={i + 1} height={h}
                active={activeSlot?.rail === rail && activeSlot?.index === i + 1}
                onOver={onSlotOver} onDrop={onDrop}
              />
            </div>
          ))
        }
      </div>
    </div>
  );
}

/* ── Palette card ────────────────────────────────────────────── */

function PCard({ type, mat, onDragStart, onDragEnd }: {
  type: EType; mat: string;
  onDragStart(e: React.DragEvent): void;
  onDragEnd(): void;
}) {
  const item = CAT[type];
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      style={{
        background: "#fff", borderRadius: 10, border: `1px solid ${MUTED}`,
        padding: "10px 8px 8px", cursor: "grab",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
        userSelect: "none", transition: "box-shadow 0.2s",
      }}
    >
      <ElSvg type={type} mat={mat} scale={0.5} />
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: DARK }}>{item.label}</div>
        <div style={{ fontSize: 10, color: "#999" }}>{item.sub}</div>
        <div style={{ fontSize: 10, color: GOLD, fontWeight: 600 }}>{item.cm} ס״מ</div>
      </div>
    </div>
  );
}

/* ── Color swatch picker ─────────────────────────────────────── */

function SwatchPicker<T extends { id: string; name: string; color: string }>({
  title, items, selected, onSelect,
}: {
  title: string;
  items: readonly T[];
  selected: T;
  onSelect(item: T): void;
}) {
  return (
    <div style={{ background: "#fff", borderRadius: 16, padding: 20, marginBottom: 12, border: "1px solid rgba(184,150,90,0.1)" }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#999", letterSpacing: "0.08em", marginBottom: 10 }}>
        {title}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 7 }}>
        {items.map(item => {
          const sel = selected.id === item.id;
          return (
            <button key={item.id} onClick={() => onSelect(item)} style={{
              padding: "7px 4px", borderRadius: 8, cursor: "pointer",
              border: sel ? `2px solid ${GOLD}` : `1px solid ${MUTED}`,
              background: sel ? `${GOLD}10` : "#fff",
              fontFamily: "inherit", textAlign: "center", transition: "all 0.2s",
            }}>
              <div style={{
                width: 26, height: 26, borderRadius: 6, margin: "0 auto 4px",
                background: item.color, border: "1px solid rgba(0,0,0,0.08)",
                boxShadow: sel ? `0 3px 8px ${item.color}66` : "none",
              }} />
              <div style={{ fontSize: 10, fontWeight: 500, color: sel ? DARK : "#888" }}>{item.name}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Main builder ────────────────────────────────────────────── */

export default function KitchenBuilder() {
  const [rails, setRails] = useState<{ upper: El[]; lower: El[] }>({
    upper: [
      { id: uid(), type: "upper-single" },
      { id: uid(), type: "upper-double" },
      { id: uid(), type: "upper-single" },
    ],
    lower: [
      { id: uid(), type: "lower-drawers" },
      { id: uid(), type: "appliance" },
      { id: uid(), type: "lower-door" },
    ],
  });
  const [mat,  setMat]  = useState(MATERIALS[0]);
  const [ctop, setCtop] = useState(COUNTERTOPS[0]);
  const [selectedId, setSel]  = useState<string | null>(null);
  const [draggingId, setDrId] = useState<string | null>(null);
  const [activeSlot, setSlot] = useState<{ rail: Rail; index: number } | null>(null);
  const payload = useRef<
    | { from: "palette"; type: EType }
    | { from: "canvas";  rail: Rail; index: number }
    | null
  >(null);

  const upperCm  = rails.upper.reduce((s, e) => s + CAT[e.type].cm, 0);
  const lowerCm  = rails.lower.reduce((s, e) => s + CAT[e.type].cm, 0);
  const totalCm  = Math.max(upperCm, lowerCm);

  /* ── drag start ── */

  function startPalette(e: React.DragEvent, type: EType) {
    payload.current = { from: "palette", type };
    e.dataTransfer.effectAllowed = "copy";
  }

  function startCanvas(e: React.DragEvent, rail: Rail, index: number, id: string) {
    payload.current = { from: "canvas", rail, index };
    e.dataTransfer.effectAllowed = "move";
    setDrId(id);
  }

  function endDrag() {
    setDrId(null);
    setSlot(null);
  }

  /* ── drop ── */

  function onSlotOver(rail: Rail, index: number) {
    setSlot({ rail, index });
  }

  function onDrop(targetRail: Rail, insertIndex: number) {
    const p = payload.current;
    if (!p) return;
    payload.current = null;
    setDrId(null);
    setSlot(null);

    setRails(prev => {
      const up = [...prev.upper];
      const lo = [...prev.lower];

      if (p.from === "palette") {
        const el: El = { id: uid(), type: p.type };
        (targetRail === "upper" ? up : lo).splice(insertIndex, 0, el);
      } else {
        const srcArr  = p.rail === "upper" ? up : lo;
        const destArr = targetRail === "upper" ? up : lo;
        const [el] = srcArr.splice(p.index, 1);
        if (!el) return prev;
        if (p.rail === targetRail) {
          const adj = insertIndex > p.index ? insertIndex - 1 : insertIndex;
          srcArr.splice(adj, 0, el);
        } else {
          destArr.splice(insertIndex, 0, el);
        }
      }

      return { upper: up, lower: lo };
    });
  }

  function deleteEl(id: string) {
    setRails(prev => ({
      upper: prev.upper.filter(e => e.id !== id),
      lower: prev.lower.filter(e => e.id !== id),
    }));
    setSel(null);
  }

  /* ── WhatsApp ── */

  function buildMsg() {
    const fmt = (els: El[]) =>
      els.length ? els.map(e => `${CAT[e.type].label} (${CAT[e.type].cm} ס"מ)`).join(", ") : "—";
    let msg = "שלום, אני מעוניין/ת במטבח בהתאמה אישית:\n";
    msg += `חומר ארונות: ${mat.name}\n`;
    msg += `משטח עבודה: ${ctop.name}\n`;
    msg += `ארונות עליונים: ${fmt(rails.upper)}\n`;
    msg += `ארונות תחתונים: ${fmt(rails.lower)}\n`;
    msg += `רוחב כולל משוער: ${totalCm} ס"מ\n\nאשמח לקבל הצעת מחיר. תודה!`;
    return encodeURIComponent(msg);
  }

  return (
    <div
      onClick={() => setSel(null)}
      style={{ background: BG, fontFamily: "var(--font-heebo), Heebo, sans-serif" }}
    >
      <div style={{
        maxWidth: 1400, margin: "0 auto", padding: "32px 24px",
        display: "grid", gridTemplateColumns: "272px 1fr",
        gap: 24, alignItems: "start",
      }}>

        {/* ── LEFT: palette + pickers ── */}
        <div style={{ position: "sticky", top: 88 }}>

          {/* Upper palette */}
          <div style={{ background: "#fff", borderRadius: 16, padding: 18, marginBottom: 12, border: "1px solid rgba(184,150,90,0.1)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#aaa", letterSpacing: "0.1em", marginBottom: 10 }}>
              ↑ ארונות עליונים
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {(["upper-single", "upper-double"] as EType[]).map(t => (
                <PCard key={t} type={t} mat={mat.color}
                  onDragStart={e => startPalette(e, t)}
                  onDragEnd={endDrag}
                />
              ))}
            </div>
          </div>

          {/* Lower palette */}
          <div style={{ background: "#fff", borderRadius: 16, padding: 18, marginBottom: 12, border: "1px solid rgba(184,150,90,0.1)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#aaa", letterSpacing: "0.1em", marginBottom: 10 }}>
              ↓ ארונות תחתונים
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {(["lower-drawers", "lower-door", "appliance", "sink"] as EType[]).map(t => (
                <PCard key={t} type={t} mat={mat.color}
                  onDragStart={e => startPalette(e, t)}
                  onDragEnd={endDrag}
                />
              ))}
            </div>
          </div>

          <SwatchPicker
            title="חומר ארונות"
            items={MATERIALS}
            selected={mat}
            onSelect={setMat}
          />
          <SwatchPicker
            title="משטח עבודה"
            items={COUNTERTOPS}
            selected={ctop}
            onSelect={setCtop}
          />

          {/* Summary */}
          <div style={{
            background: `linear-gradient(135deg, ${DARK} 0%, #2C2420 100%)`,
            borderRadius: 16, padding: 20,
            border: "1px solid rgba(184,150,90,0.2)",
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: GOLD, marginBottom: 12, letterSpacing: "0.06em" }}>
              סיכום
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>
              רוחב: <span style={{ color: "#fff", fontWeight: 700 }}>{totalCm} ס״מ</span>
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>
              עליונים: <span style={{ color: "#fff", fontWeight: 700 }}>{rails.upper.length}</span>
              {" "}תחתונים: <span style={{ color: "#fff", fontWeight: 700 }}>{rails.lower.length}</span>
            </div>
            <div style={{ marginTop: 14 }}>
              <GoldButton large green style={{ width: "100%" }}
                onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${buildMsg()}`, "_blank")}>
                💬 שלחו בוואטסאפ
              </GoldButton>
            </div>
          </div>
        </div>

        {/* ── RIGHT: canvas ── */}
        <div
          onClick={e => e.stopPropagation()}
          style={{
            background: "linear-gradient(160deg, #1e1c1a 0%, #242220 100%)",
            borderRadius: 20,
            border: "1px solid rgba(184,150,90,0.12)",
            padding: "24px 28px 36px",
          }}
        >
          <div style={{
            fontSize: 12, color: "rgba(255,255,255,0.22)", marginBottom: 20,
            textAlign: "center", letterSpacing: "0.03em",
          }}>
            גררו פריטים מהחלונית — לחצו פריט כדי לבחור ולמחוק
          </div>

          <KRail
            rail="upper" els={rails.upper} mat={mat.color}
            activeSlot={activeSlot} selectedId={selectedId} draggingId={draggingId}
            onSlotOver={onSlotOver} onDrop={onDrop}
            onDragStart={startCanvas} onDragEnd={endDrag}
            onSelect={id => setSel(id)}
            onDelete={deleteEl}
          />

          {/* Countertop */}
          <div style={{
            height: 16,
            background: ctop.color,
            margin: "10px -4px 10px",
            borderRadius: 2,
            boxShadow: `inset 0 -3px 0 ${dk(ctop.color, 20)}, 0 2px 8px rgba(0,0,0,0.3)`,
            position: "relative",
          }}>
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 4,
              background: "linear-gradient(180deg, rgba(255,255,255,0.28) 0%, transparent 100%)",
              borderRadius: "2px 2px 0 0",
            }} />
          </div>

          <KRail
            rail="lower" els={rails.lower} mat={mat.color}
            activeSlot={activeSlot} selectedId={selectedId} draggingId={draggingId}
            onSlotOver={onSlotOver} onDrop={onDrop}
            onDragStart={startCanvas} onDragEnd={endDrag}
            onSelect={id => setSel(id)}
            onDelete={deleteEl}
          />

          {/* Width rule */}
          {totalCm > 0 && (
            <div style={{
              marginTop: 28, display: "flex", alignItems: "center",
              gap: 10, color: "rgba(255,255,255,0.25)", fontSize: 12,
            }}>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
              <span>{totalCm} ס״מ</span>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .kb-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
