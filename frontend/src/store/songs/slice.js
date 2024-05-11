import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";

// Inicializa el estado usando la función authLocal
const initialState = {
  status: "idle",
  error: null,
};

const { VITE_URL_API } = import.meta.env;

export const registerSongAsync = createAsyncThunk(
    "songs/registerSong",
    async (songData) => {
      try {
        const response = await axios.post(
          `${VITE_URL_API}/Song/CreateSong`,
          songData
        );
        return response.data;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  );
  
  
  export const registerVinylDiscAsync = createAsyncThunk(
    "vinyldisc/registerVinylDisc",
    async (vinyldiscData) => {
      try {
        const response = await axios.post(
          `${VITE_URL_API}/VinylDisc/CreateVinylDisc`,
          vinyldiscData
        );
        return response.data;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  );
  
export const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerSongAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerSongAsync.fulfilled, (state) => {
        state.status = "succeeded";
        toast.success("Successfully!");
      })
      .addCase(registerSongAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("This didn't work.");
      })
  },
});

export const {} = songsSlice.actions;

export default songsSlice.reducer;