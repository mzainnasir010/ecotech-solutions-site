import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Solar Grid Revolution",
    category: "Clean Energy",
    description: "A nationwide solar infrastructure project delivering clean energy to over 2 million homes.",
    stats: "2.4M+ Homes Powered",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Ocean Plastic Initiative",
    category: "Circular Economy",
    description: "Revolutionary ocean cleanup technology converting marine waste into sustainable materials.",
    stats: "850K Tons Recovered",
    image: "https://images.unsplash.com/photo-1484291470158-b8f8d608850d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Urban Forest Network",
    category: "Carbon Solutions",
    description: "Creating interconnected urban forests across major cities to combat climate change.",
    stats: "12M Trees Planted",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Smart Water Systems",
    category: "Water Tech",
    description: "AI-powered water management reducing consumption by 40% across industrial facilities.",
    stats: "40% Water Saved",
    image: "https://images.unsplash.com/photo-1468421870903-4df1664ac249?q=80&w=2089&auto=format&fit=crop",
  },
];

export const PortfolioSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
      return () => container.removeEventListener("scroll", updateScrollButtons);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth * 0.7;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-32 md:py-40 lg:py-48 bg-background overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12 mb-16">
        {/* Section Header */}
        <motion.div 
          style={{ y: headerY, opacity: headerOpacity }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-[0.2em]">
                Featured Work
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground leading-[1.1]">
              Projects That{" "}
              <span className="text-primary">Define</span>{" "}
              Impact
            </h2>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-300 ${
                canScrollLeft
                  ? "border-foreground/20 hover:border-primary hover:bg-primary hover:text-secondary text-foreground"
                  : "border-foreground/10 text-foreground/30 cursor-not-allowed"
              }`}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-300 ${
                canScrollRight
                  ? "border-foreground/20 hover:border-primary hover:bg-primary hover:text-secondary text-foreground"
                  : "border-foreground/10 text-foreground/30 cursor-not-allowed"
              }`}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Horizontal Scroll Gallery */}
      <div
        ref={scrollContainerRef}
        className="flex gap-8 overflow-x-auto hide-scrollbar pl-6 lg:pl-12 pr-6 pb-8"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="group relative flex-shrink-0 w-[85vw] md:w-[70vw] lg:w-[50vw] aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
            style={{ scrollSnapAlign: "start" }}
            onMouseEnter={() => setActiveIndex(index)}
          >
            {/* Image */}
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

            {/* Content */}
            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
              <div className="mb-4">
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium backdrop-blur-sm">
                  {project.category}
                </span>
              </div>

              <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-off-white mb-4 group-hover:text-primary transition-colors duration-300">
                {project.title}
              </h3>

              <p className="text-off-white/70 text-lg max-w-xl mb-6 line-clamp-2">
                {project.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-primary font-medium text-lg">
                  {project.stats}
                </span>
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <ArrowUpRight className="h-5 w-5 text-secondary" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress dots */}
      <div className="container mx-auto px-6 lg:px-12 mt-12">
        <div className="flex items-center gap-2">
          {projects.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-12 bg-primary"
                  : "w-4 bg-foreground/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
