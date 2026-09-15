"use client";
import  Link  from "next/link"
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/src/lib/ui/button";
import OrderButton from "@/src/components/ui/OrderButton";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react"

const menuItems = [
  { label: "TheВилла Простор", href: "/prostor" },
  { label: "TheВилла Озеро", href: "/ozero" },
  { label: "TheВилла City", href: "/city" },
  { label: "TheВилла Longlife", href: "/longlife" },
  { label: "О нас", href: "/about" },
  { label: "Контакты", href: "/contacts" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();

  return (
    <>
    <header className="absolute top-0 lg:top-10 left-0 w-full h-fit bg-card lg:bg-transparent z-10">
      <div className="container">
        <div className="flex items-center justify-between h-18 lg:h-22">
          <div className="w-fit flex items-center gap-x-2 sm:gap-x-5">
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                size="icon"
                variant="ghost"
                aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
            {/* Logo */}
            <div className="flex items-center">
								<Link
									href="/"
									aria-label="TheВилла — главная"
									className={`text-3xl sm:text-4xl xl:text-5xl font-logo ${pathname === "/" ? "text-accent" : "text-foreground"}`}>
					TheВилла
              </Link>
            </div>
          </div>
          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            {menuItems.map((item, index) => (
              <Link
								key={index}
								href={item.href}
								className={`link ${pathname === item.href ? "text-primary/90" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <OrderButton />
         </div>
       </div>
     </header>
     {/* Mobile Menu Overlay */}
		 <AnimatePresence mode="wait">
		  {isMenuOpen && (
       <motion.div
         initial={{ opacity: 0, height: 0 }}
         animate={{ opacity: 1, height: '100%' }}
         exit={{ opacity: 0, height: 0, transition: { delay: 0.3 } }}
        className="w-full lg:hidden fixed top-0 left-0 bg-background z-10">
        <Button aria-label="Закрыть меню" variant="ghost" size="icon" className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}><X /></Button>
        {/* Navigation Links */}
        <motion.nav id="mobile-menu"
					initial={{ opacity: 0, y: -80 }}
					animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
					exit={{ opacity: 0, y: -80 }}
					className="pt-25 w-full flex flex-col justify-center gap-y-5">
          {menuItems.map((item, index) => (
            <li key={index} className="list-none text-center">
              <Link
                href={item.href}
                className="link"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
             </li>
          ))}
        </motion.nav>
       </motion.div>
     )}
		 </AnimatePresence>
     </>
   );
 }
