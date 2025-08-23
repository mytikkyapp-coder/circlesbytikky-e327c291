import { Heart, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: "Help Center", href: "/help" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Contact Support", href: "/support-tickets" },
    { label: "API Documentation", href: "/docs" },
  ];

  return (
    <footer className="mt-auto border-t bg-muted/30">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Brand and Indian Cultural Element */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {/* Indian Cultural Doodle */}
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 via-white to-green-400 rounded-full flex items-center justify-center border-2 border-orange-500/20">
                <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                Proudly Presented by{" "}
                <span className="font-semibold text-foreground">Wise Owl Communications</span>
              </span>
              <span className="text-lg">🇮🇳</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-4 lg:gap-6">
            {links.map((link, index) => (
              <a 
                key={index}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 hover:underline"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {currentYear} Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}