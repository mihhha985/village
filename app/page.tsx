import { Navbar } from "@/src/components/Navbar";
import { HeroSection } from "@/src/components/HeroSection";
import { ExperiencesSection } from "@/src/components/ExperiencesSection";
import { LocationsSection } from "@/src/components/LocationsSection";
import { PlansSection } from "@/src/components/PlansSection";
import { HowToBookSection } from "@/src/components/HowToBookSection";
import { ContactSection } from "@/src/components/ContactSection";
import { Footer } from "@/src/components/Footer";
import { Heart, Users, Users2, MapPin, Calendar, CheckCircle, Phone, Mail, Instagram, MessageCircle } from "lucide-react";

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
      <HeroSection
        title="Проведите свободное время с близкими на природе"
        subtitle="Отдых в DeРевне — уютные технологичные дома и завораживающая красота природы вдали от суеты города"
        searchFields={["Локация", "Дата заезда", "Дата выезда", "Количество гостей"]}
        searchButton={{
          text: "Искать",
          variant: "accent"
        }}
      />

      {/* Experiences Section */}
      <ExperiencesSection
        title="Неповторимый опыт в каждой поездке"
        experiences={[
          {
            title: "DeРевня Простор",
            description: "Современный дом с просторной террасой и бассейном. Идеально для семейного отдыха и встреч с друзьями.",
            features: ["Природа", "Бассейн", "Терраса", "Wi-Fi"],
            price: "от 6 500 ₽",
            image: "prostor.jpg",
            buttonText: "Подробнее"
          },
          {
            title: "DeРевня Озеро",
            description: "Коттедж у воды с сауной и панорамными окнами. Романтичный отдых для двоих в окружении природы.",
            features: ["Озеро", "Сауна", "Романтика", "Природа"],
            price: "от 8 500 ₽",
            image: "ozero.jpg",
            buttonText: "Подробнее"
          },
          {
            title: "DeРевня City",
            description: "Современный дом у города для комфортного отдыха. Все удобства цивилизации в окружении природы.",
            features: ["Город", "Комфорт", "Удобства", "Доступность"],
            price: "от 5 500 ₽",
            image: "city.jpg",
            buttonText: "Подробнее"
          }
        ]}
      />

      {/* Locations Section */}
      <LocationsSection
        title="Наши локации"
        locations={[
          {
            id: "prostor",
            name: "DeРевня Простор",
            description: "Просторные дома в окружении леса с бассейном и террасой",
            coordinates: "60.1234, 30.5678",
            distance: "50 минут от центра СПб",
            price: "от 6 500 ₽/ночь",
            image: "prostor.jpg"
          },
          {
            id: "ozero",
            name: "DeРевня Озеро",
            description: "Романтичные коттеджи у озера с сауной и панорамными окнами",
            coordinates: "60.2345, 30.6789",
            distance: "45 минут от центра СПб",
            price: "от 8 500 ₽/ночь",
            image: "ozero.jpg"
          },
          {
            id: "city",
            name: "DeРевня City",
            description: "Современные дома у города с удобным доступом и всеми удобствами",
            coordinates: "60.3456, 30.7890",
            distance: "30 минут от центра СПб",
            price: "от 5 500 ₽/ночь",
            image: "city.jpg"
          },
          {
            id: "longlife",
            name: "DeРевня Longlife",
            description: "Экологичные дома для длительного проживания с садом и огородом",
            coordinates: "60.4567, 30.8901",
            distance: "60 минут от центра СПб",
            price: "от 7 500 ₽/ночь",
            image: "longlife.jpg"
          }
        ]}
      />

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
