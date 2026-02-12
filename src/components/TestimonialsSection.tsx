import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "EcoTech transformed our entire digital infrastructure. We reduced our carbon footprint by 60% while actually improving performance. It's the rare case where doing good for the planet also meant doing good for business.",
    author: "Michael Thompson",
    title: "CTO, GreenVentures Capital",
    initials: "MT",
  },
  {
    quote:
      "Their sustainable approach to software development opened our eyes to what's possible. The wildlife monitoring system they built has helped us protect over 200 endangered species.",
    author: "David Williams",
    title: "Director, African Wildlife Foundation",
    initials: "DW",
  },
  {
    quote:
      "Working with EcoTech was a revelation. They showed us that sustainable technology isn't just an option—it's the future. Our platform now runs on 100% renewable energy.",
    author: "Jennifer Martinez",
    title: "Founder, SustainableAg",
    initials: "JM",
  },
];

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium uppercase tracking-[0.15em] text-primary mb-4 block">
            Testimonials
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">
            Client Voices
          </h2>
        </motion.div>

        {/* Testimonial Carousel */}
        <div
          className="max-w-4xl mx-auto relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Decorative Quote */}
          <Quote className="absolute -top-4 -left-4 md:-top-8 md:-left-8 h-16 w-16 md:h-24 md:w-24 text-primary/20" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center px-8 md:px-16"
            >
              {/* Quote */}
              <p className="font-serif text-xl md:text-2xl lg:text-3xl text-foreground italic leading-relaxed mb-10">
                "{testimonials[currentIndex].quote}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold text-lg">
                    {testimonials[currentIndex].initials}
                  </span>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground">
                    {testimonials[currentIndex].author}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {testimonials[currentIndex].title}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dot Navigation */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
