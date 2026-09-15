import { create } from 'zustand'

type OrderModalType = {
	visible: boolean;
	show: ()=>void;
	hide: ()=>void;
} 

export const useOrderModal = create<OrderModalType>((set) => ({
  visible: false,
	show: ()  => set({visible:  true}),
	hide: () => set({ visible: false})
}))
