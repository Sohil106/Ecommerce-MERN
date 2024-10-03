import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { LoggedinUser } from "../../models/Modal";
import {
  fetchLoggedinUser,
  fetchLoggedinUserOrders,
  updateUser,
} from "./userAPI";
import { Order } from "../../models/Order";

// Define the shape of the state
export interface UserState {
  userInfo: LoggedinUser;
  userOrders: Order[];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

// Initial state with typed structure
const initialState: UserState = {
  userInfo: { id: "", email: "", password: "", addresses: [], role: "" },
  userOrders: [],
  status: "idle",
  error: null,
};

export const fetchLoggedinUserAsync = createAsyncThunk<
  LoggedinUser,
  string,
  { rejectValue: string }
>("user/fetchLoggedinUser", async (userId, thunkAPI) => {
  try {
    const response = await fetchLoggedinUser(userId);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to fetch user");
  }
});

export const fetchLoggedinUserOrdersAsync = createAsyncThunk<
  Order[],
  string,
  { rejectValue: string }
>("user/fetchLoggedinUserOrders", async (userId, thunkAPI) => {
  try {
    const response = await fetchLoggedinUserOrders(userId);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to fetch user");
  }
});

export const updateUserAsync = createAsyncThunk<
  LoggedinUser,
  LoggedinUser,
  { rejectValue: string }
>("user/updateUser", async (userData, thunkAPI) => {
  try {
    const response = await updateUser(userData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to fetch user");
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedinUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchLoggedinUserAsync.fulfilled,
        (state, action: PayloadAction<LoggedinUser>) => {
          state.status = "idle";
          //this info can be different or more from logged-in User info
          state.userInfo = action.payload;
        }
      )
      .addCase(fetchLoggedinUserOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchLoggedinUserOrdersAsync.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.status = "idle";
          //this info can be different or more from logged-in User info
          state.userOrders = action.payload;
        }
      )
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateUserAsync.fulfilled,
        (state, action: PayloadAction<LoggedinUser>) => {
          state.status = "idle";
          state.userInfo = action.payload;
        }
      );
  },
});

// Export actions and selectors
export const {} = userSlice.actions;

export const useSelectorUserState = () => {
  const userState = useSelector((state: RootState) => state.user);
  return userState;
};
export default userSlice.reducer;
