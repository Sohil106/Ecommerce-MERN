import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  creatProduct,
  fetchAllProducts,
  fetchBrands,
  fetchCategories,
  fetchProductById,
  fetchProductsByFilters,
  ProductResponse,
  updateProduct,
} from "./productAPI";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Product, ProductWithoutId } from "../../models/Product";
import { FilterOption } from "./components/ProductList";

// Define the shape of the state
export interface ProductState {
  products: Product[];
  product: Product;
  brands: FilterOption[];
  categories: FilterOption[];
  totalItems: number;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialProduct: Product = {
  id: "",
  title: "",
  description: "",
  category: "",
  price: 0,
  discountPercentage: 0,
  rating: 0,
  stock: 0,
  tags: [],
  brand: "",
  sku: "",
  weight: 0,
  dimensions: {
    width: 0,
    height: 0,
    depth: 0,
  },
  warrantyInformation: "",
  shippingInformation: "",
  availabilityStatus: "",
  reviews: [],
  returnPolicy: "",
  minimumOrderQuantity: 0,
  meta: { createdAt: "", updatedAt: "", barcode: "", qrCode: "" },
  images: [],
  thumbnail: "",
};

// Initial state with typed structure
const initialState: ProductState = {
  products: [],
  product: initialProduct,
  brands: [],
  categories: [],
  totalItems: 0,
  status: "loading",
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
export const fetchProductByIdAsync = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>("product/fetchProductById", async (id, thunkAPI) => {
  try {
    const response = await fetchProductById(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to fetch product By Id");
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
      return thunkAPI.rejectWithValue("Failed to fetch products by filter");
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
    const response = await fetchCategories();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to fetch products");
  }
});

export const creatProductAsync = createAsyncThunk<
  Product,
  ProductWithoutId,
  { rejectValue: string }
>("/creatProduct", async (product, thunkAPI) => {
  try {
    const response = await creatProduct(product);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to create product");
  }
});

// export const updateProductAsync = createAsyncThunk<
//   Product,
//   Product,
//   { rejectValue: string }
// >("/updateProduct", async (product, thunkAPI) => {
//   try {
//     const response = await updateProduct(product);
//     return response.data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue("Failed to update product");
//   }
// });

export const updateProductAsync = createAsyncThunk<
  Product,
  Product,
  { rejectValue: string }
>("/updateProduct", async (product, thunkAPI) => {
  try {
    const respomse = await updateProduct(product);
    return respomse.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to update product");
  }
});

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProduct: (state) => {
      state.product = initialProduct;
    },
    resetStatus: (state) => {
      state.status = "loading";
    },
  },
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
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProductByIdAsync.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.status = "idle";
          state.product = action.payload;
        }
      )
      .addCase(fetchProductByIdAsync.rejected, (state, action) => {
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
      })
      .addCase(creatProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        creatProductAsync.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.status = "idle";
          state.products.push(action.payload);
        }
      )
      .addCase(creatProductAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateProductAsync.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.status = "idle";
          const index = state.products.findIndex(
            (product) => product.id === action.payload.id
          );
          state.products[index] = action.payload;
        }
      )
      .addCase(updateProductAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

// Export actions and selectors
export const { resetProduct, resetStatus } = productSlice.actions;

export const useSelectorProductState = () => {
  const productState = useSelector((state: RootState) => state.product);
  return productState;
};

export default productSlice.reducer;
