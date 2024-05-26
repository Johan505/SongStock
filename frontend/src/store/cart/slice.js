import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";

// Inicializa el estado usando la función authLocal
const initialState = {
  status: "idle",
  songid: [],
  vinylid: [],
  error: null,
};

const { VITE_URL_API } = import.meta.env;

export const addSongCart = createAsyncThunk(
  "cart/addsongCart",
  async (song) => {
    try {
      const response = await axios.post(
        `${VITE_URL_API}/Cart/AddCartSong`,
        song
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);


export const addVinylCart = createAsyncThunk(
  "cart/addvinylCart",
  async (song) => {
    try {
      const response = await axios.post(
        `${VITE_URL_API}/Cart/AddCartVinyl`,
        song
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const getSongCartAsync = createAsyncThunk(
  "cart/getCartSong",
  async (id) => {
    try {
      const response = await axios.get(
        `${VITE_URL_API}/Cart/GetCartSong/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const getVinylCartAsync = createAsyncThunk(
  "cart/getCartVinyl",
  async (id) => {
    try {
      const response = await axios.get(
        `${VITE_URL_API}/Cart/GetCartVinyl/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
  
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addSongCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addSongCart.fulfilled, (state) => {
        state.status = "succeeded";
        toast.success("Successfully!");
      })
      .addCase(addSongCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("This didn't work.");
      })
      .addCase(addVinylCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addVinylCart.fulfilled, (state) => {
        state.status = "succeeded";
        toast.success("Successfully!");
      })
      .addCase(addVinylCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("This didn't work.");
      })
      .addCase(getSongCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSongCartAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.songid = action.payload
      })
      .addCase(getSongCartAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getVinylCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getVinylCartAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.vinylid = action.payload
      })
      .addCase(getVinylCartAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

export const {} = cartSlice.actions;

export default cartSlice.reducer;