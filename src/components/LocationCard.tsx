import { Button } from "@/src/lib/ui/button";
import { MapPin, Clock, DollarSign } from "lucide-react";

interface Location {
  id: string;
  name: string;
  description: string;
  coordinates: string;
  distance: string;
  price: string;
  image: string;
}

function LocationCard(
	{ location, isActive, onClick }: 
	{ location: Location; isActive: boolean; onClick: () => void }
) {

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

        <Button variant="outline">Подробнее</Button>
      </div>
    </div>
	);
}

export default LocationCard;