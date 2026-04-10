"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import GoldButton from "@/components/ui/GoldButton";
import { GOLD, DARK, BUSINESS_NAME } from "@/lib/constants";

const NAV_LINKS = [
  { href: "/", label: "דף הבית" },
  { href: "/services", label: "השירותים שלנו" },
  { href: "/gallery", label: "הפרויקטים שלנו" },
  { href: "/contact", label: "צור קשר" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when navigating
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isHero = !scrolled && pathname === "/";
  const isTransparent = !scrolled && pathname === "/";

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          left: 0,
          zIndex: 1000,
          background: isTransparent
            ? "transparent"
            : "rgba(250,250,248,0.97)",
          backdropFilter: isTransparent ? "none" : "blur(12px)",
          borderBottom: isTransparent
            ? "1px solid transparent"
            : "1px solid rgba(184,150,90,0.15)",
          transition: "all 0.4s ease",
          padding: "0 clamp(20px, 4vw, 60px)",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 72,
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: isHero ? "#fff" : DARK,
              textDecoration: "none",
              letterSpacing: -0.5,
              transition: "color 0.3s",
            }}
          >
            <span style={{ color: GOLD }}>◆</span> {BUSINESS_NAME}
          </Link>

          {/* Desktop nav */}
          <div
            className="desktop-nav"
            style={{ display: "flex", alignItems: "center", gap: 32 }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: 15,
                  fontWeight: 500,
                  color:
                    pathname === link.href
                      ? GOLD
                      : isHero
                      ? "rgba(255,255,255,0.85)"
                      : "#666",
                  textDecoration: "none",
                  transition: "color 0.3s",
                  paddingBottom: 4,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = GOLD)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color =
                    pathname === link.href
                      ? GOLD
                      : isHero
                      ? "rgba(255,255,255,0.85)"
                      : "#666")
                }
              >
                {link.label}
              </Link>
            ))}
            <Link href="/design" style={{ textDecoration: "none" }}>
              <GoldButton>✦ עיצוב אישי</GoldButton>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="mobile-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="תפריט"
            style={{
              display: "none",
              cursor: "pointer",
              padding: 8,
              background: "none",
              border: "none",
            }}
          >
            <div
              style={{
                width: 24,
                height: 2,
                background: isHero ? "#fff" : DARK,
                marginBottom: 6,
                transition: "all 0.3s",
                transform: menuOpen
                  ? "rotate(45deg) translate(5px,5px)"
                  : "none",
              }}
            />
            <div
              style={{
                width: 24,
                height: 2,
                background: isHero ? "#fff" : DARK,
                marginBottom: 6,
                transition: "all 0.3s",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <div
              style={{
                width: 24,
                height: 2,
                background: isHero ? "#fff" : DARK,
                transition: "all 0.3s",
                transform: menuOpen
                  ? "rotate(-45deg) translate(5px,-5px)"
                  : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 999,
          background: "rgba(26,26,26,0.97)",
          backdropFilter: "blur(20px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transform: menuOpen ? "scale(1)" : "scale(1.05)",
        }}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#fff",
              textDecoration: "none",
            }}
          >
            {link.label}
          </Link>
        ))}
        <Link href="/design" style={{ textDecoration: "none" }}>
          <GoldButton large>✦ עיצוב אישי</GoldButton>
        </Link>
      </div>
    </>
  );
}
