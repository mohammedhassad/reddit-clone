import { create } from "zustand";

export interface AuthModalState {
  modalState: {
    open: boolean;
    view: ModalView;
  };
  setModalState: (args: { open: boolean; view: ModalView }) => void;
}

export type ModalView = "login" | "signup" | "resetPassword";

const useAuthModalStore = create<AuthModalState>((set) => ({
  modalState: { open: false, view: "login" },
  setModalState: (args) => set({ modalState: { ...args } }),
}));

export default useAuthModalStore;
