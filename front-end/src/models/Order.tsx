import { CartItem } from "./CartItem";
import { LoggedinUser, Address } from "./Modal";

export interface Order extends OrderWithoutId {
  id: string;
}

export interface OrderWithoutId {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
  user: LoggedinUser;
  paymentMethod: string;
  selectedAddress: Address;
  status: string;
}

export interface OrderToAdd {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
  user: string;
  paymentMethod: string;
  selectedAddress: Address;
  status: string;
}

export interface OrderToUpdate extends OrderToAdd {
  id: string;
}
