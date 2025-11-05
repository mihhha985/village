import { Calendar } from "@/src/lib/ui/calendar"
import { Card } from "@/src/lib/ui/card"

function ContactCalendar({date, setDate}: {date: Date | undefined, setDate: (date: Date | undefined) => void}) {
	return (
		<Card className="border-none p-6">
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
	);
}

export default ContactCalendar;