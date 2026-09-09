import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { InformationPage } from "@/src/components/InformationPage";
import OrderButton from "@/src/components/ui/OrderButton";
import { Button } from "@/src/lib/ui/button";
import { LOCATION_PAGES } from "@/src/lib/locations";

export function AboutPage() {
  return (
    <InformationPage
      title="О DeРевне"
      introduction="Быть ближе к природе и друг к другу. DeРевня — это четыре локации для загородного отдыха, в котором есть место комфорту, тишине и вашим собственным планам."
    >
      <section className="container pb-12 lg:pb-20" aria-labelledby="about-idea">
        <div className="grid lg:grid-cols-2 items-center gap-8 lg:gap-16">
          <figure className="space-y-3">
            <Image src="/foto4.jpg" alt="Деревянный дом с освещённой террасой среди берёз" width={612} height={327} priority sizes="(max-width: 1024px) 100vw, 50vw" className="location-hero-photo" />
            <figcaption className="location-caption">Атмосфера DeРевни · иллюстрация из материалов сайта</figcaption>
          </figure>
          <div className="space-y-6">
            <p className="location-eyebrow">Наша идея</p>
            <h2 id="about-idea" className="location-subheading">Свобода выбирать и быть собой</h2>
            <div className="location-copy space-y-4">
              <p>У каждого свой способ отдыхать. Кому-то нужны выходные с семьёй, кому-то — поездка вдвоём, а кому-то хочется остаться за городом подольше. Поэтому у DeРевни четыре разных направления.</p>
              <p>Нас объединяет простая идея: сменить привычную обстановку, не отказываясь от домашнего уюта. Проводить больше времени на свежем воздухе, собираться за одним столом и выбирать свой ритм.</p>
            </div>
            <Button asChild variant="outline"><a href="#our-locations" aria-label="Посмотреть четыре локации DeРевни">Выбрать своё место</a></Button>
          </div>
        </div>
      </section>
      <section id="our-locations" className="location-panel py-12 lg:py-20" aria-labelledby="locations-title">
        <div className="container">
          <h2 id="locations-title" className="location-subheading mb-4">Четыре локации. Ваш сценарий отдыха</h2>
          <p className="location-copy mb-8 max-w-3xl">Познакомьтесь с каждым направлением и выберите то, что подходит вашим планам.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(LOCATION_PAGES).map(([key, location]) => (
              <Link key={key} href={`/${key}`} className="location-related p-6 lg:p-8 space-y-4">
                <h3 className="flex items-center justify-between gap-4">{location.name}<ArrowUpRight size={20} aria-hidden="true" /></h3>
                <p className="location-eyebrow">{location.tagline}</p>
                <p className="location-copy">{location.introduction}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="container py-12 lg:py-20" aria-labelledby="trip-title">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          <h2 id="trip-title" className="location-subheading">От идеи до поездки</h2>
          <div className="space-y-6">
            <ol className="information-steps location-copy space-y-5 pl-6">
              <li>Выберите локацию и познакомьтесь с её описанием.</li>
              <li>Укажите даты поездки, количество взрослых и детей в форме бронирования.</li>
              <li>Оставьте контактные данные для согласования дома, стоимости и условий проживания.</li>
            </ol>
            <p className="location-caption">Отправка заявки не подтверждает бронь автоматически. Доступность размещения и дополнительные услуги уточняются для выбранных дат.</p>
            <div className="flex flex-wrap gap-3">
              <OrderButton />
              <Button asChild variant="outline"><Link href="/contacts" aria-label="Перейти на страницу контактов">Связаться с нами</Link></Button>
            </div>
          </div>
        </div>
      </section>
    </InformationPage>
  );
}
