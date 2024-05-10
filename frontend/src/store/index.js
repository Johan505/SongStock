// store.js
import { configureStore } from "@reduxjs/toolkit";
import usersSlice  from "./users/slice";
import songsSlice from "./songs/slice";

const store = configureStore({
  reducer: {
    users: usersSlice,
    songs: songsSlice,
  },
});

export default store; 