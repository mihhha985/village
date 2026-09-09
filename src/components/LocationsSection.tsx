"use client";
import { RevealSection } from "@/src/components/RevealSection";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { MapPin, Wallet, Navigation, Copy } from "lucide-react";
import { toast } from "sonner";
import Title from "@/src/components/ui/Title";
import { Button } from "@/src/lib/ui/button";
import { Separator } from "@/src/lib/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/src/lib/ui/accordion";
import { YandexMap } from "@/src/components/YandexMap";
import {
  LOCATIONS,
  LOCATION_COORDINATES,
  type LocationKey,
  type LocationData
} from "@/src/lib/types/booking";

const MOCK_LOCATIONS: LocationData[] = [
  {
    id: "prostor",
    name: LOCATIONS.prostor,
    description: "Просторные коттеджи на берегу Выборгского залива с панорамным видом. Идеально для семейного отдыха вдали от городской суеты.",
    coordinates: LOCATION_COORDINATES.prostor,
    address: "Ленинградская область, Выборгский район, п. Рощино",
    distance: "130 км от центра Санкт-Петербурга",
    price: "от 15 000 ₽/сутки",
    image: "/images/prostor.jpg"
  },
  {
    id: "ozero",
    name: LOCATIONS.ozero,
    description: "Уютные домики на берегу Ладожского озера. Рыбалка, баня, пляж и водные развлечения в окружении карельской природы.",
    coordinates: LOCATION_COORDINATES.ozero,
    address: "Ленинградская область, Всеволожский район, берег Ладоги",
    distance: "40 км от центра Санкт-Петербурга",
    price: "от 12 000 ₽/сутки",
    image: "/images/ozero.jpg"
  },
  {
    id: "city",
    name: LOCATIONS.city,
    description: "Загородный отдых рядом с городом. Современная инфраструктура Всеволожска и близость к Санкт-Петербургу.",
    coordinates: LOCATION_COORDINATES.city,
    address: "Ленинградская область, г. Всеволожск",
    distance: "20 км от центра Санкт-Петербурга",
    price: "от 18 000 ₽/сутки",
    image: "/images/city.jpg"
  },
  {
    id: "longlife",
    name: LOCATIONS.longlife,
    description: "Премиальный комплекс для долгосрочного проживания в Приозерском районе. SPA, фитнес и живописные виды на Ладогу.",
    coordinates: LOCATION_COORDINATES.longlife,
    address: "Ленинградская область, Приозерский район, п. Кузнечное",
    distance: "100 км от центра Санкт-Петербурга",
    price: "от 25 000 ₽/сутки",
    image: "/images/longlife.jpg"
  }
];

export function LocationsSection() {
  const [activeLocation, setActiveLocation] = useState<LocationKey>("prostor");

  const activeLocationData = MOCK_LOCATIONS.find(loc => loc.id === activeLocation);
  const mapCenter = activeLocationData?.coordinates || LOCATION_COORDINATES.prostor;

  const mapMarkers = useMemo(() => MOCK_LOCATIONS.map(location => ({
    id: location.id,
    coordinates: location.coordinates,
    title: location.name,
    isActive: location.id === activeLocation
  })), [activeLocation]);

  useEffect(() => {
    const selectHash = () => {
      const key = window.location.hash.slice(1);
      if (Object.hasOwn(LOCATIONS, key)) setActiveLocation(key as LocationKey);
    };
    selectHash();
    window.addEventListener("hashchange", selectHash);
    return () => window.removeEventListener("hashchange", selectHash);
  }, []);

  return (
    <RevealSection className="type-section bg-card">
      <div className="container">
        <Title
					title="Неповторимый опыт в каждой поездке"
					subtitle="Выберите, какое место вам ближе — по расположению или по душе"
				/>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Map */}
          <div className="w-full lg:w-2/3">
            <YandexMap
              center={mapCenter}
              zoom={11}
              markers={mapMarkers}
            />
          </div>

          {/* Locations List with Accordion */}
          <div className="w-full lg:w-1/3">
            <Accordion
              type="single"
              collapsible
              value={activeLocation}
              onValueChange={(value) => value && setActiveLocation(value as LocationKey)}
              className="space-y-4"
            >
              {MOCK_LOCATIONS.map((location) => (
                <AccordionItem
                  id={location.id} key={location.id}
                  value={location.id}
                  className={`rounded-2xl overflow-hidden font-light ${
										location.id === activeLocation ? "bg-primary text-background" : "bg-background text-foreground"
									}`}
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-4 text-left w-full">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors`}>
                        <MapPin size={24} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-2xl">
                          {location.name}
                        </h3>
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="px-6 pb-6">
                    <div className="flex flex-col gap-2 w-full">
                      <p>{location.description}</p>
                      <Separator className="bg-background" />
											<div className="flex items-center justify-between">
												<span className="text-sm">Координаты:</span>
												<span className="text-sm">
													{location.coordinates.lat}, {location.coordinates.lng}
													<Button aria-label="Скопировать координаты" onClick={async () => {
                          try { await navigator.clipboard.writeText(`${location.coordinates.lat}, ${location.coordinates.lng}`); toast.success("Координаты скопированы"); }
                          catch { toast.error("Не удалось скопировать координаты"); }
                        }} variant="ghost" size="icon" className="ml-2 p-0.5">
														<Copy size={14} />
													</Button>
												</span>
											</div>
											<Separator className="bg-background" />
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Navigation size={16} />
                          <span>{location.address}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Wallet size={16} />
                          <span>{location.price}</span>
                        </div>
                      </div>

                      <Button asChild variant="secondary" className="w-full mt-2"><Link href={`/${location.id}`} aria-label={`Подробнее о ${location.name}`}>Подробнее о локации</Link></Button>
                      <Button asChild variant="secondary" className="w-full mt-2"><a aria-label={`Открыть ${location.name} на карте`} href={`https://yandex.ru/maps/?pt=${location.coordinates.lng},${location.coordinates.lat}&z=12&l=map`} target="_blank" rel="noopener noreferrer">Открыть на карте</a></Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
