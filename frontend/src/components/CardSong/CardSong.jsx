import { useState } from "react";
import { Link } from "react-router-dom";
import Sound from "react-sound";
import { useValidators } from "../../hooks/useValidators";
const { VITE_URL_API_IMG } = import.meta.env;

export const CardSong = ({ songs }) => {
  const { isUserAuthenticated } = useValidators();
  const [playingSong, setPlayingSong] = useState(null);

  const handlePlayStop = (songId) => {
    if (playingSong === songId) {
      setPlayingSong(null);
    } else {
      setPlayingSong(songId);
    }
  };

  return (
    <div>
      {isUserAuthenticated() && <p>MP3 Songs</p>}
      <div>
        {songs.map((song) => (
          <div key={song.id}>
            <Link to={`/details-song/${song.id}`}>
              <img src={`${VITE_URL_API_IMG}${song.img}`} alt="Song Image" />
              <p>{song.name}</p>
              <p>{song.artist}</p>
            </Link>
            <button onClick={() => handlePlayStop(song.id)}>
              {playingSong === song.id ? "Stop" : "Play"}
            </button>
            {playingSong === song.id && (
              <Sound
                url={`${VITE_URL_API_IMG}${song.song}`}
                playStatus={Sound.status.PLAYING}
                onFinishedPlaying={() => setPlayingSong(null)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
