"use client";

import { useState, useEffect } from "react";
import Reveal from "@/components/ui/Reveal";
import { GOLD, DARK, MUTED, TESTIMONIALS } from "@/lib/constants";

export default function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setActive((prev) => (prev + 1) % TESTIMONIALS.length),
      5000
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={{ padding: "100px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <span
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: GOLD,
              letterSpacing: 3,
            }}
          >
            מה אומרים עלינו
          </span>
          <h2
            style={{
              fontSize: "clamp(28px,4vw,44px)",
              fontWeight: 900,
              color: DARK,
              marginTop: 12,
              marginBottom: 48,
            }}
          >
            הלקוחות שלנו ממליצים
          </h2>
        </Reveal>

        {/* Carousel */}
        <div style={{ position: "relative", minHeight: 200 }}>
          {TESTIMONIALS.map((testimonial, i) => (
            <div
              key={i}
              style={{
                position: i === active ? "relative" : "absolute",
                inset: 0,
                opacity: i === active ? 1 : 0,
                transform:
                  i === active ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)",
                pointerEvents: i === active ? "auto" : "none",
              }}
            >
              <div style={{ fontSize: 36, color: GOLD, marginBottom: 16 }}>
                ❝
              </div>
              <p
                style={{
                  fontSize: 20,
                  fontWeight: 300,
                  color: "#555",
                  lineHeight: 1.8,
                  marginBottom: 24,
                }}
              >
                {testimonial.text}
              </p>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: DARK,
                }}
              >
                {testimonial.name}
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 300,
                  color: "#999",
                }}
              >
                {testimonial.city}
              </div>
              <div
                style={{
                  color: GOLD,
                  fontSize: 18,
                  marginTop: 8,
                  letterSpacing: 2,
                }}
              >
                ★★★★★
              </div>
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            marginTop: 32,
          }}
        >
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`עדות ${i + 1}`}
              style={{
                width: i === active ? 32 : 10,
                height: 10,
                borderRadius: 5,
                background: i === active ? GOLD : MUTED,
                border: "none",
                cursor: "pointer",
                transition: "all 0.4s ease",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
