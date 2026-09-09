import { LOCATIONS, type LocationKey } from "@/src/lib/types/booking";

export type LocationPhoto = { src: string; alt: string };
type LocationPageData = {
  name: string;
  tagline: string;
  introduction: string;
  paragraphs: string[];
  ideas: string[];
  photos: LocationPhoto[];
  hasLocationPhotos?: boolean;
};

const prostorPhotos: LocationPhoto[] = [
  "Frame 1 1948756678.jpg",
  "Frame 1 1948756698.jpg",
  "Frame 11 948756702.jpg",
  "Frame 1948756678.jpg",
  "Frame 1948756695.jpg",
  "Frame 1948756697.jpg",
  "Frame 1948756698.jpg",
  "Frame 1948756699.jpg",
  "Frame 1948756701.jpg",
  "Frame 1948756702.jpg",
  "Frame 1948756703.jpg",
  "Frame 1948756705.jpg",
  "Frame 1948756706.jpg",
  "Frame 1948756708.jpg",
].map((fileName, index) => ({
  src: `/prostor/${encodeURIComponent(fileName)}`,
  alt: `Локация Простор — фотография ${index + 1}`,
}));

const ozeroPhotos: LocationPhoto[] = [
  "Готовы на все 100%.jpg",
  "Frame 1 1948756710.jpg",
  "Frame 11948756709.jpg",
  "Frame 1948756697.jpg",
  "Frame 1948756707.jpg",
  "Frame 1948756709.jpg",
  "Frame 1948756710.jpg",
  "Frame 1948756711.jpg",
  "Frame 1948756712.jpg",
  "Frame 1948756713.jpg",
  "Frame 1948756718.jpg",
  "Frame1  1948756712.jpg",
  "Frame1 1948756803.jpg",
].map((fileName, index) => ({
  src: `/ozero/${encodeURIComponent(fileName)}`,
  alt: `Локация Озеро — фотография ${index + 1}`,
}));

const cityPhotos: LocationPhoto[] = [
  "Готовы на все 100%.jpg",
  "Frame 1948756697.jpg",
  "Frame 1948756699.jpg",
  "Frame 1948756707.jpg",
  "Frame 1948756710.jpg",
  "Frame 1948756711.jpg",
  "Frame 1948756712.jpg",
  "Frame 1948756713.jpg",
  "Frame 1948756714.jpg",
  "Frame 1948756715.png",
  "Frame 1948756718.jpg",
  "Frame 1948756798.jpg",
].map((fileName, index) => ({
  src: `/city/${encodeURIComponent(fileName)}`,
  alt: `Локация City — фотография ${index + 1}`,
}));

const longlifePhotos: LocationPhoto[] = [
  "Frame 1948756697.jpg",
  "Frame 1948756699.jpg",
  "Frame 1948756706.jpg",
  "Frame 1948756707.jpg",
  "Frame 1948756709.jpg",
  "Frame 1948756710.jpg",
  "Frame 1948756711.jpg",
  "Frame 1948756712.jpg",
  "Frame 1948756714.jpg",
  "Frame 1948756719.jpg",
  "Frame 1948756720.jpg",
  "Frame 1948756803.jpg",
  "Frame 1948756805.jpg",
  "Frame 1948756810.jpg",
  "Frame 1948756811.jpg",
  "Frame 1948756812.jpg",
].map((fileName, index) => ({
  src: `/longlife/${encodeURIComponent(fileName)}`,
  alt: `Локация Longlife — фотография ${index + 1}`,
}));

export const LOCATION_PAGES: Record<LocationKey, LocationPageData> = {
  prostor: {
    name: LOCATIONS.prostor,
    tagline: "Больше пространства для близких",
    introduction: "Загородный отдых с широким горизонтом и временем друг для друга. Простор — для тех, кто хочет сменить городской ритм на неспешные дни на природе.",
    paragraphs: [
      "В основе этой локации — идея семейного отдыха вдали от городской суеты. Собраться за одним столом, выйти на прогулку без спешки, провести вечер за разговором: здесь поездку хочется посвятить простым радостям.",
      "Выбирайте Простор для выходных с близкими или небольшой паузы среди недели. Оставьте в расписании место для прогулок и общих планов, а подходящий дом и условия размещения уточните при бронировании.",
    ],
    ideas: ["Выходные всей семьёй", "Прогулки без спешки", "Вечера в кругу близких"],
    photos: prostorPhotos,
    hasLocationPhotos: true,
  },
  ozero: {
    name: LOCATIONS.ozero,
    tagline: "Время замедлиться у воды",
    introduction: "Локация для тех, кому ближе отдых у озера: свежий воздух, прогулки и спокойные дни вдали от привычных маршрутов.",
    paragraphs: [
      "Озеро — повод ненадолго освободить день от обязательных дел. Провести утро вместе, отправиться на прогулку и просто побыть рядом с природой — такой отдых не требует насыщенной программы.",
      "Сюда можно запланировать поездку вдвоём или семейные выходные. Если хотите дополнить отдых рыбалкой, баней или водными развлечениями, уточните их доступность и сезонные условия перед поездкой.",
    ],
    ideas: ["Поездка вдвоём", "Отдых у воды", "Неспешные семейные выходные"],
    photos: ozeroPhotos,
    hasLocationPhotos: true,
  },
  city: {
    name: LOCATIONS.city,
    tagline: "Сменить обстановку, остаться рядом",
    introduction: "Загородный формат для тех, кто хочет оставаться ближе к Санкт-Петербургу. Короткая пауза, которую легче вписать в привычный ритм.",
    paragraphs: [
      "City объединяет идею отдыха за городом с близостью к городской жизни. Этот формат подойдёт, когда хочется выбраться из повседневности, но не планировать большое путешествие.",
      "Посвятите свободные дни прогулкам, общению и отдыху в доме. Перед поездкой уточните расположение выбранного варианта и удобный маршрут, чтобы спланировать время в дороге.",
    ],
    ideas: ["Короткая поездка", "Спонтанные выходные", "Отдых рядом с городом"],
    photos: cityPhotos,
    hasLocationPhotos: true,
  },
  longlife: {
    name: LOCATIONS.longlife,
    tagline: "Остаться подольше. Жить спокойнее",
    introduction: "Локация для продолжительного отдыха за городом. Дайте себе время привыкнуть к новому ритму и сделать природу частью повседневной жизни.",
    paragraphs: [
      "Longlife — выбор для тех, кому мало одних выходных. В длительной поездке появляется время для собственных привычек: неспешных завтраков, прогулок и спокойных вечеров.",
      "Расскажите при бронировании, на какой срок вы планируете остаться и что важно для комфортного проживания. Оснащение дома, условия длительной аренды и доступность дополнительных услуг уточняются для выбранных дат.",
    ],
    ideas: ["Продолжительный отдых", "Свои ежедневные ритуалы", "Жизнь ближе к природе"],
    photos: longlifePhotos,
    hasLocationPhotos: true,
  },
};
