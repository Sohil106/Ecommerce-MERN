import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchBrands,
  fetchCategories,
  fetchProductsByFilters,
  ProductResponse,
} from "./productAPI";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Product } from "../models/Product";
import { FilterOption } from "./components/ProductList";

// Define the shape of the state
export interface ProductState {
  products: Product[];
  brands: FilterOption[];
  categories: FilterOption[];
  totalItems: number;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

// Initial state with typed structure
const initialState: ProductState = {
  products: [],
  brands: [],
  categories: [],
  totalItems: 0,
  status: "idle",
  error: null,
};

export const fetchAllProductsAsync = createAsyncThunk<
  ProductResponse,
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
  ProductResponse,
  {
    filter: Record<string, string | string[]>;
    sort: Record<string, string>;
    pagiantion: Record<number, number>;
  },
  { rejectValue: string }
>(
  "product/fetchProductsByFilters",
  async ({ filter, sort, pagiantion }, thunkAPI) => {
    try {
      const response: any = await fetchProductsByFilters(
        filter,
        sort,
        pagiantion
      );
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch products");
    }
  }
);

export const fetchBrandsAsync = createAsyncThunk<
  FilterOption[],
  void,
  { rejectValue: string }
>("product/fetchBrands", async (_, thunkAPI) => {
  try {
    const response: any = await fetchBrands();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to fetch products");
  }
});

export const fetchCategoriesAsync = createAsyncThunk<
  FilterOption[],
  void,
  { rejectValue: string }
>("product/fetchCategories", async (_, thunkAPI) => {
  try {
    const response: any = await fetchCategories();
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
        (state, action: PayloadAction<ProductResponse>) => {
          state.status = "idle";
          state.products = action.payload.products;
          state.totalItems = action.payload.totalItems;
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
        (state, action: PayloadAction<ProductResponse>) => {
          state.status = "idle";
          state.products = action.payload.products;
          state.totalItems = action.payload.totalItems;
        }
      )
      .addCase(fetchBrandsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchBrandsAsync.fulfilled,
        (state, action: PayloadAction<FilterOption[]>) => {
          state.status = "idle";
          state.brands = action.payload;
        }
      )
      .addCase(fetchProductsByFiltersAync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCategoriesAsync.fulfilled,
        (state, action: PayloadAction<FilterOption[]>) => {
          state.status = "idle";
          state.categories = action.payload;
        }
      )
      .addCase(fetchCategoriesAsync.rejected, (state, action) => {
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
