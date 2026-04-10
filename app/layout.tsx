import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const heebo = Heebo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-heebo",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ארונות פרימיום — עיצוב, ייצור והתקנה",
    template: "%s | ארונות פרימיום",
  },
  description:
    "עיצוב, ייצור והתקנה של ארונות בהתאמה אישית מלאה. 15+ שנות ניסיון, 2000+ פרויקטים, 5 שנות אחריות.",
  keywords: ["ארונות", "עיצוב ארונות", "ארונות בהתאמה אישית", "ארונות פרימיום", "ארון קיר"],
  openGraph: {
    title: "ארונות פרימיום — עיצוב, ייצור והתקנה",
    description:
      "עיצוב, ייצור והתקנה של ארונות בהתאמה אישית מלאה. 15+ שנות ניסיון, 2000+ פרויקטים.",
    locale: "he_IL",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <body className="font-heebo bg-site-bg text-site-dark antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
