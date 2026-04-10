import Reveal from "@/components/ui/Reveal";
import { GOLD, GOLD_HOVER, DARK, PROCESS_STEPS } from "@/lib/constants";

export default function ProcessSection() {
  return (
    <section style={{ padding: "100px 24px", background: "#fff" }}>
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
              התהליך שלנו
            </span>
            <h2
              style={{
                fontSize: "clamp(32px,4vw,48px)",
                fontWeight: 900,
                color: DARK,
                marginTop: 12,
              }}
            >
              איך זה עובד?
            </h2>
          </div>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 40,
          }}
        >
          {PROCESS_STEPS.map((step, i) => (
            <Reveal key={i} delay={(i + 1) as 1 | 2 | 3 | 4}>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    margin: "0 auto 20px",
                    background: `linear-gradient(135deg, ${GOLD}, ${GOLD_HOVER})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    fontWeight: 900,
                    color: "#fff",
                  }}
                >
                  {step.num}
                </div>
                <h4
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: DARK,
                    marginBottom: 8,
                  }}
                >
                  {step.title}
                </h4>
                <p
                  style={{ fontSize: 14, fontWeight: 300, color: "#888" }}
                >
                  {step.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
