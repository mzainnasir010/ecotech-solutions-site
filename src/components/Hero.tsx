import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingLeaf } from "./FloatingLeaf";

export const Hero = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

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

  const headlineWords = ["Growing", "Tomorrow's", "Solutions"];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary via-olive-light to-secondary"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/50 to-secondary" />

      {/* Content */}
      <motion.div
        style={{ opacity, y }}
        className="container relative z-10 mx-auto px-6 lg:px-12 pt-24"
      >
        <div className="max-w-4xl">
          {/* Animated Headline */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-[88px] font-medium text-off-white leading-[1.05] tracking-tight mb-6">
            {headlineWords.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-4 md:mr-6">
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: wordIndex * 0.2 + charIndex * 0.03,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-off-white/80 font-light mb-10 max-w-2xl"
          >
            Where innovation meets nature. Pioneering sustainable technology
            that harmonizes progress with our planet.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Button
              onClick={scrollToServices}
              className="group rounded-full bg-primary px-8 py-6 text-base font-semibold text-secondary hover:bg-sage-light transition-all duration-300 hover:scale-105"
              style={{
                boxShadow: "0 8px 32px hsla(104, 30%, 71%, 0.3)",
              }}
            >
              Explore Our Work
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* 3D Floating Leaf */}
      <FloatingLeaf scrollProgress={scrollProgress} />

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={scrollToServices}
        style={{ opacity: 1 - scrollProgress * 2 }}
      >
        <span className="text-xs text-off-white/60 uppercase tracking-widest">
          Scroll to explore
        </span>
        <ChevronDown className="h-5 w-5 text-off-white/60 animate-scroll-indicator" />
      </motion.div>
    </section>
  );
};
