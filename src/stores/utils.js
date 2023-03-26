import { create } from "zustand";
import { devtools } from "zustand/middleware";
export const useTabStore = create(
  devtools((set) => ({
    activeTab: 1,
    setActiveTab: (payload) => set({ activeTab: payload }),
  }))
);
