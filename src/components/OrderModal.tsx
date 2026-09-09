"use client";

import { useState } from "react";
import { useOrderModal } from "@/src/store/modal";
import CheckoutDate from "@/src/components/ui/CheckoutDate";
import CheckinDate from "@/src/components/ui/CheckinDate";
import ChooseLocation from "@/src/components/ui/ChooseLocation";
import CustomerPopover from "@/src/components/ui/CustomerPopover";
import OrderForm from "@/src/components/OrderForm";
import { Button } from "@/src/lib/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/src/lib/ui/dialog";
import { SearchDataSchema } from "@/src/lib/validations/booking";
import type { LocationKey, SearchData } from "@/src/lib/types/booking";

export function OrderModal({ initialLocation = "" }: { initialLocation?: LocationKey | "" }) {
  const visible = useOrderModal(state => state.visible);
  const hide = useOrderModal(state => state.hide);
  const [showForm, setShowForm] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [searchData, setSearchData] = useState<SearchData>({ location: initialLocation, checkIn: undefined, checkOut: undefined, guests: null });
  const handleClose = () => {
    hide();
    setShowForm(false);
    setValidationErrors([]);
    setSearchData({ location: initialLocation, checkIn: undefined, checkOut: undefined, guests: null });
  };
  const handleSearch = () => {
    const result = SearchDataSchema.safeParse(searchData);
    setValidationErrors(result.success ? [] : result.error.issues.map(issue => issue.message));
    if (result.success) setShowForm(true);
  };
  return (
    <Dialog open={visible} onOpenChange={open => { if (!open) handleClose(); }}>
      <DialogContent className="w-full sm:max-w-[420px] max-h-[90dvh] overflow-y-auto custom-scrollbar">
        <DialogHeader>
          <DialogTitle>{showForm ? "Оформление заявки" : "Начать бронирование"}</DialogTitle>
          <DialogDescription>{showForm ? "Заполните контактные данные для бронирования" : "Выберите параметры вашего бронирования"}</DialogDescription>
        </DialogHeader>
        {showForm ? <OrderForm searchData={searchData} handleClose={handleClose} /> : (
          <>
            <div className="flex flex-col gap-5">
              <ChooseLocation searchData={searchData} setSearchData={setSearchData} />
              <CheckinDate searchData={searchData} setSearchData={setSearchData} />
              <CheckoutDate searchData={searchData} setSearchData={setSearchData} />
              <CustomerPopover searchData={searchData} setSearchData={setSearchData} />
            </div>
            {validationErrors.length > 0 && <div role="alert">{validationErrors.map((error, index) => <p key={index}>{error}</p>)}</div>}
            <div className="flex gap-3">
              <Button aria-label="Закрыть бронирование" className="flex-1" variant="outline" onClick={handleClose}>Закрыть</Button>
              <Button aria-label="Продолжить бронирование" className="flex-1" onClick={handleSearch}>Искать</Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
export default OrderModal;
