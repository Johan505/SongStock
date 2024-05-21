import { useSelector } from "react-redux";
import { useSongActions } from "../../hooks/useSongActions"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sound from "react-sound";
const { VITE_URL_API_IMG } = import.meta.env;

export const Favorites = () => {
    const {getFavoriteSongUser} = useSongActions();
    const [playingSong, setPlayingSong] = useState(null);
    const user = useSelector((state) => state.users.auth.user);
    const {favoriteid, status} = useSelector((state) => state.songs)

    useEffect(() => {
        getFavoriteSongUser(user.id);
    },[])

    if (!favoriteid || status === "loading")
        return <div className="loader">Loading...</div>;

    console.log(favoriteid);

    const handlePlayStop = (songId) => {
        if (playingSong === songId) {
          setPlayingSong(null);
        } else {
          setPlayingSong(songId);
        }
      };
    return (
        <>
        <p>favorites</p>

        <div>
        {favoriteid.map((favorite) => (
          <div key={favorite.id}>
              <img src={`${VITE_URL_API_IMG}${favorite.song.img}`} alt="Song Image" />
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
          </div>
        ))}
      </div>
        </>
    )
}