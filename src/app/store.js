import { configureStore } from "@reduxjs/toolkit";
import { apiReducer } from "../features/authSlice";
import { authApiSlice } from "../features/authApiSlice";

export const store = configureStore({
  reducer: {
    auth: apiReducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApiSlice.middleware),
  devTools: true,
});
