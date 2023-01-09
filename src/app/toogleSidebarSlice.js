import { createSlice } from "@reduxjs/toolkit";

export const toogleSidebarSlice = createSlice({
  name: "toogleSidebar",
  initialState: { open: true },
  reducers: {
    toggleSidebar: (state) => {
      state.open = !state.open;
    },
    restSidebar: (state) => {
      state.open = true;
    },
  },
});

export const toggleSidebarSelector = (state) => state.toggleSidebar.open;

export const { toggleSidebar, restSidebar } = toogleSidebarSlice.actions;

export default toogleSidebarSlice.reducer;
