import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Leaf, Zap, Recycle, Sun, TreeDeciduous, Droplets } from "lucide-react";

const services = [
  {
    icon: Leaf,
    title: "Green Engineering",
    description:
      "We redesign infrastructure so it runs cleaner without sacrificing speed. One client cut server costs 40% just by rethinking their architecture with us.",
  },
  {
    icon: Zap,
    title: "Clean Energy Systems",
    description:
      "We help businesses switch to renewables in a way that actually makes financial sense. No greenwashing, just real energy savings from day one.",
  },
  {
    icon: Recycle,
    title: "Circular Economy",
    description:
      "That 'waste' your operation produces? We build systems that turn it into raw material for someone else. Zero waste isn't a dream — it's an engineering problem.",
  },
  {
    icon: Sun,
    title: "Solar Innovation",
    description:
      "Our solar setups consistently hit 22%+ efficiency because we obsess over panel placement, inverter matching, and the boring details most firms skip.",
  },
  {
    icon: TreeDeciduous,
    title: "Carbon Solutions",
    description:
      "We track, measure, and offset carbon with verified science — not vague promises. You'll get a dashboard showing exactly where your emissions stand.",
  },
  {
    icon: Droplets,
    title: "Water Tech",
    description:
      "From factory floors to farming operations, we've built purification systems that cut water use by up to 35%. Every drop accounted for.",
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
      className="relative py-32 md:py-40 lg:py-48 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, hsl(80 15% 90%) 0%, hsl(60 10% 93%) 50%, hsl(80 15% 90%) 100%)' }}
    >
      {/* Subtle background gradient */}
      <motion.div 
        className="absolute inset-0 opacity-40"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] bg-primary/25" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px] bg-sage-light/25" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px] bg-primary/10" />
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
              What We{" "}
              <span className="text-primary">Actually</span>{" "}
              Do
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-xl lg:ml-auto"
            >
              Six areas where we've seen the biggest impact. 
              Each one tested in the field, not just on a slide deck.
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
