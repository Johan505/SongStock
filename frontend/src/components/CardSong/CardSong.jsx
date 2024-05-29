import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sound from "react-sound";
import { useValidators } from "../../hooks/useValidators";
import { useSongActions } from "../../hooks/useSongActions";
import { useSelector } from "react-redux";
const { VITE_URL_API_IMG } = import.meta.env;

export const CardSong = ({ songs, refreshSongs }) => {
  const { isUserAuthenticated, isUserRolUser } = useValidators();
  const { addSongToFavorites, getFavoriteSongUser } = useSongActions();
  const [playingSong, setPlayingSong] = useState(null);
  const user = useSelector((state) => state.users.auth.user);
  const { favoriteid, status } = useSelector((state) => state.songs);

  useEffect(() => {
    if (user) {
      getFavoriteSongUser(user.id);
    }
  }, [user]);

  const handlePlayStop = (songId) => {
    if (playingSong === songId) {
      setPlayingSong(null);
    } else {
      setPlayingSong(songId);
    }
  };

  const handleAddToFavorites = async (songId) => {
    const favoriteData = {
      user_id: user.id,
      song_id: songId,
    };
    await addSongToFavorites(favoriteData);
    getFavoriteSongUser(user.id);
  };

  const isFavorite = (songId) => {
    return favoriteid.some((fav) => fav.song.id === songId);
  };

  if (!songs) {
    return <div className="loader">Loading...</div>;
  }

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
              <p>{song.price}</p>
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
            {isUserRolUser() && (
              <>
                <button
                  onClick={() => handleAddToFavorites(song.id)}
                  disabled={status === "loading"}
                >
                  {isFavorite(song.id) ? "borrar de favs" : "add"}
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
