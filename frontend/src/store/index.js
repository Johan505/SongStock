// store.js
import { configureStore } from "@reduxjs/toolkit";
import usersSlice  from "./users/slice";
import songsSlice from "./songs/slice";
import vinyldiscsSlice from "./vinyldiscs/slice";

const store = configureStore({
  reducer: {
    users: usersSlice,
    songs: songsSlice,
    vinyldiscs: vinyldiscsSlice
  },
});

export default store; 