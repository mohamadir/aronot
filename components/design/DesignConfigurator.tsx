"use client";

import { useState } from "react";
import ClosetPreview from "./ClosetPreview";
import GoldButton from "@/components/ui/GoldButton";
import { GOLD, DARK, BG, MUTED, MATERIALS, WHATSAPP_NUMBER } from "@/lib/constants";
import type { ClosetConfig, SectionConfig } from "@/lib/types";

const DEFAULT_CONFIG: ClosetConfig = {
  width: 200,
  height: 240,
  depth: 60,
  doors: 3,
  material: MATERIALS[1],
  sections: [
    { shelves: 3, drawers: 0, rail: false },
    { shelves: 0, drawers: 2, rail: true },
    { shelves: 2, drawers: 1, rail: false },
  ],
};

/* ── Step badge ── */
function StepBadge({ num }: { num: number }) {
  return (
    <span
      style={{
        width: 28,
        height: 28,
        borderRadius: 8,
        background: GOLD,
        color: "#fff",
        fontSize: 14,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 900,
        flexShrink: 0,
      }}
    >
      {num}
    </span>
  );
}

/* ── Config slider ── */
function ConfigSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 500, color: "#888" }}>
          {label}
        </span>
        <span
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: DARK,
            direction: "ltr",
          }}
        >
          {value} ס״מ
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          background: `linear-gradient(to left, ${GOLD} ${pct}%, ${MUTED} ${pct}%)`,
        }}
      />
    </div>
  );
}

/* ── Section editor ── */
function SectionEditor({
  section,
  index,
  onUpdate,
}: {
  section: SectionConfig;
  index: number;
  onUpdate: (key: keyof SectionConfig, value: number | boolean) => void;
}) {
  const [open, setOpen] = useState(index === 0);

  function InlineCounter({
    label,
    value,
    max,
    onInc,
    onDec,
  }: {
    label: string;
    value: number;
    max: number;
    onInc: () => void;
    onDec: () => void;
  }) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 0",
          borderBottom: `1px solid ${MUTED}`,
        }}
      >
        <span style={{ fontSize: 14, color: "#666" }}>{label}</span>
        <div
          style={{ display: "flex", alignItems: "center", gap: 12 }}
        >
          <button
            onClick={onDec}
            disabled={value <= 0}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              border: `1px solid ${MUTED}`,
              background: "#fff",
              fontFamily: "inherit",
              fontSize: 18,
              cursor: value > 0 ? "pointer" : "default",
              color: value > 0 ? DARK : "#ccc",
              transition: "all 0.2s",
            }}
          >
            −
          </button>
          <span
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: DARK,
              minWidth: 24,
              textAlign: "center",
            }}
          >
            {value}
          </span>
          <button
            onClick={onInc}
            disabled={value >= max}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              border: `1px solid ${MUTED}`,
              background: value < max ? GOLD : "#fff",
              fontFamily: "inherit",
              fontSize: 18,
              cursor: value < max ? "pointer" : "default",
              color: value < max ? "#fff" : "#ccc",
              transition: "all 0.2s",
            }}
          >
            +
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        border: `1px solid ${open ? GOLD : MUTED}`,
        overflow: "hidden",
        transition: "border 0.3s",
        marginBottom: 8,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          padding: "14px 18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          background: "none",
          border: "none",
          fontFamily: "inherit",
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 600, color: DARK }}>
          מקטע {index + 1}
        </span>
        <span
          style={{
            fontSize: 12,
            color: GOLD,
            transform: open ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.3s",
          }}
        >
          ▼
        </span>
      </button>

      <div
        style={{
          maxHeight: open ? 300 : 0,
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)",
          padding: open ? "0 18px 14px" : "0 18px",
        }}
      >
        <InlineCounter
          label="מדפים"
          value={section.shelves}
          max={6}
          onInc={() => onUpdate("shelves", section.shelves + 1)}
          onDec={() => onUpdate("shelves", section.shelves - 1)}
        />
        <InlineCounter
          label="מגירות"
          value={section.drawers}
          max={4}
          onInc={() => onUpdate("drawers", section.drawers + 1)}
          onDec={() => onUpdate("drawers", section.drawers - 1)}
        />

        {/* Hanging rail toggle */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 0",
          }}
        >
          <span style={{ fontSize: 14, color: "#666" }}>מוט תלייה</span>
          <button
            onClick={() => onUpdate("rail", !section.rail)}
            aria-label="toggle rail"
            style={{
              width: 48,
              height: 26,
              borderRadius: 13,
              cursor: "pointer",
              background: section.rail ? GOLD : MUTED,
              transition: "background 0.3s",
              position: "relative",
              border: "none",
              padding: 0,
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                background: "#fff",
                position: "absolute",
                top: 2,
                right: section.rail ? 2 : 24,
                transition: "right 0.3s cubic-bezier(0.16,1,0.3,1)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main configurator ── */
export default function DesignConfigurator() {
  const [config, setConfig] = useState<ClosetConfig>(DEFAULT_CONFIG);
  const [openDoors, setOpenDoors] = useState<Record<number, boolean>>({});

  const allOpen =
    Object.values(openDoors).filter(Boolean).length === config.doors;

  const updateSection = (
    idx: number,
    key: keyof SectionConfig,
    val: number | boolean
  ) => {
    setConfig((prev) => {
      const sections = [...prev.sections];
      sections[idx] = { ...sections[idx], [key]: val };
      return { ...prev, sections };
    });
  };

  const setDoors = (n: number) => {
    setOpenDoors({});
    setConfig((prev) => ({
      ...prev,
      doors: n,
      sections: Array.from(
        { length: n },
        (_, i) =>
          prev.sections[i] || { shelves: 2, drawers: 0, rail: false }
      ),
    }));
  };

  const toggleDoor = (i: number) =>
    setOpenDoors((prev) => ({ ...prev, [i]: !prev[i] }));

  const toggleAll = () => {
    if (allOpen) {
      setOpenDoors({});
    } else {
      const all: Record<number, boolean> = {};
      for (let i = 0; i < config.doors; i++) all[i] = true;
      setOpenDoors(all);
    }
  };

  const buildWhatsAppMsg = () => {
    let msg = `שלום, אני מעוניין/ת בארון בהתאמה אישית:\n`;
    msg += `מידות: ${config.width}×${config.height}×${config.depth} ס"מ\n`;
    msg += `דלתות: ${config.doors}\n`;
    msg += `חומר: ${config.material.name}\n`;
    config.sections.forEach((s, i) => {
      msg += `מקטע ${i + 1}: ${s.shelves} מדפים, ${s.drawers} מגירות${
        s.rail ? ", מוט תלייה" : ""
      }\n`;
    });
    msg += `\nאשמח לקבל הצעת מחיר. תודה!`;
    return encodeURIComponent(msg);
  };

  const panelStyle: React.CSSProperties = {
    background: "#fff",
    borderRadius: 16,
    padding: 28,
    marginBottom: 16,
    border: "1px solid rgba(184,150,90,0.1)",
  };

  const stepTitleStyle: React.CSSProperties = {
    fontSize: 18,
    fontWeight: 700,
    color: DARK,
    marginBottom: 20,
    display: "flex",
    alignItems: "center",
    gap: 10,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: BG,
        paddingTop: 72,
        fontFamily: "var(--font-heebo), Heebo, sans-serif",
      }}
    >
      {/* Page header */}
      <div
        className="anim-fade-in"
        style={{
          background: DARK,
          padding: "48px 24px 40px",
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 500, color: GOLD, letterSpacing: 3 }}>
          כלי העיצוב האישי
        </span>
        <h1
          style={{
            fontSize: "clamp(28px,4vw,44px)",
            fontWeight: 900,
            color: "#fff",
            marginTop: 8,
          }}
        >
          עצבו את הארון <span style={{ color: GOLD }}>המושלם</span> שלכם
        </h1>
        <p
          style={{
            fontSize: 16,
            fontWeight: 300,
            color: "rgba(255,255,255,0.5)",
            marginTop: 8,
          }}
        >
          בחרו מידות, צבעים ותכולה — הארון מתעדכן בזמן אמת
        </p>
      </div>

      {/* Main grid */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "32px 24px",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.3fr)",
          gap: 32,
          alignItems: "start",
        }}
      >
        {/* ── Controls ── */}
        <div className="anim-slide-right">
          {/* Step 1: Dimensions */}
          <div style={panelStyle}>
            <h3 style={stepTitleStyle}>
              <StepBadge num={1} /> בחרו מידות
            </h3>
            <ConfigSlider
              label="רוחב"
              value={config.width}
              min={100}
              max={400}
              step={10}
              onChange={(v) => setConfig((p) => ({ ...p, width: v }))}
            />
            <ConfigSlider
              label="גובה"
              value={config.height}
              min={200}
              max={270}
              step={10}
              onChange={(v) => setConfig((p) => ({ ...p, height: v }))}
            />
            <ConfigSlider
              label="עומק"
              value={config.depth}
              min={50}
              max={70}
              step={5}
              onChange={(v) => setConfig((p) => ({ ...p, depth: v }))}
            />
          </div>

          {/* Step 2: Doors */}
          <div style={panelStyle}>
            <h3 style={stepTitleStyle}>
              <StepBadge num={2} /> מספר דלתות
            </h3>
            <div style={{ display: "flex", gap: 8 }}>
              {[2, 3, 4, 5, 6].map((n) => (
                <button
                  key={n}
                  onClick={() => setDoors(n)}
                  style={{
                    flex: 1,
                    padding: "14px 0",
                    borderRadius: 10,
                    border:
                      config.doors === n
                        ? `2px solid ${GOLD}`
                        : `1px solid ${MUTED}`,
                    background:
                      config.doors === n ? `${GOLD}15` : "#fff",
                    fontFamily: "inherit",
                    fontSize: 18,
                    fontWeight: 700,
                    color: config.doors === n ? GOLD : "#999",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Material */}
          <div style={panelStyle}>
            <h3 style={stepTitleStyle}>
              <StepBadge num={3} /> צבע וחומר
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 10,
              }}
            >
              {MATERIALS.map((m) => {
                const isSelected = config.material.id === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() =>
                      setConfig((p) => ({ ...p, material: m }))
                    }
                    style={{
                      padding: 12,
                      borderRadius: 12,
                      cursor: "pointer",
                      border: isSelected
                        ? `2px solid ${GOLD}`
                        : `1px solid ${MUTED}`,
                      background: isSelected ? `${GOLD}08` : "#fff",
                      textAlign: "center",
                      transition: "all 0.3s",
                      fontFamily: "inherit",
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        margin: "0 auto 8px",
                        background: m.color,
                        border: "1px solid rgba(0,0,0,0.08)",
                        boxShadow: isSelected
                          ? `0 4px 12px ${m.color}66`
                          : "none",
                        transition: "box-shadow 0.3s",
                      }}
                    />
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: isSelected ? DARK : "#888",
                      }}
                    >
                      {m.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Internals */}
          <div style={panelStyle}>
            <h3 style={stepTitleStyle}>
              <StepBadge num={4} /> עצבו את פנים הארון
            </h3>
            {config.sections.map((sec, i) => (
              <SectionEditor
                key={i}
                section={sec}
                index={i}
                onUpdate={(key, val) => updateSection(i, key, val)}
              />
            ))}
          </div>

          {/* Step 5: Summary & Send */}
          <div
            style={{
              background: `linear-gradient(135deg, ${DARK} 0%, #2C2420 100%)`,
              borderRadius: 16,
              padding: 28,
              border: "1px solid rgba(184,150,90,0.2)",
            }}
          >
            <h3 style={{ ...stepTitleStyle, color: "#fff" }}>
              <StepBadge num={5} /> סיכום ושליחה
            </h3>

            {/* Summary box */}
            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                borderRadius: 12,
                padding: 20,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                  fontSize: 14,
                }}
              >
                <div>
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>מידות:</span>
                  <div style={{ color: "#fff", fontWeight: 600, marginTop: 2 }}>
                    {config.width}×{config.height}×{config.depth} ס״מ
                  </div>
                </div>
                <div>
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>דלתות:</span>
                  <div style={{ color: "#fff", fontWeight: 600, marginTop: 2 }}>
                    {config.doors}
                  </div>
                </div>
                <div>
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>חומר:</span>
                  <div style={{ color: GOLD, fontWeight: 600, marginTop: 2 }}>
                    {config.material.name}
                  </div>
                </div>
                <div>
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>מקטעים:</span>
                  <div style={{ color: "#fff", fontWeight: 600, marginTop: 2 }}>
                    {config.sections.length}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <GoldButton
                large
                green
                style={{ width: "100%" }}
                onClick={() =>
                  window.open(
                    `https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMsg()}`,
                    "_blank"
                  )
                }
              >
                💬 שלחו את העיצוב בוואטסאפ
              </GoldButton>
              <GoldButton
                large
                outline
                style={{
                  width: "100%",
                  borderColor: "rgba(255,255,255,0.2)",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                שלחו טופס ונחזור אליכם
              </GoldButton>
            </div>
          </div>
        </div>

        {/* ── 3D Preview ── */}
        <div
          className="anim-slide-left"
          style={{ position: "sticky", top: 104 }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #2a2420 0%, #1a1a1a 100%)",
              borderRadius: 20,
              aspectRatio: "4/3",
              border: "1px solid rgba(184,150,90,0.12)",
              position: "relative",
            }}
          >
            {/* Dot-grid background */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0.04,
                backgroundImage:
                  "radial-gradient(circle, rgba(184,150,90,0.8) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
                pointerEvents: "none",
                borderRadius: 20,
              }}
            />

            <ClosetPreview
              config={config}
              openDoors={openDoors}
              toggleDoor={toggleDoor}
              toggleAll={toggleAll}
            />

            {/* Live badge */}
            <div
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(8px)",
                borderRadius: 20,
                padding: "6px 14px",
                fontSize: 12,
                color: GOLD,
                fontWeight: 500,
                border: "1px solid rgba(184,150,90,0.2)",
                pointerEvents: "none",
                fontFamily: "var(--font-heebo), Heebo, sans-serif",
              }}
            >
              תצוגה מקדימה בזמן אמת
            </div>

            {/* Interaction hint */}
            <div
              style={{
                position: "absolute",
                bottom: 16,
                left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(8px)",
                borderRadius: 20,
                padding: "8px 16px",
                fontSize: 12,
                color: "rgba(255,255,255,0.4)",
                fontWeight: 300,
                display: "flex",
                alignItems: "center",
                gap: 6,
                pointerEvents: "none",
                fontFamily: "var(--font-heebo), Heebo, sans-serif",
                whiteSpace: "nowrap",
              }}
            >
              👆 לחצו על דלת כדי לפתוח ולראות את הפנים
            </div>
          </div>
        </div>
      </div>

      {/* Responsive: stack on mobile */}
      <style>{`
        @media (max-width: 900px) {
          .design-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
