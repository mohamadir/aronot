"use client";

import { GOLD, GOLD_HOVER } from "@/lib/constants";
import type { ClosetConfig } from "@/lib/types";

interface ClosetPreviewProps {
  config: ClosetConfig;
  openDoors: Record<number, boolean>;
  toggleDoor: (index: number) => void;
  toggleAll: () => void;
}

function darken(hex: string, amt: number): string {
  const c = hex.replace("#", "");
  const r = Math.max(0, parseInt(c.substring(0, 2), 16) - amt);
  const g = Math.max(0, parseInt(c.substring(2, 4), 16) - amt);
  const b = Math.max(0, parseInt(c.substring(4, 6), 16) - amt);
  return `rgb(${r},${g},${b})`;
}

function lighten(hex: string, amt: number): string {
  const c = hex.replace("#", "");
  const r = Math.min(255, parseInt(c.substring(0, 2), 16) + amt);
  const g = Math.min(255, parseInt(c.substring(2, 4), 16) + amt);
  const b = Math.min(255, parseInt(c.substring(4, 6), 16) + amt);
  return `rgb(${r},${g},${b})`;
}

export default function ClosetPreview({
  config,
  openDoors,
  toggleDoor,
  toggleAll,
}: ClosetPreviewProps) {
  const allOpen =
    Object.values(openDoors).filter(Boolean).length === config.doors;

  const scaleW = config.width / 300;
  const scaleH = config.height / 240;
  const renderW = Math.min(420, 300 * scaleW);
  const renderH = Math.min(380, 300 * scaleH);
  const doorW = renderW / config.doors;

  const matColor = config.material.color;
  const interiorColor = darken(matColor, 20);
  const shelfColor = darken(matColor, 10);
  const sideColor = darken(matColor, 30);
  const isLightMaterial =
    matColor === "#F5F0EB" || matColor === "#EDE5D8";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        gap: 16,
      }}
    >
      {/* Open/Close all button */}
      <button
        onClick={toggleAll}
        style={{
          fontFamily: "var(--font-heebo), Heebo, sans-serif",
          fontSize: 13,
          fontWeight: 600,
          color: GOLD,
          background: "rgba(184,150,90,0.1)",
          border: "1px solid rgba(184,150,90,0.25)",
          borderRadius: 20,
          padding: "8px 20px",
          cursor: "pointer",
          transition: "all 0.3s",
          zIndex: 5,
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "rgba(184,150,90,0.2)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "rgba(184,150,90,0.1)")
        }
      >
        {allOpen ? "סגור את כל הדלתות ✕" : "פתח את כל הדלתות ◨"}
      </button>

      {/* Closet body */}
      <div
        style={{
          width: renderW + 16,
          height: renderH + 8,
          position: "relative",
        }}
      >
        {/* ── Interior back wall ── */}
        <div
          style={{
            position: "absolute",
            top: 4,
            left: 8,
            right: 8,
            bottom: 4,
            background: interiorColor,
            borderRadius: 3,
            boxShadow: "inset 0 2px 20px rgba(0,0,0,0.25)",
            transition: "background 0.5s ease",
            overflow: "hidden",
          }}
        >
          {/* Interior sections */}
          <div
            style={{ display: "flex", height: "100%", position: "relative" }}
          >
            {config.sections.map((sec, si) => {
              const drawerTotalH = sec.drawers * 32;
              const railZoneH = sec.rail ? 35 : 0;
              const shelfZoneTop = railZoneH;
              const shelfZoneBottom =
                100 - (drawerTotalH / renderH) * 100;
              const shelfSpaceH = shelfZoneBottom - shelfZoneTop;

              return (
                <div
                  key={si}
                  style={{
                    flex: 1,
                    borderLeft:
                      si > 0 ? `2px solid ${sideColor}` : "none",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Interior side shadow */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(90deg, rgba(0,0,0,0.06) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.06) 100%)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Hanging rail */}
                  {sec.rail && (
                    <div
                      style={{
                        position: "absolute",
                        top: "6%",
                        left: "8%",
                        right: "8%",
                        height: "30%",
                      }}
                    >
                      {/* Rail bar */}
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: 6,
                          background: `linear-gradient(180deg, #D4B87A, ${GOLD}, #A07A42)`,
                          borderRadius: 3,
                          boxShadow:
                            "0 2px 6px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.2) inset",
                        }}
                      />
                      {/* Rail brackets */}
                      {([2, "calc(100% - 6px)"] as const).map((lr, bi) => (
                        <div
                          key={bi}
                          style={{
                            position: "absolute",
                            top: -4,
                            left: typeof lr === "number" ? lr : undefined,
                            right:
                              typeof lr !== "number" ? 2 : undefined,
                            width: 4,
                            height: 14,
                            borderRadius: 2,
                            background: `linear-gradient(180deg, #C0A060, ${GOLD_HOVER})`,
                          }}
                        />
                      ))}
                      {/* Hangers */}
                      {Array.from({
                        length: Math.max(2, Math.floor(doorW / 18)),
                      }).map((_, hi) => {
                        const hangerCount = Math.max(
                          2,
                          Math.floor(doorW / 18)
                        );
                        const hx = ((hi + 1) / (hangerCount + 1)) * 100;
                        return (
                          <div
                            key={hi}
                            style={{
                              position: "absolute",
                              top: 6,
                              left: `${hx}%`,
                              width: 1,
                              height: "60%",
                              background: "rgba(0,0,0,0.12)",
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                bottom: 0,
                                left: -4,
                                width: 9,
                                height: 5,
                                borderBottom: "2px solid rgba(0,0,0,0.1)",
                                borderRadius: "0 0 4px 4px",
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Shelves */}
                  {Array.from({ length: sec.shelves }).map((_, shi) => {
                    const pct =
                      shelfZoneTop +
                      (shelfSpaceH / (sec.shelves + 1)) * (shi + 1);
                    return (
                      <div
                        key={shi}
                        style={{
                          position: "absolute",
                          left: 3,
                          right: 3,
                          top: `${Math.min(pct, 92)}%`,
                          height: 5,
                          background: `linear-gradient(180deg, ${lighten(matColor, 5)}, ${shelfColor})`,
                          borderRadius: 1,
                          boxShadow:
                            "0 2px 4px rgba(0,0,0,0.15), 0 -1px 0 rgba(255,255,255,0.1) inset",
                          transition: "all 0.4s ease",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 1,
                            background: "rgba(255,255,255,0.15)",
                            borderRadius: "1px 1px 0 0",
                          }}
                        />
                      </div>
                    );
                  })}

                  {/* Drawers */}
                  {Array.from({ length: sec.drawers }).map((_, di) => (
                    <div
                      key={di}
                      style={{
                        position: "absolute",
                        left: 4,
                        right: 4,
                        bottom: di * 32 + 4,
                        height: 28,
                        background: `linear-gradient(180deg, ${lighten(matColor, 8)}, ${matColor})`,
                        border: `1px solid ${darken(matColor, 15)}`,
                        borderRadius: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow:
                          "0 2px 6px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.15)",
                        transition: "all 0.4s ease",
                      }}
                    >
                      {/* Drawer handle */}
                      <div
                        style={{
                          width: Math.min(28, doorW * 0.35),
                          height: 4,
                          borderRadius: 2,
                          background: `linear-gradient(90deg, #C0A060, ${GOLD}, #C0A060)`,
                          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 2,
                          right: 2,
                          height: 1,
                          background: "rgba(0,0,0,0.08)",
                        }}
                      />
                    </div>
                  ))}

                  {/* Empty section label */}
                  {sec.shelves === 0 &&
                    sec.drawers === 0 &&
                    !sec.rail && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 11,
                          color: "rgba(0,0,0,0.15)",
                          fontFamily: "var(--font-heebo), Heebo, sans-serif",
                        }}
                      >
                        ריק
                      </div>
                    )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Outer frame ── */}
        {/* Top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 4,
            right: 4,
            height: 6,
            background: `linear-gradient(180deg, ${lighten(matColor, 10)}, ${matColor})`,
            borderRadius: "4px 4px 0 0",
            boxShadow: "0 -1px 4px rgba(0,0,0,0.1)",
            zIndex: 3,
            transition: "background 0.5s ease",
          }}
        />
        {/* Bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 4,
            right: 4,
            height: 6,
            background: `linear-gradient(0deg, ${darken(matColor, 5)}, ${matColor})`,
            borderRadius: "0 0 4px 4px",
            zIndex: 3,
            transition: "background 0.5s ease",
          }}
        />
        {/* Left side */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 8,
            bottom: 0,
            background: `linear-gradient(90deg, ${darken(matColor, 15)}, ${matColor})`,
            borderRadius: "4px 0 0 4px",
            zIndex: 3,
            transition: "background 0.5s ease",
          }}
        />
        {/* Right side */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 8,
            bottom: 0,
            background: `linear-gradient(270deg, ${darken(matColor, 15)}, ${matColor})`,
            borderRadius: "0 4px 4px 0",
            zIndex: 3,
            transition: "background 0.5s ease",
          }}
        />

        {/* ── Doors ── */}
        {Array.from({ length: config.doors }).map((_, di) => {
          const isOpen = !!openDoors[di];
          const isEven = di % 2 === 0;
          const doorWidthPx = renderW / config.doors;
          const leftPos = 8 + di * doorWidthPx;

          return (
            <div
              key={di}
              onClick={() => toggleDoor(di)}
              style={{
                position: "absolute",
                top: 6,
                bottom: 6,
                left: leftPos,
                width: doorWidthPx,
                zIndex: 4,
                cursor: "pointer",
                overflow: "hidden",
                transformOrigin: isEven ? "right center" : "left center",
                transform: isOpen ? "scaleX(0.12)" : "scaleX(1)",
                opacity: isOpen ? 0.7 : 1,
                transition:
                  "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease",
              }}
            >
              {/* Door face */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(135deg, ${lighten(matColor, 12)}, ${matColor}, ${darken(matColor, 8)})`,
                  borderRadius: 2,
                  border: `1px solid ${darken(matColor, 20)}`,
                  boxShadow: isOpen
                    ? "2px 0 12px rgba(0,0,0,0.4)"
                    : "0 1px 4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)",
                  transition: "box-shadow 0.6s ease, background 0.5s ease",
                  overflow: "hidden",
                }}
              >
                {/* Panel inset border */}
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    left: 6,
                    right: 6,
                    bottom: 10,
                    border: `1px solid rgba(${isLightMaterial ? "0,0,0,0.06" : "255,255,255,0.08"})`,
                    borderRadius: 2,
                    pointerEvents: "none",
                  }}
                />
                {/* Door handle */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    ...(isEven ? { left: 8 } : { right: 8 }),
                    width: 4,
                    height: 28,
                    background: `linear-gradient(180deg, #D4B87A, ${GOLD}, #A07A42)`,
                    borderRadius: 2,
                    transform: "translateY(-50%)",
                    boxShadow:
                      "0 1px 4px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.3)",
                  }}
                />
                {/* Door shine */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(120deg, rgba(255,255,255,0.1) 0%, transparent 35%, transparent 65%, rgba(0,0,0,0.04) 100%)",
                    pointerEvents: "none",
                  }}
                />
                {/* Click hint */}
                {!isOpen && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 10,
                      left: "50%",
                      transform: "translateX(-50%)",
                      fontSize: 10,
                      color: `rgba(${isLightMaterial ? "0,0,0,0.2" : "255,255,255,0.25"})`,
                      fontFamily: "var(--font-heebo), Heebo, sans-serif",
                      fontWeight: 400,
                      whiteSpace: "nowrap",
                    }}
                  >
                    👆 פתח
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Dimension label */}
      <div
        style={{
          fontFamily: "var(--font-heebo), Heebo, sans-serif",
          fontSize: 13,
          color: "rgba(255,255,255,0.4)",
          fontWeight: 300,
          textAlign: "center",
          marginTop: 4,
        }}
      >
        {config.width} × {config.height} × {config.depth} ס״מ
      </div>
    </div>
  );
}
