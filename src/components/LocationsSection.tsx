"use client";

import { useState } from "react";
import { Button } from "@/src/lib/ui/button";
import { MapPin, Clock, DollarSign, ArrowRight } from "lucide-react";

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

function LocationCard({ location, isActive, onClick }: { location: Location; isActive: boolean; onClick: () => void }) {
  return (
    <div
      className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 ${
        isActive
          ? "border-accent bg-accent/5"
          : "border-border bg-card hover:border-accent/50"
      }`}
      onClick={onClick}
    >
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-serif font-bold text-foreground mb-2">
            {location.name}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {location.description}
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <MapPin size={16} />
            <span>{location.coordinates}</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Clock size={16} />
            <span>{location.distance}</span>
          </div>
          <div className="flex items-center space-x-2 text-foreground">
            <DollarSign size={16} />
            <span className="font-semibold">{location.price}</span>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="w-full text-accent hover:text-accent-foreground hover:bg-accent"
        >
          Подробнее
          <ArrowRight className="ml-2" size={16} />
        </Button>
      </div>
    </div>
  );
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
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="aspect-[4/3] bg-gradient-to-br from-muted/20 to-muted/5 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 mx-auto bg-accent/20 rounded-full flex items-center justify-center">
                      <MapPin className="text-accent" size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-serif font-bold text-foreground mb-2">
                        {locations[activeLocation]?.name}
                      </h3>
                      <p className="text-muted-foreground">
                        {locations[activeLocation]?.coordinates}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Map Markers */}
                <div className="absolute top-4 left-4 right-4 flex justify-between">
                  {locations.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full ${
                        index === activeLocation ? "bg-accent" : "bg-muted-foreground/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

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
