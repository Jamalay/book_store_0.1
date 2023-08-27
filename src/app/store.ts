import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "../features/shopSlice";
import usersSlice from "../features/usersSlice";
import applicationSlice from "../features/applicationSlice";

export const store = configureStore({
  reducer: {
    shopReducer,
    usersSlice,
    applicationSlice,
  },
});

export type AppDispath = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
