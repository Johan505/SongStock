import { useSelector } from "react-redux";
import { useVinylDiscActions } from "../../hooks/useVinylDiscActions";
import { useSongActions } from "../../hooks/useSongActions";
import { useEffect, useState } from "react";
import { CardSong } from "../../components/CardSong/CardSong";
import { CardVinylDisc } from "../../components/CardVinyl/CardVinylDisc";
import { useValidators } from "../../hooks/useValidators";

export const Home = () => {
  const { getAllVinylDisc } = useVinylDiscActions();
  const { getAllSongs } = useSongActions();
  const { allvinyls, vinylStatus } = useSelector((state) => state.vinyldiscs);
  const { allsongs, songStatus } = useSelector((state) => state.songs);
  const [split, setSplit] = useState(true);
  const { isUserAuthenticated, isUserRolUser, isUserRolProvider,isUserRolAdmin } =
    useValidators();

  useEffect(() => {
    getAllVinylDisc();
    getAllSongs();
  }, []);

  const handlePostProfile = () => {
    setSplit(true);
  };

  const handleLikeProfile = () => {
    setSplit(false);
  };

  if (!allvinyls || vinylStatus === "loading")
    return <div className="loader">loading.....</div>;

  if (!allsongs || songStatus === "loading")
    return <div className="loader">loading.....</div>;

  return (
    <div>

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
            <CardSong songs={allsongs} />
          ) : (
            <CardVinylDisc vinyls={allvinyls} />
          )}
   

    </div>
  );
};
