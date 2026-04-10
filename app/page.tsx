import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import ServicesSection from "@/components/home/ServicesSection";
import ProcessSection from "@/components/home/ProcessSection";
import ProjectsGallery from "@/components/home/ProjectsGallery";
import ConfigTeaser from "@/components/home/ConfigTeaser";
import Testimonials from "@/components/home/Testimonials";
import ContactSection from "@/components/contact/ContactSection";

export const metadata: Metadata = {
  title: "מ.מ ארונות — עיצוב, ייצור והתקנה",
  description:
    "עיצוב, ייצור והתקנה של ארונות בהתאמה אישית מלאה. 15+ שנות ניסיון, 2000+ פרויקטים, 5 שנות אחריות.",
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <ServicesSection />
      <ProcessSection />
      <ProjectsGallery />
      <ConfigTeaser />
      <Testimonials />
      <ContactSection />
    </main>
  );
}
