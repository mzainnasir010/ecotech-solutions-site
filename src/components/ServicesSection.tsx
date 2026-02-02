import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Leaf, Code, BarChart3, Zap, Recycle, Globe } from "lucide-react";

const services = [
  {
    icon: Leaf,
    title: "Green Infrastructure",
    description:
      "Sustainable digital infrastructure powered by renewable energy sources, reducing your carbon footprint while maximizing performance.",
  },
  {
    icon: Code,
    title: "Eco-Friendly Development",
    description:
      "Clean code practices that minimize energy consumption and optimize for efficiency without compromising on functionality.",
  },
  {
    icon: BarChart3,
    title: "Impact Analytics",
    description:
      "Track and measure your environmental impact with comprehensive analytics that help you make data-driven sustainability decisions.",
  },
  {
    icon: Zap,
    title: "Energy Optimization",
    description:
      "Smart algorithms that reduce power consumption across your digital products, lowering costs and environmental impact.",
  },
  {
    icon: Recycle,
    title: "Circular Design",
    description:
      "Design systems that prioritize longevity, reusability, and minimal waste throughout the product lifecycle.",
  },
  {
    icon: Globe,
    title: "Carbon Neutral Hosting",
    description:
      "Host your applications on servers powered by 100% renewable energy with carbon offset programs.",
  },
];

export const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="services" className="section-padding bg-background">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 max-w-3xl"
        >
          <span className="text-xs font-medium uppercase tracking-[0.15em] text-primary mb-4 block">
            What We Do
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            Services That Grow Your Vision
          </h2>
          <p className="text-lg text-muted-foreground">
            We combine cutting-edge technology with sustainable practices to
            create digital solutions that benefit both your business and the
            planet.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="group h-full rounded-2xl border border-border bg-card p-8 transition-all duration-400 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5">
                <div className="mb-6 inline-flex rounded-xl bg-primary/10 p-3 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif text-2xl text-foreground mb-4">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>
                <button className="text-sm font-semibold text-primary flex items-center gap-1 group/link">
                  Learn more
                  <span className="transition-transform group-hover/link:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
