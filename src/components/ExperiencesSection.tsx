import { ExperienceCard, ExperienceCardProps } from "./ExperianceCard";

const experiences: ExperienceCardProps[] = [
	{
		title: "DeРевня Простор",
		description:
			"Современный дом с просторной террасой и бассейном. Идеально для семейного отдыха и встреч с друзьями.",
		features: ["Природа", "Бассейн", "Терраса", "Wi-Fi"],
		image: "/foto1.jpg",
		variant: "vertical" as const,
	},
	{
		title: "DeРевня Озеро",
		description:
			"Коттедж у воды с сауной и панорамными окнами. Романтичный отдых для двоих в окружении природы.",
		features: ["Озеро", "Сауна", "Романтика", "Природа"],
		image: "/foto2.jpg",
		variant: "vertical" as const,
	},
	{
		title: "DeРевня City",
		description:
			"Современный дом у города для комфортного отдыха. Все удобства цивилизации в окружении природы.",
		features: ["Город", "Комфорт", "Удобства", "Доступность"],
		image: "/foto3.jpg",
		variant: "vertical" as const,
	},
	{
		title: "DеРевня. Longlife",
		description:
			"Четыре приватных дома для долгосрочного проживания — выбор для тех, кто ценит уединение и стабильный комфорт.",
		features: ["Город", "Комфорт", "Удобства", "Доступность", "Wi-Fi"],
		image: "/foto4.jpg",
		variant: "horizontal" as const,
	},
];

export function ExperiencesSection() {
  return (
    <section className="section bg-background">
      <div className="container">
        <div className="flex flex-col lg:flex-row justify-between mb-8 gap-y-4">
          <h2 className="text-4xl xl:text-5xl w-full lg:w-[40%] leading-tight">
            Неповторимый опыт в каждой поездке
          </h2>
					<p className="self-end w-full lg:w-[25%]">Выберите, какое место вам ближе — по расположению или по душе</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={index}
              {...experience}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
