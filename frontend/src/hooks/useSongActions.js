import { useDispatch } from "react-redux";
import { registerSongAsync } from "../store/users/slice";

export const useSongActions = () => {
    const dispatch = useDispatch();
  
    const NewSong = (songData) => {
      dispatch(registerSongAsync(songData));
    };  
  
    return { NewSong };
  };