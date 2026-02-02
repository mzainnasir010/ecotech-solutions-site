import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    category: "Clean Energy",
    title: "SolarGrid Platform",
    description:
      "A smart energy management system for solar farms, optimizing power distribution and reducing waste by 40%.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
  },
  {
    category: "Conservation",
    title: "Wildlife Monitor",
    description:
      "AI-powered wildlife tracking system using low-energy sensors to protect endangered species across 50 reserves.",
    image: "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=800&q=80",
  },
  {
    category: "Sustainable Agriculture",
    title: "AgroSense IoT",
    description:
      "Precision agriculture platform reducing water usage by 60% through smart irrigation and soil monitoring.",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
  },
  {
    category: "Urban Planning",
    title: "GreenCity Hub",
    description:
      "Urban sustainability dashboard helping cities reduce emissions and optimize resource allocation.",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
  },
  {
    category: "Ocean Conservation",
    title: "OceanWatch",
    description:
      "Real-time ocean health monitoring platform tracking plastic pollution and marine ecosystem changes.",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80",
  },
];

export const PortfolioSection = () => {
  const ref = useRef(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 520; // Card width + gap
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="work" className="section-padding bg-background overflow-hidden">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
        >
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-primary mb-4 block">
              Case Studies
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">
              Projects We've Nurtured
            </h2>
          </div>

          {/* Scroll Controls */}
          <div className="flex gap-3 mt-6 md:mt-0">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="w-14 h-14 rounded-full bg-card border border-border flex items-center justify-center transition-all hover:bg-primary hover:text-secondary disabled:opacity-40 disabled:hover:bg-card disabled:hover:text-foreground"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="w-14 h-14 rounded-full bg-card border border-border flex items-center justify-center transition-all hover:bg-primary hover:text-secondary disabled:opacity-40 disabled:hover:bg-card disabled:hover:text-foreground"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Horizontal Scroll Gallery */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScrollPosition}
        className="flex gap-8 overflow-x-auto hide-scrollbar px-6 lg:px-20 pb-4"
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{
              duration: 0.8,
              delay: index * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex-shrink-0 w-[340px] md:w-[480px] group cursor-pointer"
          >
            <div className="relative rounded-3xl overflow-hidden h-[450px] md:h-[600px]">
              {/* Image */}
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/30 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="text-xs font-medium uppercase tracking-[0.1em] text-primary mb-2 block">
                  {project.category}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-off-white mb-3">
                  {project.title}
                </h3>
                <p className="text-off-white/70 text-sm md:text-base leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
