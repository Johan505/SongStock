import { useDispatch } from "react-redux";
import { getAllSongsAsync, registerSongAsync } from "../store/songs/slice";


export const useSongActions = () => {
    const dispatch = useDispatch();

    const getAllSongs = ()  => {
      dispatch(getAllSongsAsync());
   };
  
    const NewSong = (songData) => {
      dispatch(registerSongAsync(songData));
    };  
  
    return { NewSong };
  };