import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { usePlayerActions } from "../../hooks/usePlayerActions";
const { VITE_URL_API_IMG } = import.meta.env;
import "./Module.scss";
import { useSongActions } from "../../hooks/useSongActions";
import { SongControl } from "./SongControl";

export const Player = () => {
  const { getAllSongs } = useSongActions();
  const { allsongs, songStatus } = useSelector((state) => state.songs);
  const { updateCurrentMusic, togglePlayState } = usePlayerActions();
  const currentMusic = useSelector((state) => state.player.currentMusic);
  const isPlaying = useSelector((state) => state.player.isPlaying);
  //const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    getAllSongs();
  }, []);

  if (!allsongs || songStatus === "loading")
    return <div className="loader">loading.....</div>;

  useEffect(() => {
    if (allsongs.length > 0 && currentMusic.song === null) {
      updateCurrentMusic({
        song: allsongs[0],
        songs: allsongs,
      });
    }
  }, [allsongs, currentMusic.song, updateCurrentMusic]);

  useEffect(() => {
    if (currentMusic.song) {
      const src = `${VITE_URL_API_IMG}${currentMusic.song.song}`;
      audioRef.current.src = src;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentMusic, isPlaying]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    togglePlayState(!isPlaying);
  };

  const handleNext = () => {
    const currentIndex = allsongs.findIndex(
      (song) => song.id === currentMusic.song.id
    );

    const nextIndex = (currentIndex + 1) % allsongs.length;

    updateCurrentMusic({ ...currentMusic, song: allsongs[nextIndex] });
  };

  const handlePrevious = () => {
    const currentIndex = allsongs.findIndex(
      (song) => song.id === currentMusic.song.id
    );

    const previousIndex =
      (currentIndex - 1 + allsongs.length) % allsongs.length;

    updateCurrentMusic({ ...currentMusic, song: allsongs[previousIndex] });
  };

  return (
    <div className="container-player">
      <div className="info-curretmusic">
        {currentMusic.song && (
          <div className="info-song">
            <img
              src={`${VITE_URL_API_IMG}${currentMusic.song.img}`}
              alt={currentMusic.song.name}
              width="100"
              height="100"
            />
            <div>
              <p>{currentMusic.song.name}</p>
              <p>{currentMusic.song.artist}</p>
            </div>
          </div>
        )}
      </div>
      <div className="music-control">
        <div className="actions-player">
          <button onClick={handlePrevious}>Previous</button>
          <button onClick={handlePlayPause}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button onClick={handleNext}>Next</button>
        </div>
        <SongControl audio={audioRef} />
        <audio ref={audioRef} />
      </div>

      <div className="volume-control">control de volumen</div>
    </div>
  );
};
