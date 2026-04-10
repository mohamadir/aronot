import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import GoldButton from "@/components/ui/GoldButton";
import ProcessSection from "@/components/home/ProcessSection";
import { GOLD, DARK, BG, SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "השירותים שלנו",
  description:
    "עיצוב בהתאמה אישית, מדידה והתקנה מקצועית, תיקונים ושירות, בקרת איכות — הכל תחת קורת גג אחת.",
};

export default function ServicesPage() {
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
          מה אנחנו מציעים
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
          השירותים <span style={{ color: GOLD }}>שלנו</span>
        </h1>
        <p
          style={{
            fontSize: "clamp(16px,2vw,20px)",
            fontWeight: 300,
            color: "rgba(255,255,255,0.6)",
            marginTop: 16,
            maxWidth: 600,
            margin: "16px auto 0",
            lineHeight: 1.7,
          }}
        >
          מהפגישה הראשונה ועד להתקנה הסופית — אנחנו לצדכם בכל שלב.
        </p>
      </div>

      {/* Services grid */}
      <section style={{ padding: "80px 24px", background: BG }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 28,
            }}
          >
            {SERVICES.map((service, i) => (
              <Reveal key={i} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                <div
                  className="card-hover"
                  style={{
                    background: "#fff",
                    borderRadius: 20,
                    padding: "40px 36px",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 16,
                      background: `linear-gradient(135deg, ${GOLD}15, ${GOLD}30)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 28,
                      marginBottom: 24,
                      color: GOLD,
                    }}
                  >
                    {service.icon}
                  </div>
                  <h2
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: DARK,
                      marginBottom: 12,
                    }}
                  >
                    {service.title}
                  </h2>
                  <p
                    style={{
                      fontSize: 16,
                      fontWeight: 400,
                      color: "#555",
                      lineHeight: 1.7,
                      marginBottom: 16,
                    }}
                  >
                    {service.detail}
                  </p>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 300,
                      color: "#999",
                      lineHeight: 1.7,
                    }}
                  >
                    {service.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <ProcessSection />

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
            מוכנים להתחיל?
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
            בואו נתכנן את הארון שלכם
          </h2>
          <p
            style={{
              fontSize: 17,
              fontWeight: 300,
              color: "rgba(255,255,255,0.5)",
              marginBottom: 36,
            }}
          >
            השתמשו בכלי העיצוב שלנו לקבלת הצעת מחיר מיידית.
          </p>
          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link href="/design" style={{ textDecoration: "none" }}>
              <GoldButton large>✦ עיצוב אישי ←</GoldButton>
            </Link>
            <Link href="/contact" style={{ textDecoration: "none" }}>
              <GoldButton
                large
                outline
                style={{
                  borderColor: "rgba(255,255,255,0.25)",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                צור קשר
              </GoldButton>
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
