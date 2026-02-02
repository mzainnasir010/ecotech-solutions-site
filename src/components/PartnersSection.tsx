import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const partners = [
  "United Nations",
  "World Wildlife Fund",
  "Tesla Energy",
  "Patagonia",
  "Interface",
  "Unilever",
  "IKEA",
  "Google Green",
];

export const PartnersSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-background overflow-hidden"
    >
      {/* Section Header */}
      <div className="container mx-auto px-6 lg:px-12 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 justify-center"
        >
          <div className="w-12 h-[1px] bg-primary" />
          <span className="text-sm font-medium text-primary uppercase tracking-[0.2em]">
            Trusted By Industry Leaders
          </span>
          <div className="w-12 h-[1px] bg-primary" />
        </motion.div>
      </div>

      {/* Marquee Row 1 */}
      <div className="relative mb-8 overflow-hidden">
        <motion.div 
          style={{ x: x1 }}
          className="flex gap-16 whitespace-nowrap"
        >
          {[...partners, ...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className="flex items-center gap-4"
            >
              <span className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground/20 hover:text-primary/60 transition-colors duration-500 cursor-default">
                {partner}
              </span>
              <div className="w-3 h-3 rounded-full bg-primary/30" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Marquee Row 2 - Reverse */}
      <div className="relative overflow-hidden">
        <motion.div 
          style={{ x: x2 }}
          className="flex gap-16 whitespace-nowrap"
        >
          {[...partners.reverse(), ...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className="flex items-center gap-4"
            >
              <span className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground/10 hover:text-primary/40 transition-colors duration-500 cursor-default">
                {partner}
              </span>
              <div className="w-3 h-3 rounded-full bg-primary/20" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
    </section>
  );
};
