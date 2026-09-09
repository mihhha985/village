import { RevealSection } from "@/src/components/RevealSection";
import { Button } from "@/src/lib/ui/button";
import Link from "next/link";
import { IoLogoVk } from "react-icons/io5";
import { Instagram } from "lucide-react"
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";

export function Footer() {
  return (
		<RevealSection as="footer" className="bg-card">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand and Social Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-logo">DeРевня</h2>
            <div className="text-xs leading-relaxed space-y-1">
              <p>© 2025 ООО «DeРевня». Все права защищены.</p>
            </div>
            <div className="space-y-3">
              <p className="text-base">Мессенджеры и соц. сети</p>
              <div className="flex gap-3">
                <Button disabled title="Ссылка пока не настроена"
                  className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label="telegram"
                >
                  <FaTelegramPlane className="w-5 h-5" />
                </Button>
								<Button disabled title="Ссылка пока не настроена"
                  className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp className="w-5 h-5" />
                </Button>
                <Button disabled title="Ссылка пока не настроена"
                  className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button disabled title="Ссылка пока не настроена"
                  className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label="VK"
                >
                  <IoLogoVk className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Menu Section */}
          <div className="space-y-4">
            <h3 className="text-base font-normal">Меню</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/" className="text-sm hover:text-accent transition-colors">
                Главная
              </Link>
              <Link href="/about" className="text-sm hover:text-accent transition-colors">
                О нас
              </Link>
              <Link href="/contacts" className="text-sm hover:text-accent transition-colors">
                Контакты
              </Link>
            </nav>
          </div>

          {/* Recreation Bases Section */}
          <div className="space-y-4">
            <h3 className="text-base font-normal">Базы отдыха</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/prostor" className="text-sm hover:text-accent transition-colors">
                DeРевня. Простор
              </Link>
              <Link href="/ozero" className="text-sm hover:text-accent transition-colors">
                DeРевня. Озеро
              </Link>
              <Link href="/city" className="text-sm hover:text-accent transition-colors">
                DeРевня. City
              </Link>
              <Link href="/longlife" className="text-sm hover:text-accent transition-colors">
                DeРевня. Longlife
              </Link>
            </nav>
          </div>

          {/* Contacts Section */}
          <div className="space-y-4">
            <h3 className="text-base font-normal">Контакты</h3>
            <div className="space-y-3">
              <div>
                <p className="text-base text-muted-foreground mb-1">Телефон</p>
                <Link href="tel:+79991234567" className="text-sm hover:text-accent transition-colors">
                  +7 (999) 123-45-67
                </Link>
              </div>
              <div>
                <p className="text-base text-muted-foreground mb-1">Почта</p>
                <Link href="mailto:hello@derevnya.ru" className="text-sm hover:text-accent transition-colors">
                  hello@derevnya.ru
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
