"use client";

import { Button } from "@/src/lib/ui/button";
import { MapPin, Calendar, CheckCircle, Phone, User } from "lucide-react";

interface StepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface HowToBookSectionProps {
  title: string;
  steps: StepProps[];
  supportInfo: {
    title: string;
    description: string;
    phone: string;
    avatar: string;
  };
}

function StepCard({ number, title, description, icon }: StepProps) {
  return (
    <div className="flex items-start space-x-6">
      {/* Step Number */}
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold text-lg">
          {number}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-3">
        <div className="flex items-center space-x-3">
          {icon}
          <h3 className="text-xl font-serif font-bold text-foreground">
            {title}
          </h3>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

function SupportCard({ title, description, phone, avatar }: { title: string; description: string; phone: string; avatar: string }) {
  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      <div className="space-y-4">
        <h3 className="text-xl font-serif font-bold text-foreground">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
        
        <div className="flex items-center space-x-4 pt-4 border-t border-border">
          <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
            <User className="text-accent" size={20} />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Служба заботы</p>
            <div className="flex items-center space-x-2">
              <Phone size={16} className="text-accent" />
              <span className="text-foreground font-medium">{phone}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HowToBookSection({ title, steps, supportInfo }: HowToBookSectionProps) {
  return (
    <section className="py-24 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            {title}
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Steps */}
          <div className="lg:col-span-2 space-y-8">
            {steps.map((step, index) => (
              <StepCard
                key={index}
                {...step}
              />
            ))}
          </div>

          {/* Support Card */}
          <div className="lg:col-span-1">
            <SupportCard {...supportInfo} />
          </div>
        </div>
      </div>
    </section>
  );
}
