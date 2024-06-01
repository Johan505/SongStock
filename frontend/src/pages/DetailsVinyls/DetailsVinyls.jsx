import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useValidators } from "../../hooks/useValidators";
import { useVinylDiscActions } from "../../hooks/useVinylDiscActions";
import { useCartActions } from "../../hooks/useCartActions";
const { VITE_URL_API_IMG } = import.meta.env;

export const DetailsVinyls = () => {
  const { id } = useParams();
  const { searchid, dropVinylDisc } = useVinylDiscActions();
  const { addVinylToCart } = useCartActions();
  const { vinylid, status } = useSelector((state) => state.vinyldiscs);
  const { isUserRolUser, isUserRolProvider } = useValidators();
  const user = useSelector((state) => state.users.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    searchid(id);
  }, [id]);
  const deleteVinyl = (id) => {
    dropVinylDisc(id);
    navigate("/");
  };

  if (!vinylid || status === "loading")
    return <div className="loader">Loading...</div>;

  const handleAddVinylToCart = async (vinylId) => {
    const VinylCartData = {
      user_id: user.id,
      vinyl_id: vinylId,
    };
    await addVinylToCart(VinylCartData);
  };

  return (
    <div className="song-details-container">
      <div className="details-son-card">
        <img
          src={`${VITE_URL_API_IMG}${vinylid.img}`}
          alt="Vinyl Image"
          className="vinyl-image"
        />

        <div className="vinyl-info-container">
          <h2 className="vinyl-name">{vinylid.name}</h2>
          <p className="vinyl-amount">Amount: {vinylid.amount}</p>
          <p className="vinyl-description">
            Description: {vinylid.description}
          </p>
          <p className="vinyl-state">State: {vinylid.state} kbps</p>
          <p className="vinyl-condition">Condition: {vinylid.condition}</p>
          <p className="vinyl-Observations">
            Observartions: {vinylid.observations}
          </p>
          <p className="vinyl-price">{vinylid.price}</p>
          <div>
            {isUserRolUser() && (
              <button
                onClick={() => handleAddVinylToCart(vinylid.id)}
                disabled={status === "loading"}
              >
                Add Cart
              </button>
            )}
            {isUserRolProvider() && (
              <>
                <button>
                  <Link to={`/vinyldisc/vinyldisc-edit/${vinylid.id}`}>
                    Edit
                  </Link>
                </button>
                <button onClick={() => deleteVinyl(vinylid.id)}>Delete</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
