# 🗺️ Интеграция Яндекс.Карт — Документация

## 📋 Обзор

Реализована интерактивная карта с отображением локаций баз отдыха DeРевня с использованием:
- **Yandex Maps JavaScript API 3.0**
- **shadcn/ui Accordion** для списка локаций
- **React State** для синхронизации карты и аккордеона

---

## 🛠️ Компоненты

### 1. **YandexMap** (`/src/components/YandexMap.tsx`)

Компонент отображения Яндекс.Карты с маркерами.

**Props:**
```typescript
interface YandexMapProps {
  center: LocationCoordinates;        // Центр карты
  zoom?: number;                       // Уровень зума (по умолчанию 10)
  markers?: Array<{                    // Массив маркеров
    id: string;
    coordinates: LocationCoordinates;
    title: string;
    isActive?: boolean;                // Активный маркер
  }>;
}
```

**Особенности:**
- Автоматическая загрузка Yandex Maps API
- Динамическое обновление маркеров
- Плавное центрирование на активном маркере
- Responsive дизайн
- Loading состояние
- Cleanup при размонтировании

**Стилизация маркеров:**
- Активный: большой маркер с тултипом
- Неактивный: маленький маркер без тултипа
- Hover эффект: увеличение на 110%

---

### 2. **LocationsSection** (`/src/components/LocationsSection.tsx`)

Секция с картой и списком локаций через Accordion.

**Функциональность:**
- Accordion из shadcn/ui для списка локаций
- Синхронизация выбранной локации с маркером на карте
- Автоматическое центрирование карты при выборе локации
- Responsive layout (grid 2 колонки на desktop)

**Данные локаций:**
```typescript
const MOCK_LOCATIONS: LocationData[] = [
  {
    id: "prostor",
    name: "Деревня. Простор",
    coordinates: { lat: 55.7558, lng: 37.6173 },
    address: "Московская область, Одинцовский район",
    distance: "35 км от МКАД",
    price: "от 15 000 ₽/сутки",
    // ...
  },
  // ...
];
```

---

## 📁 Типы

### `/src/lib/types/booking.ts`

Добавлены новые типы для карты:

```typescript
// Координаты точки на карте
export interface LocationCoordinates {
  lat: number;  // Широта
  lng: number;  // Долгота
}

// Полные данные локации
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

// Координаты всех локаций
export const LOCATION_COORDINATES: Record<LocationKey, LocationCoordinates> = {
  prostor: { lat: 55.7558, lng: 37.6173 },
  ozero: { lat: 55.9116, lng: 37.7307 },
  city: { lat: 55.6847, lng: 37.6086 },
  longlife: { lat: 55.7522, lng: 37.8156 },
};
```

---

## ⚙️ Настройка

### 1. Установка зависимостей

```bash
npm install @yandex/ymaps3-types
npx shadcn@latest add accordion
```

### 2. Получение API ключа

1. Перейдите на https://developer.tech.yandex.ru/
2. Зарегистрируйтесь или войдите
3. Создайте JavaScript API ключ для Яндекс.Карт 3.0
4. Скопируйте ключ

### 3. Настройка переменных окружения

Создайте файл `.env.local`:

```env
NEXT_PUBLIC_YANDEX_MAPS_API_KEY=ваш_ключ_здесь
```

**Важно:** Префикс `NEXT_PUBLIC_` обязателен для доступа к переменной в браузере!

---

## 🎨 Стилизация

### Маркеры на карте

Стили определяются inline в компоненте:

```tsx
// Активный маркер
className="w-8 h-8 bg-primary rounded-full border-4 border-background shadow-lg"

// Неактивный маркер  
className="w-6 h-6 bg-card border-2 border-primary rounded-full shadow-md"

// Тултип активного маркера
className="absolute -top-12 left-1/2 -translate-x-1/2 bg-background border border-border rounded-lg px-3 py-1.5 shadow-lg"
```

### Accordion Items

```tsx
// Контейнер
className="border border-border rounded-2xl overflow-hidden bg-card hover:border-primary transition-colors"

// Иконка локации
className={`
  w-10 h-10 rounded-full flex items-center justify-center
  ${isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
`}
```

---

## 🔄 Взаимодействие

### Синхронизация карты и аккордеона

```typescript
// State для активной локации
const [activeLocation, setActiveLocation] = useState<LocationKey>("prostor");

// Accordion изменяет state
<Accordion 
  value={activeLocation}
  onValueChange={(value) => value && setActiveLocation(value as LocationKey)}
/>

// State обновляет маркеры на карте
const mapMarkers = MOCK_LOCATIONS.map(location => ({
  id: location.id,
  coordinates: location.coordinates,
  title: location.name,
  isActive: location.id === activeLocation  // ← синхронизация
}));
```

### Автоматическое центрирование

При изменении `activeLocation`:
1. Маркеры обновляются через `useEffect`
2. Карта центрируется на активном маркере
3. Зум увеличивается до 12
4. Анимация перехода 500ms

```typescript
if (activeMarker) {
  mapInstanceRef.current.setLocation({
    center: [activeMarker.coordinates.lng, activeMarker.coordinates.lat],
    zoom: 12,
    duration: 500,
  });
}
```

---

## 🐛 Обработка ошибок

### Loading состояние

```tsx
{!isLoaded && (
  <div className="absolute inset-0 flex items-center justify-center bg-muted">
    <div className="animate-spin ..."></div>
    <p>Загрузка карты...</p>
  </div>
)}
```

### Error handling

```typescript
script.onerror = () => {
  console.error("Ошибка загрузки Яндекс.Карт");
};

// В async функциях
try {
  await initMap();
} catch (error) {
  console.error("Ошибка инициализации карты:", error);
}
```

---

## 🚀 Использование

### В странице

```tsx
import { LocationsSection } from "@/src/components/LocationsSection";

export default function Home() {
  return (
    <main>
      <LocationsSection />
    </main>
  );
}
```

### Кастомизация координат

Измените координаты в `/src/lib/types/booking.ts`:

```typescript
export const LOCATION_COORDINATES: Record<LocationKey, LocationCoordinates> = {
  prostor: { lat: 55.7558, lng: 37.6173 },  // ← ваши координаты
  // ...
};
```

---

## 📱 Responsive поведение

- **Desktop (lg+)**: Карта слева, аккордеон справа (grid 2 колонки)
- **Mobile**: Аккордеон сверху, карта снизу (stack layout)
- Минимальная высота карты: `400px` на mobile, `600px` на desktop

---

## ⚡ Производительность

### Оптимизации:

1. **Одна загрузка скрипта**: проверка `scriptLoadedRef`
2. **Debounced updates**: маркеры обновляются только при изменении `activeLocation`
3. **Cleanup**: удаление карты при размонтировании
4. **Lazy rendering**: карта создается только после загрузки API

---

## 🔒 Безопасность

### API ключ

- Используйте **ограничения по домену** в настройках ключа
- Не коммитьте `.env.local` в Git (уже в `.gitignore`)
- Для production настройте переменные в Vercel/Netlify

---

## 📝 TODO

- [ ] Добавить кастомные иконки маркеров (SVG)
- [ ] Реализовать кластеризацию для большого кол-ва точек
- [ ] Добавить геолокацию пользователя
- [ ] Интегрировать построение маршрута
- [ ] Добавить фильтры локаций
- [ ] Сохранять выбранную локацию в localStorage

---

**Дата создания:** 30 октября 2025  
**Версия:** 1.0  
**Автор:** DeРевня Development Team
