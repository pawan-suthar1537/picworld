import { configureStore } from "@reduxjs/toolkit";
import authslice from "./slices/authslice";
import navslisce from "./slices/navslice";
import postslice from "./slices/postslice";
import orderslice from "./slices/orderslice";

export const store = configureStore({
  reducer: {
    auth: authslice,
    nav: navslisce,
    post: postslice,
    order: orderslice,
  },
});
