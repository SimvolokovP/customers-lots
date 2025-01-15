export interface ILot {
  id: number;
  lot_name: string;
  customer_code?: {
    customer_code: string;
    id: number;
    customer_name: string;
  };
  price: string;
  currency_code: string;
  nbs_rate: string;
  place_delivery: string;
  date_delivery: string;
}
