"use client";
import { useState, useId, Dispatch, SetStateAction } from "react";
import { NativeSelect, NativeSelectOption} from "@/src/lib/ui/native-select"
import { Popover, PopoverContent, PopoverTrigger } from "@/src/lib/ui/popover";
import { Button } from "@/src/lib/ui/button";
import { ChevronDown, Plus, Users, Minus } from "lucide-react";
import { Label } from "@/src/lib/ui/label";
import { Separator } from "@/src/lib/ui/separator";
import { toast } from "sonner"
import { BOOKING_LIMITS } from "@/src/lib/types/booking";
import type { Room, SearchData } from "@/src/lib/types/booking";

type RowType = {
	item: Room;
	decrement: () => void;
	onUpdate: (updatedRoom: Room) => void;
}

function CustomerPopover({searchData, setSearchData}: {searchData: SearchData; setSearchData: Dispatch<SetStateAction<SearchData>>}) {
	const initialId = useId();
	const title = searchData.guests ? `${searchData.guests.reduce((sum, room) => sum + room.adults.count, 0)} взрослых - ${searchData.guests.reduce((sum, room) => sum + room.children.count, 0)} детей - в ${searchData.guests.length} номерах` : "Укажите количество гостей";
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [room, setRoom] = useState<Room[]>([{
		id: initialId,
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

	const decrement = (id: string) => {
    setRoom(rooms => rooms.length <= 1 ? rooms : rooms.filter(room => room.id !== id).map((room, index) => ({ ...room, index: index + 1 })));
  };
  const increment = () => {
    if (room.length >= BOOKING_LIMITS.MAX_ROOMS) {
      toast.error("Максимум 5 номеров");
      return;
    }
    setRoom(rooms => [...rooms, { id: crypto.randomUUID(), index: rooms.length + 1, adults: { count: 1 }, children: { count: 0, ages: [] } }]);
  };

	const setResult = () => {
		setSearchData(prev => ({...prev, guests: room}));

		setIsOpen(false); // Закрываем popover
	}

	return (
		<Popover open={isOpen} onOpenChange={open => {
        if (open) setRoom(searchData.guests ?? [{ id: initialId, index: 1, adults: { count: 1 }, children: { count: 0, ages: [] } }]);
        setIsOpen(open);
      }}>
			<PopoverTrigger asChild>
				<Button aria-label="Выбрать гостей" className="w-full py-[18px]" variant="outline">
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
						decrement={() => decrement(item.id)}
						onUpdate={updateRoom}
					/>
				)}
				<Button
					aria-label="Добавить номер" onClick={increment}
					variant="ghost" className="w-full justify-center mt-4">
					<Plus size={16} className="mr-2" />
					Добавить номер
				</Button>
				<Button
					aria-label="Подтвердить гостей" onClick={setResult}
					className="w-full mt-4">
					Готово
				</Button>
			</PopoverContent>
		</Popover>
	);
}

function Row({item, decrement, onUpdate}: RowType){
	const adults = item.adults;
	const children = item.children;

	const decrementAdults = () => {
		if (adults.count <= 1) return;
		const newAdults = { count: adults.count - 1 };

		onUpdate({ ...item, adults: newAdults });
	};

	const incrementAdults = () => {
		if (adults.count >= BOOKING_LIMITS.MAX_ADULTS_PER_ROOM) {
			toast.error("Превышено число гостей");
			return;
		}
		const newAdults = { count: adults.count + 1 };

		onUpdate({ ...item, adults: newAdults });
	};

	const decrementChildren = () => {
		if (children.count <= 0) return;
		const newAges = children.ages.slice(0, -1);
		const newChildren = { count: children.count - 1, ages: newAges };

		onUpdate({ ...item, children: newChildren });
	};

	const incrementChildren = () => {
		if (children.count >= BOOKING_LIMITS.MAX_CHILDREN_PER_ROOM) {
			toast.error("Превышено число гостей");
			return;
		}
		const newAges = [...children.ages, 0];
		const newChildren = { count: children.count + 1, ages: newAges };

		onUpdate({ ...item, children: newChildren });
	};

	const updateChildAge = (index: number, age: number) => {
		const newAges = [...children.ages];
		newAges[index] = age;
		const newChildren = { ...children, ages: newAges };

		onUpdate({ ...item, children: newChildren });

	};

	return (
			<div className="space-y-4 mb-4">
				<div className="flex items-center justify-between">
					<h4>Номер {item.index}</h4>
					<Button
						aria-label="Удалить номер" onClick={decrement}
						variant="ghost" size={"sm"}>X</Button>
				</div>
				<div className="w-full flex items-center gap-4">
					<div className="w-full space-y-2">
						<Label>Взрослые</Label>
						<div className="w-full flex items-center justify-between border border-border bg-input rounded-md">
							<Button
								aria-label="Уменьшить число взрослых" onClick={decrementAdults}
								variant="ghost"
								size="sm"
								disabled={adults.count <= 1}
							>
								<Minus size={16} />
							</Button>
							<span>{adults.count}</span>
							<Button
								aria-label="Добавить взрослого" onClick={incrementAdults}
								variant="ghost"
								size="sm"
								disabled={adults.count >= BOOKING_LIMITS.MAX_ADULTS_PER_ROOM}
							>
								<Plus size={16} />
							</Button>
						</div>
					</div>
					<div className="w-full space-y-2">
						<Label>Дети</Label>
						<div className="w-full flex items-center justify-between border border-border bg-input rounded-md">
							<Button
								aria-label="Уменьшить число детей" onClick={decrementChildren}
								variant="ghost"
								size="sm"
								disabled={children.count <= 0}
							>
								<Minus size={16} />
							</Button>
							<span>{children.count}</span>
							<Button
								aria-label="Добавить ребёнка" onClick={incrementChildren}
								variant="ghost"
								size="sm"
								disabled={children.count >= BOOKING_LIMITS.MAX_CHILDREN_PER_ROOM}
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
								aria-label={`Возраст ребёнка ${index + 1} в номере ${item.index}`} value={age.toString()}
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
