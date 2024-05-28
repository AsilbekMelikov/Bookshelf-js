import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: {}, searchBooks: [], searchLoading: false },
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
    },

    setSearchLoading: (state, action) => {
      state.searchLoading = action.payload;
    },
    setSearchBooks: (state, action) => {
      state.searchBooks = action.payload;
    },
  },
});

export const { setCredentials, setSearchBooks, setSearchLoading } =
  authSlice.actions;

export const apiReducer = authSlice.reducer;
