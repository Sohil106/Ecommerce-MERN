import { configureStore } from "@reduxjs/toolkit";
import counterReducer, { CounterState } from "../features/counter/counterSlice";
import productReducer, { ProductState } from "../features/product/productSlice";

export type RootState = {
  counter: CounterState;
  product: ProductState;
};

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    product: productReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
