import { useSelector } from "react-redux";
import { useSongActions } from "../../hooks/useSongActions";
import { useEffect, useState } from "react";
import Sound from "react-sound";
const { VITE_URL_API_IMG } = import.meta.env;

export const Favorites = () => {
  const { getFavoriteSongUser, addSongToFavorites } = useSongActions();
  const [playingSong, setPlayingSong] = useState(null);
  const user = useSelector((state) => state.users.auth.user);
  const { favoriteid, status } = useSelector((state) => state.songs);

  console.log(favoriteid);

  useEffect(() => {
    getFavoriteSongUser(user.id);
  }, []);

  if (!favoriteid || status === "loading")
    return <div className="loader">Loading...</div>;

  const handlePlayStop = (songId) => {
    setPlayingSong(playingSong === songId ? null : songId);
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
    <>
      <p>favorites</p>

      <div>
        {favoriteid.map((favorite) => (
          <div key={favorite.id}>
            <img
              src={`${VITE_URL_API_IMG}${favorite.song.img}`}
              alt="Song Image"
            />
            <p>{favorite.song.name}</p>
            <p>{favorite.song.artist}</p>
            <button onClick={() => handlePlayStop(favorite.song.id)}>
              {playingSong === favorite.song.id ? "Stop" : "Play"}
            </button>
            {playingSong === favorite.song.id && (
              <Sound
                url={`${VITE_URL_API_IMG}${favorite.song.song}`}
                playStatus={Sound.status.PLAYING}
                onFinishedPlaying={() => setPlayingSong(null)}
              />
            )}
            <button onClick={() => handleAddToFavorites(favorite.song.id)}>
              borrar
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
