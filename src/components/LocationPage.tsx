import { RevealText } from "@/src/components/RevealText";
import { RevealSection } from "@/src/components/RevealSection";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/src/components/Navbar";
import { Footer } from "@/src/components/Footer";
import { OrderModal } from "@/src/components/OrderModal";
import OrderButton from "@/src/components/ui/OrderButton";
import { LocationGallery } from "@/src/components/LocationGallery";
import { Button } from "@/src/lib/ui/button";
import { LOCATION_PAGES } from "@/src/lib/locations";
import type { LocationKey } from "@/src/lib/types/booking";

export function LocationPage({ locationKey }: { locationKey: LocationKey }) {
  const location = LOCATION_PAGES[locationKey];
  const hasLocationPhotos = location.hasLocationPhotos === true;
  return (
    <>
      <Navbar />
      <main className="location-page">
        <RevealSection className="container pb-12 lg:pb-20">
          <Link href="/" className="location-back flex items-center gap-2 mb-8"><ArrowLeft size={16} aria-hidden="true" /> На главную</Link>
          <div className="grid lg:grid-cols-2 items-center gap-8 lg:gap-16">
            <div className="space-y-6">
              <p className="location-eyebrow">{location.tagline}</p>
              <h1 className="location-heading"><RevealText>{location.name}</RevealText></h1>
              <p className="location-lead">{location.introduction}</p>
              <div className="flex flex-wrap gap-3">
                <OrderButton />
                <Button asChild variant="outline"><a href="#gallery" aria-label="Посмотреть фотографии локации">Посмотреть фото</a></Button>
              </div>
            </div>
            <figure className="space-y-3">
              <Image src={location.photos[0].src} alt={location.photos[0].alt} width={800} height={620} priority sizes="(max-width: 1024px) 100vw, 50vw" className="location-hero-photo" />
              <figcaption className="location-caption">Атмосфера TheВилла{hasLocationPhotos ? "" : " · иллюстрация"}</figcaption>
            </figure>
          </div>
        </RevealSection>
        <RevealSection className="location-panel py-12 lg:py-20" aria-labelledby="about-location">
          <div className="container grid lg:grid-cols-2 gap-8 lg:gap-16">
            <div><p className="location-eyebrow mb-3">О локации</p><h2 id="about-location" className="location-subheading">{location.tagline}</h2></div>
            <div className="location-copy space-y-5">{location.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
              <ul className="location-ideas flex flex-wrap gap-3 pt-3">{location.ideas.map(idea => <li key={idea} className="px-4 py-2">{idea}</li>)}</ul>
            </div>
          </div>
        </RevealSection>
        <RevealSection id="gallery" className="container py-12 lg:py-20" aria-labelledby="gallery-title">
          <h2 id="gallery-title" className="location-subheading mb-4">Дома, детали, настроение</h2>
          <p className="location-caption mb-8">{hasLocationPhotos ? "Листайте галерею, чтобы рассмотреть дома, интерьер и атмосферу локации." : "Иллюстрации из материалов сайта. Фотографии не привязаны к конкретной локации; вид выбранного дома уточняйте при бронировании."}</p>
          <LocationGallery photos={location.photos} description={hasLocationPhotos ? `Фотографии домов, интерьера и территории локации ${location.name}.` : undefined} slider={hasLocationPhotos} />
        </RevealSection>
        <RevealSection className="location-panel py-12" aria-labelledby="booking-title">
          <div className="container flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3"><h2 id="booking-title" className="location-subheading">Планируйте свою поездку</h2><p className="location-copy">Выберите даты и гостей — оставьте заявку на отдых в {location.name}.</p></div>
            <OrderButton />
          </div>
        </RevealSection>
        <RevealSection as="nav" aria-label="Другие локации" className="container py-12 lg:py-20">
          <h2 className="location-subheading mb-8">Откройте другие локации</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {(Object.keys(LOCATION_PAGES) as LocationKey[]).filter(key => key !== locationKey).map(key => (
              <Link key={key} href={`/${key}`} className="location-related p-6 space-y-4">
                <span className="flex items-center justify-between gap-3">{LOCATION_PAGES[key].name}<ArrowUpRight size={20} aria-hidden="true" /></span>
                <p className="location-caption">{LOCATION_PAGES[key].tagline}</p>
              </Link>
            ))}
          </div>
        </RevealSection>
      </main>
      <Footer />
      <OrderModal key={locationKey} initialLocation={locationKey} />
    </>
  );
}
