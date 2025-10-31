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

export interface GuestSelection {
  rooms: Room[];
  totalAdults: number;
  totalChildren: number;
}

export interface BookingData {
  location: string;
  checkIn: Date | null;
  checkOut: Date | null;
  guestSelection: GuestSelection;
}

export interface BookingRequest extends BookingData {
  customerInfo: CustomerInfo;
  specialRequests?: string;
  totalPrice?: number;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

// Константы
export const BOOKING_LIMITS = {
  MAX_ROOMS: 5,
  MAX_ADULTS_PER_ROOM: 4,
  MAX_CHILDREN_PER_ROOM: 6,
  MIN_ADULTS_PER_ROOM: 1,
} as const;

export const LOCATIONS = {
  prostor: 'Деревня. Простор',
  ozero: 'Деревня. Озеро', 
  city: 'Деревня. City',
  longlife: 'Деревня. Longlife',
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

// Координаты локаций (примерные координаты в Московской области)
export const LOCATION_COORDINATES: Record<LocationKey, LocationCoordinates> = {
  prostor: { lat: 55.7558, lng: 37.6173 }, // Москва центр
  ozero: { lat: 55.9116, lng: 37.7307 },   // Север Москвы
  city: { lat: 55.6847, lng: 37.6086 },    // Юг Москвы
  longlife: { lat: 55.7522, lng: 37.8156 }, // Восток Москвы
} as const;
