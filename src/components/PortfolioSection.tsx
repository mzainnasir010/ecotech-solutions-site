import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

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
  
  // Create sticky horizontal scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Map vertical scroll to horizontal position - scroll through all cards
  // Each card is ~50vw, so for 4 cards we need to scroll ~150vw (3 cards worth to see the 4th)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  
  // Progress bar
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Calculate proper section height: enough scroll distance to view all cards
  // Each card needs about 100vh of scroll to fully transition
  const sectionHeight = `${(projects.length + 0.5) * 100}vh`;

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative bg-background"
      style={{ height: sectionHeight }}
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        
        {/* Header - fixed at top */}
        <div className="absolute top-0 left-0 right-0 z-20 pt-32 pb-8 px-6 lg:px-12 bg-gradient-to-b from-background via-background to-transparent">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
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

              {/* Progress indicator */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Scroll to explore</span>
                <div className="w-32 h-1 bg-border rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary rounded-full"
                    style={{ width: progressWidth }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Gallery */}
        <div className="absolute inset-0 flex items-center pt-24">
          <motion.div
            style={{ x }}
            className="flex gap-8 pl-6 lg:pl-12"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group relative flex-shrink-0 w-[85vw] md:w-[70vw] lg:w-[50vw] h-[60vh] rounded-2xl overflow-hidden cursor-pointer"
              >
                {/* Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Project Number */}
                <div className="absolute top-6 right-6 font-serif text-8xl text-off-white/10">
                  0{index + 1}
                </div>

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
            
            {/* End spacer */}
            <div className="flex-shrink-0 w-[10vw]" />
          </motion.div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-secondary to-transparent z-10" />
      </div>
    </section>
  );
};
