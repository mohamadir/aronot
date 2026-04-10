import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import GoldButton from "@/components/ui/GoldButton";
import { GOLD, DARK, MATERIALS } from "@/lib/constants";

export default function ConfigTeaser() {
  return (
    <section
      style={{ padding: "100px 24px", background: DARK, overflow: "hidden" }}
    >
      <div
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 60,
          alignItems: "center",
        }}
      >
        {/* Text */}
        <Reveal>
          <div>
            <span
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: GOLD,
                letterSpacing: 3,
              }}
            >
              כלי עיצוב אישי
            </span>
            <h2
              style={{
                fontSize: "clamp(28px,4vw,44px)",
                fontWeight: 900,
                color: "#fff",
                marginTop: 12,
                marginBottom: 20,
                lineHeight: 1.25,
              }}
            >
              עצבו את הארון
              <br />
              <span style={{ color: GOLD }}>בעצמכם — בתלת-ממד</span>
            </h2>
            <p
              style={{
                fontSize: 17,
                fontWeight: 300,
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.8,
                marginBottom: 36,
              }}
            >
              בחרו מידות, צבעים, מדפים ומגירות — וצפו בארון שלכם מתעדכן
              בזמן אמת. בסיום, שלחו את העיצוב ישירות אלינו.
            </p>
            <Link href="/design" style={{ textDecoration: "none" }}>
              <GoldButton large>התחילו לעצב עכשיו ←</GoldButton>
            </Link>
          </div>
        </Reveal>

        {/* Mock 3D closet */}
        <Reveal delay={2}>
          <div
            style={{
              background:
                "linear-gradient(135deg, #2a2420 0%, #3d2e1e 100%)",
              borderRadius: 20,
              padding: 40,
              aspectRatio: "1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(184,150,90,0.15)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                animation: "float 4s ease-in-out infinite",
                perspective: 800,
              }}
            >
              <div
                style={{
                  width: 200,
                  height: 240,
                  background: MATERIALS[1].color,
                  borderRadius: 4,
                  position: "relative",
                  boxShadow: `8px 8px 0 ${MATERIALS[1].color}44, inset 0 0 0 2px rgba(255,255,255,0.1)`,
                  transform: "rotateY(-8deg) rotateX(2deg)",
                }}
              >
                {/* Door center line */}
                <div
                  style={{
                    position: "absolute",
                    top: 8,
                    bottom: 8,
                    left: "50%",
                    width: 1,
                    background: "rgba(0,0,0,0.15)",
                  }}
                />
                {/* Handles */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "46%",
                    width: 3,
                    height: 30,
                    background: GOLD,
                    borderRadius: 2,
                    transform: "translateY(-50%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "52%",
                    width: 3,
                    height: 30,
                    background: GOLD,
                    borderRadius: 2,
                    transform: "translateY(-50%)",
                  }}
                />
                {/* Shelves */}
                {[25, 50, 75].map((p) => (
                  <div
                    key={p}
                    style={{
                      position: "absolute",
                      top: `${p}%`,
                      left: 6,
                      right: 6,
                      height: 2,
                      background: "rgba(0,0,0,0.1)",
                      borderRadius: 1,
                    }}
                  />
                ))}
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 16,
                fontSize: 13,
                color: "rgba(255,255,255,0.3)",
                fontWeight: 300,
              }}
            >
              תצוגה מקדימה
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
