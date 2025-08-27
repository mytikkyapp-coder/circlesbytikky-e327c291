
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
      { name: "Meta Ads AI", href: "/launch-ads" },
      { name: "Templates", href: "/templates" },
      { name: "Analytics", href: "/analytics" },
      { name: "Campaigns", href: "/campaigns" }
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Pricing", href: "/pricing" },
      { name: "Contact Support", href: "/support-tickets" },
      { name: "Knowledge Kit", href: "/info/meta-campaigns" }
    ],
    company: [
      { name: "My Projects", href: "/my-projects" },
      { name: "My Workspace", href: "/my-workspace" },
      { name: "Integrations", href: "/integrations" }
    ]
  };

  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/tikkycircles" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/tikky" },
    { name: "GitHub", icon: Github, href: "https://github.com/tikky" }
  ];

  return (
    <footer className="bg-muted/30 border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Company info */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-3">
                <TikkyLogo size="sm" />
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                AI-driven WhatsApp Business platform for modern businesses.
              </p>
              
              {/* Contact info */}
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Mail className="h-3 w-3" />
                  <span>support@tikky.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-3 w-3" />
                  <span>+91 98765 43210</span>
                </div>
              </div>
            </div>

            {/* Product links */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Product</h3>
              <ul className="space-y-2">
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

            {/* Support links */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Support</h3>
              <ul className="space-y-2">
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
              <h3 className="text-sm font-semibold mb-3">Company</h3>
              <ul className="space-y-2">
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
        <div className="py-4 border-t border-border/40">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Left side - Proudly presented */}
            <div className="flex items-center space-x-3">
              <img 
                src={indianDoodle} 
                alt="Indian cultural artwork" 
                className="h-6 w-auto opacity-60" 
              />
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Heart className="h-3 w-3 text-red-500" />
                <span>Proudly by</span>
                <span className="font-medium text-foreground">Wise Owl Communications</span>
              </div>
            </div>

            {/* Center - Copyright */}
            <div className="text-sm text-muted-foreground">
              © {currentYear} Tikky. All rights reserved.
            </div>

            {/* Right side - Social links */}
            <div className="flex items-center space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={social.name} 
                    href={social.href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors" 
                    aria-label={social.name}
                  >
                    <Icon className="h-3 w-3" />
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
