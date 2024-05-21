import { useState } from "react";
import { Link } from "react-router-dom";
import Sound from "react-sound";
import { useValidators } from "../../hooks/useValidators";
import { useSongActions } from "../../hooks/useSongActions";
import { useSelector } from "react-redux";
const { VITE_URL_API_IMG } = import.meta.env;

export const CardSong = ({ songs }) => {
  const { isUserAuthenticated } = useValidators();
  const { addSongToFavorites } = useSongActions();
  const [playingSong, setPlayingSong] = useState(null);
  const user = useSelector((state) => state.users.auth.user);

  const [formData, setFormData] = useState({
    id: null,
    user_id: user.id,
    song_id: "",
  });

  const handlePlayStop = (songId) => {
    if (playingSong === songId) {
      setPlayingSong(null);
    } else {
      setPlayingSong(songId);
    }
  };

  const handleAddToFavorites = (songId) => {
    const favoriteData = {
      user_id: user.id,
      song_id: songId,
    };
    addSongToFavorites(favoriteData);
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
            <button onClick={() => handleAddToFavorites(song.id)}>
              Add to Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
