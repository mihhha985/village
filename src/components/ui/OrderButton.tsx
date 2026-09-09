"use client"
import {Button} from "@/src/lib/ui/button"
import { useOrderModal } from "@/src/store/modal";

function OrderButton() {
	const show = useOrderModal(state => state.show);

	return (  
		 <Button
		 	aria-label="Забронировать" onClick={show} 
		 	className="scale-90 sm:scale-100">
			Забронировать
		</Button>
	);
}

export default OrderButton;