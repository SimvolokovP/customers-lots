import axios from "axios";
import { ILot } from "../models/ILot";

const SERVER_URL = "http://127.0.0.1:8000";

export class LotsService {
  static async getLots(): Promise<ILot[]> {
    try {
      const response = await axios.get(`${SERVER_URL}/api/lots`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Error: ${error.response?.status} - ${
            error.response?.statusText || error.message
          }`
        );
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }

  static async getLotById(id: number): Promise<ILot> {
    try {
      const response = await axios.get(`${SERVER_URL}/api/lots/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Error: ${error.response?.status} - ${
            error.response?.statusText || error.message
          }`
        );
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }

  static async updateLot(lot: ILot) {
    try {
      console.log(lot);
      const response = await axios.patch(
        `${SERVER_URL}/api/lots/${lot.id}/`,
        lot,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Error: ${error.response?.status} - ${
            error.response?.statusText || error.message
          }`
        );
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }
}
