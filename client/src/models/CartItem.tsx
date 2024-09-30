import { Product, ProductWithoutId } from "./Product";

export interface CartItem extends Product {
  quantity: number;
  user: string;
}

export interface CartItemWithoutId extends ProductWithoutId {
  quantity: number;
  user: string;
}
