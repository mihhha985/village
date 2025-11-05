import { Navbar } from "@/src/components/Navbar";
import { HeroSection } from "@/src/components/HeroSection";
import { ExperiencesSection } from "@/src/components/ExperiencesSection";
import { LocationsSection } from "@/src/components/LocationsSection";
import { PlansSection } from "@/src/components/PlansSection";
import { HowToBookSection } from "@/src/components/HowToBookSection";
import { ContactSection } from "@/src/components/ContactSection";
import { Footer } from "@/src/components/Footer";
import { Instagram, MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Experiences Section */}
      <ExperiencesSection/>

      {/* Locations Section */}
      <LocationsSection />

      {/* Plans Section */}
      <PlansSection />

      {/* How to Book Section */}
      <HowToBookSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer
        logo="DeРевня"
        description="Современный отдых на природе с комфортом и технологиями. Создаем незабываемые воспоминания для вас и ваших близких."
        menuSections={[
          {
            title: "Меню",
            links: [
              { text: "О нас", url: "/about" },
              { text: "Оферта", url: "/offer" },
              { text: "Контакты", url: "/contact" }
            ]
          },
          {
            title: "Базы отдыха",
            links: [
              { text: "Простор", url: "/prostor" },
              { text: "Озеро", url: "/ozero" },
              { text: "City", url: "/city" },
              { text: "Longlife", url: "/longlife" }
            ]
          }
        ]}
        contactInfo={{
          phone: "+7 (812) 123-45-67",
          email: "hello@derevnya.ru",
          address: "Санкт-Петербург, ул. Примерная, 123"
        }}
        socialLinks={[
          {
            name: "VK",
            url: "https://vk.com/derevnya",
            icon: <MessageCircle size={20} />
          },
          {
            name: "Telegram",
            url: "https://t.me/derevnya",
            icon: <MessageCircle size={20} />
          },
          {
            name: "Instagram",
            url: "https://instagram.com/derevnya",
            icon: <Instagram size={20} />
          }
        ]}
        copyright="© 2024 DeРевня. Все права защищены."
      />
    </main>
  );
}
