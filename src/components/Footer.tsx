import { Link } from "react-router-dom";
import { TikkyLogo } from "./TikkyLogo";
import { Heart, Mail, Phone, MapPin, Github, Twitter, Linkedin, Facebook } from "lucide-react";
import indianDoodle from "@/assets/indian-cultural-doodle.png";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "WhatsApp Business", href: "/whatsapp-setup" },
      { name: "AI Chatbot Builder", href: "/chatbot-builder" },
      { name: "Campaign Analytics", href: "/analytics" },
      { name: "Template Builder", href: "/templates" },
    ],
    tools: [
      { name: "Meta Ads AI", href: "/launch-ads" },
      { name: "Broadcast Messages", href: "/campaigns" },
      { name: "API Integrations", href: "/integrations" },
      { name: "Knowledge Base", href: "/help" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Support", href: "/support-tickets" },
      { name: "API Documentation", href: "/help" },
      { name: "Community Forum", href: "/circles" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Pricing", href: "/pricing" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  };

  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "GitHub", icon: Github, href: "#" },
  ];

  return (
    <footer className="bg-muted/30 border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Company info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <TikkyLogo size="sm" />
                <span className="text-xl font-bold">Tikky</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Empowering businesses with AI-driven communication tools and automation solutions. 
                Transform your customer engagement with our WhatsApp Business platform.
              </p>
              
              {/* Contact info */}
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>support@tikky.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Mumbai, India</span>
                </div>
              </div>
            </div>

            {/* Product links */}
            <div>
              <h3 className="text-sm font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href} 
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools links */}
            <div>
              <h3 className="text-sm font-semibold mb-4">Tools</h3>
              <ul className="space-y-3">
                {footerLinks.tools.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href} 
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support links */}
            <div>
              <h3 className="text-sm font-semibold mb-4">Support</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href} 
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company links */}
            <div>
              <h3 className="text-sm font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href} 
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom section with Indian cultural elements */}
        <div className="py-6 border-t border-border/40">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Left side - Proudly presented */}
            <div className="flex items-center space-x-4">
              <img 
                src={indianDoodle} 
                alt="Indian cultural artwork" 
                className="h-8 w-auto opacity-60"
              />
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Heart className="h-4 w-4 text-red-500" />
                <span>Proudly Presented by</span>
                <span className="font-medium text-foreground">Wise Owl Communications</span>
              </div>
            </div>

            {/* Center - Copyright */}
            <div className="text-sm text-muted-foreground">
              © {currentYear} Tikky. All rights reserved.
            </div>

            {/* Right side - Social links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}