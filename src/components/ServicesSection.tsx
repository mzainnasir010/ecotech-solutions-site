import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Leaf, Zap, Recycle, Sun, TreeDeciduous, Droplets } from "lucide-react";

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

        {/* Services - Scroll-based reveal */}
        <div className="space-y-0">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isEven = index % 2 === 0;
            
            return (
              <ServiceCard 
                key={service.title}
                service={service}
                Icon={Icon}
                index={index}
                isEven={isEven}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

interface ServiceCardProps {
  service: typeof services[0];
  Icon: typeof Leaf;
  index: number;
  isEven: boolean;
}

const ServiceCard = ({ service, Icon, index, isEven }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });

  const x = useTransform(
    scrollYProgress, 
    [0, 1], 
    [isEven ? -100 : 100, 0]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <motion.div
      ref={cardRef}
      style={{ x, opacity, scale }}
      className="group relative"
    >
      {/* Horizontal divider line with animation */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-border/30 overflow-hidden">
        <motion.div 
          className="h-full bg-primary"
          style={{ width: lineWidth }}
        />
      </div>
      
      <div className={`py-12 md:py-16 lg:py-20 grid md:grid-cols-12 gap-6 md:gap-8 items-center ${isEven ? '' : 'md:text-right'}`}>
        {/* Number */}
        <div className={`md:col-span-2 ${isEven ? 'md:order-1' : 'md:order-3'}`}>
          <span className="font-serif text-6xl md:text-7xl lg:text-8xl text-primary/20 group-hover:text-primary/40 transition-colors duration-500">
            0{index + 1}
          </span>
        </div>

        {/* Icon */}
        <div className={`md:col-span-2 ${isEven ? 'md:order-2' : 'md:order-2'} flex ${isEven ? 'justify-start md:justify-center' : 'justify-start md:justify-center'}`}>
          <motion.div 
            className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500"
            whileHover={{ rotate: 5 }}
          >
            <Icon className="h-10 w-10 text-primary" />
          </motion.div>
        </div>

        {/* Content */}
        <div className={`md:col-span-8 ${isEven ? 'md:order-3' : 'md:order-1'}`}>
          <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 group-hover:text-primary transition-colors duration-500">
            {service.title}
          </h3>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
            {service.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
