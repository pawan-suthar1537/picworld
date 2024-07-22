import { createSlice } from "@reduxjs/toolkit";

const authslice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    accounttype: localStorage.getItem("accounttype") || null,
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    isauth: !!localStorage.getItem("token"),
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.accounttype = state.user.accounttype;
      state.user = action.payload.user;
      state.isauth = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("accounttype", action.payload.user.accounttype);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
  },
});

export const { login } = authslice.actions;
export default authslice.reducer;
