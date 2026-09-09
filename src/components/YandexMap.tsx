"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { LocationCoordinates } from "@/src/lib/types/booking";

interface YandexMapProps {
  center: LocationCoordinates;
  zoom?: number;
  markers?: Array<{
    id: string;
    coordinates: LocationCoordinates;
    title: string;
    isActive?: boolean;
  }>;
}

type MapStatus = "loading" | "loaded" | "error";

function StaticMapImage({ imageUrl }: { imageUrl: string }) {
  const [status, setStatus] = useState<MapStatus>("loading");

  return (
    <div
      className="relative w-full h-full min-h-[400px] lg:min-h-[600px] rounded-2xl overflow-hidden bg-card border border-border"
      aria-busy={status === "loading"}
    >
      <Image
        src={imageUrl}
        alt="Карта расположения локаций DeРевня"
        fill
        unoptimized
        className="object-cover"
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("error")}
      />

      {status !== "loaded" && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/80 backdrop-blur-sm">
          <div className="text-center">
            {status === "loading" && (
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
            )}
            <p role="status" className="text-muted-foreground p-4">
              {status === "error"
                ? "Карта временно недоступна. Адреса и координаты указаны рядом."
                : "Загрузка карты..."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export function YandexMap({ center, zoom = 10, markers = [] }: YandexMapProps) {
  const imageUrl = useMemo(() => {
    const params = new URLSearchParams({
      ll: `${center.lng},${center.lat}`,
      z: String(zoom),
      size: "650,450",
      scale: "1",
      lang: "ru_RU",
      theme: "dark",
    });

    if (markers.length > 0) {
      params.set(
        "pt",
        markers
          .map(({ coordinates, isActive }) =>
            `${coordinates.lng},${coordinates.lat},${isActive ? "pm2orm" : "pm2wtm"}`
          )
          .join("~")
      );
    }

    return `/api/yandex-map?${params.toString()}`;
  }, [center.lat, center.lng, markers, zoom]);

  return <StaticMapImage key={imageUrl} imageUrl={imageUrl} />;
}
