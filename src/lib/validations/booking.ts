import { z } from 'zod';

// Схема для Adult
export const AdultSchema = z.object({
  count: z.number().min(1, 'Минимум 1 взрослый').max(4, 'Максимум 4 взрослых на номер')
});

// Схема для Children
export const ChildrenSchema = z.object({
  count: z.number().min(0, 'Количество детей не может быть отрицательным').max(6, 'Максимум 6 детей на номер'),
  ages: z.array(z.number().min(0, 'Возраст не может быть отрицательным').max(17, 'Максимальный возраст ребенка 17 лет'))
});

// Схема для Room
export const RoomSchema = z.object({
  id: z.string(),
  index: z.number(),
  adults: AdultSchema,
  children: ChildrenSchema
});

// Схема для SearchData
export const SearchDataSchema = z.object({
  location: z.string().min(1, 'Выберите базу отдыха'),
  checkIn: z.date({
    message: 'Укажите дату заезда'
  }),
  checkOut: z.date({
    message: 'Укажите дату выезда'
  }),
	guests: z.array(RoomSchema).min(1, 'Укажите количество гостей').nullable().refine((val) => val !== null, {
		message: 'Информация о гостях обязательна'
	}),
}).refine((data) => {
  if (data.checkIn && data.checkOut) {
    return data.checkOut > data.checkIn;
  }
  return true;
}, {
  message: 'Дата выезда должна быть позже даты заезда',
  path: ['checkOut']
});

// Схема для данных заказа
export const OrderDataSchema = z.object({
  // Данные бронирования
  location: z.string().min(1, 'Выберите базу отдыха'),
  checkIn: z.date(),
  checkOut: z.date(),
  guests: z.array(RoomSchema).min(1, 'Укажите количество гостей'),
  
  // Контактные данные
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа').max(50, 'Имя слишком длинное'),
  phone: z.string()
    .min(10, 'Телефон должен содержать минимум 10 цифр')
    .regex(/^[\d\s\+\-\(\)]+$/, 'Некорректный формат телефона'),
  email: z.string().email('Некорректный email адрес'),
  
  // Дополнительные поля
  comment: z.string().max(500, 'Комментарий слишком длинный').optional(),
  agreement: z.boolean().refine((val) => val === true, {
    message: 'Необходимо принять условия'
  })
});

export type SearchDataType = z.infer<typeof SearchDataSchema>;
export type OrderDataType = z.infer<typeof OrderDataSchema>;
