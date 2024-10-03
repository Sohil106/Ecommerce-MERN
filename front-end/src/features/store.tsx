import { configureStore } from "@reduxjs/toolkit";
import counterReducer, { CounterState } from "../features/counter/counterSlice";
import productReducer, { ProductState } from "../features/product/productSlice";
import authReducer, { AuthState } from "../features/auth/authSlice";
import cartReducer, { CartState } from "../features/cart/cartSlice";
import orderReducer, { OrderState } from "../features/order/orderSlice";
import userReducer, { UserState } from "../features/user/userSlice";

export type RootState = {
  counter: CounterState;
  product: ProductState;
  auth: AuthState;
  cart: CartState;
  order: OrderState;
  user: UserState;
};

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
