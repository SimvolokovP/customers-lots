import { create } from "zustand";
import { ICustomer } from "../models/ICustomer";
import { CustomersService, GetCustomersParams } from "../api/customersService";

interface CustomersState {
  customers: ICustomer[];
  fetchCustomers: (params?: GetCustomersParams) => Promise<void>;
}

export const useCustomersStore = create<CustomersState>((set) => ({
  customers: [],
  fetchCustomers: async (params: GetCustomersParams = {}) => {
    try {
      const customers = await CustomersService.getCustomers(params);
      if (customers) {
        const dataSource = customers.map((customer) => ({
          ...customer,
          key: customer.id,
        }));
        set({ customers: dataSource });
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  },
}));
