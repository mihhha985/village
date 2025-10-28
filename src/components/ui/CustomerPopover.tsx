"use client";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/lib/ui/popover";
import { Button } from "@/src/lib/ui/button";
import { ChevronDown, Plus, Users, Minus } from "lucide-react";
import { Label } from "@/src/lib/ui/label";
import { Separator } from "@/src/lib/ui/separator";

type Room  = {
	index: number;
	adult: Adult;
	children: Children;
}

type Adult  = {
	count: number;
}

type Children = {
	count: number;
	age: number
}

type RowType = {
	item: Room;
	decrement: ()=>void;
}

function CustomerPopover() {

	const [room, setRoom] = useState<Room[]>([{
		index: 1,
		adult: {count: 0},
		children: {count: 0, age: 0}
	}]);

	
	const decrement = () => {
		if (room.length <= 1) return;
		room.pop()
		setRoom([...room])
	} 

	const increment = () => {
		room.push({index: room.length + 1, adult:{count: 0}, children: {count:0, age: 0}})
		if (room.length <= 5){
			setRoom([...room])
		}else{
			alert("Привышенно кол-во номеров")
		}
	}
	
	return ( 
		<Popover>
			<PopoverTrigger asChild>
				<Button className="w-full py-[18px]" variant="outline">
					<Users size={16} />
					<span className="truncate">Укажите количество гостей</span>
					<ChevronDown className="ml-auto" size={16} />
				</Button>
			</PopoverTrigger>
			<PopoverContent side="bottom"  align="start" className="w-70">
				{room.map((item, index) => 
					<Row key={index} item={item} decrement={decrement}  />
				)}
				<Button
					onClick={increment} 
					variant="ghost" className="w-full justify-center mt-4">
					<Plus size={16} className="mr-2" />
					Добавить номер
				</Button>
				<Button
					onClick={() => console.log(room)} 
					className="w-full mt-4">
					Готово
				</Button>
			</PopoverContent>
		</Popover>
	);
}

function Row({item, decrement}: RowType){
	const [adults, setAdults] = useState<Adult>(item.adult);
	const [children, setChildren] = useState<Children>(item.children);

	const adultHandler = () => {
		const count = adults.count + 1;
		if (count < 10){
			const newAdults = {
				count: count
			}
			setAdults(newAdults);
		}else{
			alert("Привышено число гостей")
		}
	}

	const childrenHandler = () => {
		const count = children.count + 1;
		if (count < 10){
			const newChildren = {
				count: count, 
				age:0
			}
			setChildren(newChildren);
		}else{
			alert("Привышено число гостей")
		}
	}

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
						<div className="w-full flex items-center justify-between border border-border bg-input">
							<Button
								variant="ghost" size="sm">
								<Minus size={16} />
							</Button>
							<span>{adults.count}</span>
							<Button
								onClick={adultHandler}
								variant="ghost" size="sm">
								<Plus size={16} />	
							</Button>
						</div>
					</div>
					<div className="w-full space-y-2">
						<Label>Дети</Label>
						<div className="w-full flex items-center justify-between border border-border bg-input">
							<Button 
								variant="ghost" size="sm">
								<Minus size={16} />
							</Button>
							<span>{children.count}</span>
							<Button 
								onClick={childrenHandler}
								variant="ghost" size="sm">
								<Plus size={16} />	
							</Button>
						</div>
					</div>
				</div>
				<Separator />
			</div>		
	)
}

export default CustomerPopover;