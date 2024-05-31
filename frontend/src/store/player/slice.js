import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlaying: false,
  currentMusic: {
    song: null,
    songs: [],
  },
  volume: 1,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setCurrentMusic: (state, action) => {
      state.currentMusic = action.payload;
      //console.log(state. currentMusic);
    },
  },
});

export const { setVolume, setIsPlaying, setCurrentMusic } = playerSlice.actions;

export default playerSlice.reducer;
