"use client";

import { Button } from "@/src/lib/ui/button";
import { ArrowRight, Heart, Users, Users2 } from "lucide-react";

interface PlanCardProps {
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  linkText: string;
}

interface PlansSectionProps {
  title: string;
  plans: PlanCardProps[];
}

function PlanCard({ title, description, image, icon, linkText }: PlanCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border hover:border-accent/50 transition-all duration-300">
      {/* Background Image Placeholder */}
      <div className="aspect-[4/3] bg-gradient-to-br from-accent/20 to-accent/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        
        {/* Icon */}
        <div className="absolute top-6 left-6">
          <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            {icon}
          </div>
        </div>

        {/* Content */}
        <div className="absolute bottom-6 left-6 right-6">
          <h3 className="text-2xl font-serif font-bold text-foreground mb-3">
            {title}
          </h3>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            {description}
          </p>
          <Button
            variant="ghost"
            className="text-accent hover:text-accent-foreground hover:bg-accent p-0 h-auto font-medium"
          >
            {linkText}
            <ArrowRight className="ml-2" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function PlansSection({ title, plans }: PlansSectionProps) {
  return (
    <section className="py-24 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            {title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PlanCard
              key={index}
              {...plan}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
