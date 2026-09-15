import { RevealText } from "@/src/components/RevealText";
import { RevealSection } from "@/src/components/RevealSection";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/src/components/Navbar";
import { Footer } from "@/src/components/Footer";
import { OrderModal } from "@/src/components/OrderModal";
import { AboutBookingButton } from "@/src/components/AboutBookingButton";
import { Button } from "@/src/lib/ui/button";
import { Card } from "@/src/lib/ui/card";

export function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="about-page pt-30 lg:pt-38">
        <RevealSection className="container pb-10 lg:pb-14" aria-labelledby="about-title">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
            <div>
              <p className="about-eyebrow mb-6">О компании</p>
              <h1 id="about-title" className="about-title"><RevealText>Идти в ногу со временем</RevealText></h1>
              <div className="about-copy mt-7 space-y-6">
                <p>Мир меняется быстрее, чем когда-либо. Мы верим, что настоящий прогресс — это не только скорость, но и умение вовремя остановиться. Именно поэтому так важно иметь место, где можно замедлиться, услышать себя и восстановить силы.</p>
                <p className="about-divider pt-6">В TheВилла природа остаётся источником энергии, а технологии — инструментом, который делает отдых проще и комфортнее.</p>
              </div>
            </div>
            <Image src="/about-team.png" alt="Команда TheВилла у загородного деревянного дома" width={1536} height={1024} priority sizes="(min-width: 1024px) 50vw, 100vw" className="about-team-photo w-full" />
          </div>
        </RevealSection>

        <RevealSection className="container pb-10 lg:pb-14" aria-label="Подход TheВилла">
          <div className="grid gap-5 lg:grid-cols-2">
            <Card className="about-card border-none p-5 md:p-8">
              <div>
                <h2 className="about-card-title">Сфокусируйтесь<br />на действительно важном</h2>
                <p className="about-copy mt-5">За счёт современных интерьеров наши пространства помогают сосредоточиться на главном: природе, тишине и времени рядом с близкими людьми.</p>
              </div>
              <Image src="/longlife/Frame%201948756810.jpg" alt="Современный интерьер дома TheВилла" width={1280} height={716} sizes="(min-width: 1024px) 45vw, 100vw" className="about-card-image mt-8 w-full" />
              <Button asChild variant="link" className="about-link-button mt-3 w-full justify-between px-5">
                <Link href="/contacts" aria-label="Связаться с TheВилла">Связаться с нами<ArrowRight className="size-5" aria-hidden="true" /></Link>
              </Button>
            </Card>

            <Card className="about-card border-none p-5 md:p-8">
              <div>
                <h2 className="about-card-title">Позвольте технологиям<br />сделать всё за вас</h2>
                <p className="about-copy mt-5">Онлайн-бронирование занимает всего пару минут, а система автоматического заселения позволяет приехать в удобное время и сразу оказаться в доме.</p>
              </div>
              <Image src="/calendar.png" alt="Интерфейс выбора дат и бронирования TheВилла" width={488} height={208} sizes="(min-width: 1024px) 45vw, 100vw" className="about-card-image mt-8 w-full" />
              <AboutBookingButton />
            </Card>
          </div>
        </RevealSection>

        <RevealSection className="container pb-10 lg:pb-0" aria-labelledby="builder-title">
          <div className="about-builder relative overflow-hidden p-6 md:p-8 lg:min-h-108 lg:p-10">
            <div className="relative z-1 max-w-2xl">
              <h2 id="builder-title" className="about-builder-title">Строим дома.<br />Создаём впечатления</h2>
              <div className="about-builder-copy mt-6 space-y-5">
                <p>История TheВилла началась с нашей 15-летней экспертизы в загородном девелопменте. Мы создаём долговечные и эстетичные дома, куда хочется возвращаться снова и снова.</p>
                <p>Благодаря нашим возможностям и технологиям, отточенным за годы, мы формируем целую экосистему отдыха в Ленобласти на базе проверенных строительных решений.</p>
              </div>
              <div className="about-builder-divider mt-6 flex flex-col items-start gap-4 pt-5 sm:flex-row sm:items-center">
                <Button asChild variant="secondary" className="px-6">
                  <Link href="/contacts" aria-label="Узнать подробнее о строительных проектах">Узнать подробнее<ArrowRight className="size-4" aria-hidden="true" /></Link>
                </Button>
                <p className="about-builder-caption">о строительных проектах VDK Group</p>
              </div>
            </div>

            <div className="about-phone relative mx-auto mt-8 h-105 w-full max-w-74 overflow-hidden px-5 pt-10 lg:absolute lg:right-10 lg:bottom-0 lg:mt-0 lg:h-[94%]">
              <span className="about-phone-speaker absolute top-4 left-1/2 z-2 h-1 w-16 -translate-x-1/2 rounded-full" />
              <div className="relative z-2 text-center">
                <p className="about-phone-logo">VDK</p>
                <p className="about-phone-group">GROUP</p>
                <p className="about-phone-title mt-5">Строим будущее сегодня</p>
              </div>
              <Image src="/foto3.jpg" alt="Современный загородный дом строительной группы" fill sizes="296px" className="about-phone-photo object-cover" />
              <div className="about-phone-overlay absolute inset-0 z-1" />
              <p className="about-phone-caption absolute right-5 bottom-7 left-5 z-2 text-center">Каждый дом отражает наш подход к качеству, дизайну и философии пространства</p>
            </div>
          </div>
        </RevealSection>
      </main>
      <Footer />
      <OrderModal />
    </>
  );
}
