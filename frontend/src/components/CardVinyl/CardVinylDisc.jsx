import { Link } from "react-router-dom";
const { VITE_URL_API_IMG } = import.meta.env;
import "./Module.scss"

export const CardVinylDisc = ({ vinyls }) => {
  return (
    <div className="container-cards">
      {vinyls.map((vinyl) => (
        <div key={vinyl.id} className="card">
          <Link to={`/details-vinyldisc/${vinyl.id}`}>
            <img
              src={`${VITE_URL_API_IMG}${vinyl.img}`}
              alt="Vinyldisc Image"
            />
            <div className="data-vinyl">
              <p>{vinyl.name}</p>
              <p>{vinyl.artist}</p>
              <p>{vinyl.price}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};
