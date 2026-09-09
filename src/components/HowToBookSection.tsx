import Image from "next/image";
import { BookingSteps } from "./BookingStep";
import Title from "@/src/components/ui/Title";

export function HowToBookSection() {
  return (
    <section className="type-section">
      <div className="container">
        <Title 
					variant="lg"
					title="Свобода выбирать и быть собой"
					subtitle="Мы не ограничились созданием одной базы отдыха, а создали целых четыре: чтобы у вас всегда была возможность найти своё «место силы» и привнести разнообразие в повседневность!"
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
