import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import toggleSidebarReducer from "./toogleSidebarSlice";
import loginReducer from "../features/login/redux/loginSlice";

export const store = configureStore({
  reducer: {
    toggleSidebar: toggleSidebarReducer,
    login: loginReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
