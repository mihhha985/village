import { parseISO } from "date-fns";
import { ContactRequestSchema, OrderDataSchema } from "@/src/lib/validations/booking";

const parseDate = (value: unknown) => typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) ? parseISO(value) : undefined;

export async function receiveRequest(request: Request): Promise<Response> {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Некорректный JSON" }, { status: 400 });
  }
  if (!body || typeof body !== "object" || !["booking", "contact"].includes(body.type)) {
    return Response.json({ error: "Неизвестный тип заявки" }, { status: 400 });
  }
  const result = body.type === "booking"
    ? OrderDataSchema.safeParse({ ...body, checkIn: parseDate(body.checkIn), checkOut: parseDate(body.checkOut) })
    : ContactRequestSchema.safeParse({ ...body, date: parseDate(body.date) });
  if (!result.success) {
    return Response.json({ error: result.error.issues[0].message }, { status: 400 });
  }

  const url = process.env.REQUESTS_WEBHOOK_URL;
  if (!url) {
    return Response.json({ error: "Приём заявок временно недоступен. Пожалуйста, свяжитесь с нами напрямую." }, { status: 503 });
  }
  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (process.env.REQUESTS_WEBHOOK_TOKEN) headers.Authorization = `Bearer ${process.env.REQUESTS_WEBHOOK_TOKEN}`;
    const data = body.type === "booking"
      ? { ...result.data, checkIn: body.checkIn, checkOut: body.checkOut }
      : { ...result.data, date: body.date };
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ type: body.type, ...data }),
      signal: AbortSignal.timeout(15000),
      redirect: "error",
    });
    if (!response.ok) throw new Error("Request rejected");
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Не удалось подтвердить отправку заявки. Свяжитесь с нами или попробуйте позже." }, { status: 502 });
  }
}
