import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";

// Inicializa el estado usando la función authLocal
const initialState = {
  allvinyls: [],
  vinylid: null,
  status: "idle",
  error: null,
};

const { VITE_URL_API } = import.meta.env;

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

export const updateVinylDiscAsync = createAsyncThunk(
  "vinyldisc/updateVinylDisc",
  async (formData) => {
    try {
      const response = await axios.post(
        `${VITE_URL_API}/VinylDisc/UpdateVinylDisc/${formData.get("id")}`,
        formData
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const getVinylDiscAsync = createAsyncThunk(
  "vinyldisc/getVinylDisc",
  async (id) => {
    try {
      const response = await axios.get(
        `${VITE_URL_API}/VinylDisc/GetVinylById/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const getAllVinylDiscAsync = createAsyncThunk(
  "vinyldisc/getAllVinylDisc",
  async () => {
    try {
      const response = await axios.get(
        `${VITE_URL_API}/VinylDisc/GetAllVinylDisc`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const deleteVinylDisc = createAsyncThunk(
  "vinyldisc/deleteVinylDisc",
  async (id) => {
    try {
      const response = await axios.delete(
        `${VITE_URL_API}/VinylDisc/DeleteVinylDisc/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const vinyldiscsSlice = createSlice({
  name: "vinyldiscs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerVinylDiscAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerVinylDiscAsync.fulfilled, (state) => {
        state.status = "succeeded";
        toast.success("Successfully!");
      })
      .addCase(registerVinylDiscAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("This didn't work.");
      })
      .addCase(updateVinylDiscAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateVinylDiscAsync.fulfilled, (state) => {
        state.status = "succeeded";
        toast.success("Successfully!");
      })
      .addCase(updateVinylDiscAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("This didn't work.");
      })
      .addCase(getVinylDiscAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getVinylDiscAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.vinylid = action.payload;
      })
      .addCase(getVinylDiscAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("This didn't work.");
      })
      .addCase(getAllVinylDiscAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllVinylDiscAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allvinyls = action.payload;
      })
      .addCase(getAllVinylDiscAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteVinylDisc.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteVinylDisc.fulfilled, (state, action) => {
        state.status = "succeeded";
        const id = action.payload;
        const filteredSong = state.allvinyls.filter(song=>{
          return song.id!=id
        });
        state.allvinyls=[...filteredSong]
      })
      .addCase(deleteVinylDisc.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

export const {} = vinyldiscsSlice.actions;

export default vinyldiscsSlice.reducer;
