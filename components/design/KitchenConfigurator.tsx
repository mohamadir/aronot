"use client";

import { useState } from "react";
import KitchenPreview from "./KitchenPreview";
import GoldButton from "@/components/ui/GoldButton";
import {
  GOLD,
  DARK,
  BG,
  MUTED,
  MATERIALS,
  COUNTERTOPS,
  WHATSAPP_NUMBER,
} from "@/lib/constants";
import type { KitchenConfig, KitchenLowerSection } from "@/lib/types";

const DEFAULT: KitchenConfig = {
  width: 300,
  height: 240,
  depth: 60,
  material: MATERIALS[0],
  countertop: COUNTERTOPS[0],
  upperSections: 4,
  lowerSections: [
    { drawers: 2, isAppliance: false },
    { drawers: 0, isAppliance: true },
    { drawers: 2, isAppliance: false },
    { drawers: 3, isAppliance: false },
  ],
};

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
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: "#888" }}>{label}</span>
        <span style={{ fontSize: 16, fontWeight: 700, color: DARK, direction: "ltr" }}>
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

function LowerSectionEditor({
  section,
  index,
  onUpdate,
}: {
  section: KitchenLowerSection;
  index: number;
  onUpdate: (s: KitchenLowerSection) => void;
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 10,
        border: `1px solid ${section.isAppliance ? GOLD : MUTED}`,
        padding: "14px 16px",
        marginBottom: 8,
        transition: "border-color 0.3s",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 600, color: DARK }}>
          קטע {index + 1}
        </span>
      </div>

      {/* Appliance toggle */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: section.isAppliance ? 0 : 10,
          borderBottom: section.isAppliance ? "none" : `1px solid ${MUTED}`,
          marginBottom: section.isAppliance ? 0 : 10,
        }}
      >
        <span style={{ fontSize: 13, color: "#666" }}>מקום למכשיר (תנור / מדיח)</span>
        <button
          onClick={() =>
            onUpdate({
              isAppliance: !section.isAppliance,
              drawers: section.isAppliance ? 2 : 0,
            })
          }
          aria-label="toggle appliance"
          style={{
            width: 44,
            height: 24,
            borderRadius: 12,
            cursor: "pointer",
            background: section.isAppliance ? GOLD : MUTED,
            transition: "background 0.3s",
            position: "relative",
            border: "none",
            padding: 0,
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              background: "#fff",
              position: "absolute",
              top: 2,
              right: section.isAppliance ? 2 : 22,
              transition: "right 0.3s cubic-bezier(0.16,1,0.3,1)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            }}
          />
        </button>
      </div>

      {/* Drawers counter — hidden when appliance */}
      {!section.isAppliance && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13, color: "#666" }}>מגירות</span>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={() => onUpdate({ ...section, drawers: Math.max(1, section.drawers - 1) })}
              disabled={section.drawers <= 1}
              style={{
                width: 28,
                height: 28,
                borderRadius: 7,
                border: `1px solid ${MUTED}`,
                background: "#fff",
                fontSize: 16,
                cursor: section.drawers > 1 ? "pointer" : "default",
                color: section.drawers > 1 ? DARK : "#ccc",
                fontFamily: "inherit",
              }}
            >
              −
            </button>
            <span
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: DARK,
                minWidth: 20,
                textAlign: "center",
              }}
            >
              {section.drawers}
            </span>
            <button
              onClick={() => onUpdate({ ...section, drawers: Math.min(3, section.drawers + 1) })}
              disabled={section.drawers >= 3}
              style={{
                width: 28,
                height: 28,
                borderRadius: 7,
                border: `1px solid ${MUTED}`,
                background: section.drawers < 3 ? GOLD : "#fff",
                fontSize: 16,
                cursor: section.drawers < 3 ? "pointer" : "default",
                color: section.drawers < 3 ? "#fff" : "#ccc",
                fontFamily: "inherit",
              }}
            >
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function KitchenConfigurator() {
  const [config, setConfig] = useState<KitchenConfig>(DEFAULT);

  const setLowerCount = (n: number) => {
    setConfig((prev) => ({
      ...prev,
      lowerSections: Array.from(
        { length: n },
        (_, i) => prev.lowerSections[i] || { drawers: 2, isAppliance: false }
      ),
    }));
  };

  const updateLower = (idx: number, sec: KitchenLowerSection) => {
    setConfig((prev) => {
      const lowerSections = [...prev.lowerSections];
      lowerSections[idx] = sec;
      return { ...prev, lowerSections };
    });
  };

  const buildWhatsAppMsg = () => {
    const lDesc = config.lowerSections
      .map((s, i) => `קטע ${i + 1}: ${s.isAppliance ? "מקום מכשיר" : `${s.drawers} מגירות`}`)
      .join(", ");
    let msg = `שלום, אני מעוניין/ת במטבח בהתאמה אישית:\n`;
    msg += `מידות: ${config.width}×${config.height}×${config.depth} ס"מ\n`;
    msg += `חומר ארונות: ${config.material.name}\n`;
    msg += `משטח עבודה: ${config.countertop.name}\n`;
    msg += `ארונות עליונים: ${config.upperSections} קטעים\n`;
    msg += `ארונות תחתונים: ${lDesc}\n`;
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

  const sectionBtnStyle = (active: boolean): React.CSSProperties => ({
    flex: 1,
    padding: "14px 0",
    borderRadius: 10,
    border: active ? `2px solid ${GOLD}` : `1px solid ${MUTED}`,
    background: active ? `${GOLD}15` : "#fff",
    fontFamily: "inherit",
    fontSize: 18,
    fontWeight: 700,
    color: active ? GOLD : "#999",
    cursor: "pointer",
    transition: "all 0.3s",
  });

  return (
    <div style={{ background: BG, fontFamily: "var(--font-heebo), Heebo, sans-serif" }}>
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
        <div>
          {/* Step 1: Dimensions */}
          <div style={panelStyle}>
            <h3 style={stepTitleStyle}>
              <StepBadge num={1} /> מידות
            </h3>
            <ConfigSlider
              label="רוחב"
              value={config.width}
              min={150}
              max={500}
              step={10}
              onChange={(v) => setConfig((p) => ({ ...p, width: v }))}
            />
            <ConfigSlider
              label="גובה"
              value={config.height}
              min={200}
              max={260}
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

          {/* Step 2: Cabinet material */}
          <div style={panelStyle}>
            <h3 style={stepTitleStyle}>
              <StepBadge num={2} /> חומר הארונות
            </h3>
            <div
              style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}
            >
              {MATERIALS.map((m) => {
                const sel = config.material.id === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setConfig((p) => ({ ...p, material: m }))}
                    style={{
                      padding: 12,
                      borderRadius: 12,
                      cursor: "pointer",
                      border: sel ? `2px solid ${GOLD}` : `1px solid ${MUTED}`,
                      background: sel ? `${GOLD}08` : "#fff",
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
                        boxShadow: sel ? `0 4px 12px ${m.color}66` : "none",
                        transition: "box-shadow 0.3s",
                      }}
                    />
                    <span style={{ fontSize: 13, fontWeight: 500, color: sel ? DARK : "#888" }}>
                      {m.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Countertop */}
          <div style={panelStyle}>
            <h3 style={stepTitleStyle}>
              <StepBadge num={3} /> משטח עבודה
            </h3>
            <div
              style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}
            >
              {COUNTERTOPS.map((ct) => {
                const sel = config.countertop.id === ct.id;
                return (
                  <button
                    key={ct.id}
                    onClick={() => setConfig((p) => ({ ...p, countertop: ct }))}
                    style={{
                      padding: 12,
                      borderRadius: 12,
                      cursor: "pointer",
                      border: sel ? `2px solid ${GOLD}` : `1px solid ${MUTED}`,
                      background: sel ? `${GOLD}08` : "#fff",
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
                        background: ct.color,
                        border: "1px solid rgba(0,0,0,0.08)",
                        boxShadow: sel ? `0 4px 12px ${ct.color}66` : "none",
                        transition: "box-shadow 0.3s",
                      }}
                    />
                    <span style={{ fontSize: 13, fontWeight: 500, color: sel ? DARK : "#888" }}>
                      {ct.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Upper sections */}
          <div style={panelStyle}>
            <h3 style={stepTitleStyle}>
              <StepBadge num={4} /> ארונות עליונים
            </h3>
            <p style={{ fontSize: 13, color: "#888", marginBottom: 14 }}>
              מספר קטעי ארונות עליונים
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {[2, 3, 4, 5, 6].map((n) => (
                <button
                  key={n}
                  onClick={() => setConfig((p) => ({ ...p, upperSections: n }))}
                  style={sectionBtnStyle(config.upperSections === n)}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Step 5: Lower sections */}
          <div style={panelStyle}>
            <h3 style={stepTitleStyle}>
              <StepBadge num={5} /> ארונות תחתונים
            </h3>
            <p style={{ fontSize: 13, color: "#888", marginBottom: 14 }}>מספר קטעים</p>
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {[2, 3, 4, 5, 6].map((n) => (
                <button
                  key={n}
                  onClick={() => setLowerCount(n)}
                  style={sectionBtnStyle(config.lowerSections.length === n)}
                >
                  {n}
                </button>
              ))}
            </div>
            {config.lowerSections.map((sec, i) => (
              <LowerSectionEditor
                key={i}
                section={sec}
                index={i}
                onUpdate={(s) => updateLower(i, s)}
              />
            ))}
          </div>

          {/* Step 6: Summary + send */}
          <div
            style={{
              background: `linear-gradient(135deg, ${DARK} 0%, #2C2420 100%)`,
              borderRadius: 16,
              padding: 28,
              border: "1px solid rgba(184,150,90,0.2)",
            }}
          >
            <h3
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 20,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <StepBadge num={6} /> סיכום ושליחה
            </h3>

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
                  gap: 14,
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
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>חומר:</span>
                  <div style={{ color: GOLD, fontWeight: 600, marginTop: 2 }}>
                    {config.material.name}
                  </div>
                </div>
                <div>
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>משטח עבודה:</span>
                  <div style={{ color: GOLD, fontWeight: 600, marginTop: 2 }}>
                    {config.countertop.name}
                  </div>
                </div>
                <div>
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>ארונות עליונים:</span>
                  <div style={{ color: "#fff", fontWeight: 600, marginTop: 2 }}>
                    {config.upperSections} קטעים
                  </div>
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>ארונות תחתונים:</span>
                  <div style={{ color: "#fff", fontWeight: 600, marginTop: 2 }}>
                    {config.lowerSections.length} קטעים (
                    {config.lowerSections.filter((s) => s.isAppliance).length} מכשירים)
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

        {/* ── Preview ── */}
        <div style={{ position: "sticky", top: 104 }}>
          <div
            style={{
              background: "linear-gradient(135deg, #2a2420 0%, #1a1a1a 100%)",
              borderRadius: 20,
              aspectRatio: "4/3",
              border: "1px solid rgba(184,150,90,0.12)",
              position: "relative",
              overflow: "hidden",
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
              }}
            />

            {/* Vertical centering wrapper */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 24,
              }}
            >
              <KitchenPreview config={config} />
            </div>

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

            {/* Hint */}
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
                pointerEvents: "none",
                fontFamily: "var(--font-heebo), Heebo, sans-serif",
                whiteSpace: "nowrap",
              }}
            >
              שנו את ההגדרות כדי לראות את המטבח שלכם
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
