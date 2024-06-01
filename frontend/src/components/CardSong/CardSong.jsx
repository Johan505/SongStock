import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useValidators } from "../../hooks/useValidators";
import { useSongActions } from "../../hooks/useSongActions";
import { usePlayerActions } from "../../hooks/usePlayerActions";
import { useSelector } from "react-redux";
const { VITE_URL_API_IMG } = import.meta.env;
import "./Module.scss";

export const CardSong = ({ songs, refreshSongs }) => {
  const { isUserAuthenticated, isUserRolUser } = useValidators();
  const { addSongToFavorites, getFavoriteSongUser } = useSongActions();
  const { updateCurrentMusic, togglePlayState } = usePlayerActions();
  const [playingSong, setPlayingSong] = useState(null);
  const user = useSelector((state) => state.users.auth.user);
  const { favoriteid, status } = useSelector((state) => state.songs);
  const currentMusic = useSelector((state) => state.player.currentMusic);
  const play = useSelector((state) => state.player.isPlaying);

  useEffect(() => {
    if (user) {
      getFavoriteSongUser(user.id);
    }
  }, [user]);

  const handlePlayStop = (songId) => {
    if (playingSong === songId) {
      setPlayingSong(null);
      togglePlayState(false); // Detener la reproducción
    } else {
      const songToPlay = songs.find((song) => song.id === songId);
      updateCurrentMusic({ song: songToPlay, songs });
      togglePlayState(true); // Iniciar la reproducción
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
      <div className="container-cards">
        {songs.map((song) => (
          <div key={song.id} className="card">
            <div>
              <Link to={`/details-song/${song.id}`}>
                <img src={`${VITE_URL_API_IMG}${song.img}`} alt="Song Image" />
              </Link>
              <div className="info-song">
                <div className="data-song">
                  <p>{song.name}</p>
                  <p>{song.artist}</p>
                </div>
                <div className="song-price">
                  <button onClick={() => handlePlayStop(song.id)} className="button-player">
                    {currentMusic.song?.id === song.id  && play ? (
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
                  <p>{song.price}</p>
                </div>
              </div>
            </div>
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
