import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";

// Inicializa el estado usando la función authLocal
const initialState = {
  cartid: null,
  status: "idle",
  allcartsongs:[],
  allcartvinyls:[],
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

export const deleteCartSong = createAsyncThunk(
  "cart/deleteCartSong",
  async (id) => {
    try {
      const response = await axios.delete(
        `${VITE_URL_API}/Cart/DeleteCartSong/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const deleteCartVinyl = createAsyncThunk(
  "cart/deleteCartVinyl",
  async (id) => {
    try {
      const response = await axios.delete(
        `${VITE_URL_API}/Cart/DeleteCartVinyl/${id}`
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
        state.allcartsongs = action.payload
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
        state.allcartvinyls = action.payload
      })
      .addCase(getVinylCartAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteCartSong.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCartSong.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deleteCartSong.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteCartVinyl.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCartVinyl.fulfilled, (state) => {
        state.status = "succeeded";
      //  const id = action.payload;
      //   const filteredVinyl = state.allcartvinyls.filter(vinyldiscs=>{
      //     return vinyldiscs.id!=id
      //   });
      //   state.allvinyls=[...filteredVinyl]
       })
      .addCase(deleteCartVinyl.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

export const {} = cartSlice.actions;

export default cartSlice.reducer;