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