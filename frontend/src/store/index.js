// store.js
import { configureStore } from "@reduxjs/toolkit";
import usersSlice  from "./users/slice";
import songsSlice from "./songs/slice";
import vinyldiscsSlice from "./vinyldiscs/slice";
import cartSlice from "./cart/slice";

const store = configureStore({
  reducer: {
    users: usersSlice,
    songs: songsSlice,
    vinyldiscs: vinyldiscsSlice,
    cart: cartSlice,
  },
});

export default store; 