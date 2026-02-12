import { useState } from "react";
import { Leaf, Linkedin, Twitter, Instagram, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const footerLinks = {
  services: [
    { name: "Green Infrastructure", href: "#services" },
    { name: "Eco-Friendly Development", href: "#services" },
    { name: "Impact Analytics", href: "#services" },
    { name: "Energy Optimization", href: "#services" },
  ],
  company: [
    { name: "About Us", href: "#" },
    { name: "Our Team", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Contact", href: "#contact" },
    { name: "Blog", href: "#" },
  ],
};

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    // Simulate a brief processing delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setIsSubmitting(false);
    toast({
      title: "Subscribed!",
      description: "Thank you for joining our newsletter.",
    });
    setEmail("");
  };
    
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-[#0F1510] pt-16 md:pt-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16">
          {/* Branding */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-6">
              <Leaf className="h-8 w-8 text-primary" />
              <span className="font-serif text-xl text-off-white">EcoTech</span>
            </a>
            <p className="text-off-white/60 text-sm leading-relaxed mb-8 max-w-xs">
              Pioneering sustainable technology that harmonizes innovation with
              nature. Growing tomorrow's solutions today.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Instagram, href: "#", label: "Instagram" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-off-white/60 hover:text-primary transition-colors hover:scale-110 transform"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-6">
              Services
            </h3>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-off-white/70 hover:text-off-white hover:translate-x-1 transition-all inline-block text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-6">
              Company
            </h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-off-white/70 hover:text-off-white hover:translate-x-1 transition-all inline-block text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-6">
              Stay Updated
            </h3>
            <p className="text-off-white/60 text-sm mb-5">
              Subscribe to our newsletter for the latest in sustainable tech.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-white/10 text-off-white placeholder:text-off-white/40 focus:border-primary"
                required
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-secondary hover:bg-sage-dark font-semibold"
              >
                {isSubmitting ? (
                  "Subscribing..."
                ) : (
                  <>
                    Subscribe
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-off-white/50 text-sm">
            © {currentYear} EcoTech Solutions. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a
              href="#"
              className="text-off-white/50 hover:text-off-white text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-off-white/50 hover:text-off-white text-sm transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
