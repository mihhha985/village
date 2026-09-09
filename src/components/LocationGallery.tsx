"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/src/lib/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/src/lib/ui/dialog";
import type { LocationPhoto } from "@/src/lib/locations";

export function LocationGallery({ photos }: { photos: LocationPhoto[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const changePhoto = (direction: number) => setSelected(current => current === null ? null : (current + direction + photos.length) % photos.length);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <Button key={photo.src} variant="ghost" className="location-photo-button" aria-label={`Увеличить фото: ${photo.alt}`} onClick={() => setSelected(index)}>
            <Image src={photo.src} alt={photo.alt} width={612} height={400} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="location-photo" />
          </Button>
        ))}
      </div>
      <Dialog open={selected !== null} onOpenChange={open => { if (!open) setSelected(null); }}>
        <DialogContent className="location-lightbox" onKeyDown={event => {
          if (event.key === "ArrowLeft") { event.preventDefault(); changePhoto(-1); }
          if (event.key === "ArrowRight") { event.preventDefault(); changePhoto(1); }
        }}>
          <DialogTitle className="pr-8">Атмосфера DeРевни</DialogTitle>
          <DialogDescription>Иллюстрации из материалов сайта. Вид конкретного дома уточняйте при бронировании.</DialogDescription>
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
