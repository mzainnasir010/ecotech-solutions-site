import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { MissionSection } from "@/components/MissionSection";
import { ServicesSection } from "@/components/ServicesSection";
import { TextRevealSection } from "@/components/TextRevealSection";
import { ProcessSection } from "@/components/ProcessSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { GlobeSection } from "@/components/GlobeSection";
import { PartnersSection } from "@/components/PartnersSection";
import { StatsSection } from "@/components/StatsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ContactSection } from "@/components/ContactSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="overflow-hidden">
      <Navigation />
      <Hero />
      <MissionSection />
      <ServicesSection />
      <TextRevealSection />
      <ProcessSection />
      <PortfolioSection />
      <GlobeSection />
      <PartnersSection />
      <StatsSection />
      <TestimonialsSection />
      <ContactSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;
