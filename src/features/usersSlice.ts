import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

// export interface cartType {
//   cartItem: String;
// }

export interface User {
  _id?: String;
  login: String;
  password: String;
  role?: String;
  cart?: [];
}

interface userState {
  user: User | null;
  error: String | null | unknown;
}

const initialState: userState = {
  user: null,
  error: null,
};

export const getUser = createAsyncThunk<
  User,
  void,
  { rejectVAlue: string; state: RootState }
>("get/user", async (data, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:3001/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${thunkAPI.getState().applicationSlice.token}`,
      },
    });

    const user = await res.json();

    if (user.error) {
      return thunkAPI.rejectWithValue("Вы не авторизованы");
    }

    console.log(11111);
    return user;
  } catch (err: any) {
    thunkAPI.rejectWithValue(err.message);
  }
});

export const addBookToCart = createAsyncThunk<
  void,
  String,
  { rejectValue: string; state: RootState }
>("add/tocart", async (bookId, thunkAPI) => {
  try {
    console.log(bookId);
    const res = await fetch("http://localhost:3001/addbook", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${thunkAPI.getState().applicationSlice.token}`,
      },
      body: JSON.stringify({ bookId: bookId }),
    });

    const data = res.json();
  } catch (err: any) {
    thunkAPI.rejectWithValue(err.message);
  }
});

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        // state.user.cart;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
