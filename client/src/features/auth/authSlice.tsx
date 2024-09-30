import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { checkUser, creatUser, signOut } from "./authAPI";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { RegisterUser, LoggedinUser, ErrorMessage } from "../../models/Modal";

// Define the shape of the state
export interface AuthState {
  loggedInUser: LoggedinUser | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

// Initial state with typed structure
const initialState: AuthState = {
  loggedInUser: null,
  status: "idle",
  error: null,
};

export const creatUserAsync = createAsyncThunk<
  LoggedinUser,
  RegisterUser,
  { rejectValue: string }
>("user/creatUser", async (userData, thunkAPI) => {
  try {
    const response = await creatUser(userData);
    return response.data as LoggedinUser;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to fetch user");
  }
});

export const checkUserAsync = createAsyncThunk<
  LoggedinUser,
  LoggedinUser,
  { rejectValue: string }
>("user/checkUser", async (loginInfo, thunkAPI) => {
  try {
    const response = await checkUser(loginInfo);
    return response.data as LoggedinUser;
  } catch (error) {
    if (typeof error === "object" && error !== null && "message" in error) {
      return thunkAPI.rejectWithValue((error as ErrorMessage).message);
    }
    // If we can't determine the error type, return a default message
    return thunkAPI.rejectWithValue("An unknown error occurred");
  }
});

export const signOutAsync = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("user/signOut", async (userId, thunkAPI) => {
  try {
    const response = await signOut(userId);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to fetch user");
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(creatUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        creatUserAsync.fulfilled,
        (state, action: PayloadAction<LoggedinUser>) => {
          state.status = "idle";
          state.loggedInUser = action.payload;
        }
      )
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        checkUserAsync.fulfilled,
        (state, action: PayloadAction<LoggedinUser>) => {
          state.status = "idle";
          state.loggedInUser = action.payload;
        }
      )
      .addCase(
        checkUserAsync.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload ?? "An unknown error occurred";
        }
      )
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state) => {
        state.status = "idle";
        state.loggedInUser = null;
      });
  },
});

// Export actions and selectors
export const {} = authSlice.actions;

export const useSelectorAuthState = () => {
  const userState = useSelector((state: RootState) => state.auth);
  return userState;
};
export default authSlice.reducer;
