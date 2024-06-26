import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSongActions } from "../../hooks/useSongActions";
import { useSelector } from "react-redux";
import { useValidators } from "../../hooks/useValidators";
const { VITE_URL_API_IMG } = import.meta.env;

export const DetailsSong = () => {
  const { id } = useParams();
  const { searchid, dropSong } = useSongActions();
  const { songid, status } = useSelector((state) => state.songs);
  const { isUserRolUser, isUserRolAdmin } = useValidators();
  const navigate = useNavigate();

  useEffect(() => {
    searchid(id);
  }, [id]);

  const deleteSong = (id) => {
        dropSong(id)
        navigate('/')
  }

  if (!songid || status === "loading")
    return <div className="loader">Loading...</div>;
  console.log(songid);


  return (
    <div className="song-details-container">
      <div className="song-image-container">
        <img
          src={`${VITE_URL_API_IMG}${songid.img}`}
          alt="Song Image"
          className="song-image"
        />
      </div>
      <div className="song-info-container">
        <h2 className="song-name">{songid.name}</h2>
        <p className="song-artist">Artist: {songid.artist}</p>
        <p className="song-duration">Duration: {songid.duration}</p>
        <p className="song-mb">Size: {songid.mb} MB</p>
        <p className="song-kbps">Quality: {songid.kbps} kbps</p>
        <p className="song-gender">Genre: {songid.gender}</p>
        <div>
          {isUserRolUser() && (
            <button>
              <Link to="/" className="item-nav sing-in">
                Add to cart
              </Link>
            </button>
          )}
          {isUserRolAdmin() && (
            <>
            <button>
              <Link to={`/song/song-edit/${songid.id}`}>Edit</Link>
            </button>
            <button onClick={()=>deleteSong(songid.id)}>
                Delete
            </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
