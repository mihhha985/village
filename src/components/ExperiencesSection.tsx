import { ExperienceCard, ExperienceCardProps } from "@/src/components/ExperianceCard";
import Title from "@/src/components/ui/Title";

const experiences: ExperienceCardProps[] = [
	{
		location: "prostor",
		title: "DeРевня Простор",
		description:
			"Современный дом с просторной террасой и бассейном. Идеально для семейного отдыха и встреч с друзьями.",
		features: ["Природа", "Бассейн", "Терраса", "Wi-Fi"],
		image: "/foto1.jpg",
		variant: "vertical" as const,
	},
	{
		location: "ozero",
		title: "DeРевня Озеро",
		description:
			"Коттедж у воды с сауной и панорамными окнами. Романтичный отдых для двоих в окружении природы.",
		features: ["Озеро", "Сауна", "Романтика", "Природа"],
		image: "/foto2.jpg",
		variant: "vertical" as const,
	},
	{
		location: "city",
		title: "DeРевня City",
		description:
			"Современный дом у города для комфортного отдыха. Все удобства цивилизации в окружении природы.",
		features: ["Город", "Комфорт", "Удобства", "Доступность"],
		image: "/foto3.jpg",
		variant: "vertical" as const,
	},
	{
		location: "longlife",
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
    <section id="about" className="type-section">
      <div className="container">
        <Title
					title="Неповторимый опыт в каждой поездке"
					subtitle="Выберите, какое место вам ближе — по расположению или по душе"
				/>

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
