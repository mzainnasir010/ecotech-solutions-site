import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "./SmoothScroll";

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    subtitle: "We Listen First",
    description:
      "We spend the first two weeks just asking questions. What's working, what's not, where the waste is. No pitch decks — just honest conversations with your team on the ground.",
  },
  {
    number: "02",
    title: "Strategy",
    subtitle: "A Plan That Makes Sense",
    description:
      "We map out what to change and in what order. The goal is quick wins in the first 90 days while setting up bigger structural changes. Everything ties back to real numbers.",
  },
  {
    number: "03",
    title: "Implementation",
    subtitle: "Heads Down, Building",
    description:
      "This is where we get our hands dirty. Our engineers embed with your team, ship iteratively, and don't disappear until the thing is running smoothly in production.",
  },
  {
    number: "04",
    title: "Optimization",
    subtitle: "We Stick Around",
    description:
      "After launch, we keep measuring. Monthly check-ins, performance dashboards, and adjustments based on what the data actually shows — not what we hoped would happen.",
  },
];

export const ProcessSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-32 md:py-40 lg:py-48 bg-secondary overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] rounded-full bg-sage-dark/10 blur-[80px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-20 md:mb-32 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-12 h-[1px] bg-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-[0.2em]">
              Our Process
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-off-white leading-[1.1]"
          >
            How We{" "}
            <span className="text-primary">Actually</span>{" "}
            Work
          </motion.h2>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Vertical line - animated */}
          <div className="absolute left-8 lg:left-16 top-0 bottom-0 w-[1px] bg-off-white/10">
            <motion.div 
              className="w-full bg-primary origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-24 lg:space-y-32">
            {processSteps.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.1}>
                <div className="relative pl-24 lg:pl-40">
                  {/* Number badge */}
                  <div className="absolute left-0 lg:left-8 top-0 w-16 h-16 rounded-full bg-secondary border border-primary flex items-center justify-center">
                    <span className="font-serif text-2xl text-primary">{step.number}</span>
                  </div>

                  {/* Large background number */}
                  <div className="absolute -left-8 lg:left-24 -top-8 font-serif text-[180px] lg:text-[240px] text-off-white/[0.02] leading-none select-none pointer-events-none">
                    {step.number}
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <span className="text-sm text-primary uppercase tracking-[0.2em] mb-2 block">
                      {step.subtitle}
                    </span>
                    <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-off-white mb-6">
                      {step.title}
                    </h3>
                    <p className="text-off-white/60 text-lg leading-relaxed max-w-2xl">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
