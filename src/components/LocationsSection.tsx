"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import LocationCard from "./LocationCard";

interface Location {
  id: string;
  name: string;
  description: string;
  coordinates: string;
  distance: string;
  price: string;
  image: string;
}

interface LocationsSectionProps {
  title: string;
  locations: Location[];
}


export function LocationsSection({ title, locations }: LocationsSectionProps) {
  const [activeLocation, setActiveLocation] = useState(0);

  return (
    <section className="py-24 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            {title}
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Placeholder */}
					<div></div>

          {/* Locations List */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-foreground mb-6">
              Наши локации
            </h3>
            {locations.map((location, index) => (
              <LocationCard
                key={location.id}
                location={location}
                isActive={index === activeLocation}
                onClick={() => setActiveLocation(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
