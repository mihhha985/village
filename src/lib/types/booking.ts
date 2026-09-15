// Типы для системы бронирования

export interface Adult {
  count: number;
}

export interface Children {
  count: number;
  ages: number[]; // Возраста всех детей
}

export interface Room {
  id: string;
  index: number;
  adults: Adult;
  children: Children;
}

export interface SearchData {
  location: string;
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  guests: Room[] | null;
}

// Константы
export const BOOKING_LIMITS = {
  MAX_ROOMS: 5,
  MAX_ADULTS_PER_ROOM: 4,
  MAX_CHILDREN_PER_ROOM: 6,
  MIN_ADULTS_PER_ROOM: 1,
} as const;

export const LOCATIONS = {
  prostor: 'TheВилла. Простор',
  ozero: 'TheВилла. Озеро',
  city: 'TheВилла. City',
  longlife: 'TheВилла. Longlife',
} as const;

export type LocationKey = keyof typeof LOCATIONS;

// Типы для карты и локаций
export interface LocationCoordinates {
  lat: number;
  lng: number;
}

export interface LocationData {
  id: LocationKey;
  name: string;
  description: string;
  coordinates: LocationCoordinates;
  address: string;
  distance: string;
  price: string;
  image: string;
}

// Координаты локаций (Ленинградская область, северная часть, на расстоянии 50-100 км друг от друга)
export const LOCATION_COORDINATES: Record<LocationKey, LocationCoordinates> = {
  prostor: { lat: 60.7200, lng: 28.7500 }, // Выборгский район (у Выборга, ~130 км от СПб)
  ozero: { lat: 60.1500, lng: 29.9500 },   // Всеволожский район (Ладожское озеро, ~40 км от СПб)
  city: { lat: 59.8900, lng: 30.5200 },    // Всеволожск (близко к городу, ~20 км от СПб)
  longlife: { lat: 60.5500, lng: 29.7700 }, // Приозерский район (у Ладоги, ~100 км от СПб)
} as const;
