import { useDispatch } from "react-redux";
import { getAllSongsAsync, registerSongAsync, updateSongAsync, getSongAsync } from "../store/songs/slice";


export const useSongActions = () => {
    const dispatch = useDispatch();

    const getAllSongs = ()  => {
      dispatch(getAllSongsAsync());
   };
  
    const createSong = (songData) => {
      dispatch(registerSongAsync(songData));
    };  

    const NewSong = async (songData) => {
      return dispatch(registerSongAsync(songData));
    }; 

    const updatesong = async (formData) => {
      return dispatch(updateSongAsync(formData));
    };

    const searchid = (id)  => {
      dispatch(getSongAsync(id));
   };
  
    return { createSong, NewSong, updatesong, getAllSongs, searchid };
  };