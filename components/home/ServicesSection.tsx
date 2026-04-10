import Reveal from "@/components/ui/Reveal";
import { GOLD, DARK, BG, SERVICES } from "@/lib/constants";

export default function ServicesSection() {
  return (
    <section id="services" style={{ padding: "100px 24px", background: BG }}>
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
              מה אנחנו מציעים
            </span>
            <h2
              style={{
                fontSize: "clamp(32px,4vw,48px)",
                fontWeight: 900,
                color: DARK,
                marginTop: 12,
              }}
            >
              השירותים שלנו
            </h2>
          </div>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 24,
          }}
        >
          {SERVICES.map((item, i) => (
            <Reveal key={i} delay={(i + 1) as 1 | 2 | 3 | 4}>
              <div
                className="card-hover"
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  padding: 36,
                  cursor: "default",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 12,
                    background: `linear-gradient(135deg, ${GOLD}15, ${GOLD}30)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    marginBottom: 20,
                    color: GOLD,
                  }}
                >
                  {item.icon}
                </div>
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: DARK,
                    marginBottom: 12,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    fontWeight: 300,
                    color: "#777",
                    lineHeight: 1.7,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
