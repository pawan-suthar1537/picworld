import { createSlice } from "@reduxjs/toolkit";

const navslisce = createSlice({
  name: "nav",
  initialState: {
    sidebar: false,
    tab: "",
  },
  reducers: {
    togglesidebar: (state) => {
      state.sidebar = !state.sidebar;
    },
    settab: (state, action) => {
      state.tab = action.payload;
    },
  },
});

export const { togglesidebar, settab } = navslisce.actions;
export default navslisce.reducer;
