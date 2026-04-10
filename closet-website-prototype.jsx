import { useState, useEffect, useRef } from "react";

const GOLD = "#B8965A";
const GOLD_HOVER = "#A07A42";
const DARK = "#1A1A1A";
const BG = "#FAFAF8";
const MUTED = "#E8E4DF";
const CARD_BG = "#F5F2ED";

const MATERIALS = [
  { id: "white", name: "לבן מט", color: "#F5F0EB" },
  { id: "oak", name: "אלון טבעי", color: "#C4A26E" },
  { id: "walnut", name: "אגוז", color: "#7B5B3A" },
  { id: "dark", name: "אפור כהה", color: "#4A4A4A" },
  { id: "grey", name: "אפור בהיר", color: "#B0ADA8" },
  { id: "cream", name: "שמנת", color: "#EDE5D8" },
];

const PROJECTS = [
  { title: "חדר ארונות מאסטר", cat: "חדרי ארונות", gradient: "linear-gradient(135deg, #7B5B3A 0%, #C4A26E 100%)" },
  { title: "ארון קיר מודרני", cat: "ארונות קיר", gradient: "linear-gradient(135deg, #4A4A4A 0%, #B0ADA8 100%)" },
  { title: "מטבח אלון טבעי", cat: "מטבחים", gradient: "linear-gradient(135deg, #C4A26E 0%, #EDE5D8 100%)" },
  { title: "ארון הזזה מינימליסטי", cat: "ארונות קיר", gradient: "linear-gradient(135deg, #2C2C2C 0%, #7B5B3A 100%)" },
  { title: "חדר ארונות זוגי", cat: "חדרי ארונות", gradient: "linear-gradient(135deg, #B8965A 0%, #F5F0EB 100%)" },
  { title: "פינת אחסון מעוצבת", cat: "אחסון", gradient: "linear-gradient(135deg, #EDE5D8 0%, #B0ADA8 100%)" },
];

const TESTIMONIALS = [
  { name: "רונית כהן", city: "תל אביב", text: "הארון שלנו הפך את חדר השינה למשהו אחר לגמרי. עבודה מקצועית ומדויקת." },
  { name: "אבי לוי", city: "רעננה", text: "מהתכנון ועד ההתקנה — חוויה מושלמת. התוצאה עלתה על כל הציפיות." },
  { name: "מיכל דוד", city: "הרצליה", text: "שירות אדיב, תשומת לב לפרטים, ותוצאה שגורמת לי לחייך כל בוקר." },
];

/* ─── CSS-in-JS helper ─── */
const injectStyles = () => {
  const id = "closet-global-styles";
  if (document.getElementById(id)) return;
  const style = document.createElement("style");
  style.id = id;
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;700;900&display=swap');

    *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

    :root {
      --gold: ${GOLD};
      --gold-hover: ${GOLD_HOVER};
      --dark: ${DARK};
      --bg: ${BG};
      --muted: ${MUTED};
      --card-bg: ${CARD_BG};
    }

    @keyframes fadeUp {
      from { opacity:0; transform:translateY(40px); }
      to { opacity:1; transform:translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity:0; }
      to { opacity:1; }
    }
    @keyframes scaleIn {
      from { opacity:0; transform:scale(0.92); }
      to { opacity:1; transform:scale(1); }
    }
    @keyframes slideRight {
      from { opacity:0; transform:translateX(60px); }
      to { opacity:1; transform:translateX(0); }
    }
    @keyframes slideLeft {
      from { opacity:0; transform:translateX(-60px); }
      to { opacity:1; transform:translateX(0); }
    }
    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
    @keyframes float {
      0%,100% { transform: translateY(0px) rotateY(0deg); }
      50% { transform: translateY(-8px) rotateY(3deg); }
    }
    @keyframes goldPulse {
      0%,100% { box-shadow: 0 0 0 0 rgba(184,150,90,0.3); }
      50% { box-shadow: 0 0 0 12px rgba(184,150,90,0); }
    }

    .reveal { opacity:0; transform:translateY(40px); transition: all 0.8s cubic-bezier(0.16,1,0.3,1); }
    .reveal.visible { opacity:1; transform:translateY(0); }
    .reveal-delay-1 { transition-delay: 0.1s; }
    .reveal-delay-2 { transition-delay: 0.2s; }
    .reveal-delay-3 { transition-delay: 0.3s; }
    .reveal-delay-4 { transition-delay: 0.4s; }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 3px; }

    /* Selection */
    ::selection { background: rgba(184,150,90,0.25); color: var(--dark); }
  `;
  document.head.appendChild(style);
};

/* ─── Scroll reveal hook ─── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, delay = 0, style = {} }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${delay ? `reveal-delay-${delay}` : ""}`} style={style}>
      {children}
    </div>
  );
}

/* ─── Counter animation ─── */
function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const dur = 2000;
        const step = (ts) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setCount(Math.floor(ease * target));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ─── Shared Button ─── */
function GoldButton({ children, onClick, large, outline, green, style: extraStyle = {} }) {
  const base = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
    padding: large ? "18px 44px" : "14px 36px",
    fontSize: large ? 18 : 16,
    fontWeight: 700, fontFamily: "Heebo, sans-serif",
    border: outline ? `2px solid ${green ? "#25D366" : GOLD}` : "none",
    borderRadius: 50,
    cursor: "pointer",
    background: outline ? "transparent" : green ? "#25D366" : GOLD,
    color: outline ? (green ? "#25D366" : GOLD) : "#fff",
    transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
    letterSpacing: 0.5,
    textDecoration: "none",
    ...extraStyle,
  };
  return (
    <button
      style={base}
      onClick={onClick}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "scale(1.04)";
        if (!outline) e.currentTarget.style.background = green ? "#1da851" : GOLD_HOVER;
        e.currentTarget.style.boxShadow = `0 8px 30px ${green ? "rgba(37,211,102,0.3)" : "rgba(184,150,90,0.35)"}`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "scale(1)";
        if (!outline) e.currentTarget.style.background = green ? "#25D366" : GOLD;
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {children}
    </button>
  );
}

/* ─── Navigation ─── */
function Header({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { key: "home", label: "דף הבית" },
    { key: "home", label: "השירותים שלנו", hash: "services" },
    { key: "home", label: "הפרויקטים שלנו", hash: "projects" },
    { key: "home", label: "צור קשר", hash: "contact" },
  ];

  const navStyle = {
    position: "fixed", top: 0, right: 0, left: 0, zIndex: 1000,
    background: scrolled || page === "design" ? "rgba(250,250,248,0.97)" : "transparent",
    backdropFilter: scrolled || page === "design" ? "blur(12px)" : "none",
    borderBottom: scrolled || page === "design" ? "1px solid rgba(184,150,90,0.15)" : "1px solid transparent",
    transition: "all 0.4s ease",
    padding: "0 clamp(20px, 4vw, 60px)",
  };

  const isHero = !scrolled && page === "home";

  return (
    <>
      <nav style={navStyle}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          <div
            style={{ fontSize: 22, fontWeight: 900, fontFamily: "Heebo, sans-serif", color: isHero ? "#fff" : DARK, cursor: "pointer", transition: "color 0.3s", letterSpacing: -0.5 }}
            onClick={() => { setPage("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          >
            <span style={{ color: GOLD }}>◆</span> ארונות פרימיום
          </div>

          {/* Desktop nav */}
          <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="desktop-nav">
            {links.map((l, i) => (
              <span
                key={i}
                onClick={() => {
                  setPage(l.key);
                  if (l.hash) {
                    setTimeout(() => document.getElementById(l.hash)?.scrollIntoView({ behavior: "smooth" }), 100);
                  } else {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                style={{
                  fontFamily: "Heebo, sans-serif", fontSize: 15, fontWeight: 500,
                  color: isHero ? "rgba(255,255,255,0.85)" : "#666",
                  cursor: "pointer", transition: "color 0.3s", position: "relative",
                  paddingBottom: 4,
                }}
                onMouseEnter={e => e.currentTarget.style.color = GOLD}
                onMouseLeave={e => e.currentTarget.style.color = isHero ? "rgba(255,255,255,0.85)" : "#666"}
              >
                {l.label}
              </span>
            ))}
            <GoldButton onClick={() => { setPage("design"); window.scrollTo({ top: 0 }); }}>
              ✦ עיצוב אישי
            </GoldButton>
          </div>

          {/* Mobile hamburger */}
          <div
            className="mobile-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: "none", cursor: "pointer", padding: 8 }}
          >
            <div style={{ width: 24, height: 2, background: isHero ? "#fff" : DARK, marginBottom: 6, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
            <div style={{ width: 24, height: 2, background: isHero ? "#fff" : DARK, marginBottom: 6, transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
            <div style={{ width: 24, height: 2, background: isHero ? "#fff" : DARK, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 999,
        background: "rgba(26,26,26,0.97)", backdropFilter: "blur(20px)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32,
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "auto" : "none",
        transform: menuOpen ? "scale(1)" : "scale(1.05)",
      }}>
        {links.map((l, i) => (
          <span
            key={i}
            onClick={() => { setMenuOpen(false); setPage(l.key); if (l.hash) setTimeout(() => document.getElementById(l.hash)?.scrollIntoView({ behavior: "smooth" }), 200); else window.scrollTo({ top: 0 }); }}
            style={{ fontFamily: "Heebo, sans-serif", fontSize: 28, fontWeight: 700, color: "#fff", cursor: "pointer" }}
          >
            {l.label}
          </span>
        ))}
        <GoldButton large onClick={() => { setMenuOpen(false); setPage("design"); window.scrollTo({ top: 0 }); }}>
          ✦ עיצוב אישי
        </GoldButton>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-hamburger { display: block !important; }
        }
      `}</style>
    </>
  );
}

/* ─── HERO ─── */
function Hero({ setPage }) {
  return (
    <section style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
      background: `linear-gradient(135deg, #1A1A1A 0%, #2C2420 35%, #3D2E1E 65%, #1A1A1A 100%)`,
    }}>
      {/* Decorative elements */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(184,150,90,0.5) 35px, rgba(184,150,90,0.5) 36px)", }} />
      <div style={{ position: "absolute", top: "10%", left: "5%", width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, rgba(184,150,90,0.12) 0%, transparent 70%)`, filter: "blur(40px)" }} />
      <div style={{ position: "absolute", bottom: "15%", right: "10%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, rgba(184,150,90,0.08) 0%, transparent 70%)`, filter: "blur(60px)" }} />

      <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "120px 24px 80px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ animation: "fadeIn 1s ease 0.2s both", marginBottom: 20 }}>
          <span style={{ fontFamily: "Heebo, sans-serif", fontSize: 14, fontWeight: 500, color: GOLD, letterSpacing: 4, textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 40, height: 1, background: GOLD, display: "inline-block" }} />
            עיצוב · ייצור · התקנה
            <span style={{ width: 40, height: 1, background: GOLD, display: "inline-block" }} />
          </span>
        </div>
        <h1 style={{
          fontFamily: "Heebo, sans-serif", fontWeight: 900,
          fontSize: "clamp(36px, 6vw, 72px)", lineHeight: 1.15,
          color: "#fff", marginBottom: 24,
          animation: "fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.4s both",
        }}>
          הארון שתמיד
          <br />
          <span style={{ color: GOLD }}>חלמתם עליו</span>
        </h1>
        <p style={{
          fontFamily: "Heebo, sans-serif", fontSize: "clamp(17px, 2vw, 22px)", fontWeight: 300,
          color: "rgba(255,255,255,0.7)", lineHeight: 1.7, maxWidth: 600, margin: "0 auto 48px",
          animation: "fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.6s both",
        }}>
          עיצוב, ייצור והתקנה של ארונות בהתאמה אישית מלאה.
          <br />כל פרט מותאם בדיוק לחלל ולסגנון שלכם.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", animation: "fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.8s both" }}>
          <GoldButton large onClick={() => { setPage("design"); window.scrollTo({ top: 0 }); }}>
            עצב את הארון שלך ←
          </GoldButton>
          <GoldButton large outline style={{ borderColor: "rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.8)" }}
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
            צפו בפרויקטים
          </GoldButton>
        </div>
        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", animation: "fadeIn 1s ease 1.5s both" }}>
          <div style={{ width: 28, height: 44, borderRadius: 14, border: "2px solid rgba(255,255,255,0.2)", display: "flex", justifyContent: "center", paddingTop: 8 }}>
            <div style={{ width: 3, height: 8, borderRadius: 2, background: GOLD, animation: "float 2s ease-in-out infinite" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── TRUST BAR ─── */
function TrustBar() {
  const stats = [
    { num: 15, suffix: "+", label: "שנות ניסיון" },
    { num: 2000, suffix: "+", label: "פרויקטים" },
    { num: 5, suffix: "", label: "שנות אחריות" },
    { num: 100, suffix: "%", label: "שביעות רצון" },
  ];
  return (
    <section style={{ background: DARK, padding: "48px 24px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32, textAlign: "center" }}>
        {stats.map((s, i) => (
          <Reveal key={i} delay={i + 1}>
            <div style={{ fontFamily: "Heebo, sans-serif", fontSize: 48, fontWeight: 900, color: GOLD, lineHeight: 1 }}>
              <AnimatedCounter target={s.num} suffix={s.suffix} />
            </div>
            <div style={{ fontFamily: "Heebo, sans-serif", fontSize: 16, fontWeight: 300, color: "rgba(255,255,255,0.6)", marginTop: 8 }}>{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── SERVICES ─── */
function Services() {
  const items = [
    { icon: "✦", title: "עיצוב בהתאמה אישית", desc: "כל ארון מתוכנן מאפס — בדיוק לפי המידות, הסגנון והצרכים שלכם." },
    { icon: "◇", title: "מדידה והתקנה", desc: "צוות מקצועי מגיע לבית הלקוח, מודד בדייקנות ומבצע התקנה מושלמת." },
    { icon: "⚙", title: "תיקונים ושירות", desc: "שירות לאחר מכירה מהיר ואמין — כי אנחנו כאן לטווח הארוך." },
    { icon: "✓", title: "בקרת איכות", desc: "כל פרויקט עובר בדיקת איכות קפדנית לפני מסירה ללקוח." },
  ];
  return (
    <section id="services" style={{ padding: "100px 24px", background: BG }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ fontFamily: "Heebo, sans-serif", fontSize: 13, fontWeight: 500, color: GOLD, letterSpacing: 3 }}>מה אנחנו מציעים</span>
            <h2 style={{ fontFamily: "Heebo, sans-serif", fontSize: "clamp(32px,4vw,48px)", fontWeight: 900, color: DARK, marginTop: 12 }}>השירותים שלנו</h2>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          {items.map((item, i) => (
            <Reveal key={i} delay={i + 1}>
              <div
                style={{
                  background: "#fff", borderRadius: 16, padding: 36,
                  border: "1px solid rgba(184,150,90,0.1)",
                  transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                  cursor: "default", height: "100%",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 60px rgba(184,150,90,0.12)"; e.currentTarget.style.borderColor = GOLD; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "rgba(184,150,90,0.1)"; }}
              >
                <div style={{ width: 56, height: 56, borderRadius: 12, background: `linear-gradient(135deg, ${GOLD}15, ${GOLD}30)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 20, color: GOLD }}>
                  {item.icon}
                </div>
                <h3 style={{ fontFamily: "Heebo, sans-serif", fontSize: 20, fontWeight: 700, color: DARK, marginBottom: 12 }}>{item.title}</h3>
                <p style={{ fontFamily: "Heebo, sans-serif", fontSize: 15, fontWeight: 300, color: "#777", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PROCESS ─── */
function Process() {
  const steps = [
    { num: "01", title: "פגישת ייעוץ", desc: "נפגשים, מבינים צרכים" },
    { num: "02", title: "עיצוב תלת-ממדי", desc: "מעצבים את הארון שלכם" },
    { num: "03", title: "ייצור", desc: "ייצור מדויק ואיכותי" },
    { num: "04", title: "התקנה", desc: "התקנה ובקרת איכות" },
  ];
  return (
    <section style={{ padding: "100px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ fontFamily: "Heebo, sans-serif", fontSize: 13, fontWeight: 500, color: GOLD, letterSpacing: 3 }}>התהליך שלנו</span>
            <h2 style={{ fontFamily: "Heebo, sans-serif", fontSize: "clamp(32px,4vw,48px)", fontWeight: 900, color: DARK, marginTop: 12 }}>איך זה עובד?</h2>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, position: "relative" }}>
          {steps.map((s, i) => (
            <Reveal key={i} delay={i + 1}>
              <div style={{ textAlign: "center" }}>
                <div style={{
                  width: 72, height: 72, borderRadius: "50%", margin: "0 auto 20px",
                  background: `linear-gradient(135deg, ${GOLD}, ${GOLD_HOVER})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "Heebo, sans-serif", fontSize: 22, fontWeight: 900, color: "#fff",
                }}>
                  {s.num}
                </div>
                <h4 style={{ fontFamily: "Heebo, sans-serif", fontSize: 18, fontWeight: 700, color: DARK, marginBottom: 8 }}>{s.title}</h4>
                <p style={{ fontFamily: "Heebo, sans-serif", fontSize: 14, fontWeight: 300, color: "#888" }}>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PROJECTS GALLERY ─── */
function ProjectsGallery() {
  return (
    <section id="projects" style={{ padding: "100px 24px", background: BG }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ fontFamily: "Heebo, sans-serif", fontSize: 13, fontWeight: 500, color: GOLD, letterSpacing: 3 }}>תיק עבודות</span>
            <h2 style={{ fontFamily: "Heebo, sans-serif", fontSize: "clamp(32px,4vw,48px)", fontWeight: 900, color: DARK, marginTop: 12 }}>הפרויקטים שלנו מדברים בעד עצמם</h2>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
          {PROJECTS.map((p, i) => (
            <Reveal key={i} delay={(i % 3) + 1}>
              <div
                style={{
                  borderRadius: 16, overflow: "hidden", position: "relative",
                  height: i % 3 === 0 ? 380 : 300,
                  background: p.gradient, cursor: "pointer",
                  transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0 24px 60px rgba(0,0,0,0.2)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)" }} />
                <div style={{ position: "absolute", bottom: 24, right: 24, left: 24, zIndex: 2 }}>
                  <span style={{ fontFamily: "Heebo, sans-serif", fontSize: 12, fontWeight: 500, color: GOLD, background: "rgba(0,0,0,0.4)", padding: "4px 12px", borderRadius: 20, marginBottom: 8, display: "inline-block" }}>{p.cat}</span>
                  <h3 style={{ fontFamily: "Heebo, sans-serif", fontSize: 22, fontWeight: 700, color: "#fff" }}>{p.title}</h3>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CONFIGURATOR TEASER ─── */
function ConfigTeaser({ setPage }) {
  return (
    <section style={{ padding: "100px 24px", background: DARK, overflow: "hidden" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 60, alignItems: "center" }}>
        <Reveal>
          <div>
            <span style={{ fontFamily: "Heebo, sans-serif", fontSize: 13, fontWeight: 500, color: GOLD, letterSpacing: 3 }}>כלי עיצוב אישי</span>
            <h2 style={{ fontFamily: "Heebo, sans-serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, color: "#fff", marginTop: 12, marginBottom: 20, lineHeight: 1.25 }}>
              עצבו את הארון
              <br /><span style={{ color: GOLD }}>בעצמכם — בתלת-ממד</span>
            </h2>
            <p style={{ fontFamily: "Heebo, sans-serif", fontSize: 17, fontWeight: 300, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 36 }}>
              בחרו מידות, צבעים, מדפים ומגירות — וצפו בארון שלכם מתעדכן בזמן אמת. בסיום, שלחו את העיצוב ישירות אלינו.
            </p>
            <GoldButton large onClick={() => { setPage("design"); window.scrollTo({ top: 0 }); }}>
              התחילו לעצב עכשיו ←
            </GoldButton>
          </div>
        </Reveal>
        <Reveal delay={2}>
          <div style={{
            background: "linear-gradient(135deg, #2a2420 0%, #3d2e1e 100%)",
            borderRadius: 20, padding: 40, aspectRatio: "1",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "1px solid rgba(184,150,90,0.15)",
            position: "relative", overflow: "hidden",
          }}>
            {/* Animated mock 3D closet */}
            <div style={{ animation: "float 4s ease-in-out infinite", perspective: 800 }}>
              <div style={{
                width: 200, height: 240, background: MATERIALS[1].color,
                borderRadius: 4, position: "relative",
                boxShadow: `8px 8px 0 ${MATERIALS[1].color}44, inset 0 0 0 2px rgba(255,255,255,0.1)`,
                transform: "rotateY(-8deg) rotateX(2deg)",
              }}>
                {/* Door line */}
                <div style={{ position: "absolute", top: 8, bottom: 8, left: "50%", width: 1, background: "rgba(0,0,0,0.15)" }} />
                {/* Handles */}
                <div style={{ position: "absolute", top: "50%", left: "46%", width: 3, height: 30, background: GOLD, borderRadius: 2, transform: "translateY(-50%)" }} />
                <div style={{ position: "absolute", top: "50%", left: "52%", width: 3, height: 30, background: GOLD, borderRadius: 2, transform: "translateY(-50%)" }} />
                {/* Shelves visible inside */}
                {[25, 50, 75].map(p => (
                  <div key={p} style={{ position: "absolute", top: `${p}%`, left: 6, right: 6, height: 2, background: "rgba(0,0,0,0.1)", borderRadius: 1 }} />
                ))}
              </div>
            </div>
            <div style={{ position: "absolute", bottom: 16, fontFamily: "Heebo, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.3)", fontWeight: 300 }}>תצוגה מקדימה</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ─── */
function Testimonials() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ padding: "100px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <span style={{ fontFamily: "Heebo, sans-serif", fontSize: 13, fontWeight: 500, color: GOLD, letterSpacing: 3 }}>מה אומרים עלינו</span>
          <h2 style={{ fontFamily: "Heebo, sans-serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, color: DARK, marginTop: 12, marginBottom: 48 }}>הלקוחות שלנו ממליצים</h2>
        </Reveal>
        <div style={{ position: "relative", minHeight: 200 }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={{
              position: i === active ? "relative" : "absolute",
              inset: 0, opacity: i === active ? 1 : 0,
              transform: i === active ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)",
              pointerEvents: i === active ? "auto" : "none",
            }}>
              <div style={{ fontSize: 36, color: GOLD, marginBottom: 16 }}>❝</div>
              <p style={{ fontFamily: "Heebo, sans-serif", fontSize: 20, fontWeight: 300, color: "#555", lineHeight: 1.8, marginBottom: 24 }}>
                {t.text}
              </p>
              <div style={{ fontFamily: "Heebo, sans-serif", fontSize: 16, fontWeight: 700, color: DARK }}>{t.name}</div>
              <div style={{ fontFamily: "Heebo, sans-serif", fontSize: 14, fontWeight: 300, color: "#999" }}>{t.city}</div>
              <div style={{ color: GOLD, fontSize: 18, marginTop: 8, letterSpacing: 2 }}>★★★★★</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 32 }}>
          {TESTIMONIALS.map((_, i) => (
            <div key={i} onClick={() => setActive(i)} style={{
              width: i === active ? 32 : 10, height: 10, borderRadius: 5,
              background: i === active ? GOLD : MUTED,
              cursor: "pointer", transition: "all 0.4s ease",
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT SECTION ─── */
function ContactSection() {
  return (
    <section id="contact" style={{ padding: "100px 24px", background: BG }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ fontFamily: "Heebo, sans-serif", fontSize: 13, fontWeight: 500, color: GOLD, letterSpacing: 3 }}>נשמח לשמוע מכם</span>
            <h2 style={{ fontFamily: "Heebo, sans-serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, color: DARK, marginTop: 12 }}>רוצים לשמוע עוד? דברו איתנו</h2>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48 }}>
          <Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {["שם מלא", "טלפון", "אימייל", "ספרו לנו על הפרויקט שלכם..."].map((ph, i) => (
                <div key={i}>
                  {i === 3 ? (
                    <textarea placeholder={ph} rows={4} style={{
                      width: "100%", padding: 16, borderRadius: 12, border: "1px solid " + MUTED,
                      fontFamily: "Heebo, sans-serif", fontSize: 15, background: "#fff", resize: "vertical",
                      outline: "none", transition: "border 0.3s",
                    }} onFocus={e => e.target.style.borderColor = GOLD} onBlur={e => e.target.style.borderColor = MUTED} />
                  ) : (
                    <input placeholder={ph} style={{
                      width: "100%", padding: 16, borderRadius: 12, border: "1px solid " + MUTED,
                      fontFamily: "Heebo, sans-serif", fontSize: 15, background: "#fff",
                      outline: "none", transition: "border 0.3s",
                    }} onFocus={e => e.target.style.borderColor = GOLD} onBlur={e => e.target.style.borderColor = MUTED} />
                  )}
                </div>
              ))}
              <GoldButton large style={{ width: "100%", marginTop: 8 }}>שלחו הודעה</GoldButton>
            </div>
          </Reveal>
          <Reveal delay={2}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24, fontFamily: "Heebo, sans-serif" }}>
              <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid rgba(184,150,90,0.1)" }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: GOLD, marginBottom: 8 }}>טלפון</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: DARK, direction: "ltr", textAlign: "right" }}>054-123-4567</div>
              </div>
              <GoldButton large green style={{ width: "100%" }}>
                💬 שלחו הודעה בוואטסאפ
              </GoldButton>
              <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid rgba(184,150,90,0.1)" }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: GOLD, marginBottom: 8 }}>כתובת</div>
                <div style={{ fontSize: 16, fontWeight: 400, color: "#555" }}>רחוב התעשייה 12, אזור תעשייה</div>
                <div style={{ fontSize: 14, fontWeight: 300, color: "#999", marginTop: 4 }}>א׳–ה׳ 08:00–18:00 | ו׳ 08:00–13:00</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer style={{ background: DARK, padding: "48px 24px 32px", fontFamily: "Heebo, sans-serif" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 24 }}>
        <div style={{ fontSize: 20, fontWeight: 900, color: "#fff" }}><span style={{ color: GOLD }}>◆</span> ארונות פרימיום</div>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {["דף הבית", "השירותים שלנו", "הפרויקטים שלנו", "צור קשר", "עיצוב אישי"].map(l => (
            <span key={l} style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", cursor: "pointer", transition: "color 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.color = GOLD}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
            >{l}</span>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: 1080, margin: "32px auto 0", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.08)", textAlign: "center", fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
        כל הזכויות שמורות © 2024 ארונות פרימיום
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════
   DESIGN PAGE — CLOSET CONFIGURATOR
   ═══════════════════════════════════════════════ */

function DesignPage() {
  const [config, setConfig] = useState({
    width: 200, height: 240, depth: 60,
    doors: 3, material: MATERIALS[1],
    sections: [
      { shelves: 3, drawers: 0, rail: false },
      { shelves: 0, drawers: 2, rail: true },
      { shelves: 2, drawers: 1, rail: false },
    ],
  });

  const updateSection = (idx, key, val) => {
    setConfig(prev => {
      const s = [...prev.sections];
      s[idx] = { ...s[idx], [key]: val };
      return { ...prev, sections: s };
    });
  };

  const setDoors = (n) => {
    setOpenDoors({});
    setConfig(prev => ({
      ...prev, doors: n,
      sections: Array.from({ length: n }, (_, i) =>
        prev.sections[i] || { shelves: 2, drawers: 0, rail: false }
      ),
    }));
  };

  /* ─── Door open state ─── */
  const [openDoors, setOpenDoors] = useState({});
  const allOpen = Object.values(openDoors).filter(Boolean).length === config.doors;

  const toggleDoor = (i) => setOpenDoors(prev => ({ ...prev, [i]: !prev[i] }));
  const toggleAll = () => {
    if (allOpen) {
      setOpenDoors({});
    } else {
      const all = {};
      for (let i = 0; i < config.doors; i++) all[i] = true;
      setOpenDoors(all);
    }
  };

  /* ─── 3D Mock Closet (CSS) with openable doors ─── */
  const ClosetPreview = () => {
    const scaleH = config.height / 240;
    const scaleW = config.width / 300;
    const renderW = Math.min(420, 300 * scaleW);
    const renderH = Math.min(380, 300 * scaleH);
    const doorW = renderW / config.doors;

    /* Darken material color for interior back wall */
    const darken = (hex, amt) => {
      let c = hex.replace("#", "");
      let r = Math.max(0, parseInt(c.substring(0, 2), 16) - amt);
      let g = Math.max(0, parseInt(c.substring(2, 4), 16) - amt);
      let b = Math.max(0, parseInt(c.substring(4, 6), 16) - amt);
      return `rgb(${r},${g},${b})`;
    };
    const lighten = (hex, amt) => {
      let c = hex.replace("#", "");
      let r = Math.min(255, parseInt(c.substring(0, 2), 16) + amt);
      let g = Math.min(255, parseInt(c.substring(2, 4), 16) + amt);
      let b = Math.min(255, parseInt(c.substring(4, 6), 16) + amt);
      return `rgb(${r},${g},${b})`;
    };
    const matColor = config.material.color;
    const interiorColor = darken(matColor, 20);
    const shelfColor = darken(matColor, 10);
    const sideColor = darken(matColor, 30);

    return (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", gap: 16 }}>
        {/* Open/Close all button */}
        <button
          onClick={toggleAll}
          style={{
            fontFamily: "Heebo, sans-serif", fontSize: 13, fontWeight: 600,
            color: GOLD, background: "rgba(184,150,90,0.1)",
            border: "1px solid rgba(184,150,90,0.25)", borderRadius: 20,
            padding: "8px 20px", cursor: "pointer",
            transition: "all 0.3s", zIndex: 5,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(184,150,90,0.2)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(184,150,90,0.1)"; }}
        >
          {allOpen ? "סגור את כל הדלתות ✕" : "פתח את כל הדלתות ◨"}
        </button>

        {/* Closet body */}
        <div style={{
          width: renderW + 16, height: renderH + 8,
          position: "relative",
        }}>
          {/* ── Back wall (interior) ── */}
          <div style={{
            position: "absolute",
            top: 4, left: 8, right: 8, bottom: 4,
            background: interiorColor,
            borderRadius: 3,
            boxShadow: `inset 0 2px 20px rgba(0,0,0,0.25)`,
            transition: "background 0.5s ease",
            overflow: "hidden",
          }}>
            {/* Interior sections with shelves, drawers, rails */}
            <div style={{ display: "flex", height: "100%", position: "relative" }}>
              {config.sections.map((sec, si) => {
                const drawerTotalH = sec.drawers * 32;
                const railZoneH = sec.rail ? 35 : 0;
                const shelfZoneTop = railZoneH;
                const shelfZoneBottom = 100 - (drawerTotalH / renderH) * 100;
                const shelfSpaceH = shelfZoneBottom - shelfZoneTop;

                return (
                  <div key={si} style={{
                    flex: 1,
                    borderLeft: si > 0 ? `2px solid ${sideColor}` : "none",
                    position: "relative",
                    overflow: "hidden",
                  }}>
                    {/* Interior side shadow */}
                    <div style={{
                      position: "absolute", inset: 0,
                      background: `linear-gradient(90deg, rgba(0,0,0,0.06) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.06) 100%)`,
                      pointerEvents: "none",
                    }} />

                    {/* Hanging rail */}
                    {sec.rail && (
                      <div style={{ position: "absolute", top: "6%", left: "8%", right: "8%", height: "30%" }}>
                        {/* Rail bar */}
                        <div style={{
                          position: "absolute", top: 0, left: 0, right: 0,
                          height: 6, background: `linear-gradient(180deg, #D4B87A, ${GOLD}, #A07A42)`,
                          borderRadius: 3,
                          boxShadow: `0 2px 6px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.2) inset`,
                        }} />
                        {/* Rail brackets */}
                        {[2, "calc(100% - 6px)"].map((lr, bi) => (
                          <div key={bi} style={{
                            position: "absolute", top: -4, left: typeof lr === "number" ? lr : undefined, right: typeof lr !== "number" ? 2 : undefined,
                            width: 4, height: 14, borderRadius: 2,
                            background: `linear-gradient(180deg, #C0A060, ${GOLD_HOVER})`,
                          }} />
                        ))}
                        {/* Hangers */}
                        {Array.from({ length: Math.max(2, Math.floor(doorW / 18)) }).map((_, hi) => {
                          const hx = ((hi + 1) / (Math.max(2, Math.floor(doorW / 18)) + 1)) * 100;
                          return (
                            <div key={hi} style={{
                              position: "absolute", top: 6, left: `${hx}%`,
                              width: 1, height: "60%",
                              background: "rgba(0,0,0,0.12)",
                            }}>
                              <div style={{
                                position: "absolute", bottom: 0, left: -4, width: 9, height: 5,
                                borderBottom: "2px solid rgba(0,0,0,0.1)",
                                borderRadius: "0 0 4px 4px",
                              }} />
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Shelves */}
                    {Array.from({ length: sec.shelves }).map((_, shi) => {
                      const pct = shelfZoneTop + (shelfSpaceH / (sec.shelves + 1)) * (shi + 1);
                      return (
                        <div key={shi} style={{
                          position: "absolute",
                          left: 3, right: 3,
                          top: `${Math.min(pct, 92)}%`,
                          height: 5,
                          background: `linear-gradient(180deg, ${lighten(matColor, 5)}, ${shelfColor})`,
                          borderRadius: 1,
                          boxShadow: `0 2px 4px rgba(0,0,0,0.15), 0 -1px 0 rgba(255,255,255,0.1) inset`,
                          transition: "all 0.4s ease",
                        }}>
                          {/* Shelf edge highlight */}
                          <div style={{
                            position: "absolute", top: 0, left: 0, right: 0, height: 1,
                            background: "rgba(255,255,255,0.15)", borderRadius: "1px 1px 0 0",
                          }} />
                        </div>
                      );
                    })}

                    {/* Drawers */}
                    {Array.from({ length: sec.drawers }).map((_, di) => (
                      <div key={di} style={{
                        position: "absolute",
                        left: 4, right: 4,
                        bottom: di * 32 + 4,
                        height: 28,
                        background: `linear-gradient(180deg, ${lighten(matColor, 8)}, ${matColor})`,
                        border: `1px solid ${darken(matColor, 15)}`,
                        borderRadius: 3,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: `0 2px 6px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.15)`,
                        transition: "all 0.4s ease",
                      }}>
                        {/* Drawer handle */}
                        <div style={{
                          width: Math.min(28, doorW * 0.35), height: 4, borderRadius: 2,
                          background: `linear-gradient(90deg, #C0A060, ${GOLD}, #C0A060)`,
                          boxShadow: `0 1px 3px rgba(0,0,0,0.2)`,
                        }} />
                        {/* Drawer bottom edge */}
                        <div style={{
                          position: "absolute", bottom: 0, left: 2, right: 2, height: 1,
                          background: "rgba(0,0,0,0.08)",
                        }} />
                      </div>
                    ))}

                    {/* Empty section label if nothing inside */}
                    {sec.shelves === 0 && sec.drawers === 0 && !sec.rail && (
                      <div style={{
                        position: "absolute", inset: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, color: "rgba(0,0,0,0.15)", fontFamily: "Heebo, sans-serif",
                      }}>ריק</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Outer frame (sides, top, bottom) ── */}
          {/* Top */}
          <div style={{
            position: "absolute", top: 0, left: 4, right: 4, height: 6,
            background: `linear-gradient(180deg, ${lighten(matColor, 10)}, ${matColor})`,
            borderRadius: "4px 4px 0 0",
            boxShadow: "0 -1px 4px rgba(0,0,0,0.1)",
            zIndex: 3, transition: "background 0.5s ease",
          }} />
          {/* Bottom */}
          <div style={{
            position: "absolute", bottom: 0, left: 4, right: 4, height: 6,
            background: `linear-gradient(0deg, ${darken(matColor, 5)}, ${matColor})`,
            borderRadius: "0 0 4px 4px",
            zIndex: 3, transition: "background 0.5s ease",
          }} />
          {/* Left side */}
          <div style={{
            position: "absolute", top: 0, left: 0, width: 8, bottom: 0,
            background: `linear-gradient(90deg, ${darken(matColor, 15)}, ${matColor})`,
            borderRadius: "4px 0 0 4px",
            zIndex: 3, transition: "background 0.5s ease",
          }} />
          {/* Right side */}
          <div style={{
            position: "absolute", top: 0, right: 0, width: 8, bottom: 0,
            background: `linear-gradient(270deg, ${darken(matColor, 15)}, ${matColor})`,
            borderRadius: "0 4px 4px 0",
            zIndex: 3, transition: "background 0.5s ease",
          }} />

          {/* ── Doors (clickable, animated open) ── */}
          {Array.from({ length: config.doors }).map((_, di) => {
            const isOpen = !!openDoors[di];
            const isEven = di % 2 === 0;
            const doorWidthPx = (renderW) / config.doors;
            const leftPos = 8 + di * doorWidthPx;

            return (
              <div
                key={di}
                onClick={() => toggleDoor(di)}
                style={{
                  position: "absolute",
                  top: 6, bottom: 6,
                  left: leftPos,
                  width: doorWidthPx,
                  zIndex: 4,
                  cursor: "pointer",
                  overflow: "hidden",
                  transformOrigin: isEven ? "right center" : "left center",
                  transform: isOpen ? "scaleX(0.12)" : "scaleX(1)",
                  opacity: isOpen ? 0.7 : 1,
                  transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease",
                }}
              >
                {/* Door face */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: `linear-gradient(135deg, ${lighten(matColor, 12)}, ${matColor}, ${darken(matColor, 8)})`,
                  borderRadius: 2,
                  border: `1px solid ${darken(matColor, 20)}`,
                  boxShadow: isOpen
                    ? `2px 0 12px rgba(0,0,0,0.4)`
                    : `0 1px 4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)`,
                  transition: "box-shadow 0.6s ease, background 0.5s ease",
                  overflow: "hidden",
                }}>
                  {/* Door panel inset border */}
                  <div style={{
                    position: "absolute",
                    top: 10, left: 6, right: 6, bottom: 10,
                    border: `1px solid rgba(${matColor === "#F5F0EB" || matColor === "#EDE5D8" ? "0,0,0,0.06" : "255,255,255,0.08"})`,
                    borderRadius: 2, pointerEvents: "none",
                  }} />
                  {/* Door handle */}
                  <div style={{
                    position: "absolute",
                    top: "50%",
                    ...(isEven ? { left: 8 } : { right: 8 }),
                    width: 4, height: 28,
                    background: `linear-gradient(180deg, #D4B87A, ${GOLD}, #A07A42)`,
                    borderRadius: 2,
                    transform: "translateY(-50%)",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.3)",
                  }} />
                  {/* Door subtle shine */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(120deg, rgba(255,255,255,0.1) 0%, transparent 35%, transparent 65%, rgba(0,0,0,0.04) 100%)",
                    pointerEvents: "none",
                  }} />
                  {/* Click hint text */}
                  {!isOpen && (
                    <div style={{
                      position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)",
                      fontSize: 10, color: `rgba(${matColor === "#F5F0EB" || matColor === "#EDE5D8" ? "0,0,0,0.2" : "255,255,255,0.25"})`,
                      fontFamily: "Heebo, sans-serif", fontWeight: 400,
                      whiteSpace: "nowrap",
                    }}>
                      👆 פתח
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dimension labels */}
        <div style={{
          fontFamily: "Heebo, sans-serif", fontSize: 13,
          color: "rgba(255,255,255,0.4)", fontWeight: 300, textAlign: "center",
          marginTop: 4,
        }}>
          {config.width} × {config.height} × {config.depth} ס״מ
        </div>
      </div>
    );
  };

  /* ─── Slider component ─── */
  const ConfigSlider = ({ label, value, min, max, step, onChange }) => (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontFamily: "Heebo, sans-serif", fontSize: 14, fontWeight: 500, color: "#888" }}>{label}</span>
        <span style={{ fontFamily: "Heebo, sans-serif", fontSize: 16, fontWeight: 700, color: DARK, direction: "ltr" }}>{value} ס״מ</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(+e.target.value)}
        style={{
          width: "100%", height: 6, borderRadius: 3, outline: "none", cursor: "pointer",
          appearance: "none", background: `linear-gradient(to left, ${GOLD} ${((value - min) / (max - min)) * 100}%, ${MUTED} ${((value - min) / (max - min)) * 100}%)`,
        }}
      />
    </div>
  );

  /* ─── Section editor ─── */
  const SectionEditor = ({ section, index }) => {
    const [open, setOpen] = useState(index === 0);
    const Counter = ({ label, value, onInc, onDec, max }) => (
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid " + MUTED }}>
        <span style={{ fontFamily: "Heebo, sans-serif", fontSize: 14, color: "#666" }}>{label}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={onDec} disabled={value <= 0}
            style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid " + MUTED, background: "#fff", fontFamily: "Heebo", fontSize: 18, cursor: value > 0 ? "pointer" : "default", color: value > 0 ? DARK : "#ccc", transition: "all 0.2s" }}>−</button>
          <span style={{ fontFamily: "Heebo, sans-serif", fontSize: 16, fontWeight: 700, color: DARK, minWidth: 24, textAlign: "center" }}>{value}</span>
          <button onClick={onInc} disabled={value >= max}
            style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid " + MUTED, background: value < max ? GOLD : "#fff", fontFamily: "Heebo", fontSize: 18, cursor: value < max ? "pointer" : "default", color: value < max ? "#fff" : "#ccc", transition: "all 0.2s" }}>+</button>
        </div>
      </div>
    );

    return (
      <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${open ? GOLD : MUTED}`, overflow: "hidden", transition: "border 0.3s", marginBottom: 8 }}>
        <div onClick={() => setOpen(!open)}
          style={{ padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
          <span style={{ fontFamily: "Heebo, sans-serif", fontSize: 15, fontWeight: 600, color: DARK }}>מקטע {index + 1}</span>
          <span style={{ fontSize: 12, color: GOLD, transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s" }}>▼</span>
        </div>
        <div style={{ maxHeight: open ? 300 : 0, overflow: "hidden", transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)", padding: open ? "0 18px 14px" : "0 18px" }}>
          <Counter label="מדפים" value={section.shelves} max={6} onInc={() => updateSection(index, "shelves", section.shelves + 1)} onDec={() => updateSection(index, "shelves", section.shelves - 1)} />
          <Counter label="מגירות" value={section.drawers} max={4} onInc={() => updateSection(index, "drawers", section.drawers + 1)} onDec={() => updateSection(index, "drawers", section.drawers - 1)} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0" }}>
            <span style={{ fontFamily: "Heebo, sans-serif", fontSize: 14, color: "#666" }}>מוט תלייה</span>
            <div
              onClick={() => updateSection(index, "rail", !section.rail)}
              style={{
                width: 48, height: 26, borderRadius: 13, cursor: "pointer",
                background: section.rail ? GOLD : MUTED, transition: "background 0.3s",
                position: "relative",
              }}
            >
              <div style={{
                width: 22, height: 22, borderRadius: 11, background: "#fff",
                position: "absolute", top: 2,
                right: section.rail ? 2 : 24,
                transition: "right 0.3s cubic-bezier(0.16,1,0.3,1)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const buildWhatsAppMsg = () => {
    let msg = `שלום, אני מעוניין/ת בארון בהתאמה אישית:\n`;
    msg += `מידות: ${config.width}×${config.height}×${config.depth} ס"מ\n`;
    msg += `דלתות: ${config.doors}\n`;
    msg += `חומר: ${config.material.name}\n`;
    config.sections.forEach((s, i) => {
      msg += `מקטע ${i + 1}: ${s.shelves} מדפים, ${s.drawers} מגירות${s.rail ? ", מוט תלייה" : ""}\n`;
    });
    msg += `\nאשמח לקבל הצעת מחיר. תודה!`;
    return encodeURIComponent(msg);
  };

  return (
    <div style={{ minHeight: "100vh", background: BG, paddingTop: 72, fontFamily: "Heebo, sans-serif" }}>
      {/* Page header */}
      <div style={{
        background: DARK, padding: "48px 24px 40px", textAlign: "center",
        animation: "fadeIn 0.6s ease both",
      }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: GOLD, letterSpacing: 3 }}>כלי העיצוב האישי</span>
        <h1 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, color: "#fff", marginTop: 8 }}>
          עצבו את הארון <span style={{ color: GOLD }}>המושלם</span> שלכם
        </h1>
        <p style={{ fontSize: 16, fontWeight: 300, color: "rgba(255,255,255,0.5)", marginTop: 8 }}>
          בחרו מידות, צבעים ותכולה — הארון מתעדכן בזמן אמת
        </p>
      </div>

      {/* Main layout */}
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: "32px 24px",
        display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.3fr)",
        gap: 32, alignItems: "start",
      }}>
        {/* Controls panel */}
        <div style={{ animation: "slideRight 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both" }}>
          {/* Step 1: Dimensions */}
          <div style={{ background: "#fff", borderRadius: 16, padding: 28, marginBottom: 16, border: "1px solid rgba(184,150,90,0.1)" }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: DARK, marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 28, height: 28, borderRadius: 8, background: GOLD, color: "#fff", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}>1</span>
              בחרו מידות
            </h3>
            <ConfigSlider label="רוחב" value={config.width} min={100} max={400} step={10} onChange={v => setConfig(p => ({ ...p, width: v }))} />
            <ConfigSlider label="גובה" value={config.height} min={200} max={270} step={10} onChange={v => setConfig(p => ({ ...p, height: v }))} />
            <ConfigSlider label="עומק" value={config.depth} min={50} max={70} step={5} onChange={v => setConfig(p => ({ ...p, depth: v }))} />
          </div>

          {/* Step 2: Doors */}
          <div style={{ background: "#fff", borderRadius: 16, padding: 28, marginBottom: 16, border: "1px solid rgba(184,150,90,0.1)" }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: DARK, marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 28, height: 28, borderRadius: 8, background: GOLD, color: "#fff", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}>2</span>
              מספר דלתות
            </h3>
            <div style={{ display: "flex", gap: 8 }}>
              {[2, 3, 4, 5, 6].map(n => (
                <button key={n} onClick={() => setDoors(n)}
                  style={{
                    flex: 1, padding: "14px 0", borderRadius: 10,
                    border: config.doors === n ? `2px solid ${GOLD}` : `1px solid ${MUTED}`,
                    background: config.doors === n ? `${GOLD}15` : "#fff",
                    fontFamily: "Heebo", fontSize: 18, fontWeight: 700,
                    color: config.doors === n ? GOLD : "#999",
                    cursor: "pointer", transition: "all 0.3s",
                  }}>
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Material */}
          <div style={{ background: "#fff", borderRadius: 16, padding: 28, marginBottom: 16, border: "1px solid rgba(184,150,90,0.1)" }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: DARK, marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 28, height: 28, borderRadius: 8, background: GOLD, color: "#fff", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}>3</span>
              צבע וחומר
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {MATERIALS.map(m => (
                <div key={m.id} onClick={() => setConfig(p => ({ ...p, material: m }))}
                  style={{
                    padding: 12, borderRadius: 12, cursor: "pointer",
                    border: config.material.id === m.id ? `2px solid ${GOLD}` : `1px solid ${MUTED}`,
                    background: config.material.id === m.id ? `${GOLD}08` : "#fff",
                    textAlign: "center", transition: "all 0.3s",
                  }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, margin: "0 auto 8px",
                    background: m.color, border: "1px solid rgba(0,0,0,0.08)",
                    boxShadow: config.material.id === m.id ? `0 4px 12px ${m.color}66` : "none",
                    transition: "box-shadow 0.3s",
                  }} />
                  <span style={{ fontSize: 13, fontWeight: 500, color: config.material.id === m.id ? DARK : "#888" }}>{m.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step 4: Internals */}
          <div style={{ background: "#fff", borderRadius: 16, padding: 28, marginBottom: 16, border: "1px solid rgba(184,150,90,0.1)" }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: DARK, marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 28, height: 28, borderRadius: 8, background: GOLD, color: "#fff", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}>4</span>
              עצבו את פנים הארון
            </h3>
            {config.sections.map((sec, i) => (
              <SectionEditor key={i} section={sec} index={i} />
            ))}
          </div>

          {/* Step 5: Summary & Send */}
          <div style={{
            background: `linear-gradient(135deg, ${DARK} 0%, #2C2420 100%)`,
            borderRadius: 16, padding: 28, border: "1px solid rgba(184,150,90,0.2)",
          }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 28, height: 28, borderRadius: 8, background: GOLD, color: "#fff", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}>5</span>
              סיכום ושליחה
            </h3>
            <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 20, marginBottom: 20 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 14 }}>
                <div>
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>מידות:</span>
                  <div style={{ color: "#fff", fontWeight: 600, marginTop: 2 }}>{config.width}×{config.height}×{config.depth} ס״מ</div>
                </div>
                <div>
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>דלתות:</span>
                  <div style={{ color: "#fff", fontWeight: 600, marginTop: 2 }}>{config.doors}</div>
                </div>
                <div>
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>חומר:</span>
                  <div style={{ color: GOLD, fontWeight: 600, marginTop: 2 }}>{config.material.name}</div>
                </div>
                <div>
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>מקטעים:</span>
                  <div style={{ color: "#fff", fontWeight: 600, marginTop: 2 }}>{config.sections.length}</div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <GoldButton large green style={{ width: "100%" }}
                onClick={() => window.open(`https://wa.me/972541234567?text=${buildWhatsAppMsg()}`, "_blank")}>
                💬 שלחו את העיצוב בוואטסאפ
              </GoldButton>
              <GoldButton large outline style={{ width: "100%", borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)" }}>
                שלחו טופס ונחזור אליכם
              </GoldButton>
            </div>
          </div>
        </div>

        {/* 3D Preview area */}
        <div style={{
          position: "sticky", top: 104,
          animation: "slideLeft 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s both",
        }}>
          <div style={{
            background: `linear-gradient(135deg, #2a2420 0%, #1a1a1a 100%)`,
            borderRadius: 20, aspectRatio: "4/3",
            border: "1px solid rgba(184,150,90,0.12)",
            position: "relative",
          }}>
            {/* Grid pattern bg */}
            <div style={{
              position: "absolute", inset: 0, opacity: 0.04,
              backgroundImage: "radial-gradient(circle, rgba(184,150,90,0.8) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
              pointerEvents: "none", borderRadius: 20,
            }} />
            <ClosetPreview />
            {/* Badge */}
            <div style={{
              position: "absolute", top: 16, right: 16,
              background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
              borderRadius: 20, padding: "6px 14px",
              fontFamily: "Heebo, sans-serif", fontSize: 12, color: GOLD, fontWeight: 500,
              border: "1px solid rgba(184,150,90,0.2)",
              pointerEvents: "none",
            }}>
              תצוגה מקדימה בזמן אמת
            </div>
            {/* Interaction hint */}
            <div style={{
              position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
              background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)",
              borderRadius: 20, padding: "8px 16px",
              fontFamily: "Heebo, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)", fontWeight: 300,
              display: "flex", alignItems: "center", gap: 6,
              pointerEvents: "none",
            }}>
              👆 לחצו על דלת כדי לפתוח ולראות את הפנים
            </div>
          </div>
        </div>
      </div>

      {/* Responsive override */}
      <style>{`
        @media (max-width: 900px) {
          .design-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════
   HOMEPAGE COMPOSITION
   ═══════════════════════════════════════ */
function HomePage({ setPage }) {
  return (
    <main>
      <Hero setPage={setPage} />
      <TrustBar />
      <Services />
      <Process />
      <ProjectsGallery />
      <ConfigTeaser setPage={setPage} />
      <Testimonials />
      <ContactSection />
    </main>
  );
}

/* ═══════════════════════════════════════
   APP ROOT
   ═══════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("home");

  useEffect(() => {
    injectStyles();
  }, []);

  return (
    <div dir="rtl" style={{ fontFamily: "Heebo, sans-serif", background: BG, color: DARK, minHeight: "100vh" }}>
      <Header page={page} setPage={setPage} />
      {page === "home" && <HomePage setPage={setPage} />}
      {page === "design" && <DesignPage />}
      <Footer />
    </div>
  );
}
