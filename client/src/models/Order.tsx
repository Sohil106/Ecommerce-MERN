import { CartItem } from "./CartItem";
import { LoggedinUser, Address } from "./Modal";

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
  user: LoggedinUser;
  paymentMethod: string;
  selectedAddress: Address;
  status: string;
}