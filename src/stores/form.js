import { create } from "zustand";
import { devtools } from "zustand/middleware";
export const useFormStore = create(
  devtools((set, get) => ({
    report: {
      height: "",
      bp: "",
      weight: "",
      ent: "",
      chest: "",
      heart: "",
      abdomen: "",
      cns: "",
      eye_imp: "",
      eye_reco: "",
      fbc: "",
      fbs: "",
      widal: "",
      rdt: "",
      hepb: "",
      lft: "",
      kft: "",
      lipid: "",
      urine: "",
      stool: "",
      psa: "",
      ecg: "",
      summary: "",
      conclusion: "",
      reco: "",
    },
    modReport: (payload) => {
      let newResult = get().report;
      set({ ...newResult, ...payload });
    },
    initialLoader: (payload) => {
      set({ report: payload });
    },
  }))
);
