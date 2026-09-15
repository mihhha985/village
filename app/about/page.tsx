import type { Metadata } from "next";
import { AboutPage } from "@/src/components/AboutPage";

export const metadata: Metadata = {
  title: "О нас — TheВилла",
  description: "Познакомьтесь с TheВилла: четыре локации для отдыха на природе, семейных поездок, выходных вдвоём и длительного проживания за городом.",
};

export default function Page() {
  return <AboutPage />;
}
