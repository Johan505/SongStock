import { useDispatch } from "react-redux";
import { setVolume, setIsPlaying, setCurrentMusic } from "../store/player/slice";

export const usePlayerActions = () => {
  const dispatch = useDispatch();

  const updateVolume = (volume) => {
    dispatch(setVolume(volume));
  };

  const togglePlayState = (isPlaying) => {
    dispatch(setIsPlaying(isPlaying));
  };

  const updateCurrentMusic = (currentMusic) => {
    dispatch(setCurrentMusic(currentMusic));
  };

  return {
    updateVolume,
    togglePlayState,
    updateCurrentMusic,
  };
};
