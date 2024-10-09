import { Product } from "./Product";

export interface CartItem {
  id: string;
  quantity: number;
  user: string;
  product: Product;
}

export interface CartItemWithoutId {
  quantity: number;
  user: string;
  product: string;
}

export interface CartItemForUpdate {
  id: string;
  quantity: number;
}
