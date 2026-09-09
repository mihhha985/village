"use client";
import CustomerPopover from "@/src/components/ui/CustomerPopover";
import { Button } from "@/src/lib/ui/button";
import { Label } from "@/src/lib/ui/label";
import { AlertCircle, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/src/lib/ui/dialog";
import type { SearchData } from "@/src/lib/types/booking";
import CheckoutDate from "@/src/components/ui/CheckoutDate";
import CheckinDate from "@/src/components/ui/CheckinDate";
import ChooseLocation from "@/src/components/ui/ChooseLocation";
import { SearchDataSchema } from "@/src/lib/validations/booking";
import OrderForm from "@/src/components/OrderForm";

export function SearchBar() {
  const [searchData, setSearchData] = useState<SearchData>({
    location: "",
    checkIn: undefined,
    checkOut: undefined,
    guests: null
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);


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

	const handleClose = () => {
		setIsDialogOpen(false);
		setValidationErrors([]);
		setSearchData({
			location: "",
			checkIn: undefined,
			checkOut: undefined,
			guests: null
		});
	};


  return (
    <div className="bg-card p-6 rounded-2xl border border-border shadow-lg relative z-10">
      <div className="flex flex-col lg:flex-row flex-wrap gap-5">
        {/* Location Field */}
        <ChooseLocation
					searchData={searchData}
					setSearchData={setSearchData}
				/>
        {/* Check-in Date */}
        <CheckinDate
					searchData={searchData}
					setSearchData={setSearchData}
        />

        {/* Check-out Date */}
        <CheckoutDate
          searchData={searchData}
          setSearchData={setSearchData}
        />

        {/* Guests */}
        <div className="flex flex-col flex-1 gap-y-2">
          <Label className="text-sm font-medium">Гости</Label>
          <div className="relative">
            <CustomerPopover searchData={searchData} setSearchData={setSearchData} />
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
						<OrderForm
							searchData={searchData}
							handleClose={handleClose}
						/>
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
          <motion.div className="flex items-start gap-2 pr-6">
						<motion.i>
							<AlertCircle size={16} className="text-destructive-foreground mt-0.5 shrink-0" />
						</motion.i>
            <div
							className="text-sm text-destructive-foreground space-y-1">
              {validationErrors.map((error, index) => (
                <motion.div key={index}>• {error}</motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
			</AnimatePresence>
    </div>
  );
}
