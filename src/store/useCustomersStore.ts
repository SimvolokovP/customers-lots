import { create } from "zustand";
import { ICustomer } from "../models/ICustomer";
import { CustomersService } from "../api/customersService";

interface CustomersState {
  customers: ICustomer[];
  fetchCustomers: () => Promise<void>;
}

export const useCustomersStore = create<CustomersState>((set) => ({
  customers: [],
  fetchCustomers: async () => {
    try {
      const customers = await CustomersService.getCustomers();
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
