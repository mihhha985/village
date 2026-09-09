import { Calendar, ChevronDown } from "lucide-react";
import { format, startOfDay } from "date-fns";
import { ru } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/lib/ui/popover";
import { Button } from "@/src/lib/ui/button";
import { Label } from "@/src/lib/ui/label";
import { Calendar as CalendarComponent } from "@/src/lib/ui/calendar";
import type { SearchData } from "@/src/lib/types/booking";

function CheckinDate(
	{searchData, setSearchData}: 
	{searchData: SearchData, setSearchData: React.Dispatch<React.SetStateAction<SearchData>>}) {
	return ( 
				<div className="flex flex-col flex-1 gap-y-2">
			<Label className="text-sm font-medium">Заезд</Label>
			<Popover>
				<PopoverTrigger asChild>
					<Button aria-label="Заезд" variant="outline" className="py-[18px]">
						<Calendar size={16} />
						{searchData.checkIn ? format(searchData.checkIn, "dd.MM.yyyy", { locale: ru }) : "Выберите дату"}
						<ChevronDown className="ml-auto" size={16} />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0 bg-background border-border">
					<CalendarComponent
						mode="single"
						selected={searchData.checkIn}
						disabled={{ before: startOfDay(new Date()) }}
						onSelect={(date) => setSearchData(prev => ({ ...prev, checkIn: date, checkOut: date && prev.checkOut && prev.checkOut > date ? prev.checkOut : undefined }))}
						locale={ru}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}

export default CheckinDate;