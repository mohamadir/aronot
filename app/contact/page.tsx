import type { Metadata } from "next";
import ContactSection from "@/components/contact/ContactSection";
import { GOLD, DARK } from "@/lib/constants";

export const metadata: Metadata = {
  title: "צור קשר",
  description:
    "צרו קשר עם ארונות פרימיום לקבלת ייעוץ חינם והצעת מחיר. אנחנו כאן לענות על כל שאלה.",
};

export default function ContactPage() {
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
          נשמח לשמוע מכם
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
          דברו <span style={{ color: GOLD }}>איתנו</span>
        </h1>
        <p
          style={{
            fontSize: "clamp(16px,2vw,20px)",
            fontWeight: 300,
            color: "rgba(255,255,255,0.6)",
            marginTop: 16,
            maxWidth: 520,
            margin: "16px auto 0",
            lineHeight: 1.7,
          }}
        >
          ייעוץ ראשוני ללא עלות. נשמח לענות על כל שאלה.
        </p>
      </div>

      <ContactSection />
    </main>
  );
}
