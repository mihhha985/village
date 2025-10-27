"use client";
import  Link  from "next/link"
import { useState } from "react";
import { Button } from "@/src/lib/ui/button";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  logo: string;
  menuItems: string[];
  ctaButton: {
    text: string;
    variant: "accent" | "secondary";
  };
}

export function Navbar({ logo, menuItems, ctaButton }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
    <header className="absolute top-0 lg:top-10 left-0 w-full h-fit bg-card lg:bg-transparent z-20">
      <div className="container">
        <div className="flex items-center justify-between h-18 lg:h-22">
          <div className="w-fit flex items-center gap-x-2 sm:gap-x-5">
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                size="icon" 
                variant="ghost"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-3xl sm:text-4xl xl:text-5xl font-logo text-foreground">
                {logo}
              </h1>
            </div>
          </div>
          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="link"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <Button className="scale-90 sm:scale-100">{ctaButton.text}</Button>
         </div>
       </div>
     </header>
     {/* Mobile Menu Overlay */}
     {isMenuOpen && (
       <div className="lg:hidden fixed inset-0 bg-background z-10">
         {/* Navigation Links */}
         <nav className="pt-25 w-full flex flex-col justify-center gap-y-5">
           {menuItems.map((item, index) => (
            <li key={index} className="list-none text-center">
              <Link
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="link"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
             </li>
           ))}
         </nav>
       </div>
     )}
     </>
   );
 }
