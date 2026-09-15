import type { Metadata } from "next";
import { LocationPage } from "@/src/components/LocationPage";
import { LOCATION_PAGES } from "@/src/lib/locations";

export const metadata: Metadata = {
  title: `${LOCATION_PAGES.prostor.name} — отдых в TheВилла`,
  description: LOCATION_PAGES.prostor.introduction,
};

export default function Page() {
  return <LocationPage locationKey="prostor" />;
}
