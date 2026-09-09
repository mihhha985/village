import Link from "next/link";
import { InformationPage } from "@/src/components/InformationPage";
import { ContactSection } from "@/src/components/ContactSection";
import { Button } from "@/src/lib/ui/button";
import { LOCATIONS } from "@/src/lib/types/booking";

export function ContactsPage() {
  return (
    <InformationPage
      title="Контакты"
      introduction="Планируете поездку в DeРевню? Оставьте заявку с удобной датой заезда и контактами — обсудим выбор локации и условия размещения."
    >
      <ContactSection />
      <section className="location-panel py-12 lg:py-20" aria-labelledby="before-trip">
        <div className="container grid lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="space-y-4">
            <p className="location-eyebrow">Перед поездкой</p>
            <h2 id="before-trip" className="location-subheading">Выберите, куда хотите отправиться</h2>
            <p className="location-copy">У DeРевни четыре локации. При обращении укажите название, даты и количество гостей. Точный адрес дома, маршрут и порядок заселения уточните при согласовании бронирования.</p>
          </div>
          <nav aria-label="Информация о локациях" className="grid sm:grid-cols-2 gap-4 items-start">
            {Object.entries(LOCATIONS).map(([key, name]) => (
              <Button asChild key={key} variant="outline" className="w-full"><Link href={`/${key}`} aria-label={`Информация о ${name}`}>{name}</Link></Button>
            ))}
          </nav>
        </div>
      </section>
    </InformationPage>
  );
}
