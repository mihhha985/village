import type { Metadata } from "next";
import { LocationPage } from "@/src/components/LocationPage";
import { LOCATION_PAGES } from "@/src/lib/locations";

export const metadata: Metadata = {
  title: `${LOCATION_PAGES.city.name} — отдых в DeРевне`,
  description: LOCATION_PAGES.city.introduction,
};

export default function Page() {
  return <LocationPage locationKey="city" />;
}
