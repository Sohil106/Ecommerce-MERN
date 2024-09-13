import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCount } from "./cartAPI";

// Define the shape of the state
interface CounterState {
  value: number;
  status: "idle" | "loading";
}

// Initial state with typed structure
const initialState: CounterState = {
  value: 0,
  status: "idle",
};

// Define the type of the parameter and return value for fetchCount
export const incrementAsync = createAsyncThunk<number, number>(
  "counter/fetchCount",
  async (amount: number) => {
    const response: any = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        incrementAsync.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.status = "idle";
          state.value += action.payload;
        }
      );
  },
});

// Export actions and selectors
export const { increment } = cartSlice.actions;

export const selectCount = (state: { counter: CounterState }) =>
  state.counter.value;

export default cartSlice.reducer;
