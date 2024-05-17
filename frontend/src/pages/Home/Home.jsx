import { useSelector } from "react-redux";
import { useVinylDiscActions } from "../../hooks/useVinylDiscActions";
import { useSongActions } from "../../hooks/useSongActions";
import { useEffect } from "react";
const { VITE_URL_API_IMG } = import.meta.env;

export const Home = () => {
  const { getAllVinylDisc } = useVinylDiscActions();
  const { getAllSongs } = useSongActions();
  const { allvinyls, vinylStatus } = useSelector((state) => state.vinyldiscs);
  const { allsongs, songStatus } = useSelector((state) => state.songs);

  useEffect(() => {
    getAllVinylDisc();
    getAllSongs();
  }, []);

  if (!allvinyls || vinylStatus === "loading")
    return <div className="loader">loading.....</div>;

  if (!allsongs || songStatus === "loading")
    return <div className="loader">loading.....</div>;

  return (
    <div>
      <p>MP3 Songs</p>
      <div>
        {allsongs.map((song) => (
          <div key={song.id}>
  <img src={`${VITE_URL_API_IMG}${song.img}`} alt="Song Image" />
            <p>{song.name}</p>
            <p>{song.artist}</p>
          </div>
        ))}
      </div>
      <p>Vinyl Discs</p>
      <div>
        {allvinyls.map((vinyl) => (
          <div key={vinyl.id}>
            <p>{vinyl.name}</p>
            <p>{vinyl.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
