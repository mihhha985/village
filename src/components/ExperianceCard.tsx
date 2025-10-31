import Image from "next/image";
import { Separator } from "../lib/ui/separator";
import { Card } from "@/src/lib/ui/card";
import { Button } from "@/src/lib/ui/button";
import { MapPin, Users } from "lucide-react";

export interface ExperienceCardProps {
  title: string;
  description: string;
  features: string[];
  image: string;
  variant?: "vertical" | "horizontal";
}

export function ExperienceCard(
  { title, description, features, image, variant }: ExperienceCardProps
) {
	console.log(image);
  return (
    <Card className={`p-4 flex ${variant === "horizontal" ? "flex-col lg:flex-row col-span-1 lg:col-span-3" : "flex-col"}`}>
      {/* Image Placeholder */}
      <div className={`relative overflow-hidden rounded-2xl ${variant === "horizontal" ? "w-full lg:w-1/2 lg:mr-4 2xl:mr-20" : "w-full aspect-4/3"}`}>
        <Image src={image} alt={title} className="object-cover" fill/>
      </div>

      {/* Content */}
      <div className={`flex flex-col gap-2 ${variant === "horizontal" ? "lg:w-1/2" : ""}`}>
        <div>
          <h3 className="text-xl text-foreground mb-2">{title}</h3>
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

				<Separator className="my-4" />

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

				<Separator className="my-4" />

				{/* Action Buttons */}
				<div className="flex flex-col gap-4">
					<Button>Забронировать</Button>
        	<Button variant="outline">Подробнее</Button>
				</div>
      </div>
    </Card>
  );
}
