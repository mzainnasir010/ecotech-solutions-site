import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParticleWave } from "./ParticleWave";

export const Hero = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  useEffect(() => {
    const handleScroll = () => {
      const progress = window.scrollY / window.innerHeight;
      setScrollProgress(Math.min(progress, 1));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToServices = () => {
    const element = document.querySelector("#services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Split headline for animation
  const lines = [
    { text: "SUSTAINABLE", delay: 0 },
    { text: "TECHNOLOGY", delay: 0.1 },
    { text: "FOR TOMORROW", delay: 0.2 },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[120vh] flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, hsl(105 28% 6%) 0%, hsl(105 28% 10%) 50%, hsl(105 20% 14%) 100%)" }}
    >
      {/* Gradient overlays - more dramatic */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 z-10" />
      
      {/* Top glow effect - more prominent */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full blur-[150px] z-0"
        style={{ background: "radial-gradient(ellipse, hsl(var(--primary) / 0.4) 0%, hsl(var(--gold) / 0.1) 50%, transparent 80%)" }}
      />
      
      {/* Bottom ambient glow */}
      <div 
        className="absolute bottom-0 left-1/4 w-[600px] h-[400px] rounded-full blur-[120px] z-0"
        style={{ background: "radial-gradient(ellipse, hsl(var(--primary) / 0.2) 0%, transparent 70%)" }}
      />

      {/* 3D Particle Wave Background */}
      <ParticleWave scrollProgress={scrollProgress} />

      {/* Top bar with meta info */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-24 left-0 right-0 z-20 px-6 lg:px-12"
      >
        <div className="container mx-auto flex justify-between items-center text-off-white/60 text-sm tracking-wide">
          <span>Sustainable Innovation</span>
          <span>Based Globally</span>
          <span className="hidden md:block">Est. 2024</span>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        style={{ y: textY, opacity: textOpacity, scale }}
        className="container relative z-20 mx-auto px-6 lg:px-12 pt-32"
      >
        <div className="max-w-[95vw] mx-auto">
          {/* Giant Typography */}
          <h1 className="font-serif text-[12vw] md:text-[10vw] lg:text-[9vw] font-medium leading-[0.9] tracking-[-0.03em] text-off-white overflow-hidden">
            {lines.map((line, lineIndex) => (
              <div key={lineIndex} className="overflow-hidden">
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1.2,
                    delay: line.delay + 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex"
                >
                  {line.text.split("").map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: line.delay + 0.8 + charIndex * 0.02,
                      }}
                      className="inline-block"
                      style={{ 
                        textShadow: "0 0 80px hsl(var(--primary) / 0.3)",
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            ))}
          </h1>

          {/* Subheadline and CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 md:mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
          >
            <p className="text-lg md:text-xl lg:text-2xl text-off-white/70 font-light max-w-xl leading-relaxed">
              Pioneering the intersection of innovation and nature. 
              We build technology that harmonizes progress with our planet's future.
            </p>

            <div className="flex items-center gap-4">
              <Button
                onClick={scrollToServices}
                className="group rounded-full bg-primary px-8 py-6 text-base font-semibold text-secondary hover:bg-sage-light transition-all duration-500 hover:scale-105"
                style={{
                  boxShadow: "0 8px 40px hsl(var(--primary) / 0.4)",
                }}
              >
                Explore Our Work
                <ArrowDown className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
              </Button>
              
              <button className="group flex items-center justify-center w-14 h-14 rounded-full border border-off-white/30 text-off-white/80 hover:bg-off-white/10 hover:border-off-white/50 transition-all duration-300">
                <Play className="h-5 w-5 transition-transform group-hover:scale-110" />
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 cursor-pointer z-20"
        onClick={scrollToServices}
        style={{ opacity: 1 - scrollProgress * 3 }}
      >
        <span className="text-xs text-off-white/50 uppercase tracking-[0.3em]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-16 bg-gradient-to-b from-off-white/50 to-transparent"
        />
      </motion.div>

      {/* Decorative corner elements */}
      <div className="absolute top-24 right-6 lg:right-12 z-20 text-off-white/30 text-xs tracking-widest hidden lg:block">
        <div className="rotate-90 origin-right">NATURE × TECH</div>
      </div>
    </section>
  );
};
