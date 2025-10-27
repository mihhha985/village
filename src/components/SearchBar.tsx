"use client";
import CustomerPopover from "./ui/CustomerPopover";
import { Button } from "@/src/lib/ui/button";
import { Label } from "@/src/lib/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/lib/ui/select";
import { Calendar as CalendarComponent } from "@/src/lib/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/lib/ui/popover";
import { Calendar, MapPin, ChevronDown } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";


interface SearchBarProps {
  onSearch?: (searchData: SearchData) => void;
}

interface SearchData {
  location: string;
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  guests: string | undefined;
}

interface BookingRequest {
  location: string;
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  guests: string;
  name: string;
  phone: string;
  email: string;
}

export function SearchBar() {

  const [searchData, setSearchData] = useState<SearchData>({
    location: "",
    checkIn: undefined,
    checkOut: undefined,
    guests: undefined
  });

  return (
    <div className="bg-card p-6 rounded-2xl border border-border shadow-lg relative z-10">
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
                initialFocus
                locale={ru}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests */}
        <div className="flex flex-col flex-1 gap-y-2">
          <Label className="text-sm font-medium">Гости</Label>
          <div className="relative">
            <CustomerPopover />
          </div>
        </div>
        {/* Action Buttons */}
        <Button 
          className="w-full lg:w-auto self-end">
          Искать
        </Button>
      </div>
    </div>
  );
}
