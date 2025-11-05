import Image from "next/image";
import { BookingSteps } from "./BookingStep";
import Title from "./ui/Title";

export function HowToBookSection() {
  return (
    <section className="section">
      <div className="container">
        <Title 
					title="Как забронировать?"
					subtitle="Мы продумали максимум для вашего удобства, в том числе процесс бронирования -- всего 3 простых шага!"
				/>
				<div className="relative w-full h-auto">
					<div className="absolute inset-0 bg-linear-to-bl from-background/40 to-transparent pointer-events-none"></div>
					<Image src="/how-to-book.jpg" alt="How to Book" width={1200} height={600} className="w-full h-auto rounded-lg shadow-lg"/>
				</div>

				<BookingSteps />
      </div>
    </section>
  );
}
