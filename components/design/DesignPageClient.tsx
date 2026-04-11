"use client";

import { useState } from "react";
import DesignConfigurator from "./DesignConfigurator";
import KitchenConfigurator from "./KitchenConfigurator";
import { GOLD, DARK } from "@/lib/constants";

type Tab = "closet" | "kitchen";

const TABS: { id: Tab; label: string }[] = [
  { id: "closet", label: "🚪 ארון חדר" },
  { id: "kitchen", label: "🍳 מטבח" },
];

export default function DesignPageClient() {
  const [tab, setTab] = useState<Tab>("closet");

  return (
    <div style={{ fontFamily: "var(--font-heebo), Heebo, sans-serif" }}>
      {/* ── Dark hero header with type tabs ── */}
      <div
        style={{
          background: `linear-gradient(135deg, ${DARK} 0%, #2C2420 100%)`,
          paddingTop: 96,
          paddingBottom: 48,
          borderBottom: "1px solid rgba(184,150,90,0.12)",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 24px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: GOLD,
              fontSize: 13,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: 16,
              fontWeight: 500,
            }}
          >
            כלי העיצוב שלנו
          </p>
          <h1
            style={{
              fontSize: "clamp(30px, 5vw, 52px)",
              fontWeight: 900,
              color: "#fff",
              marginBottom: 14,
              lineHeight: 1.1,
            }}
          >
            בנו את העיצוב שלכם
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: 17,
              maxWidth: 520,
              margin: "0 auto 36px",
            }}
          >
            בחרו סוג, התאימו מידות וחומרים — וקבלו הצעת מחיר ישירות בוואטסאפ
          </p>

          {/* Tab switcher */}
          <div
            style={{
              display: "inline-flex",
              background: "rgba(255,255,255,0.06)",
              borderRadius: 14,
              padding: 4,
              border: "1px solid rgba(184,150,90,0.15)",
              gap: 2,
            }}
          >
            {TABS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                style={{
                  padding: "12px 36px",
                  borderRadius: 10,
                  border: "none",
                  fontFamily: "var(--font-heebo), Heebo, sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                  background: tab === id ? GOLD : "transparent",
                  color: tab === id ? "#fff" : "rgba(255,255,255,0.5)",
                  boxShadow: tab === id ? "0 4px 16px rgba(184,150,90,0.3)" : "none",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Active configurator ── */}
      {tab === "closet" ? <DesignConfigurator /> : <KitchenConfigurator />}
    </div>
  );
}
