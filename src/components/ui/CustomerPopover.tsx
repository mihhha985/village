"use client";
import { useState, Dispatch, SetStateAction } from "react";
import { NativeSelect, NativeSelectOption} from "@/src/lib/ui/native-select"
import { Popover, PopoverContent, PopoverTrigger } from "@/src/lib/ui/popover";
import { Button } from "@/src/lib/ui/button";
import { ChevronDown, Plus, Users, Minus } from "lucide-react";
import { Label } from "@/src/lib/ui/label";
import { Separator } from "@/src/lib/ui/separator";
import { toast } from "sonner"
import { BOOKING_LIMITS } from "@/src/lib/types/booking";
import type { Room, Children, Adult, SearchData } from "@/src/lib/types/booking";

type RowType = {
	item: Room;
	decrement: () => void;
	onUpdate: (updatedRoom: Room) => void;
}

function CustomerPopover({setSearchData}: {setSearchData: Dispatch<SetStateAction<SearchData>>}) {
	const [title, setTitle] = useState<string>("Укажите количество гостей");
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [room, setRoom] = useState<Room[]>([{
		id: crypto.randomUUID(),
		index: 1,
		adults: {count: 1},
		children: {count: 0, ages: []}
	}]);

	// Обновление конкретной комнаты
	const updateRoom = (updatedRoom: Room) => {
		setRoom(prevRooms => 
			prevRooms.map(r => r.id === updatedRoom.id ? updatedRoom : r)
		);
	};
	
	const decrement = () => {
		if (room.length <= 1) return;
		room.pop()
		setRoom([...room])
	} 

	const increment = () => {
		room.push({
			id: crypto.randomUUID(),
			index: room.length + 1, 
			adults:{count: 1}, 
			children: {count:0, ages: []}
		})
		if (room.length <= BOOKING_LIMITS.MAX_ROOMS){
			setRoom([...room])
		}else{
			toast.error("Привышенно кол-во номеров")
		}
	}

	const setResult = () => {
		const totalAdults = room.reduce((acc, curr) => acc + curr.adults.count, 0);
		const totalChildren = room.reduce((acc, curr) => acc + curr.children.count, 0);
		const result = `${totalAdults} взрослых - ${totalChildren} детей - в ${room.length} номерах`;
		setTitle(result);
		setSearchData(prev => ({...prev, guests: room}));
		
		// Вывод подробной информации в консоль
		console.log("=== ИНФОРМАЦИЯ О БРОНИРОВАНИИ ===");
		console.log(`Всего взрослых: ${totalAdults}`);
		console.log(`Всего детей: ${totalChildren}`);
		console.log(`Количество номеров: ${room.length}`);
		room.forEach((r, index) => {
			console.log(`\nНомер ${index + 1}:`);
			console.log(`  Взрослые: ${r.adults.count}`);
			console.log(`  Дети: ${r.children.count}`);
			if (r.children.ages.length > 0) {
				console.log(`  Возраст детей: ${r.children.ages.join(', ')} лет`);
			}
		});
		console.log("=================================");
		
		setIsOpen(false); // Закрываем popover
	}
	
	return ( 
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button className="w-full py-[18px]" variant="outline">
					<Users size={16} />
					<span className="truncate">{title}</span>
					<ChevronDown className="ml-auto" size={16} />
				</Button>
			</PopoverTrigger>
			<PopoverContent 
				side="bottom"  
				align="start" 
				className="w-70 max-h-[400px] overflow-y-auto custom-scrollbar"
			>
				{room.map((item) => 
					<Row 
						key={item.id} 
						item={item} 
						decrement={decrement} 
						onUpdate={updateRoom} 
					/>
				)}
				<Button
					onClick={increment} 
					variant="ghost" className="w-full justify-center mt-4">
					<Plus size={16} className="mr-2" />
					Добавить номер
				</Button>
				<Button
					onClick={setResult} 
					className="w-full mt-4">
					Готово
				</Button>
			</PopoverContent>
		</Popover>
	);
}

function Row({item, decrement, onUpdate}: RowType){
	const [adults, setAdults] = useState<Adult>(item.adults);
	const [children, setChildren] = useState<Children>(item.children);

	const decrementAdults = () => {
		if (adults.count <= 1) return;
		const newAdults = { count: adults.count - 1 };
		setAdults(newAdults);
		onUpdate({ ...item, adults: newAdults });
	};

	const incrementAdults = () => {
		if (adults.count >= BOOKING_LIMITS.MAX_ADULTS_PER_ROOM) {
			toast.error("Превышено число гостей");
			return;
		}
		const newAdults = { count: adults.count + 1 };
		setAdults(newAdults);
		onUpdate({ ...item, adults: newAdults });
	};

	const decrementChildren = () => {
		if (children.count <= 0) return;
		const newAges = children.ages.slice(0, -1);
		const newChildren = { count: children.count - 1, ages: newAges };
		setChildren(newChildren);
		onUpdate({ ...item, children: newChildren });
	};

	const incrementChildren = () => {
		if (children.count >= BOOKING_LIMITS.MAX_CHILDREN_PER_ROOM) {
			toast.error("Превышено число гостей");
			return;
		}
		const newAges = [...children.ages, 0];
		const newChildren = { count: children.count + 1, ages: newAges };
		setChildren(newChildren);
		onUpdate({ ...item, children: newChildren });
	};

	const updateChildAge = (index: number, age: number) => {
		const newAges = [...children.ages];
		newAges[index] = age;
		const newChildren = { ...children, ages: newAges };
		setChildren(newChildren);
		onUpdate({ ...item, children: newChildren });
		console.log(`Обновлен возраст ребенка #${index + 1} в номере ${item.index}: ${age} лет`);
	};

	return (
			<div className="space-y-4 mb-4">
				<div className="flex items-center justify-between">
					<h4>Номер {item.index}</h4>
					<Button 
						onClick={decrement}
						variant="ghost" size={"sm"}>X</Button>
				</div>
				<div className="w-full flex items-center gap-4">
					<div className="w-full space-y-2">
						<Label>Взрослые</Label>
						<div className="w-full flex items-center justify-between border border-border bg-input rounded-md">
							<Button
								onClick={decrementAdults}
								variant="ghost" 
								size="sm"
								disabled={adults.count <= 1}
							>
								<Minus size={16} />
							</Button>
							<span>{adults.count}</span>
							<Button
								onClick={incrementAdults}
								variant="ghost" 
								size="sm"
								disabled={adults.count >= 10}
							>
								<Plus size={16} />	
							</Button>
						</div>
					</div>
					<div className="w-full space-y-2">
						<Label>Дети</Label>
						<div className="w-full flex items-center justify-between border border-border bg-input rounded-md">
							<Button 
								onClick={decrementChildren}
								variant="ghost" 
								size="sm"
								disabled={children.count <= 0}
							>
								<Minus size={16} />
							</Button>
							<span>{children.count}</span>
							<Button 
								onClick={incrementChildren}
								variant="ghost" 
								size="sm"
								disabled={children.count >= 10}
							>
								<Plus size={16} />	
							</Button>
						</div>
					</div>
				</div>
				<div className="space-y-2">
					{children.count > 0 && children.ages.map((age, index) => (
						<div key={index} className="w-full flex items-center justify-between">
							<Label>Ребенок №{index + 1}</Label>
							<NativeSelect 
								value={age.toString()} 
								onChange={(e) => updateChildAge(index, parseInt(e.target.value))}
							>
								{Array.from({ length: 18 }, (_, i) => i).map((ageOption) => (
									<NativeSelectOption
										className="text-primary-foreground" 
										key={ageOption} 
										value={ageOption.toString()}>
										{ageOption} {ageOption === 0 ? "лет" : ageOption === 1 ? "год" : ageOption >= 2 && ageOption <=4 ? "года" : "лет"}
									</NativeSelectOption>
								))}
							</NativeSelect>
						</div>
					))}
				</div>
				<Separator />
			</div>		
	)
}

export default CustomerPopover;