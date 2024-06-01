import { useSelector } from "react-redux";
import { useSongActions } from "../../hooks/useSongActions";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const { VITE_URL_API_IMG } = import.meta.env;
import "./Module.scss";
import { usePlayerActions } from "../../hooks/usePlayerActions";

export const Favorites = () => {
  const { getFavoriteSongUser, addSongToFavorites } = useSongActions();
  const { updateCurrentMusic, togglePlayState } = usePlayerActions();
  const [playingSong, setPlayingSong] = useState(null);
  const user = useSelector((state) => state.users.auth.user);
  const { favoriteid, status } = useSelector((state) => state.songs);
  const currentMusic = useSelector((state) => state.player.currentMusic);
  const isPlaying = useSelector((state) => state.player.isPlaying);

  useEffect(() => {
    getFavoriteSongUser(user.id);
  }, [user.id]);

  if (!favoriteid || status === "loading")
    return <div className="loader">Loading...</div>;

  const handlePlayStop = (songId) => {
    if (playingSong === songId) {
      setPlayingSong(null);
      togglePlayState(false); // Detener la reproducción
    } else {
      const songToPlay = favoriteid.find((fav) => fav.song.id === songId);
      updateCurrentMusic({
        song: songToPlay.song,
        songs: favoriteid.map((fav) => fav.song),
      });
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

  return (
    <div>
      <p>Favorites</p>
      <div className="container-cards">
        {favoriteid.map((favorite) => (
          <div key={favorite.song.id} className="card">
            <Link to={`/details-song/${favorite.song.id}`}>
              <img
                src={`${VITE_URL_API_IMG}${favorite.song.img}`}
                alt="Song Image"
              />
            </Link>
            <div className="info-song">
              <div className="data-song">
                <p>{favorite.song.name}</p>
                <p>{favorite.song.artist}</p>
              </div>

              <div className="song-price">
                <button onClick={() => handlePlayStop(favorite.song.id)} className="button-player">
                  {currentMusic.song?.id === favorite.song.id && isPlaying ? (
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
                {/* <p>{favorite.song.price}</p> */}
                <button onClick={() => handleAddToFavorites(favorite.song.id)}>
                  Borrar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
