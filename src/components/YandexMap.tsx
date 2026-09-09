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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fail = () => { if (!cancelled) setError("Карта временно недоступна. Адреса и координаты указаны рядом."); };
    const loaded = () => {
      clearTimeout(timeout);
      if (!cancelled && window.ymaps3) setIsLoaded(true);
      else if (!cancelled) fail();
    };
    const timeout = setTimeout(fail, 15000);
    if (window.ymaps3) {
      loaded();
      return () => { cancelled = true; clearTimeout(timeout); };
    }
    const key = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY;
    if (!key) {
      queueMicrotask(fail);
      clearTimeout(timeout);
      return () => { cancelled = true; };
    }
    const existing = document.querySelector<HTMLScriptElement>('script[src*="api-maps.yandex.ru/v3/"]');
    const script = existing ?? document.createElement("script");
    script.addEventListener("load", loaded);
    script.addEventListener("error", fail);
    if (!existing) {
      script.src = `https://api-maps.yandex.ru/v3/?apikey=${encodeURIComponent(key)}&lang=ru_RU`;
      script.async = true;
      document.body.appendChild(script);
    }
    return () => {
      cancelled = true;
      clearTimeout(timeout);
      script.removeEventListener("load", loaded);
      script.removeEventListener("error", fail);
    };
  }, []);

  // Инициализация и пересоздание карты при изменении координат
  useEffect(() => {
    if (!mapRef.current || !isLoaded || !window.ymaps3) return;

    let cancelled = false;
    const initMap = async () => {
      try {
				setIsMapReady(false);
				await window.ymaps3.ready;
        if (cancelled || !mapRef.current) return;
        setError(null);
        // Удаляем старую карту если она существует
        if (mapInstanceRef.current?.destroy) {
          mapInstanceRef.current.destroy();
          mapInstanceRef.current = null;
        }

        // Очищаем маркеры
        markersRef.current = [];

        const { 
          YMap, 
          YMapDefaultSchemeLayer, 
          YMapDefaultFeaturesLayer, 
          YMapMarker
        } = window.ymaps3;

        // Создаем новую карту с обновленными координатами и отключенным взаимодействием
        const map = new YMap(mapRef.current, {
          location: {
            center: [center.lng, center.lat],
            zoom: zoom,
          },
          // Отключаем все взаимодействия с картой
          behaviors: [],
        });

        // Добавляем слои с кастомной темной темой
        map.addChild(new YMapDefaultSchemeLayer({
          theme: 'dark',
          customization: [
            {
              tags: 'country',
              elements: 'geometry.fill',
              stylers: [
                {
                  color: '#1a1a1a', // --card
                }
              ]
            },
            {
              tags: 'region',
              elements: 'geometry.fill',
              stylers: [
                {
                  color: '#111111', // --background
                }
              ]
            },
            {
              tags: 'water',
              elements: 'geometry',
              stylers: [
                {
                  color: '#282828', // --muted
                }
              ]
            },
            {
              tags: 'road',
              elements: 'geometry.fill',
              stylers: [
                {
                  color: '#2a2a2a',
                }
              ]
            },
            {
              tags: 'road',
              elements: 'geometry.outline',
              stylers: [
                {
                  color: '#1a1a1a',
                }
              ]
            },
            {
              tags: 'park',
              elements: 'geometry',
              stylers: [
                {
                  color: '#1f1f1f',
                }
              ]
            },
            {
              tags: 'landscape',
              elements: 'label.text.fill',
              stylers: [
                {
                  color: '#bababa', // --muted-foreground
                }
              ]
            },
            {
              tags: 'poi',
              elements: 'label.text.fill',
              stylers: [
                {
                  color: '#dea66d', // --primary
                }
              ]
            }
          ]
        }));
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
                    <span class="marker-title"></span>
                    <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-background border-r border-b border-border rotate-45"></div>
                  </div>
                ` : ''}
              </div>
            `;

            const title = markerElement.querySelector(".marker-title");
            if (title) title.textContent = marker.title;

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
        if (cancelled) return;
        console.error("Ошибка инициализации карты:", error);
        setError("Карта временно недоступна. Адреса и координаты указаны рядом.");
        setIsMapReady(false);
      }
    };

    void initMap();
    return () => {
      cancelled = true;
      mapInstanceRef.current?.destroy();
      mapInstanceRef.current = null;
      markersRef.current = [];
    };
  }, [isLoaded, center.lat, center.lng, zoom, markers]);

  // Обновление маркеров без пересоздания карты (теперь не нужен)
  // useEffect удален, так как маркеры обновляются в основном useEffect
  return (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-[600px] rounded-2xl overflow-hidden bg-card border border-border">
      <div ref={mapRef} className="absolute inset-0 cursor-default" />
      
      {!isMapReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/80 backdrop-blur-sm">
          <div className="text-center">
            {!error && <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />}
            <p role="status" className="text-muted-foreground p-4">{error ?? "Загрузка карты..."}</p>
          </div>
        </div>
      )}
    </div>
  );
}
