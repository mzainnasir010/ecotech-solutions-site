import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Midwest Solar Grid",
    category: "Clean Energy",
    description: "We wired up solar panels across 15 states for a utility company that was skeptical it could work at scale. It did — and now 2.4 million homes run on it.",
    stats: "2.4M+",
    statsLabel: "Homes Powered",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop",
    year: "2024",
  },
  {
    id: 2,
    title: "Pacific Cleanup",
    category: "Circular Economy",
    description: "We built the barges and sorting systems that pull plastic from the Pacific and turn it into construction-grade material. 850K tons recovered so far.",
    stats: "850K",
    statsLabel: "Tons Recovered",
    image: "https://images.unsplash.com/photo-1484291470158-b8f8d608850d?q=80&w=2070&auto=format&fit=crop",
    year: "2023",
  },
  {
    id: 3,
    title: "City Canopy Project",
    category: "Carbon Solutions",
    description: "12 million trees planted across 40 cities. Not random planting — each location chosen using air quality data to maximize real impact on the neighborhoods that need it most.",
    stats: "12M",
    statsLabel: "Trees Planted",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop",
    year: "2024",
  },
  {
    id: 4,
    title: "Factory Water Loop",
    category: "Water Tech",
    description: "Factories waste a staggering amount of water. We built a closed-loop system for three manufacturing plants that cut their usage by 40% in the first year.",
    stats: "40%",
    statsLabel: "Water Saved",
    image: "https://images.unsplash.com/photo-1468421870903-4df1664ac249?q=80&w=2089&auto=format&fit=crop",
    year: "2023",
  },
];

export const PortfolioSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  }, []);

  const goToPrevious = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex((prev) => {
      setDirection(index > prev ? 1 : -1);
      return index;
    });
  }, []);

  // Auto-play functionality with ref to avoid stale closures
  useEffect(() => {
    const startAutoPlay = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
      }, 3000);
    };

    if (!isPaused) {
      startAutoPlay();
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused]);

  const currentProject = projects[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  const contentVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 60 : -60,
      opacity: 0,
    }),
  };

  return (
    <section 
      id="work" 
      className="relative min-h-screen bg-secondary overflow-hidden py-20 md:py-28"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0"
          >
            <img
              src={currentProject.image}
              alt={currentProject.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-secondary/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-secondary/60" />
      </div>

      {/* Header */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 mb-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-[0.2em]">
                Featured Work
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-off-white leading-[1.1]">
              Work We're{" "}
              <span className="text-primary">Proud</span>{" "}
              Of
            </h2>
          </div>

          {/* Slide Counter */}
          <div className="flex items-center gap-4">
            <span className="font-serif text-5xl text-primary">
              0{currentIndex + 1}
            </span>
            <span className="text-off-white/40">/</span>
            <span className="text-off-white/40">0{projects.length}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Project Info */}
          <div className="relative min-h-[400px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                className="space-y-6"
              >
                {/* Category & Year */}
                <div className="flex items-center gap-4">
                  <span className="px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium backdrop-blur-sm border border-primary/30">
                    {currentProject.category}
                  </span>
                  <span className="text-off-white/40 text-sm">{currentProject.year}</span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-off-white leading-[1.1]">
                  {currentProject.title}
                </h3>

                {/* Description */}
                <p className="text-off-white/60 text-lg md:text-xl max-w-lg leading-relaxed">
                  {currentProject.description}
                </p>

                {/* Stats */}
                <div className="pt-4">
                  <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-off-white/5 border border-off-white/10 backdrop-blur-sm">
                    <span className="font-serif text-4xl md:text-5xl text-primary">
                      {currentProject.stats}
                    </span>
                    <span className="text-off-white/60 text-sm uppercase tracking-wider">
                      {currentProject.statsLabel}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-4">
                  <button className="group inline-flex items-center gap-3 text-off-white hover:text-primary transition-colors duration-300">
                    <span className="text-lg font-medium">View Case Study</span>
                    <div className="w-10 h-10 rounded-full border border-current flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-secondary transition-all duration-300">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right - Image Preview */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                  className="absolute inset-0"
                >
                  <img
                    src={currentProject.image}
                    alt={currentProject.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Frame decoration */}
              <div className="absolute inset-0 border border-off-white/10 rounded-3xl pointer-events-none" />
            </div>

            {/* Floating project number */}
            <div className="absolute -bottom-6 -right-6 font-serif text-[10rem] text-primary/10 leading-none pointer-events-none select-none hidden lg:block">
              0{currentIndex + 1}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="relative z-20 container mx-auto px-6 lg:px-12 mt-12">
        <div className="flex items-center justify-between">
          {/* Dot indicators */}
          <div className="flex items-center gap-3">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-off-white/30 hover:bg-off-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Arrow buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={goToPrevious}
              className="group w-14 h-14 rounded-full border border-off-white/20 flex items-center justify-center hover:border-primary hover:bg-primary transition-all duration-300"
              aria-label="Previous project"
            >
              <ChevronLeft className="h-6 w-6 text-off-white group-hover:text-secondary transition-colors" />
            </button>
            <button
              onClick={goToNext}
              className="group w-14 h-14 rounded-full border border-off-white/20 flex items-center justify-center hover:border-primary hover:bg-primary transition-all duration-300"
              aria-label="Next project"
            >
              <ChevronRight className="h-6 w-6 text-off-white group-hover:text-secondary transition-colors" />
            </button>
          </div>
        </div>
      </div>

      {/* Decorative corner element */}
      <div className="absolute top-12 right-12 w-24 h-24 border border-primary/20 rounded-full hidden lg:block" />
      <div className="absolute bottom-12 left-12 w-16 h-16 border border-off-white/10 rounded-full hidden lg:block" />
    </section>
  );
};
