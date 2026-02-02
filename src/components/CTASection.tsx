import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Leaf, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -40]);
  const lineWidth = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const features = [
    { icon: Leaf, label: "Sustainable" },
    { icon: Zap, label: "Innovative" },
    { icon: Globe, label: "Global Impact" },
  ];

  return (
    <section 
      ref={sectionRef} 
      className="relative py-32 md:py-48 overflow-hidden"
      style={{ 
        background: "linear-gradient(165deg, hsl(105 28% 8%) 0%, hsl(105 35% 12%) 40%, hsl(104 30% 20%) 100%)" 
      }}
    >
      {/* Animated gradient orbs */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        style={{ y: bgY }}
      >
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(104 30% 50% / 0.15) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(43 35% 55% / 0.12) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Geometric grid overlay */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--off-white)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--off-white)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Animated horizontal line */}
      <motion.div 
        className="absolute top-1/2 left-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        style={{ width: lineWidth }}
      />

      <motion.div 
        ref={ref} 
        style={{ y: textY }}
        className="container mx-auto px-6 lg:px-12 relative z-10"
      >
        <div className="max-w-5xl mx-auto">
          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm"
              >
                <feature.icon className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">{feature.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Main headline - professional and dynamic */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="overflow-hidden"
            >
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-off-white mb-4 leading-[1.05]">
                Transform Your
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="overflow-hidden"
            >
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.05]">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-sage-light to-gold">
                  Vision Into Reality
                </span>
              </h2>
            </motion.div>
          </div>

          {/* Animated divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="w-32 h-[2px] bg-gradient-to-r from-primary to-gold mx-auto mb-10"
          />

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-off-white/60 mb-14 max-w-2xl mx-auto leading-relaxed text-center"
          >
            Partner with us to create sustainable technology solutions that drive 
            measurable impact and lasting change.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <Button
              onClick={scrollToContact}
              className="group relative rounded-full px-10 py-7 text-lg font-semibold text-secondary overflow-hidden transition-all duration-500 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--sage-dark)) 100%)",
                boxShadow: "0 8px 40px hsl(var(--primary) / 0.35), inset 0 1px 0 hsl(var(--sage-light) / 0.3)",
              }}
            >
              <span className="relative z-10 flex items-center">
                Start Your Project
                <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-2" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-sage-dark to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            </Button>
            
            <button
              onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
              className="group flex items-center gap-3 px-8 py-4 text-off-white/70 hover:text-off-white transition-colors duration-300"
            >
              <span className="text-base font-medium">Explore Services</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 pt-12 border-t border-off-white/10"
          >
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              {[
                { value: "150+", label: "Projects" },
                { value: "50M+", label: "Impact Reached" },
                { value: "98%", label: "Client Retention" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="font-serif text-3xl md:text-4xl text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-off-white/50">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-12 left-12 w-20 h-20 border border-primary/20 rounded-full hidden lg:block" />
      <div className="absolute bottom-12 right-12 w-28 h-28 border border-gold/15 rounded-full hidden lg:block" />
    </section>
  );
};
