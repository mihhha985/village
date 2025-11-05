"use client";
import CustomerPopover from "./ui/CustomerPopover";
import { Button } from "@/src/lib/ui/button";
import { Input } from "@/src/lib/ui/input";
import { Label } from "@/src/lib/ui/label";
import { Textarea } from "@/src/lib/ui/textarea";
import { Checkbox } from "@/src/lib/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/lib/ui/select";
import { Calendar as CalendarComponent } from "@/src/components/ui/CustomCalendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/lib/ui/popover";
import { Calendar, MapPin, ChevronDown, AlertCircle, X } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/src/lib/ui/dialog";
import type { SearchData } from "@/src/lib/types/booking";
import { SearchDataSchema, OrderDataSchema, type OrderDataType } from "@/src/lib/validations/booking";
import { LOCATIONS } from "@/src/lib/types/booking";

export function SearchBar() {
  const [searchData, setSearchData] = useState<SearchData>({
    location: "",
    checkIn: undefined,
    checkOut: undefined,
    guests: null
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  
  // Данные для заказа
  const [orderData, setOrderData] = useState<Partial<OrderDataType>>({
    name: "",
    phone: "",
    email: "",
    comment: "",
    agreement: false
  });

  // Валидация данных поиска при открытии Dialog
  const handleSearchClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
    setValidationErrors([]);
    
    const result = SearchDataSchema.safeParse(searchData);
    
    if (!result.success) {
      const errors = result.error.issues.map(err => err.message);
      setValidationErrors(errors);
			return;
    }

		setIsDialogOpen(true);
  };

  // Отправка заказа
  const handleOrderSubmit = () => {
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

    // Вывод данных в консоль
    console.log("=== ЗАКАЗ ОФОРМЛЕН ===");
    console.log("Локация:", LOCATIONS[searchData.location as keyof typeof LOCATIONS]);
    console.log("Заезд:", format(searchData.checkIn, "dd.MM.yyyy", { locale: ru }));
    console.log("Выезд:", format(searchData.checkOut, "dd.MM.yyyy", { locale: ru }));
    console.log("\nГости:");
    searchData.guests.forEach((room, index) => {
      console.log(`  Номер ${index + 1}:`);
      console.log(`    Взрослые: ${room.adults.count}`);
      console.log(`    Дети: ${room.children.count}`);
      if (room.children.ages.length > 0) {
        console.log(`    Возраст детей: ${room.children.ages.join(', ')} лет`);
      }
    });
    console.log("\nКонтактные данные:");
    console.log("Имя:", orderData.name);
    console.log("Телефон:", orderData.phone);
    console.log("Email:", orderData.email);
    if (orderData.comment) {
      console.log("Комментарий:", orderData.comment);
    }
    console.log("=====================");

    toast.success("Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.");
    setIsDialogOpen(false);
    
    // Сброс данных заказа
    setOrderData({
      name: "",
      phone: "",
      email: "",
      comment: "",
      agreement: false
    });
  };

  return (
    <motion.div
			layout
			className="bg-card p-6 rounded-2xl border border-border shadow-lg relative z-10">
      <div className="flex flex-col lg:flex-row flex-wrap gap-5">
        {/* Location Field */}
        <div className="flex flex-col flex-1 gap-y-2">
          <Label className="text-sm font-medium">Выбор базы отдыха</Label>
          <div className="relative ">
            <Select
              value={searchData.location}
              onValueChange={(value) => setSearchData(prev => ({ ...prev, location: value }))}
            >
              <SelectTrigger className="w-full pl-10 pr-4 bg-input border border-border rounded-full text-foreground">
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

        {/* Check-in Date */}
        <div className="flex flex-col flex-1 gap-y-2">
          <Label className="text-sm font-medium">Заезд</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="py-[18px]">
                <Calendar size={16} />
                {searchData.checkIn ? format(searchData.checkIn, "dd.MM.yyyy", { locale: ru }) : "Выберите дату"}
                <ChevronDown className="ml-auto" size={16} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-background border-border">
              <CalendarComponent
                mode="single"
                selected={searchData.checkIn}
                onSelect={(date) => setSearchData(prev => ({ ...prev, checkIn: date }))}
                locale={ru}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out Date */}
        <div className="flex flex-col flex-1 gap-y-2">
          <Label className="text-sm font-medium">Выезд</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="py-[18px]">
                <Calendar size={16} />
                {searchData.checkOut ? format(searchData.checkOut, "dd.MM.yyyy", { locale: ru }) : "Выберите дату"}
                <ChevronDown className="ml-auto" size={16} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-background border-border">
              <CalendarComponent
                mode="single"
                selected={searchData.checkOut}
                onSelect={(date) => setSearchData(prev => ({ ...prev, checkOut: date }))}
                locale={ru}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests */}
        <div className="flex flex-col flex-1 gap-y-2">
          <Label className="text-sm font-medium">Гости</Label>
          <div className="relative">
            <CustomerPopover setSearchData={setSearchData} />
          </div>
        </div>
        
        {/* Action Button */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
						<Button 
              className="py-[18px] self-end w-full lg:w-fit"
              onClick={(e) => handleSearchClick(e)}
            >
							Искать
						</Button>
					<DialogContent 
					className="w-[340px] sm:w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
						<DialogHeader>
							<DialogTitle className="text-2xl font-normal">Оформление заявки</DialogTitle>
							<DialogDescription>
								Заполните контактные данные для бронирования
							</DialogDescription>
						</DialogHeader>

            {/* Информация о бронировании */}
            <div className="space-y-4 py-4">
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
                      setOrderData(prev => ({ ...prev, agreement: checked as boolean }))
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
                  onClick={() => setIsDialogOpen(false)}
                  className="flex-1"
                >
                  Отмена
                </Button>
                <Button
                  onClick={handleOrderSubmit}
                  className="flex-1"
                >
                  Отправить заявку
                </Button>
              </div>
            </div>
					</DialogContent>
				</Dialog>
      </div>
			{/* Ошибки валидации */}
			<AnimatePresence mode="wait">
      {validationErrors.length > 0 && (
        <motion.div
					layout
					className="w-full bg-destructive/20 border border-destructive/80 rounded-[9px] p-3 mt-5 relative overflow-hidden">
          <button
            onClick={() => setValidationErrors([])}
            className="absolute top-2 right-2 text-destructive hover:text-destructive/80 transition-colors"
            aria-label="Закрыть"
          >
            <X size={16} />
          </button>
          <motion.div
						initial={{ height: 0 }}
						animate={{ height: "auto" }}
						exit={{ height: 0, transition: { delay: 0.3 } }}
						transition={{ duration: 0.3, ease: "linear", type: "keyframes" }}
						className="flex items-start gap-2 pr-6">
						<motion.i
							initial={{ opacity: 0, y: -5 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -5 }}
						>
							<AlertCircle size={16} className="text-destructive-foreground mt-0.5 shrink-0" />
						</motion.i>
            <div
							className="text-sm text-destructive-foreground space-y-1">
              {validationErrors.map((error, index) => (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
									animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
									exit={{ opacity: 0, y: -5 }}
									transition={{ duration: 0.2 }}
									key={index}>• {error}</motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
			</AnimatePresence>
    </motion.div>
  );
}