import { useState, useCallback } from 'react';
import { BookingData, GuestSelection, CustomerInfo } from '@/src/lib/types/booking';
import { BookingUtils } from '@/src/lib/utils/booking';

interface UseBookingReturn {
  // Данные
  bookingData: BookingData;
  customerInfo: CustomerInfo;
  errors: string[];
  
  // Действия
  updateLocation: (location: string) => void;
  updateCheckIn: (date: Date | null) => void;
  updateCheckOut: (date: Date | null) => void;
  updateGuestSelection: (guestSelection: GuestSelection) => void;
  updateCustomerInfo: (field: keyof CustomerInfo, value: string) => void;
  
  // Валидация и отправка
  validateBooking: () => boolean;
  validateCustomer: () => boolean;
  submitBooking: () => BookingData & { customerInfo: CustomerInfo };
  
  // Сброс
  resetBooking: () => void;
  clearErrors: () => void;
}

/**
 * Хук для управления состоянием бронирования
 */
export function useBooking(): UseBookingReturn {
  const [bookingData, setBookingData] = useState<BookingData>({
    location: "",
    checkIn: null,
    checkOut: null,
    guestSelection: {
      rooms: [BookingUtils.createNewRoom(1)],
      totalAdults: 1,
      totalChildren: 0
    }
  });

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    email: "",
    phone: ""
  });

  const [errors, setErrors] = useState<string[]>([]);

  // Обновление локации
  const updateLocation = useCallback((location: string) => {
    setBookingData(prev => ({ ...prev, location }));
    setErrors([]);
  }, []);

  // Обновление даты заезда
  const updateCheckIn = useCallback((checkIn: Date | null) => {
    setBookingData(prev => ({ ...prev, checkIn }));
    setErrors([]);
  }, []);

  // Обновление даты выезда
  const updateCheckOut = useCallback((checkOut: Date | null) => {
    setBookingData(prev => ({ ...prev, checkOut }));
    setErrors([]);
  }, []);

  // Обновление выбора гостей
  const updateGuestSelection = useCallback((guestSelection: GuestSelection) => {
    setBookingData(prev => ({ ...prev, guestSelection }));
    setErrors([]);
  }, []);

  // Обновление информации о клиенте
  const updateCustomerInfo = useCallback((field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
    setErrors([]);
  }, []);

  // Валидация данных бронирования
  const validateBooking = useCallback((): boolean => {
    const validation = BookingUtils.validateBookingData(bookingData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return false;
    }
    return true;
  }, [bookingData]);

  // Валидация данных клиента
  const validateCustomer = useCallback((): boolean => {
    const customerErrors: string[] = [];

    if (!customerInfo.name.trim()) {
      customerErrors.push('Не указано имя');
    }
    if (!customerInfo.phone.trim()) {
      customerErrors.push('Не указан телефон');
    }
    if (!customerInfo.email.trim()) {
      customerErrors.push('Не указан email');
    } else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
      customerErrors.push('Неверный формат email');
    }

    if (customerErrors.length > 0) {
      setErrors(prev => [...prev, ...customerErrors]);
      return false;
    }
    return true;
  }, [customerInfo]);

  // Отправка бронирования
  const submitBooking = useCallback(() => {
    const bookingValid = validateBooking();
    const customerValid = validateCustomer();
    
    if (!bookingValid || !customerValid) {
      throw new Error('Данные не валидны');
    }

    const fullBookingRequest = {
      ...bookingData,
      customerInfo
    };

    // Логируем данные
    console.log('=== ЗАЯВКА НА БРОНИРОВАНИЕ ===');
    console.log(BookingUtils.generateBookingReport(fullBookingRequest));

    return fullBookingRequest;
  }, [bookingData, customerInfo, validateBooking, validateCustomer]);

  // Сброс всех данных
  const resetBooking = useCallback(() => {
    setBookingData({
      location: "",
      checkIn: null,
      checkOut: null,
      guestSelection: {
        rooms: [BookingUtils.createNewRoom(1)],
        totalAdults: 1,
        totalChildren: 0
      }
    });
    setCustomerInfo({
      name: "",
      email: "",
      phone: ""
    });
    setErrors([]);
  }, []);

  // Очистка ошибок
  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  return {
    // Данные
    bookingData,
    customerInfo,
    errors,
    
    // Действия
    updateLocation,
    updateCheckIn,
    updateCheckOut,
    updateGuestSelection,
    updateCustomerInfo,
    
    // Валидация и отправка
    validateBooking,
    validateCustomer,
    submitBooking,
    
    // Сброс
    resetBooking,
    clearErrors
  };
}