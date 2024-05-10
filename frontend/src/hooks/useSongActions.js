import { useDispatch } from "react-redux";
import { registerSongAsync } from "../store/songs/slice";


export const useSongActions = () => {
    const dispatch = useDispatch();
  
    const NewSong = (songData) => {
      dispatch(registerSongAsync(songData));
    };  
  
    return { NewSong };
  };