"use client";

import type { KitchenConfig } from "@/lib/types";

function darken(hex: string, amt: number): string {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, (n >> 16) - amt);
  const g = Math.max(0, ((n >> 8) & 0xff) - amt);
  const b = Math.max(0, (n & 0xff) - amt);
  return "#" + [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("");
}

function lighten(hex: string, amt: number): string {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, (n >> 16) + amt);
  const g = Math.min(255, ((n >> 8) & 0xff) + amt);
  const b = Math.min(255, (n & 0xff) + amt);
  return "#" + [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("");
}

export default function KitchenPreview({ config }: { config: KitchenConfig }) {
  const mat = config.material.color;
  const ctop = config.countertop.color;
  const border = darken(mat, 28);
  const handle = darken(mat, 48);
  const inset = lighten(mat, 14);

  // Layout constants
  const vw = 700;
  const vh = 380;
  const px = 30;
  const iw = vw - px * 2; // 640

  const upperY = 28;
  const upperH = 110;
  const bsY = upperY + upperH;
  const bsH = 22; // backsplash
  const ctY = bsY + bsH;
  const ctH = 16; // countertop slab
  const lY = ctY + ctH;
  const lH = 158; // lower cabinets
  const floorY = lY + lH;

  const uCount = Math.max(1, config.upperSections);
  const uW = iw / uCount;

  const lSections = config.lowerSections;
  const lCount = Math.max(1, lSections.length);
  const lW = iw / lCount;

  return (
    <svg
      viewBox={`0 0 ${vw} ${vh}`}
      width="100%"
      height="100%"
      style={{ display: "block", borderRadius: 20, overflow: "hidden" }}
    >
      {/* ── UPPER CABINETS ── */}
      {Array.from({ length: uCount }, (_, i) => {
        const x = px + i * uW;
        return (
          <g key={`u${i}`}>
            <rect
              x={x + 1} y={upperY}
              width={uW - 2} height={upperH}
              fill={mat} stroke={border} strokeWidth={1.5} rx={3}
            />
            {/* inset panel */}
            <rect
              x={x + 7} y={upperY + 7}
              width={uW - 14} height={upperH - 14}
              fill={inset} stroke={border} strokeWidth={0.8} rx={2}
            />
            {/* horizontal bar handle */}
            <rect
              x={x + uW / 2 - 18} y={upperY + upperH - 20}
              width={36} height={5} rx={2.5}
              fill={handle}
            />
          </g>
        );
      })}

      {/* ── BACKSPLASH ── */}
      <rect x={px} y={bsY} width={iw} height={bsH} fill={lighten(ctop, 32)} />
      {Array.from({ length: Math.floor(iw / 42) }, (_, i) => (
        <line
          key={`bsv${i}`}
          x1={px + (i + 1) * 42} y1={bsY}
          x2={px + (i + 1) * 42} y2={bsY + bsH}
          stroke={darken(ctop, 12)} strokeWidth={0.5}
        />
      ))}
      <line x1={px} y1={bsY + bsH / 2} x2={px + iw} y2={bsY + bsH / 2}
        stroke={darken(ctop, 12)} strokeWidth={0.5} />

      {/* ── COUNTERTOP ── */}
      <rect
        x={px - 6} y={ctY}
        width={iw + 12} height={ctH}
        fill={ctop} rx={2}
      />
      {/* highlight edge */}
      <rect
        x={px - 6} y={ctY}
        width={iw + 12} height={4}
        fill={lighten(ctop, 22)} rx={2}
      />

      {/* ── LOWER CABINETS ── */}
      {lSections.map((sec, i) => {
        const x = px + i * lW;

        if (sec.isAppliance) {
          return (
            <g key={`l${i}`}>
              <rect
                x={x + 1} y={lY}
                width={lW - 2} height={lH}
                fill={darken(mat, 8)} stroke={border} strokeWidth={1.5} rx={3}
              />
              {/* oven door */}
              <rect
                x={x + 10} y={lY + 12}
                width={lW - 20} height={lH - 24}
                fill={darken(mat, 22)} stroke={border} strokeWidth={1} rx={3}
              />
              {/* oven window */}
              <rect
                x={x + 18} y={lY + 28}
                width={lW - 36} height={lH - 58}
                fill="rgba(20,20,20,0.75)" stroke="rgba(0,0,0,0.2)" strokeWidth={0.8} rx={2}
              />
              {/* grill lines */}
              {Array.from({ length: 3 }, (_, g) => (
                <line
                  key={g}
                  x1={x + 22} y1={lY + 36 + g * 14}
                  x2={x + lW - 22} y2={lY + 36 + g * 14}
                  stroke="rgba(255,255,255,0.08)" strokeWidth={1.5}
                />
              ))}
              {/* handle */}
              <rect
                x={x + 14} y={lY + 17}
                width={lW - 28} height={5} rx={2.5}
                fill={handle}
              />
            </g>
          );
        }

        const drawers = Math.max(1, sec.drawers);
        const dH = (lH - 4) / drawers;

        return (
          <g key={`l${i}`}>
            <rect
              x={x + 1} y={lY}
              width={lW - 2} height={lH}
              fill={mat} stroke={border} strokeWidth={1.5} rx={3}
            />
            {Array.from({ length: drawers }, (_, d) => {
              const dy = lY + 2 + d * dH;
              return (
                <g key={d}>
                  <rect
                    x={x + 6} y={dy + 4}
                    width={lW - 12} height={dH - 8}
                    fill={inset} stroke={border} strokeWidth={0.8} rx={2}
                  />
                  <rect
                    x={x + lW / 2 - 15} y={dy + dH / 2 - 2.5}
                    width={30} height={5} rx={2.5}
                    fill={handle}
                  />
                </g>
              );
            })}
          </g>
        );
      })}

      {/* ── FLOOR SHADOW ── */}
      <rect
        x={px - 10} y={floorY}
        width={iw + 20} height={5}
        fill="rgba(0,0,0,0.18)" rx={2}
      />
    </svg>
  );
}
