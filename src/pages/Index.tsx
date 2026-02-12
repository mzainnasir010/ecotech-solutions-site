import { lazy, Suspense } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";

// Lazy load below-the-fold sections
const MissionSection = lazy(() => import("@/components/MissionSection").then(m => ({ default: m.MissionSection })));
const ServicesSection = lazy(() => import("@/components/ServicesSection").then(m => ({ default: m.ServicesSection })));
const TextRevealSection = lazy(() => import("@/components/TextRevealSection").then(m => ({ default: m.TextRevealSection })));
const ProcessSection = lazy(() => import("@/components/ProcessSection").then(m => ({ default: m.ProcessSection })));
const PortfolioSection = lazy(() => import("@/components/PortfolioSection").then(m => ({ default: m.PortfolioSection })));
const GlobeSection = lazy(() => import("@/components/GlobeSection").then(m => ({ default: m.GlobeSection })));
const PartnersSection = lazy(() => import("@/components/PartnersSection").then(m => ({ default: m.PartnersSection })));
const StatsSection = lazy(() => import("@/components/StatsSection").then(m => ({ default: m.StatsSection })));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection").then(m => ({ default: m.TestimonialsSection })));
const ContactSection = lazy(() => import("@/components/ContactSection").then(m => ({ default: m.ContactSection })));
const CTASection = lazy(() => import("@/components/CTASection").then(m => ({ default: m.CTASection })));
const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));

// Minimal loading placeholder that matches section height
const SectionFallback = () => <div className="min-h-[50vh]" />;

const Index = () => {
  return (
    <main className="overflow-hidden">
      <Navigation />
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <MissionSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ServicesSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <TextRevealSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ProcessSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <PortfolioSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <GlobeSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <PartnersSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <StatsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <TestimonialsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ContactSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <CTASection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Footer />
      </Suspense>
    </main>
  );
};

export default Index;
