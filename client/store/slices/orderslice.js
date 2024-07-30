import { createSlice } from "@reduxjs/toolkit";

const orderslice = createSlice({
  name: "order",
  initialState: {
    orders: [],
  },
  reducers: {
    setorder: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const { setorder } = orderslice.actions;
export default orderslice.reducer;
