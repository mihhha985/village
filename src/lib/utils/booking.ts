import { Room, GuestSelection, BOOKING_LIMITS, BookingData, CustomerInfo } from '@/src/lib/types/booking';

/**
 * Утилиты для работы с бронированием
 */
export class BookingUtils {
  /**
   * Создает новую комнату с уникальным ID
   */
  static createNewRoom(index: number): Room {
    return {
      id: `room-${Date.now()}-${index}`,
      index,
      adults: { count: 1 }, // Минимум 1 взрослый
      children: { count: 0, ages: [] }
    };
  }

  /**
   * Подсчитывает общее количество гостей
   */
  static calculateTotalGuests(guestSelection: GuestSelection): {
    totalAdults: number;
    totalChildren: number;
    totalGuests: number;
  } {
    const totalAdults = guestSelection.rooms.reduce((sum, room) => sum + room.adults.count, 0);
    const totalChildren = guestSelection.rooms.reduce((sum, room) => sum + room.children.count, 0);
    
    return {
      totalAdults,
      totalChildren,
      totalGuests: totalAdults + totalChildren
    };
  }

  /**
   * Форматирует информацию о гостях для отображения
   */
  static formatGuestSummary(guestSelection: GuestSelection): string {
    const { totalAdults, totalChildren } = this.calculateTotalGuests(guestSelection);
    const roomCount = guestSelection.rooms.length;
    
    const adultsText = this.pluralize(totalAdults, 'взрослый', 'взрослых', 'взрослых');
    const childrenText = totalChildren > 0 
      ? ` - ${this.pluralize(totalChildren, 'ребенок', 'ребенка', 'детей')}`
      : ' - 0 детей';
    const roomsText = ` - ${this.pluralize(roomCount, 'номер', 'номера', 'номеров')}`;
    
    return `${totalAdults} ${adultsText}${childrenText}${roomsText}`;
  }

  /**
   * Валидирует данные бронирования
   */
  static validateBookingData(data: Partial<BookingData>): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Проверка локации
    if (!data.location) {
      errors.push('Не выбрана база отдыха');
    }

    // Проверка дат
    if (!data.checkIn) {
      errors.push('Не указана дата заезда');
    }
    if (!data.checkOut) {
      errors.push('Не указана дата выезда');
    }
    if (data.checkIn && data.checkOut && data.checkIn >= data.checkOut) {
      errors.push('Дата выезда должна быть позже даты заезда');
    }

    // Проверка гостей
    if (!data.guestSelection?.rooms?.length) {
      errors.push('Не указано количество гостей');
    } else {
      const { totalAdults } = this.calculateTotalGuests(data.guestSelection);
      if (totalAdults === 0) {
        errors.push('Должен быть минимум 1 взрослый');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Проверяет возможность добавления комнаты
   */
  static canAddRoom(currentRoomCount: number): { canAdd: boolean; reason?: string } {
    if (currentRoomCount >= BOOKING_LIMITS.MAX_ROOMS) {
      return {
        canAdd: false,
        reason: `Максимальное количество номеров: ${BOOKING_LIMITS.MAX_ROOMS}`
      };
    }
    return { canAdd: true };
  }

  /**
   * Проверяет возможность добавления взрослого в комнату
   */
  static canAddAdult(currentCount: number): { canAdd: boolean; reason?: string } {
    if (currentCount >= BOOKING_LIMITS.MAX_ADULTS_PER_ROOM) {
      return {
        canAdd: false,
        reason: `Максимум взрослых в номере: ${BOOKING_LIMITS.MAX_ADULTS_PER_ROOM}`
      };
    }
    return { canAdd: true };
  }

  /**
   * Проверяет возможность добавления ребенка в комнату
   */
  static canAddChild(currentCount: number): { canAdd: boolean; reason?: string } {
    if (currentCount >= BOOKING_LIMITS.MAX_CHILDREN_PER_ROOM) {
      return {
        canAdd: false,
        reason: `Максимум детей в номере: ${BOOKING_LIMITS.MAX_CHILDREN_PER_ROOM}`
      };
    }
    return { canAdd: true };
  }

  /**
   * Проверяет возможность удаления взрослого из комнаты
   */
  static canRemoveAdult(currentCount: number): { canRemove: boolean; reason?: string } {
    if (currentCount <= BOOKING_LIMITS.MIN_ADULTS_PER_ROOM) {
      return {
        canRemove: false,
        reason: `Минимум взрослых в номере: ${BOOKING_LIMITS.MIN_ADULTS_PER_ROOM}`
      };
    }
    return { canRemove: true };
  }

  /**
   * Генерирует подробную информацию о бронировании для логов
   */
  static generateBookingReport(bookingData: Partial<BookingData & { customerInfo?: CustomerInfo }>): string {
    const report = [
      '=== ОТЧЕТ О БРОНИРОВАНИИ ===',
      `Дата создания: ${new Date().toLocaleString('ru-RU')}`,
      `Локация: ${bookingData.location || 'Не указано'}`,
      `Заезд: ${bookingData.checkIn ? bookingData.checkIn.toLocaleDateString('ru-RU') : 'Не указано'}`,
      `Выезд: ${bookingData.checkOut ? bookingData.checkOut.toLocaleDateString('ru-RU') : 'Не указано'}`,
      ''
    ];

    if (bookingData.guestSelection?.rooms) {
      report.push('--- ИНФОРМАЦИЯ О ГОСТЯХ ---');
      const { totalAdults, totalChildren, totalGuests } = this.calculateTotalGuests(bookingData.guestSelection);
      report.push(`Всего гостей: ${totalGuests} (${totalAdults} взрослых, ${totalChildren} детей)`);
      report.push(`Количество номеров: ${bookingData.guestSelection.rooms.length}`);
      report.push('');

      bookingData.guestSelection.rooms.forEach((room: Room, index: number) => {
        report.push(`Номер ${index + 1}:`);
        report.push(`  Взрослые: ${room.adults.count}`);
        report.push(`  Дети: ${room.children.count} ${room.children.ages.length > 0 ? `(возраст: ${room.children.ages.join(', ')})` : ''}`);
        report.push('');
      });
    }

    if (bookingData.customerInfo) {
      report.push('--- КОНТАКТНАЯ ИНФОРМАЦИЯ ---');
      report.push(`Имя: ${bookingData.customerInfo.name || 'Не указано'}`);
      report.push(`Email: ${bookingData.customerInfo.email || 'Не указано'}`);
      report.push(`Телефон: ${bookingData.customerInfo.phone || 'Не указано'}`);
      report.push('');
    }

    report.push('=============================');
    
    return report.join('\n');
  }

  /**
   * Утилита для склонения слов
   */
  private static pluralize(count: number, one: string, two: string, five: string): string {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return five;
    }

    switch (lastDigit) {
      case 1:
        return one;
      case 2:
      case 3:
      case 4:
        return two;
      default:
        return five;
    }
  }
}