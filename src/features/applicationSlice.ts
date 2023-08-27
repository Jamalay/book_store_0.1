import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "./usersSlice";

interface applicationTypes {
  error: String | null | unknown;
  signingUp: boolean;
  signingIn: boolean;
  token: String | null;
}

const initialState: applicationTypes = {
  error: null,
  signingUp: false,
  signingIn: false,
  token: null,
};

const authSignUp = createAsyncThunk<User, User, { rejectValue: String }>(
  "auth/signup",
  async ({ login, password }, thunkAPI) => {
    try {
    } catch (err: any) {
      thunkAPI.rejectWithValue(err.message);
    }
    const res = await fetch("http://localhost:3001/signUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    });

    const user = await res.json();

    if (user.error) {
      return thunkAPI.rejectWithValue(user.error);
    }

    return user;
  }
);

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default applicationSlice.reducer;
