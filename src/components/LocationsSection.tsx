"use client";

import { useState } from "react";
import { MapPin, Phone, Navigation } from "lucide-react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/src/lib/ui/accordion";
import { YandexMap } from "./YandexMap";
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
    description: "Современный комплекс с панорамным видом на природу. Идеально для семейного отдыха и корпоративных мероприятий.",
    coordinates: LOCATION_COORDINATES.prostor,
    address: "Московская область, Одинцовский район",
    distance: "35 км от МКАД",
    price: "от 15 000 ₽/сутки",
    image: "/images/prostor.jpg"
  },
  {
    id: "ozero",
    name: LOCATIONS.ozero,
    description: "Уютные домики у живописного озера. Рыбалка, баня, пляж и водные развлечения круглый год.",
    coordinates: LOCATION_COORDINATES.ozero,
    address: "Московская область, Мытищинский район",
    distance: "40 км от МКАД",
    price: "от 12 000 ₽/сутки",
    image: "/images/ozero.jpg"
  },
  {
    id: "city",
    name: LOCATIONS.city,
    description: "Городской формат загородного отдыха. Современная инфраструктура и близость к Москве.",
    coordinates: LOCATION_COORDINATES.city,
    address: "Московская область, Ленинский район",
    distance: "25 км от МКАД",
    price: "от 18 000 ₽/сутки",
    image: "/images/city.jpg"
  },
  {
    id: "longlife",
    name: LOCATIONS.longlife,
    description: "Премиальный комплекс для долгосрочного проживания. SPA, фитнес и велнес-программы.",
    coordinates: LOCATION_COORDINATES.longlife,
    address: "Московская область, Балашихинский район",
    distance: "30 км от МКАД",
    price: "от 25 000 ₽/сутки",
    image: "/images/longlife.jpg"
  }
];

export function LocationsSection() {
  const [activeLocation, setActiveLocation] = useState<LocationKey>("prostor");

  const activeLocationData = MOCK_LOCATIONS.find(loc => loc.id === activeLocation);
  const mapCenter = activeLocationData?.coordinates || LOCATION_COORDINATES.prostor;

  const mapMarkers = MOCK_LOCATIONS.map(location => ({
    id: location.id,
    coordinates: location.coordinates,
    title: location.name,
    isActive: location.id === activeLocation
  }));

  return (
    <section className="py-24 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            Наши локации
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Выберите идеальное место для вашего отдыха в Подмосковье
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="order-2 lg:order-1">
            <YandexMap
              center={mapCenter}
              zoom={11}
              markers={mapMarkers}
            />
          </div>

          {/* Locations List with Accordion */}
          <div className="order-1 lg:order-2">
            <Accordion 
              type="single" 
              collapsible 
              value={activeLocation}
              onValueChange={(value) => value && setActiveLocation(value as LocationKey)}
              className="space-y-4"
            >
              {MOCK_LOCATIONS.map((location) => (
                <AccordionItem 
                  key={location.id} 
                  value={location.id}
                  className="border border-border rounded-2xl overflow-hidden bg-card hover:border-primary transition-colors"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-start gap-4 text-left w-full">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center shrink-0
                        ${location.id === activeLocation 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-muted-foreground'
                        }
                        transition-colors
                      `}>
                        <MapPin size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                          {location.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {location.distance}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-lg font-semibold text-primary">
                          {location.price}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-4 pt-4 border-t border-border">
                      <p className="text-muted-foreground leading-relaxed">
                        {location.description}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Navigation size={16} className="text-primary" />
                          <span>{location.address}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone size={16} className="text-primary" />
                          <span>+7 (495) 123-45-67</span>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors text-sm font-medium">
                          Забронировать
                        </button>
                        <button className="flex-1 px-4 py-2 border border-border rounded-full hover:bg-muted transition-colors text-sm font-medium">
                          Подробнее
                        </button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
