import { create } from 'zustand';

interface ToastState {
  message: string;
  visible: boolean;
  setToast: (msg: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  message: '',
  visible: false,
  setToast: (msg) => {
    set({ message: msg, visible: true });
    setTimeout(() => set({ visible: false }), 2000);
  },
})); 