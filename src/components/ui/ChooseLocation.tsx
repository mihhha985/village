import { Label } from "@/src/lib/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/lib/ui/select";
import { MapPin } from "lucide-react";
import type { SearchData } from "@/src/lib/types/booking";

function ChooseLocation({ searchData, setSearchData }:
	{ searchData: SearchData, setSearchData: React.Dispatch<React.SetStateAction<SearchData>> }
) {
	return ( 
		<div className="flex flex-col flex-1 gap-y-2">
			<Label className="text-sm font-medium">Выбор базы отдыха</Label>
			<div className="relative">
				<Select
					value={searchData.location}
					onValueChange={(value) => setSearchData(prev => ({ ...prev, location: value }))}
				>
					<SelectTrigger aria-label="Выбор базы отдыха" className="w-full pl-10 pr-4 bg-input border border-border rounded-full text-foreground">
			<MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground" size={18} />
			<SelectValue placeholder="Выберите место" />
					</SelectTrigger>
					<SelectContent>
			<SelectItem value="prostor">Деревня. Простор</SelectItem>
			<SelectItem value="ozero">Деревня. Озеро</SelectItem>
			<SelectItem value="city">Деревня. City</SelectItem>
			<SelectItem value="longlife">Деревня. Longlife</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}

export default ChooseLocation;