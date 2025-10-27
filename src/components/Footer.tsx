"use client";

import { Mail, Phone, MapPin } from "lucide-react";

interface FooterProps {
  logo: string;
  description: string;
  menuSections: {
    title: string;
    links: { text: string; url: string }[];
  }[];
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
  socialLinks: {
    name: string;
    url: string;
    icon: React.ReactNode;
  }[];
  copyright: string;
}

export function Footer({
  logo,
  description,
  menuSections,
  contactInfo,
  socialLinks,
  copyright
}: FooterProps) {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
              {logo}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {description}
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="w-10 h-10 bg-muted hover:bg-accent rounded-full flex items-center justify-center text-muted-foreground hover:text-accent-foreground transition-all duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Menu Sections */}
          {menuSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-serif font-bold text-foreground mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.url}
                      className="text-muted-foreground hover:text-accent transition-colors duration-200"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-serif font-bold text-foreground mb-4">
              Контакты
            </h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="text-accent" size={18} />
                <span className="text-muted-foreground">{contactInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-accent" size={18} />
                <span className="text-muted-foreground">{contactInfo.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="text-accent" size={18} />
                <span className="text-muted-foreground">{contactInfo.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              {copyright}
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="/privacy" className="text-muted-foreground hover:text-accent transition-colors duration-200">
                Политика конфиденциальности
              </a>
              <a href="/terms" className="text-muted-foreground hover:text-accent transition-colors duration-200">
                Условия использования
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
