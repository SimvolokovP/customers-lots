import { create } from "zustand";
import { ILot } from "../models/ILot";
import { GetLotsParams, LotsService } from "../api/lotsService";

interface LotsState {
  lots: ILot[];
  fetchLots: (params?: GetLotsParams) => Promise<void>;
}

export const useLotsStore = create<LotsState>((set) => ({
  lots: [],
  fetchLots: async (params: GetLotsParams = {}) => {
    try {
      const lots = await LotsService.getLots(params);
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
