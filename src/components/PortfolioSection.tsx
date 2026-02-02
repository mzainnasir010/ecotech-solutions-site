import { useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Solar Grid Revolution",
    category: "Clean Energy",
    description: "A nationwide solar infrastructure project delivering clean energy to over 2 million homes across 15 states.",
    stats: "2.4M+ Homes Powered",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop",
    year: "2024",
  },
  {
    id: 2,
    title: "Ocean Plastic Initiative",
    category: "Circular Economy",
    description: "Revolutionary ocean cleanup technology converting marine waste into sustainable materials for construction.",
    stats: "850K Tons Recovered",
    image: "https://images.unsplash.com/photo-1484291470158-b8f8d608850d?q=80&w=2070&auto=format&fit=crop",
    year: "2023",
  },
  {
    id: 3,
    title: "Urban Forest Network",
    category: "Carbon Solutions",
    description: "Creating interconnected urban forests across major cities to combat climate change and improve air quality.",
    stats: "12M Trees Planted",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop",
    year: "2024",
  },
  {
    id: 4,
    title: "Smart Water Systems",
    category: "Water Tech",
    description: "AI-powered water management reducing consumption by 40% across industrial facilities worldwide.",
    stats: "40% Water Saved",
    image: "https://images.unsplash.com/photo-1468421870903-4df1664ac249?q=80&w=2089&auto=format&fit=crop",
    year: "2023",
  },
];

export const PortfolioSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress to current slide index (0 to projects.length - 1)
  const slideProgress = useTransform(scrollYProgress, [0, 1], [0, projects.length - 1]);
  
  // Progress bar
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Calculate which slide is active based on scroll
  const getActiveIndex = (progress: number) => {
    return Math.min(Math.floor(progress + 0.5), projects.length - 1);
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative bg-secondary"
      style={{ height: `${(projects.length + 1) * 100}vh` }}
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background Images - Crossfade */}
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="absolute inset-0"
            style={{
              opacity: useTransform(
                slideProgress,
                [index - 0.5, index, index + 0.5],
                [0, 1, 0]
              ),
            }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-secondary/80" />
          </motion.div>
        ))}

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-secondary/50 z-10" />

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-30 pt-32 pb-8 px-6 lg:px-12">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-[1px] bg-primary" />
                  <span className="text-sm font-medium text-primary uppercase tracking-[0.2em]">
                    Featured Work
                  </span>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-off-white leading-[1.1]">
                  Projects That{" "}
                  <span className="text-primary">Define</span>{" "}
                  Impact
                </h2>
              </div>

              {/* Progress indicator */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-off-white/60">Scroll to explore</span>
                <div className="w-32 h-1 bg-off-white/20 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary rounded-full"
                    style={{ width: progressWidth }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              {/* Left - Project Info */}
              <div className="relative">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="absolute inset-0"
                    style={{
                      opacity: useTransform(
                        slideProgress,
                        [index - 0.3, index, index + 0.3],
                        [0, 1, 0]
                      ),
                      y: useTransform(
                        slideProgress,
                        [index - 0.5, index, index + 0.5],
                        [60, 0, -60]
                      ),
                    }}
                  >
                    <div className="space-y-6">
                      {/* Category & Year */}
                      <div className="flex items-center gap-4">
                        <span className="px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium backdrop-blur-sm border border-primary/30">
                          {project.category}
                        </span>
                        <span className="text-off-white/40 text-sm">{project.year}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-off-white leading-[1.1]">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-off-white/60 text-lg md:text-xl max-w-lg leading-relaxed">
                        {project.description}
                      </p>

                      {/* Stats */}
                      <div className="pt-4">
                        <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-off-white/5 border border-off-white/10 backdrop-blur-sm">
                          <span className="font-serif text-3xl md:text-4xl text-primary">
                            {project.stats.split(' ')[0]}
                          </span>
                          <span className="text-off-white/60 text-sm">
                            {project.stats.split(' ').slice(1).join(' ')}
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
                    </div>
                  </motion.div>
                ))}
                
                {/* Spacer for layout */}
                <div className="invisible">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <span className="px-4 py-1.5">Category</span>
                    </div>
                    <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Title</h3>
                    <p className="text-lg md:text-xl max-w-lg">Description placeholder text</p>
                    <div className="pt-4"><div className="px-6 py-4">Stats</div></div>
                    <div className="pt-4"><button className="text-lg">CTA</button></div>
                  </div>
                </div>
              </div>

              {/* Right - Image Preview */}
              <div className="relative hidden lg:block">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      className="absolute inset-0"
                      style={{
                        opacity: useTransform(
                          slideProgress,
                          [index - 0.3, index, index + 0.3],
                          [0, 1, 0]
                        ),
                        scale: useTransform(
                          slideProgress,
                          [index - 0.5, index, index + 0.5],
                          [1.1, 1, 1.1]
                        ),
                      }}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent" />
                    </motion.div>
                  ))}
                  
                  {/* Frame decoration */}
                  <div className="absolute inset-0 border border-off-white/10 rounded-3xl pointer-events-none" />
                  <div className="absolute -inset-4 border border-primary/20 rounded-[2rem] pointer-events-none" />
                </div>

                {/* Floating project number */}
                <motion.div 
                  className="absolute -bottom-8 -right-8 font-serif text-[12rem] text-primary/10 leading-none pointer-events-none select-none"
                  style={{
                    opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]),
                  }}
                >
                  <motion.span
                    style={{
                      display: 'block',
                    }}
                  >
                    {projects.map((_, index) => (
                      <motion.span
                        key={index}
                        className="absolute"
                        style={{
                          opacity: useTransform(
                            slideProgress,
                            [index - 0.3, index, index + 0.3],
                            [0, 1, 0]
                          ),
                        }}
                      >
                        0{index + 1}
                      </motion.span>
                    ))}
                  </motion.span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
          {projects.map((_, index) => (
            <motion.div
              key={index}
              className="relative h-1 rounded-full overflow-hidden bg-off-white/20"
              style={{ width: index === 0 ? 48 : 24 }}
            >
              <motion.div
                className="absolute inset-0 bg-primary rounded-full origin-left"
                style={{
                  scaleX: useTransform(
                    slideProgress,
                    [index - 0.5, index, index + 0.5],
                    [0, 1, 0]
                  ),
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Scroll hint */}
        <motion.div 
          className="absolute bottom-12 right-12 z-30 hidden lg:flex items-center gap-2 text-off-white/40 text-sm"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 0.5, 0.5, 0]),
          }}
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Scroll</span>
          <ChevronRight className="h-4 w-4" />
        </motion.div>
      </div>
    </section>
  );
};
