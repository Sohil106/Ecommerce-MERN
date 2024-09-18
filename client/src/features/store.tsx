import { configureStore } from "@reduxjs/toolkit";
import counterReducer, { CounterState } from "../features/counter/counterSlice";
import productReducer, { ProductState } from "../features/product/productSlice";
import authReducer, { AuthState } from "../features/auth/authSlice";
import cartReducer, { CartState } from "../features/cart/cartSlice";

export type RootState = {
  counter: CounterState;
  product: ProductState;
  auth: AuthState;
  cart: CartState;
};

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
