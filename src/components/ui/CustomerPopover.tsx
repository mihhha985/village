"use client";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/lib/ui/popover";
import { Button } from "@/src/lib/ui/button";
import { ChevronDown, Plus, Users, Minus } from "lucide-react";
import { Label } from "@/src/lib/ui/label";
import { Separator } from "@/src/lib/ui/separator";

function CustomerPopover() {

	return ( 
		<Popover>
			<PopoverTrigger asChild>
				<Button className="w-full py-[18px]" variant="outline">
					<Users size={16} />
					<span className="truncate">Укажите количество гостей</span>
					<ChevronDown className="ml-auto" size={16} />
				</Button>
			</PopoverTrigger>
			<PopoverContent align="start" className="w-70">
				
				<Button variant="ghost" className="w-full justify-center mt-4">
					<Plus size={16} className="mr-2" />
					Добавить номер
				</Button>
				<Button className="w-full mt-4">
					Готово
				</Button>
			</PopoverContent>
		</Popover>
	);
}

function Row({index}: {index:number}){
	const [adults, setAdults] = useState(2);
	const [children, setChildren] = useState(0);

	return (
			<div className="space-y-4">
				<h4>Номер {index}</h4>
				<div className="w-full flex items-center gap-4">
					<div className="w-full space-y-2">
						<Label>Взрослые</Label>
						<div className="w-full flex items-center justify-between border border-border bg-input">
							<Button
								onClick={() => setAdults(prev => Math.max(0, prev - 1))} 
								variant="ghost" size="sm">
								<Minus size={16} />
							</Button>
							<span>{adults}</span>
							<Button 
								onClick={() => setAdults(prev => prev + 1)} 
								variant="ghost" size="sm">
								<Plus size={16} />	
							</Button>
						</div>
					</div>
					<div className="w-full space-y-2">
						<Label>Дети</Label>
						<div className="w-full flex items-center justify-between border border-border bg-input">
							<Button 
								onClick={() => setChildren(prev => Math.max(0, prev - 1))} 
								variant="ghost" size="sm">
								<Minus size={16} />
							</Button>
							<span>{children}</span>
							<Button 
								onClick={() => setChildren(prev => prev + 1)} 
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