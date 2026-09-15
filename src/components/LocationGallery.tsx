"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/src/lib/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/src/lib/ui/dialog";
import type { LocationPhoto } from "@/src/lib/locations";

type LocationGalleryProps = {
  photos: LocationPhoto[];
  description?: string;
  slider?: boolean;
};

export function LocationGallery({ photos, description = "Иллюстрации из материалов сайта. Вид конкретного дома уточняйте при бронировании.", slider = false }: LocationGalleryProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(photos.length > 1);
  const trackRef = useRef<HTMLDivElement>(null);
  const changePhoto = (direction: number) => setSelected(current => current === null ? null : (current + direction + photos.length) % photos.length);

  const goToSlide = useCallback((index: number) => {
    const track = trackRef.current;
    const slide = track?.children[index] as HTMLElement | undefined;

    if (!track || !slide) return;

    track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: "smooth" });
    setActiveSlide(index);
  }, []);

  const updateActiveSlide = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const slides = Array.from(track.children) as HTMLElement[];
    const closestSlide = slides.reduce((closest, slide, index) => {
      const distance = Math.abs(slide.offsetLeft - track.offsetLeft - track.scrollLeft);
      return distance < closest.distance ? { index, distance } : closest;
    }, { index: 0, distance: Number.POSITIVE_INFINITY });

    setActiveSlide(closestSlide.index);
    setCanGoBack(track.scrollLeft > 1);
    setCanGoForward(track.scrollLeft < track.scrollWidth - track.clientWidth - 1);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new ResizeObserver(updateActiveSlide);
    observer.observe(track);
    return () => observer.disconnect();
  }, [updateActiveSlide]);

  return (
    <>
      {slider ? <div className="location-slider" aria-roledescription="карусель" aria-label="Фотогалерея локации">
        <div
          ref={trackRef}
          className="location-slider-track custom-scrollbar-thin"
          onScroll={updateActiveSlide}
          onKeyDown={event => {
            if (event.key === "ArrowLeft") { event.preventDefault(); goToSlide(Math.max(0, activeSlide - 1)); }
            if (event.key === "ArrowRight") { event.preventDefault(); goToSlide(Math.min(photos.length - 1, activeSlide + 1)); }
          }}
          tabIndex={0}
        >
          {photos.map((photo, index) => (
            <div key={photo.src} className="location-slide" role="group" aria-roledescription="слайд" aria-label={`${index + 1} из ${photos.length}`}>
              <Button variant="ghost" className="location-photo-button" aria-label={`Увеличить фото: ${photo.alt}`} onClick={() => setSelected(index)}>
                <Image src={photo.src} alt={photo.alt} width={1280} height={720} sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw" className="location-photo" />
              </Button>
            </div>
          ))}
        </div>
        <div className="location-slider-controls flex items-center justify-between gap-4 mt-5">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" aria-label="Предыдущее фото" disabled={!canGoBack} onClick={() => goToSlide(Math.max(0, activeSlide - 1))}><ChevronLeft aria-hidden="true" /></Button>
            <Button variant="outline" size="icon" aria-label="Следующее фото" disabled={!canGoForward} onClick={() => goToSlide(Math.min(photos.length - 1, activeSlide + 1))}><ChevronRight aria-hidden="true" /></Button>
          </div>
          <p className="location-slider-counter" aria-live="polite">{activeSlide + 1} / {photos.length}</p>
        </div>
      </div> : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <Button key={photo.src} variant="ghost" className="location-photo-button" aria-label={`Увеличить фото: ${photo.alt}`} onClick={() => setSelected(index)}>
            <Image src={photo.src} alt={photo.alt} width={612} height={400} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="location-photo" />
          </Button>
        ))}
      </div>}
      <Dialog open={selected !== null} onOpenChange={open => { if (!open) setSelected(null); }}>
        <DialogContent className="location-lightbox" onKeyDown={event => {
          if (event.key === "ArrowLeft") { event.preventDefault(); changePhoto(-1); }
          if (event.key === "ArrowRight") { event.preventDefault(); changePhoto(1); }
        }}>
          <DialogTitle className="pr-8">Атмосфера TheВилла</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          {selected !== null && <>
            <Image src={photos[selected].src} alt={photos[selected].alt} width={1000} height={680} className="location-enlarged-photo" />
            <div className="flex items-center justify-between gap-4">
              <Button variant="outline" size="icon" aria-label="Предыдущее фото" onClick={() => changePhoto(-1)}><ChevronLeft aria-hidden="true" /></Button>
              <p aria-live="polite">{selected + 1} / {photos.length}</p>
              <Button variant="outline" size="icon" aria-label="Следующее фото" onClick={() => changePhoto(1)}><ChevronRight aria-hidden="true" /></Button>
            </div>
          </>}
        </DialogContent>
      </Dialog>
    </>
  );
}
