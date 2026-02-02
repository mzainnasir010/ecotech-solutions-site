import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discovery & Research",
    description:
      "We begin by understanding your vision, goals, and sustainability objectives. Through in-depth research and analysis, we identify opportunities to create meaningful environmental impact while meeting your business needs.",
    image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&q=80",
  },
  {
    number: "02",
    title: "Sustainable Strategy",
    description:
      "Our team crafts a comprehensive strategy that balances innovation with environmental responsibility. We map out the most efficient paths to achieve your goals while minimizing ecological footprint.",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80",
  },
  {
    number: "03",
    title: "Green Development",
    description:
      "Using eco-conscious development practices, we build your solution with clean code, optimized performance, and energy-efficient architecture. Every line of code is written with sustainability in mind.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
  },
  {
    number: "04",
    title: "Launch & Growth",
    description:
      "We deploy your solution on carbon-neutral infrastructure and provide ongoing optimization to ensure continued environmental performance. Your digital presence grows sustainably.",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
  },
];

const ProcessStep = ({
  step,
  index,
}: {
  step: (typeof steps)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const isReversed = index % 2 === 1;

  const imageRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col ${
        isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
      } gap-12 lg:gap-20 items-center mb-24 last:mb-0`}
    >
      {/* Image */}
      <div ref={imageRef} className="w-full lg:w-1/2 relative overflow-hidden rounded-3xl">
        <motion.img
          style={{ y: imageY }}
          src={step.image}
          alt={step.title}
          className="w-full h-[300px] lg:h-[450px] object-cover scale-110"
        />
      </div>

      {/* Content */}
      <div className="w-full lg:w-1/2 relative">
        {/* Large decorative number */}
        <span className="absolute -top-8 left-0 font-serif text-[120px] lg:text-[160px] font-light text-primary/10 leading-none select-none">
          {step.number}
        </span>

        <div className="relative z-10 pt-12 lg:pt-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl lg:text-4xl text-off-white mb-6"
          >
            {step.title}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-off-white/70 text-lg leading-relaxed max-w-lg"
          >
            {step.description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export const ProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="process" className="section-padding bg-secondary">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <span className="text-xs font-medium uppercase tracking-[0.15em] text-primary mb-4 block">
            Our Approach
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-off-white max-w-2xl mx-auto">
            A Process Rooted in Purpose
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <ProcessStep key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
