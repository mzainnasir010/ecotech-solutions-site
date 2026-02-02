import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const TextRevealSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["inset(100% 0 0 0)", "inset(0% 0 0 0)", "inset(0% 0 100% 0)"]
  );

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[200vh] bg-background"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Background text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-serif text-[20vw] text-foreground/[0.03] select-none pointer-events-none">
            ECO
          </span>
        </div>

        {/* Main content */}
        <motion.div 
          style={{ scale, y }}
          className="container mx-auto px-6 lg:px-12 text-center relative z-10"
        >
          <motion.div
            style={{ clipPath }}
            className="overflow-hidden"
          >
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-foreground leading-[0.9]">
              The future is
              <br />
              <span className="text-primary">regenerative</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-12 text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
          >
            We're not just reducing harm—we're actively restoring ecosystems 
            and creating positive environmental impact.
          </motion.p>

          {/* Floating elements */}
          <div className="absolute top-1/4 left-[10%] w-32 h-32 rounded-full border border-primary/20 animate-pulse" />
          <div className="absolute bottom-1/4 right-[15%] w-24 h-24 rounded-full bg-primary/10 blur-xl" />
        </motion.div>
      </div>
    </section>
  );
};
