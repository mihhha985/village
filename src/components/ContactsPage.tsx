import { RevealText } from "@/src/components/RevealText";
import { RevealSection } from "@/src/components/RevealSection";
import Image from "next/image";
import Link from "next/link";
import { Clock3, Copy, Mail, Phone, WalletCards } from "lucide-react";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { IoLogoVk } from "react-icons/io5";
import { Navbar } from "@/src/components/Navbar";
import { Footer } from "@/src/components/Footer";
import { OrderModal } from "@/src/components/OrderModal";
import { ContactsFeedbackForm } from "@/src/components/ContactsFeedbackForm";
import { YandexMap } from "@/src/components/YandexMap";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/src/lib/ui/accordion";
import { Button } from "@/src/lib/ui/button";
import { LOCATION_COORDINATES, type LocationKey } from "@/src/lib/types/booking";

const PHONE = "+7 (913) 777-77-77";
const EMAIL = "Derevny@yandex.com";

const locations: Array<{
  id: LocationKey;
  name: string;
  description: string;
  coordinates: string;
  distance: string;
  price: string;
}> = [
  {
    id: "city",
    name: "DeРевня. City",
    description: "В черте города, в Новосаратовке — отдых с удобствами рядом с домом: дома, баня и бассейн без долгих поездок.",
    coordinates: "59.840072, 30.532057",
    distance: "10 минут на машине от КАД",
    price: "от 15 500 руб./ночь",
  },
  {
    id: "ozero",
    name: "DeРевня. Озеро",
    description: "Тихий отдых у воды для неспешных выходных, прогулок и времени с близкими.",
    coordinates: "60.150000, 29.950000",
    distance: "около 40 минут от города",
    price: "стоимость по запросу",
  },
  {
    id: "prostor",
    name: "DeРевня. Простор",
    description: "Просторная загородная локация для семейных поездок и отдыха большой компанией.",
    coordinates: "60.720000, 28.750000",
    distance: "около 2 часов от города",
    price: "стоимость по запросу",
  },
  {
    id: "longlife",
    name: "DeРевня. Longlife",
    description: "Формат для продолжительного проживания в спокойном ритме рядом с природой.",
    coordinates: "60.550000, 29.770000",
    distance: "около 1,5 часов от города",
    price: "стоимость по запросу",
  },
];

const socialButtons = [
  { label: "Telegram", icon: FaTelegramPlane },
  { label: "WhatsApp", icon: FaWhatsapp },
  { label: "ВКонтакте", icon: IoLogoVk },
];

function SocialButtons() {
  return (
    <div className="flex gap-3">
      {socialButtons.map(({ label, icon: Icon }) => (
        <Button key={label} disabled variant="ghost" size="icon" aria-label={`${label} — ссылка пока не настроена`} title="Ссылка пока не настроена" className="contacts-icon-button">
          <Icon className="size-5" />
        </Button>
      ))}
    </div>
  );
}

export function ContactsPage() {
  const markers = locations.map((location, index) => ({
    id: location.id,
    coordinates: LOCATION_COORDINATES[location.id],
    title: location.name,
    isActive: index === 0,
  }));

  return (
    <>
      <Navbar />
      <main className="contacts-page pt-30 lg:pt-38">
        <RevealSection className="container pb-10 lg:pb-14" aria-labelledby="contacts-title">
          <div className="contacts-hero relative overflow-hidden p-5 md:p-8 lg:p-5">
            <Image src="/contacts-city.png" alt="" width={644} height={365} priority className="contacts-hero-image pointer-events-none absolute left-1/2 bottom-0 hidden w-3/4 max-w-140 -translate-x-1/2 lg:block" />
            <div className="relative z-1 grid gap-8 lg:grid-cols-[1.65fr_1fr]">
              <div className="flex min-h-80 flex-col justify-between gap-14 py-2">
                <div>
                  <h1 id="contacts-title" className="contacts-title"><RevealText>Контакты</RevealText></h1>
                  <div className="contacts-copy mt-8 space-y-4">
                    <Link href="tel:+79137777777" className="flex items-center gap-3 hover:text-primary"><Phone className="size-5" aria-hidden="true" /> {PHONE}</Link>
                    <Link href={`mailto:${EMAIL}`} className="flex items-center gap-3 hover:text-primary"><Mail className="size-5" aria-hidden="true" /> {EMAIL}</Link>
                    <p className="flex items-center gap-3"><Clock3 className="size-5" aria-hidden="true" /> с 9:00 до 18:00 ПН–ПТ</p>
                  </div>
                  <Image src="/contacts-city.png" alt="Иллюстрация домов DeРевни на фоне города" width={644} height={365} priority className="mt-5 w-full lg:hidden" />
                </div>
                <div className="max-w-2xl">
                  <h2 className="contacts-card-title mb-4">Информация о компании</h2>
                  <p className="contacts-small">© 2025 ООО «ДЕРЕВНЯ-СИТИ»</p>
                  <p className="contacts-small">ИНН 7811810802&nbsp; | &nbsp;ОГРН 1257800084740</p>
                  <p className="contacts-small">Юридический адрес: 192012, город Санкт-Петербург, вн. тер. г. Муниципальный округ Рыбацкое, пр-кт Обуховской Обороны, дом 271, литера А, помещение 6Н, №426, раб. место №1</p>
                </div>
              </div>
              <div className="grid content-start gap-5">
                <article className="contacts-dark-card p-5">
                  <div className="grid grid-cols-[1fr_auto] gap-4">
                    <div>
                      <h2 className="contacts-card-title">Служба заботы</h2>
                      <p className="contacts-small mt-4">Среднее время ответа: 20 минут</p>
                      <p className="contacts-small mt-2">Рабочие часы: с 10:00 до 22:00 по МСК,<br />без перерывов и выходных</p>
                    </div>
                    <div className="relative size-20 overflow-hidden rounded-full md:size-22">
                      <Image src="/call.jpg" alt="Специалист службы заботы" fill sizes="88px" className="object-cover" />
                      <span className="contacts-online absolute right-1 bottom-1 size-4 rounded-full" aria-label="Специалист онлайн" />
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <Button asChild variant="outline" className="contacts-phone-button"><Link href="tel:+79137777777" aria-label={`Позвонить по номеру ${PHONE}`}>{PHONE}</Link></Button>
                    <Button disabled variant="ghost" size="icon" aria-label="WhatsApp — ссылка пока не настроена" className="contacts-icon-button"><FaWhatsapp className="size-5" /></Button>
                    <Button disabled variant="ghost" size="icon" aria-label="Telegram — ссылка пока не настроена" className="contacts-icon-button"><FaTelegramPlane className="size-5" /></Button>
                  </div>
                </article>
                <article className="contacts-dark-card p-5">
                  <h2 className="contacts-card-title mb-4">Мессенджеры и соц. сети</h2>
                  <SocialButtons />
                </article>
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection className="contacts-locations py-10 lg:py-14" aria-labelledby="locations-title">
          <div className="container">
            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <h2 id="locations-title" className="contacts-section-title">Адреса всех баз отдыха</h2>
              <p className="contacts-small max-w-xl lg:text-right">Воспользуйтесь интерактивной картой Яндекс или скопируйте координаты для точного поиска в вашем приложении карт</p>
            </div>
            <div className="grid gap-5 lg:grid-cols-[1.75fr_0.85fr]">
              <div className="contacts-map min-h-110 lg:min-h-128"><YandexMap center={{ lat: 60.15, lng: 29.95 }} zoom={7} markers={markers} /></div>
              <Accordion type="single" collapsible defaultValue="city" className="grid content-start gap-3">
                {locations.map((location, index) => (
                  <AccordionItem key={location.id} value={location.id} className="contacts-location-card px-5">
                    <AccordionTrigger className="contacts-location-trigger hover:no-underline">
                      <span className="flex items-center gap-3"><span className="contacts-location-number flex size-7 items-center justify-center rounded-full">{index + 1}</span>{location.name}</span>
                    </AccordionTrigger>
                    <AccordionContent className="contacts-copy">
                      <p>{location.description}</p>
                      <div className="contacts-coordinate-row my-4 flex items-center justify-between gap-3 py-3"><span>Координаты:</span><span className="flex items-center gap-2">{location.coordinates}<Copy className="size-4" aria-hidden="true" /></span></div>
                      <p className="mb-3 flex items-center gap-2"><Clock3 className="size-4" aria-hidden="true" />{location.distance}</p>
                      <p className="mb-4 flex items-center gap-2"><WalletCards className="size-4" aria-hidden="true" />{location.price}</p>
                      <Button asChild variant="outline" className="w-full"><Link href={`/${location.id}`} aria-label={`Подробнее о ${location.name}`}>Подробнее</Link></Button>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </RevealSection>

        <RevealSection className="container py-10 lg:py-14" aria-labelledby="feedback-title">
          <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
            <article className="contacts-feedback-image relative min-h-110 overflow-hidden p-7 md:min-h-125">
              <Image src="/foto2.jpg" alt="Территория базы отдыха DeРевня" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              <div className="contacts-photo-overlay absolute inset-0" />
              <div className="relative z-1 flex h-full min-h-96 flex-col justify-between">
                <div><p className="contacts-small">Форма обратной связи</p><h2 id="feedback-title" className="contacts-section-title mt-5">Всегда на связи</h2></div>
                <p className="contacts-copy max-w-md">Есть вопросы о бронировании или отдыхе? Заполните форму, и мы свяжемся с вами в ближайшее время.</p>
              </div>
            </article>
            <ContactsFeedbackForm />
          </div>
        </RevealSection>
      </main>
      <Footer />
      <OrderModal />
    </>
  );
}
