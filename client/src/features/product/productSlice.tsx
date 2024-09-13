import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchProductsByFilters } from "./productAPI";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Product } from "../models/Product";

// Define the shape of the state
export interface ProductState {
  products: Product[];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

// Initial state with typed structure
const initialState: ProductState = {
  products: [],
  status: "idle",
  error: null,
};

export const fetchAllProductsAsync = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("product/fetchAllProducts", async (_, thunkAPI) => {
  try {
    const response: any = await fetchAllProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to fetch products");
  }
});

export const fetchProductsByFiltersAync = createAsyncThunk<
  Product[],
  Record<string, string>,
  { rejectValue: string }
>("product/fetchProductsByFilters", async (filter, thunkAPI) => {
  try {
    const response: any = await fetchProductsByFilters(filter);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to fetch products");
  }
});

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchAllProductsAsync.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = "idle";
          state.products = action.payload;
        }
      )
      .addCase(fetchAllProductsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchProductsByFiltersAync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProductsByFiltersAync.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = "idle";
          state.products = action.payload;
        }
      )
      .addCase(fetchProductsByFiltersAync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

// Export actions and selectors
export const {} = productSlice.actions;

export const useSelectorProductState = () => {
  const userState = useSelector((state: RootState) => state.product);
  return userState;
};

export default productSlice.reducer;
