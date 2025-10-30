import { ExperienceCard, ExperienceCardProps } from "./ExperianceCard";

export function ExperiencesSection({experiences}: {experiences: ExperienceCardProps[]}) {
  return (
    <section className="py-24 bg-background">
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
