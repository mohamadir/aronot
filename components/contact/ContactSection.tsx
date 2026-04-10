"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import GoldButton from "@/components/ui/GoldButton";
import { GOLD, DARK, BG, MUTED, WHATSAPP_NUMBER } from "@/lib/constants";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, wire to an API route here
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: 16,
    borderRadius: 12,
    border: `1px solid ${MUTED}`,
    fontFamily: "var(--font-heebo), Heebo, sans-serif",
    fontSize: 15,
    background: "#fff",
    outline: "none",
    transition: "border 0.3s",
    color: DARK,
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.target.style.borderColor = GOLD);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.target.style.borderColor = MUTED);

  return (
    <section id="contact" style={{ padding: "100px 24px", background: BG }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: GOLD,
                letterSpacing: 3,
              }}
            >
              נשמח לשמוע מכם
            </span>
            <h2
              style={{
                fontSize: "clamp(28px,4vw,44px)",
                fontWeight: 900,
                color: DARK,
                marginTop: 12,
              }}
            >
              רוצים לשמוע עוד? דברו איתנו
            </h2>
          </div>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 48,
          }}
        >
          {/* Form */}
          <Reveal>
            {submitted ? (
              <div
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  padding: 48,
                  border: `1px solid rgba(184,150,90,0.2)`,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
                <h3
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: DARK,
                    marginBottom: 8,
                  }}
                >
                  תודה!
                </h3>
                <p style={{ color: "#666", fontWeight: 300 }}>
                  קיבלנו את ההודעה שלכם ונחזור אליכם בהקדם.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <input
                  type="text"
                  placeholder="שם מלא"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <input
                  type="tel"
                  placeholder="טלפון"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <input
                  type="email"
                  placeholder="אימייל"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <textarea
                  placeholder="ספרו לנו על הפרויקט שלכם..."
                  rows={4}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <GoldButton
                  large
                  type="submit"
                  style={{ width: "100%", marginTop: 8 }}
                >
                  שלחו הודעה
                </GoldButton>
              </form>
            )}
          </Reveal>

          {/* Contact info */}
          <Reveal delay={2}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 24,
                fontFamily: "var(--font-heebo), Heebo, sans-serif",
              }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  padding: 28,
                  border: "1px solid rgba(184,150,90,0.1)",
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: GOLD,
                    marginBottom: 8,
                  }}
                >
                  טלפון
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: DARK,
                    direction: "ltr",
                    textAlign: "right",
                  }}
                >
                  054-123-4567
                </div>
              </div>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <GoldButton large green style={{ width: "100%" }}>
                  💬 שלחו הודעה בוואטסאפ
                </GoldButton>
              </a>

              <div
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  padding: 28,
                  border: "1px solid rgba(184,150,90,0.1)",
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: GOLD,
                    marginBottom: 8,
                  }}
                >
                  כתובת
                </div>
                <div style={{ fontSize: 16, fontWeight: 400, color: "#555" }}>
                  רחוב התעשייה 12, אזור תעשייה
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 300,
                    color: "#999",
                    marginTop: 4,
                  }}
                >
                  א׳–ה׳ 08:00–18:00 | ו׳ 08:00–13:00
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
