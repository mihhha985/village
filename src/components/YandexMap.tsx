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
  const [isLoaded, setIsLoaded] = useState(true);
  const scriptLoadedRef = useRef(false);

  // Загрузка Яндекс.Карт API
  useEffect(() => {
    if (typeof window === "undefined" || scriptLoadedRef.current) return;
		console.log("Загрузка Яндекс.Карт API");
		console.log("API Key:", process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY);
    const existingScript = document.querySelector(`script[src*="api-maps.yandex.ru"]`);
    
    if (existingScript) {
      scriptLoadedRef.current = true;
      // Проверяем асинхронно
      setTimeout(() => {
        if (window.ymaps3) {
          setIsLoaded(false);
        }
      }, 100);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://api-maps.yandex.ru/v3/?apikey=${process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY || ''}&lang=ru_RU`;
    script.async = true;
    
    script.onload = () => {
      scriptLoadedRef.current = true;
      setIsLoaded(false);
    };

    script.onerror = () => {
      console.error("Ошибка загрузки Яндекс.Карт");
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup при размонтировании
      if (mapInstanceRef.current && mapInstanceRef.current.destroy) {
        mapInstanceRef.current.destroy();
      }
    };
  }, []);

  // Инициализация карты
  useEffect(() => {
    if (!mapRef.current || !window.ymaps3) return;

    const initMap = async () => {
      try {
        await window.ymaps3.ready;

        const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = window.ymaps3;

        // Создаем карту
        const map = new YMap(mapRef.current, {
          location: {
            center: [center.lng, center.lat],
            zoom: zoom,
          },
        });

        // Добавляем слои
        map.addChild(new YMapDefaultSchemeLayer());
        map.addChild(new YMapDefaultFeaturesLayer());

        mapInstanceRef.current = map;

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
      }
    };

		if (mapInstanceRef.current && mapInstanceRef.current.destroy) {
      mapInstanceRef.current.destroy();
    }
    initMap();
  }, [isLoaded,center.lat, center.lng, zoom, markers]);

	
  // Обновление маркеров при изменении активной локации
  useEffect(() => {
    if (!mapInstanceRef.current || !window.ymaps3 || markers.length === 0) return;

    const updateMarkers = async () => {
      try {
        // Удаляем старые маркеры
        markersRef.current.forEach((marker) => {
          mapInstanceRef.current.removeChild(marker);
        });
        markersRef.current = [];

        const { YMapMarker } = window.ymaps3;
        const newMarkers: any[] = [];

        // Создаем новые маркеры
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
                <div class="absolute -top-12 left-1/2 -translate-x-1/2 bg-background border border-border rounded-lg px-3 py-1.5 shadow-lg whitespace-nowrap text-sm font-medium z-50">
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

          mapInstanceRef.current.addChild(yandexMarker);
          newMarkers.push(yandexMarker);
        });

        markersRef.current = newMarkers;

        // Центрируем карту на активном маркере
        const activeMarker = markers.find((m) => m.isActive);
        if (activeMarker) {
          mapInstanceRef.current.setLocation({
            center: [activeMarker.coordinates.lng, activeMarker.coordinates.lat],
            zoom: 12,
            duration: 500,
          });
        }
      } catch (error) {
        console.error("Ошибка обновления маркеров:", error);
      }
    };

    updateMarkers();
  }, [markers]);
  return (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-[600px] rounded-2xl overflow-hidden border border-border">
      {isLoaded 
			  ?
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Загрузка карты...</p>
          </div>
        </div>
				:
				<div ref={mapRef} className="w-[600px] h-[400px]" />
      }
    </div>
  );
}
