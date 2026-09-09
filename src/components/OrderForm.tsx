"use client";
import React, { useRef, useState } from "react";
import { LOCATIONS } from "@/src/lib/types/booking";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { toast } from "sonner";
import { Label } from "@/src/lib/ui/label";
import { Input } from "@/src/lib/ui/input";
import { Textarea } from "@/src/lib/ui/textarea";
import { Checkbox } from "@/src/lib/ui/checkbox";
import { Button } from "@/src/lib/ui/button";
import { OrderDataSchema, type OrderDataType } from "@/src/lib/validations/booking";
import type { SearchData } from "@/src/lib/types/booking";

import { submitRequest } from "@/src/lib/utils/submit-request";

type OrderFormProps = {
	searchData: SearchData;
	handleClose: () => void;
};

function OrderForm({ searchData, handleClose}: OrderFormProps) {
	const [pending, setPending] = useState(false);
  const submitting = useRef(false);
	// Данные для заказа
	const [orderData, setOrderData] = useState<Partial<OrderDataType>>({
		name: "",
		phone: "",
		email: "",
		comment: "",
		agreement: false
	});

	// Отправка заказа
  const handleOrderSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting.current) return;
    if (!searchData.guests || !searchData.checkIn || !searchData.checkOut) {
      toast.error("Данные бронирования не заполнены");
      return;
    }

    const fullOrderData = {
      location: searchData.location,
      checkIn: searchData.checkIn,
      checkOut: searchData.checkOut,
      guests: searchData.guests,
      name: orderData.name || "",
      phone: orderData.phone || "",
      email: orderData.email || "",
      comment: orderData.comment,
      agreement: orderData.agreement || false
    };

    const result = OrderDataSchema.safeParse(fullOrderData);
    
    if (!result.success) {
      const errors = result.error.issues.map(err => `${err.path.join('.')}: ${err.message}`);
      toast.error(errors[0] || "Проверьте правильность заполнения формы");
      return;
    }

    submitting.current = true;
    setPending(true);
    try {
      await submitRequest(result.data);
      toast.success("Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.");
      handleClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Не удалось отправить заявку");
    } finally {
      submitting.current = false;
      setPending(false);
    }
  };

	return ( 
		<form onSubmit={handleOrderSubmit} className="space-y-4 py-4">
			{/* Заголовок формы */}
			<div className="bg-muted p-4 rounded-2xl space-y-2">
				<h3 className="font-normal text-lg mb-3">Детали бронирования</h3>
				
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
					<div>
						<span className="text-muted-foreground">База отдыха:</span>
						<p className="font-light">{searchData.location ? LOCATIONS[searchData.location as keyof typeof LOCATIONS] : '-'}</p>
					</div>
					
					<div>
						<span className="text-muted-foreground">Период:</span>
						<p className="font-light">
							{searchData.checkIn && searchData.checkOut 
								? `${format(searchData.checkIn, "dd.MM.yyyy", { locale: ru })} - ${format(searchData.checkOut, "dd.MM.yyyy", { locale: ru })}`
								: '-'}
						</p>
					</div>
				</div>

				{searchData.guests && searchData.guests.length > 0 && (
					<div className="mt-3 pt-3 border-t border-border">
						<span className="text-muted-foreground text-sm">Гости:</span>
						<div className="mt-2 space-y-2">
							{searchData.guests.map((room, index) => (
								<div key={room.id} className="text-sm">
									<p className="font-light">Номер {index + 1}:</p>
									<p className="text-muted-foreground ml-2">
										Взрослые: {room.adults.count}, Дети: {room.children.count}
										{room.children.ages.length > 0 && ` (возраст: ${room.children.ages.join(', ')} лет)`}
									</p>
								</div>
							))}
						</div>
					</div>
				)}
			</div>

			{/* Контактные данные */}
			<div className="space-y-4">
				<h3 className="font-normal text-lg">Контактные данные</h3>
				
				<div className="space-y-2">
					<Label htmlFor="name">Имя *</Label>
					<Input
						id="name"
						placeholder="Ваше имя"
						value={orderData.name}
						onChange={(e) => setOrderData(prev => ({ ...prev, name: e.target.value }))}
						className="bg-input border-border"
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="phone">Телефон *</Label>
					<Input
						id="phone"
						type="tel"
						placeholder="+7 (999) 123-45-67"
						value={orderData.phone}
						onChange={(e) => setOrderData(prev => ({ ...prev, phone: e.target.value }))}
						className="bg-input border-border"
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="email">Email *</Label>
					<Input
						id="email"
						type="email"
						placeholder="example@email.com"
						value={orderData.email}
						onChange={(e) => setOrderData(prev => ({ ...prev, email: e.target.value }))}
						className="bg-input border-border"
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="comment">Комментарий</Label>
					<Textarea
						id="comment"
						placeholder="Дополнительные пожелания или вопросы..."
						value={orderData.comment}
						onChange={(e) => setOrderData(prev => ({ ...prev, comment: e.target.value }))}
						className="bg-input border-border resize-none"
						rows={3}
					/>
				</div>

				{/* Соглашение */}
				<div className="flex items-start space-x-2">
					<Checkbox
						id="agreement"
						checked={orderData.agreement}
						onCheckedChange={(checked) => 
							setOrderData(prev => ({ ...prev, agreement: checked === true }))
						}
					/>
					<Label 
						htmlFor="agreement" 
						className="text-sm leading-tight cursor-pointer"
					>
						Я согласен с условиями бронирования и политикой конфиденциальности *
					</Label>
				</div>
			</div>

			{/* Кнопки действий */}
			<div className="flex gap-3 pt-4">
				<Button
					variant="outline"
					type="button" disabled={pending} aria-label="Отменить заявку" onClick={handleClose}
					className="flex-1"
				>
					Отмена
				</Button>
				<Button
					type="submit" disabled={pending} aria-label="Отправить заявку"
					className="flex-1"
				>
					{pending ? "Отправка..." : "Отправить заявку"}
				</Button>
			</div>
		</form>
	);
}

export default OrderForm;