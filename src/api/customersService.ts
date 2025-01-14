import axios from "axios";
import { ICustomer } from "../models/ICustomer";

const SERVER_URL = "http://127.0.0.1:8000";

export class CustomersService {
  static async getCustomers(): Promise<ICustomer[]> {
    try {
      const response = await axios.get(`${SERVER_URL}/api/customers`, {
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

  static async getCustomerById(id: number): Promise<ICustomer> {
    try {
      const response = await axios.get(`${SERVER_URL}/api/customers/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data)
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

  static async updateCustomer(customer: ICustomer) {
    try {
      console.log(customer);
      const response = await axios.patch(
        `${SERVER_URL}/api/customers/${customer.id}/`,
        customer,
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
