import { useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Send, CheckCircle, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { toast } = useToast();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate a brief processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitted(true);
    setIsSubmitting(false);
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
  };

  if (isSubmitted) {
    return (
      <section className="relative py-32 bg-background overflow-hidden">
        <div className="container mx-auto max-w-2xl text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
              Thank You!
            </h2>
            <p className="text-muted-foreground text-xl leading-relaxed">
              Your message has been received. We'll be in touch soon to discuss
              how we can help grow your sustainable technology vision.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="contact" className="relative py-32 md:py-40 bg-background overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[200px]"
        style={{ y: bgY }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-sage-dark/5 blur-[150px]"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50]) }}
      />

      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex items-center gap-3 mb-8 justify-center">
            <div className="w-12 h-[1px] bg-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-[0.2em]">
              Get in Touch
            </span>
            <div className="w-12 h-[1px] bg-primary" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground mb-6">
            Let's Start Your{" "}
            <span className="text-primary">Green</span> Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to transform your business with sustainable technology? Tell
            us about your project.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-12 items-stretch">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Email Card */}
            <div className="group p-8 rounded-2xl border border-border bg-card hover:border-primary/30 hover:bg-card/80 transition-all duration-500 flex-1">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-2xl text-foreground mb-3">Email Us</h3>
              <a
                href="mailto:hello@ecotechsolutions.com"
                className="text-primary text-lg hover:underline inline-flex items-center gap-2 group/link"
              >
                hello@ecotechsolutions.com
                <ArrowUpRight className="h-4 w-4 opacity-0 -translate-y-1 translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-y-0 group-hover/link:translate-x-0 transition-all" />
              </a>
            </div>

            {/* Location Card */}
            <div className="group p-8 rounded-2xl border border-border bg-card hover:border-primary/30 hover:bg-card/80 transition-all duration-500 flex-1">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-2xl text-foreground mb-3">Our Offices</h3>
              <div className="space-y-2">
                {["San Francisco, CA", "London, UK", "Singapore"].map((loc, i) => (
                  <p key={i} className="text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {loc}
                  </p>
                ))}
              </div>
            </div>

            {/* Stats Card */}
            <div className="p-8 rounded-2xl bg-secondary">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "24h", label: "Response Time" },
                  { value: "150+", label: "Projects Completed" },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="font-serif text-3xl text-primary mb-1">{stat.value}</div>
                    <div className="text-off-white/60 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="p-8 md:p-12 rounded-3xl border border-border bg-card/50 backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-3">
                    Your Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Smith"
                    required
                    className="bg-background border-border h-14 text-base"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-3">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    required
                    className="bg-background border-border h-14 text-base"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="company" className="block text-sm font-medium text-foreground mb-3">
                  Company Name
                </label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your company name"
                  className="bg-background border-border h-14 text-base"
                />
              </div>

              <div className="mb-8">
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-3">
                  Your Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project and sustainability goals..."
                  required
                  rows={6}
                  className="bg-background border-border resize-none text-base"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-primary px-8 py-7 text-lg font-semibold text-secondary hover:bg-sage-dark transition-all duration-300 group"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-secondary/30 border-t-secondary rounded-full"
                    />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Send Message
                    <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
