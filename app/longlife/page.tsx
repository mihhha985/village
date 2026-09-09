import type { Metadata } from "next";
import { LocationPage } from "@/src/components/LocationPage";
import { LOCATION_PAGES } from "@/src/lib/locations";

export const metadata: Metadata = {
  title: `${LOCATION_PAGES.longlife.name} — отдых в DeРевне`,
  description: LOCATION_PAGES.longlife.introduction,
};

export default function Page() {
  return <LocationPage locationKey="longlife" />;
}
