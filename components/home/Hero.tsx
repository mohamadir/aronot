"use client";

import Link from "next/link";
import GoldButton from "@/components/ui/GoldButton";
import { GOLD } from "@/lib/constants";

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #1A1A1A 0%, #2C2420 35%, #3D2E1E 65%, #1A1A1A 100%)",
      }}
    >
      {/* Diagonal stripe pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.06,
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(184,150,90,0.5) 35px, rgba(184,150,90,0.5) 36px)",
        }}
      />
      {/* Radial gradient blurs */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(184,150,90,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "10%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(184,150,90,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          padding: "120px 24px 80px",
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        {/* Subtitle */}
        <div style={{ animation: "fadeIn 1s ease 0.2s both", marginBottom: 20 }}>
          <span
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: GOLD,
              letterSpacing: 4,
              textTransform: "uppercase",
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span
              style={{
                width: 40,
                height: 1,
                background: GOLD,
                display: "inline-block",
              }}
            />
            עיצוב · ייצור · התקנה
            <span
              style={{
                width: 40,
                height: 1,
                background: GOLD,
                display: "inline-block",
              }}
            />
          </span>
        </div>

        {/* Heading */}
        <h1
          style={{
            fontWeight: 900,
            fontSize: "clamp(36px, 6vw, 72px)",
            lineHeight: 1.15,
            color: "#fff",
            marginBottom: 24,
            animation: "fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.4s both",
          }}
        >
          הארון שתמיד
          <br />
          <span style={{ color: GOLD }}>חלמתם עליו</span>
        </h1>

        {/* Sub-heading */}
        <p
          style={{
            fontSize: "clamp(17px, 2vw, 22px)",
            fontWeight: 300,
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.7,
            maxWidth: 600,
            margin: "0 auto 48px",
            animation: "fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.6s both",
          }}
        >
          עיצוב, ייצור והתקנה של ארונות בהתאמה אישית מלאה.
          <br />
          כל פרט מותאם בדיוק לחלל ולסגנון שלכם.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
            animation: "fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.8s both",
          }}
        >
          <Link href="/design" style={{ textDecoration: "none" }}>
            <GoldButton large>עצב את הארון שלך ←</GoldButton>
          </Link>
          <GoldButton
            large
            outline
            style={{
              borderColor: "rgba(255,255,255,0.3)",
              color: "rgba(255,255,255,0.8)",
            }}
            onClick={scrollToProjects}
          >
            צפו בפרויקטים
          </GoldButton>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            animation: "fadeIn 1s ease 1.5s both",
          }}
        >
          <div
            style={{
              width: 28,
              height: 44,
              borderRadius: 14,
              border: "2px solid rgba(255,255,255,0.2)",
              display: "flex",
              justifyContent: "center",
              paddingTop: 8,
            }}
          >
            <div
              style={{
                width: 3,
                height: 8,
                borderRadius: 2,
                background: GOLD,
                animation: "float 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
