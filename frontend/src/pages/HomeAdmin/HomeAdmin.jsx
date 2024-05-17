import { Link } from "react-router-dom";
import { useSongActions } from "../../hooks/useSongActions";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const { VITE_URL_API_IMG } = import.meta.env;

export const HomeAdmin = () => {
    const { getAllSongs } = useSongActions();
    const { allsongs, songStatus } = useSelector((state) => state.songs);

 useEffect(() => {
    getAllSongs();
  }, []);

if (!allsongs || songStatus === "loading")
    return <div className="loader">loading.....</div>;

  return (
    <div>
        <p>ADMIN</p>
        <Link to="/song/song-register1">Add Song</Link>
        <div>
        {allsongs.map((song) => (
          <div key={song.id}>
  <img src={`${VITE_URL_API_IMG}${song.img}`} alt="Song Image" />
            <p>{song.name}</p>
            <p>{song.artist}</p>
            <Link to="/song/song-edit/">Edit Song</Link>
          </div>
        ))}
      </div>
    </div>
  );
};
