"use client";

import { LOCATIONS } from "@/src/lib/types/booking";
import { useOrderModal } from "@/src/store/modal";
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/lib/ui/avatar"
import { Button } from "@/src/lib/ui/button"
import { Card } from "@/src/lib/ui/card"
import Title from "@/src/components/ui/Title";

export function BookingSteps() {
  const locations = Object.entries(LOCATIONS);
  const showOrder = useOrderModal(state => state.show);

  return (
    <div className="mt-20">
      {/* Header */}
      <Title
				title="Как забронировать?"
				subtitle="Мы продумали максимум для вашего удобства, в том числе процесс бронирования -- всего 3 простых шага!"
			/>
      {/* Steps */}
      <div className="space-y-6">
        {/* Step 1 */}
        <Card>
          <div className="grid gap-8 p-8 lg:grid-cols-2 lg:gap-12 lg:p-12">
            {/* Left Content */}
            <div className="flex flex-col gap-6">
              <div className="shrink-0 flex gap-x-6 items-center">
                <div className="shrink-0 flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-full border border-white text-xl font-light">
                  1
                </div>
								 <h2 className="text-xl sm:text-2xl font-light lg:text-3xl">Выберите базу отдыха и желаемый дом</h2>
              </div>
              <div className="space-y-4">
                <p className="text-xs sm:text-sm leading-relaxed">
                  У каждой базы свой номерной фонд, рекомендуем посетить страницы
									Баз отдыха, чтобы определиться, в первую очередь, с локацией и там ознакомиться с каталогом домов!
                </p>
              </div>
            </div>

            {/* Right Content - Location List */}
            <div className="w-full flex flex-col gap-y-3">
              {locations.map(([key, location], index) => (
                <Button
                  asChild className="group justify-between py-6 w-full"
                  variant="link"
									key={index}
								>
                  <a href={`#${key}`} aria-label={location}><span className="ml-6 text-lg sm:text-xl font-light">{location}</span>
                  <ChevronRight className="mr-6 h-5 w-5 transition-transform group-hover:translate-x-1" /></a>
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Step 2 */}
        <Card>
          <div className="grid gap-8 p-8 lg:grid-cols-2 lg:gap-12 lg:p-12 overflow-hidden">
            {/* Left Content */}
            <div className="flex flex-col gap-6">
              <div className="shrink-0 flex gap-x-6 items-center">
                <div className="shrink-0 flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-full border border-white text-xl font-light">
                  2
                </div>
								<h2 className="flex-1 text-xl sm:text-2xl lg:text-3xl font-light">Перейдите на страницу бронирования</h2>
              </div>
              <div className="text-xs sm:text-sm space-y-4">
                <p>Вы можете  перейти к бронированию конкретного дома из страницы соответствующей базы
								или воспользоваться общим модулем поиска по всем базам отдыха.
								<br  />Дальше останется только следовать инструкции!</p>
              </div>
            </div>

            {/* Right Content - Calendar Preview */}
            <div className="w-full flex flex-col ">
              <Image
								src="/calendar.png"
								alt="Booking Calendar"
								width={600}
								height={400}
								sizes="(max-width: 640px) 100vw, 300px"
							/>

              {/* Link Below */}
              <Button
                onClick={showOrder} aria-label="Открыть бронирование" className="group w-full justify-between py-6 mt-5"
                variant="link"
							>
                <span className="ml-6 text-lg sm:text-xl font-light min-w-0 flex-1 truncate">К общей странице бронирования</span>
                <ChevronRight className="mr-6 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Step 3 */}
        <Card>
          <div className="grid gap-8 p-4 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-12">
            {/* Left Content */}
            <div className="flex flex-col gap-6">
              <div className="shrink-0 flex gap-x-6 items-center">
                <div className="shrink-0 flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-full border border-white text-xl font-light">
                  3
                </div>
								<h2 className="flex-1 text-xl sm:text-2xl lg:text-3xl font-light">Подготовьтесь перед приездом</h2>
              </div>
              <div className="space-y-3 text-xs sm:text-sm leading-relaxed">
                <p>
                  Соберите все необходимое и не забудьте воспользоваться консьерж-сервисом, который позволит вам
                  заселиться в автоматическом режиме!
                </p>
                <p>
                  Вся информация будет у вас на почте, а если что-то пойдет не так, наша служба заботы всегда на
                  связи!
                </p>
              </div>
            </div>

            {/* Right Content - Support Card */}
                <div className="w-full rounded-2xl bg-background p-3 sm:p-6 overflow-hidden">
									<div className="w-full flex gap-1 sm:gap-5">
										<div className="mb-6 space-y-2">
										 	<h3 className="text-2xl font-light">Служба заботы</h3>
                    	<p className="text-sm">Среднее время ответа: 20 минут</p>
                    	<p className="text-sm">Рабочие часы: с 10:00 до 22:00 по МСК, без перерывов и выходных</p>
                  	</div>

                  	{/* Avatar with online status */}
										<div className="mb-6 h-fit flex justify-center">
											<div className="relative">
												<Avatar className="h-16 sm:h-20 w-16 sm:w-20 border-2 border-white">
													<AvatarImage src="/call.jpg" alt="Support" />
													<AvatarFallback className="bg-linear-to-br from-primary to-secondary">
														СЗ
													</AvatarFallback>
												</Avatar>
												<div className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-[#1a1a1a] bg-green-500"></div>
											</div>
										</div>
									</div>

                  {/* Contact Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild variant="ghost" className="border border-white text-lg font-light leading-none"><a href="tel:+79137777777" aria-label="Позвонить в службу заботы">+7 (913) 777-77-77</a></Button>
										<div className="flex items-center justify-end gap-3">
											<Button disabled aria-label="Telegram — ссылка пока не настроена" variant="ghost" size="icon" className="border border-white text-lg font-light leading-none"><FaTelegramPlane className="h-5 w-5" /></Button>
											<Button disabled aria-label="WhatsApp — ссылка пока не настроена" variant="ghost" size="icon" className="border border-white text-lg font-light leading-none"><FaWhatsapp className="h-5 w-5" /></Button>
										</div>
                  </div>
                </div>
          </div>
				</Card>
			</div>
		</div>
  )
}
