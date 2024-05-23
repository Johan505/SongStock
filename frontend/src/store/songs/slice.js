import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";

// Inicializa el estado usando la función authLocal
const initialState = {
  allsongs: [],
  songid: null,
  favoriteid:[],
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

  export const updateSongAsync = createAsyncThunk(
    "song/updateSong",
    async (formData) => {
      try {
        const response = await axios.post(
          `${VITE_URL_API}/Song/UpdateSong/${formData.get("id")}`,
          formData
        );
        return response.data;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  );

  export const getSongAsync = createAsyncThunk(
    "song/getSong",
    async (id) => {
      try {
        const response = await axios.get(
          `${VITE_URL_API}/Song/GetSongById/${id}`
        );
        return response.data;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  );

  export const getAllSongsAsync = createAsyncThunk(
    "songs/getAllSongs",
    async () => {
      try {
        const response = await axios.get(
          `${VITE_URL_API}/Song/GetAllSongs`
        );
        return response.data;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  );

export const deleteSong = createAsyncThunk(
  "songs/deleteSong",
  async (id) => {
    try {
      const response = await axios.delete(
        `${VITE_URL_API}/Song/DeleteSong/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const addFavorite = createAsyncThunk(
  "songs/addFavorite",
  async (song) => {
    try {
      const response = await axios.post(
        `${VITE_URL_API}/Favorite/addFavorite`,
        song
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const getFavoriteAsync = createAsyncThunk(
  "favorite/getFavorite",
  async (id) => {
    try {
      const response = await axios.get(
        `${VITE_URL_API}/Favorite/getFavorites/${id}`
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
      .addCase(updateSongAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateSongAsync.fulfilled, (state) => {
        state.status = "succeeded";
        toast.success("Successfully!");
      })
      .addCase(updateSongAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("This didn't work.");
      })
      .addCase(getSongAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSongAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.songid = action.payload;
      })
      .addCase(getSongAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("This didn't work.");
      })
      .addCase(getAllSongsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllSongsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allsongs = action.payload;
      })
      .addCase(getAllSongsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteSong.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteSong.fulfilled, (state, action) => {
        state.status = "succeeded";
        const id = action.payload;
        const filteredSong = state.allsongs.filter(song=>{
          return song.id!=id
        });
        state.allsongs=[...filteredSong]
      })
      .addCase(deleteSong.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addFavorite.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addFavorite.fulfilled, (state) => {
        state.status = "succeeded";
        toast.success("Successfully!");
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("This didn't work.");
      })
      .addCase(getFavoriteAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFavoriteAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.favoriteid = action.payload;
      })
      .addCase(getFavoriteAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("This didn't work.");
      })
  },
});

export const {} = songsSlice.actions;

export default songsSlice.reducer;