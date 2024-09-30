import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import {
  createOrder,
  fetchAllOrders,
  OrdersResponse,
  updateOrder,
} from "./orderAPI";
import { Order } from "../../models/Order";

export interface OrderState {
  orders: Order[];
  status: "idle" | "loading" | "failed";
  error: string | null;
  currentOrder: any;
  totalOrders: number;
}

const initialState: OrderState = {
  orders: [],
  status: "idle",
  error: null,
  currentOrder: null,
  totalOrders: 0,
};
//we may need more info of current order

export const createOrderAsync = createAsyncThunk<
  any,
  any,
  { rejectValue: string }
>("order/createOrder", async (order, thunkAPI) => {
  try {
    const response = await createOrder(order);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to create order");
  }
});

export const updateOrderAsync = createAsyncThunk<
  any,
  any,
  { rejectValue: string }
>("order/updateOrder", async (order, thunkAPI) => {
  try {
    const response = await updateOrder(order);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to create order");
  }
});

export const fetchAllOrdersAync = createAsyncThunk<
  OrdersResponse,
  { sort: Record<string, string>; pagination: Record<number, number> },
  { rejectValue: string }
>("product/fetchAllOrders", async ({ sort, pagination }, thunkAPI) => {
  try {
    const response = await fetchAllOrders(sort, pagination);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to fetch orders");
  }
});

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        createOrderAsync.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = "idle";
          state.orders.push(action.payload);
          state.currentOrder = action.payload;
        }
      )
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateOrderAsync.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = "idle";
          const index = state.orders.findIndex(
            (order) => order.id === action.payload.id
          );
          state.orders[index] = action.payload;
        }
      )
      .addCase(fetchAllOrdersAync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchAllOrdersAync.fulfilled,
        (state, action: PayloadAction<OrdersResponse>) => {
          state.status = "idle";
          state.orders = action.payload.orders;
          state.totalOrders = action.payload.totalOrders;
        }
      );
  },
});

// Export actions and selectors
export const { resetOrder } = orderSlice.actions;

export const useSelectorOrderState = () => {
  const userState = useSelector((state: RootState) => state.order);
  return userState;
};
export default orderSlice.reducer;
