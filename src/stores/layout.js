import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useLayoutStore = create((set, get) => ({
  close: true,
  modClose: () => set({ close: !get().close }),
}));

export const useSlideModalStore = create((set, get) => ({
  modalSlide: false,
  toggleModalSlide: () =>
    set({
      modalSlide: !get().modalSlide,
    }),
}));
