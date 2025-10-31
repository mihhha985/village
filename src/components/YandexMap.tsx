"use client";

import { useEffect, useRef, useState } from "react";
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

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    ymaps3: any;
  }
}

export function YandexMap({ center, zoom = 10, markers = [] }: YandexMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);
  const scriptLoadedRef = useRef(false);

  // Загрузка Яндекс.Карт API
  useEffect(() => {
    if (typeof window === "undefined" || scriptLoadedRef.current) return;

    const existingScript = document.querySelector(`script[src*="api-maps.yandex.ru"]`);
    
    if (existingScript) {
      scriptLoadedRef.current = true;
      // Проверяем асинхронно
      setTimeout(() => {
        if (window.ymaps3) {
          setIsLoaded(true);
        }
      }, 100);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://api-maps.yandex.ru/v3/?apikey=${process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY || ''}&lang=ru_RU`;
    script.async = true;
    
    script.onload = () => {
      scriptLoadedRef.current = true;
      setIsLoaded(true);
    };

    script.onerror = () => {
      console.error("Ошибка загрузки Яндекс.Карт");
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup при размонтировании
      if (mapInstanceRef.current?.destroy) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Инициализация и пересоздание карты при изменении координат
  useEffect(() => {
    if (!mapRef.current || !isLoaded || !window.ymaps3) return;

    const initMap = async () => {
      try {
				setIsMapReady(false);
				await new Promise((resolve) => setTimeout(resolve, 800)); // Ждем следующий тик
        // Удаляем старую карту если она существует
        if (mapInstanceRef.current?.destroy) {
          mapInstanceRef.current.destroy();
          mapInstanceRef.current = null;
        }

        // Очищаем маркеры
        markersRef.current = [];

        await window.ymaps3.ready;

        const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = window.ymaps3;

        // Создаем новую карту с обновленными координатами
        const map = new YMap(mapRef.current, {
          location: {
            center: [center.lng, center.lat],
            zoom: zoom,
          },
        });

        // Добавляем слои (важно!)
        map.addChild(new YMapDefaultSchemeLayer());
        map.addChild(new YMapDefaultFeaturesLayer());

        mapInstanceRef.current = map;
        setIsMapReady(true);

        // Добавляем маркеры
        if (markers.length > 0) {
          const newMarkers: any[] = [];

          markers.forEach((marker) => {
            const markerElement = document.createElement("div");
            markerElement.className = "yandex-marker";
            markerElement.innerHTML = `
              <div class="relative">
                <div class="${marker.isActive 
                  ? 'w-8 h-8 bg-primary rounded-full border-4 border-background shadow-lg' 
                  : 'w-6 h-6 bg-card border-2 border-primary rounded-full shadow-md'
                } flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110">
                  <div class="w-2 h-2 bg-background rounded-full"></div>
                </div>
                ${marker.isActive ? `
                  <div class="absolute -top-12 left-1/2 -translate-x-1/2 bg-background border border-border rounded-lg px-3 py-1.5 shadow-lg whitespace-nowrap text-sm font-medium">
                    ${marker.title}
                    <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-background border-r border-b border-border rotate-45"></div>
                  </div>
                ` : ''}
              </div>
            `;

            const yandexMarker = new YMapMarker(
              {
                coordinates: [marker.coordinates.lng, marker.coordinates.lat],
                draggable: false,
              },
              markerElement
            );

            map.addChild(yandexMarker);
            newMarkers.push(yandexMarker);
          });

          markersRef.current = newMarkers;
        }
      } catch (error) {
        console.error("Ошибка инициализации карты:", error);
        setIsMapReady(false);
      }
    };

    initMap();
  }, [isLoaded, center.lat, center.lng, zoom, markers]);

  // Обновление маркеров без пересоздания карты (теперь не нужен)
  // useEffect удален, так как маркеры обновляются в основном useEffect
  return (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-[600px] rounded-2xl overflow-hidden bg-card border border-border">
      <div ref={mapRef} className="w-full h-full" />
      
      {!isMapReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/80 backdrop-blur-sm">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Загрузка карты...</p>
          </div>
        </div>
      )}
    </div>
  );
}
