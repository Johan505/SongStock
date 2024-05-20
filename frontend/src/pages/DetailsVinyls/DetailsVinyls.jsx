import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useValidators } from "../../hooks/useValidators";
import { useVinylDiscActions } from "../../hooks/useVinylDiscActions";
const { VITE_URL_API_IMG } = import.meta.env;

export const DetailsVinyls = () => {
  const { id } = useParams();
  const { searchid, dropVinylDisc } = useVinylDiscActions();
  const { vinylid, status } = useSelector((state) => state.vinyldiscs);
  const { isUserRolUser, isUserRolProvider } = useValidators();
  const navigate = useNavigate();

  useEffect(() => {
    searchid(id);
  }, [id]);
  const deleteVinyl = (id) => {
        dropVinylDisc(id)
        navigate('/')
  }

  if (!vinylid || status === "loading")
    return <div className="loader">Loading...</div>;


  return (
    <div className="vinyl-details-container">
      <div className="vinyl-image-container">
        <img
          src={`${VITE_URL_API_IMG}${vinylid.img}`}
          alt="Vinyl Image"
          className="vinyl-image"
        />
      </div>
      <div className="vinyl-info-container">
        <h2 className="vinyl-name">{vinylid.name}</h2>
        <p className="vinyl-price">{vinylid.price}</p>
        <div>
          {isUserRolUser() && (
            <button>
              <Link to="/" className="item-nav sing-in">
                Add to cart
              </Link>
            </button>
          )}
          {isUserRolProvider() && (
            <>
            <button>
              <Link to={`/vinyldisc/vinyldisc-edit/${vinylid.id}`}>Edit</Link>
            </button>
            <button onClick={()=>deleteVinyl(vinylid.id)}>
                Delete
            </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
