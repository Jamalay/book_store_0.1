import { createSlice } from "@reduxjs/toolkit";

export interface User {
  _id?: String;
  login: String;
  password: String;
  role: String;
  cart: [String];
}

interface userState {
  user: User[];
  error: String | null | unknown;
}

const initialState: userState = {
  user: [],
  error: null,
};

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default usersSlice.reducer;
