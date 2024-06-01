import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { usePlayerActions } from "../../hooks/usePlayerActions";
const { VITE_URL_API_IMG } = import.meta.env;
import { useSongActions } from "../../hooks/useSongActions";
import { SongControl } from "./SongControl";
import "./Module.scss";

export const Player = () => {
  const { getAllSongs } = useSongActions();
  const { allsongs, songStatus } = useSelector((state) => state.songs);
  const { updateCurrentMusic, togglePlayState } = usePlayerActions();
  const currentMusic = useSelector((state) => state.player.currentMusic);
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const audioRef = useRef(null);

  useEffect(() => {
    getAllSongs();
  }, []);

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

  if (!allsongs || allsongs.length === 0 || songStatus === "loading") {
    return;
  }

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
          <button onClick={handlePrevious} className="icon-player">
            <svg
              fill="currentColor"
              height="16"
              width="16"
              aria-hidden="true"
              aria-label="Volumen alto"
              id="previous-icon"
              viewBox="0 0 16 16"
            >
              <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z"></path>
            </svg>
          </button>
          <button onClick={handlePlayPause} className="uwu">
            {isPlaying ? (
              <svg
                role="img"
                height="16"
                width="16"
                aria-hidden="true"
                viewBox="0 0 16 16"
                fill={"currentColor"}
              >
                <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
              </svg>
            ) : (
              <svg
                role="img"
                height="16"
                width="16"
                aria-hidden="true"
                viewBox="0 0 16 16"
                fill={"currentColor"}
              >
                <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
              </svg>
            )}
          </button>
          <button onClick={handleNext} className="icon-player">
            <svg
              fill="currentColor"
              role="presentation"
              height="16"
              width="16"
              aria-hidden="true"
              aria-label="Volumen alto"
              id="next-icon"
              viewBox="0 0 16 16"
            >
              <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z"></path>
            </svg>
          </button>
        </div>
        <SongControl audio={audioRef} />
        <audio ref={audioRef} />
      </div>

      <div className="volume-control">control de volumen</div>
    </div>
  );
};
