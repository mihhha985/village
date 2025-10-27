"use client";

import { Button } from "@/src/lib/ui/button";
import { MapPin, Users, Calendar, Star } from "lucide-react";

interface ExperienceCardProps {
  title: string;
  description: string;
  features: string[];
  price: string;
  image: string;
  buttonText: string;
}

interface ExperiencesSectionProps {
  title: string;
  experiences: ExperienceCardProps[];
}

function ExperienceCard({ title, description, features, price, image, buttonText }: ExperienceCardProps) {
  return (
    <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-accent/50 transition-all duration-300 group">
      {/* Image Placeholder */}
      <div className="aspect-[4/3] bg-gradient-to-br from-accent/20 to-accent/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Star className="text-accent" size={16} fill="currentColor" />
              <span className="text-sm text-foreground font-medium">4.9</span>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">{price}</p>
              <p className="text-sm text-muted-foreground">за ночь</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-serif font-bold text-foreground mb-2">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {features.map((feature, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Location and Capacity */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <MapPin size={16} />
            <span>50 мин от СПб</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users size={16} />
            <span>до 6 гостей</span>
          </div>
        </div>

        {/* Button */}
        <Button
          variant="outline"
          className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}

export function ExperiencesSection({ title, experiences }: ExperiencesSectionProps) {
  return (
    <section className="py-24 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            {title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={index}
              {...experience}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
