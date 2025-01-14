export interface ICustomer {
  customer_code: string;
  customer_email: string;
  customer_inn: string;
  customer_kpp: string;
  customer_legal_address: string;
  customer_name: string;
  customer_postal_address: string;
  id: number;
  is_organization: boolean;
  is_person: boolean;
  customer_code_main: {
    customer_code: string;
    customer_name: string;
  };
}
