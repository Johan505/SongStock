import { useSelector } from "react-redux";
import { useVinylDiscActions } from "../../hooks/useVinylDiscActions";
import { useSongActions } from "../../hooks/useSongActions";
<<<<<<< HEAD
import { useEffect, useState } from "react";
import { CardSong } from "../../components/CardSong/CardSong";
import { CardVinylDisc } from "../../components/CardVinyl/CardVinylDisc";
import { useValidators } from "../../hooks/useValidators";
=======
import { useEffect } from "react";
const { VITE_URL_API_IMG } = import.meta.env;
>>>>>>> Santiago

export const Home = () => {
  const { getAllVinylDisc } = useVinylDiscActions();
  const { getAllSongs } = useSongActions();
  const { allvinyls, vinylStatus } = useSelector((state) => state.vinyldiscs);
  const { allsongs, songStatus } = useSelector((state) => state.songs);
<<<<<<< HEAD
  const [split, setSplit] = useState(true);
  const { isUserAuthenticated, isUserRolUser, isUserRolProvider,isUserRolAdmin } =
    useValidators();
=======
>>>>>>> Santiago

  useEffect(() => {
    getAllVinylDisc();
    getAllSongs();
  }, []);

<<<<<<< HEAD
  const handlePostProfile = () => {
    setSplit(true);
  };

  const handleLikeProfile = () => {
    setSplit(false);
  };

  const refreshSongs = () => {
    getAllSongs();
    console.log('entre a refrescar');
  };

=======
>>>>>>> Santiago
  if (!allvinyls || vinylStatus === "loading")
    return <div className="loader">loading.....</div>;

  if (!allsongs || songStatus === "loading")
    return <div className="loader">loading.....</div>;

  return (
    <div>
<<<<<<< HEAD

        <div className="buttons-actions-profile">
          <button
            className={`button-post-profile ${split ? "active" : "inactive"}`}
            onClick={handlePostProfile}
          >
            songs
          </button>
          <button
            className={`button-like-profile ${!split ? "active" : "inactive"}`}
            onClick={handleLikeProfile}
          >
            vinyl
          </button>
        </div>

   
          {split ? (
            <CardSong songs={allsongs} refreshSongs={refreshSongs}/>
          ) : (
            <CardVinylDisc vinyls={allvinyls} />
          )}
   

=======
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
>>>>>>> Santiago
    </div>
  );
};
