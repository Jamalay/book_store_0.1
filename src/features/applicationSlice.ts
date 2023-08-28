import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "./usersSlice";
import { create } from "domain";

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
  token: localStorage.getItem("token"),
};

export const authSignUp = createAsyncThunk<
  String,
  { login: String; password: String },
  { rejectValue: String }
>("auth/signup", async ({ login, password }, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:3001/signUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    });

    const token = await res.json();

    if (token.error) {
      return thunkAPI.rejectWithValue(token.error);
    }

    localStorage.setItem("token", token.token);

    return token.token;
  } catch (err: any) {
    thunkAPI.rejectWithValue(err.message);
  }
});

export const authSignIn = createAsyncThunk<
  String,
  { login: String; password: String },
  { rejectValue: string }
>("auth/signin", async ({ login, password }, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:3001/signIn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    });

    const token = await res.json();

    if (token.error) {
      return thunkAPI.rejectWithValue(token.error);
    }

    localStorage.setItem("token", token.token);

    return token.token;
  } catch (err: any) {
    thunkAPI.rejectWithValue(err.message);
  }
});

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authSignUp.fulfilled, (state, action) => {
        state.signingUp = false;
        state.error = null;
        state.token = action.payload;
      })
      .addCase(authSignUp.pending, (state) => {
        state.signingUp = true;
        state.error = null;
      })
      .addCase(authSignUp.rejected, (state, action) => {
        state.error = action.payload;
        state.signingUp = false;
      });

    builder
      .addCase(authSignIn.fulfilled, (state, action) => {
        state.token = action.payload;
        state.error = null;
        state.signingIn = false;
      })
      .addCase(authSignIn.pending, (state, action) => {
        state.signingIn = true;
        state.error = null;
      })
      .addCase(authSignIn.rejected, (state, action) => {
        state.error = action.payload;
        state.signingIn = false;
      });
  },
});

export default applicationSlice.reducer;
