"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/src/lib/ui/button"
import { Input } from "@/src/lib/ui/input"
import { Card } from "@/src/lib/ui/card"
import { Calendar } from "@/src/lib/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/src/lib/ui/form"
import { IoLogoVk } from "react-icons/io5";
import { Instagram } from "lucide-react"
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import Title from "./ui/Title"

type FormData = {
  name: string
  phone: string
  email: string
}

export function ContactSection() {
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 8, 11))

  const form = useForm<FormData>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <section className="section">
      <div className="container">
        {/* Main booking section */}
        <div className="mb-20">
					<Title 
						title="Бронирование в одно касание" 
						subtitle="Выберите удобные даты и заполните форму заявки. Мы вам перезвоним!" 
					/>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Calendar Section */}
            <Card className="border-none p-6 w-1/3">
							<Calendar
								mode="single"
								selected={date}
								onSelect={setDate}
								formatters={{
									formatCaption: (date) => {
										const months = [
											"Январь",
											"Февраль", 
											"Март",
											"Апрель",
											"Май",
											"Июнь",
											"Июль",
											"Август",
											"Сентябрь",
											"Октябрь",
											"Ноябрь",
											"Декабрь",
										]
										return `${months[date.getMonth()]} ${date.getFullYear()}`
									},
									formatWeekdayName: (date) => {
										return ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"][date.getDay()]
									},
								}}
							/>
						</Card>

            {/* Form Section */}
            <Card className="p-6 border-none flex-1">
              <h2 className="text-2xl lg:text-3xl font-light mb-8">
                Поможем с выбором и предложим эксклюзивные условия
              </h2>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base text-foreground">Имя</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Иван Сергеев"
														className="border-none bg-background rounded-[30px] p-4"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base text-foreground">Номер телефона</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+ 7 (990) 999-99-99"
														className="border-none bg-background rounded-[30px] p-4"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base text-foreground">Почта</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="ivan@mail.com"
														className="border-none bg-background rounded-[25px] p-4"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full p-6 mt-6">
                    Отправить
                  </Button>

                  <p className="text-xs leading-relaxed">
                    Отправляя заявку, вы соглашаетесь с обработкой персональных данных. Мы используем ваши контакты
                    только для связи и оформления бронирования.
                  </p>
                </form>
              </Form>
            </Card>
          </div>
        </div>

        {/* Contact section */}
        <div>
          <h2 className="text-3xl lg:text-4xl font-light mb-6">Связаться с нами</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none p-6 text-lg">
              <h3>Телефон</h3>
              <p className="text-muted-foreground">+7 (999) 123-45-67</p>
            </Card>

            <Card className="border-none p-6 text-lg">
              <h3>Почта</h3>
              <p className="text-muted-foreground">hello@derevnya.ru</p>
            </Card>

            <Card className="border-none p-6">
              <h3 className="text-xl">Мессенджеры и соц. сети</h3>
              <div className="flex gap-3">
								<Button variant="ghost" size="icon" className="border border-white text-lg font-light leading-none">
									<FaTelegramPlane className="h-5 w-5" />
								</Button>
								<Button variant="ghost" size="icon" className="border border-white text-lg font-light leading-none">
									<FaWhatsapp className="h-5 w-5" />
								</Button>
                <Button variant={"ghost"} size={"icon-lg"} className="border border-white">
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button variant={"ghost"} size={"icon-lg"} className="border border-white">
                  <IoLogoVk className="w-5 h-5" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
