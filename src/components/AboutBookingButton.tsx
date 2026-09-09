"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/src/lib/ui/button";
import { useOrderModal } from "@/src/store/modal";

export function AboutBookingButton() {
  const show = useOrderModal((state) => state.show);

  return (
    <Button type="button" variant="link" onClick={show} aria-label="Перейти к бронированию" className="about-link-button mt-3 w-full justify-between px-5">
      Перейти к бронированию<ArrowRight className="size-5" aria-hidden="true" />
    </Button>
  );
}
