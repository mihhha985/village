"use client"
import { RevealSection } from "@/src/components/RevealSection";

import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/src/lib/ui/button"
import { Input } from "@/src/lib/ui/input"
import { Card } from "@/src/lib/ui/card"
import { Calendar } from "@/src/components/ui/CustomCalendar"
import { Spinner } from "@/src/lib/ui/spinner"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/lib/ui/form"
import Title from "@/src/components/ui/Title"
import { toast } from "sonner"
import * as z from "zod"

import { startOfDay } from "date-fns";
import { ru } from "date-fns/locale";
import { ContactDataSchema, ContactRequestSchema } from "@/src/lib/validations/booking";
import { submitRequest } from "@/src/lib/utils/submit-request";
import { SocialLinks } from "@/src/components/SocialLinks";

const contactFormSchema = ContactDataSchema;

type FormData = z.infer<typeof contactFormSchema>

export function ContactSection() {
  const submitting = useRef(false);
  const [date, setDate] = useState<Date | undefined>(undefined)
	const [pending, setPending] = useState<boolean>(false)

  const form = useForm<FormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  })

  const onSubmit = async(data: FormData) => {

		if (!date) {
			toast.error("Пожалуйста, выберите дату заезда в календаре")
			return
		}

    if (submitting.current) return;
    const result = ContactRequestSchema.safeParse({ ...data, date });
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    submitting.current = true;
    setPending(true);
    try {
      await submitRequest(result.data);
      toast.success("Заявка успешно отправлена!");
      setDate(undefined);
      form.reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Не удалось отправить заявку");
    } finally {
      submitting.current = false;
      setPending(false);
    }
  }

  return (
    <RevealSection id="contacts" className="type-section">
      <div className="container">
        {/* Main booking section */}
        <div data-reveal-group className="mb-20">
					<Title
						title="Бронирование в одно касание"
						subtitle="Выберите удобные даты и заполните форму заявки. Мы вам перезвоним!"
					/>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Calendar Section */}
            <Card className="border-none p-0 sm:p-6 w-full lg:w-[45%] xl:w-1/3 ">
							<Calendar
								className="responsive-scale"
								mode="single"
                locale={ru}
                disabled={{ before: startOfDay(new Date()) }}
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
            <Card className="p-4 sm:p-6 border-none flex-1">
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
                        <FormMessage />
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
                        <FormMessage />
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
										aria-label="Отправить заявку" disabled={pending}
										type="submit"
										className="w-full p-6 mt-6">
										{pending && <Spinner /> }
										{pending ? "Отправка..." : "Отправить"}
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

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-none p-6 text-lg">
              <h3>Телефон</h3>
              <a href="tel:+79991234567" aria-label="Позвонить в TheVillage" className="location-back">+7 (999) 123-45-67</a>
            </Card>

            <Card className="border-none p-6 text-lg">
              <h3>Почта</h3>
              <a href="mailto:hello@derevnya.ru" aria-label="Написать в TheVillage" className="location-back">hello@derevnya.ru</a>
            </Card>

            <Card className="border-none p-6">
              <h3 className="text-xl">Мессенджеры и соц. сети</h3>
              <SocialLinks />
            </Card>
          </div>
        </div>
      </div>
    </RevealSection>
  )
}
