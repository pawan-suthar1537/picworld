import { createSlice } from "@reduxjs/toolkit";

const postslice = createSlice({
  name: "post",
  initialState: {
    allposts: [],
    mypost: [],
  },
  reducers: {
    setallposts: (state, action) => {
      state.allposts = action.payload;
    },
    setmypost: (state, action) => {
      state.mypost = action.payload;
    },
  },
});

export const { setallposts, setmypost } = postslice.actions;
export default postslice.reducer;
