import type { Metadata } from "next";
import { ContactsPage } from "@/src/components/ContactsPage";

export const metadata: Metadata = {
  title: "Контакты — DeРевня",
  description: "Свяжитесь с DeРевней: контактные данные и заявка на подбор загородного отдыха. Выберите дату поездки и оставьте контакты для обратной связи.",
};

export default function Page() {
  return <ContactsPage />;
}
