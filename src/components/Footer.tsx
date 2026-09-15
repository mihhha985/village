import { RevealSection } from "@/src/components/RevealSection";
import Link from "next/link";
import { SocialLinks } from "@/src/components/SocialLinks";

export function Footer() {
  return (
		<RevealSection as="footer" className="bg-card">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand and Social Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-logo">TheВилла</h2>
            <div className="text-xs leading-relaxed space-y-1">
              <p>© 2025 TheВилла. Все права защищены.</p>
            </div>
            <div className="space-y-3">
              <p className="text-base">Мессенджеры и соц. сети</p>
              <SocialLinks />
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
                TheВилла. Простор
              </Link>
              <Link href="/ozero" className="text-sm hover:text-accent transition-colors">
                TheВилла. Озеро
              </Link>
              <Link href="/city" className="text-sm hover:text-accent transition-colors">
                TheВилла. City
              </Link>
              <Link href="/longlife" className="text-sm hover:text-accent transition-colors">
                TheВилла. Longlife
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
                <Link href="mailto:hello@thevilla.ru" className="text-sm hover:text-accent transition-colors">
                  hello@thevilla.ru
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
