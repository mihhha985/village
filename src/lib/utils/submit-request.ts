import { format } from "date-fns";
import type { OrderDataType } from "@/src/lib/validations/booking";

type ContactRequest = { name: string; phone: string; email: string; date: Date };

export async function submitRequest(data: OrderDataType | ContactRequest) {
  const payload = "date" in data
    ? { type: "contact", ...data, date: format(data.date, "yyyy-MM-dd") }
    : { type: "booking", ...data, checkIn: format(data.checkIn, "yyyy-MM-dd"), checkOut: format(data.checkOut, "yyyy-MM-dd") };
  const response = await fetch("/api/requests", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(20000),
  });
  const result = await response.json();
  if (!response.ok || result.success !== true) {
    throw new Error(result.error || "Не удалось отправить заявку. Попробуйте позже.");
  }
}
