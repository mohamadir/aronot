import Reveal from "@/components/ui/Reveal";
import { GOLD, DARK, BG, PROJECTS } from "@/lib/constants";

interface ProjectsGalleryProps {
  fullPage?: boolean;
}

export default function ProjectsGallery({
  fullPage = false,
}: ProjectsGalleryProps) {
  return (
    <section
      id="projects"
      style={{ padding: fullPage ? "80px 24px" : "100px 24px", background: BG }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
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
              תיק עבודות
            </span>
            <h2
              style={{
                fontSize: "clamp(32px,4vw,48px)",
                fontWeight: 900,
                color: DARK,
                marginTop: 12,
              }}
            >
              הפרויקטים שלנו מדברים בעד עצמם
            </h2>
          </div>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 20,
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
                  height: i % 3 === 0 ? 380 : 300,
                  background: project.gradient,
                  cursor: "pointer",
                }}
              >
                {/* Gradient overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)",
                  }}
                />
                {/* Project info */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 24,
                    right: 24,
                    left: 24,
                    zIndex: 2,
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: GOLD,
                      background: "rgba(0,0,0,0.4)",
                      padding: "4px 12px",
                      borderRadius: 20,
                      marginBottom: 8,
                      display: "inline-block",
                    }}
                  >
                    {project.cat}
                  </span>
                  <h3
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: "#fff",
                    }}
                  >
                    {project.title}
                  </h3>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
