import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteCartItem,
  fetchItemsByUserId,
  resetCart,
  updateCartItem,
} from "./cartAPI";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import {
  CartItem,
  CartItemForUpdate,
  CartItemWithoutId,
} from "../../models/CartItem";

// Define the shape of the state
export interface CartState {
  status: "idle" | "loading" | "failed";
  items: CartItem[];
}

// Initial state with typed structure
const initialState: CartState = {
  status: "idle",
  items: [],
};

export const addToCartAsync = createAsyncThunk<
  CartItem,
  CartItemWithoutId,
  { rejectValue: string }
>("cart/addToCart", async (item, thunkAPI) => {
  try {
    const response = await addToCart(item);
    return response.data as CartItem;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to add cartitem");
  }
});
export const fetchItemsByUserIdAsync = createAsyncThunk<
  CartItem[],
  string,
  { rejectValue: string }
>("cart/fetchItemsByUserId", async (userId, thunkAPI) => {
  try {
    const response = await fetchItemsByUserId(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data as CartItem[];
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to fetch products");
  }
});

export const updateCartItemAsync = createAsyncThunk<
  CartItem,
  CartItemForUpdate,
  { rejectValue: string }
>("cart/updateCartItem", async (item, thunkAPI) => {
  try {
    const response = await updateCartItem(item);
    return response.data as CartItem;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to update cartitem");
  }
});
export const deleteCartItemAsync = createAsyncThunk<
  { id: string },
  string,
  { rejectValue: string }
>("cart/deleteCartItem", async (id, thunkAPI) => {
  try {
    const response = await deleteCartItem(id);
    return response.data as { id: string };
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to update cartitem");
  }
});
export const resetCartAsync = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("cart/resetCart", async (userId, thunkAPI) => {
  try {
    const response = await resetCart(userId);
    return response.status;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to update cartitem");
  }
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        addToCartAsync.fulfilled,
        (state, action: PayloadAction<CartItem>) => {
          state.status = "idle";
          state.items.push(action.payload);
        }
      )
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchItemsByUserIdAsync.fulfilled,
        (state, action: PayloadAction<CartItem[]>) => {
          state.status = "idle";
          state.items = action.payload;
        }
      )
      .addCase(updateCartItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateCartItemAsync.fulfilled,
        (state, action: PayloadAction<CartItem>) => {
          state.status = "idle";
          const index = state.items.findIndex(
            (item) => item.id === action.payload.id
          );
          state.items[index] = action.payload;
        }
      )
      .addCase(deleteCartItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteCartItemAsync.fulfilled,
        (state, action: PayloadAction<{ id: string }>) => {
          state.status = "idle";
          const index = state.items.findIndex(
            (item) => item.id.toString() === action.payload.id
          );
          state.items.splice(index, 1);
        }
      )
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state) => {
        state.status = "idle";
        state.items = [];
      });
  },
});

// Export actions and selectors
export const {} = cartSlice.actions;

export const useSelectorCartState = () => {
  const userState = useSelector((state: RootState) => state.cart);
  return userState;
};

export default cartSlice.reducer;
