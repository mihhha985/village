import { z } from "zod";
import { startOfDay } from "date-fns";
import { BOOKING_LIMITS, LOCATIONS } from "@/src/lib/types/booking";

export const AdultSchema = z.object({
  count: z.number().int().min(BOOKING_LIMITS.MIN_ADULTS_PER_ROOM).max(BOOKING_LIMITS.MAX_ADULTS_PER_ROOM),
});
export const ChildrenSchema = z.object({
  count: z.number().int().min(0).max(BOOKING_LIMITS.MAX_CHILDREN_PER_ROOM),
  ages: z.array(z.number().int().min(0).max(17)),
}).refine(data => data.ages.length === data.count, { message: "Укажите возраст каждого ребёнка", path: ["ages"] });
export const RoomSchema = z.object({
  id: z.string().min(1),
  index: z.number().int().positive(),
  adults: AdultSchema,
  children: ChildrenSchema,
});
const guestsSchema = z.array(RoomSchema, { message: "Укажите количество гостей" }).min(1, "Укажите количество гостей")
  .max(BOOKING_LIMITS.MAX_ROOMS, "Максимум 5 номеров")
  .refine(rooms => new Set(rooms.map(room => room.id)).size === rooms.length, "Номера не должны повторяться");
const checkInSchema = z.date({ message: "Укажите дату заезда" })
  .refine(date => date >= startOfDay(new Date()), "Дата заезда не может быть в прошлом");
const bookingFields = {
  location: z.enum(Object.keys(LOCATIONS) as [keyof typeof LOCATIONS, ...(keyof typeof LOCATIONS)[]], { message: "Выберите базу отдыха" }),
  checkIn: checkInSchema,
  checkOut: z.date({ message: "Укажите дату выезда" }),
  guests: guestsSchema,
};
const dateOrder = (data: { checkIn: Date; checkOut: Date }) => startOfDay(data.checkOut) > startOfDay(data.checkIn);
const dateError = { message: "Дата выезда должна быть позже даты заезда", path: ["checkOut"] };
export const SearchDataSchema = z.object(bookingFields).refine(dateOrder, dateError);
export const ContactDataSchema = z.object({
  name: z.string().trim().min(2, "Имя должно содержать минимум 2 символа").max(50, "Имя слишком длинное"),
  phone: z.string().trim().regex(/^[+\d\s()-]+$/, "Некорректный формат телефона")
    .refine(value => { const count = value.replace(/\D/g, "").length; return count >= 10 && count <= 15; }, "Телефон должен содержать от 10 до 15 цифр"),
  email: z.string().trim().email("Некорректный email адрес"),
});
export const ContactRequestSchema = ContactDataSchema.extend({ date: checkInSchema });
export const FeedbackRequestSchema = z.object({
  name: ContactDataSchema.shape.name,
  phone: ContactDataSchema.shape.phone,
  message: z.string().trim().min(5, "Сообщение должно содержать минимум 5 символов").max(1000, "Сообщение слишком длинное"),
});
export const OrderDataSchema = z.object({
  ...bookingFields,
  ...ContactDataSchema.shape,
  comment: z.string().trim().max(500, "Комментарий слишком длинный").optional(),
  agreement: z.boolean().refine(value => value, "Необходимо принять условия"),
}).refine(dateOrder, dateError);
export type SearchDataType = z.infer<typeof SearchDataSchema>;
export type OrderDataType = z.infer<typeof OrderDataSchema>;
