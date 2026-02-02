import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Leaf, Zap, Recycle, Sun, TreeDeciduous, Droplets } from "lucide-react";
import { StaggerContainer, StaggerItem } from "./SmoothScroll";

const services = [
  {
    icon: Leaf,
    title: "Green Engineering",
    description:
      "Revolutionary sustainable technology solutions that minimize environmental impact while maximizing efficiency and performance.",
  },
  {
    icon: Zap,
    title: "Clean Energy Systems",
    description:
      "Cutting-edge renewable energy infrastructure designed to power the next generation of sustainable businesses.",
  },
  {
    icon: Recycle,
    title: "Circular Economy",
    description:
      "Innovative waste reduction and resource recovery systems that transform industries into zero-waste operations.",
  },
  {
    icon: Sun,
    title: "Solar Innovation",
    description:
      "Next-generation photovoltaic solutions with unprecedented efficiency rates and seamless integration.",
  },
  {
    icon: TreeDeciduous,
    title: "Carbon Solutions",
    description:
      "Comprehensive carbon capture and offset programs backed by verified environmental science.",
  },
  {
    icon: Droplets,
    title: "Water Tech",
    description:
      "Advanced water purification and conservation systems for sustainable resource management.",
  },
];

export const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-32 md:py-40 lg:py-48 bg-background overflow-hidden"
    >
      {/* Subtle background gradient */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] bg-primary/20" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px] bg-sage-light/20" />
      </motion.div>

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-12 h-[1px] bg-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-[0.2em]">
              Our Services
            </span>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground leading-[1.1]"
            >
              Building a{" "}
              <span className="text-primary">Greener</span>{" "}
              Future Together
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-xl lg:ml-auto"
            >
              We combine cutting-edge technology with sustainable practices 
              to create solutions that benefit both businesses and the environment.
            </motion.p>
          </div>
        </div>

        {/* Services Grid */}
        <StaggerContainer 
          staggerDelay={0.1}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <StaggerItem key={service.title}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="group relative p-8 lg:p-10 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
                >
                  {/* Icon */}
                  <div className="mb-6 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="font-serif text-2xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>

                  {/* Hover line */}
                  <div className="absolute bottom-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};
