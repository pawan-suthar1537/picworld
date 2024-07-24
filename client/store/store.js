import { configureStore } from "@reduxjs/toolkit";
import authslice from "./slices/authslice";
import navslisce from "./slices/navslice";
import postslice from "./slices/postslice";

export const store = configureStore({
  reducer: {
    auth: authslice,
    nav: navslisce,
    post: postslice,
  },
});
