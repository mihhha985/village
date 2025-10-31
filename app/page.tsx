import { Navbar } from "@/src/components/Navbar";
import { HeroSection } from "@/src/components/HeroSection";
import { ExperiencesSection } from "@/src/components/ExperiencesSection";
import { LocationsSection } from "@/src/components/LocationsSection";
import { PlansSection } from "@/src/components/PlansSection";
import { HowToBookSection } from "@/src/components/HowToBookSection";
import { ContactSection } from "@/src/components/ContactSection";
import { Footer } from "@/src/components/Footer";
import { Heart, Users, Users2, MapPin, Calendar, CheckCircle, Instagram, MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navbar */}
      <Navbar
        logo="DeРевня"
        menuItems={[
          "DeРевня Простор",
          "DeРевня Озеро", 
          "DeРевня City",
          "DeРевня Longlife",
          "О нас",
          "Контакты"
        ]}
        ctaButton={{
          text: "Забронировать",
          variant: "accent"
        }}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Experiences Section */}
      <ExperiencesSection
        experiences={[
          {
            title: "DeРевня Простор",
            description: "Современный дом с просторной террасой и бассейном. Идеально для семейного отдыха и встреч с друзьями.",
            features: ["Природа", "Бассейн", "Терраса", "Wi-Fi"],
            image: "/foto1.jpg",
						variant: "vertical"
          },
          {
            title: "DeРевня Озеро",
            description: "Коттедж у воды с сауной и панорамными окнами. Романтичный отдых для двоих в окружении природы.",
            features: ["Озеро", "Сауна", "Романтика", "Природа"],
            image: "/foto2.jpg",
						variant: "vertical"
          },
          {
            title: "DeРевня City",
            description: "Современный дом у города для комфортного отдыха. Все удобства цивилизации в окружении природы.",
            features: ["Город", "Комфорт", "Удобства", "Доступность"],
            image: "/foto3.jpg",
						variant: "vertical"
          },
					{
            title: "DеРевня. Longlife",
            description: "Четыре приватных дома для долгосрочного проживания — выбор для тех, кто ценит уединение и стабильный комфорт.",
            features: ["Город", "Комфорт", "Удобства", "Доступность", "Wi-Fi"],
            image: "/foto4.jpg",
						variant: "horizontal"
          }
        ]}
      />

      {/* Locations Section */}
      <LocationsSection />

      {/* Plans Section */}
      <PlansSection
        title="Какие у вас планы?"
        plans={[
          {
            title: "Романтичный уикенд для двоих",
            description: "Уютные коттеджи с камином, сауной и панорамными окнами для незабываемого романтического отдыха.",
            image: "romantic.jpg",
            icon: <Heart className="text-accent" size={24} />,
            linkText: "Найти подходящие варианты"
          },
          {
            title: "Отдохнуть всей семьей",
            description: "Просторные дома с детской площадкой, бассейном и всеми удобствами для комфортного семейного отдыха.",
            image: "family.jpg",
            icon: <Users className="text-accent" size={24} />,
            linkText: "Найти подходящие варианты"
          },
          {
            title: "Приехать большой компанией",
            description: "Большие дома с террасой, мангалом и развлекательной зоной для веселого отдыха с друзьями.",
            image: "friends.jpg",
            icon: <Users2 className="text-accent" size={24} />,
            linkText: "Найти подходящие варианты"
          }
        ]}
      />

      {/* How to Book Section */}
      <HowToBookSection
        title="Как забронировать?"
        steps={[
          {
            number: 1,
            title: "Выберите базу отдыха и дом",
            description: "Каждая база — уникальное место с особой атмосферой. Выберите то, что подходит именно вам.",
            icon: <MapPin className="text-accent" size={24} />
          },
          {
            number: 2,
            title: "Перейдите на страницу бронирования",
            description: "Выберите даты и укажите количество гостей. Мы покажем доступные варианты и цены.",
            icon: <Calendar className="text-accent" size={24} />
          },
          {
            number: 3,
            title: "Подготовьтесь перед приездом",
            description: "Наш сервис заботится о вашем комфорте. Мы подготовим дом и встретим вас с улыбкой.",
            icon: <CheckCircle className="text-accent" size={24} />
          }
        ]}
        supportInfo={{
          title: "Служба заботы",
          description: "Наша команда работает 24/7, чтобы ваш отдых был идеальным. Поможем с выбором и ответим на все вопросы.",
          phone: "+7 (812) 123-45-67",
          avatar: "support.jpg"
        }}
      />

      {/* Contact Section */}
      <ContactSection
        title="Свяжитесь с нами"
        subtitle="Поможем с выбором и предложим эксклюзивные условия для вашего идеального отдыха"
        formFields={{
          name: "Имя",
          email: "Почта",
          message: "Сообщение"
        }}
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
      />

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
