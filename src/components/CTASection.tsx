import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -50]);

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={sectionRef} className="relative py-32 md:py-40 bg-secondary overflow-hidden">
      {/* Animated gradient background */}
      <motion.div 
        className="absolute inset-0"
        style={{ scale: bgScale }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-primary/20" />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsla(104, 30%, 71%, 0.15) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Floating particles - reduced count for performance */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${4 + Math.random() * 8}px`,
              height: `${4 + Math.random() * 8}px`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, hsl(var(--off-white)) 1px, transparent 1px),
                           linear-gradient(to bottom, hsl(var(--off-white)) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />
      </div>

      <motion.div 
        ref={ref} 
        style={{ y: textY }}
        className="container mx-auto px-6 lg:px-12 relative z-10"
      >
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/20 border border-primary/30 mb-8"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-primary text-sm font-medium">Got a project in mind?</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-off-white mb-8 leading-[1.1]"
          >
            Let's <span className="text-primary">Talk</span>
            <br />
            About It
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-off-white/60 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Whether you have a clear brief or just a rough idea, 
            we'd love to hear about it. No pitch, no pressure — just a conversation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Button
              onClick={scrollToContact}
              className="group rounded-full bg-primary px-12 py-8 text-xl font-semibold text-secondary hover:bg-sage-light transition-all duration-500 hover:scale-105"
              style={{
                boxShadow: "0 8px 40px hsla(104, 30%, 71%, 0.4)",
              }}
            >
              Start Your Project
              <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
            </Button>
          </motion.div>

          <motion.a
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            href="#services"
            className="inline-flex items-center gap-2 mt-8 text-off-white/50 text-sm hover:text-primary transition-colors"
          >
            <span className="w-8 h-[1px] bg-current" />
            or explore our services
            <span className="w-8 h-[1px] bg-current" />
          </motion.a>
        </div>
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-12 left-12 w-24 h-24 border border-off-white/10 rounded-full hidden lg:block" />
      <div className="absolute bottom-12 right-12 w-32 h-32 border border-primary/20 rounded-full hidden lg:block" />
    </section>
  );
};
