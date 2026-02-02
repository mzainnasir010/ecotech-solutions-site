import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const words = [
  "We", "believe", "in", "a", "world", "where", "technology",
  "and", "nature", "exist", "in", "perfect", "harmony.", 
  "Our", "mission", "is", "to", "pioneer", "sustainable",
  "solutions", "that", "protect", "our", "planet", "while",
  "driving", "innovation", "forward."
];

export const MissionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={sectionRef}
      className="relative py-40 md:py-56 lg:py-72 bg-secondary overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px]"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [100, -100]),
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-sage-dark/10 blur-[100px]"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [-50, 50]),
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-16 justify-center"
        >
          <div className="w-12 h-[1px] bg-primary" />
          <span className="text-sm font-medium text-primary uppercase tracking-[0.2em]">
            Our Mission
          </span>
          <div className="w-12 h-[1px] bg-primary" />
        </motion.div>

        {/* Word-by-word reveal text */}
        <div className="max-w-5xl mx-auto text-center">
          <p className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-off-white leading-[1.3] tracking-tight">
            {words.map((word, index) => (
              <WordReveal 
                key={index} 
                word={word} 
                index={index} 
                totalWords={words.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </p>
        </div>

        {/* Decorative stats below */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-24 md:mt-32 grid grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          {[
            { label: "Founded", value: "2024" },
            { label: "Team Members", value: "150+" },
            { label: "Countries", value: "28" },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="font-serif text-3xl md:text-4xl text-primary mb-2">
                {item.value}
              </div>
              <div className="text-off-white/50 text-sm uppercase tracking-wider">
                {item.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

interface WordRevealProps {
  word: string;
  index: number;
  totalWords: number;
  scrollYProgress: any;
}

const WordReveal = ({ word, index, totalWords, scrollYProgress }: WordRevealProps) => {
  // Calculate when this word should animate based on scroll position
  const start = index / totalWords * 0.5;
  const end = start + 0.1;
  
  const opacity = useTransform(
    scrollYProgress,
    [start, end],
    [0.2, 1]
  );
  
  const y = useTransform(
    scrollYProgress,
    [start, end],
    [10, 0]
  );

  return (
    <motion.span
      style={{ opacity, y }}
      className="inline-block mr-[0.3em]"
    >
      {word}
    </motion.span>
  );
};
