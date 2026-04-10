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
                  cursor: "pointer",
                  background: project.gradient,
                }}
              >
                {/* Photo */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
                  }}
                />
                {/* Gradient overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)",
                  }}
                />
                {/* Info */}
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
                      background: "rgba(0,0,0,0.45)",
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
                      textShadow: "0 1px 4px rgba(0,0,0,0.4)",
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
