import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: { token: null },
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload;
    },
    logout: (state, action) => {
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = loginSlice.actions;

export default loginSlice.reducer;

export const selectCurrentToken = (state) => state.login.token;
