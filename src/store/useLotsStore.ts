import { create } from "zustand";
import { ILot } from "../models/ILot";
import { LotsService } from "../api/lotsService";

interface LotsState {
  lots: ILot[];
  fetchLots: () => Promise<void>;
}

export const useLotsStore = create<LotsState>((set) => ({
  lots: [],
  fetchLots: async () => {
    try {
      const lots = await LotsService.getLots();
      if (lots) {
        const dataSource = lots.map((lot) => ({
          ...lot,
          key: lot.id,
        }));
        set({ lots: dataSource });
      }
    } catch (error) {
      console.error("Error fetching lots:", error);
    }
  },
}));
