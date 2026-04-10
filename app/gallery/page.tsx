import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import GoldButton from "@/components/ui/GoldButton";
import { GOLD, DARK, BG, PROJECTS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "הפרויקטים שלנו",
  description:
    "גלריה של פרויקטים שביצענו — חדרי ארונות, ארונות קיר, מטבחים ועוד. כל פרויקט ייחודי ומותאם אישית.",
};

const CATEGORIES = ["הכל", "חדרי ארונות", "ארונות קיר", "מטבחים", "אחסון"];

export default function GalleryPage() {
  return (
    <main style={{ paddingTop: 72 }}>
      {/* Page hero */}
      <div
        style={{
          background: DARK,
          padding: "80px 24px 64px",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: GOLD,
            letterSpacing: 3,
          }}
        >
          תיק עבודות
        </span>
        <h1
          style={{
            fontSize: "clamp(32px,5vw,56px)",
            fontWeight: 900,
            color: "#fff",
            marginTop: 12,
            lineHeight: 1.2,
          }}
        >
          הפרויקטים <span style={{ color: GOLD }}>שלנו</span>
        </h1>
        <p
          style={{
            fontSize: "clamp(16px,2vw,20px)",
            fontWeight: 300,
            color: "rgba(255,255,255,0.6)",
            marginTop: 16,
            maxWidth: 560,
            margin: "16px auto 0",
            lineHeight: 1.7,
          }}
        >
          כל פרויקט הוא סיפור ייחודי — מהחזון ועד למוצר המוגמר.
        </p>
      </div>

      {/* Category chips */}
      <div
        style={{
          background: "#fff",
          padding: "28px 24px",
          borderBottom: "1px solid rgba(184,150,90,0.1)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {CATEGORIES.map((cat, i) => (
            <span
              key={cat}
              className={`category-chip${i === 0 ? " active" : ""}`}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Projects grid */}
      <section style={{ padding: "60px 24px 80px", background: BG }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 24,
            }}
          >
            {PROJECTS.map((project, i) => (
              <Reveal key={i} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <div
                  className="project-card-hover"
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    position: "relative",
                    height: i % 3 === 0 ? 400 : 320,
                    background: project.gradient,
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 28,
                      right: 28,
                      left: 28,
                      zIndex: 2,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 500,
                        color: GOLD,
                        background: "rgba(0,0,0,0.45)",
                        padding: "5px 14px",
                        borderRadius: 20,
                        marginBottom: 10,
                        display: "inline-block",
                      }}
                    >
                      {project.cat}
                    </span>
                    <h2
                      style={{
                        fontSize: 22,
                        fontWeight: 700,
                        color: "#fff",
                        marginTop: 8,
                      }}
                    >
                      {project.title}
                    </h2>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "80px 24px",
          background: DARK,
          textAlign: "center",
        }}
      >
        <Reveal>
          <span
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: GOLD,
              letterSpacing: 3,
            }}
          >
            הפרויקט הבא
          </span>
          <h2
            style={{
              fontSize: "clamp(28px,4vw,44px)",
              fontWeight: 900,
              color: "#fff",
              marginTop: 12,
              marginBottom: 24,
            }}
          >
            בואו נעצב <span style={{ color: GOLD }}>יחד</span>
          </h2>
          <Link href="/design" style={{ textDecoration: "none" }}>
            <GoldButton large>התחילו לעצב עכשיו ←</GoldButton>
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
