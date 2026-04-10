import Reveal from "@/components/ui/Reveal";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { GOLD, DARK } from "@/lib/constants";

const STATS = [
  { num: 15, suffix: "+", label: "שנות ניסיון" },
  { num: 2000, suffix: "+", label: "פרויקטים" },
  { num: 5, suffix: "", label: "שנות אחריות" },
  { num: 100, suffix: "%", label: "שביעות רצון" },
];

export default function TrustBar() {
  return (
    <section style={{ background: DARK, padding: "48px 24px" }}>
      <div
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 32,
          textAlign: "center",
        }}
      >
        {STATS.map((stat, i) => (
          <Reveal key={i} delay={(i + 1) as 1 | 2 | 3 | 4}>
            <div
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: GOLD,
                lineHeight: 1,
              }}
            >
              <AnimatedCounter target={stat.num} suffix={stat.suffix} />
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 300,
                color: "rgba(255,255,255,0.6)",
                marginTop: 8,
              }}
            >
              {stat.label}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
