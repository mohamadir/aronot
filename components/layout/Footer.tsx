import Link from "next/link";
import { GOLD, DARK, BUSINESS_NAME } from "@/lib/constants";

const FOOTER_LINKS = [
  { href: "/", label: "דף הבית" },
  { href: "/services", label: "השירותים שלנו" },
  { href: "/gallery", label: "הפרויקטים שלנו" },
  { href: "/contact", label: "צור קשר" },
  { href: "/design", label: "עיצוב אישי" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: DARK,
        padding: "48px 24px 32px",
        fontFamily: "var(--font-heebo), Heebo, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 24,
        }}
      >
        <div style={{ fontSize: 20, fontWeight: 900, color: "#fff" }}>
          <span style={{ color: GOLD }}>◆</span> {BUSINESS_NAME}
        </div>

        <nav
          style={{ display: "flex", gap: 24, flexWrap: "wrap" }}
          aria-label="ניווט תחתון"
        >
          {FOOTER_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="footer-link">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div
        style={{
          maxWidth: 1080,
          margin: "32px auto 0",
          paddingTop: 24,
          borderTop: "1px solid rgba(255,255,255,0.08)",
          textAlign: "center",
          fontSize: 13,
          color: "rgba(255,255,255,0.3)",
        }}
      >
        כל הזכויות שמורות © 2024 מ.מ ארונות
      </div>
    </footer>
  );
}
